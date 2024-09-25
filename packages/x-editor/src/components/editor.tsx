import * as React from 'react';
import * as ReactDOM from 'react-dom';
// eslint-disable-next-line no-restricted-imports
import { Box } from '@mui/material';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import type { Plugin, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { EditorContext, EditorContextValue } from './editorContext';

export interface EditorProps {
  defaultState?: EditorState;
  state?: EditorState;
  plugins?: Plugin[];
  marks?: string[];
  dispatchTransaction?(this: EditorView, tr: Transaction): void;
  mountRef: HTMLElement | null;
  children?: React.ReactNode | null;
}

const emptySchema = new Schema({
  nodes: {
    doc: { content: 'text*' },
    text: { inline: true },
  },
  marks: {
    strong: {
      parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        { tag: 'b', getAttrs: (node: HTMLElement) => node.style.fontWeight !== 'normal' && null },
        { style: 'font-weight=400', clearMark: (m) => m.type.name === 'strong' },
        {
          style: 'font-weight',
          getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
        },
      ],
      toDOM() {
        return ['strong', 0];
      },
    },
  },
});

const emptyState = EditorState.create({
  schema: emptySchema,
});

function RootEditor({ mountRef, children, ...props }: EditorProps) {
  const defaultState = props.defaultState ?? emptyState;
  const [state, setState] = React.useState<EditorState>(defaultState);
  const s = props.state ?? state;

  function dispatchTransaction(this: EditorView, tr: Transaction) {
    ReactDOM.flushSync(() => {
      if (!props.state) {
        setState((_s) => _s.apply(tr));
      }

      if (props.dispatchTransaction) {
        props.dispatchTransaction.call(this, tr);
      }
    });
  }

  const directEditorProps = {
    ...props,
    state,
    dispatchTransaction,
  };

  /**
   * Editor View handling
   */
  const [view, setView] = React.useState<EditorView | null>(null);

  // we need this to destroy the editor view when we unmount the component
  React.useLayoutEffect(() => () => view?.destroy(), [view]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (view) {
      if (view.dom === mountRef) {
        view.setProps(directEditorProps);
      } else {
        setView(null);
      }
    } else if (mountRef) {
      setView(new EditorView({ mount: mountRef }, directEditorProps));
    }
  });

  const context: EditorContextValue = React.useMemo(
    () => ({ editorState: s, editorView: view }),
    [s, view],
  );
  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>;
}

function Editor({ children, ...rest }: { children?: React.ReactNode; marks?: string[] }) {
  const [mount, setMount] = React.useState<HTMLDivElement | null>(null);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        outline: '1px solid grey',
        ':focus-within': { outline: '2px solid blue' },
      }}
    >
      <RootEditor mountRef={mount} {...rest}>
        {children}
        <Box ref={setMount} sx={{ p: 2, ':focus-visible': { outline: 'none' } }} />
      </RootEditor>
    </Box>
  );
}

export { Editor, EditorView, Schema as EditorSchema };
