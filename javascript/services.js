app.service('weatherAPI',['$http','$q', function($http,$q) {

    return {
            //get weather 5 day/3 hour forecast from openweatherapi with 100ms timeout
            //resolves to a $q promise
            getWeatherForecast : function(lat,long,units){
                return $q(function(resolve,reject){
                    setTimeout(function(){
                        $http.get('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&APPID=8db70fe1e75c0332d8bf87c9adcf0820&units='+units)
                        .success(function (response) {
                            resolve(response);
                        }).error(function(response){
                            alert("# Error get weather forecast");
                        });
                    }, 100);
                });
            }
        }

}]);

app.service('weatherService',['$http','$q','weatherAPI', function($http,$q,weatherAPI) {

    return {
        getWeather : function(lat,long,units){
            return $q(function(resolve,reject){
                    setTimeout(function(){
                        var forecast = {weather:[]};
                        var promiseWeatherForecast = weatherAPI.getWeatherForecast(lat,long,units);

                        promiseWeatherForecast.then(function(weatherForecast) {
                            forecast.name=weatherForecast.city.name;

                            var forecastCount=1;

                            forecast.weather[0]={date : getDayString(new Date(weatherForecast.list[0].dt*1000)), datetime : weatherForecast.list[0].dt, cod: weatherForecast.list[0].weather[0].icon, temp: Math.round(weatherForecast.list[0].main.temp), sky: weatherForecast.list[0].weather[0].main, description: weatherForecast.list[0].weather[0].description, temp_min: weatherForecast.list[0].main.temp_min, temp_max:weatherForecast.list[0].main.temp_max, pressure: Math.round(weatherForecast.list[0].main.pressure), humidity:weatherForecast.list[0].main.humidity, wind:weatherForecast.list[0].wind.speed, dforecast: [] };

                            for (var i = 0; i < weatherForecast.list.length; i++) {
                                if (new Date(weatherForecast.list[i].dt*1000).getHours() > 13 && new Date(weatherForecast.list[i].dt*1000).getHours() < 17 && new Date(weatherForecast.list[i].dt*1000).getDate() != new Date().getDate()) {
                                    forecast.weather[forecastCount]={date : getDayString(new Date(weatherForecast.list[i].dt*1000)), datetime : weatherForecast.list[i].dt, cod: weatherForecast.list[i].weather[0].icon, temp: Math.round(weatherForecast.list[i].main.temp), sky: weatherForecast.list[i].weather[0].main, description: weatherForecast.list[i].weather[0].description, temp_min: weatherForecast.list[i].main.temp_min, temp_max:weatherForecast.list[i].main.temp_max, pressure: Math.round(weatherForecast.list[i].main.pressure), humidity:weatherForecast.list[i].main.humidity, wind:weatherForecast.list[5].wind.speed, dforecast: [] };
                                    forecastCount++;
                                }
                                    if (forecastCount==5) {
                                break;
                                }
                            }

                            for (var i = 0; i < forecast.weather.length; i++) {
                                for (var j = 0; j < weatherForecast.list.length; j++) {
                                    if (new Date(weatherForecast.list[j].dt*1000).getDate() == new Date(forecast.weather[i].datetime*1000).getDate()) {
                                        forecast.weather[i].dforecast.push(weatherForecast.list[j]);
                                    }
                                }
                            }
                            resolve(forecast);
                        });
                    }, 100);
                });
            }
        }

}]);
