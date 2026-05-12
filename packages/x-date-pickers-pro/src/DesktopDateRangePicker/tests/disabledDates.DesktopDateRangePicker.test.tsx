import * as React from 'react';
import { screen, within } from '@mui/internal-test-utils';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { createPickerRenderer, adapterToUse, openPicker } from 'test/utils/pickers';
import { vi } from 'vitest';

const getPickerDay = (name: string, picker = 'January 2018') =>
  within(screen.getByRole('grid', { name: picker })).getByRole('gridcell', { name });

describe('<DesktopDateRangePicker /> - Disabled dates', () => {
  const { render } = createPickerRenderer();

  beforeEach(() => {
    vi.setSystemTime(new Date(2018, 0, 10));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should respect the disablePast prop', async () => {
    const { user } = render(<DesktopDateRangePicker disablePast />);

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    expect(getPickerDay('8')).to.have.attribute('disabled');
    expect(getPickerDay('9')).to.have.attribute('disabled');
    expect(getPickerDay('10')).not.to.have.attribute('disabled');
    expect(getPickerDay('11')).not.to.have.attribute('disabled');
    expect(getPickerDay('12')).not.to.have.attribute('disabled');
  });

  it('should respect the disableFuture prop', async () => {
    const { user } = render(<DesktopDateRangePicker disableFuture />);

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    expect(getPickerDay('8')).not.to.have.attribute('disabled');
    expect(getPickerDay('9')).not.to.have.attribute('disabled');
    expect(getPickerDay('10')).not.to.have.attribute('disabled');
    expect(getPickerDay('11')).to.have.attribute('disabled');
    expect(getPickerDay('12')).to.have.attribute('disabled');
  });

  it('should respect the minDate prop', async () => {
    const { user } = render(<DesktopDateRangePicker minDate={adapterToUse.date('2018-01-15')} />);

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    expect(getPickerDay('13')).to.have.attribute('disabled');
    expect(getPickerDay('14')).to.have.attribute('disabled');
    expect(getPickerDay('15')).not.to.have.attribute('disabled');
    expect(getPickerDay('16')).not.to.have.attribute('disabled');
    expect(getPickerDay('17')).not.to.have.attribute('disabled');
  });

  it('should respect the maxDate prop', async () => {
    const { user } = render(<DesktopDateRangePicker maxDate={adapterToUse.date('2018-01-15')} />);

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    expect(getPickerDay('13')).not.to.have.attribute('disabled');
    expect(getPickerDay('14')).not.to.have.attribute('disabled');
    expect(getPickerDay('15')).not.to.have.attribute('disabled');
    expect(getPickerDay('16')).to.have.attribute('disabled');
    expect(getPickerDay('17')).to.have.attribute('disabled');
  });
});
