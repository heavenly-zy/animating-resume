/* 把 code 写到 #code 和 style 标签中 */
function writeCss(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    // 同时在 pre 标签和 style 标签内加内容
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight // 让代码自动往下滚，目前不是很理解
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 100)
}
function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    console.log(markdown)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 100)
}

var css1 = `/* 
 * 你好呀，我是 ZY
 * 只用文字作做自我介绍太 low 了
 * 我就用代码来介绍吧
 * 首先得准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: rgb(0,43,54);
  font-size: 16px;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 什么，你说太糊了，啥都看不见？那么我就给代码加点颜色好了 */

.token.comment{ color: slategray; }
#code{
  color: rgb(222,222,222); 
}
.token.selector { color: #a6e22e; }
.token.property { color: #f92672; }
.token.function { color: #e6db74; }
.token.punctuation { color: #f8f8f2;}

/* 现在看得清了吧，然后我再加一个3D效果 */

#code{
  animation: slidein 2s linear 1s;
}

/* 现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */



`
var md = `
# 自我介绍

我叫 ZY，
1997 年 11 月出生，
XXX 学校毕业，
自学前端半年，
希望应聘前端开发岗位。

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCss('', css1, () => { // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCss(css1, css2, () => {
        convertMarkdownToHtml(() => {
          writeCss(css1 + css2, css3, () => {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
