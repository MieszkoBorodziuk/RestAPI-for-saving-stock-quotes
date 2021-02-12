#!/bin/bash

url=$1
name=$2
symbol=$3

curl -X POST "$url/company" -H "Content-Type: application/json" \
	-d '{"name": "'"$2"'","symbol": "'"$3"'"}'
