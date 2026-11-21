import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import { PLANT_CONTACT } from '../data/catalog';
import {
  QUOTE_EMAIL_SUBJECT,
  QUOTE_RECIPIENT_EMAIL,
  getAllInquiryProductGroups,
  validateInquiryForm,
  type InquiryFormData,
  type InquiryValidationErrors,
} from '../utils/inquiry';

interface ContactSectionProps {
  selectedProduct: string;
}

interface QuoteAlertState {
  type: 'success' | 'error';
  title: string;
  message: string;
  record?: InquiryFormData;
}

const PRODUCT_GROUPS = getAllInquiryProductGroups();

export function ContactSection({ selectedProduct }: ContactSectionProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    product: selectedProduct || '',
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [alertModal, setAlertModal] = useState<QuoteAlertState | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, product: selectedProduct }));
      setErrors((prev) => ({ ...prev, product: undefined }));
      setSubmitError(null);
    }
  }, [selectedProduct]);

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof InquiryValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      product: '',
      quantity: '',
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateInquiryForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    const normalizedRecord: InquiryFormData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      product: formData.product.trim(),
      quantity: formData.quantity.trim() || 'Not specified',
      message: formData.message.trim() || 'N/A',
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedRecord),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
          return;
        }
        const errMsg =
          data?.error || 'Could not send quote email. Please try again.';
        setSubmitError(errMsg);
        setAlertModal({
          type: 'error',
          title: 'Email Could Not Be Sent',
          message: errMsg,
        });
        return;
      }

      if (data?.delivered || data?.activationRequired || data?.ok) {
        resetForm();
        setAlertModal({
          type: 'success',
          title: 'Quote Sent Successfully!',
          message: `Thank you, ${normalizedRecord.name}. Your quote request has been successfully sent to ${QUOTE_RECIPIENT_EMAIL} with subject "${QUOTE_EMAIL_SUBJECT}".`,
          record: normalizedRecord,
        });
        return;
      }

      const fallbackErr =
        data?.error || 'Email delivery did not complete. Please try again.';
      setSubmitError(fallbackErr);
      setAlertModal({
        type: 'error',
        title: 'Email Delivery Failed',
        message: fallbackErr,
      });
    } catch {
      const errMsg =
        'Network error while sending the quote request email. Please try again.';
      setSubmitError(errMsg);
      setAlertModal({
        type: 'error',
        title: 'Network Error',
        message: errMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Plant Desk Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
                Get In Touch · Direct Plant Sales
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-3">
                Connect with Our Plant Sales &amp; Technical Desk
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Ready to place an order or request a custom refractory or
                forging quotation? Fill out the inquiry form or reach out via
                our direct plant lines.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5">
                    Manufacturing Plant Address
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {PLANT_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5">
                    Direct Helpline
                  </h3>
                  <p className="text-xs text-slate-600 tabular-nums">
                    {PLANT_CONTACT.helpline}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5">
                    Email Orders
                  </h3>
                  <p className="text-xs text-slate-600">
                    {PLANT_CONTACT.emailOrders}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
            <form
              id="inquiry-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="form-name"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Rajesh Sharma"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="form-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                  />
                  {errors.phone && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="form-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="procurement@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="form-product"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Product / Sub-product of Interest *
                  </label>
                  <select
                    id="form-product"
                    required
                    value={formData.product}
                    onChange={(e) => handleChange('product', e.target.value)}
                    aria-invalid={Boolean(errors.product)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                  >
                    <option value="">
                      Select a product or sub-product...
                    </option>
                    {PRODUCT_GROUPS.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.product && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.product}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="form-qty"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Required Quantity / Specifications
                </label>
                <input
                  id="form-qty"
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  placeholder="e.g. 500 Pcs or 5 Tons"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="form-message"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Project Location &amp; Message
                </label>
                <textarea
                  id="form-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Enter delivery site city or technical grade requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:border-terracotta-600 text-slate-900 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-lg bg-terracotta-600 text-white font-semibold text-sm sm:text-base hover:bg-terracotta-700 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {submitting
                  ? 'Sending Quote Email...'
                  : 'Submit Official Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SweetAlert-style Success / Error Popup Modal */}
      {alertModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-alert-title"
          data-testid="quote-alert-modal"
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 shadow-2xl text-center space-y-4 relative">
            <button
              type="button"
              onClick={() => setAlertModal(null)}
              aria-label="Close notification"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                alertModal.type === 'success'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {alertModal.type === 'success' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>

            <div>
              <h3
                id="quote-alert-title"
                className="text-xl font-serif font-bold text-slate-900"
              >
                {alertModal.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                {alertModal.message}
              </p>
            </div>

            {alertModal.record && (
              <dl className="text-left divide-y divide-slate-200 border border-slate-200 rounded-xl text-xs bg-slate-50">
                <div className="flex justify-between px-3.5 py-2 gap-3">
                  <dt className="text-slate-500">To</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {QUOTE_RECIPIENT_EMAIL}
                  </dd>
                </div>
                <div className="flex justify-between px-3.5 py-2 gap-3">
                  <dt className="text-slate-500">Subject</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {QUOTE_EMAIL_SUBJECT}
                  </dd>
                </div>
                <div className="flex justify-between px-3.5 py-2 gap-3">
                  <dt className="text-slate-500">Product</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {alertModal.record.product}
                  </dd>
                </div>
                <div className="flex justify-between px-3.5 py-2 gap-3">
                  <dt className="text-slate-500">Phone</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums text-right">
                    {alertModal.record.phone}
                  </dd>
                </div>
              </dl>
            )}

            <button
              type="button"
              onClick={() => {
                setAlertModal(null);
                if (alertModal.type === 'success') {
                  resetForm();
                  requestAnimationFrame(() => {
                    document.getElementById('form-name')?.focus();
                  });
                }
              }}
              data-testid="quote-alert-action"
              className="w-full py-2.5 rounded-lg bg-terracotta-600 text-white font-semibold text-sm hover:bg-terracotta-700 transition-colors cursor-pointer"
            >
              {alertModal.type === 'success' ? 'Submit Another Quote' : 'OK'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
