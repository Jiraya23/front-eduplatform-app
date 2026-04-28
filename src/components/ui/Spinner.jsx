'use client';

// ════════════════════════════════════════
// 📄 src/components/ui/Spinner.jsx
// ════════════════════════════════════════

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
  };

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        border-[#006e2f]/20
        border-t-[#006e2f]
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Chargement..."
    />
  );
}

export function SpinnerPage() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <Spinner size="lg" />
    </div>
  );
}
