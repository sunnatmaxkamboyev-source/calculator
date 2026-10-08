import { useState } from "react";

type Operator = "+" | "-" | "*" | "/" | null;

function Calculator() {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [isNewInput, setIsNewInput] = useState<boolean>(true);


  const handleNumberClick = (num: string) => {
    if (isNewInput) {
      setCurrentValue(num);
      setIsNewInput(false);
    } else {
      setCurrentValue((prev) => (prev === "0" ? num : prev + num));
    }
  };


  const handleOperatorClick = (op: Operator) => {
    if (previousValue && operator && !isNewInput) {
      const result = calculate();
      setPreviousValue(result);
      setCurrentValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setOperator(op);
    setIsNewInput(true);
  };

 
  const calculate = (): string => {
    const prev = parseFloat(previousValue || "0");
    const current = parseFloat(currentValue);

    switch (operator) {
      case "+":
        return (prev + current).toString();
      case "-":
        return (prev - current).toString();
      case "*":
        return (prev * current).toString();
      case "/":
        return current === 0 ? "Xato" : (prev / current).toString();
      default:
        return currentValue;
    }
  };

  
  const handleEqual = () => {
    if (!operator || previousValue === null) return;

    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setIsNewInput(true);
  };

  
  const handleClear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setIsNewInput(true);
  };

  return (
    <div className="calculator">
      <div className="display">{currentValue}</div>

      <div className="buttons">
        <button onClick={handleClear} className="btn clear">C</button>
        <button onClick={() => handleOperatorClick("/")} className="btn operator">÷</button>
        <button onClick={() => handleOperatorClick("*")} className="btn operator">×</button>
        <button onClick={() => handleOperatorClick("-")} className="btn operator">−</button>

        <button onClick={() => handleNumberClick("7")} className="btn">7</button>
        <button onClick={() => handleNumberClick("8")} className="btn">8</button>
        <button onClick={() => handleNumberClick("9")} className="btn">9</button>
        <button onClick={() => handleOperatorClick("+")} className="btn operator">+</button>

        <button onClick={() => handleNumberClick("4")} className="btn">4</button>
        <button onClick={() => handleNumberClick("5")} className="btn">5</button>
        <button onClick={() => handleNumberClick("6")} className="btn">6</button>
        <button onClick={handleEqual} className="btn equal">=</button>

        <button onClick={() => handleNumberClick("1")} className="btn">1</button>
        <button onClick={() => handleNumberClick("2")} className="btn">2</button>
        <button onClick={() => handleNumberClick("3")} className="btn">3</button>
        <button onClick={() => handleNumberClick("0")} className="btn zero">0</button>
      </div>
    </div>
  );
}

export default Calculator;