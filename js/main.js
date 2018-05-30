var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;
var weatherDataIs = "";
var slidebarExpanded = true;
var consoleLogAllFunctionRuns = true;

var prevToggleSidebar = [false,false,false,false,false,false];

//direction settings
var ds = {
  timeMargin: 15,
  googleMapsInput: "timeEdit",
  timeEditUser: "John Smith",
  destinationLoc: "four",
  departureLoc: "five",
  TRAVELMODE: "TRANSIT"
}




var campusLocInfo = {
  "fjerdingen": "ChIJ3UCFx2BuQUYROgQ5yTKAm6E",
  "vulkan": "ChIJRa81lmRuQUYR3l1Nit90vao",
  "kvadraturen": "ChIJ-wIZN4huQUYR5ZhO0YexXl0"
}
function cl(){
  if (consoleLogAllFunctionRuns) {
    console.log("alertAllVariables fired");
  }
}
// TESTING & SQL
function alertAllVariables(){

  console.log('----- ALL VARIABLES: -----');
  // console.log('TimeMargin: ' + ds.timeMargin);
  // console.log('googleMapsInput: ' + ds.googleMapsInput);
  // console.log('timeEditUser: ' + ds.timeEditUser);
  // console.log('destinationLoc: ' + ds.destinationLoc);
  // console.log('departureLoc: ' + ds.departureLoc);
  /*console.log('fastestOn: ' + ds.fastestOn);
  console.log('walkingOn: ' + ds.walkingOn);
  console.log('bicyclingOn: ' + ds.bicyclingOn);
  console.log('drivingOn: ' + ds.drivingOn);
  console.log('transitOn: ' + ds.transitOn);*/
  console.log('TRAVELMODE: ' + ds.TRAVELMODE);
}

// import and export mysql dumps
$(document).ready(function() {
  $('#dump-sql').click(function(){
    $.ajax({
      type: "POST",
      url: wppath + "/mysql-dump.php",
      success: function(data){
          console.log('Return: ' + data);
      }
    });
  });
  $('#import-sql').click(function(){
    $.ajax({
      type: "POST",
      url: wppath + "/mysql-import.php",
      success: function(data){
          console.log('Return: ' + data);
      }
    });
  });
});
// TESTING & SQL END


// CONTROLS
function toggleTab(tabCode) {

  $tabCode = tabCode;

  if ($tabCode.includes("main-")) {
    $tab = $tabCode.substring(5).toLowerCase();
    // console.log("trying to show " + $tab);

    $('.main-tab-content, #from-here-container').hide();
    $('.tablinks-main').removeClass('active');
    $('#main-tab-' + $tab).show();
    expandControls();

  } else if ($tabCode.includes("dir-")) {
    $tab = $tabCode.substring(4);
    // console.log("trying to show " + "#dir-tab-" + $tab);

    $('.dir-tab-content').hide();
    $('#dir-tab-' + $tab).show();

  } else if ($tabCode.includes("not-from-here")) {

    $('.main-tab-content').hide();
    $('#from-here-container').css('display','flex');
  }
}

// TOGGLE CONTROLS COLLAPSE & EXPAND + switch main-tab
$(document).ready(function() {
  $('.tablinks-main').click(function(){

    if ($(this).hasClass('active')) {
      collapseControls();
    } else {

      if ($(this).text().startsWith("Where")) {
        toggleTab('main-directions');
      } else if ($(this).text().startsWith("About")) {
        toggleTab('main-campus');
      } else if ($(this).text().startsWith("Options")) {
        toggleTab('main-alternativer');
      }
      $(this).addClass('active');
    }

  });
  $('[class*="tablinks-dir-"]').click(function(){

    if ($(this).hasClass('highlight')) {
    } else {

      if ($(this).text().startsWith("Next Lecture")) {
        toggleTab('dir-timeEdit');
      } else if ($(this).text().startsWith("To Campus")) {
        toggleTab('dir-campus');
      } else if ($(this).text().startsWith("Custom")) {
        toggleTab('dir-custom');
      }

      $(this).addClass('highlight');
    }

  });
});

//currently set with onclick, probably should bind all of these eventually..
function changeDirectionsSettings(prop, val){
  ds[prop] = val;
  console.log(prop,val);
}

// toggle button highlight
$(document).ready(function() {
  $('.button, .button-third, .button-half').click(function() {
    $(this).siblings().removeClass('highlight');
    $(this).not('.tag').addClass('highlight');
  });
});

