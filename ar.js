var bottomBarTimeoutId = -1;
var menuColor = "rgba(252, 201, 5, 0.6)";
var infoColor = "rgba(43, 39, 39, 0.6)";

var panoramaObject;
var panoramaOverlay;

function startTour(){
	if(typeof(Storage)!=="undefined"){
		localStorage.name = 'Butler Street YMCA';
		localStorage.latitude = 33.748995;
		localStorage.longitude = -84.387982;
	}
	else{
	  alert("Oops! this browser doesn't support HTML5 Web-storage!");
	}
	window.location.assign('ar-tour.html');
}

function openMenuScreen(locationName) {
    closeMenuScreen();
    closeMarkerScreen();
    var titleWidth = locationName.length * 11;
    popupBox(
        locationName, "48px", "15%", 
        titleWidth + "px", ((320 - titleWidth) / 2) + "px"
    );
    menuBox("Take me there!", "48px", "40%", function() {
		startTour();
    });
    menuBox("Virtual Tour", "48px", "50%", function() {
        closeMenuScreen();
        openPanorama(locationName);
    });
    menuBox("Cancel", "48px", "60%", function() {
        closeMenuScreen();
        openMarkerScreen();
    });
}

function menuBox(label, height, topOffset, onclickEvent) {
    popupBox(label, height, topOffset, "192px", "64px", onclickEvent);
}

function popupBox(label, height, topOffset, width, leftOffset, onclickEvent) {
    var popupDiv = document.createElement("div");
    var textDiv = document.createElement("div");
    popupDiv.className = "menuScreen";
    
    textDiv.style.fontFamily = "sans-serif";
    textDiv.style.fontSize = "22px";
    textDiv.style.lineHeight = "44px";
    textDiv.innerText = label;
    textDiv.style.border = "2px solid white";
    
    popupDiv.style.height = height;
    popupDiv.style.left = leftOffset;
    popupDiv.style.overflow = "scroll";
    popupDiv.style.position = "absolute";
    popupDiv.style.top = topOffset;
    popupDiv.style.width = width;
    
    if (onclickEvent) {
        popupDiv.style.backgroundColor = menuColor;
        popupDiv.style.color = "black";
        popupDiv.addEventListener("click", onclickEvent);
    } else {
        popupDiv.style.backgroundColor = infoColor;
        popupDiv.style.color = "white";
    }
    
    popupDiv.appendChild(textDiv);
    document.body.appendChild(popupDiv);
}

function bottomBar(label) {
    var gradientDiv = document.createElement("div");
    var wrapperDiv = document.createElement("div");
    var bufferDiv = document.createElement("div");
    var handleDiv = document.createElement("div");
    var textDiv = document.createElement("div");
    var barSize = 64, handleSize = 14, gradientSize = 16;
    
    gradientDiv.className = "markerScreen";
    gradientDiv.style.backgroundImage = "url(\"bar.png\")";
    gradientDiv.style.height = gradientSize + "px";
    gradientDiv.style.left = "0";
    gradientDiv.style.position = "absolute";
    gradientDiv.style.top = (480 - gradientSize) + "px";
    gradientDiv.style.width = "320px";
    
    wrapperDiv.className = "markerScreen";
    wrapperDiv.id = "bottomBar";
    wrapperDiv.style.height = barSize + "px";
    wrapperDiv.style.left = "0";
    wrapperDiv.style.overflow = "scroll";
    wrapperDiv.style.position = "absolute";
    wrapperDiv.style.top = (480 - barSize) + "px";
    wrapperDiv.style.width = "320px";
    wrapperDiv.addEventListener("scroll", setBottomBarCloseTimer);
    
    bufferDiv.style.height = barSize + "px";
    bufferDiv.style.left = "0";
    bufferDiv.style.position = "absolute";
    bufferDiv.style.top = "0";
    bufferDiv.style.width = "320px";
    wrapperDiv.appendChild(bufferDiv);
    
    handleDiv.style.backgroundColor = "gray";
    handleDiv.style.height = handleSize + "px";
    handleDiv.style.left = "0";
    handleDiv.style.opacity = "0.6";
    handleDiv.style.position = "absolute";
    handleDiv.style.top = barSize + "px";
    handleDiv.style.width = "320px";
    wrapperDiv.appendChild(handleDiv);
    
    textDiv.style.backgroundColor = menuColor;
    textDiv.style.color = "black";
    textDiv.style.fontFamily = "sans-serif";
    textDiv.style.fontSize = "20px";
    textDiv.style.height = (barSize - handleSize) + "px";
    textDiv.style.left = "0";
    textDiv.style.lineHeight = (barSize - handleSize) + "px";
    textDiv.style.position = "absolute";
    textDiv.style.top = (barSize + handleSize) + "px";
    textDiv.style.width = "320px";
    textDiv.innerText = "More locations on Auburn Ave...";
    textDiv.addEventListener("click", function() {
        closeMarkerScreen();
        openLocationList();
    });
    wrapperDiv.appendChild(textDiv);
    
    document.body.appendChild(gradientDiv);
    document.body.appendChild(wrapperDiv);
}
function hideBottomBar() {
    $("#bottomBar").animate({ scrollTop: 0 }, 500);
}
function setBottomBarCloseTimer() {
    window.clearTimeout(bottomBarTimeoutId);
    bottomBarTimeoutId = window.setTimeout(hideBottomBar, 1500);
}

function openMarkerScreen() {
    var markerPopups = document.getElementsByClassName("markerScreen");
    for (var i = 0; i < markerPopups.length; i++) {
        markerPopups.item(i).style.display = "block";
    }
    setBottomBarCloseTimer();
}

