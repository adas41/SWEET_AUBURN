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
    popupBox(locationName, "10%", "15%", "lightgray");
    popupBox("Take me there!", "10%", "40%", "yellow", function() {
		startTour();
    });
    popupBox("Virtual Tour", "10%", "50%", "yellow", function() {
        closeMenuScreen();
        openPanorama();
    });
    popupBox("Cancel", "10%", "60%", "yellow", function() {
        closeMenuScreen();
        openMarkerScreen();
    });
}

function popupBox(label, height, topOffset, bgColor, onclickEvent) {
    var popupDiv = document.createElement("div");
    //var textDiv = document.createElement("div");
    popupDiv.className = "menuScreen";
    
    popupDiv.style.color = "black";
    popupDiv.style.fontFamily = "sans-serif";
    popupDiv.style.fontSize = "24px";
    popupDiv.style.lineHeight = "48px";
    //textDiv.style.position = "absolute";
    //textDiv.style.top = "12px";
    //textDiv.style.width = "100%";
    popupDiv.innerText = label;
    
    if (bgColor) {
        popupDiv.style.backgroundColor = bgColor;
    } else {
        popupDiv.style.backgroundColor = "yellow";
    }
    popupDiv.style.border = "1px solid gray";
    popupDiv.style.height = height;
    popupDiv.style.left = "64px";
    popupDiv.style.opacity = "0.6";
    popupDiv.style.position = "absolute";
    popupDiv.style.top = topOffset;
    popupDiv.style.width = "192px";
    
    if (onclickEvent) {
        popupDiv.addEventListener("click", onclickEvent);
    }
    
    //popupDiv.appendChild(textDiv);
    document.body.appendChild(popupDiv);
}

function bottomBar(label) {
    var gradientDiv = document.createElement("div");
    var wrapperDiv = document.createElement("div");
    var bufferDiv = document.createElement("div");
    var handleDiv = document.createElement("div");
    var textDiv = document.createElement("div");
    
    gradientDiv.style.backgroundImage = "url(\"bar.png\")";
    gradientDiv.style.height = "16px";
    gradientDiv.style.left = "0";
    gradientDiv.style.position = "absolute";
    gradientDiv.style.top = "464px";
    gradientDiv.style.width = "320px";
    
    wrapperDiv.className = "markerScreen";
    wrapperDiv.style.height = "68px";
    wrapperDiv.style.left = "0";
    wrapperDiv.style.overflow = "scroll";
    wrapperDiv.style.position = "absolute";
    wrapperDiv.style.top = "428px";
    wrapperDiv.style.width = "320px";
    
    bufferDiv.style.height = "68px";
    bufferDiv.style.left = "0";
    bufferDiv.style.position = "absolute";
    bufferDiv.style.top = "0";
    bufferDiv.style.width = "320px";
    wrapperDiv.appendChild(bufferDiv);
    
    handleDiv.style.backgroundColor = "gray";
    handleDiv.style.height = "16px";
    handleDiv.style.left = "0";
    handleDiv.style.opacity = "0.6";
    handleDiv.style.position = "absolute";
    handleDiv.style.top = "68px";
    handleDiv.style.width = "320px";
    wrapperDiv.appendChild(handleDiv);
    
    textDiv.style.backgroundColor = "yellow";
    textDiv.style.color = "black";
    textDiv.style.fontFamily = "sans-serif";
    textDiv.style.fontSize = "18px";
    textDiv.style.height = "52px";
    textDiv.style.left = "0";
    textDiv.style.opacity = "0.6";
    textDiv.style.position = "absolute";
    textDiv.style.top = "84px";
    textDiv.style.width = "320px";
    textDiv.innerText = "More locations...";
    textDiv.addEventListener("click", function() {
        closeMarkerScreen();
        openLocationList();
    });
    wrapperDiv.appendChild(textDiv);
    
    document.body.appendChild(gradientDiv);
    document.body.appendChild(wrapperDiv);
}
function openBottomBar() {
    var curDiv = document.getElementById("bottomBarText");
    curDiv.style.display = "block";
    curDiv.className = "markerScreen";
    curDiv = document.getElementById("bottomBarHandle");
    curDiv.style.top = "356px";
    curDiv.removeEventListener("click", openBottomBar);
    curDiv.addEventListener("click", closeBottomBar);
}
function closeBottomBar() {
    var curDiv = document.getElementById("bottomBarText");
    curDiv.style.display = "none";
    curDiv.className = "";
    curDiv = document.getElementById("bottomBarHandle");
    curDiv.style.top = "394px";
    curDiv.removeEventListener("click", closeBottomBar);
    curDiv.addEventListener("click", openBottomBar);
}

function openMarkerScreen() {
    var markerPopups = document.getElementsByClassName("markerScreen");
    for (var i = 0; i < markerPopups.length; i++) {
        markerPopups.item(i).style.display = "block";
    }
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
    
    listDiv.style.height = "40%";
    listDiv.style.left = "48px";
    listDiv.style.overflow = "scroll";
    listDiv.style.position = "absolute";
    listDiv.style.top = "15%";
    listDiv.style.width = "224px";
    
    var myPlaces = ["Atlanta Daily World", "Butler Street YMCA", 
        "Herndon Building", "Wheat Street Baptist Church"];
    for (var i = 0; i < myPlaces.length; i++) {
        var buttonDiv = document.createElement("div");
        buttonDiv.style.backgroundColor = "yellow";
        buttonDiv.style.border = "1px solid gray";
        buttonDiv.style.color = "black";
        buttonDiv.style.fontFamily = "sans-serif";
        buttonDiv.style.fontSize = "18px";
        buttonDiv.style.height = "30%";
        buttonDiv.style.opacity = "0.6";
        buttonDiv.style.textAlign = "left";
        buttonDiv.style.top = (30 * i) + "%";
        buttonDiv.innerText = myPlaces[i];
        buttonDiv.addEventListener("click", function() {
            openMenuScreen(myPlaces[i]);
        });
        
        listDiv.appendChild(buttonDiv);
    }
    
    document.body.appendChild(listDiv);
    
    popupBox("Cancel", "10%", "60%", "yellow", function() {
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
    
    popupBox("Close panorama", "10%", "80%", "yellow", function() {
        closeMenuScreen();
        geoSpot.hide();
        openMarkerScreen();
    });
}
