'use client';

import {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from 'react';

import { gsap } from 'gsap';

import './TextType.css';

const TextType = ({
  text,

  as: Component = 'div',

  typingSpeed = 130,

  initialDelay = 0,

  pauseDuration = 2000,

  deletingSpeed = 30,

  loop = true,

  className = '',

  showCursor = true,

  hideCursorWhileTyping = false,

  cursorCharacter = '|',

  cursorClassName = '',

  cursorBlinkDuration = 0.5,

  textColors = [],

  variableSpeed,

  onSentenceComplete,

  startOnVisible = false,

  reverseMode = false,

  ...props
}) => {
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [displayedText, setDisplayedText] =
    useState('');

  const [currentCharIndex, setCurrentCharIndex] =
    useState(0);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [currentTextIndex, setCurrentTextIndex] =
    useState(0);

  const [isVisible, setIsVisible] =
    useState(!startOnVisible);

  /*
  |--------------------------------------------------------------------------
  | REFS
  |--------------------------------------------------------------------------
  */

  const cursorRef =
    useRef(null);

  const containerRef =
    useRef(null);

  /*
  |--------------------------------------------------------------------------
  | TEXT ARRAY
  |--------------------------------------------------------------------------
  */

  const textArray = useMemo(
    () =>
      Array.isArray(text)
        ? text
        : [text],
    [text]
  );

  /*
  |--------------------------------------------------------------------------
  | RANDOM TYPING SPEED
  |--------------------------------------------------------------------------
  */

  const getRandomSpeed =
    useCallback(() => {
      if (!variableSpeed) {
        return typingSpeed;
      }

      const {
        min,
        max,
      } = variableSpeed;

      return (
        Math.random() *
          (max - min) +
        min
      );
    }, [
      variableSpeed,
      typingSpeed,
    ]);

  /*
  |--------------------------------------------------------------------------
  | CURRENT TEXT COLOR
  |--------------------------------------------------------------------------
  */

  const getCurrentTextColor = () => {
    if (
      textColors.length === 0
    ) {
      return 'inherit';
    }

    return (
      textColors[
        currentTextIndex %
          textColors.length
      ]
    );
  };

  /*
  |--------------------------------------------------------------------------
  | START WHEN VISIBLE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      !startOnVisible ||
      !containerRef.current
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setIsVisible(true);
              }
            }
          );
        },
        {
          threshold: 0.1,
        }
      );

    observer.observe(
      containerRef.current
    );

    return () => {
      observer.disconnect();
    };
  }, [
    startOnVisible,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CURSOR BLINK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      !showCursor ||
      !cursorRef.current
    ) {
      return;
    }

    gsap.killTweensOf(
      cursorRef.current
    );

    gsap.set(
      cursorRef.current,
      {
        opacity: 1,
      }
    );

    gsap.to(
      cursorRef.current,
      {
        opacity: 0,
        duration:
          cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease:
          'power2.inOut',
      }
    );

    return () => {
      if (
        cursorRef.current
      ) {
        gsap.killTweensOf(
          cursorRef.current
        );
      }
    };
  }, [
    showCursor,
    cursorBlinkDuration,
  ]);

  /*
  |--------------------------------------------------------------------------
  | TYPING ENGINE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let timeout;

    const currentText =
      textArray[
        currentTextIndex
      ] ?? '';

    const processedText =
      reverseMode
        ? currentText
            .split('')
            .reverse()
            .join('')
        : currentText;

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const executeTypingAnimation =
      () => {
        if (isDeleting) {
          /*
          | Sudah kosong.
          */

          if (
            displayedText === ''
          ) {
            setIsDeleting(
              false
            );

            /*
            | Kalau loop false dan
            | sudah sampai teks terakhir,
            | berhenti.
            */

            if (
              currentTextIndex ===
                textArray.length - 1 &&
              !loop
            ) {
              return;
            }

            /*
            | Callback.
            */

            if (
              onSentenceComplete
            ) {
              onSentenceComplete(
                textArray[
                  currentTextIndex
                ],
                currentTextIndex
              );
            }

            /*
            | Pindah ke teks berikutnya.
            */

            setCurrentTextIndex(
              (previous) =>
                (previous + 1) %
                textArray.length
            );

            setCurrentCharIndex(
              0
            );

            /*
            | Pause sebelum teks berikutnya.
            */

            timeout =
              setTimeout(
                () => {},
                pauseDuration
              );
          } else {
            /*
            | Hapus satu karakter.
            */

            timeout =
              setTimeout(
                () => {
                  setDisplayedText(
                    (previous) =>
                      previous.slice(
                        0,
                        -1
                      )
                  );
                },
                deletingSpeed
              );
          }

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | TYPE
        |--------------------------------------------------------------------------
        */

        if (
          currentCharIndex <
          processedText.length
        ) {
          timeout =
            setTimeout(
              () => {
                setDisplayedText(
                  (previous) =>
                    previous +
                    processedText[
                      currentCharIndex
                    ]
                );

                setCurrentCharIndex(
                  (previous) =>
                    previous + 1
                );
              },
              variableSpeed
                ? getRandomSpeed()
                : typingSpeed
            );

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | FINISHED TYPING
        |--------------------------------------------------------------------------
        */

        if (
          textArray.length >= 1
        ) {
          /*
          | Kalau tidak looping dan
          | ini teks terakhir, berhenti.
          */

          if (
            !loop &&
            currentTextIndex ===
              textArray.length - 1
          ) {
            return;
          }

          /*
          | Tunggu sebelum delete.
          */

          timeout =
            setTimeout(
              () => {
                setIsDeleting(
                  true
                );
              },
              pauseDuration
            );
        }
      };

    /*
    |--------------------------------------------------------------------------
    | INITIAL DELAY
    |--------------------------------------------------------------------------
    */

    if (
      currentCharIndex === 0 &&
      !isDeleting &&
      displayedText === ''
    ) {
      timeout =
        setTimeout(
          executeTypingAnimation,
          initialDelay
        );
    } else {
      executeTypingAnimation();
    }

    return () => {
      clearTimeout(timeout);
    };

    // Sengaja mengikuti lifecycle
    // typing animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CURSOR VISIBILITY
  |--------------------------------------------------------------------------
  */

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (
      currentCharIndex <
        (
          textArray[
            currentTextIndex
          ] ?? ''
        ).length ||
      isDeleting
    );

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return createElement(
    Component,
    {
      ref: containerRef,

      className:
        `text-type ${className}`,

      ...props,
    },

    /*
    | TEXT
    */

    <span
      className="
        text-type__content
      "
      style={{
        color:
          getCurrentTextColor() ||
          'inherit',
      }}
    >
      {displayedText}
    </span>,

    /*
    | CURSOR
    */

    showCursor && (
      <span
        ref={cursorRef}
        className={`
          text-type__cursor
          ${cursorClassName}
          ${
            shouldHideCursor
              ? 'text-type__cursor--hidden'
              : ''
          }
        `}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;