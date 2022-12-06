# Cryptonight-Radioactive-pool
Working cryptonight mining pool 6122022

Usage
===

#### Requirements
* Coin daemon(s) (find the coin's repo and build latest version from source)
  * [List of Cryptonote coins](https://github.com/dvandal/cryptonote-nodejs-pool/wiki/Cryptonote-Coins)

  * For Ubuntu: 
 ```
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash
  sudo apt-get install -y nodejs
```
* [Redis](http://redis.io/) key-value store v2.6+ 
  * For Ubuntu: 
```
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
 ```
* libssl required for the node-multi-hashing module
  * For Ubuntu: `sudo apt-get install libssl-dev`

* Boost is required for the cryptoforknote-util module
  * For Ubuntu: `sudo apt-get install libboost-all-dev libsodium-dev`


##### Seriously
Those are legitimate requirements. If you use old versions of Node.js or Redis that may come with your system package manager then you will have problems. Follow the linked instructions to get the last stable versions.

[**Redis warning**](http://redis.io/topics/security): It'sa good idea to learn about and understand software that
you are using - a good place to start with redis is [data persistence](http://redis.io/topics/persistence).

**Do not run the pool as root** : create a new user without ssh access to avoid security issues :
```bash
sudo adduser --disabled-password --disabled-login your-user
```
To login with this user : 
```
sudo su - your-user
```

####  Downloading & Installing


Clone the repository and run `npm update` for all the dependencies to be installed:

```bash
git clone https://github.com/BlackPeter13/Cryptonight-Radioactive-pool.git pool
cd pool

npm update

####  Start the pool

```bash
node init.js
```

The file `config.json` is used by default but a file can be specified using the `-config=file` command argument, for example:

```bash
node init.js -config=config_backup.json
```

This software contains four distinct modules:
* `pool` - Which opens ports for miners to connect and processes shares
* `api` - Used by the website to display network, pool and miners' data
* `unlocker` - Processes block candidates and increases miners' balances when blocks are unlocked
* `payments` - Sends out payments to miners according to their balances stored in redis


By default, running the `init.js` script will start up all four modules. You can optionally have the script start
only start a specific module by using the `-module=name` command argument, for example:

```bash
node init.js -module=api
```

####  Host the front-end

Simply host the contents of the `website_example` directory on file server capable of serving simple static files.


Edit the variables in the `website_example/config.js` file to use your pool's specific configuration.
Variable explanations:

```javascript

/* Must point to the API setup in your config.json file. */
var api = "http://poolhost:8117";

/* Pool server host to instruct your miners to point to (override daemon setting if set) */
var poolHost = "poolhost.com";

/* Number of coin decimals places (override daemon setting if set) */
"coinDecimalPlaces": 4,

/* Contact email address. */
var email = "support@poolhost.com";

/* Pool Telegram URL. */
var telegram = "https://t.me/YourPool";
