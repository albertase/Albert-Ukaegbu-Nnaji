import { useState } from 'react';

type UseInputReturn = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
};

const useInput = (validateValue: (value: string) => boolean): UseInputReturn => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsTouched(true);
  };

  const reset = (): void => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    reset: reset
  };
};
export default useInput;