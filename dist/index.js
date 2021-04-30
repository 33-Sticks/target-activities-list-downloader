"use strict";
function getTargetActivities() {
    let activityElements = document.querySelectorAll("ul.activities > .listItem");
    let activities = Array.from(activityElements).map((activity) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            type: (_b = (_a = activity === null || activity === void 0 ? void 0 : activity.querySelector("div.e2e-badge")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim(),
            name: (_c = activity === null || activity === void 0 ? void 0 : activity.querySelector("span.e2e-name")) === null || _c === void 0 ? void 0 : _c.textContent,
            description: (_e = (_d = activity === null || activity === void 0 ? void 0 : activity.querySelector("span.e2e-description")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim(),
            status: (_f = activity === null || activity === void 0 ? void 0 : activity.querySelector("span.statusText")) === null || _f === void 0 ? void 0 : _f.textContent,
            property: (_g = activity === null || activity === void 0 ? void 0 : activity.querySelector("div.property-value > span")) === null || _g === void 0 ? void 0 : _g.textContent,
            lastUpdatedDate: (_h = activity === null || activity === void 0 ? void 0 : activity.querySelector("div.e2e-date")) === null || _h === void 0 ? void 0 : _h.textContent,
            lastUpdatedUser: (_k = (_j = activity === null || activity === void 0 ? void 0 : activity.querySelector("div.e2e-user")) === null || _j === void 0 ? void 0 : _j.textContent) === null || _k === void 0 ? void 0 : _k.slice(3),
        };
    });
    return activities;
}
// Adapted from https://stackoverflow.com/a/31536517
function createCSV(activities) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = ["type", "name", "description", "status", "property", "lastUpdatedDate", "lastUpdatedUser"];
    const csv = [
        header.join(','),
        ...activities.map(row => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    console.log(csv);
    return csv;
}
// Adapted from https://stackoverflow.com/a/55784435
function downloadCSV(csv) {
    var _a;
    if (!window.location.pathname.includes('activities.html')) {
        console.warn("This script must be run from the context of activities.html");
        return;
    }
    let dateString = (_a = Date.now()) !== null && _a !== void 0 ? _a : '';
    let downloaderElement = document.createElement('a');
    downloaderElement.href = "data:application/octet-stream," + encodeURIComponent(csv);
    downloaderElement.download = `targetActivities_${dateString}.csv`;
    downloaderElement.click();
}
downloadCSV(createCSV(getTargetActivities()));
