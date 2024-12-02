import { useState } from "react";
import TimedSession from "./TimedSession";

const totalSession = 4;
const sessionType = {
  focus: "Focus",
  "short-break": "Short Break",
  "long-break": "Long Break",
};
const sessionDuration = {
  focus: 25 * 60 * 1000,
  "short-break": 4 * 60 * 1000,
  "long-break": 20 * 60 * 1000,
};
const Pomodoro = () => {
  const [currentSession, setCurrentSession] = useState("focus");
  const [sessionCount, setSessionCount] = useState(1);

  const handleSessionEnd = () => {
    if (currentSession === "focus") {
      if (sessionCount < 4) {
        setCurrentSession("short-break");
      } else {
        setCurrentSession("long-break");
      }
    } else {
      if (sessionCount === 4) {
        setSessionCount(1);
      } else setSessionCount(sessionCount + 1);
      setCurrentSession("focus");
    }
  };

  return (
    <div className="m-auto w-[70%] rounded-3xl border-2 border-black bg-yellow-100 p-4 text-center">
      <h1 className="text-3xl">Pomodoro</h1>
      <p>
        Session <span className="text-xl font-bold">{sessionCount}</span> of{" "}
        <span className="text-xl font-bold">{totalSession}</span> (
        <span className="text-xl">{sessionType[currentSession]}</span>)
      </p>
      <TimedSession
        key={`${sessionCount}-${currentSession}`}
        initialTime={sessionDuration[currentSession]}
        onSkip={handleSessionEnd}
        onSessionEnd={handleSessionEnd}
      />
    </div>
  );
};

export default Pomodoro;
