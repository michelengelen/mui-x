import {
  toggleMark,
  setBlockType,
  wrapIn,
  chainCommands,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode,
} from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { editorSchema } from '../schema';

export function buildKeymap(mapKeys?: Record<string, string>) {
  const keys: Record<string, any> = {};
  const bind = (key: string, cmd: any) => {
    if (mapKeys) {
      const mapped = mapKeys[key];
      if (mapped === false) return;
      if (mapped) key = mapped;
    }
    keys[key] = cmd;
  };

  // Formatting
  bind('Mod-b', toggleMark(editorSchema.marks.bold));
  bind('Mod-i', toggleMark(editorSchema.marks.italic));
  bind('Mod-u', toggleMark(editorSchema.marks.underline));
  bind('Mod-`', toggleMark(editorSchema.marks.code));

  // History
  bind('Mod-z', undo);
  bind('Mod-y', redo);
  bind('Mod-Shift-z', redo);
  bind('Backspace', undoInputRule);

  // Block formatting
  bind('Shift-Ctrl-0', setBlockType(editorSchema.nodes.paragraph));
  bind('Shift-Ctrl-1', setBlockType(editorSchema.nodes.heading, { level: 1 }));
  bind('Shift-Ctrl-2', setBlockType(editorSchema.nodes.heading, { level: 2 }));
  bind('Shift-Ctrl-3', setBlockType(editorSchema.nodes.heading, { level: 3 }));
  bind('Shift-Ctrl-4', setBlockType(editorSchema.nodes.heading, { level: 4 }));
  bind('Shift-Ctrl-5', setBlockType(editorSchema.nodes.heading, { level: 5 }));
  bind('Shift-Ctrl-6', setBlockType(editorSchema.nodes.heading, { level: 6 }));
  bind('Shift-Ctrl-\\', setBlockType(editorSchema.nodes.code_block));

  // Quotes
  bind('Ctrl->', wrapIn(editorSchema.nodes.blockquote));

  // Navigation and selection
  bind('Alt-ArrowUp', joinUp);
  bind('Alt-ArrowDown', joinDown);
  bind('Mod-BracketLeft', lift);
  bind('Escape', selectParentNode);

  return keys;
}
