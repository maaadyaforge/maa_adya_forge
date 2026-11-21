import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUOTE_EMAIL_SUBJECT,
  QUOTE_RECIPIENT_EMAIL,
  buildBrochureText,
  buildElasticEmailPayload,
  buildFormSubmitPayload,
  classifyFormSubmitResponse,
  escapeHtml,
  findMatchingProductOption,
  formatQuoteEmailBody,
  getAllInquiryProductGroups,
  getAllShowcaseImagePaths,
  getSubProductsByCategory,
  isValidPdfBuffer,
  validateInquiryForm,
} from './inquiry';

test('getSubProductsByCategory returns expected item counts for each refractory division', () => {
  const bricks = getSubProductsByCategory('bricks');
  const castables = getSubProductsByCategory('castables');
  const mortars = getSubProductsByCategory('mortars');

  assert.ok(bricks);
  assert.equal(bricks.items.length, 6);
  assert.ok(castables);
  assert.equal(castables.items.length, 12);
  assert.ok(mortars);
  assert.equal(mortars.items.length, 7);
});

test('findMatchingProductOption resolves exact and partial product names', () => {
  const exact = findMatchingProductOption(
    'High Alumina Bricks, Blocks and Tiles Upto 90%'
  );
  assert.equal(exact, 'High Alumina Bricks, Blocks and Tiles Upto 90%');

  const forging = findMatchingProductOption('Industrial Forged Rings');
  assert.equal(forging, 'Industrial Forged Rings');

  const unknown = findMatchingProductOption('Non-Existent Widget XYZ');
  assert.equal(unknown, null);
});

test('validateInquiryForm enforces mandatory name, phone, email, and product', () => {
  const emptyResult = validateInquiryForm({
    name: '',
    phone: '123',
    email: 'invalid-email',
    product: '',
    quantity: '',
    message: '',
  });

  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.product);
});

test('validateInquiryForm accepts well-formed inquiry payload', () => {
  const validResult = validateInquiryForm({
    name: 'Ar. Sameer Malhotra',
    phone: '+91 98765 43210',
    email: 'sameer@opusdesigns.in',
    product: 'High Alumina Bricks, Blocks and Tiles Upto 90%',
    quantity: '5 Tons',
    message: 'Need dispatch quote for Jamshedpur plant.',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('Elastic Email v4 and FormSubmit payloads target maaadyaforge@gmail.com with Subject Quote Requested', () => {
  const payload = {
    name: 'Vikram Patel',
    phone: '+91 98765 43210',
    email: 'vikram@buildcon.in',
    product: 'Industrial Forged Rings',
    quantity: '250 Pcs',
    message: 'Deliver to <Pune> plant',
  };

  const body = formatQuoteEmailBody(payload);
  assert.match(body, /Full Name: Vikram Patel/);
  assert.match(body, /Product \/ Sub-product: Industrial Forged Rings/);

  const elastic = buildElasticEmailPayload(payload, 'maaadyaforge@gmail.com');
  assert.deepEqual(elastic.Recipients.To, ['maaadyaforge@gmail.com']);
  assert.equal(elastic.Content.Subject, 'Quote Requested');
  assert.equal(elastic.Content.ReplyTo, 'vikram@buildcon.in');
  assert.match(elastic.Content.Body[0].Content, /Deliver to &lt;Pune&gt; plant/);

  const formSubmit = buildFormSubmitPayload(payload);
  assert.equal(formSubmit._subject, 'Quote Requested');
  assert.equal(formSubmit._replyto, 'vikram@buildcon.in');
  assert.equal(formSubmit['Full Name'], 'Vikram Patel');
  assert.equal(formSubmit['Product / Sub-product'], 'Industrial Forged Rings');
  assert.match(formSubmit['Quote Reference'], /^MAF-/);

  const selfReplyPayload = buildFormSubmitPayload({
    ...payload,
    email: 'maaadyaforge@gmail.com',
  });
  assert.equal(selfReplyPayload._replyto, undefined);
  assert.equal(selfReplyPayload['Email Address'], 'maaadyaforge@gmail.com');

  assert.equal(
    classifyFormSubmitResponse(true, {
      success: 'true',
      message: 'The form was submitted successfully.',
    }).outcome,
    'delivered'
  );
  assert.equal(
    classifyFormSubmitResponse(true, {
      success: 'false',
      message:
        "This form needs Activation. We've sent you an email containing an 'Activate Form' link.",
    }).outcome,
    'activation-required'
  );
  assert.equal(
    classifyFormSubmitResponse(false, {
      success: 'false',
      message: 'Rate limited',
    }).outcome,
    'error'
  );

  assert.equal(QUOTE_RECIPIENT_EMAIL, 'maaadyaforge@gmail.com');
  assert.equal(QUOTE_EMAIL_SUBJECT, 'Quote Requested');
});

test('escapeHtml neutralizes HTML special characters', () => {
  assert.equal(
    escapeHtml('<script>"alert(\'x\')&</script>'),
    '&lt;script&gt;&quot;alert(&#39;x&#39;)&amp;&lt;/script&gt;'
  );
});

test('all 40 showcase and refractory sub-product photographic images are strictly unique', () => {
  const paths = getAllShowcaseImagePaths();
  assert.equal(paths.length, 40);
  const uniquePaths = new Set(paths);
  assert.equal(
    uniquePaths.size,
    paths.length,
    'Duplicate image paths detected across showcase and sub-product sections'
  );
});

test('getAllInquiryProductGroups exposes all three divisions and buildBrochureText includes key lines', () => {
  const groups = getAllInquiryProductGroups();
  assert.equal(groups.length, 3);
  const brochure = buildBrochureText();
  assert.match(brochure, /MAA ADYA FORGE AND REFRACTORIES/);
  assert.match(brochure, /Nehru Road, Chirkunda, Dhanbad, Jharkhand\. Pincode - 828202\./);
  assert.match(brochure, /\+91-7033522500/);
  assert.match(brochure, /maaadyaforge@gmail\.com/);
});

test('isValidPdfBuffer validates authentic PDF headers and rejects HTML/empty payloads', () => {
  const validPdf = new TextEncoder().encode('%PDF-1.7\n1 0 obj');
  const htmlDoc = new TextEncoder().encode('<!doctype html><html></html>');
  assert.equal(isValidPdfBuffer(validPdf), true);
  assert.equal(isValidPdfBuffer(htmlDoc), false);
  assert.equal(isValidPdfBuffer(new Uint8Array(0)), false);
});
