import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    if (!email || !password) {
      toast.error("Invalid Input", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const { data } = await axios.post("/login", { email, password });
      console.log("data of login:",data)
      setUser(data.userDoc);
      
      localStorage.setItem("token", data.token); // S
      // Use toast.promise for handling login promise
      await toast.promise(axios.post("/login", { email, password }), {
        pending: "Logging in...",
        success: "Login successful! Redirecting...",
        error: "Login invalid! Please check your credentials.",
      });
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    } catch (e) {
      // Show a generic error message using toast
      toast.error("Login Invalid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-bold">
          Welcome to HotelWala🏨
        </h1>

        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="youremail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <ToastContainer className="w-80 text-xs sm:text-lg  mt-3 sm:mt-0 mx-8 sm:mx-1 sm:max-w-80" />
          <div className="text-center py-2 text-gray-500">
            Dont have account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
