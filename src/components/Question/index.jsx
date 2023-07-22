import { useState, useEffect } from "react";
import { Options } from "../Options";

export const Question = () => {
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (start) {
      setupQuestion();
    } else {
      setQuestion(null);
    }
  }, [start]);

  const setupQuestion = async () => {
    console.log("fetching question...");
    try {
      const response = await fetch("http://localhost:4000/question", {
        method: "GET",
        mode: "cors",
      });

      if (response.status === 502) {
        throw new Error("External API fetch error");
      } else if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      setQuestion(data);

      // for checking test:
      console.log("question data: ", data);
      console.log("answer: ", data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  const nextQuestion = () => {
    setupQuestion();
  };

  if (!question) {
    return (
      <>
        <h2>Welcome to the quiz!</h2>
        <button onClick={() => setStart(!start)}>Start</button>
      </>
    );
  }

  return (
    <>
      {start && (
        <>
          <h2>What is the capital of {question.country}?</h2>
          <Options
            answer={question.answer}
            options={question.options}
            nextQuestion={nextQuestion}
          />
          <button
            style={{ margin: "40px 0px 20px" }}
            onClick={() => setStart(!start)}
          >
            Exit
          </button>
        </>
      )}
    </>
  );
};
