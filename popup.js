$(document).ready(function() {
  // Run runSearch function after keypress
  $('#searchbox').on({
    'keyup': runSearch
  });
});

// Search tab array
function runSearch() {
  searchString = $('#searchbox').val();
  searchTabs(searchString, chrome.extension.getBackgroundPage().tabs);
}

// Returns fuzzy matched results
function searchTabs(searchString, tabs) {
  var results = fuzzy.filter(searchString, tabs);
  var matches = results.map(function(el) { return el.string; });
  $("#tabs-list").append(matches); 
}