import { Command } from 'prosemirror-state';
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { editorSchema } from '../schema';

// Text formatting commands
export const toggleBold = (): Command => toggleMark(editorSchema.marks.bold);
export const toggleItalic = (): Command => toggleMark(editorSchema.marks.italic);
export const toggleUnderline = (): Command => toggleMark(editorSchema.marks.underline);
export const toggleStrikethrough = (): Command => toggleMark(editorSchema.marks.strikethrough);
export const toggleCode = (): Command => toggleMark(editorSchema.marks.code);

// Block formatting commands
export const setParagraph = (): Command => setBlockType(editorSchema.nodes.paragraph);
export const setHeading = (level: number): Command => 
  setBlockType(editorSchema.nodes.heading, { level });
export const setCodeBlock = (): Command => setBlockType(editorSchema.nodes.code_block);
export const toggleBlockquote = (): Command => wrapIn(editorSchema.nodes.blockquote);

// List commands
export const toggleBulletList = (): Command => wrapInList(editorSchema.nodes.bullet_list);
export const toggleOrderedList = (): Command => wrapInList(editorSchema.nodes.ordered_list);
export const splitListItemCommand = (): Command => splitListItem(editorSchema.nodes.list_item);
export const liftListItemCommand = (): Command => liftListItem(editorSchema.nodes.list_item);
export const sinkListItemCommand = (): Command => sinkListItem(editorSchema.nodes.list_item);

// Link commands
export const addLink = (href: string, title?: string): Command => {
  return (state, dispatch) => {
    const { selection } = state;
    if (selection.empty) return false;
    
    if (dispatch) {
      dispatch(
        state.tr.addMark(
          selection.from,
          selection.to,
          editorSchema.marks.link.create({ href, title })
        )
      );
    }
    return true;
  };
};

export const removeLink = (): Command => {
  return (state, dispatch) => {
    const { selection } = state;
    if (dispatch) {
      dispatch(state.tr.removeMark(selection.from, selection.to, editorSchema.marks.link));
    }
    return true;
  };
};

// Image commands
export const insertImage = (src: string, alt?: string, title?: string): Command => {
  return (state, dispatch) => {
    const node = editorSchema.nodes.image.create({ src, alt, title });
    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(node));
    }
    return true;
  };
};

// Horizontal rule command
export const insertHorizontalRule = (): Command => {
  return (state, dispatch) => {
    const node = editorSchema.nodes.horizontal_rule.create();
    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(node));
    }
    return true;
  };
};

// Alignment commands (these require custom node attributes)
export const setAlignment = (align: 'left' | 'center' | 'right' | 'justify'): Command => {
  return (state, dispatch) => {
    // This would require extending the schema with alignment attributes
    // For now, returning true as a placeholder
    return true;
  };
};
