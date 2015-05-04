// Declare variables to select tabs
var li;
var liSelected;
var liIndex = 0;

$(document).ready(function() {

  // Run runSearch function after keypress
  $('#searchbox').on({
    'keyup': runSearch
  });

  $( ".selected" ).on( "click", function(event) {
      event.preventDefault();
      alert("Hello! I am an alert box!!");
  });

  $("#searchbox").on('keyup', function(e){
      // Down
      if(e.keyCode == 40){
          if(liSelected){
              liSelected.removeClass('selected');
              liIndex += 1;
              next = li.eq(liIndex);

              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.eq(0).addClass('selected');
                  liIndex = 0;
              }
          }else{
              liSelected = li.eq(0).addClass('selected');
          }
        // Up
      }else if(e.keyCode == 38){
          if(liSelected){
              liSelected.removeClass('selected');
              liIndex -= 1;
              next = li.eq(liIndex);
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.last().addClass('selected');
                  liIndex = 0;
              }
          }else{
              liSelected = li.last().addClass('selected');
          }
          // Enter
      } else if(e.keyCode == 13){ 
        event.preventDefault();
        selectedTab = $(".selected").text();
        $("#searchbox").val(selectedTab);
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
  var results = fuzzy.filter(searchString, tabs);
  var matches = results.map(function(e) { return "<li>" + e.string + "</li>"; });
  $("#tabs-list").html(matches); 
  li = $("li");
}

// window.addEventListener("keydown", navigateTabs, false);

// function navigateTabs(e) {
//   switch (e.keycode) {
//     case 38:
//       break;
//     case 40:
//       break;
//   }
// }