const ChainUtil = require('../chain-util');
const {DIFFICULTY, BLOCK_TIME} = require('../conf');

class Block {
	constructor (timestamp, prevHash, hash, data, nonce, difficulty) {
		this.timestamp = timestamp;
		this.prevHash = prevHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty ||DIFFICULTY;
	}

	toAscii() {
		return `Block -
			Timestamp    : ${this.timestamp}
			Previous Hash: ${this.prevHash.substring(0, 10)}
			Hash         : ${this.hash.substring(0, 10)}
			Data         : ${this.data};
			Nonce        : ${this.nonce};
			Difficulty   : ${this.difficulty}`
	}

	static genesis() {
		return new this('gentime', 'null', '1o2j3nxm3', [], 0, DIFFICULTY);
	}

	static mineBlock(lastBlock, data) {
		let hash,timestamp;
		const prevHash = lastBlock.hash;
		let { difficulty } = lastBlock;
		let nonce = 0;

		do {
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty(lastBlock, timestamp);
			hash = Block.hash(timestamp, prevHash, data, nonce, difficulty);


		} while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
		

		return new this(timestamp, prevHash, hash, data, nonce, difficulty); 
	}

	static hash(timestamp, prevHash, data, nonce, difficulty) {
   		return ChainUtil.hash(`${timestamp}${prevHash}${data}${nonce}${difficulty}`).toString();
  	}

  	static blockHash(block) {
  		const {timestamp, prevHash, data, nonce, difficulty} = block;
  		
  		return Block.hash(timestamp, prevHash, data, nonce, difficulty);
  	}

  	static adjustDifficulty(lastBlock, currentTime) {
		let { difficulty } = lastBlock;

		difficulty = lastBlock.timestamp + BLOCK_TIME > currentTime ? 
		difficulty + 1 : difficulty - 1;
  		return difficulty;
	}
}

module.exports = Block;