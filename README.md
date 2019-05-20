# markup-extractor
markup 정적 결과물을 추출해주는 NPM기반의 framework
  
## Install

```bash
npm i
```

## Run Dev Server

```bash
npm run dev
```

## Extract Markup Files

```bash
npm run build
```

## Description
마크업 추출기는 하드코딩하는 HTML, CSS, JS 및 Assets 파일들을 패키지형태로 관리&추출 해주는 마크업 프레임워크입니다. 
하드코딩하여 마크업 프로젝트를 관리하고 구성하고 있다면 활용해보세요.

(SA/SC/C)SS를 지원하며 postcss기능을 통해 autoprefix, cssnano, css-declaration-sorter등의 기능을 사용할 수 있습니다. 
html-webpack-plugin을 통해 템플릿 html파일을 관리하나 프런트개발에 익숙치 않은 웹퍼블리셔를 위해 템플릿 언어의 사용은 최소화 하도록 구성되어있습니다. 

필요한 추가 패키지 구성하여 입맛에 맞게 변경해 사용하시면 됩니다. 

추출되어 나오는 결과물은 마크업 정적 페이지입니다. 

## 작업 예시
- 전처리 처리를 원하는 (SA/SC/C)SS 파일을 src하위의 scss폴더에 생성합니다. (경로 수정가능)
- 템플릿으로 활용할 html파일을 구성합니다. (추출될 html 파일명과 동일)
- 폴더의 상대주소로 번들처리가 되오니 추출될 폴더 구조에 맞게 src 폴더 하위도 구성하시는걸 권장드립니다.

- 원하는 결과물의 폴더 구조

```bash
├── css
│   ├── sample1.css
│   └── sample2.css
├── images
├── js
├── page1.html
└── page2.html
```

- 설정할 작업 폴더 구조

```bash
├── src
│   ├── scss
│   │   ├── sample1.scss
│   │   └── sample2.scss
│   ├── images
│   ├── page1.html
│   └── page2.html
└── static
    └── js
```

- 테섭구동 및 번들과정에 기본적으로 필요한 한줄의 lodash 템플릿 표현식이(<% %>) 들어가는데 이는 기본 구성 그대로 두시면 됩니다.

```html
<!DOCTYPE  html>
<html  lang="ko">
<head>
<meta  charset="UTF-8">
<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
<meta  http-equiv="X-UA-Compatible"  content="ie=edge">
<title>타이틀</title>
<%= require('~/config/html-template-variable.config.js')(htmlWebpackPlugin).injectTags %>	<!-- 환경에 따라 css link태그를 붙여주는 역할 -->
</head>
<body>
<!-- 본문 마크업 진행 -->
</body>
</html>
```

- 생성한 html 파일에 매칭될 entry를 지정하고 html-webpack-plugin에도 설정을 추가해 줍니다.

```javascript
// webpack.config.js
...
entry: {
	'추출될css파일명1':  path.resolve(assetsBasePath, 'scss','포함시킬(SA/SC/C)SS파일명'.(sa/sc/c)ss),
	'추출될css파일명2':  path.resolve(assetsBasePath, 'scss','포함시킬(SA/SC/C)SS파일명'.(sa/sc/c)ss),
}
...
```

```javascript
// config/html-webpack-plugin.config.js
...
HtmlWebpackPluginList: [
	new  HtmlWebpackPlugin({
		filename:  '(추출될 html) 파일명1.html',	// filename과 template는 동일명으로 해 주세요.
		template:  '(템플릿으로 활용할 html) 파일명1.html',
		chunks: ['포함시킬 css entry명1', '포함시킬 css entry명2'],
		inject:  false
	}),
	new  HtmlWebpackPlugin({
		filename:  '(추출될 html) 파일명2.html',
		template:  '(템플릿으로 활용할 html) 파일명2.html',
		chunks: ['포함시킬css entry명'],
		inject:  false
	})
]
...
```

- 웹팩 테스트서버를 통해 업무를 진행 합니다.

```bash
npm run dev
```

- 작업이 완료되었다면 테섭 종료 후 html, css, js, assets 등의 파일 추출을 위해 build합니다.

```bash
npm run build
```

- **public** 폴더가 생성되는데 해당 하위 파일들이 정적 파일 결과물이며 server 구동없이 화면 동작이 잘 되는지를 확인하고 개발자에게 전달해주시면 됩니다.
- 빌드과정을 실행시키면 기존에 생성되었던 **public** 폴더는 제거되었다가 빌드과정 완료 후 다시 생성되므로 해당 폴더 하위의 내용을 직접 수정하고 저장한 경우는 유의바랍니다.

## 기타 
- 빌드 시 js-dev 폴더도 root에 생깁니다만 무시하셔도 됩니다. 원래 번들된 결과물의 js 코드입니다만 그 중 css 파일만을 추출하기에 사용하지 않습니다. 최종 프런트 결과물이 아니기에 번들된 js는 의미가 없어 포함시키지 않았습니다.
- js 샘플 코드 및 vendor 라이브러리 등은 static 파일에 올려두어 번들 결과 폴더로 복제되어 추가됩니다.
- html 템플릿에서 assets로 활용되는 파일들의 온전한 참조를위해 경로를 템플릿 표현식(lodash)으로 구현해주세요.

```html
<!-- static 폴더에 추가하여 파일 그대로 복제되어 들어갈 소스인 경우 -->
<img src="./images/img_profile.jpg" alt="프로필이미지">
```

```html
<!-- 웹팩 번들 과정을 태울 소스일 경우 -->
<img src="<%= require('./images/img_profile.jpg') %>" alt="프로필이미지">
<img src="${ require('./images/img_profile.jpg') }" alt="프로필이미지">
```
