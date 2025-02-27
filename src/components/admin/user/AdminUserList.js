import styled from "styled-components";
import axios from "axios";
import Pagination from "react-js-pagination";
import search from "./imgs/search.png";
import React, { useState, useEffect } from "react";

function AdminUserList() {
  // BbsList
  const [bbsList, setBbsList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  // 회원 정보 조회
  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/api/admin/member/Member", {
        params: { page: page - 1 },
      });
      console.log(response.data.content);
      setBbsList(response.data.content);
      setPageSize(response.data.pageSize || 10);
      setTotalCnt(response.data.totalElements);
      console.log("member seccess");
      console.log(response);
      console.log("총 개수:", totalCnt);
    } catch (error) {
      console.log("Error fetching board data:", error);
    }
  };

  // 페이지 변경
  const changePage = (page) => {
    setPage(page);
    getBbsList(page);
  };

  // 컴포넌트가 처음 렌더링될 때 게시글 목록을 가져옴
  useEffect(() => {
    getBbsList(page);
  }, [page]);

  // ----------------------------------------------------------------
  const addEmptyRows = (data) => {
    // 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열을 반환
    if (!Array.isArray(data)) {
      return [];
    }

    const rowsWithEmpty = [];
    data.forEach((item, index) => {
      rowsWithEmpty.push({}); // 빈 데이터 행 추가
      rowsWithEmpty.push(item); // 실제 데이터 행 추가
    });
    return rowsWithEmpty;
  };
  const noticesWithEmptyRows = addEmptyRows(bbsList);

  // 삭제 처리
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      setBbsList(bbsList.filter((notice) => notice.id !== id));
    }
  };
  useEffect(() => {
    console.log(bbsList);
  }, [bbsList]); // bbsList 상태가 변경될 때마다 실행

  return (
    <Container>
      <SearchBox>
        <img src={search} />
        <SearchField
          type="text"
          placeholder="검색 할 것을 적어보세요."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </SearchBox>

      <NoticeTableBox>
        <NoticeTabled>
          <thead>
            <tr>
              <th>번호</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>핸드폰 번호</th>
              <th>회원삭제</th>
            </tr>
          </thead>

          <tbody>
            {noticesWithEmptyRows.map((response, index) => (
              <tr key={index}>
                {response.id ? (
                  <>
                    <td>{response.id}</td>
                    <td>{response.email}</td>
                    <td>{response.nick}</td>
                    <td>{response.tel}</td>
                    <td>
                      <button onClick={() => handleDelete(response.id)}>
                        삭제
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td colSpan={4}>&nbsp;</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </NoticeTabled>
      </NoticeTableBox>

      <PaginationBox>
        <Pagination
          className="pagination"
          activePage={page}
          itemsCountPerPage={pageSize}
          totalitemsCount={totalPages}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={changePage}
        />
      </PaginationBox>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`  
width:100%
  max-width: 1920px;
`;
//  검색 박스
const SearchBox = styled.div`
  display: flex;
  width: 1280px;
  height: 90px;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
    left: 180px;
    top: 35px;
    width: 30px;
    height: 30px;
  }
  input {
    padding-left: 50px;
    padding-bottom: 10px;
  }
  input:focus {
    outline: none;
  }
`;

//  검색 필드 스타일
const SearchField = styled.input`
  margin-top: 25px;
  width: 920px;
  height: 55px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-weight: regular;
  font-size: 36px;
  font-family: "Noto Sans KR", serif;
`;

const NoticeTableBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding-left: 140px;
  padding-right: 140px;
`;
const NoticeTabled = styled.table`
  width: 100%;
 
  border-collapse: collapse;
  

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  thead th {
  
    padding: 10px;
    font-weight: medium;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
  }


  tbody tr {
    &:nth-child(odd) {
      border: none;
      height: 40px;
    }
    &:nth-child(even) {
      background-color: #f4f4f4;
      border-bottom: 1px solid #111111;
      height: 70px;
    }
    width: 1280px;
  }

  
  tbody td {
    padding: 10px;
    font-weight: regular;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
 vertical-align: middle;

  &:nth-of-type(1) {  /* 첫 번째 <td> */
    width: 80px;
    text-align: center;
  }

  &:nth-of-type(2) {  /* 두 번째 <td> */
    width: 320px;
    text-align: center;
  }

  &:nth-of-type(3) {  /* 세 번째 <td> */
    width: 380px;
    text-align: center;
  }

  &:nth-of-type(4) {  /* 네 번째 <td> */
    width: 350px;
    text-align: center;
  }
     &:nth-of-type(5) {  /* 다섯 번째 <td> */
    width: 150px;
    text-align: center;
  }

`;
//페이지네이션
const PaginationBox = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default AdminUserList;
