'use client';



import { useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';



// Lecteur vidéo avec contrôles natifs

export default function VideoPlayer({ lesson }) {

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);



  const togglePlay = () => {

    if (videoRef.current) {

      if (isPlaying) {

        videoRef.current.pause();

      } else {

        videoRef.current.play();

      }

      setIsPlaying(!isPlaying);

    }

  };



  const toggleMute = () => {

    if (videoRef.current) {

      videoRef.current.muted = !isMuted;

      setIsMuted(!isMuted);

    }

  };



  const handleTimeUpdate = () => {

    if (videoRef.current) {

      setCurrentTime(videoRef.current.currentTime);

    }

  };



  const handleLoadedMetadata = () => {

    if (videoRef.current) {

      setDuration(videoRef.current.duration);

    }

  };



  const formatTime = (time) => {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;

  };



  const handleFullscreen = () => {

    if (videoRef.current) {

      if (videoRef.current.requestFullscreen) {

        videoRef.current.requestFullscreen();

      }

    }

  };



  if (!lesson.videoUrl) {

    return (

      <motion.div

        className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(18,28,42,0.12)] bg-[#121c2a] flex items-center justify-center"

        initial={{ opacity: 0, y: 24 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: 'easeOut' }}

      >

        <span className="text-white/40 text-lg font-medium">Vidéo non disponible</span>

      </motion.div>

    );

  }



  return (

    <motion.div

      className="group relative aspect-video rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(18,28,42,0.12)] bg-[#121c2a]"

      initial={{ opacity: 0, y: 24 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.5, ease: 'easeOut' }}

    >

      <video

        ref={videoRef}

        src={lesson.videoUrl}

        className="w-full h-full object-cover"

        onTimeUpdate={handleTimeUpdate}

        onLoadedMetadata={handleLoadedMetadata}

        onEnded={() => setIsPlaying(false)}

        playsInline

      />



      {/* Overlay contrôles */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">

        {/* Barre de progression */}

        <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer">

          <div

            className="h-full bg-primary rounded-full"

            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}

          />

        </div>



        {/* Boutons contrôles */}

        <div className="flex items-center justify-between text-white">

          <div className="flex items-center gap-4">

            <button

              onClick={togglePlay}

              className="hover:scale-110 transition-transform"

            >

              {isPlaying ? (

                <Pause className="w-10 h-10 fill-white" />

              ) : (

                <Play className="w-10 h-10 fill-white" />

              )}

            </button>

            <span className="text-sm font-medium">

              {formatTime(currentTime)} / {formatTime(duration)}

            </span>

          </div>



          <div className="flex items-center gap-4">

            <button

              onClick={toggleMute}

              className="opacity-80 hover:opacity-100 transition-opacity"

            >

              {isMuted ? (

                <VolumeX size={22} className="text-white" />

              ) : (

                <Volume2 size={22} className="text-white" />

              )}

            </button>

            <button

              onClick={handleFullscreen}

              className="opacity-80 hover:opacity-100 transition-opacity"

            >

              <Maximize size={22} className="text-white" />

            </button>

          </div>

        </div>

      </div>



      {/* Bouton play central quand en pause */}

      {!isPlaying && (

        <button

          onClick={togglePlay}

          className="absolute inset-0 m-auto w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"

        >

          <Play className="w-10 h-10 fill-white text-white ml-1" />

        </button>

      )}

    </motion.div>

  );

}

