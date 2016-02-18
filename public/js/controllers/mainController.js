app.controller('mainController', function ($scope, elasticClient) {
    $scope.results = [];
    $scope.autoCompleteResults = [];
    $scope.search = {
        queryTerm: ''
    };

    $scope.autoComplete = function () {
        elasticClient.search({
            index: 'bank',
            size: 10,
            body: {
                'query': {
                    'multi_match': {
                        'query': $scope.search.queryTerm,
                        'type': 'phrase',
                        'fields': [
                            'firstname^4',
                            'firstname.ngram^4',
                            'lastname',
                            'lastname.ngram',
                            'city',
                            'city.ngram'
                        ],
                        'operator': 'and'
                    }
                }
            }
        }).then(function (response) {
            $scope.autoCompleteResults = response.hits.hits;
        });
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
                        'fuzziness': 'AUTO',
                        'prefix_length': 2,
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