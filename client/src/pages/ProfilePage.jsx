import { Navigate, useParams } from "react-router-dom";
import { useContext, useState } from "react"; // Add the useContext import
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { RiseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext); // Use the useContext hook
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  if (!ready)
    return (
      <div className="flex justify-center items-center max-h-screen max-w">
        <RiseLoader size={50} color="#f5385d" />
      </div>
    );

  if (!user && ready && !redirect) {
    
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    toast.promise(
      axios.post("/logout")
        .then(() => {
          setRedirect("/");
          setUser(null);
        })
        .catch((error) => {
          console.error("An error occurred during logout:", error);
          // Handle the error gracefully, e.g., show an error message to the user
          throw error;
        }),
      {
        pending: 'Logging out...',
        success: 'Logout successful 👋',
        error: 'Logout failed 😕'
      }
    );
  }
  

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button onClick={logout} className="primary max-w-md mt-2 text-white">
            Logout
          </button>
          <ToastContainer className="w-80 text-xs sm:text-lg  mt-3 sm:mt-0 mx-8 sm:mx-1 sm:max-w-80" />
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
    
  );
}
