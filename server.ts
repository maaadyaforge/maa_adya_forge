import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  QUOTE_EMAIL_SUBJECT,
  QUOTE_RECIPIENT_EMAIL,
  buildElasticEmailPayload,
  buildFormSubmitPayload,
  buildQuoteHtmlEmail,
  classifyFormSubmitResponse,
  formatQuoteEmailBody,
  validateInquiryForm,
  type InquiryFormData,
} from './src/utils/inquiry.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 20;

const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const entry = requestBuckets.get(clientKey);
  if (!entry || now > entry.resetAt) {
    requestBuckets.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r/g, '').trim().slice(0, maxLength);
}

// Activated FormSubmit origin for maaadyaforge@gmail.com so both dev and shared URLs deliver directly
const ACTIVATED_FORMSUBMIT_ORIGIN =
  'https://ais-dev-xci4mmrwgxdtl54j5k7tdq-902787808822.asia-northeast1.run.app';

const BROCHURE_FILES: Record<
  string,
  { diskFilename: string; downloadName: string }
> = {
  main: {
    diskFilename: 'MAA_Adya_Forge_Brochure_cdbe1d6a.pdf',
    downloadName: 'MAA-Adya-Forge-Brochure.pdf',
  },
  castables: {
    diskFilename: 'Maa_Adya_Forge_-_Castables_Product_Data_Book_35c7e92f.pdf',
    downloadName: 'Maa-Adya-Forge-Castables-Product-Data-Book.pdf',
  },
};

function resolveBrochureFilePath(diskFilename: string): string | null {
  const candidates = [
    path.resolve(__dirname, 'public/assets/aistudio', diskFilename),
    path.resolve(__dirname, 'dist/assets/aistudio', diskFilename),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function resolveCanonicalOrigin(): string {
  const explicitOrigin = process.env.FORMSUBMIT_ORIGIN?.trim();
  if (explicitOrigin && /^https?:\/\//i.test(explicitOrigin)) {
    try {
      return new URL(explicitOrigin).origin;
    } catch {
      // Fall through to activated origin
    }
  }
  return ACTIVATED_FORMSUBMIT_ORIGIN;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/brochure/:type', (req: Request, res: Response) => {
    const rawType = typeof req.params.type === 'string' ? req.params.type : '';
    const entry = BROCHURE_FILES[rawType];
    if (!entry) {
      res.status(404).json({ ok: false, error: 'Brochure not found.' });
      return;
    }

    const filePath = resolveBrochureFilePath(entry.diskFilename);
    if (!filePath) {
      res.status(404).json({ ok: false, error: 'Brochure PDF file missing.' });
      return;
    }

    const stat = fs.statSync(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${entry.downloadName}"`
    );
    res.setHeader('Content-Length', String(stat.size));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.status(500).json({ ok: false, error: 'Failed to read PDF file.' });
      }
    });
    stream.pipe(res);
  });

  app.post('/api/quote', async (req: Request, res: Response) => {
    const clientIp =
      (typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for'].split(',')[0].trim()
        : req.socket.remoteAddress) || 'unknown';

    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error:
          'Too many quote requests from this connection. Please try again shortly.',
      });
      return;
    }

    const payload: InquiryFormData = {
      name: sanitizeField(req.body?.name, 120),
      phone: sanitizeField(req.body?.phone, 40),
      email: sanitizeField(req.body?.email, 160),
      product: sanitizeField(req.body?.product, 160),
      quantity: sanitizeField(req.body?.quantity, 200),
      message: sanitizeField(req.body?.message, 2000),
    };

    const validation = validateInquiryForm(payload);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        error: 'Please complete all required fields.',
        errors: validation.errors,
      });
      return;
    }

    // 1. Elastic Email v4 Transactional API (if ELASTIC_EMAIL_API_KEY is configured in server secrets)
    const elasticApiKey = process.env.ELASTIC_EMAIL_API_KEY?.trim();
    if (elasticApiKey) {
      const elasticFrom =
        process.env.ELASTIC_EMAIL_FROM?.trim() || QUOTE_RECIPIENT_EMAIL;
      try {
        const elasticRes = await fetch(
          'https://api.elasticemail.com/v4/emails/transactional',
          {
            method: 'POST',
            headers: {
              'X-ElasticEmail-ApiKey': elasticApiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              buildElasticEmailPayload(payload, elasticFrom)
            ),
          }
        );

        const elasticData = (await elasticRes.json().catch(() => null)) as {
          MessageID?: string;
          Error?: string;
        } | null;

        if (elasticRes.ok) {
          res.json({
            ok: true,
            delivered: true,
            mode: 'elastic-email',
            messageId: elasticData?.MessageID || null,
            recipient: QUOTE_RECIPIENT_EMAIL,
            subject: QUOTE_EMAIL_SUBJECT,
          });
          return;
        }

        console.error(
          'Elastic Email API failed:',
          elasticRes.status,
          elasticData
        );
        res.status(502).json({
          ok: false,
          error:
            elasticData?.Error ||
            'Elastic Email could not deliver the quote right now. Please try again.',
        });
        return;
      } catch (err) {
        console.error('Elastic Email request error:', err);
        res.status(502).json({
          ok: false,
          error: 'Could not reach Elastic Email service. Please try again.',
        });
        return;
      }
    }

    // 2. Optional SMTP delivery (if SMTP_USER and SMTP_PASS are configured in server secrets)
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: smtpFrom,
          to: QUOTE_RECIPIENT_EMAIL,
          replyTo: payload.email.replace(/[\r\n]/g, ''),
          subject: QUOTE_EMAIL_SUBJECT,
          text: formatQuoteEmailBody(payload),
          html: buildQuoteHtmlEmail(payload),
        });

        res.json({
          ok: true,
          delivered: true,
          mode: 'smtp',
          recipient: QUOTE_RECIPIENT_EMAIL,
          subject: QUOTE_EMAIL_SUBJECT,
        });
        return;
      } catch (err) {
        console.error('SMTP delivery failed:', err);
        res.status(502).json({
          ok: false,
          error: 'Email delivery via SMTP failed. Please try again.',
        });
        return;
      }
    }

    // 3. Direct server-side FormSubmit AJAX delivery with consistent activated Origin
    const canonicalOrigin = resolveCanonicalOrigin();
    try {
      const fsRes = await fetch(
        `https://formsubmit.co/ajax/${QUOTE_RECIPIENT_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: canonicalOrigin,
            Referer: `${canonicalOrigin}/`,
            'User-Agent':
              'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          },
          body: JSON.stringify(buildFormSubmitPayload(payload)),
        }
      );

      const fsData = (await fsRes.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      const classified = classifyFormSubmitResponse(fsRes.ok, fsData);

      if (classified.outcome === 'delivered') {
        res.json({
          ok: true,
          delivered: true,
          mode: 'formsubmit',
          recipient: QUOTE_RECIPIENT_EMAIL,
          subject: QUOTE_EMAIL_SUBJECT,
        });
        return;
      }

      if (classified.outcome === 'activation-required') {
        res.json({
          ok: true,
          delivered: false,
          activationRequired: true,
          mode: 'formsubmit',
          message: classified.message,
          recipient: QUOTE_RECIPIENT_EMAIL,
          subject: QUOTE_EMAIL_SUBJECT,
        });
        return;
      }

      res.status(502).json({
        ok: false,
        error: classified.message,
      });
    } catch (err) {
      console.error('FormSubmit server dispatch error:', err);
      res.status(502).json({
        ok: false,
        error: 'Could not reach the email delivery service. Please try again.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
