function ShowMap() {

	var map;
	var mapOptions;
	var directionsDisplay = new google.maps.DirectionsRenderer({
		draggable : true
	});
	var directionsService = new google.maps.DirectionsService();

	var pos = new google.maps.LatLng(0, 0);
	var mapOptions = {
		zoom : 3,
		center : pos
	};
	
	$('#mcanvas').children().remove();
	
	var start;
	var end;

	map = new google.maps.Map(document.getElementById('mcanvas'), mapOptions);

	if ($('#loc1').val() != '' && $('#loc2').val() != '') {

		start = $('#loc1').val();
		end = $('#loc2').val();

		$.ajax({
			method : 'GET',
			url : 'http://api.openweathermap.org/data/2.5/weather',
			data : {
				q : start,
				APPID : '0c57119cb69e27182acf99e585eafcfe'
			},
			success : function(code, data) {
				console.log('success');
				$('.mContainer').children().remove();
				pString = '<h1>' + code.name + '</h1>'
				+ 'humidity : ' + code.main.humidity +'<br>'+ 'temperature : '
				+ (parseFloat(code.main.temp) - 273)+' C<br>' + 'max-temperature : '
				+ (parseFloat(code.main.temp_max) - 273)+' C<br>' + 'min-temperature : '
				+ (parseFloat(code.main.temp_min) - 273)+' C';
				
				$('<div>').attr('class','wCont').html(pString).appendTo('.mContainer');
			}
		});

		$.ajax({
			method : 'GET',
			url : 'http://api.openweathermap.org/data/2.5/weather',
			data : {
				q : end,
				APPID : '0c57119cb69e27182acf99e585eafcfe'
			},
			success : function(code, data) {
				console.log('success');
				pString = '<h1>' + code.name + '</h1>'
				+ 'humidity : ' + code.main.humidity+'<br>' + 'temperature : '
				+ (parseFloat(code.main.temp) - 273)+' C<br>' + 'max-temperature : '
				+ (parseFloat(code.main.temp_max) - 273)+' C<br>' + 'min-temperature : '
				+ (parseFloat(code.main.temp_min) - 273)+' C';
				
				$('<div>').attr('class','wCont').html(pString).appendTo('.mContainer');
			}
		});
	} else {
		end = 'kansas'
		start = 'missouri';

		$.ajax({
			method : 'GET',
			url : 'http://api.openweathermap.org/data/2.5/weather',
			data : {
				q : start,
				APPID : '0c57119cb69e27182acf99e585eafcfe'
			},
			success : function(code, data) {
				console.log(code.name);
				$('.mContainer').children().remove();
				pString = '<h1>' + code.name + '</h1>'
				+ 'humidity : ' + code.main.humidity+'<br>' + 'temperature : '
				+ (parseFloat(code.main.temp) - 273)+' C<br>' + 'max-temperature : '
				+ (parseFloat(code.main.temp_max) - 273)+' C<br>' + 'min-temperature : '
				+ (parseFloat(code.main.temp_min) - 273)+' C';
				
				$('<div>').attr('class','wCont').html(pString).appendTo('.mContainer');
			}
		});

		$.ajax({
			method : 'GET',
			url : 'http://api.openweathermap.org/data/2.5/weather',
			data : {
				q : end,
				APPID : '0c57119cb69e27182acf99e585eafcfe'
			},
			success : function(code, data) {
				console.log(code.name);
				pString = '<h1>' + code.name + '</h1>'
						+ 'humidity : ' + code.main.humidity+'<br>' + 'temperature : '
						+ (parseFloat(code.main.temp) - 273)+' C<br>' + 'max-temperature : '
						+ (parseFloat(code.main.temp_max) - 273)+' C<br>' + 'min-temperature : '
						+ (parseFloat(code.main.temp_min) - 273)+' C';
				
				$('<div>').attr('class','wCont').html(pString).appendTo('.mContainer');
			}
		});
	}

	var request = {
		origin : start,
		destination : end,
		travelMode : google.maps.TravelMode.TRANSIT
	};

	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setMap(map);
			directionsDisplay.setDirections(response);
		}

	});

	google.maps.event.addDomListener(window, 'load');

}

$(document).ready(function() {
	ShowMap();
});