export default function Button({ 
  children, 
  type = 'button', 
  className = '', 
  disabled = false,
  ...props 
}) {
  return (
    <button
      type={type}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 disabled:opacity-50 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}