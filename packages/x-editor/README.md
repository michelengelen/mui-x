# @mui/x-editor

This package contains the community edition of the MUI X Editor component - a WYSIWYG rich text editor for React.

## Installation

Install the package in your project directory with:

```bash
npm install @mui/x-editor
```

This component has peer dependencies:

```json
{
  "@mui/material": "^5.15.14 || ^6.0.0",
  "@mui/system": "^5.16.7 || ^6.0.0",
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
}
```

## Documentation

Visit [https://mui.com/x/react-editor/](https://mui.com/x/react-editor/) to view the full documentation.

## Basic Usage

```tsx
import React from 'react';
import { Editor } from '@mui/x-editor';

function MyEditor() {
  const [value, setValue] = React.useState('');

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

## Features

- 📝 Rich text editing with formatting options
- 🎨 Customizable toolbar
- 🌍 Internationalization support
- ⌨️ Keyboard shortcuts
- 📱 Responsive design
- 🎯 TypeScript support
- 🔧 Extensive customization options
- ♿ Accessibility compliant

## Supported Formats

- **Text formatting**: Bold, Italic, Underline, Strikethrough
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Bulleted, Numbered
- **Blocks**: Quote, Code, Headings
- **Inserts**: Links, Images

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
