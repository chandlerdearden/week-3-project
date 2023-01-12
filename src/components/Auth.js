import { useState, useContext } from "react";
import AuthContext from '../store/authContext'
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext)
  // const baseURL = "https://socialmtn.devmountain.com";

  const submitHandler = (e) => {
      e.preventDefault();

       const body = {
        username,
        password
       }
       console.log(body)

    axios.post(register ? `/register`: `/login`, body)
    .then((res) => {
        console.log(res.data)
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
    })
    .catch(err => {
        console.log(err)
      setPassword('')
      setUsername('')
    }
    )
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          palceholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button
        onClick={register ? () => setRegister(false) : () => setRegister(true)}
        className="form-btn"
      >
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
