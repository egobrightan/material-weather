var app = angular.module('materialweather', ['ngMaterial','ngMdIcons']);

app.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink');
});
