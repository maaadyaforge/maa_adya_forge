import {
  ASSETS,
  AUTOMOTIVE_PRODUCTS,
  FORGING_PRODUCTS,
  GALLERY_ITEMS,
  PLANT_CONTACT,
  REFRACTORY_CATEGORIES,
  type RefractoryCategory,
  type RefractoryCategoryKey,
} from '../data/catalog.ts';

export const QUOTE_RECIPIENT_EMAIL = PLANT_CONTACT.emailOrders;
export const QUOTE_EMAIL_SUBJECT = 'Quote Requested';

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: InquiryValidationErrors;
}

export interface ProductOptionGroup {
  label: string;
  options: Array<{ value: string; label: string }>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getSubProductsByCategory(
  categoryKey: RefractoryCategoryKey
): RefractoryCategory | undefined {
  return REFRACTORY_CATEGORIES.find((cat) => cat.key === categoryKey);
}

export function getAllInquiryProductGroups(): ProductOptionGroup[] {
  const refractoryOptions: Array<{ value: string; label: string }> = [];
  for (const category of REFRACTORY_CATEGORIES) {
    refractoryOptions.push({ value: category.title, label: category.title });
    for (const item of category.items) {
      refractoryOptions.push({
        value: item.name,
        label: `↳ ${item.name}`,
      });
    }
  }

  return [
    {
      label: 'Refractories Division',
      options: refractoryOptions,
    },
    {
      label: 'Forging Division',
      options: FORGING_PRODUCTS.map((p) => ({ value: p.name, label: p.name })),
    },
    {
      label: 'Automotive Spares',
      options: AUTOMOTIVE_PRODUCTS.map((p) => ({ value: p.name, label: p.name })),
    },
  ];
}

export function findMatchingProductOption(
  productName: string,
  groups: ProductOptionGroup[] = getAllInquiryProductGroups()
): string | null {
  const normalizedTarget = productName.trim().toLowerCase();
  if (!normalizedTarget) return null;

  for (const group of groups) {
    for (const opt of group.options) {
      if (opt.value.toLowerCase() === normalizedTarget) {
        return opt.value;
      }
    }
  }

  for (const group of groups) {
    for (const opt of group.options) {
      if (
        opt.value.toLowerCase().includes(normalizedTarget) ||
        normalizedTarget.includes(opt.value.toLowerCase())
      ) {
        return opt.value;
      }
    }
  }

  return null;
}

export function validateInquiryForm(
  input: InquiryFormData
): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Full name is mandatory (at least 2 characters).';
  }

  const digitCount = (input.phone.match(/\d/g) || []).length;
  if (digitCount < 7 || digitCount > 15) {
    errors.phone = 'Valid phone number is mandatory (7–15 digits).';
  }

  if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Valid email address is mandatory.';
  }

  if (!input.product.trim()) {
    errors.product = 'Selecting a product of interest is mandatory.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatQuoteEmailBody(data: InquiryFormData): string {
  return [
    'New Quote Request — Maa Adya Forge & Refractories',
    '--------------------------------------------------',
    `Full Name: ${data.name.trim()}`,
    `Phone Number: ${data.phone.trim()}`,
    `Email Address: ${data.email.trim()}`,
    `Product / Sub-product: ${data.product.trim()}`,
    `Required Quantity / Specifications: ${data.quantity.trim() || 'Not specified'}`,
    `Project Location & Message: ${data.message.trim() || 'N/A'}`,
  ].join('\n');
}

