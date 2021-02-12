# RestAPI-for-saving-stock-quotes

RestAPI to collect and store in a relational, normalized database stock quotes.
## Project installation and running

Install project dependencies: ```$ yarn install```

Run project: ```$ yarn start``` Application runs on ```localhost:3000```

Build project: ```$ yarn start``` Built application can be found in dist folder.

Run unit tests: ```$ yarn jest```

Run concurrency tests: 

1 getStocks.sh - send GET request <host>/company/<id>. Run: ./getStocks.sh <host> <id>.
2 createCompany.sh - send POST request <host>/company with body {"name": "<name>","symbol": "<symbol>"}. Run: ./createCompany.sh <host> <name> <symbol>.
3 createStockQuotes.sh - send 10 times POST request <host>/company/<symbol>/stock-quotes with body 
{
	    "openPrice": 1,
	    "closePrice": 5,
	    "highPrice": 6,
	    "lowPrice": 1,
	    "date": "2020-10-01T12:00:00Z"
}.
 ```Run: ./createStockQuotes.sh <host> <symbol>```.
4 concurrencyTest.sh - run createCompany.sh for Adam(ADA) and Krzysztof(KTK) company, then simultaneously run createStockQuotes.sh 2 times for each company and at the end wait 5sec and run get.sh to check 
if return stock quotes length is 1. 
 ```Run: ./concurrencyTest.sh```.

## Documents
Data model in ```./documents/Diagram.pdf```

Document API With Swagger on ```localhost:3000/API/```




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## License

[MIT licensed](LICENSE).
