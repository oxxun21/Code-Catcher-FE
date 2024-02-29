import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/BASE_URL";

export const KakaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(BASE_URL);
    axios.get(`${BASE_URL}/kakao/callback?${code}`).then(response => {
      console.log(response.data);

      localStorage.setItem("name", response.data.user_name);
      localStorage.setItem("token", response.data.access_token);

      navigate("/");
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};
