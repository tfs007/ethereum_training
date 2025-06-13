const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

async function deploy() {
    try {
        console.log('[=>] Starting deployment...');

    } catch (error) {
        console.error('[X] Deployment failed: ', error.message);
        process.exit(1);
    }
}

// Run compliation if this script is executred directly 
if(require.main == module) {
    deploy();
}

module.exports = deploy;