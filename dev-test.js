const Blockchain = require('./blockchain');

//testing block creation

// const block = new Block('tihi', 'prle', 'mrki', 'pufta');
// console.log(block.toAscii());
// console.log(Block.genesis().toAscii());

//testing mine function

const bc = new Blockchain();

for (let i = 0; i < 60; i++){
	console.log(bc.addBlock(`cigan${i}`));
	if (bc.chain[i-1] !== undefined)
	console.log(bc.chain[i].timestamp - bc.chain[i-1].timestamp);
}
