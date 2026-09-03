'use client';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

const messages = [
  'Hello!',
  '¡Hola!',
  'Bonjour!',
  'Nǐ hǎo!',
  'Kon nichiwa!',
  'Selamat Datang!',
];

const PRELOADER_DURATION = 5000;
const MESSAGE_INTERVAL = 800;

const Preloader = ({
  onFinish,
}) => {
  const [
    currentMessageIndex,
    setCurrentMessageIndex,
  ] = useState(0);

  const [isVisible, setIsVisible] =
    useState(true);

  const finishedRef =
    useRef(false);

  /*
  |--------------------------------------------------------------------------
  | CHANGE MESSAGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      currentMessageIndex >=
      messages.length - 1
    ) {
      return;
    }

    const messageTimer =
      setTimeout(() => {
        setCurrentMessageIndex(
          (previous) =>
            previous + 1
        );
      }, MESSAGE_INTERVAL);

    return () =>
      clearTimeout(
        messageTimer
      );
  }, [
    currentMessageIndex,
  ]);

  /*
  |--------------------------------------------------------------------------
  | FINISH PRELOADER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const preloaderTimer =
      setTimeout(() => {
        /*
        | Pastikan onFinish hanya dipanggil
        | satu kali.
        */

        if (finishedRef.current) {
          return;
        }

        finishedRef.current = true;

        setIsVisible(false);

        onFinish?.();
      }, PRELOADER_DURATION);

    return () =>
      clearTimeout(
        preloaderTimer
      );
  }, [onFinish]);

  /*
  |--------------------------------------------------------------------------
  | HIDDEN
  |--------------------------------------------------------------------------
  */

  if (!isVisible) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE ANIMATION
  |--------------------------------------------------------------------------
  */

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },

    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-black
        text-4xl
        font-bold
        text-white
      "
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={
            currentMessageIndex
          }
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center"
        >
          {
            messages[
              currentMessageIndex
            ]
          }
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Preloader;