var bottomBarTimeoutId = -1;

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
    popupBox(locationName, "48px", "15%");
    popupBox("Take me there!", "48px", "40%", function() {
		startTour();
    });
    popupBox("Virtual Tour", "48px", "50%", function() {
        closeMenuScreen();
        openPanorama();
    });
    popupBox("Cancel", "48px", "60%", function() {
        closeMenuScreen();
        openMarkerScreen();
    });
}

function popupBox(label, height, topOffset, onclickEvent) {
    var popupDiv = document.createElement("div");
    popupDiv.className = "menuScreen";
    
    popupDiv.style.fontFamily = "sans-serif";
    popupDiv.style.fontSize = "24px";
    popupDiv.style.lineHeight = height;
    popupDiv.innerText = label;
    
    popupDiv.style.border = "2px solid white";
    popupDiv.style.height = height;
    popupDiv.style.overflow = "scroll";
    popupDiv.style.position = "absolute";
    popupDiv.style.top = topOffset;
    
    if (onclickEvent) {
        popupDiv.style.backgroundColor = "rgba(255, 255, 0, 0.6)";
        popupDiv.style.color = "black";
        popupDiv.style.left = "64px";
        popupDiv.style.width = "192px";
        popupDiv.addEventListener("click", onclickEvent);
    } else {
        popupDiv.style.backgroundColor = "rgba(43, 39, 39, 0.6)";
        popupDiv.style.color = "white";
        popupDiv.style.left = "48px";
        popupDiv.style.width = "224px";
    }
    
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
    
    textDiv.style.backgroundColor = "yellow";
    textDiv.style.color = "black";
    textDiv.style.fontFamily = "sans-serif";
    textDiv.style.fontSize = "20px";
    textDiv.style.height = (barSize - handleSize) + "px";
    textDiv.style.left = "0";
    textDiv.style.lineHeight = (barSize - handleSize) + "px";
    textDiv.style.opacity = "0.6";
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
        buttonDiv.style.backgroundColor = "yellow";
        buttonDiv.style.border = "1px solid white";
        buttonDiv.style.color = "black";
        buttonDiv.style.fontFamily = "sans-serif";
        buttonDiv.style.fontSize = "19px";
        buttonDiv.style.height = "48px";
        buttonDiv.style.lineHeight = "48px";
        buttonDiv.style.opacity = "0.6";
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
    
    popupBox("Cancel", "48px", "80%", function() {
        closeMenuScreen();
        openMarkerScreen();
    });
}

function openPanorama() {
    var urls = ["http://dm.gatech.edu/~jig3/ar/church.0001.png",
            "http://dm.gatech.edu/~jig3/ar/church.0003.png",
            "http://dm.gatech.edu/~jig3/ar/church.0004.png",
            "http://dm.gatech.edu/~jig3/ar/church.0005.png",
            "http://dm.gatech.edu/~jig3/ar/church.0000.png",
            "http://dm.gatech.edu/~jig3/ar/church.0002.png"];
    
    geoSpot = new AR.GeoSpotPanorama( urls );
    
    popupBox("Close panorama", "48px", "80%", function() {
        closeMenuScreen();
        geoSpot.hide();
        openMarkerScreen();
    });
}
