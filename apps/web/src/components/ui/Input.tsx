interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

/**
 * Reusable Input component.
 * Accessibility: visible label, 52px min height, large 18px font,
 * clear error state with alert role.
 */
export default function Input({ label, hint, error, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <label htmlFor={inputId} className="block text-base font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      {hint && (
        <p id={`${inputId}-hint`} className="text-sm text-gray-500 mb-2">
          {hint}
        </p>
      )}
      <input
        id={inputId}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        aria-invalid={!!error}
        className={[
          'w-full px-4 py-3 text-base rounded-xl border-2 transition-colors',
          'focus:outline-none focus:ring-4 focus:ring-offset-1 min-h-[52px]',
          error
            ? 'border-red-400 bg-red-50 focus:ring-red-300'
            : 'border-gray-300 bg-white hover:border-gray-400 focus:border-primary-500 focus:ring-primary-200',
        ].join(' ')}
        {...props}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  )
}
