##  📌 쇼핑몰 웹서비스

- 개발 기간 : 2023.01.30 ~ 2023.02.11
- 주제 : 물건을 주문, 판매 및 배송할 수 있는 쇼핑몰 웹사이트 개발 프로젝트
- 테스트 페이지 : [바로 가기](http://kdt-ai6-team03.elicecoding.com/)
## 🔑 API 문서 
|  공통| kdt-ai6-team03.elicecoding.com		 |  |  |
|--|--|--|--|
|사용자|회원가입|POST| /register |
|| 로그인 |POST| /login |
|| 계정찾기-email |POST|/users/help/id |
|| 계정찾기-pw,메일링 |POST| /users/help/password |
|| 관리자-전체 사용자 정보 조회 |GET| /admin/users?page=1&perPage=10 |
|| 관리자-사용자 정보 수정 |PATCH| /admin/users/:userId |
|| 관리자-사용자 정보 삭제 |DELETE| /admin/users/:userId |
|| 사용자-사용자 정보 조회 |GET| /users |
|| 사용자-사용자 정보 수정 |PATCH| /users/:userId |
|| 사용자-사용자 정보 삭제 |DELETE| /users/:userId |
|| 삭제 전 현재 비밀번호 확인 |POST| /users/currentPassword |
|상품|관리자-상품 등록|POST| /products |
|| 관리자-상품 수정 |PATCH|/products/:productId |
|| 관리자-상품 삭제 |DELETE|/products/:productId |
|| 상품 상세 정보 |GET|/products/:productId |
|| 카테고리 클릭->관련 상품 출력 |GET|/products/category/:categoryTitle |
|주문|사용자-주문하기|POST| /orders |
|| 사용자-주문 목록 조회 |GET| /orders |
|| 사용자-주문 정보 수정 |PATCH|/orders/:orderId |
|| 사용자-주문 정보 삭제 |DELETE| /orders/:orderId |
|| 관리자-전체 주문목록 조회 |GET| /admin/orders?page=1&perPage=10 |
|| 관리자-주문 상태 관리 |PATCH|/admin/orders/:orderId |
|| 관리자-주문 삭제 |DELETE| /admin/orders/:orderId |
|카테고리 |(홈)카테고리 목록 조회|GET|/categorys |
|| 관리자-카테고리 등록 |POST|/categorys |
|| 관리자-카테고리 수정 |PATCH|/categorys/:categoryId |
|| 관리자-카테고리 삭제 |DELETE|/categorys/:categoryId |


 <br>

## 👪 팀원
|  포지션|이름  |
|--|--|
|Back-End| 박글해 |
|Back-End| 심다예 |
|Back-End| 진다원 |
|Front-End| 신희태 |
|Front-End| 이승은 |
|Front-End| 임나연 |


 <br>  

## 🔧 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=plastic&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/BootStrap-7952B3?style=plastic&logo=BootStrap&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=plastic&logo=React&logoColor=white"/>
</div>

<br />

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=plastic&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/mongoDB-47A248?style=plastic&logo=mongoDB&logoColor=white"/>
</div>

<br> 

### 🌈 상세기능

1. **User**
    - 관리자
	    - 회원 관리, 권한 지정, 회원 삭제
    - 사용자
        - 회원 가입, 정보 수정, 삭제
	- 유효성 검사 
		- 로그인 :  아이디 비밀번호 일치여부, 존재하는 이메일 확인여부
		- 회원가입 : 중복 이메일 확인
<br> 

2. **PRODUCT**
    - 관리자
        - 카테고리 조회, 수정, 삭제
        - 상품 추가, 수정, 삭제
    - 유효성 검사 
		- 상품, 카테고리 : 이름 중복확인
<br> 

3.  **CART** 
	- 장바구니 추가, 수정, 삭제(전체, 부분)
    - 장바구니 가격 조회
<br>
    
4.  **ORDER** 
    - 관리자
	    - 주문 상태 변경, 삭제
    - 사용자
        - 주문 확인, 수정, 삭제
    - 유효성 검사 
		- 주문자 확인
<br> 

## ✨ 디자인
**핸드메이드 도자기 쇼핑몰**

< 디자인: 미니멀 / 단정함 > 

- 컬러: black  /white / grey

- 폰트: Merriweather


<br>

## 🔍 테스트 방법

1. 해당 프로젝트를 clone 합니다.
```
git clone git@kdt-gitlab.elice.io:ai_track/class_06/web_project/team03/moteam.git
```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.
```
-- npm 사용 시 --

cd front
npm install

cd back
npm install
```
```
-- yarn 사용 시 --

cd front
yarn

cd back
yarn
```

3. 몽고디비 설치 후 연결합니다.
```
-- 몽고디비 아틀라스 사용 시 --

1. 몽고디비 아틀라스 클라우드 데이터베이스 생성
2. back 디렉토리의 .env 파일 편집
3. MONGODB_URL 변수에 DB URL을 삽입
4. ex) MONGODB_URL="mongodb+srv://<DB명>:<비밀번호>@<db명>.m5knbpd.mongodb.net/?retryWrites=true&w=majority"
```

```
-- 로컬에서 몽고디비 사용 시 --

1. 몽고디비 설치
2. back 디렉토리의 .env 파일 편집
3. MONGODB_URL 변수에 mongodb://localhost:27017/ 삽입
```

4. 프론트엔드 서버와 백엔드 서버를 실행합니다.
```
-- npm 사용 시 --

cd front
npm start

cd back
npm start
```

```
-- yarn 사용 시 --

cd front
yarn start

cd back
yarn start
```
5. 마음껏 테스트 해보세요!
