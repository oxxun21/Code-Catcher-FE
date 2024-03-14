import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { getUserAPI } from "../api";
import { Loading } from "../components/common/Loading";

export const KakaoRedirection = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  useEffect(() => {
    if (code) {
      getUserAPI(code, navigate, setUserInfo).catch(console.error);
    }
  }, [code, navigate, setUserInfo]);

  return <Loading />;
};
