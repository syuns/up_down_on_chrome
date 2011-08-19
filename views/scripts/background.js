function getSlashLastIndexOf(url) {
    var index;

    if (url[url.length - 1] == "/") {
	    index = url.lastIndexOf("/", url.length - 2);
    } else {
	    index = url.lastIndexOf("/");
    }
    if (url[index - 1] == "/") {
	    index = -1;
    }

    return index;
}

function changeIcon(tabid) {
    chrome.tabs.get(tabid, function(tab) {
	    if (getSlashLastIndexOf(tab.url) == -1) {
	        chrome.browserAction.setPopup({ popup: "/views/popup.html" });
	        chrome.browserAction.setIcon({ path: "/images/down32.png" });
	    } else {
	        chrome.browserAction.setPopup({ popup: "" });
	        chrome.browserAction.setIcon({ path: "/images/up32.png" });
	    }
    });
}

function setParam(tabid) {
    settings.currentTabId = tabid;
    changeIcon(tabid);
}

chrome.tabs.onSelectionChanged.addListener(function (tabid, selectinfo) {
    setParam(tabid);
});

chrome.tabs.onUpdated.addListener(function (tabid, selectinfo, tab) {
    setParam(tabid);
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
    if (windowId == -1)
        return;

    chrome.tabs.getSelected(windowId, function (tab) {
        setParam(tabid);
    });
});

chrome.browserAction.onClicked.addListener(function (tab) {
    var index = getSlashLastIndexOf(tab.url);
    if (index != -1) {
	    var parentUrl = tab.url.substring(0, index + 1);
	    console.log("parentUrl: " + parentUrl);
	    chrome.tabs.update(tab.id, { url: parentUrl }, null);
    }
});
