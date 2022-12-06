
// Load required modules
let fs = require('fs');

// Set pool software version
global.version = "v2.1.2";

/**
 * Load pool configuration
 **/

// Get configuration file path
let configFile = (function () {
	for (let i = 0; i < process.argv.length; i++) {
		if (process.argv[i].indexOf('-config=') === 0)
			return process.argv[i].split('=')[1];
	}
	return 'config.json';
})();

// Read configuration file data
try {
	global.config = JSON.parse(fs.readFileSync(configFile));
} catch (e) {
	console.error('Failed to read config file ' + configFile + '\n\n' + e);
	return;
}

/**
 * Developper donation addresses -- thanks for supporting my works!
 **/

let donationAddresses = {
	XFG: 'fireAjCLL6cQ13721wEtvze9o4yoMxfQNe1QQnvASAvjg6mZui9jzbB9mjQEmjo4e44Z678YTsBAgQgWtyMNxwrwAU4FpQd1fS',
	INF: 'inf8d8xiyk33M1ULQ2nwSEdx7YqvpmuRGdeQRtPH2oDH42QzDCAgJnqGgwJFNMSefe8j8Pbumqbda9qxp97JCH7i8j1WgbASkx',
	AMX: 'RRSXA9ggMmDf4r9fCNWZHAZYmzuhieg331SaXgwzjjbrWHuSB3E7SuyVUjYruZqqv9FyQoJyPFYJ94SYTky4uKRs2gb4iiTNp'

};

global.donations = {};

global.devFee = config.blockUnlocker.devDonation || 0.5;
if (config.blockUnlocker.devDonation === 0){
	global.devFee = 0.5;
}

let wallet = donationAddresses[config.symbol.toUpperCase()];
if (devFee && wallet){
	global.donations[wallet] = devFee;
}
