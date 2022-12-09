// Load required modules
let apiInterfaces = require('./apiInterfaces.js')(config.daemon, config.wallet);

// Initialize log system
let logSystem = 'market';
require('./exceptionWriter.js')(logSystem);

/**
 * Get market prices
 **/
exports.get = function (exchange, tickers, callback) {
	if (!exchange) {
		callback('No exchange specified', null);
	}
	exchange = exchange.toLowerCase();

	if (!tickers || tickers.length === 0) {
		callback('No tickers specified', null);
	}

	let marketPrices = [];
	let numTickers = tickers.length;
	let completedFetches = 0;

	getExchangeMarkets(exchange, function (error, marketData) {
		if (!marketData || marketData.length === 0) {
			callback({});
			return;
		}

		for (let i in tickers) {
			(function (i) {
				let pairName = tickers[i];
				let pairParts = pairName.split('-');
				let base = pairParts[0] || null;
				let target = pairParts[1] || null;

				if (!marketData[base]) {
					completedFetches++;
					if (completedFetches === numTickers) callback(marketPrices);
				} else {
					let price = marketData[base][target] || null;
					if (!price || price === 0) {
						let cryptonatorBase;
						if (marketData[base]['BTC']) cryptonatorBase = 'BTC';
						else if (marketData[base]['ETH']) cryptonatorBase = 'ETH';
						else if (marketData[base]['LTC']) cryptonatorBase = 'LTC';

						if (!cryptonatorBase) {
							completedFetches++;
							if (completedFetches === numTickers) callback(marketPrices);
						} else {
							getExchangePrice("cryptonator", cryptonatorBase, target, function (error, tickerData) {
								completedFetches++;
								if (tickerData && tickerData.price) {
									marketPrices[i] = {
										ticker: pairName,
										price: tickerData.price * marketData[base][cryptonatorBase],
										source: tickerData.source
									};
								}
								if (completedFetches === numTickers) callback(marketPrices);
							});
						}
					} else {
						completedFetches++;
						marketPrices[i] = {
							ticker: pairName,
							price: price,
							source: exchange
						};
						if (completedFetches === numTickers) callback(marketPrices);
					}
				}
			})(i);
		}
	});
}

/**
 * Get Exchange Market Prices
 **/

let marketRequestsCache = {};

function getExchangeMarkets (exchange, callback) {
	callback = callback || function () {};
	if (!exchange) {
		callback('No exchange specified', null);
	}
	exchange = exchange.toLowerCase();

	// Return cache if available
	let cacheKey = exchange;
	let currentTimestamp = Date.now() / 1000;

	if (marketRequestsCache[cacheKey] && marketRequestsCache[cacheKey].ts > (currentTimestamp - 60)) {
		callback(null, marketRequestsCache[cacheKey].data);
		return;
	}

	let target = null;
	let symbol = null;
	let price = 0.0;
	let data = {};

	} else if (exchange == "coingecko") {
		apiInterfaces.jsonHttpRequest('api.coingecko.com', 443, '', function (error, response) {
  if (error) {
    log('error', logSystem, 'API request to %s has failed: %s', [exchange, error]);
  } else {
    // Filter list of coins to find matching symbol
    let matchingCoin = response.filter(coin => {
      return coin.symbol === config.symbol.toLowerCase() ? coin.name.toLowerCase() : ''
    });

    // Make API call to get ticker data for matching coin
    apiInterfaces.jsonHttpRequest('api.coingecko.com', 443, '', function (error, response) {
      if (error) {
        log('error', logSystem, 'API request to %s has failed: %s', [exchange, error]);
      } else {
        let data = {};
        if (response.tickers) {
          for (let model in response.tickers) {
            let target = response.tickers[model].target;
            let symbol = response.tickers[model].base;
            let price = +response.tickers[model].last;

            if (price === 0) continue;

            if (!data[symbol]) data[symbol] = {};
            data[symbol][target] = price;
          }
        }

        // Add data to cache and call callback function
        marketRequestsCache[cacheKey] = {
          ts: currentTimestamp,
          data: data
        };
        callback(null, data);
      }
    }, `/api/v3/coins/${matchingCoin[0].id}/tickers`);
  }
}, `/api/v3/coins/list`);
	}
	// Unknown
	else {
		callback('Exchange not supported: ' + exchange);
	}
}
exports.getExchangeMarkets = getExchangeMarkets;

/**
 * Get Exchange Market Price
 **/

let priceRequestsCache = {};

function getExchangePrice (exchange, base, target, callback) {
	callback = callback || function () {};

	if (!exchange) {
		callback('No exchange specified');
	} else if (!base) {
		callback('No base specified');
	} else if (!target) {
		callback('No target specified');
	}

	exchange = exchange.toLowerCase();
	base = base.toUpperCase();
	target = target.toUpperCase();

	// Return cache if available
	let cacheKey = exchange + '-' + base + '-' + target;
	let currentTimestamp = Date.now() / 1000;

	let error = null;
	let price = 0.0;
	let data = {};
	let ticker = null;

	if (priceRequestsCache[cacheKey] && priceRequestsCache[cacheKey].ts > (currentTimestamp - 60)) {
		callback(null, priceRequestsCache[cacheKey].data);
		return;
	}

	// Unknown
	else {
		callback('Exchange not supported: ' + exchange);
	}
}
exports.getExchangePrice = getExchangePrice;
