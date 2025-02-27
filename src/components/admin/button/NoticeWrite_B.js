import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../../context"; // 두 context import
import axios from "axios";

function NoticeWrite_B({
  createBbs,
  handleChangeClick,
  files,
  title,
  content,
}) {
  const handleSubmit = () => {
    if (!title || !content || !title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요."); // 제목이나 내용이 비었을 경우 얼러트 표시
      return;
    }
    createBbs(); // 제목과 내용이 비지 않으면 createBbs 호출
  };

  return (
    <NoticeContainer>
      <WriteBox>
        <WriteButton o onClick={handleSubmit}>
          등록
        </WriteButton>
        <WriteButton onClick={handleChangeClick}>목록</WriteButton>
      </WriteBox>
    </NoticeContainer>
  );
}

const NoticeContainer = styled.div`. 

  margin: auto;
  display: block;
  width: 1000px;
  height: 30px;
  position: relative;
  button {
  }
`;

// 작성/수정 버튼 박스
const WriteBox = styled.div`
  width: 1000px;
  height: 60px;
  background-color: #111111;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
`;

// 작성/수정 버튼 스타일
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
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    border: 1px solid #f4f4f4;
    background: #111111;
    color: #f4f4f4;
    box-shadow: 0px 3px 1px #111111;
  }
`;
export default NoticeWrite_B;
