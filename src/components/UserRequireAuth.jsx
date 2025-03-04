import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // ✅ Prevent state updates on unmounted components

    fetch("https://yappari-coffee-bar.shop/api/check_user_session", {
      credentials: "include", // ✅ Sends session cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsAuthenticated(data.success);
          if (!data.success) {
            setTimeout(() => navigate("/login"), 100); // ✅ Slight delay to avoid flicker
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setTimeout(() => navigate("/login"), 100);
        }
      });

    return () => { isMounted = false; }; // ✅ Cleanup function
  }, [navigate]); 

  if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Prevent flickering

  return isAuthenticated ? children : null;
};

export default UserRequireAuth;