// SIDEBAR TOGGLE CONTENT - BUTTONS
$(document).ready(function() {
  $('.sidebar-toggle').click(function(){
    $thisBtnValue = $(this).val();

    if ($thisBtnValue.includes("campus-poi-")) {
      toggleSidebar(false, false, true, $thisBtnValue.substring(11), false );
      $('.campus-content-toggle-container').children().removeClass('active');
      $(this).addClass('active');
      // console.log($(this));

    } else if ($thisBtnValue.includes("campus-dir-")) {
      toggleSidebar(false, true, false, $thisBtnValue.substring(11), false );
      $('.campus-content-toggle-container').children().removeClass('active');
      $(this).addClass('active');

    } else if ($thisBtnValue.includes("campus-") && !$thisBtnValue.includes("campus-dir")) {
      toggleSidebar(false, false, true, $thisBtnValue.substring(7) );
      $('.campus-emphasis-'+$thisBtnValue.substring(7)+' .campus-content-toggle-container').children().removeClass('active');
      $('.campus-emphasis-'+$thisBtnValue.substring(7)+' .campus-content-toggle-container button').first().addClass('active');

      if (weatherDataIs) {
        changeWeatherWhenTimeEditUsed($thisBtnValue.substring(7));
      }
      // console.log($(this) + "clicked");
      if ($('#wrapper').hasClass('collapsed') == true) {
        maxSlidebar();
        console.log("campus expand");
      }

    }

  });
});

async function changeWeatherWhenTimeEditUsed(campusName) {
  var campusPlaceId = getPlaceIdOrCampus(campusName);
  var weather = await placeIdToWeather(campusPlaceId);
  changeWeather(campusName, weather.product.time[0].location.temperature["@attributes"].value, weather.product.time[1].location.symbol["@attributes"].id);
  weatherDataIs = "";
}

function toggleSidebar(backBtn, directionsOn, poiOn, campusSelect, lectureOn) {
  if(backBtn || directionsOn || poiOn || campusSelect || lectureOn){
    prevToggleSidebar = [backBtn, directionsOn, poiOn,campusSelect,lectureOn];
  }
  if ($('#slide-container').css('width') == '0px') {
    fatSidebar();
  }

  //set 'hidden' på alle children til #slide-container
  $('#slide-container').children().addClass('hidden');

  if(backBtn){
    $('#back-btn-container').removeClass('hidden');
    if(currentPoiSrc){
      $('#poi-img').attr("src", currentPoiSrc);
      $('#poi-image-container').removeClass("hidden");
    }
  }

  /*if (backBtn == true) {    //weather box er utgått
    $('#weather-box').removeClass('hidden');
    // console.log("weather on");
  } */
  if (directionsOn == true) {
    $('.direction-emphasis').removeClass('hidden');
    // console.log("dir on");
  }
  if (campusSelect) {
      //if(ikke campus, men ikke false, altså "poi")

    $('.campus-emphasis-' + campusSelect).removeClass('hidden');
    // console.log(campusSelect + " on");
    // $('.tablinks-campus').removeClass('active');
    // $('.campus-content-toggle-container').child(even).addClass('active');
  }
  if (poiOn == true) {
    $('.campus-emphasis-' + campusSelect + '-pois').removeClass('hidden');
    // console.log("poi on");
  }
  if (lectureOn == true) {
    document.querySelector(".campus-emphasis-"+ campusSelect +" .campus-info .campus-info-bottom").classList.remove("hidden");
  } else {
    document.querySelector(".campus-info-bottom").classList.add("hidden");
  }

}

// COLLAPSE CONTROLS
$(document).ready(function() {
  $('.collapse-controls').click(function() {
    collapseControls();
  });
});

function collapseControls() {
  // add border radius to bottom left & right corners
  $('.tab-left').removeClass('tab-left').addClass('tab-left-collapsed');
  $('.tab-mid').removeClass('tab-mid').addClass('tab-mid-collapsed');
  $('.tab-right').removeClass('tab-right').addClass('tab-right-collapsed');

  //set display: none på alle .main-tab-content
  $('.main-tab-content').hide();
  $('.tablinks-main').removeClass('active');
}

function expandControls(collapseSlidebar) {
  // console.log("expandControls fired");
  // remove border radius to bottom left & right corners
  $('.tab-left-collapsed').removeClass('tab-left-collapsed').addClass('tab-left');
  $('.tab-mid-collapsed').removeClass('tab-mid-collapsed').addClass('tab-mid');
  $('.tab-right-collapsed').removeClass('tab-right-collapsed').addClass('tab-right');
  // TODO: collapse slidebar
  if ($('#wrapper').hasClass('collapsed') == false) {
    minSlidebar();
  }

}

