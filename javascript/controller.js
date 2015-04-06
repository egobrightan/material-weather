app.controller('homeController', ['$scope','$rootScope','$q','$http','weatherService',
function($scope,$rootScope,$q,$http,weatherService) {

    $scope.selectedIndex = -1;
    $scope.forecast = [];
    $scope.units = 'Metric';
    $scope.page = {name: 'Home', lat: 0, long: 0};

    run();

    $scope.update = function(){
        $scope.selectedIndex = -1;
        run();
    }

    $scope.detailedCard = function($index,forecast){
        if ($index == $scope.selectedIndex) {
            $scope.selectedIndex = -1;
        } else {
            $scope.selectedIndex = $index;
        }

        //console.log(forecast)
    }

    function run(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                $scope.$apply(function(){
                    $scope.page.lat = position.coords.latitude;
                    $scope.page.long = position.coords.longitude;

                    var promiseForecast = weatherService.getWeather($scope.page.lat,$scope.page.long,$scope.units);
                    promiseForecast.then(function(weather){
                        angular.copy(weather,$scope.forecast);
                        angular.element( document.querySelector( '#loader' ) ).addClass('fadeOut');
                        //console.log($scope.forecast);
                    })
                });
            });
        } else {
            alert("Coordenates access denied!");
        }
    }

}]);

/*********************************************************************************************
*
*      Global Functions
*
*********************************************************************************************/



//function that recives a date and returnes a corresponding week day MON, TUE, WED, etc.
function getDayString(datemili){
    var date = datemili.getDay();
    switch (date) {
        case 0:
            return('SUN');
            break;
        case 1:
            return('MON');
            break;
        case 2:
            return('TUE');
            break;
        case 3:
            return('WED');
            break;
        case 4:
            return('THU');
            break;
        case 5:
            return('FRI');
            break;
        case 6:
            return('SAT');
            break;
        default:
            return('');
            break;
    }
}
