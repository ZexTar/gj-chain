const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY} = require('../conf');

class Block {
	constructor (timestamp, prevHash, hash, data, nonce) {
		this.timestamp = timestamp;
		this.prevHash = prevHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
	}

	toAscii() {
		return `Block -
			Timestamp    : ${this.timestamp}
			Previous Hash: ${this.prevHash.substring(0, 10)}
			Hash         : ${this.hash.substring(0, 10)}
			Data         : ${this.data};
			Nonce        : ${this.nonce};`
	}

	static genesis() {
		return new this('gentime', 'null', '1o2j3nxm3', [], 0);
	}

	static mineBlock(lastBlock, data) {
		
		const prevHash = lastBlock.hash;
		let nonce = 0;
		let hash,timestamp;

		do {
			nonce++;
			timestamp = Date.now();
			hash = Block.hash(timestamp, prevHash, data, nonce);
			console.log(nonce, hash);


		} while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
		

		return new this(timestamp, prevHash, hash, data, nonce); 
	}

	static hash(timestamp, prevHash, data, nonce) {
   		return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
  	}

  	static blockHash(block) {
  		const {timestamp, prevHash, data, nonce} = block;
  		
  		return Block.hash(timestamp, prevHash, data, nonce);
  	}
}

module.exports = Block;