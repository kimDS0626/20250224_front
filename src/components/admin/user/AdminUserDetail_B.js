import React from "react";
import styled from "styled-components";

function NoticeList_B({ handleChangeClick }) {
  return (
    <NoticeContainer>
      <WriteBox>
        <WriteButton onClick={handleChangeClick}>작성</WriteButton>
      </WriteBox>
    </NoticeContainer>
  );
}

const NoticeContainer = styled.div`
  margin: auto;
  display: block;
  width: 1000px;
  height: 60px;
  position: relative;
`;

const WriteBox = styled.div`
  width: 1000px;
  height: 60px;
  background-color: #111111;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
`;

const WriteButton = styled.button`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 40px;
  padding: 5px 10px;
  background: #f4f4f4;
  box-shadow: 0px 3px 1px rgba(244, 244, 244, 0.8);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #f4f4f4;
    background: #111111;
    color: #f4f4f4;
    box-shadow: 0px 3px 1px #111111;
  }
`;

export default NoticeList_B;
