var lat;
var lon;
var city = $("#city");
var country = $("#country");
var temperatureC = $("#temperatureC");
var temperatureF = $("#temperatureF");
var icon = $("#icon");
var button = $("button");
var time = $("#time");


$(window).on("load", function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=3cd2eb82458513b2f88fb335f81340f5", function(data) {
				var rawData = JSON.stringify(data);
				var json = JSON.parse(rawData);
				
				city.text(json["name"]);
				country.text(json["sys"]["country"]);
				temperatureC.text((Math.round(10 * (json["main"]["temp"] - 273.15)) / 10) + " ºC");
				temperatureF.text((Math.round(100 * (json["main"]["temp"] - 255.372)) / 100) + " ºF");
				button.on("click", function() {
					$(".toggle").toggleClass("hide");
					$("#temperatureC").toggleClass("hide"); //SUSTITUIR $("TEMPERATUREx") POR $(TEMPERATURE).HTML(TEXTO) USANDO IF/ELSE
					$("#temperatureF").toggleClass("hide");
				});
				var getIcon = "http://openweathermap.org/img/w/" + json["weather"][0]["icon"] + ".png";
				icon.attr("src", getIcon); //SI ICON en [0] === 50n o 50d, usar [1]
			});
		});
	};
});