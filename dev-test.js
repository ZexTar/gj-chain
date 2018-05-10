const Block = require('./block');

//testing block creation

// const block = new Block('tihi', 'prle', 'mrki', 'pufta');
// console.log(block.toAscii());
// console.log(Block.genesis().toAscii());

//testing mine function

const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toAscii());