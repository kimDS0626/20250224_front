import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AdminUser from "./user/AdminUser";
import AdminUserDetail_B from "./user/AdminUserDetail_B";

import Notice from "../board/notice/Notice";

import NoticeList_B from "./button/NoticeList_B";
import NoticeWrite from "../board/notice/NoticeWrite";
import NoticeWrite_B from "./button/NoticeWrite_B";
import NoticeDetail from "../board/notice/NoticeDetail";
import NoticeDetail_B from "./button/NoticeDetail_B";
import NoticeUpdate from "../board/notice/NoticeUpdate";
import NoticeUpdate_B from "./button/NoticeUpdate_B";

import OnlineCounsel from "../board/onlinecounsel/OnlineCounsel";

import OnlineCounselDetail from "../board/onlinecounsel/OnlineCounselDetail";

import ReviewTable from "../board/review/ReviewTable";

import ReviewDetail from "../board/review/ReviewDetail";

import ReviewUpdate from "../board/review/ReviewUpdate";

function AdminHome() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentView, setCurrentView] = useState("list");

  const handleClick = (index) => {
    if (index >= 0 && index < data.length) {
      setSelectedIndex(index); // selectedIndex 업데이트
      setCurrentView("list"); // 'list'로 설정하여 목록을 표시
    } else {
      console.warn("잘못된 index 선택:", index);
    }
  };

  // handleChangeClick 함수 정의
  const handleChangeClick = () => {
    setCurrentView("write"); // 'write' 보기로 설정
  };

  const handleChangeClickA = () => {
    setCurrentView("list"); // 'write' 보기로 설정
  };

  const data = [
    {
      title: "회원 관리",
      content: {
        list: <AdminUser />,
        detail: <NoticeDetail />,
        update: <NoticeUpdate />,
      },
      buttons: {
        detail: <AdminUserDetail_B />,
        update: <NoticeUpdate_B />,
      },
    },
    {
      title: "공지사항 관리",
      content: {
        list: <Notice />,
        write: <NoticeWrite />,
        detail: <NoticeDetail />,
        update: <NoticeUpdate />,
      },
      buttons: {
        list: <NoticeList_B handleChangeClick={handleChangeClick} />,
        write: <NoticeWrite_B handleChangeClick={handleChangeClickA} />,
        detail: <NoticeDetail_B />,
        update: <NoticeUpdate_B />,
      },

      hideTitleForContent: ["list"],
    },
    {
      title: "온라인예약 관리",
      content: {
        list: <OnlineCounsel />,
        detail: <NoticeDetail />,
        update: <NoticeUpdate />,
      },
      buttons: {
        detail: <NoticeDetail_B />,
        update: <NoticeUpdate_B />,
      },
    },
    {
      title: "온라인상담 관리",
      content: {
        list: <OnlineCounsel />,
        detail: <OnlineCounselDetail />,
      },
      buttons: {
        detail: <NoticeDetail_B />,
      },
    },
    {
      title: "고객 리뷰 관리",
      content: {
        list: <ReviewTable />,
        detail: <ReviewDetail />,
        update: <ReviewUpdate />,
      },
      buttons: {
        detail: <NoticeDetail_B />,
        update: <NoticeUpdate_B />,
      },
    },
  ];

  const getHomeTitle = () => {
    return data[selectedIndex] ? data[selectedIndex].title : "관리 페이지";
  };

  useEffect(() => {
    console.log(
      "selectedIndex 또는 currentView 변경됨",
      selectedIndex,
      currentView
    );
  }, [selectedIndex, currentView]); // 상태 변경 시

  const hideTitleForContent =
    data[selectedIndex]?.hideTitleForContent?.includes(currentView);

  return (
    <HomeContainer>
      <HomeSection>
        <Homeva>
          <VaTitle>
            <h3>admin</h3>
          </VaTitle>
          <Vacontent>
            <ul>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={selectedIndex === index ? "active" : ""}
                  onClick={() => handleClick(index)} // index 전달
                >
                  <button>{item.title}</button>
                </li>
              ))}
            </ul>
          </Vacontent>
        </Homeva>
        <HomeSectionA>
          <HomeTitle>
            <h1>{getHomeTitle()}</h1>
          </HomeTitle>
        </HomeSectionA>
        <HomeSectionB>
          {" "}
          {data[selectedIndex].content[currentView] &&
            React.cloneElement(data[selectedIndex].content[currentView], {
              hideTitle: hideTitleForContent,
            })}
        </HomeSectionB>
        <HomeSectionC>{data[selectedIndex].buttons[currentView]}</HomeSectionC>
      </HomeSection>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 1450px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeSection = styled.div`
  width: 1280px;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 200px 80px 1000px;
  grid-template-rows: 50px 100% 30px 150px;
`;

const Homeva = styled.div`
  margin-top: 50px;
  background-color: #111111;
  width: 190px;
  height: 1315px;
  position: absolute;
  grid-row: span 4;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: center; /* 가로 중앙 */
`;

const VaTitle = styled.div`
  background-color: #111111;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80px;
  font-size: 32px;
  font-weight: 700;
`;

const Vacontent = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  width: 100%; /* 버튼이 가운데 정렬되도록 넓이 조정 */

  li {
    margin-bottom: 1px;
    font-size: 20px;
    font-weight: 500;
    border: none;
    background-color: #f0f0f0;
    width: 155px;
    height: 80px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center; /* 세로 중앙 정렬 */
    align-items: center; /* 가로 중앙 정렬 */
  }
  button {
    font-family: "Noto Sans KR", serif;
    width: 95px;
  }
  li.active {
    border: 1px solid #f0f0f0;
    color: #f0f0f0;
    background-color: #111111;
  }
`;
// -----------------------------------------------------------------
const HomeSectionA = styled.div`
  background-color: #111111;
  grid-column: 3;
  grid-row: 1;
  top: 50px;
  position: relative;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */

  display: flex;
  width: 1000px;
  height: 70px;
`;

const HomeTitle = styled.div`
  color: #ffffff;
  padding: 20px;
  font-size: 32px;
  font-weight: 700;
  display: flex;
`;
// ------------------------------------------------------------------------
const HomeSectionB = styled.div`
  position: relative;
  top: 60px;
  height: 1000px;
  grid-column: 3;
  grid-row: 2;
  transform: scale(1);
  display: flex;
`;

// ------------------------------------------------------------------------------
const HomeSectionC = styled.div`
  position: relative;
  top: -230px;
  background: #111111;
  height: 65px;
  width: 1000px;
  grid-column: 3;
  grid-row: 4;
`;

export default AdminHome;
