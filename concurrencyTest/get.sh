#!/bin/bash

url=$1
company=$2

curl "$url/company/$company/stock-quotes"
