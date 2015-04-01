angular.module("app").factory("RESTfactory", [
    "$resource", '$http', function($resource,$http) {

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
                    data.push(source);
                    console.log(data.length);
                    return true;
                })
            },
            "search": function(params) {
                return data.then(function (data) {
                    var total= data.length;
                    var size = _.has(params,'size') ? params.size : 10;
                    var from = _.has(params,'from') ? params.from : 0;
                    var to= from==0 ? size : from*size+1;
                    var result;
                    if (_.has(params,'query') && _.has(params.query,'field') && _.has(params.query,'term')){
                        var filteredData= _.filter(data,function(d){
                            return angular.isDefined(d._source) && angular.isDefined(d._source[params.query.field]) && d._source[params.query.field].toLowerCase().indexOf(params.query.term.toLowerCase())!=-1;
                        });
                        result= filteredData.slice(from,to);
                    } else {
                        result= data.slice(from,to);
                    }
                    return {total: total, data: result};
                })
            }
        };
    }
]);
