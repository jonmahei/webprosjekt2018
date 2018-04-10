var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;
timeMargin = 10;
googleMapsInput = "timeEdit";
timeEditUser = "Tord Jon";
destinationLoc = "four";
departureLoc = "five";

function toggleTab(evt, tabName, tabArea) {
  var i, tabcontent, tablinks;
  if (tabArea == 'main-tab') {
    // gets all main-tab-content
    tabcontent = document.getElementsByClassName("main-tab-content");
    // hides all main-tab-content
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // gets all tab links
    tablinks = document.getElementsByClassName("tablinks");
    // removes active from all tablinks
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  } else if (tabArea == 'dir-tab') {
    // gets all main-tab-content
    tabcontent = document.getElementsByClassName("dir-tab-content");
    // hides all main-tab-content
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  }




  // displays the corrolating tab-content to what you clicked on
  document.getElementById(tabName).style.display = "block";
  // adds active class to the tablink
  evt.currentTarget.className += " active";
}

function alertAllVariables(){
  console.log('----- ALL VARIABLES: -----');
  console.log('TimeMargin: ' + timeMargin);
  console.log('googleMapsInput: ' + googleMapsInput);
  console.log('timeEditUser: ' + timeEditUser);
  console.log('destinationLoc: ' + destinationLoc);
  console.log('departureLoc: ' + departureLoc);

}

$(document).ready(function() {
    $('.button, .button-third, .button-half').click(function() {
        $(this).siblings().removeClass('highlight');
        $(this).toggleClass('highlight');
    });
});
