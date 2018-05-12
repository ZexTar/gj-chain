const Blockchain = require('./index');
const Block = require('./block')

describe('Blockchain', () => {
	let bc;

	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it('starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
		const data = 'booo';
		bc.addBlock(data);

		expect(bc.chain[bc.chain.length-1].data).toEqual(data);
	});

	it ('validates a valid chain', () => {
		bc.addBlock('booo');

		expect(bc.isValidChain(bc2.chain)).toBe(true);
	});

	it('invalidates chain with corrupt genesis', () => {
		bc2.chain[0].data = 'wrongdata';

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('invalidates a corrupt chain', () => {
		bc2.addBlock('booo');
		bc2.chain[1].data = 'buuuu';

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('replaces the chain with a valid chain', () => {
		bc2.addBlock('fooo');
		bc.replaceChain(bc2.chain);
		
		expect(bc.chain).toEqual(bc2.chain);


	});

	it('doesnt replace with one of less than or equal to length', () => {
		bc.addBlock('foo');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).not.toEqual(bc2.chain);
	})
})