app.controller('mainController', function ($scope, elasticClient) {
    $scope.results = [];
    $scope.search = {
        queryTerm: ''
    };

    $scope.search = function () {
        elasticClient.search({
            index: 'bank',
            size: 10,
            body: {
                'query': {
                    'multi_match': {
                        'query': $scope.search.queryTerm,
                        'type': 'cross_fields',
                        'fields': [
                            'firstname',
                            'lastname',
                            'address',
                            'employer',
                            'email',
                            'city'
                        ],
                        'operator': 'and'
                    }
                }
            }
        }).then(function (response) {
            $scope.results = response.hits.hits;
        });
    }
});