// TIME MARGIN - change text when toggling between them
$(document).ready(function() {
  $('#timeMargin15').click(function() {
    $('#timeMargin10').text('10min');
    $('#timeMargin5').text('5min');
    setTimeout(function(){
      $('#timeMargin15').text('15m before lecture');
    },85);
  });
  $('#timeMargin10').click(function() {
    $('#timeMargin5').text('5min');
    $('#timeMargin15').text('15min');
    setTimeout(function(){
      $('#timeMargin10').text('10min before lecture');
    },85);
  });
  $('#timeMargin5').click(function() {
    $('#timeMargin15').text('15min');
    $('#timeMargin10').text('10min');
    setTimeout(function(){
      $('#timeMargin5').text('5min before lecture');
    },85);
  });
});

// DRIVING MODE - shifts background-color and sets boolean values
$(document).ready(function() {
  $('.switch').click(function() {
    changeDirectionsSettings('TRAVELMODE', $(this).val());
      if($(this).val() === 'BICYCLING'){
          showBicycles(true);
      }
      else {
          showBicycles(false);
      }
    $('.switch').css('background-color', '#767676');
    //$('.switch').css('background-color', '#aeaeae');
    $(this).css('background-color', '#3875CF');
    //$(this).css('background-color', '#0088f6');
  });
});
// CONTROLS END

// CAMPUS POI
// POI CLICK -> VOTE + LOCK
$(document).ready(function() {
  $('.not-locked').click(function(){
    if ($(this).hasClass('poi-vote-up')) {
      poiVoteIncrement(1, $(this).attr("value"));

      $(this).removeClass('not-locked').addClass('poi-locked').unbind( "click" );
      $(this).siblings().unbind( "click" ).removeClass('not-locked').addClass('poi-locked-dis');
    } else if ($(this).hasClass('poi-vote-down')) {
      poiVoteIncrement(-1, $(this).attr("value"));

      $(this).removeClass('not-locked').addClass('poi-locked').unbind( "click" );
      $(this).siblings().unbind( "click" ).removeClass('not-locked').addClass('poi-locked-dis');

    }
  });
});

function poiVoteIncrement(thisNumber, thisPlaceId){
  $.ajax({
    type: "POST",
    url: wppath + "/poi-vote.php",
    data: {postValue: thisNumber, postPlaceId: thisPlaceId},
    success: function(data){
      if (isserver) {
        data = JSON.parse(data);
      }
      $('#poi-vote-points-' + data.assocPlaceId).text(data.newValue);
    }
  });
}
// CAMPUS POI END

// WELCOME
// IMG HIGHLIGHT toggle
$(document).ready(function() {
  $('#welcome-container > .img-container > img').click(function() {
    $(this).siblings().removeClass('img-highlight');
    $(this).addClass('img-highlight');
  });
});
// WELCOME END


// WEATHER
// takes placeID -> gives weather details
async function placeIdToWeather(placeIDin, time) {
  var placeID = placeIDin;

  var latLng = placeIdToLatLon(placeID);
  if(time){
    var weatherData = await latLngToWeatherTime(latLng.lat, latLng.lng, time);
    return weatherData;

  }else{
    var weatherData = await latLngToWeather(latLng.lat, latLng.lng);
    return weatherData;
  }

}

function placeIdToLatLon(placeIDin) {
  var placeID = placeIDin;

  if (placeID == 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E') {
    var fjerdingenLatLon = {
                "lat": 59.9161644,
                "lng": 10.7596752
            };
    return fjerdingenLatLon;
  } else if (placeID == 'ChIJRa81lmRuQUYR3l1Nit90vao') {
    var vulkanLatLon = {
                "lat": 59.92333909999999,
                "lng": 10.7524968
            };
    return vulkanLatLon;
  } else if (placeID == 'ChIJ-wIZN4huQUYR5ZhO0YexXl0') {
    var kvadraturenLatLon = {
                "lat": 59.9111522,
                "lng": 10.7450746
            };
    return kvadraturenLatLon;
  }

  // console.log(placeID + " - placeIdToLatLon");
  // $.ajax({
  //   type: "GET",
  //   dataType: "json",
  //   url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4",
  //   success: function(data){
  //       console.log(data);
  //   }
  // });
}

