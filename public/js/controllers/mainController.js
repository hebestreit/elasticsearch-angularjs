app.controller('mainController', function ($scope, ejsResource) {
    var ejs = ejsResource('http://localhost:9200');
    var index = 'test';
    var statusRequest = ejs.Request().indices(index).types('status');

    $scope.results = [];
    $scope.search = {
        queryTerm: ''
    };

    $scope.search = function () {
        console.log($scope.search.query);

        $scope.results = [];
        var results = statusRequest
            .query(ejs.MatchQuery('_all', $scope.search.queryTerm))
            .fields(['text', 'user'])
            .doSearch();

        $scope.results.push(results);
    }
});