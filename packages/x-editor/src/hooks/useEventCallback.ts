import * as React from 'react';
import type { EditorView } from 'prosemirror-view';

import { EditorContext } from '../components/editorContext';

function useEditorEventCallback<T extends unknown[], R>(
  callback: (view: EditorView, ...args: T) => R,
) {
  const ref = React.useRef(callback);
  const { editorView } = React.useContext(EditorContext);

  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return React.useCallback(
    // eslint-disable-next-line consistent-return
    (...args: T) => {
      if (editorView) {
        return ref.current(editorView, ...args);
      }
    },
    [editorView],
  );
}

export { useEditorEventCallback };
