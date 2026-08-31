"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { settingsSeed, type SettingsState } from "@/lib/settingsData";
import { SettingsSection } from "./SettingsSection";

const STORAGE_KEY = "abu-salem-admin-settings";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SectionKey = keyof SettingsState;

const checkboxClass =
  "h-4 w-4 rounded border-border text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "AS";
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsState>(settingsSeed);
  const [savedSection, setSavedSection] = useState<SectionKey | null>(null);
  const [errors, setErrors] = useState<Partial<Record<SectionKey, string>>>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  function updateField<S extends SectionKey>(section: S, key: keyof SettingsState[S], value: SettingsState[S][keyof SettingsState[S]]) {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setSavedSection(null);
  }

  function saveSection(section: SectionKey, error: string | null, snapshot: SettingsState = settings) {
    if (error) {
      setErrors((prev) => ({ ...prev, [section]: error }));
      setSavedSection(null);
      return;
    }
    setErrors((prev) => ({ ...prev, [section]: undefined }));
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Storage may be unavailable — the change still applies for this session's UI.
    }
    setSavedSection(section);
  }

  function SaveButton({ section }: { section: SectionKey }) {
    return (
      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" variant="primary" size="sm">
          Save Changes
        </Button>
        {errors[section] && <p className="text-sm text-red-600">{errors[section]}</p>}
        {savedSection === section && (
          <p className="text-sm text-gold-600" role="status">
            Saved.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const error = !settings.company.name.trim() ? "Company name is required." : null;
          saveSection("company", error);
        }}
        noValidate
      >
        <SettingsSection title="Company" description="Core business details shown across the public site.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                value={settings.company.name}
                onChange={(e) => updateField("company", "name", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Tagline</label>
              <textarea
                rows={2}
                value={settings.company.tagline}
                onChange={(e) => updateField("company", "tagline", e.target.value)}
                className={cn(fieldClass, "resize-none")}
              />
            </div>

            <div>
              <label className={labelClass}>Established Year</label>
              <input
                type="text"
                value={settings.company.establishedYear}
                onChange={(e) => updateField("company", "establishedYear", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                value={settings.company.address}
                onChange={(e) => updateField("company", "address", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Logo</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-border bg-ivory-100">
                  <Image src={settings.company.logoUrl} alt="" fill sizes="48px" className="object-contain" />
                </div>
                <input
                  type="text"
                  value={settings.company.logoUrl}
                  onChange={(e) => updateField("company", "logoUrl", e.target.value)}
                  className={cn(fieldClass, "mt-0")}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Hours (Sat – Thu)</label>
              <input
                type="text"
                value={settings.company.weekdayHours}
                onChange={(e) => updateField("company", "weekdayHours", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Hours (Friday)</label>
              <input
                type="text"
                value={settings.company.fridayHours}
                onChange={(e) => updateField("company", "fridayHours", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <SaveButton section="company" />
        </SettingsSection>
      </form>

      {/* Website */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const error = !settings.website.siteTitle.trim() ? "Site title is required." : null;
          saveSection("website", error);
        }}
        noValidate
      >
        <SettingsSection title="Website" description="Metadata used for the browser tab and search results.">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Site Title</label>
              <input
                type="text"
                value={settings.website.siteTitle}
                onChange={(e) => updateField("website", "siteTitle", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                rows={3}
                value={settings.website.metaDescription}
                onChange={(e) => updateField("website", "metaDescription", e.target.value)}
                className={cn(fieldClass, "resize-none")}
              />
            </div>

            <div>
              <label className={labelClass}>
                Domain <span className="normal-case text-gray-500">(unconfirmed — placeholder until registered)</span>
              </label>
              <input
                type="text"
                value={settings.website.domain}
                onChange={(e) => updateField("website", "domain", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <SaveButton section="website" />
        </SettingsSection>
      </form>

      {/* Social Links */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const error =
            settings.social.email.trim() && !EMAIL_PATTERN.test(settings.social.email.trim())
              ? "Enter a valid email address."
              : null;
          saveSection("social", error);
        }}
        noValidate
      >
        <SettingsSection title="Social Links" description="Public contact channels shown in the footer and contact page.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Instagram</label>
              <input
                type="text"
                value={settings.social.instagram}
                onChange={(e) => updateField("social", "instagram", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>TikTok</label>
              <input
                type="text"
                value={settings.social.tiktok}
                onChange={(e) => updateField("social", "tiktok", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="text"
                value={settings.social.whatsapp}
                onChange={(e) => updateField("social", "whatsapp", e.target.value)}
                placeholder="971500000000"
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={settings.social.phone}
                onChange={(e) => updateField("social", "phone", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Public Email</label>
              <input
                type="email"
                value={settings.social.email}
                onChange={(e) => updateField("social", "email", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <SaveButton section="social" />
        </SettingsSection>
      </form>

      {/* Notifications */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const error =
            settings.notifications.notifyEmail.trim() &&
            !EMAIL_PATTERN.test(settings.notifications.notifyEmail.trim())
              ? "Enter a valid email address."
              : null;
          saveSection("notifications", error);
        }}
        noValidate
      >
        <SettingsSection title="Notifications" description="Choose what triggers an email alert to the admin team.">
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-charcoal-900">
              <input
                type="checkbox"
                checked={settings.notifications.notifyNewLeads}
                onChange={(e) => updateField("notifications", "notifyNewLeads", e.target.checked)}
                className={checkboxClass}
              />
              Email me when a new lead comes in
            </label>

            <label className="flex items-center gap-3 text-sm text-charcoal-900">
              <input
                type="checkbox"
                checked={settings.notifications.notifyNewMessages}
                onChange={(e) => updateField("notifications", "notifyNewMessages", e.target.checked)}
                className={checkboxClass}
              />
              Email me when a new message comes in
            </label>

            <label className="flex items-center gap-3 text-sm text-charcoal-900">
              <input
                type="checkbox"
                checked={settings.notifications.weeklySummary}
                onChange={(e) => updateField("notifications", "weeklySummary", e.target.checked)}
                className={checkboxClass}
              />
              Send a weekly summary email
            </label>
          </div>

          <div className="mt-4">
            <label className={labelClass}>Notification Email</label>
            <input
              type="email"
              value={settings.notifications.notifyEmail}
              onChange={(e) => updateField("notifications", "notifyEmail", e.target.value)}
              className={fieldClass}
            />
          </div>

          <SaveButton section="notifications" />
        </SettingsSection>
      </form>

      {/* Admin Profile */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const error = !settings.adminProfile.name.trim() ? "Name is required." : null;
          if (error) {
            saveSection("adminProfile", error);
            return;
          }
          const nextSettings: SettingsState = {
            ...settings,
            adminProfile: { ...settings.adminProfile, initials: initialsFrom(settings.adminProfile.name) },
          };
          setSettings(nextSettings);
          saveSection("adminProfile", null, nextSettings);
        }}
        noValidate
      >
        <SettingsSection title="Admin Profile" description="Shown in the dashboard header.">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-lg text-gold-400">
              {settings.adminProfile.initials}
            </span>

            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  value={settings.adminProfile.name}
                  onChange={(e) => updateField("adminProfile", "name", e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Role</label>
                <input
                  type="text"
                  value={settings.adminProfile.role}
                  onChange={(e) => updateField("adminProfile", "role", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={settings.adminProfile.phone}
                onChange={(e) => updateField("adminProfile", "phone", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={settings.adminProfile.email}
                onChange={(e) => updateField("adminProfile", "email", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <SaveButton section="adminProfile" />
        </SettingsSection>
      </form>
    </div>
  );
}
