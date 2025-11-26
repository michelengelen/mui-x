'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Tabs,
  Tab,
  Box,
} from '@mui/material';

const PageContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  paddingTop: '80px',
}));

const PageHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '3rem 0',
  marginBottom: '3rem',
}));

const PageTitle = styled('h1')(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  margin: '0 0 1rem 0',
  color: theme.palette.text.primary,
}));

const PageSubtitle = styled('p')(({ theme }) => ({
  fontSize: '1.25rem',
  margin: 0,
  color: theme.palette.text.secondary,
  maxWidth: '800px',
}));

const DocSection = styled('section')(() => ({
  marginBottom: '3rem',
}));

const DocTitle = styled('h2')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  marginBottom: '1.5rem',
  color: theme.palette.text.primary,
}));

const DocSubtitle = styled('h3')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginTop: '2rem',
  marginBottom: '1rem',
  color: theme.palette.text.primary,
}));

const CodeBlock = styled('pre')(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: '1.5rem',
  borderRadius: '8px',
  overflow: 'auto',
  fontSize: '0.9rem',
  fontFamily: 'monospace',
  marginBottom: '1.5rem',
}));

const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: 'monospace',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DocsPage() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <PageContainer>
      <PageHeader>
        <Container maxWidth="lg">
          <PageTitle>Documentation</PageTitle>
          <PageSubtitle>
            Complete guide to using MUI X Editor in your React applications
          </PageSubtitle>
        </Container>
      </PageHeader>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Getting Started" />
            <Tab label="API Reference" />
            <Tab label="Advanced" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <DocSection>
                <DocTitle>Installation</DocTitle>
                <Typography paragraph>
                  Install MUI X Editor and its peer dependencies using npm or yarn:
                </Typography>
                <CodeBlock>
{`npm install @mui/x-editor @mui/material @emotion/react @emotion/styled

# or with yarn
yarn add @mui/x-editor @mui/material @emotion/react @emotion/styled`}
                </CodeBlock>
              </DocSection>

              <DocSection>
                <DocTitle>Basic Usage</DocTitle>
                <Typography paragraph>
                  Import and use the Editor component in your React application:
                </Typography>
                <CodeBlock>
{`import React, { useState } from 'react';
import { Editor } from '@mui/x-editor';

function MyApp() {
  const [content, setContent] = useState('');

  return (
    <Editor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
}`}
                </CodeBlock>

                <Alert severity="info" sx={{ mb: 3 }}>
                  The Editor component is built on top of ProseMirror and provides a fully-featured WYSIWYG editing experience out of the box.
                </Alert>
              </DocSection>

              <DocSection>
                <DocTitle>Styling</DocTitle>
                <Typography paragraph>
                  The Editor component inherits styles from your MUI theme. You can customize it using the <InlineCode>sx</InlineCode> prop or styled components:
                </Typography>
                <CodeBlock>
{`<Editor
  sx={{
    minHeight: 400,
    '& .ProseMirror': {
      padding: '1rem',
      fontSize: '1.1rem',
    }
  }}
/>`}
                </CodeBlock>
              </DocSection>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <DocSection>
                <DocTitle>Editor Props</DocTitle>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Prop</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Default</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell><InlineCode>value</InlineCode></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>''</TableCell>
                        <TableCell>HTML content of the editor</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><InlineCode>initialContent</InlineCode></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>''</TableCell>
                        <TableCell>Initial HTML content (uncontrolled mode)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><InlineCode>onChange</InlineCode></TableCell>
                        <TableCell>(value: string) => void</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>Callback when content changes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><InlineCode>placeholder</InlineCode></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>''</TableCell>
                        <TableCell>Placeholder text when empty</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><InlineCode>readOnly</InlineCode></TableCell>
                        <TableCell>boolean</TableCell>
                        <TableCell>false</TableCell>
                        <TableCell>Makes the editor read-only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><InlineCode>autoFocus</InlineCode></TableCell>
                        <TableCell>boolean</TableCell>
                        <TableCell>false</TableCell>
                        <TableCell>Focus editor on mount</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </DocSection>

              <DocSection>
                <DocTitle>Hooks</DocTitle>
                <DocSubtitle>useProseMirror</DocSubtitle>
                <Typography paragraph>
                  Access the underlying ProseMirror instance for advanced customization:
                </Typography>
                <CodeBlock>
{`import { useProseMirror } from '@mui/x-editor';

const { view, state, dispatch } = useProseMirror({
  schema,
  plugins: [...],
  doc: initialDoc,
});`}
                </CodeBlock>
              </DocSection>

              <DocSection>
                <DocTitle>Commands</DocTitle>
                <Typography paragraph>
                  The editor provides built-in commands for text formatting:
                </Typography>
                <CodeBlock>
{`import { commands } from '@mui/x-editor';

// Text formatting
commands.toggleBold(state, dispatch);
commands.toggleItalic(state, dispatch);
commands.toggleUnderline(state, dispatch);

// Lists
commands.toggleBulletList(state, dispatch);
commands.toggleOrderedList(state, dispatch);

// Blocks
commands.setBlockType('heading', { level: 1 })(state, dispatch);
commands.wrapInBlockquote(state, dispatch);`}
                </CodeBlock>
              </DocSection>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <DocSection>
                <DocTitle>Custom Plugins</DocTitle>
                <Typography paragraph>
                  Extend the editor with custom ProseMirror plugins:
                </Typography>
                <CodeBlock>
{`import { Plugin } from 'prosemirror-state';

const wordCountPlugin = new Plugin({
  view(editorView) {
    const counter = document.createElement('div');
    counter.className = 'word-counter';
    
    function update() {
      const text = editorView.state.doc.textContent;
      const wordCount = text.split(/\\s+/).filter(Boolean).length;
      counter.textContent = \`Words: \${wordCount}\`;
    }
    
    update();
    return {
      update,
      destroy() {
        counter.remove();
      }
    };
  }
});

// Use with useProseMirror hook
const { view } = useProseMirror({
  plugins: [wordCountPlugin],
});`}
                </CodeBlock>
              </DocSection>

              <DocSection>
                <DocTitle>Custom Schema</DocTitle>
                <Typography paragraph>
                  Define custom node and mark types for your editor:
                </Typography>
                <CodeBlock>
{`import { Schema } from 'prosemirror-model';

const customSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { 
      content: 'inline*',
      toDOM() { return ['p', 0] }
    },
    heading: {
      attrs: { level: { default: 1 } },
      content: 'inline*',
      toDOM(node) {
        return ['h' + node.attrs.level, 0];
      }
    },
    text: { inline: true },
  },
  marks: {
    strong: {
      toDOM() { return ['strong', 0] }
    },
    emphasis: {
      toDOM() { return ['em', 0] }
    },
  }
});`}
                </CodeBlock>
              </DocSection>

              <DocSection>
                <DocTitle>Import/Export</DocTitle>
                <Typography paragraph>
                  Convert between different formats:
                </Typography>
                <CodeBlock>
{`// Export to Markdown
import { DOMSerializer } from 'prosemirror-model';
import TurndownService from 'turndown';

const turndownService = new TurndownService();
const html = editor.getHTML();
const markdown = turndownService.turndown(html);

// Import from Markdown
import { marked } from 'marked';

const html = marked(markdownContent);
editor.setContent(html);`}
                </CodeBlock>
              </DocSection>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </PageContainer>
  );
}
