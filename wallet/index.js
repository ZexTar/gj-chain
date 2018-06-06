const { INITIAL_BALANCE } = require('../conf');
const ChainUtil = require('../chain-util');

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = ChainUtil.genKeyPair(); 
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}

	toAscii() {

		return `Wallet - 
		publicKey:${this.publicKey.substring(0, 20)}
		balance  :${this.balance}`
	}

	sign(dataHash) {
		return this.keyPair.sign(dataHash);
	}
}

module.exports = Wallet;