import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import header_logo from "./imgs/header_logo.png";
import header_menu_stroke from "./imgs/header_menu_stroke.png";
import myIcon from "./imgs/header_mypage.png";
import userIcon from "./imgs/header_user.png";
import searchIcon from "./imgs/header_search.png";
import { useNavigate } from "react-router-dom";
// import AdminHome from "../admin/adminHome";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../context";
// --------------------------------------------------------------------------------------------------------------------

function Header() {
  const navItems = [
    {
      name: "홈",
      path: "/",
    },
    {
      name: "병원 소개",
      submenu: [
        { path: "/introduce", name: "개요" },
        { path: "/directions", name: "오시는 길" },
        { path: "/department", name: "진료과 소개" },
      ],
    },
    { name: "공지사항", submenu: [{ path: "/notice", name: "공지사항" }] },
    {
      name: "온라인예약",
      submenu: [
        { path: "/userreserv", name: "회원예약" },
        { path: "#/nonuserreserve", name: "비회원예약" },
      ],
    },
    {
      name: "온라인상담",
      submenu: [{ path: "/onlineCounsel", name: "온라인상담" }],
    },
    { name: "고객 리뷰", submenu: [{ path: "/review", name: "리뷰" }] },
  ];

  const [showBox, setShowBox] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    // 처음 마운트되었을 때 또는 auth가 변경될 때마다 실행
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setAuth(false); // 토큰이 없으면 로그인 상태 해제
    }

    // const handleScroll = () => {
    //   if (window.scrollY > 1500) {
    //     setShowBox(false);
    //   } else {
    //     setShowBox(true);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id");
      setAuth(false);
      navigate("/");
    }
  };
  const handleMyPageClick = (e) => {
    if (!auth) {
      e.preventDefault(); // 기본 링크 동작 방지
      alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
      navigate("/signIn");
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderSection>
          <Logo>
            <Link to="/">
              <img src={header_logo} width="128px" height="36px" alt="logo" />
            </Link>
          </Logo>

          <Navigation>
            <ul>
              <img
                src={header_menu_stroke}
                width="36px"
                height="36px"
                alt="menu"
              />
              {navItems.map((item) => (
                <li key={item.name}>
                  <article>
                    {" "}
                    <MenuLink to={item.path || "#"}>{item.name}</MenuLink>
                  </article>
                  {item.submenu && showBox && (
                    <ul>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <SubLink to={subItem.path}>{subItem.name}</SubLink>
                          <div className="element"></div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Navigation>
          <HederSectionB>
            <LoginBox>
              <Link to="/mypage" onClick={handleMyPageClick}>
                <img src={myIcon} alt="마이페이지" />
                <LoginButton>마이페이지</LoginButton>
              </Link>

              {auth ? (
                <Link to="/" onClick={handleLogout}>
                  <img src={userIcon} />
                  <LoginButton>로그아웃</LoginButton>
                </Link>
              ) : (
                <Link to="/signIn">
                  <img src={userIcon} />
                  <LoginButton>로그인</LoginButton>
                </Link>
              )}
            </LoginBox>
            <SearchBox>
              <Link to="/">
                <input
                  type="search"
                  placeholder="검색어를 입력해주세요."
                ></input>
                <img src={searchIcon} />
                <LoginButton></LoginButton>
              </Link>
            </SearchBox>
          </HederSectionB>
        </HeaderSection>
      </HeaderContainer>
    </Container>
  );
}

const Container = styled.div`
  display: block;
  width: 100%;
  height: 122px;
  border-bottom: 1px solid #111111;
`;
const HeaderContainer = styled.div`
  background-color: #ffffff;
  display: block;
  width: 100%;
  height: 122px;
  border-bottom: 1px solid #111111;
  position: fixed; /* 화면 상단에 고정 */
  z-index: 100;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1280px;
  height: 122px;
`;

const Logo = styled.h1`
  display: flex;

  align-items: center;
  width: 150px;
  height: 122px;
  img {
    margin-left: 5px;
    margin-top: 5px;
  }
`;

// ---------------------------------------------------------------------------------------------
const Navigation = styled.nav`

   z-index: 99 ;
  width: 820px;
  height: 122px;
  font-weight: 500;
  text-align: center;
  position: relative;
  img {
    position: relative;
    top: -5px;
  }
  ul {
  
  position: relative;
    display: flex;
    list-style: none;
  }
  ul:first-child {
    padding: 50px 50px 20px 50px;

  }
  a{   
  
  font-family: "Nanum Gothic", serif;
  font-weight: 600;
  }
  ul li {
  
    width: 140px;
    position: relative;
    &:hover ul {
      display: block;
    }
  }

  ul ul {
 
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: #fff;
    width: 360px;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

    li{
  
    border-bottom:1px solid black;
    //font-family: "Nanum Gothic", serif;
    text-align: left;
    right:-15px;
    position: relative;
    width: 95px;
    padding-top:20px;
    
    }
   
  }

  li:hover ul,
  &:hover ul ul {
    display: block;
   
    visibility: visible;
  }

 div {
 background-color: #ffffff;
      display: none;
      position: fixed;
      height: 225px;
      top: 122px;
      left:0px;
      min-width :100vw;
      width: 100%;
  border-bottom: 1px solid #111111;
      z-index: -1;
      flex-direction: row;
      padding: 10px;
      box-sizing: border-box;
    }
    &:hover div {

      display: block;
    }
  }
`;
const MenuLink = styled(Link)`
  text-decoration: none;
  color: #111111;
  font-size: 18px;
  lineheight: 16;

  &:hover {
    width: 1000px;
  }
`;

const SubLink = styled(Link)`
  text-decoration: none;
  color: #111;

  &:hover {
    width: 1000px;
    color: #fc9664;
  }
`;

const HederSectionB = styled.div`
  width: 230px;
  height: 122px;
`;

const LoginBox = styled.div`
  padding-top: 22px;
  font-size: 12ppx;
  float: right;
  position: relative;
  color: #111111;
  lineheight: 16;
  a:first-child {
    padding: 16px;
  }

  a:nth-child(2) img {
    top: 3px;
    position: relative;
  }
`;
// ---------------------------------------------------------------
const LoginButton = styled.button`
  font-family: "Nanum Gothic", serif;
  margin-left: 20px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  lineheight: 16;
`;

const SearchBox = styled.button`
  right: 5px;
  top: 22px;
  float: right;
  width: 190px;
  height: 25px;
  background-color: transparent;
  border: none;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  input {
    letter-spacing: 0.1em;
    height: 25px;
    font-size: 12px;
    width: 190px;
    font-family: "Nanum Gothic", serif;
    border: none;
    border-bottom: 1px solid #666;
    padding-bottom: 5px;
  }
  input:focus {
    outline: none;
  }
  img {
    bottom: 5px;
    right: -2px;
    position: absolute;
  }
`;

export default Header;
