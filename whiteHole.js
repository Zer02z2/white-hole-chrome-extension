const queryTargets = ["div", "span", "img", "input"]
const elementsNodes = document.body.querySelectorAll("*")
let elementsArray = Array.from(elementsNodes)

const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const findEndChildren = (elements) => {
  let result = []
  for (let i = elements.length - 1; i > 0; i--) {
    const element = elements[i]
    const children = element.querySelectorAll(":scope > *")
    if (Array.from(children).length === 0) {
      const rect = element.getBoundingClientRect()
      const x = rect.left + rect.width / 2 + window.scrollX
      const y = rect.top + rect.height / 2 + window.scrollY
      const moveX = centerX - x
      const moveY = centerY - y
      const increment = 0.001
      const progress = 0
      result.push({
        target: element,
        moveX: moveX,
        moveY: moveY,
        increment: increment,
        progress: progress,
      })
      elements.splice(i, 1)
    }
  }
  return result
}

let endChildren = findEndChildren(elementsArray)

const animate = () => {
  endChildren.forEach((element) => {
    const { target, moveX, moveY, increment, progress } = element
    element.progress = progress + increment
    target.style.transform = `translateX(${moveX * progress}px) translateY(${
      moveY * progress
    }px)`
  })
  for (let i = endChildren.length - 1; i > 0; i--) {}
  window.requestAnimationFrame(animate)
}
animate()
