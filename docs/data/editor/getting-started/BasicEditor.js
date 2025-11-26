import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Editor } from '@mui/x-editor';

export default function BasicEditor() {
  const [value, setValue] = React.useState(
    '<p>Welcome to the <strong>MUI X Editor</strong>!</p><p>This is a <em>WYSIWYG</em> rich text editor with many features:</p><ul><li>Text formatting (bold, italic, underline)</li><li>Text alignment</li><li>Lists and quotes</li><li>And much more!</li></ul><p>Start editing to see it in action.</p>'
  );

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log('Editor content changed:', newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Basic Editor Example
      </Typography>
      <Paper elevation={3}>
        <Editor
          value={value}
          onChange={handleChange}
          placeholder="Start typing here..."
          height={400}
          toolbar
          sx={{
            '& .MuiEditor-content': {
              fontSize: '16px',
              lineHeight: 1.6,
            },
          }}
        />
      </Paper>
      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Raw HTML Output:
        </Typography>
        <Paper
          sx={{
            p: 2,
            maxHeight: 200,
            overflow: 'auto',
            bgcolor: 'grey.100',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Paper>
      </Box>
    </Box>
  );
}
