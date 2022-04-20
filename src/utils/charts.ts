import {
  startOfDay,
  parseISO,
  isBefore,
  format,
  addDays,
  min,
  max,
  parse,
} from "date-fns";

interface DataObject {
  createdAt?: string;
  closedAt?: string | null;
  pushedDate?: string | null;
}

const getMinMaxDates = (dates: Date[]) => {
  if (dates.length === 0) {
    const currentDate = startOfDay(new Date());
    return [currentDate, currentDate];
  }

  const minDate = min(dates);
  const maxDate = max(dates);
  return [minDate, maxDate];
};

const getDates = (data: DataObject[]): Date[] => {
  const dateSet = new Set<Date>();

  if (data.length === 0) {
    return Array.from(dateSet);
  }

  data.forEach((item) => {
    if (item.pushedDate) {
      dateSet.add(startOfDay(parseISO(item.pushedDate)));
    }
    if (item.closedAt) {
      dateSet.add(startOfDay(parseISO(item.closedAt)));
    }
    if (item.createdAt) {
      dateSet.add(startOfDay(parseISO(item.createdAt)));
    }
  });

  return Array.from(dateSet);
};

const initializeMapDate = (data: DataObject[]) => {
  const map = new Map<string, number>();

  const dates = getDates(data);
  const [minDate, maxDate] = getMinMaxDates(dates);

  let current = minDate;
  while (isBefore(current, maxDate)) {
    map.set(format(current, "yyyy-MM-dd"), 0);
    current = addDays(current, 1);
  }

  return map;
};

const removeEmptyValues = (arr: { x: Date; y: number }[]) => {
  return arr.filter((item, index, arr) => {
    if (item.y === 0 && arr[index - 1]?.y === 0 && arr[index + 1]?.y === 0) {
      return false;
    }
    return true;
  });
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

export const getData = (data: DataObject[], fieldName: keyof DataObject) => {
  const map = initializeMapDate(data);
  data.forEach((item) => {
    if (item[fieldName]) {
      const key = (item[fieldName] as string).split("T")[0];
      const value = map.get(key) ?? 0;
      map.set(key, value + 1);
    }
  });
  return removeEmptyValues(
    transformMapToXY(map, (x) => parse(x, "yyyy-MM-dd", new Date()))
  );
};
