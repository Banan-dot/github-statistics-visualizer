import {
  startOfDay,
  parseISO,
  isBefore,
  format,
  addDays,
  min,
  max,
  parse,
  differenceInHours,
  isAfter,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInQuarters,
  differenceInYears,
} from "date-fns";

enum FrequencyPeriod {
  LessThanHour,
  Day,
  Week,
  Month,
  Quarter,
  Year,
  MoreThanYear,
}

type FrequencyLocale = {
  [key in FrequencyPeriod]: string;
};

const FrequencyLocaleRu: FrequencyLocale = {
  [FrequencyPeriod.LessThanHour]: "Меньше часа",
  [FrequencyPeriod.Day]: "День",
  [FrequencyPeriod.Week]: "Неделя",
  [FrequencyPeriod.Month]: "Месяц",
  [FrequencyPeriod.Quarter]: "Квартал",
  [FrequencyPeriod.Year]: "Год",
  [FrequencyPeriod.MoreThanYear]: "Больше года",
};

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

const getFrequencyPeriod = (
  startDate: Date,
  endDate: Date
): FrequencyPeriod => {
  if (isAfter(startDate, endDate)) {
    throw new Error("Дата конца не может быть раньше даты начала");
  }
  if (differenceInHours(endDate, startDate) < 1) {
    return FrequencyPeriod.LessThanHour;
  }
  if (differenceInDays(endDate, startDate) < 1) {
    return FrequencyPeriod.Day;
  }
  if (differenceInWeeks(endDate, startDate) < 1) {
    return FrequencyPeriod.Week;
  }
  if (differenceInMonths(endDate, startDate) < 1) {
    return FrequencyPeriod.Month;
  }
  if (differenceInQuarters(endDate, startDate) < 1) {
    return FrequencyPeriod.Quarter;
  }
  if (differenceInYears(endDate, startDate)) {
    return FrequencyPeriod.Year;
  }
  return FrequencyPeriod.MoreThanYear;
};

export const getFrequencyData = (data: DataObject[]) => {
  const map = new Map<FrequencyPeriod, number>();

  data.forEach((dataItem) => {
    if (dataItem.createdAt && dataItem.closedAt) {
      const createdAt = parseISO(dataItem.createdAt);
      const closedAt = parseISO(dataItem.closedAt);
      const key = getFrequencyPeriod(createdAt, closedAt);
      const value = map.get(key) ?? 0;

      map.set(key, value + 1);
    }
  });

  return transformMapToXY(map)
    .sort((a, b) => a.x - b.x)
    .map(({ x, y }) => ({ x: FrequencyLocaleRu[x as FrequencyPeriod], y }));
};
