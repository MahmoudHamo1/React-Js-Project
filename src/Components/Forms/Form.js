import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./index.css";
import { User } from "../../pages/Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Forms(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();
  const cookie = new Cookies();

  const userNow = useContext(User);

  const styleRegister = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  };
  const form = {
    boxShadow: "0px 2px 15px rgb(0 0 0 /10%)",
    width: "400px",
  };
  const buttonStyle = {
    width: "100%",
  };

  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

  async function Submit(e) {
    //let flag = true;
    e.preventDefault();
    /* setAccept(true);
    if (name === "" || password.length < 8 || passwordR !== password) {
      flag = false;
    } else flag = true; */
    try {
      //if (flag) {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/${props.endPoint}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        }
      );
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;

      userNow.setAuth({ token, userDetails });
      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div className="register" style={props.styleRegister && styleRegister}>
      <form style={props.styleRegister && form} onSubmit={Submit}>
        <label htmlFor="name">Name : </label>
        <input
          id="name"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name === "" && accept && (
          <p className="error">User Name is Required</p>
        )}
        <label htmlFor="email"> Email : </label>
        <input
          id="email"
          type="email"
          placeholder="Email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {accept && emailError === 422 && (
          <p className="error">Email is already been taken</p>
        )}
        <label htmlFor="password"> password : </label>
        <input
          id="password"
          type="password"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password.length < 8 && accept && (
          <p className="error">password must be more than 8 Char</p>
        )}
        <label htmlFor="repeat"> Repeat password : </label>
        <input
          id="repeat"
          type="password"
          placeholder="Repeat password..."
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
        {passwordR !== password && accept && (
          <p className="error">password dose not match</p>
        )}
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={props.buttonStyle && buttonStyle}>
            {props.button}
          </button>
        </div>
      </form>
    </div>
  );
}
