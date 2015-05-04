// Declare variables to select tabs
var li;
var liSelected;
var liIndex = 0;

$(document).ready(function() {

  // Run runSearch function after keypress
  $('#searchbox').on({
    'keyup': runSearch,
  });

  // Swap to searched Chrome tab
  $("form").submit(function(event) {
    event.preventDefault();
    tabId = Number($("#tabtitle").val());
    chrome.tabs.update(tabId, {selected: true});
  });

  // Handle tab selection and passes tab id into form hidden field
  $("#searchbox").on('keyup', function(e){
    // Down
    if(e.keyCode == 40){
        if(liSelected){
            liSelected.removeClass('selected');
            liIndex += 1;
            next = li.eq(liIndex);

            if(next.length > 0){
                liSelected = next.addClass('selected');
                selectedTab = $(".selected").text();
                $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
            }else{
                liSelected = li.eq(0).addClass('selected');
                selectedTab = $(".selected").text();
                $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
                liIndex = 0;
            }
        }else{
            liSelected = li.eq(0).addClass('selected');
            selectedTab = $(".selected").text();
            $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
        }
    // Up
    }else if(e.keyCode == 38){
      if(liSelected){
          liSelected.removeClass('selected');
          liIndex -= 1;
          next = li.eq(liIndex);
          if(next.length > 0){
              liSelected = next.addClass('selected');
              selectedTab = $(".selected").text();
              $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
          }else{
              liSelected = li.last().addClass('selected');
              selectedTab = $(".selected").text();
              $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
              liIndex = 0;
          }
      }else{
          liSelected = li.last().addClass('selected');
          selectedTab = $(".selected").text();
          $("#tabtitle").val($.grep(chrome.extension.getBackgroundPage().tabs, function(e){ return e.title === selectedTab; })[0].id);
      }
    } 
  });
});

// Search tab array
function runSearch() {
  searchString = $('#searchbox').val();
  searchTabs(searchString, chrome.extension.getBackgroundPage().tabs);
}

// Returns fuzzy matched results
function searchTabs(searchString, tabs) {
  var options = {
    extract: function(e) { return e.title; }
  };
  var results = fuzzy.filter(searchString, tabs, options);
  var matches = results.map(function(e) { return "<li>" + e.string + "</li>"; });
  $("#tabs-list").html(matches); 
  li = $("li");
}
