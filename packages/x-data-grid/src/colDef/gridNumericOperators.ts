import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import { GridFilterInputValueRange } from '../components/panel/filterPanel/GridFilterInputValueRange';
import type { GridFilterOperator } from '../models/gridFilterOperator';
import type { GridFilterInputValueProps } from '../models/gridFilterInputComponent';
import type { GetApplyQuickFilterFn } from '../models/colDef/gridColDef';

const parseNumericValue = (value: unknown) => {
  if (value == null) {
    return null;
  }

  return Number(value);
};

export const getGridNumericQuickFilterFn: GetApplyQuickFilterFn<any, number | string | null> = (
  value,
) => {
  if (value == null || Number.isNaN(value) || value === '') {
    return null;
  }

  return (columnValue) => {
    return parseNumericValue(columnValue) === parseNumericValue(value);
  };
};

export const getGridNumericOperators = (): GridFilterOperator<
  any,
  number | string | null,
  any,
  GridFilterInputValueProps & { type?: 'number' }
>[] => [
  {
    value: '=',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        return parseNumericValue(value) === filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
  },
  {
    value: '!=',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        return parseNumericValue(value) !== filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
  },
  {
    value: '>',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        if (value == null) {
          return false;
        }

        return parseNumericValue(value)! > filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
  },
  {
    value: '>=',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        if (value == null) {
          return false;
        }

        return parseNumericValue(value)! >= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
  },
  {
    value: '<',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        if (value == null) {
          return false;
        }

        return parseNumericValue(value)! < filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
  },
  {
    value: '<=',
    getApplyFilterFn: (filterItem) => {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return (value): boolean => {
        if (value == null) {
          return false;
        }

        return parseNumericValue(value)! <= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: { type: 'number' },
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
    value: 'isAnyOf',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }

      return (value): boolean => {
        return value != null && filterItem.value.includes(Number(value));
      };
    },
    InputComponent: GridFilterInputMultipleValue,
    InputComponentProps: { type: 'number' },
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
      const [min, max] = filterItem.value.map(Number);
      if (Number.isNaN(min) || Number.isNaN(max)) {
        return null;
      }
      return (value): boolean => {
        if (value == null) {
          return false;
        }
        const numValue = parseNumericValue(value)!;
        return numValue >= min && numValue <= max;
      };
    },
    InputComponent: GridFilterInputValueRange,
    InputComponentProps: { type: 'number' },
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
      const [min, max] = filterItem.value.map(Number);
      if (Number.isNaN(min) || Number.isNaN(max)) {
        return null;
      }
      return (value): boolean => {
        if (value == null) {
          return false;
        }
        const numValue = parseNumericValue(value)!;
        return numValue < min || numValue > max;
      };
    },
    InputComponent: GridFilterInputValueRange,
    InputComponentProps: { type: 'number' },
  },
];
