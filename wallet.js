const { performance } = require('perf_hooks');
const { Account } = require("@solana/web3.js");

function generate(prefix, threadId) {
    let count = 0;
    while (true) {
        const ac = new Account();
        if (ac.publicKey.toBase58().startsWith(prefix)) {
            return {
                publicKey: ac.publicKey.toBase58(),
                secretKey: `[${Uint8Array.from(ac.secretKey).toString()}]`,
            }
        }
        count++;
        if (count % 100000 === 0) {
            console.log(`thread-${threadId} generated ${count} wallet addresses`);
        }
    }
}

function measure(n) {
    const start = performance.now();
    for (let i = 0; i < n; i++) {
        new Account().publicKey.toBase58().toLowerCase().startsWith("sample");
    }
    return performance.now() - start;
}

module.exports = {
    generate,
    measure,
}
