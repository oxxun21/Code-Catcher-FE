import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

function useAutoLogout(duration = 86400000) {
  const navigate = useNavigate();
  const { clearUserInfo } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearUserInfo();
      navigate("/splash");
      alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
    }, duration);

    return () => clearTimeout(timer);
  }, [clearUserInfo, navigate, duration]);
}

export default useAutoLogout;
