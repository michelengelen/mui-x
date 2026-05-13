'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useId from '@mui/utils/useId';
import { useTimeout } from '../../../hooks/utils/useTimeout';
import type { TextFieldProps } from '../../../models/gridBaseSlots';
import type { GridFilterInputValueProps } from '../../../models/gridFilterInputComponent';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';

export type GridFilterInputValueRangeProps = GridFilterInputValueProps<TextFieldProps> & {
  type?: 'number';
};

function GridFilterInputValueRange(props: GridFilterInputValueRangeProps) {
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
  const filterTimeout = useTimeout();

  const [filterValueState, setFilterValueState] = React.useState<[string, string]>(() => {
    const value = item.value ?? [];
    return [value[0] != null ? String(value[0]) : '', value[1] != null ? String(value[1]) : ''];
  });
  const [applying, setIsApplying] = React.useState(false);

  const idStart = useId();
  const idEnd = useId();

  React.useEffect(() => {
    const value = item.value ?? [];
    setFilterValueState([
      value[0] != null ? String(value[0]) : '',
      value[1] != null ? String(value[1]) : '',
    ]);
  }, [item.value]);

  const applyRange = React.useCallback(
    (start: string, end: string) => {
      setIsApplying(true);
      filterTimeout.start(rootProps.filterDebounceMs, () => {
        const startNum =
          start !== '' && !Number.isNaN(Number(start)) ? Number(start) : undefined;
        const endNum = end !== '' && !Number.isNaN(Number(end)) ? Number(end) : undefined;
        applyValue({ ...item, value: [startNum, endNum] });
        setIsApplying(false);
      });
    },
    [applyValue, filterTimeout, item, rootProps.filterDebounceMs],
  );

  const handleStartChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStart = event.target.value;
      setFilterValueState((prev) => [newStart, prev[1]]);
      applyRange(newStart, filterValueState[1]);
    },
    [applyRange, filterValueState],
  );

  const handleEndChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newEnd = event.target.value;
      setFilterValueState((prev) => [prev[0], newEnd]);
      applyRange(filterValueState[0], newEnd);
    },
    [applyRange, filterValueState],
  );

  return (
    <React.Fragment>
      <rootProps.slots.baseTextField
        id={idStart}
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
        value={filterValueState[0]}
        onChange={handleStartChange}
        type={type || 'number'}
        disabled={disabled}
        slotProps={{
          ...textFieldProps?.slotProps,
          input: {
            endAdornment: applying ? (
              <rootProps.slots.loadIcon fontSize="small" color="action" />
            ) : null,
            ...textFieldProps?.slotProps?.input,
          },
          htmlInput: {
            tabIndex,
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
        value={filterValueState[1]}
        onChange={handleEndChange}
        type={type || 'number'}
        disabled={disabled}
        slotProps={{
          ...textFieldProps?.slotProps,
          input: {
            endAdornment: applying ? (
              <rootProps.slots.loadIcon fontSize="small" color="action" />
            ) : null,
            ...textFieldProps?.slotProps?.input,
          },
          htmlInput: {
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

GridFilterInputValueRange.propTypes = {
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
  type: PropTypes.oneOf(['number']),
} as any;

export { GridFilterInputValueRange };
