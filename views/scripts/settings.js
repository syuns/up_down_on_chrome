var settings = {
    get sortKey() {
	return localStorage["sortKey"] || "url";
    },
    set sortKey(value) {
	localStorage["sortKey"] = value;
    },
    get orderBy() {
	return localStorage["orderBy"] || "ascending";
    },
    set orderBy(value) {
	localStorage["orderBy"] = value;
    },
    get isAscending() {
	return (localStorage["isAscending"] || "") === "true";
    },
    set isAscending(value) {
	localStorage["isAscending"] = value;
    },
    get currentTabId() {
	return parseInt(localStorage["currentTabId"]);
    },
    set currentTabId(value) {
	localStorage["currentTabId"] = value;
    }
};

function saveOptions() {
    var select = document.getElementById("sortKey");
    settings.sortKey = select.children[select.selectedIndex].value;
    settings.isAscending = document.getElementById("isAscending").checked;
}

function load(value, id) {
    var options = document.getElementById(id);
    for (var i = 0; i < options.length; i++) {
	if (options.children[i].value == value) {
	    options.children[i].selected = "true";
	    break;
	}
    }
}

function loadOptions() {
    load(settings.sortKey, "sortKey");
    document.getElementById("isAscending").checked = settings.isAscending;
}
