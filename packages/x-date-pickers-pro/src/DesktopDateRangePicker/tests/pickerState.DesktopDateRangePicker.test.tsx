import * as React from 'react';
import { spy } from 'sinon';
import { fireEvent, screen, act, within, waitFor } from '@mui/internal-test-utils';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import {
  createPickerRenderer,
  adapterToUse,
  openPicker,
  getFieldSectionsContainer,
} from 'test/utils/pickers';

const getPickerDay = (name: string, picker = 'January 2018') =>
  within(screen.getByRole('grid', { name: picker })).getByRole('gridcell', { name });

describe('<DesktopDateRangePicker /> - Picker state', () => {
  const { render } = createPickerRenderer();

  it('should open when clicking the start input (multi input field)', async () => {
    const onOpen = spy();

    const { user } = render(
      <DesktopDateRangePicker onOpen={onOpen} slots={{ field: MultiInputDateRangeField }} />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });

    expect(onOpen.callCount).to.equal(1);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('should open when clicking the end input (multi input field)', async () => {
    const onOpen = spy();

    const { user } = render(
      <DesktopDateRangePicker onOpen={onOpen} slots={{ field: MultiInputDateRangeField }} />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });

    expect(onOpen.callCount).to.equal(1);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  ['Enter', 'Space'].forEach((key) =>
    it(`should open when pressing "${key}" in the start input (multi input field)`, async () => {
      const onOpen = spy();

      const { user } = render(
        <DesktopDateRangePicker onOpen={onOpen} slots={{ field: MultiInputDateRangeField }} />,
      );

      const startInput = getFieldSectionsContainer();
      await act(async () => startInput.focus());
      await user.keyboard(`[${key}]`);

      expect(onOpen.callCount).to.equal(1);
      expect(screen.getByRole('tooltip')).toBeVisible();
    }),
  );

  ['Enter', 'Space'].forEach((key) =>
    it(`should open when pressing "${key}" in the end input (multi input field)`, async () => {
      const onOpen = spy();

      const { user } = render(
        <DesktopDateRangePicker onOpen={onOpen} slots={{ field: MultiInputDateRangeField }} />,
      );

      const endInput = getFieldSectionsContainer(1);
      await act(async () => endInput.focus());
      await user.keyboard(`[${key}]`);

      expect(onOpen.callCount).to.equal(1);
      expect(screen.getByRole('tooltip')).toBeVisible();
    }),
  );

  it('should call onChange with updated start date then call onChange with updated end date, onClose and onAccept with update date range when opening from start input', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={defaultValue}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    // Open the picker
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);

    // Change the start date
    await user.click(getPickerDay('3'));
    expect(onChange.callCount).to.equal(1);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(defaultValue[1]);

    // Change the end date
    await user.click(getPickerDay('5'));
    expect(onChange.callCount).to.equal(2);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 5));

    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onAccept.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 5));
    expect(onClose.callCount).to.equal(1);
  });

  it('should call onChange with updated end date, onClose and onAccept with update date range when opening from end input (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={defaultValue}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    // Open the picker
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);

    // Change the end date
    // `fireEvent.click` preserves the exact synthetic-event sequence that
    // the callback-count assertions below depend on. `user.click` fires a
    // full pointer sequence that can trigger an extra `onClose`.
    fireEvent.click(getPickerDay('3'));
    expect(onChange.callCount).to.equal(1);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(defaultValue[0]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0][0]).toEqualDateTime(defaultValue[0]);
    expect(onAccept.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onClose.callCount).to.equal(1);
  });

  it('should not call onClose and onAccept when selecting the end date if props.closeOnSelect = false (multi input field)', async () => {
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <DesktopDateRangePicker
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={defaultValue}
        closeOnSelect={false}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });

    // Change the end date
    await user.click(getPickerDay('3'));

    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);
  });

  it('should call onClose and onAccept with the live value when pressing Escape', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={defaultValue}
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    // Change the start date (already tested)
    await user.click(getPickerDay('3'));

    // Dismiss the picker
    await user.keyboard('[Escape]');
    expect(onChange.callCount).to.equal(1); // Start date change
    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onAccept.lastCall.args[0][1]).toEqualDateTime(defaultValue[1]);
    expect(onClose.callCount).to.equal(1);
  });

  it('should call onClose when clicking outside of the picker without prior change (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <div>
        <input id="test-id" />
        <DesktopDateRangePicker
          onChange={onChange}
          onAccept={onAccept}
          onClose={onClose}
          slots={{ field: MultiInputDateRangeField }}
        />
      </div>,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });

    // Dismiss the picker
    const input = document.getElementById('test-id')!;

    await user.pointer({ keys: '[MouseLeft>]', target: input });

    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(1);
  });

  it('should call onClose and onAccept with the live value when clicking outside of the picker (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <div>
        <DesktopDateRangePicker
          onChange={onChange}
          onAccept={onAccept}
          onClose={onClose}
          defaultValue={defaultValue}
          slots={{ field: MultiInputDateRangeField }}
        />
        <input id="test-id" />
      </div>,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });

    // Change the start date (already tested)
    await user.click(getPickerDay('3'));

    // Dismiss the picker
    const input = document.getElementById('test-id')!;

    await user.click(input);

    // Start date change
    expect(onChange.callCount).to.equal(1);
    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onAccept.lastCall.args[0][1]).toEqualDateTime(defaultValue[1]);
    expect(onClose.callCount).to.equal(1);
  });

  it('should not call onClose or onAccept when clicking outside of the picker if not opened (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    // Dismiss the picker
    await user.click(document.body);
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);
  });

  // test:unit does not call `blur` when focusing another element.
  it('should call onClose when blur the current field without prior change (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <React.Fragment>
        <DesktopDateRangePicker
          onChange={onChange}
          onAccept={onAccept}
          onClose={onClose}
          slots={{ field: MultiInputDateRangeField }}
        />
        <button type="button" id="test">
          focus me
        </button>
      </React.Fragment>,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(screen.getByRole('tooltip')).toBeVisible();

    await act(async () => document.querySelector<HTMLButtonElement>('#test')!.focus());

    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    await waitFor(() => {
      expect(onClose.callCount).to.equal(1);
    });
  });

  it('should call onClose and onAccept when blur the current field (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <div>
        <DesktopDateRangePicker
          defaultValue={defaultValue}
          onChange={onChange}
          onAccept={onAccept}
          onClose={onClose}
          slots={{ field: MultiInputDateRangeField }}
        />
        <button id="test" />
      </div>,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(screen.getByRole('tooltip')).toBeVisible();

    // Change the start date (already tested)
    await user.click(getPickerDay('3'));

    expect(onAccept.callCount).to.equal(0);

    await user.click(document.querySelector<HTMLButtonElement>('#test')!);

    // Start date change
    expect(onChange.callCount).to.equal(1);
    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onAccept.lastCall.args[0][1]).toEqualDateTime(defaultValue[1]);
    expect(onClose.callCount).to.equal(1);
  });

  it('should call onClose, onChange with empty value and onAccept with empty value when pressing the "Clear" button', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();
    const defaultValue: DateRange<PickerValidDate> = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-06'),
    ];

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={defaultValue}
        slotProps={{ actionBar: { actions: ['clear'] } }}
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    // Clear the date
    await user.click(screen.getByText(/clear/i));
    expect(onChange.callCount).to.equal(1); // Start date change
    expect(onChange.lastCall.args[0]).to.deep.equal([null, null]);
    expect(onAccept.callCount).to.equal(1);
    expect(onAccept.lastCall.args[0]).to.deep.equal([null, null]);
    expect(onClose.callCount).to.equal(1);
  });

  it('should not call onChange or onAccept when pressing "Clear" button with an already null value', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        slotProps={{ actionBar: { actions: ['clear'] } }}
        value={[null, null]}
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    // Clear the date
    await user.click(screen.getByText(/clear/i));
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(1);
  });

  it.todo(
    'should call onClose and onAccept with the live value when clicking outside of the picker',
    () => {
      // TODO: Write test
    },
  );

  it('should not close picker when switching focus from start to end input (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-06')]}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    // Open the picker (already tested)
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });

    // Switch to end date
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);
  });

  it('should not close picker when switching focus from end to start input (multi input field)', async () => {
    const onChange = spy();
    const onAccept = spy();
    const onClose = spy();

    const { user } = render(
      <DesktopDateRangePicker
        onChange={onChange}
        onAccept={onAccept}
        onClose={onClose}
        defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-06')]}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    // Open the picker (already tested)
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });

    // Switch to start date
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(onChange.callCount).to.equal(0);
    expect(onAccept.callCount).to.equal(0);
    expect(onClose.callCount).to.equal(0);
  });

  it('should work with separate start and end "reference" dates', async () => {
    const { user } = render(
      <DesktopDateRangePicker
        referenceDate={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-06')]}
        defaultRangePosition="end"
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    expect(document.activeElement).to.equal(getPickerDay('6'));
  });
});
