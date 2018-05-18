const Block = require('./block');

describe('Block', () => {
	let data, prevBlock, block;
	beforeEach(() => {
		data = 'bar';
		prevBlock = Block.genesis();
		block = Block.mineBlock(prevBlock, data);
	});
		
	it('sets the `data` to match the input', () => {
		expect(block.data).toEqual(data);
	});
		
	it('sets the `prevHash` to match the hash of the last block', () => {
		expect(block.prevHash).toEqual(prevBlock.hash);
	});

	it('generates a hash with that match difficulty', () => {
		expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
	});

	it('lowers the difficulty for slowly mined blocks', () => {
  		expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
	});

	it('raises the difficulty for quickly mined blocks', () => {
  		expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
	});

});