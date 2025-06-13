const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

async function compile() {
    try {
        console.log('Compiling SimpleStorage contract...');

    } catch (error) {
        console.error('[X] Compilation failed', error.message);
        process.exit(1);
    }
}

// Run compliation if this script is executred directly 
if(require.main == module) {
    compile();
}

module.exports = compile; 