import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface EditorProps {
  /**
   * The value of the editor.
   */
  value?: string;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string;
  /**
   * Callback fired when the value changes.
   * @param {string} value The new value.
   */
  onChange?: (value: string) => void;
  /**
   * The placeholder text.
   * @default 'Start typing...'
   */
  placeholder?: string;
  /**
   * If `true`, the editor is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the editor is read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If `true`, displays the toolbar.
   * @default true
   */
  toolbar?: boolean;
  /**
   * Configuration for the toolbar.
   */
  toolbarConfig?: ToolbarConfig;
  /**
   * The height of the editor.
   * @default 400
   */
  height?: number | string;
  /**
   * Minimum height of the editor.
   * @default 200
   */
  minHeight?: number | string;
  /**
   * Maximum height of the editor.
   */
  maxHeight?: number | string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Record<string, string>>;
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Callback fired when the editor gains focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /**
   * Callback fired when the editor loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

export interface ToolbarConfig {
  /**
   * Show/hide formatting buttons (bold, italic, underline).
   * @default true
   */
  formatting?: boolean;
  /**
   * Show/hide alignment buttons.
   * @default true
   */
  alignment?: boolean;
  /**
   * Show/hide list buttons.
   * @default true
   */
  lists?: boolean;
  /**
   * Show/hide block format buttons (quote, code).
   * @default true
   */
  blocks?: boolean;
  /**
   * Show/hide insert buttons (link, image).
   * @default true
   */
  inserts?: boolean;
  /**
   * Custom toolbar items.
   */
  custom?: ToolbarItem[];
}

export interface ToolbarItem {
  /**
   * Unique identifier for the toolbar item.
   */
  id: string;
  /**
   * Icon to display.
   */
  icon?: React.ReactNode;
  /**
   * Label for the toolbar item.
   */
  label: string;
  /**
   * Callback when the item is clicked.
   */
  onClick: () => void;
  /**
   * If true, the item is disabled.
   */
  disabled?: boolean;
}

export interface EditorState {
  content: string;
  selection: Selection | null;
  format: FormatState;
  history: HistoryState;
}

export interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  alignment: 'left' | 'center' | 'right' | 'justify';
  listType: 'bullet' | 'numbered' | null;
  blockType: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'code' | null;
}

export interface HistoryState {
  canUndo: boolean;
  canRedo: boolean;
}

export interface Selection {
  start: number;
  end: number;
  text: string;
}
