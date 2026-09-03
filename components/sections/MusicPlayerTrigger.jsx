'use client';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayerTrigger = () => {
  const audioRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || isStarted) return;

    const handleMouseEnter = () => {
      if (audioRef.current && !isStarted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch((e) => {
          console.warn('Autoplay blocked by browser:', e);
        });
        setIsStarted(true);
      }
    };

    hero.addEventListener('mouseenter', handleMouseEnter);
    return () => hero.removeEventListener('mouseenter', handleMouseEnter);
  }, [isStarted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/lofi.mp3" loop preload="auto" />
      <button
        onClick={toggleMute}
        className="text-accent-light hover:bg-secondary-bg p-2 rounded-full transition duration-300"
        aria-label="Toggle Volume"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
};

export default MusicPlayerTrigger;
