import { useState, useEffect, useCallback } from 'react';
import { getRandomText, calculateWPM, calculateAccuracy } from '../utils/typingUtils';

const GAME_DURATION = 60; // 60 seconds
const KEY_PRESS_DURATION = 100; // Duration to show key press effect

export function useTypingGame() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    setText(getRandomText());
  }, []);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsComplete(true);
            setIsActive(false);
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleKeyPress = useCallback((key: string) => {
    if (isComplete) return;

    // Show key press effect
    setPressedKeys(prev => new Set(prev).add(key));
    setTimeout(() => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, KEY_PRESS_DURATION);

    // Start timer on first keypress
    if (!isActive && key.length === 1) {
      setIsActive(true);
    }

    // Handle backspace
    if (key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      return;
    }

    // Only accept printable characters
    if (key.length === 1 && userInput.length < text.length) {
      const newInput = userInput + key;
      setUserInput(newInput);
      
      // Calculate errors
      let currentErrors = 0;
      for (let i = 0; i < newInput.length; i++) {
        if (newInput[i] !== text[i]) currentErrors++;
      }
      setErrors(currentErrors);

      // Calculate WPM and accuracy
      const timeElapsed = GAME_DURATION - timeLeft;
      if (timeElapsed > 0) {
        setWPM(calculateWPM(newInput.length, timeElapsed, currentErrors));
        setAccuracy(calculateAccuracy(newInput.length, currentErrors));
      }

      // Check if completed
      if (newInput.length === text.length) {
        setIsComplete(true);
        setIsActive(false);
      }
    }
  }, [text, userInput, timeLeft, isActive, isComplete]);

  const restart = useCallback(() => {
    setText(getRandomText());
    setUserInput('');
    setTimeLeft(GAME_DURATION);
    setIsActive(false);
    setIsComplete(false);
    setErrors(0);
    setWPM(0);
    setAccuracy(100);
    setPressedKeys(new Set());
  }, []);

  return {
    text,
    userInput,
    timeLeft,
    isComplete,
    wpm,
    accuracy,
    charactersTyped: userInput.length,
    pressedKeys,
    handleKeyPress,
    restart
  };
}