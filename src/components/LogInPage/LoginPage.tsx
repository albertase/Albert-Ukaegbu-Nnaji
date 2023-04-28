import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";


import "./Login.scss";
import welcomeImg from "../../assets/images/pablo-sign-in.png";
import { LogoIcon } from "../svgIcons";
import Button from "../Button";
import { IUser } from "../../context/context";
import { getUsersApi } from "../../api";





interface ILoginForm {
  email: string;
  password: string;
  avatar: string;
}



const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


const validatePassword = (input: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(input);
};

function LogInPage(): JSX.Element {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);


  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isValidEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: handlePasswordChange,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);


  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }




  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/users");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);


    if (!formIsValid) {
      return;
    }


    try {
      const res = await getUsersApi();
      const users = res.data as IUser[];
      const user = users.find(
        (u: IUser) => u.email === emailRef.current?.value
      );

      let payload: ILoginForm = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
        avatar: "",
      };
      if (user) {
        payload.email = user.email;
        payload.avatar = user.profile.avatar;
      }
      localStorage.setItem("user", JSON.stringify(payload));
      setIsLoading(false);
      navigate("/users");
    } catch (error) {
      setHasError(true);
    }
    resetEmail()
    resetPassword()
  };

  const emailClasses: string = emailHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses: string = passwordHasError ? 'form-control invalid' : 'form-control';
  const optionText = !formIsValid ? 'FILL IN CORRECT DETAILS TO LOGIN' : 'LOGIN'




  return (
    <div className="landing">
      <header>
        <div className="logo">
          <LogoIcon />
        </div>
      </header>
      <div className="box1">
        <div>
          <div className="img_wrapper">
            <img src={welcomeImg} alt="sign in " />
          </div>
        </div>
      </div>
      <div className="box2">
        {isForgotPassword ? (
          <div className="forgotP">
            <div className="welcome">
              <h1>Welcome!</h1>

              <p>
                Take Note: You can log in with a random Email <br /> and Password that matches this form validation.
              </p>
              <p>
                Log in wth one of the users from the mock API<br /> to see the profile.
              </p>
              <p>
                This face is not included in the figma designs<br /> it's added to be user friendly
              </p>
              <p>
                e.g Email: albertukaegbu@gmail.com, <br /> Password: use any
                random password
              </p>
              <div style={{ marginTop: "10px" }}>
                <Button
                  title="LOG IN"
                  primary
                  action={() => setIsForgotPassword(false)}
                />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div>
              <div className="welcome">
                <h1>Welcome!</h1>
                <p>Enter details to login.</p>
                {hasError && (
                  <p className="error">Something went wrong check your network and try again</p>
                )}
              </div>
              <div className={`inputGroup ${emailClasses}`}>
                <input
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
              </div>
              <span
                className="errorText"
              >
                {emailHasError && <p>Enter A Valid Email</p>}
              </span>
              <div className={`inputGroup ${passwordClasses}`}>
                <input
                  placeholder="Password"
                  type={isShowPassword ? "text" : "password"}
                  ref={passwordRef}
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={passwordBlurHandler}
                />
                <button onClick={() => setIsShowPassword(!isShowPassword)} type="button">
                  {!isShowPassword ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <span
                className="forgotPassword"
                onClick={() => setIsForgotPassword(true)}
              >
                FORGOT PASSWORD?
              </span>
              <span
            className="errorText"
          >
          {passwordHasError && <p>Must contain(0-9, A-z @, $, !, %, *, ?, or &) & 8 character long</p>}
          </span>
              <Button
                disabled={!formIsValid}
                name="pay"
                title={isLoading ? "LOADING..." : `${optionText}`}
                primary
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LogInPage;