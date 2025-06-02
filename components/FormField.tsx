"use client"

import type React from "react"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  as?: string
  options?: { value: string; label: string }[]
}

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-slate-600 text-base font-medium">
      {label}
    </label>
    {as === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 py-2.5 px-4 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:font-medium text-base font-medium resize-none min-h-[120px]"
      />
    ) : as === "select" ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="border border-slate-200 rounded-xl text-slate-800 py-2.5 px-4 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base font-medium appearance-none bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 py-2.5 px-4 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:font-medium text-base font-medium"
      />
    )}
  </div>
)

export default FormField
