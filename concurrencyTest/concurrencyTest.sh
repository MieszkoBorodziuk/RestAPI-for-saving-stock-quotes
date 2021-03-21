#!/bin/bash

url=$1

(./createStockQuotes.sh $url ADA2 & ./createStockQuotes.sh $url KTK2 & ./createStockQuotes.sh $url ADA2 & ./createStockQuotes.sh $url KTK2) &&
sleep 5
(printf "\n\n" && ./get.sh $url ADA2 && echo ' schould has 1 element') && 
(printf "\n\n" && ./get.sh $url KTK2 && echo ' schould has 1 element')
