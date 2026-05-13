import {
  GridFilterInputDate,
  type GridFilterInputDateProps,
} from '../components/panel/filterPanel/GridFilterInputDate';
import { GridFilterInputDateRange } from '../components/panel/filterPanel/GridFilterInputDateRange';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import type { GridFilterItem } from '../models/gridFilterItem';
import type { GridFilterOperator, GetApplyFilterFn } from '../models/gridFilterOperator';

function buildApplyFilterFn(
  filterItem: GridFilterItem,
  compareFn: (value1: number, value2: number) => boolean,
  showTime?: boolean,
  keepRawComparison?: boolean,
): ReturnType<GetApplyFilterFn> {
  if (!filterItem.value) {
    return null;
  }

  const date = new Date(filterItem.value);
  if (showTime) {
    date.setSeconds(0, 0);
  } else {
    // In GMT-X timezone, the date will be one day behind.
    // For 2022-08-16:
    // GMT+2: Tue Aug 16 2022 02:00:00 GMT+0200
    // GMT-4: Mon Aug 15 2022 20:00:00 GMT-0400
    //
    // We need to add the offset before resetting the hours.
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    date.setHours(0, 0, 0, 0);
  }
  const time = date.getTime();

  return (value: Date): boolean => {
    if (!value) {
      return false;
    }

    if (keepRawComparison) {
      return compareFn(value.getTime(), time);
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    if (showTime) {
      dateCopy.setSeconds(0, 0);
    } else {
      dateCopy.setHours(0, 0, 0, 0);
    }
    return compareFn(dateCopy.getTime(), time);
  };
}

export const getGridDateOperators = (
  showTime?: boolean,
): GridFilterOperator<any, Date, any, GridFilterInputDateProps>[] => [
  {
    value: 'is',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(filterItem, (value1, value2) => value1 === value2, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'not',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(filterItem, (value1, value2) => value1 !== value2, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'after',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(
        filterItem,
        (value1, value2) => value1 > value2,
        showTime,
        showTime,
      );
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'onOrAfter',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(
        filterItem,
        (value1, value2) => value1 >= value2,
        showTime,
        showTime,
      );
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'before',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(filterItem, (value1, value2) => value1 < value2, showTime, true);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'onOrBefore',
    getApplyFilterFn: (filterItem) => {
      return buildApplyFilterFn(
        filterItem,
        (value1, value2) => value1 <= value2,
        showTime,
        showTime,
      );
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'isEmpty',
    getApplyFilterFn: () => {
      return (value): boolean => {
        return value == null;
      };
    },
    requiresFilterValue: false,
  },
  {
    value: 'isNotEmpty',
    getApplyFilterFn: () => {
      return (value): boolean => {
        return value != null;
      };
    },
    requiresFilterValue: false,
  },
  {
    value: 'between',
    getApplyFilterFn: (filterItem) => {
      if (
        !Array.isArray(filterItem.value) ||
        filterItem.value[0] == null ||
        filterItem.value[1] == null
      ) {
        return null;
      }
      const startDate = new Date(filterItem.value[0]);
      const endDate = new Date(filterItem.value[1]);
      if (showTime) {
        startDate.setSeconds(0, 0);
        endDate.setSeconds(0, 0);
      } else {
        startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
        startDate.setHours(0, 0, 0, 0);
        endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());
        endDate.setHours(0, 0, 0, 0);
      }
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      return (value: Date): boolean => {
        if (!value) {
          return false;
        }
        const dateCopy = new Date(value);
        if (showTime) {
          dateCopy.setSeconds(0, 0);
        } else {
          dateCopy.setHours(0, 0, 0, 0);
        }
        const t = dateCopy.getTime();
        return t >= startTime && t <= endTime;
      };
    },
    InputComponent: GridFilterInputDateRange,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'notBetween',
    getApplyFilterFn: (filterItem) => {
      if (
        !Array.isArray(filterItem.value) ||
        filterItem.value[0] == null ||
        filterItem.value[1] == null
      ) {
        return null;
      }
      const startDate = new Date(filterItem.value[0]);
      const endDate = new Date(filterItem.value[1]);
      if (showTime) {
        startDate.setSeconds(0, 0);
        endDate.setSeconds(0, 0);
      } else {
        startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
        startDate.setHours(0, 0, 0, 0);
        endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());
        endDate.setHours(0, 0, 0, 0);
      }
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      return (value: Date): boolean => {
        if (!value) {
          return false;
        }
        const dateCopy = new Date(value);
        if (showTime) {
          dateCopy.setSeconds(0, 0);
        } else {
          dateCopy.setHours(0, 0, 0, 0);
        }
        const t = dateCopy.getTime();
        return t < startTime || t > endTime;
      };
    },
    InputComponent: GridFilterInputDateRange,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'in',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      const filterDates = filterItem.value
        .filter(Boolean)
        .map((v: string) => {
          const d = new Date(v);
          if (showTime) {
            d.setSeconds(0, 0);
          } else {
            d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
            d.setHours(0, 0, 0, 0);
          }
          return d.getTime();
        });
      if (filterDates.length === 0) {
        return null;
      }
      return (value: Date): boolean => {
        if (!value) {
          return false;
        }
        const dateCopy = new Date(value);
        if (showTime) {
          dateCopy.setSeconds(0, 0);
        } else {
          dateCopy.setHours(0, 0, 0, 0);
        }
        return filterDates.includes(dateCopy.getTime());
      };
    },
    InputComponent: GridFilterInputMultipleValue,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
  {
    value: 'notIn',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      const filterDates = filterItem.value
        .filter(Boolean)
        .map((v: string) => {
          const d = new Date(v);
          if (showTime) {
            d.setSeconds(0, 0);
          } else {
            d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
            d.setHours(0, 0, 0, 0);
          }
          return d.getTime();
        });
      if (filterDates.length === 0) {
        return null;
      }
      return (value: Date): boolean => {
        if (!value) {
          return false;
        }
        const dateCopy = new Date(value);
        if (showTime) {
          dateCopy.setSeconds(0, 0);
        } else {
          dateCopy.setHours(0, 0, 0, 0);
        }
        return !filterDates.includes(dateCopy.getTime());
      };
    },
    InputComponent: GridFilterInputMultipleValue,
    InputComponentProps: { type: showTime ? 'datetime-local' : 'date' },
  },
];
