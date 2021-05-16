const os = require("os");
const { performance } = require('perf_hooks');

function getCpuCore() {
    const cpus = os.cpus();
    const len = cpus.length
    if (len === 1) {
        return 1;
    }
    for (let i = 0; i < len; i++) {
        if (cpus[i].model.includes("Intel")) {
            return len / 2; // Hyper-Threading
        }
    }
    return len;
}

function performanceSec(ms) {
    return ((performance.now() - ms) / 1000);
}

module.exports = {
    getCpuCore,
    performanceSec,
};
