import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://reqres.in/api/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] px-6 bg-gray-50">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-950 text-white p-2 w-full mt-4"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
