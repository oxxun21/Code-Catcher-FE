import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/BASE_URL";

export const KakaoRedirection = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/kakao/callback?code=${code}`).then(response => {
      console.log(response.data.token);

      localStorage.setItem("name", response.data.user_name);
      localStorage.setItem("token", response.data.token);

      const token = localStorage.getItem("token");
      if (token !== undefined) {
        navigate("/");
      } else {
        console.log("token 없음");
      }
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};
