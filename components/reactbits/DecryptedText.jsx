'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const DEFAULT_CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function DecryptedText({
  text = '',

  /*
  |--------------------------------------------------------------------------
  | ANIMATION SETTINGS
  |--------------------------------------------------------------------------
  */

  speed = 130,

  maxIterations = 10,

  sequential = true,

  revealDirection = 'center',

  useOriginalCharsOnly = false,

  characters = DEFAULT_CHARACTERS,

  /*
  |--------------------------------------------------------------------------
  | CLASS
  |--------------------------------------------------------------------------
  */

  className = '',

  parentClassName = '',

  encryptedClassName = '',

  /*
  |--------------------------------------------------------------------------
  | TRIGGER
  |--------------------------------------------------------------------------
  |
  | "view"      = mulai ketika masuk viewport
  | "preloader" = tunggu preloader selesai,
  |               lalu setiap masuk viewport
  |
  */

  animateOn = 'preloader',

  /*
  | true  = hanya sekali
  | false = setiap masuk viewport
  */

  triggerOnce = false,

  ...props
}) {
  /*
  |--------------------------------------------------------------------------
  | REFS
  |--------------------------------------------------------------------------
  */

  const containerRef =
    useRef(null);

  const timerRef =
    useRef(null);

  const finishTimerRef =
    useRef(null);

  const startedRef =
    useRef(false);

  const animatingRef =
    useRef(false);

  const preloaderReadyRef =
    useRef(
      animateOn === 'view'
    );

  const wasVisibleRef =
    useRef(false);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    displayText,
    setDisplayText,
  ] = useState(text);

  const [
    revealedIndices,
    setRevealedIndices,
  ] = useState(
    new Set()
  );

  const [
    isFinished,
    setIsFinished,
  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | AVAILABLE CHARACTERS
  |--------------------------------------------------------------------------
  */

  const availableCharacters =
    useMemo(() => {
      if (
        useOriginalCharsOnly
      ) {
        return Array.from(
          new Set(
            text
              .split('')
              .filter(
                (char) =>
                  char !== ' '
              )
          )
        );
      }

      return characters.split('');
    }, [
      text,
      characters,
      useOriginalCharsOnly,
    ]);

  /*
  |--------------------------------------------------------------------------
  | RANDOM CHARACTER
  |--------------------------------------------------------------------------
  */

  const randomCharacter =
    useCallback(() => {
      if (
        availableCharacters.length ===
        0
      ) {
        return '?';
      }

      return availableCharacters[
        Math.floor(
          Math.random() *
            availableCharacters.length
        )
      ];
    }, [
      availableCharacters,
    ]);

  /*
  |--------------------------------------------------------------------------
  | GENERATE ENCRYPTED TEXT
  |--------------------------------------------------------------------------
  */

  const generateEncryptedText =
    useCallback(
      (revealed) => {
        return text
          .split('')
          .map(
            (char, index) => {
              /*
              | Space tetap space.
              */

              if (char === ' ') {
                return ' ';
              }

              /*
              | Sudah terbuka.
              */

              if (
                revealed.has(index)
              ) {
                return char;
              }

              /*
              | Belum terbuka.
              */

              return randomCharacter();
            }
          )
          .join('');
      },
      [
        text,
        randomCharacter,
      ]
    );

  /*
  |--------------------------------------------------------------------------
  | REVEAL ORDER
  |--------------------------------------------------------------------------
  */

  const getRevealOrder =
    useCallback(() => {
      const indices = [];

      for (
        let i = 0;
        i < text.length;
        i += 1
      ) {
        if (text[i] !== ' ') {
          indices.push(i);
        }
      }

      /*
      |--------------------------------------------------------------------------
      | START
      |--------------------------------------------------------------------------
      */

      if (
        revealDirection ===
        'start'
      ) {
        return indices;
      }

      /*
      |--------------------------------------------------------------------------
      | END
      |--------------------------------------------------------------------------
      */

      if (
        revealDirection === 'end'
      ) {
        return indices.reverse();
      }

      /*
      |--------------------------------------------------------------------------
      | CENTER
      |--------------------------------------------------------------------------
      */

      if (
        revealDirection ===
        'center'
      ) {
        const center =
          (text.length - 1) / 2;

        return indices.sort(
          (a, b) =>
            Math.abs(
              a - center
            ) -
            Math.abs(
              b - center
            )
        );
      }

      return indices;
    }, [
      text,
      revealDirection,
    ]);

  /*
  |--------------------------------------------------------------------------
  | STOP ANIMATION
  |--------------------------------------------------------------------------
  */

  const stopAnimation =
    useCallback(() => {
      clearInterval(
        timerRef.current
      );

      clearTimeout(
        finishTimerRef.current
      );

      timerRef.current = null;

      finishTimerRef.current =
        null;

      animatingRef.current =
        false;
    }, []);

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const resetAnimation =
    useCallback(() => {
      stopAnimation();

      const emptySet =
        new Set();

      setDisplayText(text);

      setRevealedIndices(
        emptySet
      );

      setIsFinished(false);
    }, [
      text,
      stopAnimation,
    ]);

  /*
  |--------------------------------------------------------------------------
  | START ANIMATION
  |--------------------------------------------------------------------------
  */

  const startAnimation =
    useCallback(() => {
      /*
      | Jangan mulai kalau sedang
      | animasi.
      */

      if (
        animatingRef.current
      ) {
        return;
      }

      /*
      | Kalau triggerOnce aktif
      | dan sudah pernah jalan.
      */

      if (
        triggerOnce &&
        startedRef.current
      ) {
        return;
      }

      startedRef.current = true;

      stopAnimation();

      animatingRef.current =
        true;

      /*
      |--------------------------------------------------------------------------
      | ORDER
      |--------------------------------------------------------------------------
      */

      const revealOrder =
        getRevealOrder();

      let revealPointer = 0;

      let iteration = 0;

      const currentRevealed =
        new Set();

      /*
      |--------------------------------------------------------------------------
      | RESET STATE
      |--------------------------------------------------------------------------
      */

      setIsFinished(false);

      setRevealedIndices(
        new Set()
      );

      /*
      |--------------------------------------------------------------------------
      | INITIAL ENCRYPTED TEXT
      |--------------------------------------------------------------------------
      */

      setDisplayText(
        generateEncryptedText(
          currentRevealed
        )
      );

      /*
      |--------------------------------------------------------------------------
      | SEQUENTIAL
      |--------------------------------------------------------------------------
      */

      if (sequential) {
        timerRef.current =
          setInterval(() => {
            /*
            | Semua karakter sudah terbuka.
            */

            if (
              revealPointer >=
              revealOrder.length
            ) {
              return;
            }

            /*
            | Karakter berikutnya.
            */

            const index =
              revealOrder[
                revealPointer
              ];

            revealPointer += 1;

            currentRevealed.add(
              index
            );

            /*
            | Update state.
            */

            setRevealedIndices(
              new Set(
                currentRevealed
              )
            );

            /*
            | Generate ulang karakter
            | random + karakter asli.
            */

            setDisplayText(
              generateEncryptedText(
                currentRevealed
              )
            );

            /*
            |--------------------------------------------------------------------------
            | FINISH
            |--------------------------------------------------------------------------
            */

            if (
              revealPointer >=
              revealOrder.length
            ) {
              clearInterval(
                timerRef.current
              );

              timerRef.current =
                null;

              finishTimerRef.current =
                setTimeout(() => {
                  /*
                  | Pastikan final text
                  | benar-benar asli.
                  */

                  setDisplayText(
                    text
                  );

                  setRevealedIndices(
                    new Set(
                      revealOrder
                    )
                  );

                  setIsFinished(
                    true
                  );

                  animatingRef.current =
                    false;
                }, speed);
            }
          }, speed);

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | NON-SEQUENTIAL
      |--------------------------------------------------------------------------
      */

      timerRef.current =
        setInterval(() => {
          iteration += 1;

          setDisplayText(
            generateEncryptedText(
              currentRevealed
            )
          );

          if (
            iteration >=
            maxIterations
          ) {
            clearInterval(
              timerRef.current
            );

            timerRef.current =
              null;

            setDisplayText(
              text
            );

            setRevealedIndices(
              new Set(
                revealOrder
              )
            );

            setIsFinished(
              true
            );

            animatingRef.current =
              false;
          }
        }, speed);
    }, [
      text,
      speed,
      maxIterations,
      sequential,
      triggerOnce,
      stopAnimation,
      getRevealOrder,
      generateEncryptedText,
    ]);

  /*
  |--------------------------------------------------------------------------
  | PRELOADER COMPLETE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      animateOn !==
      'preloader'
    ) {
      return;
    }

    const handlePreloaderComplete =
      () => {
        /*
        | Tandai preloader selesai.
        */

        preloaderReadyRef.current =
          true;

        /*
        | Kalau sedang terlihat,
        | langsung jalankan.
        */

        const element =
          containerRef.current;

        if (!element) {
          return;
        }

        const rect =
          element.getBoundingClientRect();

        const visible =
          rect.top <
            window.innerHeight &&
          rect.bottom > 0;

        if (visible) {
          startedRef.current =
            false;

          resetAnimation();

          requestAnimationFrame(
            () => {
              startAnimation();
            }
          );

          wasVisibleRef.current =
            true;
        }
      };

    window.addEventListener(
      'preloaderComplete',
      handlePreloaderComplete
    );

    return () => {
      window.removeEventListener(
        'preloaderComplete',
        handlePreloaderComplete
      );
    };
  }, [
    animateOn,
    resetAnimation,
    startAnimation,
  ]);

  /*
  |--------------------------------------------------------------------------
  | INTERSECTION OBSERVER
  |--------------------------------------------------------------------------
  |
  | INI BAGIAN YANG DIPERBAIKI.
  |
  | Observer dipasang dari awal.
  | Tetapi animasi hanya boleh jalan
  | kalau preloader sudah selesai.
  |
  */

  useEffect(() => {
    if (
      animateOn !== 'view' &&
      animateOn !== 'preloader'
    ) {
      return;
    }

    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              const isVisible =
                entry.isIntersecting;

              /*
              |--------------------------------------------------------------------------
              | MASUK VIEWPORT
              |--------------------------------------------------------------------------
              */

              if (
                isVisible &&
                !wasVisibleRef.current
              ) {
                wasVisibleRef.current =
                  true;

                /*
                | Kalau menggunakan preloader,
                | tunggu sampai selesai.
                */

                if (
                  animateOn ===
                    'preloader' &&
                  !preloaderReadyRef.current
                ) {
                  return;
                }

                /*
                | Kalau triggerOnce false,
                | reset dan mulai lagi.
                */

                if (!triggerOnce) {
                  startedRef.current =
                    false;

                  resetAnimation();
                }

                requestAnimationFrame(
                  () => {
                    startAnimation();
                  }
                );
              }

              /*
              |--------------------------------------------------------------------------
              | KELUAR VIEWPORT
              |--------------------------------------------------------------------------
              */

              if (
                !isVisible
              ) {
                wasVisibleRef.current =
                  false;

                /*
                | Kalau sedang animasi ketika
                | user scroll pergi, hentikan.
                */

                if (
                  !triggerOnce
                ) {
                  stopAnimation();
                }
              }
            }
          );
        },
        {
          /*
          | Sedikit lebih mudah dipicu
          | ketika Hero masuk.
          */

          threshold: 0.15,

          root: null,

          rootMargin:
            '0px 0px -5% 0px',
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    animateOn,
    triggerOnce,
    resetAnimation,
    startAnimation,
    stopAnimation,
  ]);

  /*
  |--------------------------------------------------------------------------
  | RESET WHEN TEXT CHANGES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    stopAnimation();

    startedRef.current =
      false;

    wasVisibleRef.current =
      false;

    setDisplayText(text);

    setRevealedIndices(
      new Set()
    );

    setIsFinished(false);
  }, [
    text,
    stopAnimation,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CLEANUP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      clearInterval(
        timerRef.current
      );

      clearTimeout(
        finishTimerRef.current
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <span
      ref={containerRef}
      className={`decrypted-text ${parentClassName}`}
      {...props}
    >
      {displayText
        .split('')
        .map(
          (char, index) => {
            const revealed =
              revealedIndices.has(
                index
              ) ||
              isFinished;

            return (
              <span
                key={`${text}-${index}`}
                className={
                  revealed
                    ? className
                    : encryptedClassName
                }
              >
                {char === ' '
                  ? '\u00A0'
                  : char}
              </span>
            );
          }
        )}
    </span>
  );
}