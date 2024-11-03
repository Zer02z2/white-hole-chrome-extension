chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: whiteHole,
  })
})

const whiteHole = () => {
  const body = document.querySelector("body")
  console.log(body)
}
