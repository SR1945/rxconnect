'use client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
  children: React.ReactNode
}

/**
 * Reusable Button component.
 * Accessibility: min 52px height, visible focus ring, disabled state.
 * Used throughout the app for consistency.
 */
export default function Button({
  loading = false,
  variant = 'primary',
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all ' +
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] px-6 py-3 text-base'

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  )
}
