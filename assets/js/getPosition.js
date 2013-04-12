var i=0;
function timedCount(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else{
		//alert("Geolocation is not supported by this browser!");
	}
					
	function showPosition(position){
		//coordinates.latitude = position.coords.latitude;
		//coordinates.longitude = position.coords.longitude;
		postMessage(position.coords.latitude);
	}
	//console.log(coordinates);
	//postMessage(coordinates);
	setTimeout("timedCount()",5000);	
}	

timedCount(); 