import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRequireAuth = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/check_user_session.php", {
        credentials: "include", // ✅ Sends session cookie
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAuthenticated(data.success);
          if (!data.success) {
            navigate("/login"); // ✅ Move navigation inside useEffect
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          navigate("/login");
        });
    }, [navigate]); // ✅ Add navigate as a dependency
  
    if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Prevent flickering
  
    return isAuthenticated ? children : null; // ✅ Don't navigate in render
  };
  
  export default UserRequireAuth;