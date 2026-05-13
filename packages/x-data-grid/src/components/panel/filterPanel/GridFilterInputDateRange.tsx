'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useId from '@mui/utils/useId';
import type { GridFilterInputValueProps } from '../../../models/gridFilterInputComponent';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import type { GridFilterInputDateProps } from './GridFilterInputDate';

export type GridFilterInputDateRangeProps = GridFilterInputValueProps<
  Omit<GridFilterInputDateProps, 'item' | 'applyValue' | 'apiRef' | 'focusElementRef'>
> & {
  type?: 'date' | 'datetime-local';
};

function GridFilterInputDateRange(props: GridFilterInputDateRangeProps) {
  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef,
    tabIndex,
    disabled,
    isFilterActive,
    slotProps,
    clearButton,
    headerFilterMenu,
    ...other
  } = props;
  const textFieldProps = slotProps?.root;

  const rootProps = useGridRootProps();

  const [startValue, setStartValue] = React.useState<string>(
    Array.isArray(item.value) && item.value[0] != null ? String(item.value[0]) : '',
  );
  const [endValue, setEndValue] = React.useState<string>(
    Array.isArray(item.value) && item.value[1] != null ? String(item.value[1]) : '',
  );

  const idStart = useId();
  const idEnd = useId();

  React.useEffect(() => {
    const value = item.value ?? [];
    setStartValue(value[0] != null ? String(value[0]) : '');
    setEndValue(value[1] != null ? String(value[1]) : '');
  }, [item.value]);

  const handleStartChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStart = event.target.value;
      setStartValue(newStart);
      applyValue({ ...item, value: [newStart || null, endValue || null] });
    },
    [applyValue, endValue, item],
  );

  const handleEndChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newEnd = event.target.value;
      setEndValue(newEnd);
      applyValue({ ...item, value: [startValue || null, newEnd || null] });
    },
    [applyValue, item, startValue],
  );

  return (
    <React.Fragment>
      <rootProps.slots.baseTextField
        id={idStart}
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
        value={startValue}
        onChange={handleStartChange}
        type={type || 'date'}
        disabled={disabled}
        slotProps={{
          ...textFieldProps?.slotProps,
          htmlInput: {
            tabIndex,
            max: endValue || undefined,
            ...textFieldProps?.slotProps?.htmlInput,
          },
        }}
        inputRef={focusElementRef}
        {...rootProps.slotProps?.baseTextField}
        {...other}
        {...textFieldProps}
      />
      <rootProps.slots.baseTextField
        id={idEnd}
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
        value={endValue}
        onChange={handleEndChange}
        type={type || 'date'}
        disabled={disabled}
        slotProps={{
          ...textFieldProps?.slotProps,
          htmlInput: {
            min: startValue || undefined,
            ...textFieldProps?.slotProps?.htmlInput,
          },
        }}
        {...rootProps.slotProps?.baseTextField}
        {...other}
        {...textFieldProps}
      />
      {headerFilterMenu}
      {clearButton}
    </React.Fragment>
  );
}

GridFilterInputDateRange.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  clearButton: PropTypes.node,
  disabled: PropTypes.bool,
  focusElementRef: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  headerFilterMenu: PropTypes.node,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: (props, propName) => {
        if (props[propName] == null) {
          return null;
        }
        if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
          return new Error(`Expected prop '${propName}' to be of type Element`);
        }
        return null;
      },
    }),
  ]),
  /**
   * It is `true` if the filter either has a value or an operator with no value
   * required is selected (for example `isEmpty`)
   */
  isFilterActive: PropTypes.bool,
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operator: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  slotProps: PropTypes.object,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(['date', 'datetime-local']),
} as any;

export { GridFilterInputDateRange };
