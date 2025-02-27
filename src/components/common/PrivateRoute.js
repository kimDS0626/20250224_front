import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
      navigate("/signIn", { replace: true });
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

export default PrivateRoute;
