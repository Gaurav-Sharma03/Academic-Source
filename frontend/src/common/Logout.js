// src/common/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const role = localStorage.getItem("userRole"); // "admin" | "user" | "authority"

      try {
        // Optional: Notify backend about logout
        await fetch("/api/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout request failed", error);
      }

      // Clear storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      sessionStorage.clear();

      // Redirect based on role
      switch (role) {
        case "admin":
          navigate("/admin-login");
          break;
        case "authority":
          navigate("/authority-login");
          break;
        default:
          navigate("/login");
          break;
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
      Logging out...
    </div>
  );
};

export default Logout;
