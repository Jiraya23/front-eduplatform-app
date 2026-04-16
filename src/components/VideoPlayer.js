'use client';

import { Play, Volume2, Maximize, Settings } from 'lucide-react';
import { useState } from 'react';

export default function VideoPlayer({ videoUrl, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Video Container */}
      <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full hover:bg-green-600 transition transform hover:scale-110"
            >
              <Play size={32} className="text-white fill-white ml-1" />
            </button>
          )}
          {isPlaying && (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <video
                className="w-full h-full"
                controls
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas les vidéos HTML5.
              </video>
            </div>
          )}
        </div>

        {/* Controls Overlay */}
        {!isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-green-500 transition">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white hover:text-green-500 transition">
                <Settings size={20} />
              </button>
              <button className="text-white hover:text-green-500 transition">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
  );
}
