'use client';

// ════════════════════════════════════════
// 📄 src/components/ui/Toast.jsx
// Notifications légères succès/erreur
// Usage: const { toast, ToastContainer } = useToast()
//        toast.success('Sauvegardé !') | toast.error('Erreur')
// ════════════════════════════════════════

import { createContext, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => add(msg, 'success'),
    error:   (msg) => add(msg, 'error'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* ── Conteneur ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{    opacity: 0, y: 8,   scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`
                pointer-events-auto flex items-center gap-3 px-5 py-3.5
                rounded-2xl shadow-lg text-sm font-semibold max-w-sm
                ${t.type === 'success'
                  ? 'bg-[#006e2f] text-white'
                  : 'bg-[#b91a24] text-white'}
              `}
            >
              {t.type === 'success'
                ? <CheckCircle size={18} strokeWidth={2} className="shrink-0" />
                : <XCircle     size={18} strokeWidth={2} className="shrink-0" />
              }
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => remove(t.id)}
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Fermer"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans ToastProvider');
  return ctx;
}
