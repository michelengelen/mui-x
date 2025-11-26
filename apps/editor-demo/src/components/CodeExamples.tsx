'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Highlight, themes } from 'prism-react-renderer';

const ExamplesSection = styled('section')(({ theme }) => ({
  padding: '6rem 1.5rem',
  backgroundColor: theme.palette.background.default,
}));

const ExamplesContainer = styled('div')(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
}));

const SectionHeader = styled('div')(() => ({
  textAlign: 'center',
  marginBottom: '3rem',
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  margin: '0 0 1rem 0',
}));

const SectionSubtitle = styled('p')(({ theme }) => ({
  fontSize: '1.25rem',
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}));

const CodeCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}));

const CodeHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '0',
}));

const CodeContent = styled('div')(() => ({
  position: 'relative',
}));

const CopyButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  padding: '0.5rem',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  transition: 'all 0.2s',
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const CodeBlock = styled('pre')(({ theme }) => ({
  margin: 0,
  padding: '1.5rem',
  overflow: 'auto',
  backgroundColor: '#1e1e1e',
  fontSize: '0.9rem',
  fontFamily: '"Fira Code", "Cascadia Code", monospace',
  lineHeight: 1.6,
  '& .token-line': {
    display: 'block',
  },
}));

const TabPanel = styled('div')(() => ({
  marginTop: '2rem',
}));

interface CodeExample {
  title: string;
  language: 'tsx' | 'javascript';
  code: string;
}

const examples: Record<string, CodeExample> = {
  basic: {
    title: 'Basic Usage',
    language: 'tsx',
    code: `import React, { useState } from 'react';
import { Editor } from '@mui/x-editor';

function BasicEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      initialContent={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
}`,
  },
  toolbar: {
    title: 'With Custom Toolbar',
    language: 'tsx',
    code: `import React, { useState } from 'react';
import { Editor, EditorToolbar, useEditor } from '@mui/x-editor';
import { Button, ButtonGroup } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

function CustomToolbarEditor() {
  const [content, setContent] = useState('');
  const { editor, commands } = useEditor({
    initialContent: content,
    onChange: setContent,
  });

  return (
    <div>
      <EditorToolbar>
        <ButtonGroup>
          <Button
            onClick={() => commands.toggleBold()}
            variant={editor?.isActive('bold') ? 'contained' : 'outlined'}
          >
            <FormatBoldIcon />
          </Button>
          <Button
            onClick={() => commands.toggleItalic()}
            variant={editor?.isActive('italic') ? 'contained' : 'outlined'}
          >
            <FormatItalicIcon />
          </Button>
        </ButtonGroup>
      </EditorToolbar>
      <Editor editor={editor} />
    </div>
  );
}`,
  },
  controlled: {
    title: 'Controlled Component',
    language: 'tsx',
    code: `import React, { useState, useEffect } from 'react';
import { Editor } from '@mui/x-editor';
import { Button, Stack } from '@mui/material';

function ControlledEditor() {
  const [content, setContent] = useState('<p>Initial content</p>');
  const [savedContent, setSavedContent] = useState('');

  const handleSave = () => {
    setSavedContent(content);
    alert('Content saved!');
  };

  const handleClear = () => {
    setContent('');
  };

  return (
    <Stack spacing={2}>
      <Editor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Stack>
      {savedContent && (
        <div>
          <h3>Saved Content:</h3>
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
        </div>
      )}
    </Stack>
  );
}`,
  },
};

export function CodeExamples() {
  const [activeTab, setActiveTab] = React.useState('basic');
  const [copiedStates, setCopiedStates] = React.useState<Record<string, boolean>>({});

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <ExamplesSection>
      <ExamplesContainer>
        <SectionHeader>
          <SectionTitle>Code Examples</SectionTitle>
          <SectionSubtitle>
            Get started quickly with these ready-to-use code examples
          </SectionSubtitle>
        </SectionHeader>

        <CodeCard>
          <CodeHeader>
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                },
              }}
            >
              {Object.entries(examples).map(([key, example]) => (
                <Tab key={key} label={example.title} value={key} />
              ))}
            </Tabs>
          </CodeHeader>

          {Object.entries(examples).map(([key, example]) => (
            <TabPanel key={key} hidden={activeTab !== key}>
              {activeTab === key && (
                <CodeContent>
                  <CopyButton
                    onClick={() => handleCopy(key, example.code)}
                    aria-label="Copy code"
                  >
                    {copiedStates[key] ? (
                      <>
                        <CheckIcon fontSize="small" />
                        Copied
                      </>
                    ) : (
                      <>
                        <ContentCopyIcon fontSize="small" />
                        Copy
                      </>
                    )}
                  </CopyButton>
                  <Highlight
                    theme={themes.vsDark}
                    code={example.code}
                    language={example.language}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <CodeBlock className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })} className="token-line">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </CodeBlock>
                    )}
                  </Highlight>
                </CodeContent>
              )}
            </TabPanel>
          ))}
        </CodeCard>
      </ExamplesContainer>
    </ExamplesSection>
  );
}
