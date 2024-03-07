
# Shopping Mall Web Site

## 🌟 프로젝트 소개
프로젝트명: **샴푸샵 (SHAMPOO #)**

이 프로젝트는 React.js와 Node.js를 기반으로 한 쇼핑몰 서비스 사이트입니다. 사용자에게 편리한 서비스를 제공하기 위해 다양한 기능을 포함하고 있으며, 주요 기능은 회원가입, 로그인, 상품 관리, 장바구니, 게시판 등으로 구성되어 있습니다.

### 🚀 주요 기능
1. **회원가입 및 로그인**
   - 사용자는 회원가입을 통해 개인 계정을 생성할 수 있습니다.
   - 로그인 기능을 통해 인증된 사용자는 상품 주문 등의 서비스를 이용할 수 있습니다.

2. **상품 관리**
   - 관리자는 상품을 생성, 조회, 수정, 삭제할 수 있습니다.
   - 상품 정보에는 제품명, 가격, 세부 설명, 이미지 등이 포함됩니다.

3. **장바구니**
   - 사용자는 상품을 장바구니에 담아 구매할 수 있습니다.
   - 장바구니에 담긴 상품의 수량을 조절하거나 삭제할 수 있습니다.

4. **게시판**
   - 사용자는 상품에 대한 리뷰를 작성하거나 질문을 올릴 수 있는 게시판을 이용할 수 있습니다.
   - 다양한 상품 정보와 사용자 간의 의사 소통이 가능합니다.

5. **편리한 UI/UX**
   - 리액트를 활용하여 동적이고 사용자 친화적인 인터페이스를 제공합니다.
   - 반응형 디자인을 통해 다양한 디바이스에서 일관된 사용 경험을 제공합니다.

### 📅 프로젝트 일정
2024년 1월 23일부터 2024년 2월 29일까지 진행됩니다.

### 🛠️ 기술 스택
- React.js
- Node.js
- MongoDB
- Express
- styled-component

### 프로젝트 구조
### 프로젝트 구조

📁 shampoo_shop  
├─ 📁 client  
│  ├─ 📁 src  
│  │  ├─ 📄 App.css  
│  │  ├─ 📄 App.js  
│  │  ├─ 📁 components  
│  │  │  ├─ 📁 AddressSearch  
│  │  │  │  └─ 📄 AddressSearch.js  
│  │  │  ├─ 📁 admin  
│  │  │  │  ├─ 📄 AdminPage.js  
│  │  │  │  ├─ 📄 EventPage.js  
│  │  │  │  ├─ 📄 NoticePage.js  
│  │  │  │  ├─ 📄 OrderPage.js  
│  │  │  │  ├─ 📄 ProductPage.js  
│  │  │  │  └─ 📄 UserListPage.js  
│  │  │  ├─ 📁 cart  
│  │  │  │  └─ 📄 Cart.js  
│  │  │  ├─ 📁 common  
│  │  │  │  ├─ 📄 Footer.js  
│  │  │  │  ├─ 📄 Header.js  
│  │  │  │  ├─ 📄 HeaderDropdown.js  
│  │  │  │  └─ 📄 TopButton.js  
│  │  │  ├─ 📁 event  
│  │  │  │  ├─ 📄 CardComponent.js  
│  │  │  │  └─ 📄 GamePage.js  
│  │  │  ├─ 📁 main  
│  │  │  │  ├─ 📄 BestProduct.js  
│  │  │  │  ├─ 📄 BestReview.js  
│  │  │  │  ├─ 📄 ContactUs.js  
│  │  │  │  ├─ 📄 MainCarousel.js  
│  │  │  │  └─ 📄 MdPick.js  
│  │  │  ├─ 📁 member  
│  │  │  │  ├─ 📄 agreement.js  
│  │  │  │  └─ 📄 privacy.js  
│  │  │  ├─ 📁 order  
│  │  │  │  └─ 📄 Order.js  
│  │  │  ├─ 📁 store  
│  │  │  │  ├─ 📄 CarePage.js  
│  │  │  │  ├─ 📁 detail  
│  │  │  │  │  ├─ 📄 DetailA.js  
│  │  │  │  │  ├─ 📄 DetailB.js  
│  │  │  │  │  ├─ 📄 DetailC.js  
│  │  │  │  │  ├─ 📄 DetailD.js  
│  │  │  │  │  ├─ 📄 DetailE.js  
│  │  │  │  │  ├─ 📄 DetailF.js  
│  │  │  │  │  ├─ 📄 DetailG.js  
│  │  │  │  │  ├─ 📄 DetailH.js  
│  │  │  │  │  └─ 📄 DetailI.js  
│  │  │  │  ├─ 📁 detailchoice  
│  │  │  │  │  ├─ 📄 DetailAChoice.js  
│  │  │  │  │  ├─ 📄 DetailBChoice.js  
│  │  │  │  │  ├─ 📄 DetailCChoice.js  
│  │  │  │  │  ├─ 📄 DetailDChoice.js  
│  │  │  │  │  ├─ 📄 DetailEChoice.js  
│  │  │  │  │  ├─ 📄 DetailFChoice.js  
│  │  │  │  │  ├─ 📄 DetailGChoice.js  
│  │  │  │  │  ├─ 📄 DetailHChoice.js  
│  │  │  │  │  ├─ 📄 DetailIChoice.js  
│  │  │  │  │  └─ 📄 DetailSelect.js  
│  │  │  │  ├─ 📁 detailslider  
│  │  │  │  │  ├─ 📄 DetailASlider.js  
│  │  │  │  │  ├─ 📄 DetailBSlider.js  
│  │  │  │  │  ├─ 📄 DetailCSlider.js  
│  │  │  │  │  ├─ 📄 DetailDSlider.js  
│  │  │  │  │  ├─ 📄 DetailESlider.js  
│  │  │  │  │  ├─ 📄 DetailFSlider.js  
│  │  │  │  │  ├─ 📄 DetailGSlider.js  
│  │  │  │  │  ├─ 📄 DetailHSlider.js  
│  │  │  │  │  └─ 📄 DetailISlider.js  
│  │  │  │  ├─ 📄 EtcPage.js  
│  │  │  │  ├─ 📄 SetPage.js  
│  │  │  │  ├─ 📄 StoreNav.js  
│  │  │  │  └─ 📄 UserReviews.js  
│  │  │  └─ 📁 views  
│  │  │  │  ├─ 📁 info  
│  │  │  │  │  ├─ 📄 CheckPassword.js  
│  │  │  │  │  ├─ 📄 DeleteProfile.js  
│  │  │  │  │  ├─ 📄 Hashtag.js  
│  │  │  │  │  ├─ 📄 MyInfo.js  
│  │  │  │  │  ├─ 📄 OrderDetails.js  
│  │  │  │  │  ├─ 📄 Profile.js  
│  │  │  │  │  ├─ 📄 Review.js  
│  │  │  │  │  └─ 📄 StarRating.js  
│  │  │  │  ├─ 📄 LoginForm.js  
│  │  │  │  ├─ 📄 MainPage.js  
│  │  │  │  ├─ 📁 navlink  
│  │  │  │  │  ├─ 📄 BrandPage.js  
│  │  │  │  │  ├─ 📄 DetailEventPage.js  
│  │  │  │  │  ├─ 📄 DetailNoticePage.js  
│  │  │  │  │  ├─ 📄 EventPage.js  
│  │  │  │  │  ├─ 📄 NoticePage.js  
│  │  │  │  │  └─ 📄 StorePage.js  
│  │  │  │  └─ 📄 SignUpForm.js  
│  │  │  ├─ 📄 index.css  
│  │  │  ├─ 📄 index.js  
│  │  │  ├─ 📄 reportWebVitals.js  
│  │  │  ├─ 📄 setupProxy.js  
│  │  │  └─ 📄 setupTests.js  
├─ 📄 package-lock.json  
├─ 📄 package.json  
└─ 📁 server  
├─ 📄 index.js  
├─ 📁 models  
│ ├─ 📄 Cart.js  
│ ├─ 📄 Event.js  
│ ├─ 📄 Notice.js  
│ ├─ 📄 Order.js  
│ ├─ 📄 product.js  
│ ├─ 📄 Review.js  
│ └─ 📄 user.js  
└─ 📁 routes  
├─ 📄 admin.js  
├─ 📄 auth.js  
├─ 📄 cart.js  
├─ 📄 order.js  
├─ 📄 review.js  
└─ 📄 user.js  


### ScreenShots
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_1.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_2.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_3.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_4.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_5.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_6.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_7.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_8.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_9.png?raw=true" style="max-width: 700px; max-height: 400px;">
<img src="https://github.com/so0733/imgfile/blob/main/shampoo_10.png?raw=true" style="max-width: 700px; max-height: 400px;">
🚀 **샴푸샵으로 편리하고 다양한 쇼핑 경험을 시작해보세요!**

