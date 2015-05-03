var tabs = [];

// Push all open tabs into tabs array
function getTabTitles() {
  var tempTabs = [];
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        tempTabs.push(tab.title);
      });
    });
  });
  tabs = tempTabs;
}

// Update tabs array on change
function onTabCreated() { getTabTitles(); }
function onTabUpdated() { getTabTitles(); }
function onTabMoved() { getTabTitles(); }
function onTabAttached() { getTabTitles(); }
function onTabRemoved() { getTabTitles(); }

// Init
function init() {
  tabs = [];

  // Collect currently open windows
  getTabTitles();

  // Attach listeners to the following Chrome tab movements
  chrome.tabs.onCreated.addListener(onTabCreated);
  chrome.tabs.onUpdated.addListener(onTabUpdated);
  chrome.tabs.onMoved.addListener(onTabMoved);
  chrome.tabs.onAttached.addListener(onTabAttached);
  chrome.tabs.onRemoved.addListener(onTabRemoved);
}

// Initialize with init()
init();