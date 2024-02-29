import styled from "@emotion/styled";

const Header = () => {
  return (
    <StyledHeader>
      <h1>CodeCatcher</h1>
      <button>로그인</button>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  max-width: 1280px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0 20px;

  & > h1 {
    font-size: 24px;
    font-weight: 600;
    /* color: #ffffff; */
  }

  & > button {
    padding: 0 26.5px;
    /* border: none; */
    background-color: #ffffff;
    color: #222222;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    border-radius: 999px;
    cursor: pointer;
  }
`;

export default Header;
