export function Badge({ children, variant = 'primary', className = '' }) {
  const baseStyles = 'px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md';
  
  const variants = {
    primary: 'bg-primary/90 text-white',
    secondary: 'bg-on-surface/80 text-white',
    blue: 'bg-blue-600/90 text-white',
    purple: 'bg-purple-600/90 text-white',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
