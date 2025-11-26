import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface EditorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the toolbar element. */
  toolbar: string;
  /** Styles applied to the content element. */
  content: string;
  /** Styles applied to the root element if disabled. */
  disabled: string;
  /** Styles applied to the root element if focused. */
  focused: string;
}

export type EditorClassKey = keyof EditorClasses;

export function getEditorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiEditor', slot);
}

export const editorClasses: EditorClasses = generateUtilityClasses('MuiEditor', [
  'root',
  'toolbar',
  'content',
  'disabled',
  'focused',
]);
