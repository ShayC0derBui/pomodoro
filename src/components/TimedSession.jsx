import { useState, useRef, useEffect } from "react";

const TimedSession = ({ initialTime, onSkip, onSessionEnd }) => {
  const initialTimeRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    }).format(time);
    return formattedTime;
  };

  const handleStart = () => {
    setIsRunning(true);
    initialTimeRef.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(initialTimeRef.current);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(initialTimeRef.current);
    initialTimeRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(initialTimeRef.current);
    setCurrentTime(initialTime);
    setIsRunning(false);
  };

  const handleSkip = () => {
    onSkip();
  };

  // Cleanup the timer on unmount
  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);

  useEffect(() => {
    if (currentTime === 0) {
      handleStop();
      onSessionEnd();
    }
  }, [currentTime, onSessionEnd]);

  return (
    <div className="my-6 flex justify-center">
      <div className="h-[70%] w-[70%] rounded-full border-2 border-black bg-orange-300">
        <p className="my-16 text-9xl">{formatTime(currentTime)}</p>
        <div className="my-6">
          {isRunning ? (
            <div className="flex justify-center gap-3">
              <button
                className="rounded-full bg-yellow-600 px-4 py-2 text-white"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="rounded-full bg-yellow-600 px-4 py-2 text-white"
                onClick={handleStop}
              >
                Stop
              </button>
              <button
                className="rounded-full bg-yellow-600 px-4 py-2 text-white"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          ) : (
            <button
              className="rounded-full bg-yellow-600 px-4 py-2 text-white"
              onClick={handleStart}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimedSession;
