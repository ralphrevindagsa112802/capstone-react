import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const UserProfileAcc = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    address: "",
    profile_pic: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API or localStorage for Google OAuth user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({
        f_name: user.name, // Google Name
        email: user.email, // Google Email
        profile_pic: user.picture, // Google Profile Image
      });
    } else {
      fetch("https://yappari-coffee-bar.shop/api/getUser", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            console.error("Error fetching user data:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="bg-[#DCDEEA]">
      <UserNavbar />

      <div className="flex flex-col md:flex-row bg-[#1C359A] py-10 px-4 md:px-36 mt-18 md:mt-32 ">
        <div className="relative w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C359A] text-2xl md:text-4xl">
          {userData.profile_pic ? (
            <img
              src={userData.profile_pic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>
              {(userData.f_name?.charAt(0) || "").toUpperCase()}
              {(userData.l_name?.charAt(0) || "").toUpperCase()}
            </span>
          )}
        </div>

        <div className="mt-8 md:mt-8 md:ml-4 text-center md:text-left">
          <h2 className="text-lg md:text-xl text-white font-semibold">
            {userData.f_name} {userData.l_name}
          </h2>
          <p className="text-sm text-white">{userData.email}</p>
          <p className="text-xs text-white">{userData.address}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfileAcc;
