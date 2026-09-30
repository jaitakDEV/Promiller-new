// "use client";

// import { useEffect, useId, useState, type ReactNode } from "react";

// interface BaseFieldProps {
//   label: string;
//   hint?: string;
//   guide?: string;
//   icon?: ReactNode;
// }

// interface NumberFieldProps extends BaseFieldProps {
//   type?: "number";
//   value: number;
//   onChange: (value: number) => void;
//   step?: number;
//   prefix?: string;
//   suffix?: string;
// }

// interface SelectFieldProps extends BaseFieldProps {
//   type: "select";
//   value: string;
//   onChange: (value: string) => void;
//   options: { value: string; label: string }[];
// }

// type FieldProps = NumberFieldProps | SelectFieldProps;

// export default function Field(props: FieldProps) {
//   const { label, hint, guide, icon } = props;
//   const inputId = useId();
//   const guideId = useId();
//   const [guideOpen, setGuideOpen] = useState(false);

//   return (
//     <div className="mb-4">
//       <div className="mb-1.5 flex items-center justify-between gap-2">
//         <label
//           htmlFor={inputId}
//           className="flex min-w-0 items-center gap-2"
//         >
//           {icon}
//           <span className="truncate text-[12.5px] font-semibold text-stone-800">
//             {label}
//           </span>
//         </label>
//         <span className="flex shrink-0 items-center gap-2">
//           {hint && (
//             <span className="whitespace-nowrap text-[10.5px] font-medium text-stone-500">
//               {hint}
//             </span>
//           )}
//           {guide && (
//             <button
//               type="button"
//               aria-expanded={guideOpen}
//               aria-controls={guideId}
//               aria-label={`${label} — guide`}
//               onClick={() => setGuideOpen((o) => !o)}
//               className={`flex h-[19px] w-[19px] items-center justify-center rounded-full border text-[11px] font-bold leading-none transition-colors ${
//                 guideOpen
//                   ? "border-amber-800 bg-amber-800 text-white"
//                   : "border-amber-800/70 bg-white text-amber-800 hover:bg-amber-800 hover:text-white"
//               }`}
//             >
//               i
//             </button>
//           )}
//         </span>
//       </div>

//       {props.type === "select" ? (
//         <SelectInput id={inputId} {...props} />
//       ) : (
//         <NumberInput id={inputId} {...props} />
//       )}

//       {guide && guideOpen && (
//         <div
//           id={guideId}
//           role="note"
//           className="mt-1.5 rounded-lg border border-dashed border-amber-300 bg-amber-50/70 px-3 py-2 text-[11.5px] leading-relaxed text-stone-600"
//         >
//           {guide}
//         </div>
//       )}
//     </div>
//   );
// }

// function NumberInput({
//   id,
//   value,
//   onChange,
//   step = 0.1,
//   prefix,
//   suffix,
// }: NumberFieldProps & { id: string }) {
//   // Numeric inputs need a local string buffer: if we hand the browser a
//   // number derived straight from `value` on every keystroke, clearing the
//   // field to type a fresh number snaps it back to "0" mid-edit. We keep
//   // the raw text the user is typing here, and only push a parsed number
//   // up to the parent (and only resync from the parent) when it actually
//   // represents a different, valid number.
//   const [text, setText] = useState(String(value));

//   useEffect(() => {
//     const parsed = parseFloat(text);
//     if (parsed !== value || text.trim() === "") {
//       setText(String(value));
//     }
//     // Only resync when the external value changes (e.g. Reset button) —
//     // not on every local keystroke.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value]);

//   let radius = "rounded-lg";
//   if (prefix && suffix) radius = "rounded-none";
//   else if (prefix) radius = "rounded-r-lg rounded-l-none";
//   else if (suffix) radius = "rounded-l-lg rounded-r-none";

//   return (
//     <div className="flex items-stretch">
//       {prefix && (
//         <span className="flex items-center whitespace-nowrap rounded-l-lg border border-r-0 border-stone-200 bg-stone-50 px-2.5 font-mono text-[12.5px] font-semibold text-stone-500">
//           {prefix}
//         </span>
//       )}
//       <input
//         id={id}
//         type="number"
//         inputMode="decimal"
//         step={step}
//         value={text}
//         onChange={(e) => {
//           const raw = e.target.value;
//           setText(raw);
//           const parsed = parseFloat(raw);
//           if (!Number.isNaN(parsed)) onChange(parsed);
//         }}
//         onBlur={() => {
//           // Leaving the field empty or invalid resolves to 0 on blur —
//           // not on every keystroke.
//           if (text.trim() === "" || Number.isNaN(parseFloat(text))) {
//             setText("0");
//             onChange(0);
//           }
//         }}
//         className={`w-full border border-stone-200 bg-white px-3 py-2 font-mono text-[13px] font-semibold text-stone-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15 ${radius}`}
//       />
//       {suffix && (
//         <span className="flex items-center whitespace-nowrap rounded-r-lg border border-l-0 border-stone-200 bg-stone-50 px-2.5 font-mono text-[12.5px] font-semibold text-stone-500">
//           {suffix}
//         </span>
//       )}
//     </div>
//   );
// }

