const { performance } = require('perf_hooks');
const { parentPort } = require("worker_threads");
const { Account } = require("@solana/web3.js");

function generate(prefix, threadId, threadNum) {
    let count = 0;
    while (true) {
        const ac = new Account();
        if (ac.publicKey.toBase58().startsWith(prefix)) {
            return createResult(true, count * threadNum, ac);
        }
        if (threadId === 1) {
            count++;
            if (count % 50000 === 0) {
                parentPort.postMessage(createResult(false, count * threadNum, ac));
            }
        }
    }
}

function createResult(done, count, account) {
    return {
        done: done,
        count: count,
        publicKey: account.publicKey.toBase58(),
        secretKey: `[${Uint8Array.from(account.secretKey).toString()}]`,
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
