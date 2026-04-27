import Link from 'next/link';

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  asChild = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'px-10 py-5 rounded-xl font-bold text-lg transition-all';
  
  const variants = {
    primary: 'bg-gradient-primary hover:shadow-hover text-white hover:-translate-y-1 active:translate-y-0',
    secondary: 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface',
    outline: 'bg-white border border-surface-container-highest text-on-surface hover:bg-surface-container',
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
