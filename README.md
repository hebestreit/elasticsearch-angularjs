## Install

Run following command to install all dependencies with bower.

    bower install

## Sample data

You can download sample data from official Elasticsearch page.
https://www.elastic.co/guide/en/elasticsearch/reference/current/_exploring_your_data.html

    curl -XPOST 'localhost:9200/bank/account/_bulk?pretty' --data-binary "@accounts.json"
    curl 'localhost:9200/_cat/indices?v'
    
## How to use

Open public/index.html in your favorite browser and start searching!