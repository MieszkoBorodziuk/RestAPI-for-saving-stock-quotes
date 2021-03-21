#!/bin/bash

url=$1
symbol=$2

curl -X POST "$url/company" -H "Content-Type: application/json" \
	-d '{"symbol": "'"$2"'"}'
