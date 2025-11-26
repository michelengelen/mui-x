import * as React from 'react';
import { EditorState, FormatState } from '../models';

const initialFormatState: FormatState = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  alignment: 'left',
  listType: null,
  blockType: 'paragraph',
};

const initialState: EditorState = {
  content: '',
  selection: null,
  format: initialFormatState,
  history: {
    canUndo: false,
    canRedo: false,
  },
};

export const useEditorState = (initialContent: string) => {
  const [editorState, setEditorState] = React.useState<EditorState>({
    ...initialState,
    content: initialContent,
  });

  const updateState = React.useCallback(
    (updates: Partial<EditorState>) => {
      setEditorState((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    []
  );

  // Update content when initialContent changes
  React.useEffect(() => {
    setEditorState((prev) => ({
      ...prev,
      content: initialContent,
    }));
  }, [initialContent]);

  return { editorState, updateState };
};
