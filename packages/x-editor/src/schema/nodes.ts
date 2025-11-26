import { NodeSpec } from 'prosemirror-model';

const doc: NodeSpec = {
  content: 'block+',
};

const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM() {
    return ['p', 0];
  },
};

const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() {
    return ['blockquote', 0];
  },
};

const heading: NodeSpec = {
  attrs: {
    level: { default: 1 },
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [
    { tag: 'h1', attrs: { level: 1 } },
    { tag: 'h2', attrs: { level: 2 } },
    { tag: 'h3', attrs: { level: 3 } },
    { tag: 'h4', attrs: { level: 4 } },
    { tag: 'h5', attrs: { level: 5 } },
    { tag: 'h6', attrs: { level: 6 } },
  ],
  toDOM(node) {
    return ['h' + node.attrs.level, 0];
  },
};

const codeBlock: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
  toDOM() {
    return ['pre', ['code', 0]];
  },
};

const text: NodeSpec = {
  group: 'inline',
};

const image: NodeSpec = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(dom: any) {
        return {
          src: dom.getAttribute('src'),
          title: dom.getAttribute('title'),
          alt: dom.getAttribute('alt'),
        };
      },
    },
  ],
  toDOM(node) {
    const { src, alt, title } = node.attrs;
    return ['img', { src, alt, title }];
  },
};

const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM() {
    return ['br'];
  },
};

const orderedList: NodeSpec = {
  content: 'listItem+',
  group: 'block',
  attrs: {
    order: { default: 1 },
  },
  parseDOM: [
    {
      tag: 'ol',
      getAttrs(dom: any) {
        return {
          order: dom.hasAttribute('start') ? +dom.getAttribute('start')! : 1,
        };
      },
    },
  ],
  toDOM(node) {
    return node.attrs.order === 1
      ? ['ol', 0]
      : ['ol', { start: node.attrs.order }, 0];
  },
};

const bulletList: NodeSpec = {
  content: 'listItem+',
  group: 'block',
  parseDOM: [{ tag: 'ul' }],
  toDOM() {
    return ['ul', 0];
  },
};

const listItem: NodeSpec = {
  content: 'paragraph block*',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  },
  defining: true,
};

const horizontalRule: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM() {
    return ['hr'];
  },
};

export const nodes: Record<string, NodeSpec> = {
  doc,
  paragraph,
  blockquote,
  heading,
  code_block: codeBlock,
  text,
  image,
  hard_break: hardBreak,
  ordered_list: orderedList,
  bullet_list: bulletList,
  list_item: listItem,
  horizontal_rule: horizontalRule,
};
