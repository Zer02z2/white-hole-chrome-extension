const hello = async () => {
  const [tab] = await chrome.tabs.query({ active: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: whiteHole,
  })
}
hello()
