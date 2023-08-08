import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";

export default function Login({uid,setUid}) {
  
  var [loginEmail, setLoginEmail] = useState("");
  var [name, setName] = useState("");
  var [loginPassword, setLoginPassword] = useState("");
  var [SignUpEmail, setSignUpEmail] = useState("");
  var [SignUpPassword, setSignUpPassword] = useState("");
  
  let history = useNavigate()
  const triggerRegister = async (e) => {
    e.preventDefault();
    if ((SignUpEmail !== "") &&(name !== "")&&(SignUpPassword !== "")){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(SignUpEmail)){
        console.log(SignUpEmail, SignUpPassword);
        let res = await registerWithEmailAndPassword(name, SignUpEmail, SignUpPassword);
        if (typeof res === "string"){
          setUid(res);
          history('/')
        }else{
          alert('veriable not string type- it is '+(typeof res))
        }
      }
      else{
        alert("please use propper email")
      }
    }
    else{
      alert("please dont leave fields empty")
    }
};
const triggerlogin =async (e) => {
    e.preventDefault();
    const email = "admin@clashmarketplace.com";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  console.log(emailRegex.test(email))
    if ((loginEmail !== "")&&(loginPassword !== "")){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let mail_conf = emailRegex.test(loginEmail)
      if (mail_conf){
        console.log(loginEmail, loginPassword);
        let res = await logInWithEmailAndPassword(loginEmail, loginPassword);
        if (typeof res === "string"){
          setUid(res);
          history('/')
        }else{
          alert('veriable not string type- it is '+(typeof res))
          console.log(res)
        }
      }
      else{
        alert("please use propper email")
        console.log(typeof loginEmail)
      }
    }
    else{
      alert("please dont leave fields empty")
    }
  };
  const triggerGooglelogin = async () => {
    let res = await signInWithGoogle();
    if (res !== undefined || res !== null) {
        // console.log("result = ",res);
        setUid(res);
        // console.log(uid)
        history('/')
    } else {
      console.log(res);
    }
  };
//   useEffect(() => {
//     console.log(`uid - '${props.uid}'`);
//     console.log("uid - ", typeof props.uid);
//     //   window.location.href = "/";
//   }, [props.uid]);
  return (
    <div id="login">
      <div className="formWrapper">
        <span className="logo">CChat</span>
        <span className="title">REGISTER</span>
        <form onSubmit={triggerRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={SignUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            value={SignUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login__btn" type="submit">
            Register
          </button>
        </form>
        <br />
        <hr />
        <span className="title">LOGIN</span>
        <form onSubmit={triggerlogin}>
          <input
            type="text"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login__btn" type="Submit">
            Login
          </button>
        </form>
        <br />
        <hr />
        <button className="google" onClick={triggerGooglelogin}>
          Login with Google
        </button>
        <br />
        <hr />
      </div>
    </div>
  );
}
