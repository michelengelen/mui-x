import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import type { Plugin, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorContext, EditorContextValue } from './editorContext';

const emptySchema = new Schema({
  nodes: {
    doc: { content: 'text*' },
    text: { inline: true },
  },
});

export interface EditorProps {
  defaultState?: EditorState;
  state?: EditorState;
  plugins?: Plugin[];
  dispatchTransaction?(this: EditorView, tr: Transaction): void;
  mount: HTMLElement | null;
  children?: React.ReactNode | null;
}

const emptyState = EditorState.create({
  schema: emptySchema,
});

function RootEditor({ mount, children, ...options }: EditorProps) {
  const defaultState = options.defaultState ?? emptyState;
  const [state, setState] = React.useState<EditorState>(defaultState);
  const s = options.state ?? state;

  function dispatchTransaction(this: EditorView, tr: Transaction) {
    ReactDOM.flushSync(() => {
      if (!options.state) {
        setState((s) => s.apply(tr));
      }

      if (options.dispatchTransaction) {
        options.dispatchTransaction.call(this, tr);
      }
    });
  }

  const directEditorProps = {
    ...options,
    state,
    dispatchTransaction,
  };

  const [view, setView] = React.useState<EditorView | null>(null);

  React.useLayoutEffect(() => {
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [view]);

  // This effect runs on every render and handles the view lifecycle.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (view) {
      if (view.dom === mount) {
        view.setProps(directEditorProps);
      } else {
        setView(null);
      }
    } else if (mount) {
      setView(new EditorView({ mount }, directEditorProps));
    }
  });

  const context: EditorContextValue = {
    editorState: s,
    editorView: view,
  };

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>;
}

export { RootEditor };
