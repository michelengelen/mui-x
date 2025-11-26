import * as React from 'react';
import { EditorState, Transaction, Command } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser, DOMSerializer } from 'prosemirror-model';
import { editorSchema } from '../schema';
import { setupPlugins } from '../plugins';

export interface UseProseMirrorOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface UseProseMirrorReturn {
  editorView: React.MutableRefObject<EditorView | null>;
  editorState: EditorState | null;
  executeCommand: (command: Command) => void;
}

export const useProseMirror = (options: UseProseMirrorOptions): UseProseMirrorReturn => {
  const {
    value,
    defaultValue = '',
    onChange,
    placeholder,
    readOnly = false,
    onFocus,
    onBlur,
  } = options;

  const [editorState, setEditorState] = React.useState<EditorState | null>(null);
  const editorView = React.useRef<EditorView | null>(null);
  const isUpdatingRef = React.useRef(false);

  // Initialize editor state
  React.useEffect(() => {
    const initialContent = value !== undefined ? value : defaultValue;
    
    // Parse initial HTML content
    const container = document.createElement('div');
    container.innerHTML = initialContent;
    const doc = DOMParser.fromSchema(editorSchema).parse(container);

    const state = EditorState.create({
      doc,
      schema: editorSchema,
      plugins: setupPlugins({ placeholder }),
    });

    setEditorState(state);

    // Create editor view
    const viewContainer = document.createElement('div');
    const view = new EditorView(viewContainer, {
      state,
      editable: () => !readOnly,
      dispatchTransaction: (transaction: Transaction) => {
        if (isUpdatingRef.current) return;

        const newState = view.state.apply(transaction);
        view.updateState(newState);
        setEditorState(newState);

        if (transaction.docChanged && onChange) {
          const serializer = DOMSerializer.fromSchema(editorSchema);
          const fragment = serializer.serializeFragment(newState.doc.content);
          const tempDiv = document.createElement('div');
          tempDiv.appendChild(fragment);
          onChange(tempDiv.innerHTML);
        }
      },
      handleDOMEvents: {
        focus: (view, event) => {
          onFocus?.(event);
          return false;
        },
        blur: (view, event) => {
          onBlur?.(event);
          return false;
        },
      },
    });

    editorView.current = view;

    return () => {
      view.destroy();
    };
  }, []); // Only initialize once

  // Update content when value prop changes (controlled mode)
  React.useEffect(() => {
    if (value !== undefined && editorView.current && !isUpdatingRef.current) {
      const view = editorView.current;
      const currentHtml = (() => {
        const serializer = DOMSerializer.fromSchema(editorSchema);
        const fragment = serializer.serializeFragment(view.state.doc.content);
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(fragment);
        return tempDiv.innerHTML;
      })();

      if (currentHtml !== value) {
        isUpdatingRef.current = true;
        
        const container = document.createElement('div');
        container.innerHTML = value;
        const doc = DOMParser.fromSchema(editorSchema).parse(container);
        
        const newState = EditorState.create({
          doc,
          schema: editorSchema,
          plugins: view.state.plugins,
          selection: view.state.selection,
        });
        
        view.updateState(newState);
        setEditorState(newState);
        
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 0);
      }
    }
  }, [value]);

  // Update readOnly state
  React.useEffect(() => {
    if (editorView.current) {
      editorView.current.setProps({
        editable: () => !readOnly,
      });
    }
  }, [readOnly]);

  const executeCommand = React.useCallback((command: Command) => {
    if (editorView.current) {
      const { state, dispatch } = editorView.current;
      command(state, dispatch);
    }
  }, []);

  return {
    editorView,
    editorState,
    executeCommand,
  };
};
