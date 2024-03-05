import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { instance } from "../api/instance";
import { setLoginCookie } from "../utils/loginCookie";
import { useUserStore } from "../stores/useUserStore";

export const KakaoRedirection = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  useEffect(() => {
    instance
      .get(`kakao/callback?code=${code}`)
      .then(response => {
        const resData = response.data;
        console.log(resData);
        const { jwt, userId, nickname } = response.data;
        if (resData) {
          setLoginCookie(jwt, { path: "/" });
          setUserInfo(userId, nickname);
          navigate("/");
        } else {
          console.log("token 없음");
        }
      })
      .catch((err: Error) => {
        console.error("로그인 오류 발생", err);
      });
  }, []);

  return <div>로그인 중입니다.</div>;
};