async function latLngToWeather(lat, lng) {
  var yrURL = "https://api.met.no/weatherapi/locationforecast/1.9/?lat="+lat+"&lon="+lng;
  var localJSON = wppath + "/json/yrVulkan.json";

  try {
    const dataset = await $.ajax({
          type: "POST",
          data: {postURL: yrURL, postWordpressPath: wppath},
          dataType: "JSON",
          url: wppath + "/php/yr.php",
          success: function(data) {
            // console.log(data);
          }
      });
      return dataset;
  } catch (e) {
    console.log(e);
  }
}

async function latLngToWeatherTime(lat, lng, time) {
  var yrURL = "https://api.met.no/weatherapi/locationforecast/1.9/?lat="+lat+"&lon="+lng;
  var localJSON = wppath + "/json/yrVulkan.json";

  try {
    const dataset = await $.ajax({
          type: "POST",
          data: {postURL: yrURL, postWordpressPath: wppath, time: time },
          dataType: "JSON",
          url: wppath + "/php/yr.php",
          success: function(data) {
            // console.log(data);
          }
      });
      return dataset;
  } catch (e) {
    console.log(e);
  }
}

function enableWeather(placeID, temperature, icon) {
  var campusName = "";
  console.log(placeID);
  if (placeID == 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E') {
    campusName = 'Fjerdingen';
  } else if (placeID == 'ChIJRa81lmRuQUYR3l1Nit90vao') {
    campusName = 'Vulkan';
  } else if (placeID == 'ChIJ-wIZN4huQUYR5ZhO0YexXl0') {
    campusName = 'Kvadraturen';
  }
  console.log(campusName);

  $('#weather-box').removeClass('hidden');
  $('.weather-temperature').text(temperature);
  $('.weather-title').text(campusName);
  $('.weather-icon img').attr('src', wppath + '/img/' + icon + '.svg');
}

function onPageLoadFunctions(timeEditUsed) {

  if (timeEditUsed) {
    changeOverviewLecture();
  }
  // autoChangeWeather();

}

async function autoChangeWeather() {
  for (var key in campusLocInfo) {
    var weather = await placeIdToWeather(campusLocInfo[key]);
    // console.log(weather);
    changeWeather(key, weather.product.time[0].location.temperature["@attributes"].value, weather.product.time[1].location.symbol["@attributes"].id);
  }
}

function changeWeather(place, temp, icon) {
    document.querySelector(".campus-emphasis-"+ place +" .campus-info .weather-temperature h3").innerHTML = temp.slice(0, -2) + "°";
    document.querySelector(".campus-emphasis-"+ place +" .campus-info .weather-icon img").src = wppath + "/img/"+ icon +".svg";
}
// WEATHER END

// SHOW LOGGED IN
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showNotification(text, initialDelay, duration, color) {
  // console.log("showNotification fired");
  var element = document.getElementById("notification-container");

  if (text) {
    document.getElementById("prompt-text").innerHTML = text;
  }

  if (color !== undefined) {
    document.getElementById("notification-container").style.backgroundColor = color;
  } else {
    document.getElementById("notification-container").style.backgroundColor = "#44CF6C";
  }
  var width = element.offsetWidth;
  var elements = document.getElementsByClassName("page-container");
  var requiredElement = elements[0];
  var lefty = requiredElement.offsetWidth / 2;
  var left = element.offsetWidth / 2;
  var leftString = "calc("+ lefty  +"px - " + left + "px)";
  element.style.left = leftString;


  await sleep(initialDelay);
  animate(element, 'top', '0px');
  await sleep(duration);
  animate(element, 'top', - element.offsetHeight);
}

function animate(element, what, endValue) {
  $(element).css(what, endValue);
}
// SHOW LOGGED IN END


function getPlaceIdOrCampus(t){
  for (var key in campusLocInfo) {
  	if(campusLocInfo[key] === t){
  	   return key;
  	}
    if(key === t){
      return campusLocInfo[key];
    }
  }
  return false;
}

// LECTURE
function changeLectureInCampus(campus, name, type, room, startDate, startTime, endTime) {
  // remove lecture code
  var lectureName = name.slice(0, name.indexOf("("));
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .in-campus-lecture-container .in-campus-lecture-name").innerHTML = lectureName + (type == "Forelesning" ? "" : "Øving" );
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .in-campus-lecture-container .in-campus-lecture-room").innerHTML = room;
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .in-campus-lecture-container .in-campus-lecture-time").innerHTML = startTime + " - " + endTime;
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .in-campus-lecture-container .in-campus-lecture-date").innerHTML = startDate.slice(0,5);
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom").classList.remove("hidden");
}
// LECTURE END

