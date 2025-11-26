import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';
import { inputRules } from './inputRules';
import { buildKeymap } from './keymap';
import { placeholderPlugin } from './placeholder';

export function setupPlugins(options: {
  placeholder?: string;
  mapKeys?: Record<string, string>;
}): Plugin[] {
  const plugins = [
    inputRules,
    keymap(buildKeymap(options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    history(),
  ];

  if (options.placeholder) {
    plugins.push(placeholderPlugin(options.placeholder));
  }

  return plugins;
}

export * from './inputRules';
export * from './keymap';
export * from './placeholder';
