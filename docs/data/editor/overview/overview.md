---
productId: x-editor
title: React Editor component overview
components: Editor
packageName: '@mui/x-editor'
githubLabel: 'component: editor'
materialDesign: false
---

# MUI X Editor

<p class="description">A feature-rich WYSIWYG editor component built on top of ProseMirror for React applications.</p>

The MUI X Editor component provides users with a powerful rich text editing experience, enabling them to create and format content with an intuitive interface. Built on the robust ProseMirror framework, it offers reliability, extensibility, and excellent performance.

## Overview

The Editor component includes the following features out of the box:

### Text Formatting
- **Bold**, _italic_, <u>underline</u>, and ~~strikethrough~~ text
- Inline `code` formatting
- Keyboard shortcuts for all formatting options

### Block Elements
- Headings (H1-H6)
- Paragraphs
- Block quotes
- Code blocks with syntax preservation
- Horizontal rules

### Lists
- Bulleted lists
- Numbered lists
- Nested list support
- Keyboard shortcuts for list manipulation

### Rich Content
- Links with href and title attributes
- Images with alt text support
- Extensible schema for custom content types

### Input Methods
- Markdown-style shortcuts (e.g., `#` for headings, `*` for lists)
- Keyboard shortcuts for common operations
- Paste handling with format preservation
- Drag and drop support

### History & State Management
- Undo/Redo with keyboard shortcuts
- Transaction-based state updates
- Controlled and uncontrolled modes

## When to use

The Editor component is ideal for applications that require:

- **Content management systems** - Blog posts, articles, documentation
- **Collaboration tools** - Comments, notes, descriptions
- **Email composers** - Rich email content creation
- **Form builders** - Long-form text inputs with formatting
- **Knowledge bases** - Formatted documentation and guides

## Architecture

The Editor is built on top of [ProseMirror](https://prosemirror.net/), which provides:

- **Schema-driven** - Document structure is defined by a schema, ensuring consistency
- **Immutable state** - All changes are transactions, making the editor predictable
- **Plugin system** - Extend functionality through ProseMirror plugins
- **Collaborative editing ready** - Can be extended with operational transformation or CRDTs

## Comparison with alternatives

### vs. ContentEditable

While native `contentEditable` is simple to implement, the MUI X Editor provides:

- Consistent behavior across browsers
- Structured document model
- Reliable undo/redo
- Better handling of paste and keyboard input
- Extensible command system

### vs. Draft.js

Compared to Draft.js, the MUI X Editor offers:

- More active development and community
- Better mobile support
- More flexible schema system
- Superior handling of complex content like tables
- Smaller bundle size for basic features

### vs. Slate

While Slate is also schema-based, the MUI X Editor provides:

- More mature ecosystem
- Better documentation
- Battle-tested in production
- More predictable API
- MUI design system integration

## Basic usage

```tsx
import { Editor } from '@mui/x-editor';

function MyComponent() {
  const [value, setValue] = React.useState('<p>Hello World!</p>');

  return (
    <Editor
      value={value}
      onChange={setValue}
      placeholder="Start typing..."
      height={400}
    />
  );
}
```

## Styling and customization

The Editor component is built with MUI's design system and supports:

- Theme integration via `ThemeProvider`
- Custom styling through `sx` prop
- CSS class overrides
- Custom toolbar configurations
- Plugin extensions

## Accessibility

The Editor component follows accessibility best practices:

- Keyboard navigation support
- ARIA attributes for screen readers
- Focus management
- Semantic HTML output
- High contrast mode support

## Performance

The Editor is optimized for performance:

- Virtual rendering for large documents
- Efficient transaction processing
- Minimal re-renders through React.memo
- Lazy loading of features
- Small initial bundle size

## Roadmap

Future enhancements planned for the Editor component:

- **Table support** - Create and edit tables
- **Collaborative editing** - Real-time collaboration features
- **Markdown mode** - Toggle between WYSIWYG and markdown
- **Find and replace** - Search within content
- **Custom plugins** - API for extending functionality
- **File uploads** - Direct file and image uploads
- **Mentions** - @mentions and autocomplete
- **Emoji picker** - Emoji insertion support
- **Print support** - Optimized printing styles
- **Mobile toolbar** - Touch-optimized toolbar

## API

- [Editor](/x/api/editor/editor/)

## Resources

- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [ProseMirror Reference](https://prosemirror.net/docs/ref/)
- [GitHub Repository](https://github.com/mui/mui-x)
