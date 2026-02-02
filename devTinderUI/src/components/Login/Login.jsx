import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiBasePath = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("rajasri@gmail.com");
  const [password, setPassword] = useState("18R@j@sri");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      emailId: email,
      password: password,
    };

    const api = axios.create({
      baseURL: apiBasePath, // your backend URL
      withCredentials: true, // if using cookies
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      await api.post("/login", payload);
      navigate("/dashboard");
    } catch (err) {
        console.log('ERROR------', err)
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
