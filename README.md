# BOOKSOME >

### 폴더구조 /src/...
- apis          // 재사용성이 높은 API를를 관리
- router        // 페이지 라우터 관리
- recoil        // 상태관리 데이터 관리
- shared        // 여러 페이지에서 공유 및 재사용하는 파일 관리
  - apis : 공용 API관리
  - components : 공용 컴포넌트 관리
  - service : 공용 비즈니스 로직 관리
  - utils : 공용 유틸 함수들
  - types : 공용 타입입

- pages         // 각 페이지 관리
[ page 내부 폴더 ] 
  - index.tsx   // 절대경로를 위한 파일
  - Page.tsx    // 메인 페이지 컴포넌트 파일일
  - components  // 재사용 가능한 UI컴포넌트 폴더
  - styles      // style 폴더
  - types       // 현재 페이지에서 사용하는 type 폴더
  - utils       // 유틸리티 함수 폴더
  - service     // API호출 등 비즈니스 로직 담당 폴더