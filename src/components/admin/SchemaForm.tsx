"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { Field } from "@/lib/sectionSchemas";

/* Renders a form from a section schema and edits a JSON content object. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Val = any;

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 bg-white";

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: Val;
  onChange: (v: Val) => void;
}) {
  switch (field.type) {
    case "text":
    case "icon":
    case "image":
      return (
        <div>
          <input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
            placeholder={field.type === "icon" ? "e.g. shield-check (lucide icon name)" : ""}
          />
          {field.type === "image" && value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="mt-2 h-20 rounded-lg object-cover border border-gray-200" />
          ) : null}
        </div>
      );
    case "textarea":
      return (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={inputCls}
        />
      );
    case "code":
      return (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className={`${inputCls} font-mono text-xs`}
        />
      );
    case "number":
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
          className={inputCls}
        />
      );
    case "boolean":
      return (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`w-12 h-7 rounded-full transition-colors relative ${value ? "bg-secondary" : "bg-gray-300"}`}
        >
          <span
            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${value ? "left-6" : "left-1"}`}
          />
        </button>
      );
    case "select":
      return (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)} className={inputCls}>
          <option value="">— default —</option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "strings": {
      const arr: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-2">
          {arr.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s}
                onChange={(e) => {
                  const next = [...arr];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="text-gray-400 hover:text-accent shrink-0"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...arr, ""])}
            className="flex items-center gap-1.5 text-secondary text-sm font-semibold hover:underline"
          >
            <Plus className="w-4 h-4" /> Add item
          </button>
        </div>
      );
    }
    case "link":
    case "object": {
      const obj = value && typeof value === "object" ? value : {};
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          {(field.fields ?? []).map((f) => (
            <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
              <FieldEditor field={f} value={obj[f.key]} onChange={(v) => onChange({ ...obj, [f.key]: v })} />
            </div>
          ))}
        </div>
      );
    }
    case "list": {
      const arr: Val[] = Array.isArray(value) ? value : [];
      return (
        <ListEditor field={field} arr={arr} onChange={onChange} />
      );
    }
    default:
      return null;
  }
}

function ListEditor({
  field,
  arr,
  onChange,
}: {
  field: Field;
  arr: Val[];
  onChange: (v: Val[]) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    const next = [...arr];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const titleOf = (item: Val, i: number) =>
    item?.title || item?.name || item?.label || item?.q || item?.year || item?.caption || `Item ${i + 1}`;

  return (
    <div className="space-y-3">
      {arr.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setCollapsed((s) => ({ ...s, [i]: !s[i] }))}
              className="flex-1 text-left text-sm font-semibold text-gray-700 truncate"
            >
              {titleOf(item, i)}
            </button>
            <button type="button" onClick={() => move(i, -1)} className="text-gray-400 hover:text-primary" aria-label="Move up">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => move(i, 1)} className="text-gray-400 hover:text-primary" aria-label="Move down">
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              className="text-gray-400 hover:text-accent"
              aria-label="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {!collapsed[i] && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(field.fields ?? []).map((f) => (
                <div
                  key={f.key}
                  className={
                    ["textarea", "list", "strings", "object", "link", "code"].includes(f.type)
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                  <FieldEditor
                    field={f}
                    value={item?.[f.key]}
                    onChange={(v) => {
                      const next = [...arr];
                      next[i] = { ...next[i], [f.key]: v };
                      onChange(next);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...arr, {}])}
        className="flex items-center gap-1.5 text-secondary text-sm font-semibold hover:underline"
      >
        <Plus className="w-4 h-4" /> Add {field.label.toLowerCase().replace(/s$/, "")}
      </button>
    </div>
  );
}

export default function SchemaForm({
  fields,
  value,
  onChange,
}: {
  fields: Field[];
  value: Record<string, Val>;
  onChange: (v: Record<string, Val>) => void;
}) {
  return (
    <div className="space-y-6">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
          {f.help && <p className="text-xs text-gray-400 mb-2">{f.help}</p>}
          <FieldEditor field={f} value={value[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
        </div>
      ))}
    </div>
  );
}
