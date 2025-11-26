'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import { Editor } from '@mui/x-editor';
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DemoSection = styled('section')(({ theme }) => ({
  padding: '6rem 1.5rem',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
  },
}));

const DemoContainer = styled('div')(() => ({
  maxWidth: '1000px',
  margin: '0 auto',
}));

const DemoHeader = styled('div')(() => ({
  textAlign: 'center',
  marginBottom: '3rem',
}));

const DemoTitle = styled('h2')(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  margin: '0 0 1rem 0',
}));

const DemoSubtitle = styled('p')(({ theme }) => ({
  fontSize: '1.25rem',
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}));

const EditorContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}));

const EditorToolbar = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
}));

const EditorContent = styled('div')(({ theme }) => ({
  minHeight: '400px',
  padding: '2rem',
  backgroundColor: theme.palette.background.paper,
  '& .ProseMirror': {
    outline: 'none',
    minHeight: '350px',
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    '& p': {
      margin: '0 0 1rem 0',
    },
    '& h1, & h2, & h3': {
      margin: '1.5rem 0 0.75rem 0',
      fontWeight: 600,
    },
    '& h1': { fontSize: '2rem' },
    '& h2': { fontSize: '1.5rem' },
    '& h3': { fontSize: '1.25rem' },
    '& ul, & ol': {
      paddingLeft: '2rem',
      margin: '0 0 1rem 0',
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: '1rem',
      marginLeft: 0,
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
    },
    '& code': {
      backgroundColor: theme.palette.action.hover,
      padding: '0.2rem 0.4rem',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '0.9em',
    },
    '& pre': {
      backgroundColor: theme.palette.action.hover,
      padding: '1rem',
      borderRadius: '8px',
      overflow: 'auto',
      '& code': {
        backgroundColor: 'transparent',
        padding: 0,
      },
    },
  },
}));

const OutputPanel = styled('div')(({ theme }) => ({
  marginTop: '2rem',
  padding: '1.5rem',
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
}));

const OutputHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
}));

const OutputTitle = styled('h3')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

const OutputContent = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '1rem',
  borderRadius: '8px',
  overflow: 'auto',
  fontSize: '0.875rem',
  fontFamily: 'monospace',
  color: theme.palette.text.primary,
  margin: 0,
  maxHeight: '300px',
  border: `1px solid ${theme.palette.divider}`,
}));

const StatusBadge = styled('span')<{ variant: 'info' | 'success' }>(({ theme, variant }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  backgroundColor: variant === 'success' ? theme.palette.success.main + '20' : theme.palette.info.main + '20',
  color: variant === 'success' ? theme.palette.success.main : theme.palette.info.main,
}));

const initialContent = `
<h1>Welcome to MUI X Editor!</h1>
<p>This is a <strong>powerful</strong> and <em>flexible</em> WYSIWYG editor built with ProseMirror.</p>
<h2>Features</h2>
<ul>
  <li>Rich text formatting</li>
  <li>Lists and quotes</li>
  <li>Code blocks with syntax highlighting</li>
  <li>Extensible plugin system</li>
</ul>
<blockquote>
  <p>"The best way to predict the future is to invent it." - Alan Kay</p>
</blockquote>
<p>Try editing this content or add your own!</p>
`;

export function LiveDemo() {
  const [content, setContent] = React.useState(initialContent);
  const [showOutput, setShowOutput] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setContent(initialContent);
  };

  return (
    <DemoSection>
      <DemoContainer>
        <DemoHeader>
          <DemoTitle>Try It Live</DemoTitle>
          <DemoSubtitle>
            Experience the editor in action. Edit the content below and see the HTML output.
          </DemoSubtitle>
        </DemoHeader>

        <EditorContainer>
          <EditorToolbar>
            <ToggleButtonGroup size="small" aria-label="text formatting">
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underline" aria-label="underline">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup size="small" aria-label="text structure">
              <ToggleButton value="bullet" aria-label="bullet list">
                <FormatListBulletedIcon />
              </ToggleButton>
              <ToggleButton value="number" aria-label="numbered list">
                <FormatListNumberedIcon />
              </ToggleButton>
              <ToggleButton value="quote" aria-label="quote">
                <FormatQuoteIcon />
              </ToggleButton>
              <ToggleButton value="code" aria-label="code">
                <CodeIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => setShowOutput(!showOutput)}
              >
                {showOutput ? 'Hide' : 'Show'} Output
              </Button>
            </div>
          </EditorToolbar>

          <EditorContent>
            <Editor
              initialContent={content}
              onChange={setContent}
              placeholder="Start typing..."
            />
          </EditorContent>
        </EditorContainer>

        {showOutput && (
          <OutputPanel>
            <OutputHeader>
              <OutputTitle>
                <CodeIcon fontSize="small" />
                HTML Output
                <StatusBadge variant="info">Live</StatusBadge>
              </OutputTitle>
              <Button
                size="small"
                variant="text"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </OutputHeader>
            <OutputContent>
              {content}
            </OutputContent>
          </OutputPanel>
        )}
      </DemoContainer>
    </DemoSection>
  );
}
