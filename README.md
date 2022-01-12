## 📌 과제 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->
(서버 중단으로 데이터 미 제공)

### 노션 클로닝 프로젝트!
배포 주소 https://minsu-zip.github.io/w4-Project_Notion_VanillaJS/
![KDT_Notion_Clone-Chrome-2021-09-03-22-55-18](https://user-images.githubusercontent.com/52727782/132017331-032abafa-3897-47b2-ba44-3e175f6ddabb.gif)

중요 컴포넌트 구성도 
-  App.js
    - NotionPage.js (li_click, remove, create 이벤트 발생)
        - NotionList.js (documents 목록 렌더링)
    - NotionEditPage.js (하단 목록의 li_click 이벤트 발생)
        - Editor.js (편집 기능)
        
### 기본 데이터 흐름 설명
1. App에서 라우팅에 따라 목록표시(NotionPage),  편집기능(NotionEditPage)을 렌더링해줍니다.
2. NotionPage에서 서버에서 받아온 데이터를 NotionList로 넘겨 화면 렌더링을 해줍니다.
3. Li click, 추가 button, 삭제 button 이벤트 발생 시 해당 id 값을 찾아 NotionEditPage로 id 값을 넘겨줍니다.
 3-1. 초기화면, 삭제 이벤트 시에는 Editor 페이지를 숨깁니다.
4. NotionEditPage 에선 받아온 id 값을 기준으로 서버에 요청하여 해당 정보를 Editor로 넘겨줍니다.
5. Editor에서 해당 정보를 기준으로 수정하고 수정된 정보를 1.5초 간격으로 서버에 요청을 보내 업데이트합니다.
6. 해당 document 편집 시, document에 포함된 목록들이 하단에 나타나고 클릭 시, 해당 컴포넌트 edit로 넘어가게 됩니다.

## 👩‍💻 구현 내용 <!-- 기능을 Commit 별로 잘개 쪼개고, Commit 별로 설명해주세요 -->

### 기본 요구사항
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

### 보너스 요구사항
 - [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.

### 개별 추가사항
- [x] 각 Document 삭제 기능 추가
  - [x] 삭제 버튼 클릭 시, 해당 Document 삭제 후, Editor 컴포넌트 안보이게 구성
