const util = require("./util");

test('humanize', () => {
    expect(util.humanize(989)).toBe("0.98 sec");
    expect(util.humanize(990)).toBe("0.99 sec");
    expect(util.humanize(999)).toBe("0.99 sec");
    expect(util.humanize(1000)).toBe("1 sec");
    expect(util.humanize(1001)).toBe("1 sec");
    expect(util.humanize(1100)).toBe("1.1 sec");
    expect(util.humanize(2000)).toBe("2 sec");
    expect(util.humanize(2001)).toBe("2 sec");
    expect(util.humanize(59999)).toBe("59.99 sec");
    expect(util.humanize(60000)).toBe("1 min 0 sec");
    expect(util.humanize(119999)).toBe("1 min 59 sec");
    expect(util.humanize(120000)).toBe("2 min 0 sec");
    expect(util.humanize(3599999)).toBe("59 min 59 sec");
    expect(util.humanize(3600000)).toBe("1 h 0 min");
    expect(util.humanize(7199999)).toBe("1 h 59 min");
    expect(util.humanize(7200000)).toBe("2 h 0 min");
    expect(util.humanize(86399999)).toBe("23 h 59 min");
    expect(util.humanize(86400000)).toBe("1 d 0 h");
    expect(util.humanize(172799999)).toBe("1 d 23 h");
    expect(util.humanize(172800000)).toBe("2 d 0 h");
    expect(util.humanize(31535999999)).toBe("364 d 23 h");
    expect(util.humanize(31536000000)).toBe("1 year 0 d");
    expect(util.humanize(Number.MAX_SAFE_INTEGER)).toBe("285616 years 151 d");
    expect(util.humanize(Number.MAX_SAFE_INTEGER + 1)).toBe("∞");
});
