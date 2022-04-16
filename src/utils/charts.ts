import {
  startOfDay,
  parseISO,
  isBefore,
  format,
  addDays,
  min,
  max,
} from "date-fns";

type ObjectWithCreatedAt = {
  createdAt: string;
};

type ObjectWithClosedAt = {
  closedAt: string | null;
};

const getMinMaxDates = <T extends ObjectWithClosedAt & ObjectWithCreatedAt>(
  data: T[]
): [minDate: Date, maxDate: Date] => {
  let dateSet = new Set<Date>();
  data.forEach((dataItem) => {
    dateSet.add(startOfDay(parseISO(dataItem.createdAt)));
    if (dataItem.closedAt) {
      dateSet.add(startOfDay(parseISO(dataItem.closedAt)));
    }
  });
  const dates = Array.from(dateSet);
  const minDate = min(dates);
  const maxDate = max(dates);
  return [minDate, maxDate];
};

const initializeMapDate = <T extends ObjectWithClosedAt & ObjectWithCreatedAt>(
  data: T[]
) => {
  const map = new Map<string, number>();
  const [minDate, maxDate] = getMinMaxDates(data);
  let current = minDate;

  while (isBefore(current, maxDate)) {
    map.set(format(current, "yyyy-MM-dd"), 0);
    current = addDays(current, 1);
  }

  return map;
};

const transformMapToXY = <T, R>(
  map: Map<T, R>,
  transformX?: (x: T) => any,
  transformY?: (y: R) => any
) => {
  return Array.from(map, ([key, value]) => {
    const transformedX = transformX ? transformX(key) : key;
    const transformedY = transformY ? transformY(value) : value;
    return { x: transformedX, y: transformedY };
  });
};

export const getCreatedAtData = <
  T extends ObjectWithClosedAt & ObjectWithCreatedAt
>(
  data: T[]
) => {
  const map = initializeMapDate(data);
  data.forEach((pullRequest) => {
    const key = pullRequest.createdAt.split("T")[0];
    const value = map.get(key) ?? 0;
    map.set(key, value + 1);
  });
  return transformMapToXY(map, (x) => new Date(x));
};

export const getClosedAtData = <
  T extends ObjectWithClosedAt & ObjectWithCreatedAt
>(
  data: T[]
) => {
  const map = initializeMapDate(data);
  data.forEach((pullRequest) => {
    if (pullRequest.closedAt) {
      const key = pullRequest.closedAt.split("T")[0];
      const value = map.get(key) ?? 0;
      map.set(key, value + 1);
    }
  });
  return transformMapToXY(map, (x) => new Date(x));
};
