import * as React from 'react';
import { spy } from 'sinon';
import { screen, fireEvent, createEvent, within, fireTouchChangedEvent } from '@mui/internal-test-utils';
import {
  adapterToUse,
  buildPickerDragInteractions,
  rangeCalendarDayTouches,
  createPickerRenderer,
} from 'test/utils/pickers';
import { MockedDataTransfer } from 'test/utils/dragAndDrop';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { RangePosition } from '../models';

const getPickerDay = (name: string, picker = 'January 2018') =>
  within(screen.getByRole('grid', { name: picker })).getByRole('gridcell', { name });

const dynamicShouldDisableDate = (date: PickerValidDate, position: RangePosition) => {
  if (position === 'end') {
    return adapterToUse.getDate(date) % 3 === 0;
  }
  return adapterToUse.getDate(date) % 5 === 0;
};

describe('<DateRangeCalendar /> - Dragging behavior', () => {
  const { render } = createPickerRenderer();

  let dataTransfer: DataTransfer | null;

  const { executeDateDragWithoutDrop, executeDateDrag } = buildPickerDragInteractions(
    () => dataTransfer,
  );

  type TouchTarget = Pick<Touch, 'clientX' | 'clientY'>;

  const fireTouchEvent = (
    type: 'touchstart' | 'touchmove' | 'touchend',
    target: Element,
    touch: TouchTarget,
  ) => {
    fireTouchChangedEvent(target, type, { changedTouches: [touch] });
  };

  const executeDateTouchDragWithoutEnd = (target: Element, ...touchTargets: TouchTarget[]) => {
    fireTouchEvent('touchstart', target, touchTargets[0]);
    touchTargets.slice(0, touchTargets.length - 1).forEach((touch) => {
      fireTouchEvent('touchmove', target, touch);
    });
  };

  const executeDateTouchDrag = (target: Element, ...touchTargets: TouchTarget[]) => {
    const endTouchTarget = touchTargets[touchTargets.length - 1];
    executeDateTouchDragWithoutEnd(target, ...touchTargets);
    fireTouchEvent('touchend', target, endTouchTarget);
  };

  beforeEach(() => {
    dataTransfer = new MockedDataTransfer();
  });

  afterEach(() => {
    dataTransfer = null;
  });

  it('should not emit "onChange" when dragging is ended where it was started', () => {
    const onChange = spy();
    render(
      <DateRangeCalendar
        onChange={onChange}
        defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-31')]}
      />,
    );

    const startDay = screen.getByRole('gridcell', { name: '31', selected: true });
    const dragToDay = screen.getByRole('gridcell', { name: '30' });
    expect(onChange.callCount).to.equal(0);

    executeDateDrag(startDay, dragToDay, startDay);

    expect(onChange.callCount).to.equal(0);
  });

  it.skipIf(!document.elementFromPoint)(
    'should not emit "onChange" when touch dragging is ended where it was started',
    () => {
      const onChange = spy();
      render(
        <DateRangeCalendar
          onChange={onChange}
          defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-10')]}
        />,
      );

      const startDay = screen.getByRole('gridcell', { name: '1', selected: true });
      expect(onChange.callCount).to.equal(0);

      executeDateTouchDrag(
        startDay,
        rangeCalendarDayTouches['2018-01-01'],
        rangeCalendarDayTouches['2018-01-02'],
        rangeCalendarDayTouches['2018-01-01'],
      );

      expect(onChange.callCount).to.equal(0);
    },
  );

  it('should emit "onChange" when dragging end date', () => {
    const onChange = spy();
    const initialValue: [any, any] = [
      adapterToUse.date('2018-01-10'),
      adapterToUse.date('2018-01-31'),
    ];
    render(<DateRangeCalendar onChange={onChange} defaultValue={initialValue} />);

    // test range reduction
    executeDateDrag(
      screen.getByRole('gridcell', { name: '31', selected: true }),
      screen.getByRole('gridcell', { name: '30' }),
      screen.getByRole('gridcell', { name: '29' }),
    );

    expect(onChange.callCount).to.equal(1);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 29));
    expect(document.activeElement).toHaveAccessibleName('29');

    // test range expansion
    executeDateDrag(
      screen.getByRole('gridcell', { name: '29', selected: true }),
      screen.getByRole('gridcell', { name: '30' }),
    );

    expect(onChange.callCount).to.equal(2);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 30));
    expect(document.activeElement).toHaveAccessibleName('30');

    // test range flip
    executeDateDrag(
      screen.getByRole('gridcell', { name: '30', selected: true }),
      getPickerDay('2'),
    );

    expect(onChange.callCount).to.equal(3);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 2));
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[0]);
    expect(document.activeElement).toHaveAccessibleName('2');
  });

  it.skipIf(!document.elementFromPoint)(
    'should emit "onChange" when touch dragging end date',
    () => {
      const onChange = spy();
      const initialValue: [any, any] = [
        adapterToUse.date('2018-01-02'),
        adapterToUse.date('2018-01-11'),
      ];
      render(<DateRangeCalendar onChange={onChange} defaultValue={initialValue} />);

      // test range reduction
      executeDateTouchDrag(
        getPickerDay('11'),
        rangeCalendarDayTouches['2018-01-11'],
        rangeCalendarDayTouches['2018-01-10'],
      );

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 10));

      // test range expansion
      executeDateTouchDrag(
        getPickerDay('10'),
        rangeCalendarDayTouches['2018-01-10'],
        rangeCalendarDayTouches['2018-01-11'],
      );

      expect(onChange.callCount).to.equal(2);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[1]);

      // test range flip
      executeDateTouchDrag(
        getPickerDay('11'),
        rangeCalendarDayTouches['2018-01-11'],
        rangeCalendarDayTouches['2018-01-01'],
      );

      expect(onChange.callCount).to.equal(3);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 1));
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[0]);
    },
  );

  it('should emit "onChange" when dragging start date', () => {
    const onChange = spy();
    const initialValue: [any, any] = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-20'),
    ];
    render(<DateRangeCalendar onChange={onChange} defaultValue={initialValue} />);

    // test range reduction
    executeDateDrag(getPickerDay('1'), getPickerDay('2'), getPickerDay('3'));

    expect(onChange.callCount).to.equal(1);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 3));
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[1]);
    expect(document.activeElement).toHaveAccessibleName('3');

    // test range expansion
    executeDateDrag(getPickerDay('3'), getPickerDay('1'));

    expect(onChange.callCount).to.equal(2);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[1]);
    expect(document.activeElement).toHaveAccessibleName('1');

    // test range flip
    executeDateDrag(getPickerDay('1'), getPickerDay('22'));

    expect(onChange.callCount).to.equal(3);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[1]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 22));
    expect(document.activeElement).toHaveAccessibleName('22');
  });

  it.skipIf(!document.elementFromPoint)(
    'should emit "onChange" when touch dragging start date',
    () => {
      const onChange = spy();
      const initialValue: [any, any] = [
        adapterToUse.date('2018-01-01'),
        adapterToUse.date('2018-01-10'),
      ];
      render(<DateRangeCalendar onChange={onChange} defaultValue={initialValue} />);

      // test range reduction
      executeDateTouchDrag(
        getPickerDay('1'),
        rangeCalendarDayTouches['2018-01-01'],
        rangeCalendarDayTouches['2018-01-02'],
      );

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(new Date(2018, 0, 2));
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[1]);

      // test range expansion
      executeDateTouchDrag(
        getPickerDay('2'),
        rangeCalendarDayTouches['2018-01-02'],
        rangeCalendarDayTouches['2018-01-01'],
      );

      expect(onChange.callCount).to.equal(2);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(initialValue[1]);

      // test range flip
      executeDateTouchDrag(
        getPickerDay('1'),
        rangeCalendarDayTouches['2018-01-01'],
        rangeCalendarDayTouches['2018-01-11'],
      );

      expect(onChange.callCount).to.equal(3);
      expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[1]);
      expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 11));
    },
  );

  it('should dynamically update "shouldDisableDate" when flip dragging', () => {
    const initialValue: [any, any] = [
      adapterToUse.date('2018-01-01'),
      adapterToUse.date('2018-01-07'),
    ];
    render(
      <DateRangeCalendar
        defaultValue={initialValue}
        shouldDisableDate={dynamicShouldDisableDate}
        calendars={1}
      />,
    );

    expect(screen.getByRole('gridcell', { name: '5' })).to.have.attribute('disabled');
    expect(
      screen.getAllByRole<HTMLButtonElement>('gridcell').filter((c) => c.disabled),
    ).to.have.lengthOf(6);
    // flip date range
    executeDateDragWithoutDrop(
      screen.getByRole('gridcell', { name: '1' }),
      screen.getByRole('gridcell', { name: '4' }),
      screen.getByRole('gridcell', { name: '10' }),
    );

    expect(screen.getByRole('gridcell', { name: '9' })).to.have.attribute('disabled');
    expect(
      screen.getAllByRole<HTMLButtonElement>('gridcell').filter((c) => c.disabled),
    ).to.have.lengthOf(10);
  });

  it.skipIf(!document.elementFromPoint)(
    'should dynamically update "shouldDisableDate" when flip touch dragging',
    () => {
      const initialValue: [any, any] = [
        adapterToUse.date('2018-01-01'),
        adapterToUse.date('2018-01-07'),
      ];
      render(
        <DateRangeCalendar
          defaultValue={initialValue}
          shouldDisableDate={dynamicShouldDisableDate}
          calendars={1}
        />,
      );

      expect(screen.getByRole('gridcell', { name: '5' })).to.have.attribute('disabled');
      expect(
        screen.getAllByRole<HTMLButtonElement>('gridcell').filter((c) => c.disabled),
      ).to.have.lengthOf(6);
      // flip date range
      executeDateTouchDragWithoutEnd(
        screen.getByRole('gridcell', { name: '1' }),
        rangeCalendarDayTouches['2018-01-01'],
        rangeCalendarDayTouches['2018-01-09'],
        rangeCalendarDayTouches['2018-01-10'],
      );

      expect(screen.getByRole('gridcell', { name: '9' })).to.have.attribute('disabled');
      expect(
        screen.getAllByRole<HTMLButtonElement>('gridcell').filter((c) => c.disabled),
      ).to.have.lengthOf(10);
    },
  );

  it('should handle drag events targeting child elements inside the day button', () => {
    // This test validates the fix for when drag events target child elements (e.g., text spans)
    // inside the day button, rather than the button itself. The fix uses .closest() to find
    // the ancestor with the data-timestamp attribute.
    const onChange = spy();
    const initialValue: [PickerValidDate, PickerValidDate] = [
      adapterToUse.date('2018-01-10'),
      adapterToUse.date('2018-01-31'),
    ];
    render(<DateRangeCalendar onChange={onChange} defaultValue={initialValue} />);

    const startDayButton = screen.getByRole('gridcell', { name: '31', selected: true });
    const endDayButton = screen.getByRole('gridcell', { name: '29' });

    // Create synthetic child elements inside the buttons to simulate the real browser scenario
    // where drag events can target child elements (e.g., text spans, TouchRipple).
    // This ensures the `.closest()` fallback path is exercised.
    const startDayChild = document.createElement('span');
    startDayButton.appendChild(startDayChild);
    const endDayChild = document.createElement('span');
    endDayButton.appendChild(endDayChild);

    // Execute drag using child elements as targets
    // This simulates a user clicking on the day number text or ripple effect
    const createDragEventOnChild = (
      type: 'dragStart' | 'dragEnter' | 'dragOver' | 'drop' | 'dragEnd' | 'dragLeave',
      target: Element,
    ) => {
      const createdEvent = createEvent[type](target);
      Object.defineProperty(createdEvent, 'dataTransfer', { value: dataTransfer });
      return createdEvent;
    };

    fireEvent(startDayChild, createDragEventOnChild('dragStart', startDayChild));
    fireEvent(startDayChild, createDragEventOnChild('dragLeave', startDayChild));
    fireEvent(endDayChild, createDragEventOnChild('dragEnter', endDayChild));
    fireEvent(endDayChild, createDragEventOnChild('dragOver', endDayChild));
    fireEvent(endDayChild, createDragEventOnChild('drop', endDayChild));
    fireEvent(endDayChild, createDragEventOnChild('dragEnd', endDayChild));

    expect(onChange.callCount).to.equal(1);
    expect(onChange.lastCall.args[0][0]).toEqualDateTime(initialValue[0]);
    expect(onChange.lastCall.args[0][1]).toEqualDateTime(new Date(2018, 0, 29));
  });

  it('should not initiate drag on non-draggable dates', () => {
    const onChange = spy();
    render(
      <DateRangeCalendar
        onChange={onChange}
        defaultValue={[adapterToUse.date('2018-01-10'), adapterToUse.date('2018-01-20')]}
      />,
    );

    // Try to drag from a non-selected (non-endpoint) date
    const middleDay = getPickerDay('15');
    const targetDay = getPickerDay('25');

    executeDateDrag(middleDay, targetDay);

    // No change should occur since middle day is not draggable
    expect(onChange.callCount).to.equal(0);
  });
});
