'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import Header from '@/components/layout/Header';
import LiveClock from '@/components/features/LiveClock';
import Preloader from '@/components/layout/Preloader';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const FADE_DURATION = 500;

const PreloaderWrapper = ({
  children,
}) => {
  const [
    appReady,
    setAppReady,
  ] = useState(false);

  const [
    isPreloaderVisible,
    setIsPreloaderVisible,
  ] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | PRELOADER FINISHED
  |--------------------------------------------------------------------------
  */

  const handlePreloaderFinish =
    useCallback(() => {
      /*
      | Mulai fade-out.
      */

      setIsPreloaderVisible(
        false
      );

      /*
      | Tunggu sampai fade-out selesai.
      */

      setTimeout(() => {
        setAppReady(true);

        /*
        |--------------------------------------------------------------------------
        | TRIGGER HERO ANIMATION
        |--------------------------------------------------------------------------
        |
        | DecryptedText akan mendengarkan event ini.
        |
        */

        if (
          typeof window !==
          'undefined'
        ) {
          window.dispatchEvent(
            new Event(
              'preloaderComplete'
            )
          );
        }
      }, FADE_DURATION);
    }, []);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ==================================================
          PRELOADER
          ================================================== */}

      {isPreloaderVisible && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            opacity-100
            transition-opacity
            duration-500
          "
        >
          <Preloader
            onFinish={
              handlePreloaderFinish
            }
          />
        </div>
      )}

      {/* ==================================================
          MAIN APPLICATION
          ================================================== */}

      <LanguageProvider>
        <div
          className={`
            transition-opacity
            duration-500
            ${
              appReady
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        >
          {/* HEADER */}

          {appReady && (
            <Header />
          )}

          {/* PAGE CONTENT */}

          {children}

          {/* CLOCK */}

          {appReady && (
            <LiveClock />
          )}
        </div>
      </LanguageProvider>
    </>
  );
};

export default PreloaderWrapper;
