## ReadBird - FE

### Skills

- 코어: typescript, React
- 상태관리: redux, redux-toolkit
- 스타일링: styled-components
- 버전관리: github
- 서버통신: axios
- 빌드: create-react-app
- 배포: 스위그(SWYG)

### Used Library

- react-router-dom : 페이지 이동
- redux : 상태관리
- redux-toolkit : 상태관리
- react-hook-form : form 제출
- react-modal : 모달 open, close
- sweet-alert : alert, confirm 인터렉션
- dayjs : 날짜 format
- react-icons/all-file : icons 생성
- react-calendar: 캘린더 생성
- react-window : 가상스크롤 적용
- react-slick : 슬라이더 적용
- slick-carousel : 슬라이더 스타일 적용
- styled-components : 스타일링
- craco : cra config 설정 (path alias 등)
- tsconfig-paths-webpack-plugin: craco 설정에 적용할 plugin
- prettier: 코드 정리
- axios: 서버 통신

### Directory Structure

```
├─api         // 서버통신 api
  ├─types       // 서버통신 api type 작성
├─assets      // 이미지 or 폰트
├─components  // 컴포넌트
  ├─common      // 공통 컴포넌트
  ├─connection  // 첫 로딩시 서버 통신을 통해 처리할 항목 정리
  ├─templates   // page별 template
├─hooks       // 커스텀 훅
├─pages       // 페이지
├─routers     // 라우터를 따로 관리하기 위한 폴더
├─store       // 상태관리
  ├─types       // 상태관리 type 작성
├─styles      // css (reset css, library default css 등)
└─utils       // 정규표현식 패턴이나 공통 함수 등
```

### Coding Convention

- 함수 선언

  ```
  // 화살표 함수
  const action = () => {}
  ```

- 함수 네이밍

  ```
  // 일반함수: 동사 + 명사 구조로 작성
  // 생성
  const createData = () => {}
  // 수정
  const updateData = () => {}
  // 삭제
  const removeData = () => {}
  // 초기화
  const setData = () => {}
  // 조회
  const getData = () => {}

  // 이벤트 함수: 앞에 handle 붙일것
  // 클릭
  const handleClick = () => {}
  // 변경
  const handleChange = () => {}
  ```

- module export

  ```
  export Name
  ```

- type 정의 \*\*주로 사용

  ```
  // 앞에 대문자 T를 붙이고 시작
  type TExample = {
    id: number
  }
  ```

- interface 정의 \*\* 상속이 필요한 타입의 경우 사용

  ```
  // 앞에 대문자 I를 붙이고 시작
  interface IExample {
    id: number
  }
  ```

- git commit message

  - feat: 기능 생성, library 설치 등
  - modify: 생성된 기능 수정, 함수이름 수정, 파일이름 수정 등
  - add: 생성된 기능이나 컴포넌트에 기능 추가
  - refactor: 기능은 변경되지 않고 구조 변경
  - style: 스타일 수정
  - docs: docs 문서 수정 readme.md 수정
  - resource: png, svg, font 등 파일 추가
  - chore: 코드 줄바꿈, 코드 위치 바꿈, paragraph(text) 수정 등 minor한 코드 수정
  - remove: 제거된 파일, resource 등
  - 작성예시

    ```
    feat. craco 라이브러리 추가

    cra config 변경을 위해 설치 (path alias 생성 등)
    ```

- pages 파일 생성
  - 파일이름에 App을 붙인다.
  - ex. AppHome, AppMypage

### Git Branch Strategy

- main

  - 현재 출시중인 브랜치

- develop

  - 다음 출시 버전을 개발하는 브랜치
  - 리뷰어가 코드 리뷰 후 merge

- feature/feature-unit/name
  - 기능을 개발하는 브랜치
  - 최신 develop에서 브랜치 생성
  - 담당자별, 기능별 커밋 후 develop merge request
