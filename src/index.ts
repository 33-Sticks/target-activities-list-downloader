function getTargetActivities() {
  let activityElements = document.querySelectorAll("ul.activities > .listItem")
  let activities: Activity[] = Array.from(activityElements).map((activity) => {
    return {
      type: activity?.querySelector("div.e2e-badge")?.textContent?.trim(),
      name: activity?.querySelector("span.e2e-name")?.textContent,
      description: activity?.querySelector("span.e2e-description")?.textContent?.trim(),
      status: activity?.querySelector("span.statusText")?.textContent,
      property: activity?.querySelector("div.property-value > span")?.textContent,
      lastUpdatedDate: activity?.querySelector("div.e2e-date")?.textContent,
      lastUpdatedUser: activity?.querySelector("div.e2e-user")?.textContent?.slice(3),
    }
  });
  return activities;
}

// Adapted from https://stackoverflow.com/a/31536517
function createCSV(activities: Activity[]): string {
  const replacer = (key: string, value: any) => value === null ? '' : value // specify how you want to handle null values here
  const header: HeaderValue[] = ["type", "name", "description", "status", "property", "lastUpdatedDate", "lastUpdatedUser"];
  const csv = [
    header.join(','), // header row first
    ...activities.map(row => header.map((fieldName: HeaderValue) => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')

  console.log(csv)
  return csv;
}

// Adapted from https://stackoverflow.com/a/55784435
function downloadCSV(csv: string) {
  if(!window.location.pathname.includes('activities.html')) {
    console.warn("This script must be run from the context of activities.html");
    return;
  }
  let dateString = Date.now() ?? '';
  let downloaderElement = document.createElement('a');
  downloaderElement.href = "data:application/octet-stream,"+encodeURIComponent(csv);
  downloaderElement.download = `targetActivities_${dateString}.csv`;
  downloaderElement.click();
}

downloadCSV(createCSV(getTargetActivities()));

type Activity = Record<HeaderValue, string | null | undefined>

type HeaderValue = "type" | "name" | "description" | "status" | "property" | "lastUpdatedDate" | "lastUpdatedUser";