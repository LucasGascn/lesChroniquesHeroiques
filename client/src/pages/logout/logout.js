import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  useEffect(function () {
    localStorage.removeItem("user");
    navigate("/home");
  }, []);
}

export default Logout;
