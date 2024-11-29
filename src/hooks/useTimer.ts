import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (interval: number, repetitions: number, onComplete: () => void) => {
  const [timeLeft, setTimeLeft] = useState(interval);
  const [currentRep, setCurrentRep] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const isCompletingInterval = useRef(false);
  
  const playSound = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
  }, []);

  const toggle = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  // Reset timer when interval or repetitions change
  useEffect(() => {
    setTimeLeft(interval);
    setCurrentRep(1);
    setIsActive(false);
    isCompletingInterval.current = false;
  }, [interval, repetitions]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          if (!isCompletingInterval.current) {
            isCompletingInterval.current = true;
            playSound();

            if (currentRep >= repetitions && repetitions !== Infinity) {
              setIsActive(false);
              onComplete();
            } else {
              setCurrentRep(prev => prev + 1);
            }

            // Reset the completion flag after a short delay
            setTimeout(() => {
              isCompletingInterval.current = false;
            }, 100);
          }
          return interval;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, interval, currentRep, repetitions, onComplete, playSound]);

  return { timeLeft, currentRep, isActive, toggle };
};