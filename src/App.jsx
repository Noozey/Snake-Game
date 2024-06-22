import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  return <Container />;
}

const Container = () => {
  const [snakePosition, setSnakePosition] = useState([0]);
  const [direction, setDirection] = useState(0);
  const randomPosition = () => Math.floor(Math.random() * 100);
  const [foodPosition, setFoodPosition] = useState(randomPosition);
  const [snakeIntervalTime, setSnakeIntervalTime] = useState(300);
  const [count, setCount] = useState(0);
  const array = Array(100).fill(null);
  useEffect(() => {
    const moveSnake = () => {
      setSnakePosition((prevPosition) => {
        let head = 0;
        const newPosition = prevPosition.map((pos, index) => {
          if (index === 0) {
            head = pos + direction;
            return head;
          }
          if (head === prevPosition[index - 1]) {
            setDirection(0);
            setSnakePosition([0]);
            setSnakeIntervalTime(300);
            setCount(0);
          }
          return prevPosition[index - 1];
        });

        if (newPosition.some((value) => value === 100)) {
          const arrayLength = newPosition.length;
          return Array(arrayLength).fill(0);
        }

        if (newPosition.some((value) => value > 100)) {
          setDirection(0);
          setSnakePosition([0]);
          setSnakeIntervalTime(300);
          setCount(0);
        }
        if (newPosition.some((value) => value < -2)) {
          setDirection(0);
          setSnakePosition([0]);
          setSnakeIntervalTime(300);
          setCount(0);
        }

        if (newPosition.some((value) => value === -1)) {
          const arrayLength = newPosition.length;
          return Array(arrayLength).fill(100);
        }

        if (head === foodPosition) {
          setFoodPosition(randomPosition());
          setSnakePosition((prevStateArray) => [...prevStateArray, -1]);
          setSnakeIntervalTime((prevState) => prevState * 0.98);
          setCount(count + 1);
        }
        return newPosition;
      });
    };
    const intervalId = setInterval(moveSnake, snakeIntervalTime);
    return () => clearInterval(intervalId);
  }, [direction, snakeIntervalTime]);

  const handleInput = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setDirection(-1);
        break;
      case "ArrowRight":
        setDirection(+1);
        break;
      case "ArrowUp":
        setDirection(-10);
        break;
      case "ArrowDown":
        setDirection(+10);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  }, []);

  const layout = array.map((_, index) => {
    const isSnakeBody = snakePosition.includes(index);
    const isfood = foodPosition === index;
    return (
      <div>
        <div
          className={`boxes ${isSnakeBody ? "snake-body" : ""} ${
            isfood ? "food" : ""
          }`}
          key={index}
        ></div>
      </div>
    );
  });

  return (
    <div>
      <div className="menu">
        <div className="button">
          <button
            className="start-button"
            onClick={() => {
              setDirection(1);
              setSnakeIntervalTime(300);
            }}
          >
            Start
          </button>
          <button
            className="start-button"
            onClick={() => {
              setDirection(1);
              setSnakeIntervalTime(300);
              setSnakePosition([0]);
            }}
          >
            Restart
          </button>
        </div>
        <h1>{count}</h1>
      </div>
      <div className="grid-box">{layout}</div>
    </div>
  );
};

export default App;
