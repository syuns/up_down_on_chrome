function update(targetUrl) {
    chrome.tabs.update(tabid, { url: targetUrl, selected: true }, null);
}

chrome.tabs.get(settings.currentTabId, function (tab) {
    chrome.history.search({ text: "" }, function (results) {
	var sortKey = settings.sortKey;
	results.sort(function(a, b) {
	    if (settings.isAscending)
		return a[sortKey] > b[sortKey] ? 1 : -1;
	    else
		return a[sortKey] > b[sortKey] ? -1 : 1;
	});

	var ul = document.createElement("ur");
	var count = 0;
	for (var i = 0, n = results.length; i < n; i++) {
	    if (results[i].title == "" ||
		results[i].url.indexOf(tab.url) == -1 ||
		results[i].url == tab.url)
		continue;

	    var li = document.createElement("li");
	    var a = document.createElement("a");
	    a.href = "#";
	    a.setAttribute("onclick", "update(\'" + results[i].url + "\')");
	    a.setAttribute("oncontextmenu", "chrome.tabs.create( { url: \"" + results[i].url + "\", selected: true }, null)");
	    var urlsub = results[i].url.substring(tab.url.length);
	    if (sortKey == "url") {
		a.innerText =  urlsub + " - [" + results[i].title + "]";
		a.title = results[i].title;
	    } else if (sortKey == "title") {
		a.innerText =  results[i].title + " - [" + urlsub + "]";
		a.title = urlsub;
	    }
	    li.appendChild(a);
	    ul.appendChild(li);

	    count++;
	}

	if (count == 0) {
	    var p = document.createElement("p");
	    p.innerText = "no item";
	    document.body.appendChild(p);
	} else {
	    document.body.appendChild(ul);
	}
    });
});
