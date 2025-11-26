import { MarkSpec } from 'prosemirror-model';

const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(dom: any) {
        return {
          href: dom.getAttribute('href'),
          title: dom.getAttribute('title'),
        };
      },
    },
  ],
  toDOM(node) {
    const { href, title } = node.attrs;
    return ['a', { href, title }, 0];
  },
};

const bold: MarkSpec = {
  parseDOM: [
    { tag: 'strong' },
    { tag: 'b', getAttrs: (node: any) => node.style.fontWeight !== 'normal' && null },
    {
      style: 'font-weight',
      getAttrs: (value: any) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
    },
  ],
  toDOM() {
    return ['strong', 0];
  },
};

const italic: MarkSpec = {
  parseDOM: [
    { tag: 'i' },
    { tag: 'em' },
    { style: 'font-style=italic' },
  ],
  toDOM() {
    return ['em', 0];
  },
};

const underline: MarkSpec = {
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration=underline' },
  ],
  toDOM() {
    return ['span', { style: 'text-decoration: underline' }, 0];
  },
};

const strikethrough: MarkSpec = {
  parseDOM: [
    { tag: 's' },
    { tag: 'strike' },
    { style: 'text-decoration=line-through' },
  ],
  toDOM() {
    return ['s', 0];
  },
};

const code: MarkSpec = {
  parseDOM: [{ tag: 'code' }],
  toDOM() {
    return ['code', 0];
  },
};

export const marks: Record<string, MarkSpec> = {
  link,
  bold,
  italic,
  underline,
  strikethrough,
  code,
};
