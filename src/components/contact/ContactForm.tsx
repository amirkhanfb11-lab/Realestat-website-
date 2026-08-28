"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { labelClass } from "@/lib/formStyles";

// Border color is intentionally omitted here (unlike the shared fieldClass) so each
// field below can apply its own border-border / border-red-400 based on validation state.
const fieldClass =
  "mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-charcoal-900 transition-colors focus-visible:outline-none focus-visible:border-gold-500";
const errorClass = "mt-1.5 text-xs text-red-600";

const subjects = [
  "General Inquiry",
  "Property Buying",
  "Property Selling",
  "Property Rental",
  "Property Management",
  "Real Estate Consultation",
  "Investment Consultation",
];

const WHATSAPP_NUMBER = "971508333410";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: Errors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please add a short message.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Please add a few more details (at least 10 characters).";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const lines = [
      `New website inquiry — ${values.subject}`,
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
    ];
    if (values.phone.trim()) {
      lines.push(`Phone: ${values.phone.trim()}`);
    }
    lines.push("", values.message.trim());

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="text-lg font-semibold text-navy-950">Send Us a Message</h2>
      <p className="mt-1 text-sm text-gray-500">
        We&apos;ll open WhatsApp with your message ready to send.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className={labelClass}>
            Full Name
          </label>
          <input
            id={nameId}
            type="text"
            value={values.name}
            onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
            className={`${fieldClass} ${errors.name ? "border-red-400" : "border-border"}`}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={emailId} className={labelClass}>
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@example.com"
            className={`${fieldClass} ${errors.email ? "border-red-400" : "border-border"}`}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={phoneId} className={labelClass}>
            Phone <span className="normal-case text-gray-400">(optional)</span>
          </label>
          <input
            id={phoneId}
            type="tel"
            value={values.phone}
            onChange={(event) => setValues((v) => ({ ...v, phone: event.target.value }))}
            placeholder="+971 50 000 0000"
            className={`${fieldClass} border-border`}
          />
        </div>

        <div>
          <label htmlFor={subjectId} className={labelClass}>
            I&apos;m Interested In
          </label>
          <select
            id={subjectId}
            value={values.subject}
            onChange={(event) => setValues((v) => ({ ...v, subject: event.target.value }))}
            className={`${fieldClass} border-border`}
          >
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={messageId} className={labelClass}>
            Message
          </label>
          <textarea
            id={messageId}
            rows={5}
            value={values.message}
            onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
            aria-invalid={Boolean(errors.message)}
            placeholder="Tell us what you're looking for..."
            className={`${fieldClass} resize-none ${errors.message ? "border-red-400" : "border-border"}`}
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        Send Message
      </Button>

      {submitted && (
        <p className="mt-4 text-sm text-gold-600" role="status">
          Opening WhatsApp in a new tab — send the pre-filled message to reach us directly.
        </p>
      )}
    </form>
  );
}
