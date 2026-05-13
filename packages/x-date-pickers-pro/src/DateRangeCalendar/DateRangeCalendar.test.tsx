import * as React from 'react';
import { spy } from 'sinon';
import { screen, fireEvent, within, waitFor } from '@mui/internal-test-utils';
import { adapterToUse, createPickerRenderer } from 'test/utils/pickers';
import {
  DateRangeCalendar,
  dateRangeCalendarClasses as classes,
} from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { describeConformance } from 'test/utils/describeConformance';

// Dragging-specific tests are in dragging.DateRangeCalendar.test.tsx

const getPickerDay = (name: string, picker = 'January 2018') =>
  within(screen.getByRole('grid', { name: picker })).getByRole('gridcell', { name });

describe('<DateRangeCalendar />', () => {
  const { render } = createPickerRenderer();

  describeConformance(<DateRangeCalendar />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiDateRangeCalendar',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeVariants'],
  }));

  describe('Selection', () => {
    it('should select the range from the next month', async () => {
      const onChange = spy();

      const { user } = render(
        <DateRangeCalendar
          onChange={onChange}
          defaultValue={[adapterToUse.date('2019-01-01'), null]}
        />,
      );

      await user.click(getPickerDay('1', 'January 2019'));

      const [visibleButton] = screen.getAllByRole('button', {
        name: 'Next month',
      });
      await user.click(visibleButton);

      await waitFor(() => {
        getPickerDay('19', 'March 2019');
      });

      await user.click(getPickerDay('19', 'March 2019'));

      expect(onChange.callCount).to.equal(2);

      const rangeOn1stCall = onChange.firstCall.firstArg;
      expect(rangeOn1stCall[0]).to.toEqualDateTime(new Date(2019, 0, 1));
      expect(rangeOn1stCall[1]).to.equal(null);

      const rangeOn2ndCall = onChange.lastCall.firstArg;
      expect(rangeOn2ndCall[0]).to.toEqualDateTime(new Date(2019, 0, 1));
      expect(rangeOn2ndCall[1]).to.toEqualDateTime(new Date(2019, 2, 19));
    });

    it('should continue start selection if selected "end" date is before start', async () => {
      const onChange = spy();

      const { user } = render(
        <DateRangeCalendar onChange={onChange} referenceDate={adapterToUse.date('2019-01-01')} />,
      );

      await user.click(getPickerDay('30', 'January 2019'));
      await user.click(getPickerDay('19', 'January 2019'));

      expect(screen.queryByTestId('DateRangeHighlight')).to.equal(null);

      await user.click(getPickerDay('30', 'January 2019'));

      expect(onChange.callCount).to.equal(3);
      const range = onChange.lastCall.firstArg;
      expect(range[0]).to.toEqualDateTime(new Date(2019, 0, 19));
      expect(range[1]).to.toEqualDateTime(new Date(2019, 0, 30));
    });

    it('should highlight the selected range of dates', () => {
      render(
        <DateRangeCalendar
          defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-31')]}
        />,
      );

      expect(screen.getAllByTestId('DateRangeHighlight')).to.have.length(31);
    });

    it('prop: disableDragEditing - should not allow dragging range', () => {
      render(
        <DateRangeCalendar
          defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-31')]}
          disableDragEditing
        />,
      );

      expect(screen.getByRole('gridcell', { name: '1', selected: true })).to.not.have.attribute(
        'draggable',
      );
      expect(screen.getByRole('gridcell', { name: '31', selected: true })).to.not.have.attribute(
        'draggable',
      );
    });

    // Dragging-specific tests → dragging.DateRangeCalendar.test.tsx
  });

  describe('Component slot: Day', () => {
    it('should render custom day component', () => {
      render(
        <DateRangeCalendar
          slots={{
            day: (day) => <div key={String(day)} data-testid="slot used" />,
          }}
        />,
      );

      expect(screen.getAllByTestId('slot used')).not.to.have.length(0);
    });
  });

  describe('prop: disableAutoMonthSwitching', () => {
    it('should go to the month of the end date when changing the start date', async () => {
      const { user } = render(
        <DateRangeCalendar
          defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-07-01')]}
        />,
      );

      await user.click(getPickerDay('5', 'January 2018'));
      await waitFor(() => {
        expect(getPickerDay('1', 'July 2018')).not.to.equal(null);
      });
    });

    it('should not go to the month of the end date when changing the start date and props.disableAutoMonthSwitching = true', async () => {
      const { user } = render(
        <DateRangeCalendar
          defaultValue={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-07-01')]}
          disableAutoMonthSwitching
        />,
      );

      await user.click(getPickerDay('5', 'January 2018'));
      await waitFor(() => {
        expect(getPickerDay('1', 'January 2018')).not.to.equal(null);
      });
    });

    it('should go to the month of the start date when changing both date from the outside', async () => {
      const { setProps } = render(
        <DateRangeCalendar
          value={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-07-01')]}
        />,
      );

      setProps({
        value: [adapterToUse.date('2018-04-01'), adapterToUse.date('2018-04-01')],
      });
      await waitFor(() => {
        expect(getPickerDay('1', 'April 2018')).not.to.equal(null);
      });
    });

    describe('prop: currentMonthCalendarPosition', () => {
      it('should switch to the selected month when changing value from the outside', async () => {
        const { setProps } = render(
          <DateRangeCalendar
            value={[adapterToUse.date('2018-01-10'), adapterToUse.date('2018-01-15')]}
            currentMonthCalendarPosition={2}
          />,
        );

        setProps({
          value: [adapterToUse.date('2018-02-11'), adapterToUse.date('2018-02-22')],
        });

        await waitFor(() => {
          expect(getPickerDay('1', 'February 2018')).not.to.equal(null);
        });
      });
    });
  });

  ['readOnly', 'disabled'].forEach((prop) => {
    it(`prop: ${prop}="true" should not allow date editing`, async () => {
      const handleChange = spy();
      const { user } = render(
        <DateRangeCalendar
          value={[adapterToUse.date('2018-01-01'), adapterToUse.date('2018-01-10')]}
          onChange={handleChange}
          {...{ [prop]: true }}
        />,
      );
      expect(screen.getByRole('gridcell', { name: '1', selected: true })).to.not.have.attribute(
        'draggable',
      );
      expect(screen.getByRole('gridcell', { name: '10', selected: true })).to.not.have.attribute(
        'draggable',
      );
      if (prop === 'disabled') {
        // eslint-disable-next-line vitest/no-conditional-expect
        expect(screen.getByRole('gridcell', { name: '1', selected: true })).to.have.attribute(
          'disabled',
        );
      }
      await user.setup({ pointerEventsCheck: 0 }).click(getPickerDay('2'));
      expect(handleChange.callCount).to.equal(0);
    });
  });

  it('prop: calendars - should render the provided amount of calendars', () => {
    render(<DateRangeCalendar calendars={3} />);

    expect(screen.getAllByTestId('pickers-calendar')).to.have.length(3);
  });

  describe('Performance', () => {
    it('should only render the new start day when selecting a start day without a previously selected start day', () => {
      const RenderCount = spy((props) => <DateRangePickerDay {...props} />);

      render(
        <DateRangeCalendar
          referenceDate={adapterToUse.date('2018-01-01')}
          slots={{
            day: React.memo(RenderCount),
          }}
        />,
      );

      const renderCountBeforeChange = RenderCount.callCount;
      // sticking with `fireEvent` for simplified performance test
      fireEvent.click(getPickerDay('2'));
      expect(RenderCount.callCount - renderCountBeforeChange).to.equal(2); // 2 render * 1 day
    });

    it('should only render the day inside range when selecting the end day', () => {
      const RenderCount = spy((props) => <DateRangePickerDay {...props} />);

      render(
        <DateRangeCalendar
          referenceDate={adapterToUse.date('2018-01-01')}
          slots={{
            day: React.memo(RenderCount),
          }}
        />,
      );

      fireEvent.click(getPickerDay('2'));

      const renderCountBeforeChange = RenderCount.callCount;
      // sticking with `fireEvent` for simplified performance test
      fireEvent.click(getPickerDay('4'));
      expect(RenderCount.callCount - renderCountBeforeChange).to.equal(6); // 2 render * 3 day
    });
  });
});