// help/ info button
$(document).ready(function() {
  $('.help-toggle').click(function() {
    toggleSidebar(false, false, false, false, false);
    $('.help-text').toggleClass('hidden');
    $('.button-container').children().toggleClass('button-help-margin');
    $('.button-container').children().not('.not-help-btn-margin-toggle').toggleClass('button-help-margin');
    $('#help-box').toggleClass('hidden');
  });
});

// back to campus
$(document).ready(function() {
  $('#back-btn-container').click(function() {
    var campusName = $(this).attr('value').substring(7);
    // console.log(campusName);
    toggleSidebar(false, false, true, campusName, false);
    $('#back-btn-container').addClass('hidden');
    removeDirections();
    clickPoiMarker(campusName.charAt(0).toUpperCase()  + campusName.substr(1));
    $('.campus-emphasis-'+campusName+' .campus-content-toggle-container').children().removeClass('active');
    $('.campus-emphasis-'+campusName+' .campus-content-toggle-container button').first().addClass('active');
  });
});

// poi dir
$(document).ready(function() {
  $('.poi-direction-container button').click(function() {
    $('#back-btn-container').removeClass('hidden');

    var campusClassName = $(this).closest(".emphasis-poi-container").attr('class');
    var campusClassArray = campusClassName.split(' ');
    var className = campusClassArray[1];
    className = className.slice(16,-5);
    $('#back-btn-container').attr('value', "campus-" + className);

    var elem = $(this).parent().siblings('.poi-content').find('.poi-title').html();
    currentPoiName = elem;
  });
});




