'use client';

// ════════════════════════════════════════
// 📄 src/components/ui/ErrorBlock.jsx
// ════════════════════════════════════════

import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorBlock({ message = 'Une erreur est survenue.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-semibold text-[#121c2a] mb-1">Oops !</p>
        <p className="text-sm text-[#121c2a]/60 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#eff4ff] text-[#121c2a] font-semibold text-sm hover:bg-[#dee9fc] transition-colors"
        >
          <RefreshCw size={15} strokeWidth={2} />
          Réessayer
        </button>
      )}
    </div>
  );
}
