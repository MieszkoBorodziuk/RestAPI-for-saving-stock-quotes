#!/bin/bash

url=$1
company=$2
I=0

for run in {1..100}; do
	DATE="2020-10-01T12:01:0${I}Z"
	echo $DATE
	curl -X POST "$url/company/$company/stock-quotes" -H "Content-Type: application/json" \
	-d '{
	    "price": 1,
	    "symbol": "'"$company"'",
	    "date": "'"$DATE"'"
	}'
	I=$(((I+1)%10))
done

