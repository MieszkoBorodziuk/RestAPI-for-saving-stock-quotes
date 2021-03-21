#!/bin/bash

url=$1

(./createStockQuotes.sh $url ADA & ./createStockQuotes.sh $url KTK & ./createStockQuotes.sh $url ADA & ./createStockQuotes.sh $url KTK) &&
sleep 5
(printf "\n\n" && ./get.sh $url ADA && echo ' schould has 1 element') && 
(printf "\n\n" && ./get.sh $url KTK && echo ' schould has 1 element')