// // DRAG SLIDE-CONTAINER
// function dragElement(elmnt, isMobile) {
//   //fjern
//   // var xd = document.getElementById("XD");
//   //if(!isMobile) return;
//
//   var animstyle = document.getElementById("animstyle");
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   var top = 0, bot = 0;
//   var dragCount;
//   var xpos;
//   ratio = window.devicePixelRatio || 1;
//   var fw = screen.width * ratio;
//   var fh = screen.height * ratio;
//   if(isMobile){
//     if (document.getElementById(elmnt.id + "header")) {
//       document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
//     } else {
//       elmnt.ontouchstart = dragMouseDown;
//     }
//   }else{
//     if (document.getElementById(elmnt.id + "header")) {
//       document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//     } else {
//       elmnt.onmousedown = dragMouseDown;
//     }
//   }
//
//
//   function dragMouseDown(e) {
//
//     w = window.innerWidth;
//     h = window.innerHeight;
//     elmnt.classList.remove("slide-container-anim");
//     dragCount = 0;
//     e = e || window.event;
//     if(isMobile){
//       pos3 = e.touches[0].clientX;
//       pos4 = e.touches[0].clientY;
//       document.ontouchend = closeDragElement;
//
//       document.ontouchmove = elementDrag;
//     }else{
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//
//       document.onmousemove = elementDrag;
//     }
//     if (slidebarExpanded == false) {
//       //console.log("heihei" + slidebarExpanded);
//       expandOrCollapseDiv();
//     }
//
//   }
//
//   function elementDrag(e) {
//     dragCount ++;
//     e = e || window.event;
//     if(isMobile){
//       pos1 = pos3 - e.touches[0].clientX;
//       pos2 = pos4 - e.touches[0].clientY;
//       pos3 = e.touches[0].clientX;
//       pos4 = e.touches[0].clientY;
//     }else{
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//     }
//     console.log(dragCount);
//     top = h * 0.3;
//     bot = h * 0.9;
//     xpos = elmnt.offsetTop - pos2 ;
//
//     //tegne linjer for testing purposes
//     // if(!slidebarExpanded){
//     //     //dra ca 30% opp fra bunnen -> slidebarExpanded = false
//     //     XD.style.top = h * 0.7 + "px";//(bot-top)/2 + fh-h + "px"; // "400px";
//     // }else{
//     //   //dra til ca 50% av skjermen -> slidebarExpanded = true
//     //     XD.style.top = h * 0.4 + "px"; //(bot-top)/2 + fh-h + "px"; //"800px";
//     // }
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//   }
//
//   function closeDragElement() {
//     elmnt.classList.add("slide-container-anim");
//     let time = 500;
//     if(dragCount > 2){
//       if(!slidebarExpanded){
//         if(xpos < h * 0.7){
//           slidebarExpanded = true;
//           time = xpos + h*0.2;
//         }
//       }else{
//         if(xpos > h * 0.3){
//           time = h-xpos;
//           slidebarExpanded = false;
//         }
//       }
//       animstyle.innerHTML = ".slide-container-anim{   transition: top " + time/1000 + "s 0s ease-in-out; }";
//
//     }else{
//       animstyle.innerHTML = ".slide-container-anim{   transition: top " + .5+ "s 0s ease-in-out; }";
//       slidebarExpanded = !slidebarExpanded;
//     }
//     console.log(time/1000);
//
//
//
//     expandOrCollapseDiv();
//
//     if(isMobile){
//       document.ontouchend = null;
//       document.ontouchmove = null;
//     }else{
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//
//   }
// }
//
// async function expandOrCollapseDiv(){
//
//   // if(backBtn || directionsOn || poiOn || campusSelect || lectureOn){
//   //   prevToggleSidebar = [backBtn, directionsOn, poiOn,campusSelect,lectureOn];
//   // }
//
//   if(!isMobile) return; // skal være med
//
//   var elmnt = document.getElementById('slide-container');
//   slidebarExpanded = isCollapsed;
//   console.log(prevToggleSidebar[4]);
//
//   if (slidebarExpanded || prerenderOn){
//       //    -> expand
//
//       console.log("+ expanding");
//
//       let html = "<svg class='open-close-slidebar' style='margin: auto; height: 22px; ' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' enable-background='new 0 0 24 24'>" +
//                  "<path fill='#000000' stroke-miterlimit='10'  d='M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z'/>"+
//                  "</svg>";
//
//
//       // $('#slide-containerheader-bottom').html("");
//
//       if (!prerenderOn) {
//         elmnt.style.top =  "50px";
//         $('#slide-containerheader-top').html(html);
//         $('.campus-info').removeClass('hidden');
//
//         toggleSidebar(prevToggleSidebar[0], prevToggleSidebar[1],prevToggleSidebar[2],prevToggleSidebar[3],prevToggleSidebar[4]); // ikke spesielt elegang, men slik html/css er satt opp nå ser jeg ingen annen løøsning
//
//         //document.querySelector(".fakecampus").classList.add("hidden");
//          //$('#slide-containerheader-bottom').html("");
//
//         // console.log("LALALSLALALLALA");
//       }else{
//         toggleSidebar(prevToggleSidebar[0], prevToggleSidebar[1],prevToggleSidebar[2],prevToggleSidebar[3],prevToggleSidebar[4]); // ikke spesielt elegang, men slik html/css er satt opp nå ser jeg ingen annen løøsning
//         // document.querySelector(".fakecampus").classList.add("hidden");
//         //$('.campus-info').not('.fakecampus').addClass('hidden');
//       }
//
//       //toggleSidebar(prevToggleSidebar[0], prevToggleSidebar[1],prevToggleSidebar[2],prevToggleSidebar[3],prevToggleSidebar[4]); // ikke spesielt elegang, men slik html/css er satt opp nå ser jeg ingen annen løøsning
//
//       collapseControls();
//
//       // slidebarExpanded = !slidebarExpanded;
//       console.log("+ now: " + slidebarExpanded);
//   } else if(slidebarExpanded == false){
//     // -> collapse
//       console.log("- collapsing");
//
//
//       elmnt.style.top =  "83%";
//       let htmlTop = "";
//       let htmlBottom = "";
//       // if directions
//       if(prevToggleSidebar[1]){
//         htmlTop += `<div class="route-icons flexRowNo" style="padding-bottom:0px; margin: auto;">${$('.active-route .route-icons').html()} </div>`;
//       }
//       // add collapse/ expand button
//       htmlTop += "<svg class='open-close-slidebar' style='height: 22px; transform:rotate(180deg);"+( !prevToggleSidebar[1] ? 'margin: auto;' : '' )+"' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' enable-background='new 0 0 24 24'>" +
//                  "<path fill='#000000' stroke-miterlimit='10'  d='M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z'/>"+
//                  "</svg>";
//       // if poi
//       if(prevToggleSidebar[2]){
//         //$('#slide-containerheader').html(`<div class="route-icons flexRowNo">${$('.active-route .route-icons').html()} </div>`); //$('#routes .route-icons').html()
//         //hvis ikke DIR, kanskje greit å bare ha campus + bilde. Hvordan funker dette når man ikke skal til et campus?
//       }
//       // if campus
//       if(prevToggleSidebar[3]){
//         var stuff = $('.campus-emphasis-' + prevToggleSidebar[3] + ' .campus-info').html();
//         //console.log(stuff);
//         htmlBottom +=  `<div class="campus-info flexColNo fakecampus" style="overflow: hidden; height: 200px; padding: 10px; width: calc(100% - 20px); ${$('.campus-emphasis-' + prevToggleSidebar[3] + ' .campus-info').attr('style')};background:blue;">${stuff} </div>`;
//
//       }
//
//       $('#slide-containerheader-top').html(htmlTop);
//       await sleep(500);
//       $('#slide-containerheader-bottom').html(htmlBottom);
//
//       toggleSidebar(false,false,false,false,false);
//
//
//       // slidebarExpanded = !slidebarExpanded;
//       console.log("- now: " + slidebarExpanded);
//   }
// }

