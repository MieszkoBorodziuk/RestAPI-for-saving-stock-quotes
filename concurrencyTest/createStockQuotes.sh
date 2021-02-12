#!/bin/bash

url=$1
company=$2

for run in {1..10}; do
	curl -X POST "$url/company/$company/stock-quotes" -H "Content-Type: application/json" \
	-d '{
	    "openPrice": 1,
	    "closePrice": 5,
	    "highPrice": 6,
	    "lowPrice": 1,
	    "date": "2020-10-01T12:00:00Z"
	}'
done
