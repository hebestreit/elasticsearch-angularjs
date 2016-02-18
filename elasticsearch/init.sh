#!/bin/bash

host=localhost
port=9200
index=bank
url=${host}:${port}/${index}
function initIndex {
    curl -s -XPUT ${url} -d '
    {
        "settings" : {
            "analysis" : {
                "analyzer" : {
                    "my_ngram_analyzer" : {
                        "filter": "lowercase",
                        "tokenizer" : "my_ngram_tokenizer"
                    }
                },
                "tokenizer" : {
                    "my_ngram_tokenizer" : {
                        "type" : "edgeNGram",
                        "min_gram" : "2",
                        "max_gram" : "5",
                        "token_chars": [ "letter", "digit" ]
                    }
                }
            }
        },
        "mappings": {
            "account": {
                "properties": {
                    "firstname": {
                        "type": "string",
                        "fields": {
                            "exact": {"type": "string", "analyzer": "simple"},
                            "ngram": {"type": "string", "analyzer": "my_ngram_analyzer"}
                        }
                    },
                    "lastname": {
                        "type": "string",
                        "fields": {
                            "exact": {"type": "string", "analyzer": "simple"},
                            "ngram": {"type": "string", "analyzer": "my_ngram_analyzer"}
                        }
                    },
                    "city": {
                        "type": "string",
                        "fields": {
                            "exact": {"type": "string", "analyzer": "simple"},
                            "ngram": {"type": "string", "analyzer": "my_ngram_analyzer"}
                        }
                    }
                }
            }
        }
    }' >> elasticsearch.log
}

function initData {
    curl -s -XPOST "${url}/account/_bulk?pretty" --data-binary "@accounts.json"
}

function dropIndex {
    curl -s -XDELETE ${url} >> elasticsearch.log
}

dropIndex
initIndex
initData