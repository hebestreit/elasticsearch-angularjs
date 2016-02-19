var express = require('express');
var app = express();
var port = 8080;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client()

var router = express.Router();

router.get('/search', function (req, res) {
    var queryTerm = req.query.queryTerm;
    console.log(queryTerm);

    client.search({
        index: 'bank',
        type: 'account',
        size: 50,
        body: {
            'query': {
                'multi_match': {
                    'query': queryTerm,
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
    }).then(function(resp) {
        res.json(resp);
    });
});

app.use('/search', router);

app.listen(port, function () {
    console.log('Live at port ' + port);
});
