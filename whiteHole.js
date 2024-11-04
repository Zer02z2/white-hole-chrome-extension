const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const elementData = (element) => {
  const rect = element.getBoundingClientRect()
  const x = rect.left + rect.width / 2 + window.scrollX
  const y = rect.top + rect.height / 2 + window.scrollY
  const moveX = centerX - x
  const moveY = centerY - y
  const increment = 0.01
  const progress = 0
  return {
    target: element,
    moveX: moveX,
    moveY: moveY,
    increment: increment,
    progress: progress,
  }
}

const findEndChildren = () => {
  console.log("hi")
  const elementsNodes = document.body.querySelectorAll("*")
  const elements = Array.from(elementsNodes)
  let result = []
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i]
    const children = element.querySelectorAll(":scope > *")
    if (Array.from(children).length === 0) {
      result.push(elementData(element))
    }
  }
  return result
}

let endChildren = findEndChildren()
let watchList = []

const animate = () => {
  console.log(endChildren)
  for (let i = endChildren.length - 1; i >= 0; i--) {
    const element = endChildren[i]
    const { target, moveX, moveY, increment, progress } = element
    element.progress = progress + increment
    target.style.transform = `translateX(${moveX * progress}px) translateY(${
      moveY * progress
    }px)`

    if (element.progress >= 1) {
      endChildren.splice(i, 1)
      const parent = target.parentNode
      parent.removeChild(target)
      if (watchList.find((item) => item === parent)) break
      watchList.push(parent)
    }
  }

  for (let i = watchList.length - 1; i >= 0; i--) {
    const element = watchList[i]
    if (element.querySelectorAll(":scope > *").length === 0) {
      watchList.splice(i, 1)
      endChildren.push(elementData(element))
    }
  }
  window.requestAnimationFrame(animate)
}
animate()
