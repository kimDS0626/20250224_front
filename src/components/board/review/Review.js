import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewTable from "./ReviewTable";
import { Link } from "react-router-dom";
import ReviewPagination from "./ReviewPagination";
import axios from "axios";

function Review() {
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);

  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/review/list", {
        params: { page: page - 1 },
      });

      setBbsList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalCnt(response.data.totalElements);
      console.log("reviewList success")
      console.log(response)
    } catch (error) {
      console.log("Error fetching board data:", error);
    }
  };

  useEffect(() => {
    getBbsList(page);
  }, [page]);






  return (
    <Container>
      <ContentWrapper>
        <NoticeTitle>
          <h1>고객리뷰</h1>
        </NoticeTitle>

        <ReviewTable />
        <WriteBtnBox>
          <Link to="/reviewWirte">
            <WriteBtn>작성</WriteBtn>
          </Link>
        </WriteBtnBox>

        <PaginationBox>
          <ReviewPagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalCnt={totalCnt}
        />

        </PaginationBox>
      </ContentWrapper>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  height: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  공지사항 제목
const NoticeTitle = styled.div`
  width: 1000px;
  height: 50px;
  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;

//페이지네이션
const PaginationBox = styled.div`
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  width: 1000px;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;

  /* Pagination 스타일 */
  .pagination {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }
`;

const WriteBtn = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
`;
const WriteBtnBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;
export default Review;
