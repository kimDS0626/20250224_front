import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function OnlineCounselWrite() {
  return (
    <Container>
      <ContentWrapper>
        <Title>
          <h1>고객리뷰</h1>
        </Title>

        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle type="text" placeholder="제목" />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent placeholder="내용" />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <div>
            <Button>등록</Button>
            <Link to="/review">
              <Button>취소</Button>
            </Link>
          </div>
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  제목 섹션
const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR", serif;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 100px;
`;

// 버튼 스타일
const Button = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
  margin-left: 20px;
`;

export default OnlineCounselWrite;
