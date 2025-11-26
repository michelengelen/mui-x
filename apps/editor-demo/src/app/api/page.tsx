'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const ApiSection = styled('div')(() => ({
  marginBottom: '2rem',
}));

const ApiTitle = styled('h2')(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 600,
  marginBottom: '1rem',
  color: theme.palette.text.primary,
}));

const CodeBlock = styled('pre')(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: '1rem',
  borderRadius: '8px',
  overflow: 'auto',
  fontSize: '0.875rem',
  fontFamily: 'monospace',
  margin: '1rem 0',
}));

const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: 'monospace',
}));

const MethodSignature = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '1rem',
  borderRadius: '8px',
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  marginBottom: '1rem',
  border: `1px solid ${theme.palette.divider}`,
}));

const ParamList = styled('ul')(() => ({
  listStyle: 'none',
  padding: 0,
  '& li': {
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

interface ApiMethod {
  name: string;
  signature: string;
  description: string;
  parameters?: { name: string; type: string; description: string }[];
  returns?: string;
  example: string;
}

const apiMethods: ApiMethod[] = [
  {
    name: 'Editor Component',
    signature: '<Editor value={string} onChange={(value: string) => void} />',
    description: 'Main editor component for rich text editing',
    parameters: [
      { name: 'value', type: 'string', description: 'HTML content of the editor' },
      { name: 'onChange', type: '(value: string) => void', description: 'Callback when content changes' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text when editor is empty' },
      { name: 'readOnly', type: 'boolean', description: 'Makes the editor read-only' },
      { name: 'autoFocus', type: 'boolean', description: 'Focus editor on mount' },
    ],
    example: `<Editor
  value={content}
  onChange={setContent}
  placeholder="Start typing..."
/>`,
  },
  {
    name: 'useProseMirror Hook',
    signature: 'useProseMirror(config: ProseMirrorConfig)',
    description: 'Hook to access the underlying ProseMirror instance',
    parameters: [
      { name: 'schema', type: 'Schema', description: 'ProseMirror schema definition' },
      { name: 'plugins', type: 'Plugin[]', description: 'Array of ProseMirror plugins' },
      { name: 'doc', type: 'Node', description: 'Initial document node' },
    ],
    returns: '{ view: EditorView, state: EditorState, dispatch: (tr: Transaction) => void }',
    example: `const { view, state, dispatch } = useProseMirror({
  schema: mySchema,
  plugins: [keymap(baseKeymap)],
});`,
  },
  {
    name: 'commands.toggleBold',
    signature: 'toggleBold(state: EditorState, dispatch?: Dispatch)',
    description: 'Toggles bold formatting for selected text',
    returns: 'boolean',
    example: `import { commands } from '@mui/x-editor';

commands.toggleBold(state, dispatch);`,
  },
  {
    name: 'commands.toggleItalic',
    signature: 'toggleItalic(state: EditorState, dispatch?: Dispatch)',
    description: 'Toggles italic formatting for selected text',
    returns: 'boolean',
    example: `commands.toggleItalic(state, dispatch);`,
  },
  {
    name: 'commands.toggleBulletList',
    signature: 'toggleBulletList(state: EditorState, dispatch?: Dispatch)',
    description: 'Toggles bullet list for selected block',
    returns: 'boolean',
    example: `commands.toggleBulletList(state, dispatch);`,
  },
  {
    name: 'commands.setBlockType',
    signature: 'setBlockType(nodeType: NodeType, attrs?: Attrs)',
    description: 'Changes the type of the selected block',
    parameters: [
      { name: 'nodeType', type: 'NodeType', description: 'Target node type (e.g., "heading", "paragraph")' },
      { name: 'attrs', type: 'Object', description: 'Attributes for the node (e.g., { level: 1 } for headings)' },
    ],
    returns: 'Command',
    example: `commands.setBlockType('heading', { level: 2 })(state, dispatch);`,
  },
];

export default function ApiPage() {
  return (
    <PageContainer>
      <PageHeader>
        <Container maxWidth="lg">
          <PageTitle>API Reference</PageTitle>
          <PageSubtitle>
            Complete API documentation for MUI X Editor components, hooks, and commands
          </PageSubtitle>
        </Container>
      </PageHeader>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Note:</strong> This API reference covers the most commonly used methods and props. 
          For the complete ProseMirror API, please refer to the{' '}
          <a href="https://prosemirror.net/docs/ref/" target="_blank" rel="noopener noreferrer">
            ProseMirror documentation
          </a>.
        </Alert>

        <Paper sx={{ p: 3, mb: 4 }}>
          <ApiTitle>Core Components & Hooks</ApiTitle>
          
          {apiMethods.map((method, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                  {method.name}
                </Typography>
                {method.returns && (
                  <Chip
                    label={`Returns: ${method.returns}`}
                    size="small"
                    sx={{ ml: 'auto', mr: 2 }}
                    variant="outlined"
                  />
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{method.description}</Typography>
                
                <MethodSignature>{method.signature}</MethodSignature>
                
                {method.parameters && method.parameters.length > 0 && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Parameters:
                    </Typography>
                    <ParamList>
                      {method.parameters.map((param, pIndex) => (
                        <li key={pIndex}>
                          <InlineCode>{param.name}</InlineCode>
                          <span style={{ margin: '0 0.5rem' }}>:</span>
                          <span style={{ color: '#666' }}>{param.type}</span>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {param.description}
                          </Typography>
                        </li>
                      ))}
                    </ParamList>
                  </>
                )}
                
                <Typography variant="subtitle2" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
                  Example:
                </Typography>
                <CodeBlock>{method.example}</CodeBlock>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <ApiTitle>Type Definitions</ApiTitle>
          
          <ApiSection>
            <Typography variant="h6" gutterBottom>EditorProps</Typography>
            <CodeBlock>
{`interface EditorProps {
  value?: string;
  initialContent?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}`}
            </CodeBlock>
          </ApiSection>

          <ApiSection>
            <Typography variant="h6" gutterBottom>ProseMirrorConfig</Typography>
            <CodeBlock>
{`interface ProseMirrorConfig {
  schema: Schema;
  plugins?: Plugin[];
  doc?: Node;
  selection?: Selection;
  storedMarks?: Mark[] | null;
}`}
            </CodeBlock>
          </ApiSection>

          <ApiSection>
            <Typography variant="h6" gutterBottom>Command</Typography>
            <CodeBlock>
{`type Command = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView
) => boolean;`}
            </CodeBlock>
          </ApiSection>
        </Paper>
      </Container>
    </PageContainer>
  );
}
