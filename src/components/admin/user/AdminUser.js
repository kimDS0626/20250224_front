import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminUserList from "./AdminUserList";

import axios from "axios";

function AdminUser({ hideTitle }) {
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);

  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/api/member/notice/list", {
        params: { page: page - 1 },
      });
      console.log(response.data.content);
      setBbsList(response.data.content);
      setPageSize(response.data.pageSize || 10);
      setTotalCnt(response.data.totalElements);
      console.log("notice seccess");
      console.log(response);
      console.log("총 개수:", totalCnt);
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
        <AdminUserList />
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
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationBox = styled.div``;

export default AdminUser;
