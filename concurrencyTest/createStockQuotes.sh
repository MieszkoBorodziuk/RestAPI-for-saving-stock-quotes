#!/bin/bash

url=$1
company=$2

for run in {1..100}; do
	curl -X POST "$url/company/stock-quotes" -H "Content-Type: application/json" \
	-d '{
	    "price": 1,
	    "symbol": "'"$company"'",
	    "date": "2020-10-01T12:01:01Z"
	}'
done


