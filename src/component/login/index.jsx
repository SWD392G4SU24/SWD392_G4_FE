import React from "react";
import "./index.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

function Login() {
  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <iframe
        className="login__video"
        src="https://player.vimeo.com/video/695343114?h=1a71dea0f0&autoplay=1&muted=1&loop=1"
      ></iframe>
      <div className="wrapper">
        <div className="login__logo">
          <img
            src="https://seekvectors.com/files/download/Netflix-Logo-19.png"
            alt=""
            width={200}
          />
        </div>
        <div className="login__form">
          <h3>Login into your account</h3>

          <input type="text"></input>
          <input type="password"></input>

          <button>Login</button>

          <button
            className="login__form__btnGoogle"
            onClick={handleLoginGoogle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
              alt=""
              width={30}
            />
            <span>Login with google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
