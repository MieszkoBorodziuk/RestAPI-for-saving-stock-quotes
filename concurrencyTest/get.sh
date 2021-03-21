#!/bin/bash

url=$1
company=$2

curl "$url/company/stock-quotes/$company"