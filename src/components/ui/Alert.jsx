export default function Alert({ type, message }) {
  const alertClasses = {
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-700',
    warning: 'bg-yellow-50 text-yellow-700',
    info: 'bg-blue-50 text-blue-700'
  };

  return (
    <div className={`p-3 rounded-lg ${alertClasses[type]}`}>
      {message}
    </div>
  );
}