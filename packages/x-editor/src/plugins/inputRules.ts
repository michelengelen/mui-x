import {
  inputRules as createInputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  InputRule,
} from 'prosemirror-inputrules';
import { editorSchema } from '../schema';

// Create input rules for markdown-like shortcuts
export const inputRules = createInputRules({
  rules: [
    // Headings
    textblockTypeInputRule(/^(#{1,6})\s$/, editorSchema.nodes.heading, (match) => ({
      level: match[1].length,
    })),
    
    // Blockquote
    wrappingInputRule(/^\s*>\s$/, editorSchema.nodes.blockquote),
    
    // Bullet list
    wrappingInputRule(/^\s*([-+*])\s$/, editorSchema.nodes.bullet_list),
    
    // Ordered list
    wrappingInputRule(
      /^\s*(\d+)\.\s$/,
      editorSchema.nodes.ordered_list,
      (match) => ({ order: +match[1] }),
      (match, node) => node.childCount + node.attrs.order === +match[1]
    ),
    
    // Code block
    textblockTypeInputRule(/^```$/, editorSchema.nodes.code_block),
    
    // Horizontal rule
    new InputRule(/^(?:---|___\s|\*\*\*\s)$/, (state, match, start, end) => {
      const tr = state.tr.replaceRangeWith(start, end, editorSchema.nodes.horizontal_rule.create());
      return tr;
    }),
  ],
});
