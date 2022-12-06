
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
	BTC: '17qFGHhPWLQrGsd9k8BUGNdFerJKijaJCa',
	BCH: 'qq7jengltv0f3rg9qg6llyr2pf4373449ccfgvk33d',
	DASH: 'XjTYnPDckSzJxraNc9HAN6zduzetfbehF4',
	ETH: '0xECcDf9E1aB9c9B6Bcbd24Dda4B1638507ee6f7D3',
	LTC: 'LYX2vPD1HDRYPxeLfVUZCq4FUmnKd8d9g1',
	BAT: '0x478dF7ABB09f1c60CeA20E28De06ce0fFa9a572b',
	XMR: '442uRjHUQp66Q2xqXzqfPVdy8qxrQ56aoCJXH7T5D43DUPybhVKTSTpaQiDvrBkd778dik1aRPNkBH79xi5HbTQL8MVfRT7',
	BTN: 'ECVVceHwZQaNg7BNuAjJXhbQFJnLcmxyxJ7CXNBnb2M5YUsVMKaAD8ceNHiGSqdS7hJWKLEC38kFeWU6F5dVpLm2QPcLWdj',
	CIRQ: 'cirqgBwr2odjCpFpRtxeoq2Ze8eAcghdMa3z6Adr3bxXMbmghyikrajGy2L8iF4LkQJkLKhkgHA2oH6xm2YQ2cak7MmdiTYrKyc',
	GNS: 'gnsm2mqhwK69bMLnTZYDiTereTETBUbNuGEoY7rguPrfAQvjM7ddpDbMGHDZm3FUia1KXV77rMRPaUuPeCBFPbw314JmS11SEt',
	INF: 'inf8RHyNSL4283w14VB4XfaqsqDaZPrfNHYVjGwSNL9NXkEFxtxJ4kLdXt8SazvcqpKjvsaEvRfKEXSHBotq2pRvATJ7otPSyG',
	ZTC: 'Ze4tc4mTG137cG3i5oa8yLAW4iZvPoRVsEx5dGRhiEcoEWEVCBvc4hB6fcDyqE2FoWPpLWnGGswq19yqsFi1bhDd1XnDmtD6T',
	WXTC: 'WcBawbuLjCDBYZJC473GTtXkzgyEfNAyJTeugBpowcz7fN1ZHeUxfAf8nqVhjiAN9iATfzKhhPpeXfMp5iJwN3j221ubCgxxz',
	SCSX: 'Sdj7SuGLYZwfspdSs2BtsUfShoVYczXHX6XWugrH9KuwAFyMqcgGU6cJ4eRKxXsT9dSR8FJ1YVz1BBtJkQWZ7RG42oQd3o1hH',
	QWC: 'QWC1XeuQUHv5rWqZ7cqMzbLSUFJSxbnib4tLJXmYNtXNg8cRSSEEpkE7Ea6CA73Gxz7UXT6sb2Vd42HsMCpXGmbC75n386hgqN',
	NACA: 'NaCaYZab9aJBuV6Uoz7LG8N9CWJqQu7hTefKxXoAcuFgNgzEgQF26ErWWJAQTika8RjAPzrh7e1kti9jas6FnDga3gyit3rS9j',
	NINJA: 'Ninja137JTSh5YrAc3qwfGZe5mWmUiFxpCCrZGZdyc7mC6FqRmaeLQSNWs8nihacwaJCn5L3uJAzvbArVNBUq96iL25jeYvkVRf3y',
	ARMS: 'gunsCdncTB1DM9xeRTBKz5YHoYRpbKn5GVdysCmGM8GaSb55DJrMUw7BdF64nvdb5MeCLG6xJQ956hoJUaVA2Rzp4UgDkeS9so',
	ZUM: 'Zum1ygrpgp9gotJyFZKKxF2s4jmLVTrVJRyZVCvQDgeTBzPFfyNmDjY8kY2bihE6oXHM5K8DWagwS7HvPUspaC9gcTjvwJxmMQh',
	XUNI: 'Xuniiirs6Vo8REdUmDf2vXM9PjnWZe6PfToy2sBkLCD1Hn5Dp2CN6G8JTpAMNUV5kB93zqi3GGv3SYPfok39xE7BJkSk74jUsBU'

};

global.donations = {};

global.devFee = config.blockUnlocker.devDonation || 0.5;
if (config.blockUnlocker.devDonation === 0){
	global.devFee = 0.0;
}

let wallet = donationAddresses[config.symbol.toUpperCase()];
if (devFee && wallet){
	global.donations[wallet] = devFee;
}
