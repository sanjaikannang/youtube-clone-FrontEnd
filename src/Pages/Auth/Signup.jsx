import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);

      const payload = {
        name,
        email,
        password,
      };
      const res = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/user/signup`,
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
        const userData = {
          name,
          email,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        Navigate("/login");
      } else {
        setErr(data.error || "Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlelogin = () => {
    Navigate("/login");
  };

  const handlesignup = () => {
    Navigate("/signup");
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
            onClick={handlelogin}
            className="text-white bg-red-500 font-medium px-4 py-2 rounded-md"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="text-red-500 border border-red-500 bg-white font-medium px-4 py-2 rounded-md"
          >
            Signup
          </button>
        </div>
      </nav>

      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6  shadow-md">
            <div className="text-xl text-grey font-semibold">
              <span className=" text-red-500 font-bold">You </span>
              Tube
            </div>
            <br />
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center ">
              Register
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-2 mb-4 border "
            />
            <input
              type="email"
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
              className={`w-full font-medium bg-red-500 text-white py-2 relative  ${
                loading ? "bg-red-500" : "bg-red-500"
              } text-red-500 py-2 relative`}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading && <img alt="" />}
              {!loading ? "Register" : "Registering..."}
            </button>
            {err && (
              <p color="error" sx={{ mt: 2 }}>
                {err}
              </p>
            )}
            <p className="text-gray-600 mt-2">
              Already have an account?
              <a onClick={() => Navigate("/login")} className="text-red-500">
                Login here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