// DRAG SLIDE-CONTAINER END

function fatSidebar() {
  $('#slide-container').css('width', '25%');
  $('#slide-container').css('min-width', '375px');
  console.log("#slide-container is now fat");
}

async function getTimeEditAsync() {

  try {
    const dataset = await $.ajax({
          type: "GET",
          dataType: "JSON",
          url: wppath + "/Timeedit.php",
          success: function(data) {
            // console.log(data);
          }
      });
      return dataset;
  } catch (e) {
    console.log(e);
  }
}

function removeWords(string, wordObj) {

}

async function changeOverviewLecture() {

  var timeEditData = await getTimeEditAsync();
  // console.log(timeEditData);

  var weekDay = ddmmyyyToWeekday(timeEditData["0"]);
  // var currentDate = timeEditData[key].startdate;
  var html = "";
  var prevDate = "";
  var currentDate = "";


  for (var key in timeEditData) {
    // console.log(timeEditData[key]);

    // removes days off
    if (timeEditData[key].loc != null) {
      currentDate = timeEditData[key].startdate;

      if (key == 0) {
        html += "<h2 class='overview-lecture-day'>Next lecture is on " + weekDay + "</h2>";
      } else if (prevDate != currentDate) {
        // console.log("not same");
        var newWeekDay = ddmmyyyToWeekday(timeEditData[key])
        html += "<h2 class='overview-lecture-day'>" + newWeekDay + ":</h2>";
      }

      var roomList = "";
      var roomArray = timeEditData[key].room.split(/[ ,]+/);
      for (var name in roomArray){
        if(roomArray[name] == 'Auditorium'){
          roomList += roomArray[name] + " ";
        } else if (roomArray[name] != 'Undervisningsrom' && roomArray[name] != 'Grupperom') {
          roomList += roomArray[name] + ( name ==  roomArray.length -1 ? "" : ", " );
        }
      }

      var lectureName = timeEditData[key].name.slice(0, timeEditData[key].name.indexOf("("));
      // background-image: linear-gradient(60deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4)), url('<?php echo get_theme_file_uri($campusImgPath); ?>');
      html += `<div class="overview-lecture-container" style="background-image: linear-gradient(60deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)),
                                                                                url(`+ wppath +`/img/`+ ( timeEditData[key].loc == "V" ? "vulkan"
                                                                                                        : timeEditData[key].loc == "F" ? "fjerdingen"
                                                                                                        : timeEditData[key].loc == "K" ? "kvadraturen" : "not-found" ) +`.jpg);">`;
      html +=   `<h1 class='overview-lecture-name'>` + lectureName + (timeEditData[key].type == "Forelesning" ? "" : "- Øving" ) + `</h1>`;
      html +=   `<h2 class='overview-lecture-room'>` + roomList + `</h2>`;
      html +=   `<p class='overview-lecture-time'>` + timeEditData[key].starttime + ` - `+ timeEditData[key].endtime +`</p>`;
      html +=   `<p class='overview-lecture-date'>` + timeEditData[key].startdate.slice(0,5) + `</h>`;
      html += `</div>`;
      prevDate = currentDate;
    }
  }
  document.getElementById("overview-day").innerHTML = html;
}

function ddmmyyyToWeekdayLocal(dateIn) {
  var date = dateIn.startdate.split(".");
  var arrivalTime = new Date(date[2], date[1] - 1, date[0]);
  var weekDay = arrivalTime.toLocaleDateString('nb-NO', { weekday: 'long'});
  // var weekDay = weekDay.charAt(0).toUpperCase()  + weekDay.substr(1);
  return weekDay;
}
function ddmmyyyToWeekday(dateIn) {
  var date = dateIn.startdate.split(".");
  var arrivalTime = new Date(date[2], date[1] - 1, date[0]);
  var weekDay = arrivalTime.toLocaleDateString('en-US', { weekday: 'long'});
  // var weekDay = weekDay.charAt(0).toUpperCase()  + weekDay.substr(1);
  return weekDay;
}

