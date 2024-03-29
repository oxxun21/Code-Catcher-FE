import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginCookie, removeLoginCookie } from "../../utils/loginCookie.ts";
import { useUserStore } from "../../stores/useUserStore.ts";
import LogoLight from "../../assets/Logo_light.svg";
import LogoDark from "../../assets/Logo_dark.svg";
import { Modal } from "./Modal.tsx";
import { withdrawAPI } from "../../api";
import { useEventTracker } from "../../hook";

type ModalContentType = "logout" | "withdraw" | "leavePage" | "";

export const Header = () => {
  const location = useLocation();
  const isDarkMode =
    location.pathname.startsWith("/codingTest/") ||
    location.pathname.startsWith("/CodeCompare/") ||
    location.pathname.startsWith("/bookmark/");
  const logoImage = isDarkMode ? LogoDark : LogoLight;

  const isMyPage = location.pathname === "/myPage";
  const [modalContent, setModalContent] = useState<ModalContentType>("");

  const { clearUserInfo } = useUserStore.getState();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const trackEvent = useEventTracker();

  useEffect(() => {
    const token = getLoginCookie();
    setIsLoggedIn(!!token);
  }, []);

  const handleNavigateToHome = () => {
    trackEvent({
      category: "Navigate",
      action: "gotToHome",
    });

    navigate("/");
  };

  const handleKakaoLogin = () => {
    const kakaoRestApi = import.meta.env.VITE_KAKAO_REST_API;
    const rediretUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${rediretUri}&response_type=code`;

    trackEvent({
      category: "Auth",
      action: "loginInHeader",
      label: "Kakao",
    });

    window.location.href = link;
  };

  const handleLogout = () => {
    removeLoginCookie({ path: "/" });
    clearUserInfo();
    localStorage.removeItem("userStore");
    setIsLoggedIn(false);

    trackEvent({
      category: "Auth",
      action: "logout",
    });

    navigate("/splash");
  };

  const handleWithdraw = async () => {
    try {
      const status = await withdrawAPI();
      if (status === 200) {
        removeLoginCookie({ path: "/" });
        clearUserInfo();
        localStorage.removeItem("userStore");
        setIsLoggedIn(false);
        alert("회원 탈퇴가 성공적으로 처리되었습니다.");

        trackEvent({
          category: "Auth",
          action: "withDraw",
        });

        navigate("/splash");
      }
      removeLoginCookie({ path: "/" });
      clearUserInfo();
      localStorage.removeItem("userStore");
      setIsLoggedIn(false);
      navigate("/splash");
    } catch (error) {
      console.error("회원 탈퇴 처리 중 오류가 발생했습니다.", error);
    }
  };

  const handleMyPageClick = () => {
    if (location.pathname.startsWith("/codingTest/")) {
      openModal("leavePage");
    } else {
      navigate("/myPage");
    }
  };

  const openModal = (type: ModalContentType) => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const modalContents = () => {
    if (modalContent === "logout") {
      return (
        <>
          <strong>로그아웃</strong>
          <p>접속 중인 계정에서 로그아웃 하시겠어요?</p>
          <div>
            <button onClick={closeModal}>취소</button>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </>
      );
    } else if (modalContent === "withdraw") {
      return (
        <>
          <strong>정말 탈퇴 하시겠어요?</strong>
          <p>탈퇴 버튼 선택 시, 계정은 삭제되며 복구할 수 없습니다</p>
          <div>
            <button onClick={handleWithdraw}>탈퇴</button>
            <button onClick={closeModal}>취소</button>
          </div>
        </>
      );
    } else if (modalContent === "leavePage") {
      return (
        <>
          <strong>페이지를 나가시겠습니까?</strong>
          <p>지금 페이지를 나가면 작성 중인 코드가 삭제돼요</p>
          <div>
            <button onClick={closeModal}>취소</button>
            <button onClick={() => navigate("/myPage")}>나가기</button>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <StyledHeader isDarkMode={isDarkMode}>
      <h1>
        <img src={logoImage} alt="로고 이미지" onClick={handleNavigateToHome} />
      </h1>
      {!isLoggedIn ? (
        <StyledLoginBtn onClick={handleKakaoLogin}>로그인</StyledLoginBtn>
      ) : (
        <StyledBtnGroup>
          <button onClick={() => openModal("logout")}>로그아웃</button>
          {isMyPage ? (
            <button onClick={() => openModal("withdraw")}>회원탈퇴</button>
          ) : (
            <button onClick={handleMyPageClick}>마이페이지</button>
          )}
        </StyledBtnGroup>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal} modalHeader="Want to Leave">
          <ModalContents>{modalContents()}</ModalContents>
        </Modal>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 0.875rem 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "var(--background-color)" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "var(--gray800-color)")};

  & h1 {
    cursor: pointer;
  }

  & h1 {
    cursor: pointer;
  }

  & button {
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    color: ${({ isDarkMode }) => (isDarkMode ? "#EAEAEA" : "var(--gray800-color)")};
    background-color: ${({ isDarkMode }) => (isDarkMode ? "transparent" : "#ffffff")};
  }
`;

const StyledBtnGroup = styled.div`
  & > button {
    border: none;
    background-color: transparent;
    padding: 0.625rem;
  }

  & > button:not(:first-of-type) {
    margin-left: 1.25rem;
  }
`;

const StyledLoginBtn = styled.button`
  padding: 0.75rem 1.6563rem;
  background-color: #ffffff;
  color: var(--black-color) !important;
  border-radius: 999px;
  border: 1px solid var(--black-color);
  background-color: #ffffff;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  & > strong {
    font-size: 1.375rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  & > p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1.875rem;
  }

  & > div {
    display: flex;
    gap: 20px;

    & button {
      font-size: 1rem;
      font-weight: 500;
      border-radius: 20px;
      padding: 1rem 4.3125rem;
      cursor: pointer;
    }
    & button:nth-of-type(1) {
      color: var(--black-color);
      border: 2px solid var(--gray200-color);
      background-color: #f4f4f4;
      &:hover {
        background-color: var(--gray100-color);
      }
    }
    & button:nth-of-type(2) {
      color: #ffffff;
      background-color: var(--secondary-color);
      &:hover {
        background-color: var(--secondary-light-color);
      }
    }
  }
`;
