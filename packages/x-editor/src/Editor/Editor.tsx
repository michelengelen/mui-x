import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useEditor } from '../hooks/useEditor';
import { EditorToolbar } from './EditorToolbar';
import { EditorContent } from './EditorContent';
import { EditorProps } from '../models';
import { getEditorUtilityClass } from './editorClasses';

const useUtilityClasses = (ownerState: EditorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    content: ['content'],
  };

  return composeClasses(slots, getEditorUtilityClass, classes);
};

const EditorRoot = styled('div', {
  name: 'MuiEditor',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
}));

/**
 * A WYSIWYG rich text editor component for MUI.
 */
const Editor = React.forwardRef<HTMLDivElement, EditorProps>(function Editor(
  props,
  ref,
) {
  const {
    value = '',
    defaultValue = '',
    onChange,
    placeholder = 'Start typing...',
    disabled = false,
    readOnly = false,
    toolbar = true,
    toolbarConfig,
    height = 400,
    minHeight = 200,
    maxHeight,
    className,
    sx,
    ...other
  } = props;

  const theme = useTheme();
  const classes = useUtilityClasses(props);
  const { editorState, handleChange, executeCommand } = useEditor({
    value,
    defaultValue,
    onChange,
  });

  return (
    <EditorRoot
      ref={ref}
      className={`${classes.root} ${className || ''}`}
      sx={{
        height,
        minHeight,
        maxHeight,
        ...sx,
      }}
      {...other}
    >
      {toolbar && (
        <EditorToolbar
          className={classes.toolbar}
          disabled={disabled || readOnly}
          config={toolbarConfig}
          onCommand={executeCommand}
          editorState={editorState}
        />
      )}
      <EditorContent
        className={classes.content}
        value={editorState.content}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      />
    </EditorRoot>
  );
});

Editor.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them, edit the TypeScript types and run "pnpm proptypes" |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.string,
  /**
   * If `true`, the editor is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The height of the editor.
   * @default 400
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Maximum height of the editor.
   */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum height of the editor.
   * @default 200
   */
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Callback fired when the value changes.
   * @param {string} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * The placeholder text.
   * @default 'Start typing...'
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the editor is read-only.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * If `true`, displays the toolbar.
   * @default true
   */
  toolbar: PropTypes.bool,
  /**
   * Configuration for the toolbar.
   */
  toolbarConfig: PropTypes.object,
  /**
   * The value of the editor.
   */
  value: PropTypes.string,
} as any;

export { Editor };
