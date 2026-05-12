import * as React from 'react';
import { screen, act, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import {
  createPickerRenderer,
  adapterToUse,
  AdapterClassToUse,
  openPicker,
  getFieldSectionsContainer,
} from 'test/utils/pickers';

describe('<DesktopDateRangePicker />', () => {
  const { render } = createPickerRenderer();

  it('should scroll current month to the active selection when focusing appropriate field (multi input field)', async () => {
    const { user } = render(
      <DesktopDateRangePicker
        reduceAnimations
        defaultValue={[adapterToUse.date('2019-05-19'), adapterToUse.date('2019-10-30')]}
        slots={{ field: MultiInputDateRangeField }}
      />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(screen.getByText('May 2019')).toBeVisible();

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'end',
      fieldType: 'multi-input',
    });
    expect(screen.getByText('October 2019')).toBeVisible();

    // scroll back
    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'multi-input',
    });
    expect(screen.getByText('May 2019')).toBeVisible();
  });

  it(`should not crash when opening picker with invalid date value`, async () => {
    const { user } = render(
      <DesktopDateRangePicker defaultValue={[new Date(NaN), adapterToUse.date('2019-01-31')]} />,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('should respect localeText from the theme', () => {
    const theme = createTheme({
      components: {
        MuiLocalizationProvider: {
          defaultProps: {
            localeText: { start: 'Início', end: 'Fim' },
          },
        },
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterClassToUse}>
          <DesktopDateRangePicker
            // We set the variant to standard to avoid having the label rendered in two places.
            slotProps={{
              textField: {
                variant: 'standard',
              },
            }}
            slots={{ field: MultiInputDateRangeField }}
          />
        </LocalizationProvider>
      </ThemeProvider>,
    );

    expect(screen.queryByText('Início')).not.to.equal(null);
    expect(screen.queryByText('Fim')).not.to.equal(null);
  });

  it('should add focused class to the field when it is focused', async () => {
    render(<DesktopDateRangePicker />);

    const sectionsContainer = getFieldSectionsContainer();
    await act(async () => sectionsContainer.focus());

    expect(sectionsContainer.parentElement).to.have.class('Mui-focused');
  });

  it('should render the input with a given `name`', () => {
    render(<DesktopDateRangePicker name="test" />);
    expect(screen.getByRole<HTMLInputElement>('textbox', { hidden: true }).name).to.equal('test');
  });

  // picker state tests → pickerState.DesktopDateRangePicker.test.tsx
  // disabled dates tests → disabledDates.DesktopDateRangePicker.test.tsx

  it('should close the Picker and move focus to the text field when clicking it', async () => {
    const { user } = render(
      <React.Fragment>
        <input aria-label="decoy" />
        <DesktopDateRangePicker />
      </React.Fragment>,
    );

    await openPicker(user, {
      type: 'date-range',
      initialFocus: 'start',
      fieldType: 'single-input',
    });

    const decoyInput = screen.getByRole('textbox', { name: 'decoy' });
    await user.click(decoyInput);

    await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
    // the input should be focused—the new active element
    expect(document.activeElement!).to.equal(decoyInput);
  });
});
