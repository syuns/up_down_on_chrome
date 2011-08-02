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

chrome.tabs.onSelectionChanged.addListener(function(tabid, selectinfo) {
    settings.currentTabId = tabid;
    changeIcon(tabid);
});

chrome.tabs.onUpdated.addListener(function(tabid, selectinfo, tab) {
    settings.currentTabId = tabid;
    changeIcon(tabid);
});

chrome.browserAction.onClicked.addListener(function(tab) {
    var index = getSlashLastIndexOf(tab.url);
    if (index != -1) {
	var parentUrl = tab.url.substring(0, index + 1);
	console.log("parentUrl: " + parentUrl);
	chrome.tabs.update(tab.id, { url: parentUrl }, null);
    }
});
