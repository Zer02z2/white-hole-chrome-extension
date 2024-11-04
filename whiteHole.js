const queryTargets = ["div", "span", "img", "input"]
const elementsNodes = document.body.querySelectorAll("*")
const elements = Array.from(elementsNodes)

const cloneList = elements.map((element) => {
  const rect = element.getBoundingClientRect()
  const x = rect.left + window.scrollX
  const y = rect.top + window.scrollY
  const width = rect.width
  const height = rect.height

  const clone = element.cloneNode(true)
  Array.from(clone.children).forEach((child) => {
    clone.removeChild(child)
  })
  clone.style.position = "absolute"
  clone.style.left = `${x}px`
  clone.style.top = `${y}px`
  clone.height = `${height}px`
  clone.width = `${width}px`
  return clone
})

document.body.style.position = "relative"
while (document.body.firstChild) {
  document.body.removeChild(document.body.firstChild)
}
cloneList.forEach((element) => {
  document.body.appendChild(element)
})
// const elementData = selectedElements.map((element) => {
//   const rect = element.getBoundingClientRect()
//   const x = rect.left + window.scrollX
//   const y = rect.top + window.scrollY
//   console.log(y)
//   const width = rect.width
//   const height = rect.height
//   return { x: x, y: y, width: width, height: height }
// })
// selectedElements.forEach((element, index) => {
//   //   const rect = element.getBoundingClientRect()
//   //   const x = rect.left + window.scrollX
//   //   const y = rect.top + window.scrollY
//   const data = elementData[index]
//   element.style.position = "fixed"
//   element.style.left = `${data.x}px`
//   element.style.top = `${data.y}px`
//   element.height = `${data.height}px`
//   element.width = `${data.width}px`
// })

const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const lerp = (from, to, percentage) => {
  const dist = to - from
  const move = dist * percentage
  return from + move
}

const animate = () => {
  selectedElements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const moveX = lerp(x, centerX, 0.1)
    const moveY = lerp(y, centerY, 0.1)
    element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`
  })
}
//animate()
