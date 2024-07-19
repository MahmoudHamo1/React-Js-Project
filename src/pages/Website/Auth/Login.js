import { useState, useContext } from "react";
import axios from "axios";
import Header from "../../../Components/Header";
import { User } from "../../../pages/Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import "./login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accept, setAccept] = useState(false);
  const [Err, setErr] = useState(false);

  const nav = useNavigate();

  const cookie = new Cookies();

  const userNow = useContext(User);
  console.log(userNow);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent login">
        <div className="register login">
          <form onSubmit={Submit}>
            <label htmlFor="email"> Email : </label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <div style={{ textAlign: "center" }}>
              <button type="submit">Log in</button>
            </div>
            {accept && Err === 422 && (
              <p className="error">Wrong Email or password</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