// function SelectInput({
//   id,
//   value,
//   onChange,
//   options,
// }: SelectFieldProps & { id: string }) {
//   return (
//     <select
//       id={id}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 font-mono text-[13px] font-semibold text-stone-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
//     >
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   );
// }

"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

interface BaseFieldProps {
  label: string;
  hint?: string;
  guide?: string;
  icon?: ReactNode;
}

interface NumberFieldProps extends BaseFieldProps {
  type?: "number";
  value: number;
  onChange: (value: number) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
  /** Shown inside the input when it's empty. Defaults to "0". */
  placeholder?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

type FieldProps = NumberFieldProps | SelectFieldProps;

export default function Field(props: FieldProps) {
  const { label, hint, guide, icon } = props;
  const inputId = useId();
  const guideId = useId();
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={inputId} className="flex min-w-0 items-center gap-2">
          {icon}
          <span className="truncate text-[12.5px] font-semibold text-stone-800">
            {label}
          </span>
        </label>
        <span className="flex shrink-0 items-center gap-2">
          {hint && (
            <span className="whitespace-nowrap text-[10.5px] font-medium text-stone-500">
              {hint}
            </span>
          )}
          {guide && (
            <button
              type="button"
              aria-expanded={guideOpen}
              aria-controls={guideId}
              aria-label={`${label} — guide`}
              onClick={() => setGuideOpen((o) => !o)}
              className={`flex h-[19px] w-[19px] items-center justify-center rounded-full border text-[11px] font-bold leading-none transition-colors ${
                guideOpen
                  ? "border-amber-800 bg-amber-800 text-white"
                  : "border-amber-800/70 bg-white text-amber-800 hover:bg-amber-800 hover:text-white"
              }`}
            >
              i
            </button>
          )}
        </span>
      </div>

      {props.type === "select" ? (
        <SelectInput id={inputId} {...props} />
      ) : (
        <NumberInput id={inputId} {...props} />
      )}

      {guide && guideOpen && (
        <div
          id={guideId}
          role="note"
          className="mt-1.5 rounded-lg border border-dashed border-amber-300 bg-amber-50/70 px-3 py-2 text-[11.5px] leading-relaxed text-stone-600"
        >
          {guide}
        </div>
      )}
    </div>
  );
}

// A value of 0 is treated as "not filled in yet" for display purposes —
// new users land on a blank form instead of a pre-filled sample. The
// number itself is still a real 0 for calculations; only the on-screen
// text is empty until the user (or a Reset-driven external value change)
// gives it something else.
function displayText(value: number): string {
  return value === 0 ? "" : String(value);
}

function NumberInput({
  id,
  value,
  onChange,
  step = 0.1,
  prefix,
  suffix,
  placeholder = "0",
}: NumberFieldProps & { id: string }) {
  // Numeric inputs need a local string buffer: if we hand the browser a
  // number derived straight from `value` on every keystroke, clearing the
  // field to type a fresh number snaps it back to "0" mid-edit. We keep
  // the raw text the user is typing here, and only push a parsed number
  // up to the parent (and only resync from the parent) when it actually
  // represents a different, valid number.
  const [text, setText] = useState(displayText(value));

  useEffect(() => {
    const parsed = parseFloat(text);
    if (parsed !== value || (text.trim() === "" && value !== 0)) {
      setText(displayText(value));
    }
    // Only resync when the external value changes (e.g. Reset button) —
    // not on every local keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  let radius = "rounded-lg";
  if (prefix && suffix) radius = "rounded-none";
  else if (prefix) radius = "rounded-r-lg rounded-l-none";
  else if (suffix) radius = "rounded-l-lg rounded-r-none";

  return (
    <div className="flex items-stretch">
      {prefix && (
        <span className="flex items-center whitespace-nowrap rounded-l-lg border border-r-0 border-stone-200 bg-stone-50 px-2.5 font-mono text-[12.5px] font-semibold text-stone-500">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          setText(raw);
          const parsed = parseFloat(raw);
          if (!Number.isNaN(parsed)) onChange(parsed);
        }}
        onBlur={() => {
          // Leaving the field empty or invalid resolves to 0 for the
          // calculation, but the box itself stays visually empty (not a
          // literal "0") — matches the blank-by-default new-user state.
          if (text.trim() === "" || Number.isNaN(parseFloat(text))) {
            setText("");
            onChange(0);
          }
        }}
        className={`w-full border border-stone-200 bg-white px-3 py-2 font-mono text-[13px] font-semibold text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15 ${radius}`}
      />
      {suffix && (
        <span className="flex items-center whitespace-nowrap rounded-r-lg border border-l-0 border-stone-200 bg-stone-50 px-2.5 font-mono text-[12.5px] font-semibold text-stone-500">
          {suffix}
        </span>
      )}
    </div>
  );
}

function SelectInput({
  id,
  value,
  onChange,
  options,
}: SelectFieldProps & { id: string }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 font-mono text-[13px] font-semibold text-stone-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
