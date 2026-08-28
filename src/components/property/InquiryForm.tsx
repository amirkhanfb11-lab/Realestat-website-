"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import type { Property } from "@/lib/properties";

export function InquiryForm({ property }: { property: Property }) {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();

  return (
    <form onSubmit={(event) => event.preventDefault()} className="rounded-2xl bg-white p-6 shadow-soft">
      <h2 className="text-base font-semibold text-navy-950">Request Information</h2>
      <p className="mt-1 text-sm text-gray-500">We&apos;ll respond within one business day.</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={nameId} className={labelClass}>
            Full Name
          </label>
          <input id={nameId} type="text" required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={emailId} className={labelClass}>
            Email
          </label>
          <input id={emailId} type="email" required placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={phoneId} className={labelClass}>
            Phone
          </label>
          <input id={phoneId} type="tel" placeholder="(800) 555-0100" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={messageId} className={labelClass}>
            Message
          </label>
          <textarea
            id={messageId}
            rows={4}
            defaultValue={`I'm interested in ${property.title} (${property.location}). Please send more information.`}
            className={`${fieldClass} resize-none`}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        Send Inquiry
      </Button>
    </form>
  );
}
