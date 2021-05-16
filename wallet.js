const { performance } = require('perf_hooks');
const { Account } = require("@solana/web3.js")
const util = require("./util");

function generate(prefix) {
    while (true) {
        const ac = new Account();
        if (ac.publicKey.toBase58().toLowerCase().startsWith(prefix)) {
            return {
                publicKey: ac.publicKey.toBase58(),
                secretKey: `[${Uint8Array.from(ac.secretKey).toString()}]`,
            }
        }
    }
}

function measure(n) {
    const start = performance.now();
    for (let i = 0; i < n; i++) {
        new Account().publicKey.toBase58().toLowerCase().startsWith("sample");
    }
    return util.performanceSec(start);
}

module.exports = {
    generate,
    measure,
}
