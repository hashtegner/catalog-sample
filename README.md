# chaotic-catalog

A simple product catalog with chaotic features


## usage

- list products as JSON: /products.json
- list products as XML: /products.xml
- list {{n}} products: /products.json?limit=100
- list products with partial filled infos: /products.json?fill=0.5
- chaotic mode (60% of requests will fail):  /products.json?chaotic=true
