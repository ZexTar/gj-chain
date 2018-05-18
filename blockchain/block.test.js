const Block = require('./block');
const {DIFFICULTY} = require('../conf');


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
		expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
		console.log(block.hash);
	});
});