export function buildQuoteHtmlEmail(data: InquiryFormData): string {
  const rows: Array<[string, string]> = [
    ['Full Name', data.name.trim()],
    ['Phone Number', data.phone.trim()],
    ['Email Address', data.email.trim()],
    ['Product / Sub-product', data.product.trim()],
    ['Required Quantity / Specifications', data.quantity.trim() || 'Not specified'],
    ['Project Location & Message', data.message.trim() || 'N/A'],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;width:210px;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;white-space:pre-line;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
      <div style="background:#b04722;color:#ffffff;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;font-size:20px;">Maa Adya Forge &amp; Refractories</h2>
        <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">New Website Quote Request</p>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:16px 20px;background:#ffffff;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `.trim();
}

export function buildElasticEmailPayload(
  data: InquiryFormData,
  fromEmail: string = QUOTE_RECIPIENT_EMAIL
) {
  const safeReplyTo = data.email.replace(/[\r\n]/g, '').trim();
  return {
    Recipients: {
      To: [QUOTE_RECIPIENT_EMAIL],
    },
    Content: {
      From: fromEmail.replace(/[\r\n]/g, '').trim(),
      ReplyTo: safeReplyTo,
      Subject: QUOTE_EMAIL_SUBJECT,
      Body: [
        {
          ContentType: 'HTML',
          Content: buildQuoteHtmlEmail(data),
          Charset: 'utf-8',
        },
        {
          ContentType: 'PlainText',
          Content: formatQuoteEmailBody(data),
          Charset: 'utf-8',
        },
      ],
    },
  };
}

export function buildFormSubmitPayload(data: InquiryFormData) {
  const safeReplyTo = data.email.replace(/[\r\n]/g, '').trim();
  const referenceId = `MAF-${Date.now().toString(36).toUpperCase()}`;
  const payload: Record<string, string> = {
    'Quote Reference': referenceId,
    'Full Name': data.name.trim(),
    'Phone Number': data.phone.trim(),
    'Email Address': safeReplyTo,
    'Product / Sub-product': data.product.trim(),
    'Required Quantity / Specifications':
      data.quantity.trim() || 'Not specified',
    'Project Location & Message': data.message.trim() || 'N/A',
    _subject: QUOTE_EMAIL_SUBJECT,
    _template: 'table',
    _captcha: 'false',
  };

  if (safeReplyTo.toLowerCase() !== QUOTE_RECIPIENT_EMAIL.toLowerCase()) {
    payload._replyto = safeReplyTo;
  }

  return payload;
}

export function isValidPdfBuffer(bytes: Uint8Array): boolean {
  if (bytes.byteLength < 8) return false;
  // ASCII "%PDF-"
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

export type FormSubmitOutcome = 'delivered' | 'activation-required' | 'error';

export function classifyFormSubmitResponse(
  httpOk: boolean,
  data: { success?: string | boolean; message?: string } | null
): { outcome: FormSubmitOutcome; message: string } {
  const rawMessage = String(data?.message || '').trim();
  const isSuccess =
    httpOk && (data?.success === true || data?.success === 'true');

  if (isSuccess) {
    return {
      outcome: 'delivered',
      message: rawMessage || 'The form was submitted successfully.',
    };
  }

  if (/needs\s+activation|activate\s+form/i.test(rawMessage)) {
    return {
      outcome: 'activation-required',
      message: rawMessage,
    };
  }

  return {
    outcome: 'error',
    message:
      rawMessage ||
      'Email delivery failed. Please check your connection and try again.',
  };
}

export function getAllShowcaseImagePaths(): string[] {
  return [
    ASSETS.heroKiln,
    ...REFRACTORY_CATEGORIES.map((c) => c.img),
    ...REFRACTORY_CATEGORIES.flatMap((c) => c.items.map((item) => item.img)),
    ...FORGING_PRODUCTS.map((p) => p.img),
    ...AUTOMOTIVE_PRODUCTS.map((p) => p.img),
    ...GALLERY_ITEMS.map((g) => g.img),
  ];
}

export function buildBrochureText(): string {
  const lines: string[] = [
    'MAA ADYA FORGE AND REFRACTORIES',
    'Product Catalog & Technical Specification Overview',
    '============================================================',
    'Legacy: 60+ Years (Est. 1960) | Export Reach: Nepal, Bangladesh, South Africa, Myanmar',
    `Plant Address: ${PLANT_CONTACT.address}`,
    `Plant Desk: ${PLANT_CONTACT.emailOrders} | ${PLANT_CONTACT.helpline}`,
    '',
    '1. REFRACTORIES DIVISION',
    '------------------------------------------------------------',
  ];

  for (const cat of REFRACTORY_CATEGORIES) {
    lines.push(`\n[${cat.title}]`);
    for (const item of cat.items) {
      lines.push(`  - ${item.name} (${item.grade}, ${item.tempRating})`);
    }
  }

  lines.push('\n2. FORGING DIVISION');
  lines.push('------------------------------------------------------------');
  for (const item of FORGING_PRODUCTS) {
    const specStr = item.specs.map((s) => `${s.label}: ${s.value}`).join(' | ');
    lines.push(`  - ${item.name} — ${specStr}`);
  }

  lines.push('\n3. AUTOMOTIVE SPARES');
  lines.push('------------------------------------------------------------');
  for (const item of AUTOMOTIVE_PRODUCTS) {
    const specStr = item.specs.map((s) => `${s.label}: ${s.value}`).join(' | ');
    lines.push(`  - ${item.name} — ${specStr}`);
  }

  return lines.join('\n');
}
