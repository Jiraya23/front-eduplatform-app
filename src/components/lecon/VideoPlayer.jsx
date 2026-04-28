'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Subtitles, Settings, Maximize } from 'lucide-react';

// Lecteur vidéo avec overlay de contrôles
export default function VideoPlayer({ lesson }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(18,28,42,0.12)] bg-[#121c2a]">
        {lesson.videoUrl ? (
          <Image
            src={lesson.videoUrl}
            alt="Lesson Video Thumbnail"
            fill
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#006e2f]/20 to-[#121c2a]">
            <span className="text-white/40 text-lg font-medium">Vidéo non disponible</span>
          </div>
        )}

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
          {/* Contrôles vidéo */}
          <div className="flex items-center justify-between text-white">
            {/* Play button et temps */}
            <div className="flex items-center gap-6">
              <button className="hover:scale-110 transition-transform">
                <svg className="w-12 h-12 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {lesson.currentTime} / {lesson.duration}
                </span>
              </div>
            </div>

            {/* Boutons paramètres */}
            <div className="flex items-center gap-4">
              <button className="opacity-80 hover:opacity-100 transition-opacity">
                <Subtitles size={22} className="text-white" />
              </button>
              <button className="opacity-80 hover:opacity-100 transition-opacity">
                <Settings size={22} className="text-white" />
              </button>
              <button className="opacity-80 hover:opacity-100 transition-opacity">
                <Maximize size={22} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
