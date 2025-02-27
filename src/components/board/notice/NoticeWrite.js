import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../../context";
import axios from "axios";
import NoticeWrite_B from "../../admin/button/NoticeWrite_B";

function NoticeWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [files, setFiles] = useState([]); // 파일 상태 관리

  // 제목, 내용 상태 변경 함수
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  // 파일 변경 함수
  const handleChangeFile = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 5); // 최대 5개 파일
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // 파일 삭제 함수
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // 파일 삭제
  };

  // 파일 업로드 함수
  const fileUpload = async (noticeId) => {
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    // FormData 확인
    for (let pair of fd.entries()) {
      console.log(`✅ FormData 확인 -> ${pair[0]}:`, pair[1]);
    }

    await axios
      .post(`/api/admin/notice/${noticeId}/file/upload`, fd, { headers })
      .then((resp) => {
        console.log("[file.js] fileUpload() success :D");
        alert("파일 업로드 성공 :D");
      })
      .catch((err) => {
        console.error("[FileData.js] fileUpload() error :<");
        alert("파일 업로드 실패!");
        console.error(err);
      });
  };

  const createBbs = async (title, content, files) => {
    // 제목과 내용이 공백이거나 빈 문자열인지 체크
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요."); // 제목과 내용이 비었을 경우 얼러트 표시
      return;
    }

    const req = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post("/api/admin/notice/write", req, {
        headers: headers,
      });
      console.log("서버 응답:", response); // 응답 확인
      const noticeId = response.data.id;
      if (noticeId) {
        alert("새로운 게시글을 성공적으로 등록했습니다 :D");

        // 공지사항 등록 후, 파일 업로드 처리
        if (files.length > 0) {
          // 파일이 있을 경우 fileUpload 호출
          await fileUpload(noticeId);
        }

        // 공지사항 상세 페이지로 이동
        navigate(`/noticedetail/${noticeId}`);
      } else {
        alert("공지사항 등록 실패! ID가 없습니다.");
      }
    } catch (error) {
      console.error("[NoticeWrite.js] createBbs() error:", error);
      alert("공지사항 등록 실패!");
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    value={title}
                    onChange={changeTitle}
                    placeholder="제목"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent
                    value={content}
                    onChange={changeContent}
                    placeholder="내용"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <UploadWrapper>
                    <FileInputWrapper>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <button
                            className="delete-button"
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                      {files.length < 5 && (
                        <div>
                          <InputFile
                            type="file"
                            name="file"
                            onChange={handleChangeFile}
                            multiple="multiple"
                          />
                        </div>
                      )}
                    </FileInputWrapper>
                  </UploadWrapper>
                </td>
              </tr>
            </tbody>
            <ButtoBox>
              <NoticeWrite_B
                createBbs={createBbs}
                files={files}
                title={title} // 부모에서 관리하는 title
                content={content} // 부모에서 관리하는 content
              />
            </ButtoBox>
          </Table>
        </TableBox>
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
// -----------------------------------------------------------
const UploadWrapper = styled.div`
  margin-bottom: 10px;
  width: 1000px;
`;

const InputFile = styled.input`
  width: 270px;
  font-size: 16px;
  color: #111111;
  cursor: pointer;

  padding: 10px 20px;
  border: 1px solid #111111;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f8f0;
  }
`;

const FileInputWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 30%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const ButtoBox = styled.div`
  display: none;
`;

export default NoticeWrite;
