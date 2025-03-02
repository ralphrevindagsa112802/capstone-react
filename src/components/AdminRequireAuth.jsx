import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRequireAuth = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://yappari-coffee-bar-system.free.nf/yappari-coffee-bar-api/api/check_admin_session.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          navigate("/admin/login");
        } else {
          setIsAdmin(true);
        }
      })
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  if (isAdmin === null) return <p>Loading...</p>;

  return isAdmin ? children : null;
};

export default AdminRequireAuth; // ✅ Only one export default
