import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRequireAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem("user");

        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    return sessionStorage.getItem("user") ? children : null;
};

export default UserRequireAuth;