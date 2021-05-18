const { performance } = require('perf_hooks');
const { Worker, workerData, isMainThread, threadId, parentPort } = require("worker_threads");

const util = require("./util");
const wallet = require("./wallet");

const threadNum = util.getCpuCore();

if (isMainThread) {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error("command line arguments must be specified");
        process.exit(1);
    }

    const prefix = args[0];
    const estimatedCount = 58 ** prefix.length;
    const sampleCount = 100;
    const measuredMs = wallet.measure(sampleCount);
    const estimatedMs = Math.round(estimatedCount / sampleCount * measuredMs / threadNum);
    console.log(`prefix: ${prefix}`);
    console.log(`estimated count: ${estimatedCount}`);
    console.log(`estimated time : ${util.humanize(estimatedMs)}\n`);

    const start = performance.now();
    const workers = [];
    for (let i = 0; i < threadNum; i++) {
        const worker = new Worker(__filename, {workerData: prefix});
        workers.push(worker);
        worker.on("message", (obj) => {
            const elapsedTime = performance.now() - start;
            if (obj.done) {
                console.log(`complete!`);
                console.log(`public key: ${obj.publicKey}`);
                console.log(`secret key: ${obj.secretKey}`);
                for (let i = 0; i < threadNum; i++) {
                    workers[i].terminate();
                }
            }
            console.log(`generated ${obj.count} addresses in ${util.humanize(elapsedTime)}`);
        });
    }
} else {
    const result = wallet.generate(workerData, threadId, threadNum);
    parentPort.postMessage(result);
}