function closeMarkerScreen() {
    var markerPopups = document.getElementsByClassName("markerScreen");
    for (var i = 0; i < markerPopups.length; i++) {
        markerPopups.item(i).style.display = "none";
    }
}

function closeMenuScreen() {
    var menuElements = document.getElementsByClassName("menuScreen");
    var menuElementListLength = menuElements.length;
    for (var i = 0; i < menuElementListLength; i++) {
        document.body.removeChild(menuElements.item(0));
    }
}

function openLocationList() {
    var listDiv = document.createElement("div");
    listDiv.className = "menuScreen";
    
    listDiv.style.border = "1px solid white";
    listDiv.style.height = "65%";
    listDiv.style.left = "24px";
    listDiv.style.overflow = "scroll";
    listDiv.style.position = "absolute";
    listDiv.style.top = "10%";
    listDiv.style.width = "272px";
    
    var myPlaces = ["Atlanta Daily World", "Atlanta Life Insurance", 
        "Big Bethal A.M.E. Church", "Butler Street YMCA", "Herndon Building", 
        "Odd Fellows Building", "Prince Hall Masonic Temple", "Tabor Building", 
        "Wheat Street Baptist Church"];
    for (var i = 0; i < myPlaces.length; i++) {
        var buttonDiv = document.createElement("div");
        buttonDiv.id = "listItem" + i;
        buttonDiv.style.backgroundColor = menuColor;
        buttonDiv.style.border = "1px solid white";
        buttonDiv.style.color = "black";
        buttonDiv.style.fontFamily = "sans-serif";
        buttonDiv.style.fontSize = "19px";
        buttonDiv.style.height = "48px";
        buttonDiv.style.lineHeight = "48px";
        buttonDiv.style.paddingLeft = "8px";
        buttonDiv.style.textAlign = "left";
        buttonDiv.style.top = (48 * i) + "px";
        buttonDiv.innerText = myPlaces[i];
        
        listDiv.appendChild(buttonDiv);
    }
    
    document.body.appendChild(listDiv);
    for (var i = 0; i < myPlaces.length; i++) {
        var curItem = $("#listItem" + i);
        curItem.on("click", { locationName: curItem.prop("innerText") }, 
            function(event) {
                openMenuScreen(event.data.locationName);
            }
        );
    }
    
    menuBox("Cancel", "48px", "80%", function() {
        closeMenuScreen();
        openMarkerScreen();
    });
}

function openPanorama(locationName) {
    var urls = ["http://dm.gatech.edu/~jig3/ar/church.0001.png",
            "http://dm.gatech.edu/~jig3/ar/church.0003.png",
            "http://dm.gatech.edu/~jig3/ar/church.0004.png",
            "http://dm.gatech.edu/~jig3/ar/church.0005.png",
            "http://dm.gatech.edu/~jig3/ar/church.0000.png",
            "http://dm.gatech.edu/~jig3/ar/church.0002.png"];
    
    panoramaObject = new AR.GeoSpotPanorama( urls );
    
    var titleWidth = locationName.length * 11;
    popupBox(
        locationName, "48px", "48px", 
        titleWidth, ((320 - titleWidth) / 2) + "px"
    );
    
    menuBox("Close panorama", "48px", "384px", function() {
        ARGON.World.remove(panoramaOverlay);
        panoramaObject.hide();
        closeMenuScreen();
        openMarkerScreen();
    });
    
    var panoramaText;
    switch (locationName) {
        case "Butler Street YMCA":
            panoramaText = "This building became a center of social life " + 
                "on the Avenue by providing recreation and supervised " + 
                "activity space for younger blacks and a meeting place for " + 
                "older blacks.";
            break;
        case "Wheat Street Baptist Church":
            panoramaText = "Wheat Street Baptist Church has been an " + 
                "important spiritual/social institution in the Sweet " + 
                "Auburn Ave. community since its inception in 1869. Today " + 
                "it continues functioning as a community church";
            break;
        default:
            panoramaText = "No information for this location... yet.";
            break;
    }
    
    var popupDiv = document.createElement("div");
    var textDiv = document.createElement("div");
    
    var POPUP_WIDTH = 96;
    var POPUP_HEIGHT = 96;
    
    textDiv.style.border = "1px solid white";
    textDiv.style.fontFamily = "sans-serif";
    textDiv.style.fontSize = "8px";
    textDiv.style.lineHeight = "8px";
    textDiv.style.padding = "2px";
    textDiv.style.textAlign = "left";
    textDiv.innerText = panoramaText;
    
    popupDiv.id = "cssContent";
    popupDiv.style.backgroundColor = infoColor;
    //popupDiv.style.height = POPUP_HEIGHT + "px";
    popupDiv.style.overflow = "scroll";
    popupDiv.style.position = "absolute";
    popupDiv.style.width = POPUP_WIDTH + "px";
    popupDiv.style.WebkitTransform = "scale3d(-1, 1, 1)";
    
    popupDiv.appendChild(textDiv);
    
    // create CSS Object in the scene graph
    panoramaOverlay = new THREE.CSSObject(popupDiv);
    
    // the width and height is used to align things
    panoramaOverlay.width = POPUP_WIDTH;
    panoramaOverlay.height = POPUP_HEIGHT;
    panoramaOverlay.position.x = 0.0;
    panoramaOverlay.position.y = 0.0;
    panoramaOverlay.position.z = 200.0;
    panoramaOverlay.rotation.y = Math.PI;
    
    // attach directly to world. the orientation of the faces must be changed
    ARGON.World.add(panoramaOverlay);
}
