import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    fetch("https://yappari-coffee-bar.shop/api/check_user_session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsAuthenticated(data.success);
          if (!data.success) {
            setTimeout(() => navigate("/login"), 100);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setTimeout(() => navigate("/login"), 100);
        }
      });

    return () => { isMounted = false; };
  }, [navigate]); 

  if (isAuthenticated === null) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9fafb"
      }}>
        <div style={{
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center"
        }}>
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 24 24" 
            fill="none" 
            style={{ margin: "0 auto 16px auto" }}
          >
            <path 
              d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" 
              stroke="#1C359A" 
              strokeWidth="2" 
              fill="none"
            />
            <path 
              d="M6 1v3M10 1v3M14 1v3" 
              stroke="#1C359A" 
              strokeWidth="2"
            />
            <path 
              d="M18 11h2a2 2 0 002-2v-1a2 2 0 00-2-2h-2" 
              stroke="#1C359A" 
              strokeWidth="2"
            />
          </svg>
          <p style={{ 
            fontSize: "18px", 
            fontWeight: "500", 
            color: "#1C359A",
            margin: 0
          }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default UserRequireAuth;