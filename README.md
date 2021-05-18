# Vanity SOL

Node.js based vanity address generator for solana

## Features

* Generate solana address
* Supports Multi-core processors

## Setup

### Mac OS

* Install [Homebrew](https://brew.sh/)
* Install git and node.js

```sh
brew install git node
```

* Download source code

```sh
git clone https://github.com/jnst/vanity-sol.git
```

* Download node.js libraries

```
cd vanity-sol
npm install
````

## How to use

Specify the prefix of wallet address

```sh
$ node index.js SoL
prefix: SoL
estimated count: 195112
estimated time : 8 min 26 sec

complete!
public key: SoLtzJLkiYViKRBta5U4X8AfmMMzPpi1DcxrNskUXPD
secret key: [16,46,155,16,195,11,108,130,12,131,194,246,231, ... ]
generated 381722 addresses in 16 min 2 sec
```

### Convenient mistake detection

```sh
$ node index.js SOl
invalid character contains: O,l
```

## License

MIT