function initialLogin() {
  // var loginText = document.getElementById('nameInput').value;
  showNotification('Successfully logged in', 1000, 3000);
}

// ATTEMPT 2
function toggleDiv() {
  var element = document.getElementById('wrapper');
  var dragElement = document.getElementById('drag');
  console.log(element);
  if (element.style.top == '80%') {
    animate(element, 'top', '60%');
    animate(dragElement, 'top', 'calc(60% - 40px)');
    animate(element, 'height', '450px');
  } else {
    animate(element, 'top', '80%');
    animate(dragElement, 'top', 'calc(80% - 40px)');
    animate(element, 'height', '150px');
  }

}
function toggleDiv2() {
  $('#wrapper').toggleClass('expanded');
  $('#drag').toggleClass('expanded-drag');

}
function expandOrCollapseDiv() {
  if ($('#wrapper').hasClass('collapsed')) {
    maxSlidebar();
  } else {
    minSlidebar();
  }
}

// bottom
var screenWidth = screen.width;
var button = document.getElementById('the-button');

var isMobile = ( screenWidth < 700 ? true : false );
console.log(isMobile);

var wrapperHeight = $( '#wrapper' ).css('height');
var screenHeight = screen.height;
console.log(screenHeight);
var startCollapse = true;

function dragInit() {
  // Register a touchmove listeners for the 'source' element
  var src = document.getElementById("drag");

  src.addEventListener('touchmove', function(e) {
    // Iterate through the touch points that have moved and log each
    // of the pageX/Y coordinates. The unit of each coordinate is CSS pixels.

    var i;
    for (i=0; i < e.changedTouches.length; i++) {
      // console.log("touchpoint[" + i + "].pageX = " + e.changedTouches[i].pageX);
      console.log(e.changedTouches[i].pageY); // "touchpoint[" + i + "].pageY = " +
      $( '#drag' ).css( {
          'top'       : (e.changedTouches[i].pageY) + 'px',
      } );
      $( '#wrapper' ).css( {
          'top'       : (e.changedTouches[i].pageY + 40) + 'px',
          'height'      : (screen.height - e.changedTouches[i].pageY) + 'px'
      } );
    }
  }, false);

  src.addEventListener('touchstart', function(e) {
    console.log("start");
    $('#drag').css('background-color', '#767676');
    // $('#drag-text').html('dragging');
  }, false);

  src.addEventListener('touchend', async function(e) {
    console.log("end");
    console.log($('#drag').css("top"));
    // console.log("startCollapse: " + startCollapse);
    $('#drag').css('background-color', '#f3f3f3');

    if (startCollapse == true && $('#drag').offset().top < 390) {
      console.log("going down!");
      maxSlidebar();
    } else if (startCollapse == false && $('#drag').offset().top > 180) {
      console.log("going up!");
      minSlidebar();
    } else if (startCollapse == true) {
      console.log("going down again");
      minSlidebar();
    } else {
      console.log("going up again");
      maxSlidebar();
    }
  }, false);
}


var expandedHeight = screenHeight - 265;
async function maxSlidebar() {
  collapseControls();
  $('#drag, #wrapper').addClass('transition');
  $('#drag').css("top", "50px");
  $('#wrapper').css("top", "90px");
  $('#wrapper').css("height", expandedHeight + "px");
  // $('#drag-text').html('transitioning');
  $('#drag, #wrapper').removeClass('collapsed');
  await sleep(500);
  $('#drag, #wrapper').removeClass('transition');
  startCollapse = false;

  var htmlTop = `<p id="drag-text">expanded</p>`;
  // changeDragTopContent(htmlTop);
}

async function minSlidebar() {
  $('#drag, #wrapper').addClass('transition');
  $('#drag').css("top", "450px");
  $('#wrapper').css("top", "490px");
  // $('#drag-text').html('transitioning');
  $('#wrapper').css("height", "250px");
  $('#drag, #wrapper').addClass('collapsed');
  await sleep(500);
  $('#drag, #wrapper').removeClass('transition');
  startCollapse = true;

  var htmlTop = `<p id="drag-text">collapsed</p>`;
  // changeDragTopContent(htmlTop);
}
function changeDragTopContent(html) {
  var element = document.getElementById('drag-top-flex-box');
  element.innerHTML = html;
}
function changeDragBottomContent(html) {
  var element = document.getElementById('drag-bottom-flex-box');
  element.innerHTML = html;
}

// console log everything you click on
$(document).ready(function() {
  $(document).on("click", "*", function(){
    // console.log($(this));
  });
});
