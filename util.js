const os = require("os");

function getCpuCore() {
    const cpus = os.cpus();
    const n = cpus.length
    if (n === 1) {
        return 1;
    }
    for (let i = 0; i < n; i++) {
        if (cpus[i].model.includes("Intel")) {
            return Math.round(n / 2); // Hyper-Threading
        }
    }
    return n;
}

const MS_SECOND = 1000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;
const MS_YEAR = 365 * MS_DAY;

function humanize(ms) {
    ms = Math.round(ms);

    if (ms > Number.MAX_SAFE_INTEGER) {
        return "∞";
    }

    let year = 0;
    while (ms >= MS_YEAR) {
        ms -= MS_YEAR
        year++;
    }

    let day = 0;
    while (ms >= MS_DAY) {
        ms -= MS_DAY
        day++;
    }

    let hour = 0;
    while (ms >= MS_HOUR) {
        ms -= MS_HOUR
        hour++;
    }

    let minute = 0;
    while (ms >= MS_MINUTE) {
        ms -= MS_MINUTE
        minute++;
    }

    const second = Math.floor(ms / 1000 * 100) / 100;
    return formatHumanize(year, day, hour, minute, second)
}

function formatHumanize(year, day, hour, minute, second) {
    if (year > 0) {
        const yearFormat = year === 1 ? "year" : "years"
        return `${year} ${yearFormat} ${day} d`
    }
    if (day > 0) {
        return `${day} d ${hour} h`
    }
    if (hour > 0) {
        return `${hour} h ${minute} min`
    }
    if (minute > 0) {
        return `${minute} min ${Math.floor(second)} sec`
    }
    if (second > 0) {
        return `${second} sec`
    }
}

module.exports = {
    getCpuCore,
    humanize,
};
