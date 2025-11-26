import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const placeholderPlugin = (placeholder: string) => {
  return new Plugin({
    key: new PluginKey('placeholder'),
    props: {
      decorations(state) {
        const { doc } = state;
        if (
          doc.childCount === 1 &&
          doc.firstChild?.isBlock &&
          doc.firstChild.content.size === 0
        ) {
          const decoration = Decoration.node(0, 2, {
            class: 'editor-placeholder',
            'data-placeholder': placeholder,
          });
          return DecorationSet.create(doc, [decoration]);
        }
        return DecorationSet.empty;
      },
    },
  });
};
