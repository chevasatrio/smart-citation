"use client";

import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "url" | "date";
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="input-field-group">
      <label htmlFor={id} className="input-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
        autoComplete="off"
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
