import * as React from 'react';
import { useEditorState } from './useEditorState';
import { useEditorCommands } from './useEditorCommands';
import { EditorCommand, EditorState } from '../models';

export interface UseEditorOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface UseEditorReturn {
  editorState: EditorState;
  handleChange: (value: string) => void;
  executeCommand: (command: EditorCommand) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export const useEditor = (options: UseEditorOptions): UseEditorReturn => {
  const { value, defaultValue = '', onChange } = options;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  
  const { editorState, updateState } = useEditorState(currentValue);
  const { executeCommand } = useEditorCommands(editorState, updateState);

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        // Uncontrolled mode
        setInternalValue(newValue);
      }
      // Call onChange in both controlled and uncontrolled modes
      onChange?.(newValue);
      updateState({ content: newValue });
    },
    [value, onChange, updateState]
  );

  const undo = React.useCallback(() => {
    executeCommand({ type: 'undo' });
  }, [executeCommand]);

  const redo = React.useCallback(() => {
    executeCommand({ type: 'redo' });
  }, [executeCommand]);

  const clear = React.useCallback(() => {
    handleChange('');
  }, [handleChange]);

  return {
    editorState,
    handleChange,
    executeCommand,
    undo,
    redo,
    clear,
  };
};
