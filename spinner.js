const elementsNodes = document.body.querySelectorAll("*")
const elementsArray = Array.from(elementsNodes)
const elements = elementsArray.filter(
  (element) =>
    !element.firstChild ||
    (element.childNodes.length === 1 &&
      element.firstChild.nodeType === Node.TEXT_NODE)
)
console.log(elements)

const style = document.createElement("style")
document.head.appendChild(style)
const stylesheet = style.sheet

stylesheet.insertRule(
  "@keyframes spin {0% {transform: rotate(0);}100%{transform: rotate(360deg);}}"
)

elements.forEach((element) => {
  element.style.animation = "2s linear infinite spin"
})
