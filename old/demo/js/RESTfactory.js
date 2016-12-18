angular.module("app").factory("RESTfactory", [
    "$resource", '$http','$filter', function($resource,$http,$filter) {

        var data = $http.get('demo/data.json').then(function(response) {
            return response.data.data;
        });

        return {
            "get": function(params) {
                return data.then(function (data) {
                    return _.find(data, function(d){
                        return d._id==params.id
                    });
                })
            },
            "update": function(params,source) {
                return data.then(function (data) {
                    var obj= _.find(data, function(d){
                        return d._id==params.id
                    });
                    if (angular.isDefined(obj)){
                        obj._source=source;
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            "put": function(source) {
                return data.then(function (data) {
                    data.push({_id: Math.random().toString().substr(2), _source: source});
                    return true;
                })
            },
            "search": function(params) {
                return data.then(function (data) {
                    var size = _.has(params,'size') ? params.size : 10;
                    var from = _.has(params,'from') ? params.from : 0;
                    var to= from==0 ? size : (from+1)*size;
                    var result, total;
                    if (_.has(params,'query') && _.has(params.query,'field') && _.has(params.query,'term')){
                        var filteredData= _.filter(data,function(d){
                            return angular.isDefined(d._source) && angular.isDefined(d._source[params.query.field]) && d._source[params.query.field].toLowerCase().indexOf(params.query.term.toLowerCase())!=-1;
                        });
                        total= filteredData.length;
                        result= $filter('orderBy')(filteredData,'+_source.comune').slice(from*size,to);
                    } else {
                        total= data.length;
                        result= $filter('orderBy')(data,'+_source.comune').slice(from*size,to);
                    }
                    return {total: total, data: result};
                })
            }
        };
    }
]);
