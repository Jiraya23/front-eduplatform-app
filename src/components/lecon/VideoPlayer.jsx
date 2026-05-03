'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(time) {
  if (!time || isNaN(time)) return '0:00';
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = Math.floor(time % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideoPlayer({ lesson }) {
  const videoRef     = useRef(null);
  const seekBarRef   = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying,   setIsPlaying]   = useState(false);
  const [isMuted,     setIsMuted]     = useState(false);
  const [volume,      setVolume]      = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [speedIdx,    setSpeedIdx]    = useState(2); // 1x par défaut
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [seeking,     setSeeking]     = useState(false);

  // Masquer les contrôles après 3s d'inactivité
  useEffect(() => {
    if (!isPlaying) { setShowControls(true); return; }
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [isPlaying, currentTime]);

  // Raccourcis clavier
  useEffect(() => {
    const handleKey = (e) => {
      if (!videoRef.current) return;
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(10);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(-10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(Math.max(0, volume - 0.1));
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPlaying, volume, isMuted]);

  // Écouter les changements de fullscreen natifs (touche Echap)
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(prev => !prev);
  }, [isMuted]);

  const changeVolume = useCallback((val) => {
    if (!videoRef.current) return;
    videoRef.current.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
    videoRef.current.muted = val === 0;
  }, []);

  const seek = useCallback((seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  }, [duration]);

  const handleSeekBarClick = useCallback((e) => {
    if (!videoRef.current || !seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * duration;
  }, [duration]);

  const handleSeekBarMouseMove = useCallback((e) => {
    if (!seeking || !videoRef.current || !seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * duration;
  }, [seeking, duration]);

  const cycleSpeed = useCallback(() => {
    const nextIdx = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(nextIdx);
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[nextIdx];
  }, [speedIdx]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;

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
      ref={containerRef}
      className="group relative aspect-video rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(18,28,42,0.12)] bg-[#121c2a] select-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Vidéo */}
      <video
        ref={videoRef}
        src={lesson.videoUrl}
        className="w-full h-full object-cover cursor-pointer"
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* Bouton play central — visible quand en pause + survol */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          <Play className="w-9 h-9 fill-white text-white ml-1" />
        </button>
      )}

      {/* Overlay contrôles — visible au survol ou en pause */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* ── Seekbar ── */}
        <div className="px-4 pb-1">
          <div
            ref={seekBarRef}
            className="relative w-full h-3 group/seek cursor-pointer flex items-center"
            onClick={handleSeekBarClick}
            onMouseDown={() => setSeeking(true)}
            onMouseMove={handleSeekBarMouseMove}
            onMouseUp={() => setSeeking(false)}
            onMouseLeave={() => setSeeking(false)}
          >
            {/* Track */}
            <div className="absolute w-full h-1 group-hover/seek:h-2 bg-white/30 rounded-full transition-all duration-150">
              {/* Rempli */}
              <div
                className="h-full bg-primary rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Thumb */}
            <div
              className="absolute w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>

        {/* ── Barre de contrôles ── */}
        <div className="flex items-center justify-between px-4 pb-4 pt-1 text-white">

          {/* Gauche : play, -10s, +10s, temps */}
          <div className="flex items-center gap-3">
            {/* -10 secondes */}
            <button
              onClick={() => seek(-10)}
              title="Reculer 10s (←)"
              className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
            >
              <SkipBack size={20} />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause (k)' : 'Lecture (k)'}
              className="hover:scale-110 transition-transform"
            >
              {isPlaying
                ? <Pause className="w-8 h-8 fill-white" />
                : <Play  className="w-8 h-8 fill-white ml-0.5" />
              }
            </button>

            {/* +10 secondes */}
            <button
              onClick={() => seek(10)}
              title="Avancer 10s (→)"
              className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
            >
              <SkipForward size={20} />
            </button>

            {/* Temps */}
            <span className="text-sm font-medium tabular-nums ml-1">
              {formatTime(currentTime)} <span className="opacity-50">/</span> {formatTime(duration)}
            </span>
          </div>

          {/* Droite : volume, vitesse, fullscreen */}
          <div className="flex items-center gap-4">

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                title="Muet (m)"
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                {isMuted || volume === 0
                  ? <VolumeX size={20} />
                  : <Volume2 size={20} />
                }
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-primary cursor-pointer"
                title={`Volume : ${Math.round(volume * 100)}%`}
              />
            </div>

            {/* Vitesse */}
            <button
              onClick={cycleSpeed}
              title="Changer la vitesse"
              className="text-xs font-bold bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 transition-colors min-w-[3rem] text-center"
            >
              {SPEEDS[speedIdx]}×
            </button>

            {/* Plein écran */}
            <button
              onClick={toggleFullscreen}
              title="Plein écran (f)"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Raccourcis clavier — info discrète */}
      <div className={`absolute top-4 right-4 text-[10px] text-white/50 font-medium transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        Espace · ← → · M · F
      </div>
    </motion.div>
  );
}
