const SHA256 = require("crypto-js/sha256");

class Block {
	constructor (timestamp, prevHash, hash, data) {
		this.timestamp = timestamp;
		this.prevHash = prevHash;
		this.hash = hash;
		this.data = data;
	}

	toAscii() {
		return `Block -
			Timestamp    : ${this.timestamp}
			Previous Hash: ${this.prevHash.substring(0, 10)}
			Hash         : ${this.hash.substring(0, 10)}
			Data         : ${this.data}`;
	}

	static genesis() {
		return new this('gentime', 'null', '1o2j3nxm3', []);
	}

	static mineBlock(lastBlock, data) {
		const timestamp = Date.now();
		const prevHash = lastBlock.hash;
		const hash = Block.hash(timestamp, prevHash, data);

		return new this(timestamp, prevHash, hash, data); 
	}

	static hash(timestamp, prevHash, data) {
   		return SHA256(`${timestamp}${prevHash}${data}`).toString();
  	}

  	static blockHash(block) {
  		const {timestamp, prevHash, data} = block;
  		return Block.hash(timestamp, prevHash, data);
  	}
}

module.exports = Block;