"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Sparkles } from "lucide-react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useI18n } from "@/lib/i18n-context";

// Componente interno que maneja ChatKit
function ChatKitWindow({ onClose, t }: { onClose: () => void; t: (key: string) => string }) {
  console.log('ChatKitWindow mounted');

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        try {
          if (existing) {
            console.log('Refreshing token...');
            const res = await fetch('/api/chatkit/refresh', {
              method: 'POST',
              body: JSON.stringify({ token: existing }),
              headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
              const errorData = await res.json();
              console.error('Refresh error:', errorData);
              throw new Error(`Failed to refresh token: ${errorData.error}`);
            }

            const { client_secret } = await res.json();
            console.log('Token refreshed successfully');
            return client_secret;
          }

          // Create new session
          console.log('Creating new session...');
          const res = await fetch('/api/chatkit/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error('Session creation error:', errorData);
            throw new Error(`Failed to create session: ${errorData.error}`);
          }

          const { client_secret } = await res.json();
          console.log('Session created successfully');
          return client_secret;
        } catch (error) {
          console.error('getClientSecret error:', error);
          throw error;
        }
      },
    },
    // Tema minimalista con bordes redondeados
    theme: {
      colorScheme: 'light',
      radius: 'round', // Input y elementos más redondeados
      density: 'normal',
    },
    // Deshabilitar historial de threads
    history: {
      enabled: false,
    },
    // Deshabilitar header de ChatKit (usamos el nuestro)
    header: {
      enabled: false,
    },
    // Placeholder simple
    composer: {
      placeholder: t("chatbot.placeholder"),
    },
    // Deshabilitar botones de feedback (like/dislike)
    threadItemActions: {
      feedback: false,
      retry: false,
    },
    onError: ({ error }) => {
      console.error('ChatKit error:', error);
    },
    onReady: () => {
      console.log('ChatKit is ready!');
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[650px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-[hsl(var(--border))] flex flex-col overflow-hidden"
    >
      {/* Header personalizado */}
      <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
          </motion.div>
          <div>
            <h3 className="text-white font-semibold">Asistente Virtual</h3>
            <p className="text-white/80 text-xs">{t("chatbot.status")}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ChatKit Component - sin header propio */}
      <ChatKit control={control} className="flex-1 w-full" />
    </motion.div>
  );
}

export function Chatbot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Elegante y Sutil */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px hsl(var(--primary) / 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(var(--primary))] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window with ChatKit */}
      <AnimatePresence>
        {isOpen && <ChatKitWindow onClose={() => setIsOpen(false)} t={t} />}
      </AnimatePresence>
    </>
  );
}
