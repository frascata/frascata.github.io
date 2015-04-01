angular.module('app')
    .controller('DemoController', ['$scope', 'RESTfactory',
        function ($scope, RESTfactory) {

            console.log("DemoController");


            //RESTfactory.put({pippo: "aaaa"}).then(function(response){
            //    console.log(response);
            //});

            //RESTfactory.get({id: "DYp4-QVwTA-RQEF8Gm7b9w"}).then(function(response){
            //    console.log(response);
            //});

            //RESTfactory.search({from: 1, size: 10}).then(function(response){
            //    console.log(response);
            //});

            function initTable() {
                RESTfactory.search().then(function (response) {
                    $scope.items = response.data;
                    $scope.total = response.total;
                });
            }

            initTable();


            $scope.searchText = '';

            $scope.executeSearch = function (txt) {
                console.log(txt);
                RESTfactory.search({query: {field: "comune", term: txt}}).then(function (response) {
                    console.log(response);
                    $scope.items = response;
                });
            };

            $scope.editorIsOpen = false;

            $scope.editItem = function (item) {
                if (!$scope.editorIsOpen) {
                    $scope.editorIsOpen = !$scope.editorIsOpen;
                }
                if (angular.isDefined($scope.newItem) && $scope.newItem._id == item._id) {
                    $scope.closeEditor();
                }
                $scope.newItem = angular.copy(item);
                $scope.master = angular.copy(item);
            };

            $scope.closeEditor = function () {
                $scope.editorIsOpen = false;
            };


            function showMessage(result) {
                if (result) {
                    toast('Modifica effettuata', 4000)
                } else {
                    toast('Ops qualcosa è andato storto', 4000)
                }
            }

            $scope.resetItem = function () {
                $scope.newItem = angular.copy($scope.master);
            };

            $scope.saveItem = function (form) {
                if (form.$valid) {

                    if (_.has($scope.newItem, '_id')) {
                        // edit existing object
                        RESTfactory.update({id: $scope.newItem._id}, $scope.newItem._source).then(function (response) {
                            return response;
                        }).then(function (response) {
                            showMessage(response);
                            $scope.editorIsOpen = false;
                            initTable();
                        });
                    } else {
                        // new object
                        RESTfactory.put($scope.newItem._source).then(function (response) {
                            return response;
                        }).then(function (response) {
                            showMessage(response);
                            $scope.editorIsOpen = false;
                            initTable();
                        });
                    }


                }
            };

        }]);
