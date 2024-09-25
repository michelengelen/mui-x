import type { EditorState } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import * as React from 'react';

export interface EditorContextValue {
  editorView: EditorView | null;
  editorState: EditorState;
}

export const EditorContext = React.createContext(null as unknown as EditorContextValue);
