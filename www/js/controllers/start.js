    app.controller("Social", function($scope, $cordovaOauth, $http, $state, $timeout, $stateParams, $ionicPopup) {


        window.cordovaOauth = $cordovaOauth;
        window.http = $http;



        $scope.fblogin = function() {
            console.log("clicked");
            facebookLogin(window.cordovaOauth, window.http);




        }

        function facebookLogin($cordovaOauth, $http) {

            $cordovaOauth.facebook("YOUR APP ID", ["email", "public_profile"], {
                redirect_uri: "URL FOR CALLBACK"
            }).then(function(result) {

                displayData($http, result.access_token);


            }, function(error) {
                console.log("error");

            });
        }

        function displayData($http, access_token) {

            $http.get("https://graph.facebook.com/v2.2/me", {
                params: {
                    access_token: access_token,
                    fields: "name,gender,email,picture",
                    format: "json"
                }
            }).then(function(result) {
                var response = {
                    name: result.data.name,
                    pic: result.data.picture,
                    mail: result.data.email
                };
                localStorage.user = JSON.stringify(response);
                $state.go('app.profile');
            }, function(error) {
                console.log("error");

            });
        }

        $scope.profile = function() {
            var info = localStorage.user;
            $scope.user = JSON.parse(info);


        }

    });