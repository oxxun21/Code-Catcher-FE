import { useEffect } from "react";
import styled from "@emotion/styled";
import icon_close from "../../assets/icon_close.svg";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  modalHeader: string;
}

export const Modal = ({ children, onClose, modalHeader }: ModalProps) => {
  useEffect(() => {
    const root = document.body;
    root.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = root.style.top;
      root.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <BackgroundStyle onClick={onClose}>
      <BoxStyle onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <p>{modalHeader}</p>
          <ButtonContainer onClick={onClose}>
            <img src={icon_close} alt="닫기 버튼" />
          </ButtonContainer>
        </ModalHeader>
        {children}
      </BoxStyle>
    </BackgroundStyle>,
    document.getElementById("modal")!
  );
};

const BackgroundStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
`;

const BoxStyle = styled.div`
  background-color: #fff;
  color: #000;
  padding: 24px 44px 50px;
  height: fit-content;
  min-width: 440px;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > p {
    font-family: var(--font--Galmuri);
    font-size: 0.875rem;
    color: #222;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
