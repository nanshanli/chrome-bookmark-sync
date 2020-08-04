const config = {
  APIAddress: 'https://insert_server_location/bookmarks/',
  YellowStarPath: 'src/yellow-star-32.png',
  RedStarPath: 'src/red-star-32.png'
}

// Perform GET request to check if url is found in database. Returns status.
async function checkBookmarks (url) {
  url = url.split('#')[0]
  try {
    const response = await fetch(`${config.APIAddress}/${encodeURIComponent(url)}`)
    const data = await response.json()
    return [data, response.status]
  } catch (error) {
    return error
  }
}

// Perform PUT request to add url to database. Returns status.
async function putBookmarks (url) {
  url = url.split('#')[0]
  try {
    const response = await fetch(`${config.APIAddress}/${encodeURIComponent(url)}`, {
      method: 'PUT'
    })
    return response.status
  } catch (error) {
    return error
  }
}

// Changes display icon for extension based on iconPath specified.
function setStar (tabId, iconPath) {
  chrome.browserAction.setIcon({
    path: {
      32: iconPath
    },
    tabId: tabId
  })
}

// Upon page load, check if url is present in database. If present, change icon accordingly.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.title || changeInfo.status === 'loading') {
    checkBookmarks(tab.url).then((data, stat) => {
      if (data[0].message === 'Not found') {
        console.log('Bookmark not present')
        console.log(data)
      } else {
        console.log('Bookmark present')
        console.log(data)
        setStar(tabId, config.YellowStarPath)
      }
    }).catch(error => {
      console.log(error)
      setStar(tab.id, config.RedStarPath)
    })
  }
})

// Upon click, add url to database and display yellow star.
chrome.browserAction.onClicked.addListener(function (tabs) {
  chrome.tabs.query({
    'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT
  },
  function (tabs) {
    putBookmarks(tabs[0].url).then(data => {
      console.log(data)
      console.log('Bookmark added')
      setStar(tabs[0].id, config.YellowStarPath)
    }).catch(error => {
      console.log(error)
      setStar(tabs[0].id, config.RedStarPath)
    })
  }
  )
})
