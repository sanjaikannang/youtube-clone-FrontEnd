import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/user/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.result && data.result._id) {
          localStorage.setItem("userId", data.result._id);
          navigate("/homepage");
        } else {
          setErr("User information is missing or invalid!");
        }
      } else {
        setErr("Invalid credentials. Please check your email and password!");
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-red-500 font-bold">You </span>
          Tube
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-white bg-red-500 font-medium px-4 py-2 rounded-md"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-red-500 border border-red-500 bg-white font-medium px-4 py-2 rounded-md"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </nav>

      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="text-xl text-grey font-semibold">
              <span className=" text-red-500 font-bold">You </span>
              Tube
            </div>
            <br />
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center ">
              Login
            </h2>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border "
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border "
            />

            <button
              className="w-full font-medium bg-red-500 text-white py-2 relative"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white mr-2"></div>
                </div>
              )}
              {!loading ? "Login" : ""}
            </button>
            {err && (
              <p color="error" sx={{ mt: 2 }}>
                {err}
              </p>
            )}
            <p className="text-gray-600 mt-2">
              Don't have an account?
              <button
                onClick={() => navigate("/signup")}
                className="text-red-500"
              >
                Signup here.
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
