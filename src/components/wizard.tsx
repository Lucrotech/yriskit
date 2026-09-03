"use client";

import { useMemo, useState } from "react";
import { FORM_STEPS, isFieldVisible, type FormField } from "@/lib/rmcp/form-schema";
import { cn } from "@/lib/utils";

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        className="input min-h-28"
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        placeholder={field.placeholder}
      />
    );
  }
  if (field.type === "yesno" || field.type === "select") {
    return (
      <select
        className="input"
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      >
        <option value="">Select…</option>
        {(field.options || []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "multiselect") {
    const selected = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="space-y-2 border border-stone-200 bg-white p-3">
        {(field.options || []).map((opt) => (
          <label key={opt.value} className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={selected.includes(opt.value)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...selected, opt.value]
                  : selected.filter((v) => v !== opt.value);
                onChange(next);
              }}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }
  const type =
    field.type === "email" || field.type === "tel" || field.type === "url" || field.type === "date"
      ? field.type
      : "text";
  return (
    <input
      className="input"
      type={type}
      value={String(value || "")}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      placeholder={field.placeholder}
    />
  );
}

export function Wizard({
  submissionId,
  initialAnswers,
}: {
  submissionId: string;
  initialAnswers: Record<string, unknown>;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>(initialAnswers);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const step = FORM_STEPS[stepIndex];
  const visible = useMemo(
    () => step.fields.filter((field) => isFieldVisible(field, answers)),
    [step, answers],
  );

  async function next() {
    setError("");
    setSaving(true);
    try {
      const saveRes = await fetch(`/api/rmcp/${submissionId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!saveRes.ok) throw new Error("Could not save.");

      if (stepIndex < FORM_STEPS.length - 1) {
        setStepIndex((i) => i + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const submitRes = await fetch(`/api/rmcp/${submissionId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!submitRes.ok) {
        const body = (await submitRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Could not generate the RMCP.");
      }

      window.location.assign(`/app/rmcp/${submissionId}/complete`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex gap-2">
        {FORM_STEPS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStepIndex(index)}
            className={cn(
              "h-1.5 flex-1",
              index <= stepIndex ? "bg-navy" : "bg-stone-200",
            )}
            aria-label={item.title}
          />
        ))}
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-gold-dark">
        Step {stepIndex + 1} of {FORM_STEPS.length}
      </p>
      <h1 className="mt-2 font-serif text-3xl text-navy">{step.title}</h1>
      <p className="mt-2 max-w-2xl text-ink/70">{step.description}</p>
      <div className="mt-8 space-y-5">
        {visible.map((field) => (
          <label key={field.key} className="block">
            <span className="label">
              {field.label}
              {field.required ? " *" : ""}
            </span>
            <FieldControl
              field={field}
              value={answers[field.key]}
              onChange={(value) => setAnswers((prev) => ({ ...prev, [field.key]: value }))}
            />
            {field.help ? <span className="mt-1 block text-xs text-ink/50">{field.help}</span> : null}
          </label>
        ))}
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {saving && stepIndex === FORM_STEPS.length - 1 ? (
        <p className="mt-4 text-sm text-ink/70">
          Building your Word and PDF documents. This can take up to 30 seconds the first
          time.
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {stepIndex > 0 ? (
          <button type="button" className="btn-secondary" onClick={() => setStepIndex((i) => i - 1)}>
            Back
          </button>
        ) : null}
        <button type="button" className="btn-primary" onClick={next} disabled={saving}>
          {stepIndex === FORM_STEPS.length - 1
            ? saving
              ? "Generating…"
              : "Generate RMCP"
            : saving
              ? "Saving…"
              : "Save and continue"}
        </button>
      </div>
    </div>
  );
}
