angular.module('app')
    .controller('DemoController', ['$scope', 'RESTfactory',
        function ($scope, RESTfactory) {

            $scope.from= 0;
            $scope.size= 10;
            $scope.searchText = '';
            $scope.searchField = "comune";

            function initTable(json) {
                RESTfactory.search(json).then(function (response) {
                    $scope.items = response.data;
                    $scope.total = response.total;
                });
            }

            initTable();

            $scope.changePage= function(from){
                $scope.from= from<0 ? 0 : from;
                $scope.executeSearch();
            };

            $scope.executeSearch = function () {
                var searchJson= {from: $scope.from, size: $scope.size};
                if (angular.isDefined($scope.searchText) && $scope.searchText.trim()!='') {
                    searchJson['query']= {field: $scope.searchField, term: $scope.searchText}
                }
                $scope.closeEditor();
                return initTable(searchJson);
            };

            $scope.editorIsOpen = false;

            $scope.editItem = function (item) {
                if (!$scope.editorIsOpen) {
                    $scope.editorIsOpen = !$scope.editorIsOpen;
                }
                if (angular.isDefined($scope.newItem) && angular.isDefined(item) && $scope.newItem._id == item._id) {
                    $scope.closeEditor();
                }
                /*
                * Get data from database (REST get [DEMO requirement]).
                * This is not necessary because selected item is available in $scope.
                    $scope.newItem = angular.copy(item);
                    $scope.master = angular.copy(item);
                */
                if (angular.isDefined(item)){
                    $scope.editorTitle= "Modifica";
                    RESTfactory.get({id: item._id}).then(function(response){
                        $scope.newItem = angular.copy(response);
                        $scope.master = angular.copy(response);
                    })
                } else {
                    $scope.editorTitle= "Nuovo";
                    $scope.newItem = {_source:{}};
                    $scope.master= angular.copy($scope.newItem);
                }

            };

            $scope.closeEditor = function () {
                $scope.editorIsOpen = false;
                $scope.newItem = undefined;
                $scope.master = undefined;
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
                        /*
                         * Update data (REST update).
                         */
                        RESTfactory.update({id: $scope.newItem._id}, $scope.newItem._source).then(function (response) {
                            return response;
                        }).then(function (response) {
                            showMessage(response);
                            $scope.editorIsOpen = false;
                            initTable();
                        });
                    } else {
                        /*
                         * Add new data (REST put).
                         */
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
