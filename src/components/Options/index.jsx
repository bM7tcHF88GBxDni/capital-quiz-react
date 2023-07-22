import { useState, useEffect } from "react";

import { Option } from "../Option";
import styles from "./Options.module.css";

export const Options = ({ answer, options, nextQuestion }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  // setting up user choices with class styles
  // update class styles for intuitive user feedback
  const [choices, setChoices] = useState(
    options.map((option) => {
      return {
        text: option,
        colour: "neutral",
      };
    })
  );

  // used to reset everything when options changes for new question
  useEffect(() => {
    setChoices(
      options.map((option) => {
        return {
          text: option,
          colour: "neutral",
        };
      })
    );
    setResult(null);
    setInput(null);
  }, [options]);

  // update class styles for user feedback here
  useEffect(() => {
    if (result != null) {
      const results = determineUserFeedback();
      setChoices(results);
    } else {
      setChoices(
        options.map((option) => {
          return {
            text: option,
            colour: "neutral",
          };
        })
      );
    }
  }, [result]);

  const determineUserFeedback = () => {
    if (result) {
      // if user answered correctly
      return choices.map((c) => {
        if (c.text === answer) {
          // feedback success to user
          return {
            ...c,
            colour: "correct",
          };
        } else {
          return c;
        }
      });
    } else {
      return choices.map((c) => {
        // if user answered wrongly
        if (c.text === answer) {
          // feedback correct answer to user
          return {
            ...c,
            colour: "answer",
          };
        }
        if (c.text === input) {
          // feedback wrong answer to user
          return {
            ...c,
            colour: "wrong",
          };
        } else {
          return c;
        }
      });
    }
  };

  const handleInput = (input) => {
    setInput(input);
    const newResult = input === answer;
    if (result == null) {
      setResult(newResult);
    }
  };

  return (
    <>
      <div className={styles.options}>
        {choices.map((c, index) => (
          <Option
            key={index}
            text={c.text}
            handleClick={handleInput}
            colour={c.colour}
          />
        ))}
      </div>
      {result != null && (
        <button onClick={() => nextQuestion()}>Next Question</button>
      )}
    </>
  );
};
