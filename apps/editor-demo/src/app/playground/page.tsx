'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import { Editor } from '@mui/x-editor';
import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Divider,
  Drawer,
  IconButton,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PrintIcon from '@mui/icons-material/Print';

const PlaygroundContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  paddingTop: '80px',
}));

const PlaygroundHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '1rem 2rem',
  position: 'sticky',
  top: '64px',
  zIndex: 100,
}));

const HeaderTitle = styled('h1')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  margin: '0 0 0.5rem 0',
  color: theme.palette.text.primary,
}));

const HeaderSubtitle = styled('p')(({ theme }) => ({
  fontSize: '0.95rem',
  margin: 0,
  color: theme.palette.text.secondary,
}));

const ToolbarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '0.75rem 2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  position: 'sticky',
  top: '160px',
  zIndex: 99,
}));

const EditorContainer = styled(Paper)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '2rem auto',
  padding: '2rem',
  minHeight: '600px',
  backgroundColor: theme.palette.background.paper,
  '& .ProseMirror': {
    outline: 'none',
    minHeight: '500px',
    fontSize: '1.05rem',
    lineHeight: 1.6,
    '& p': {
      margin: '0 0 1rem 0',
    },
    '& h1, & h2, & h3': {
      fontWeight: 600,
      margin: '1.5rem 0 0.75rem 0',
    },
    '& ul, & ol': {
      paddingLeft: '2rem',
      margin: '0 0 1rem 0',
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: '1rem',
      marginLeft: 0,
      fontStyle: 'italic',
    },
  },
}));

const SettingsDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '320px',
    padding: '1.5rem',
  },
}));

const SettingsSection = styled('div')(() => ({
  marginBottom: '2rem',
}));

const SettingsTitle = styled('h3')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '1rem',
  color: theme.palette.text.primary,
}));

export default function PlaygroundPage() {
  const [content, setContent] = React.useState(
    `<h1>Welcome to the Playground!</h1>
    <p>This is a fully featured editor where you can experiment with all the capabilities of MUI X Editor.</p>
    <h2>Try These Features:</h2>
    <ul>
      <li><strong>Bold text</strong>, <em>italic text</em>, and <u>underlined text</u></li>
      <li>Create numbered and bulleted lists</li>
      <li>Add blockquotes for emphasis</li>
      <li>Insert code blocks with syntax highlighting</li>
    </ul>
    <blockquote>
      <p>"The best way to learn is by doing." Start editing to explore!</p>
    </blockquote>`
  );

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [fontSize, setFontSize] = React.useState('16');
  const [lineHeight, setLineHeight] = React.useState('1.6');
  const [spellCheck, setSpellCheck] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.txt';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setContent(event.target.result as string);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <PlaygroundContainer>
      <PlaygroundHeader>
        <HeaderTitle>Editor Playground</HeaderTitle>
        <HeaderSubtitle>
          A full-featured environment to test and experiment with the MUI X Editor
        </HeaderSubtitle>
      </PlaygroundHeader>

      {showToolbar && (
        <ToolbarContainer>
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

          <Divider orientation="vertical" flexItem />

          <ToggleButtonGroup size="small" aria-label="lists">
            <ToggleButton value="bullet" aria-label="bullet list">
              <FormatListBulletedIcon />
            </ToggleButton>
            <ToggleButton value="number" aria-label="numbered list">
              <FormatListNumberedIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem />

          <ButtonGroup size="small">
            <Button startIcon={<UndoIcon />}>Undo</Button>
            <Button startIcon={<RedoIcon />}>Redo</Button>
          </ButtonGroup>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <Button size="small" startIcon={<FileUploadIcon />} onClick={handleImport}>
              Import
            </Button>
            <Button size="small" startIcon={<FileDownloadIcon />} onClick={handleExport}>
              Export
            </Button>
            <Button size="small" startIcon={<PrintIcon />} onClick={handlePrint}>
              Print
            </Button>
            <IconButton size="small" onClick={() => setSettingsOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </div>
        </ToolbarContainer>
      )}

      <EditorContainer elevation={0}>
        <Editor
          initialContent={content}
          onChange={setContent}
          placeholder="Start typing..."
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
        />
      </EditorContainer>

      <SettingsDrawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <SettingsSection>
          <SettingsTitle>Editor Settings</SettingsTitle>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Font Size</InputLabel>
            <Select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              label="Font Size"
            >
              <MenuItem value="14">Small (14px)</MenuItem>
              <MenuItem value="16">Medium (16px)</MenuItem>
              <MenuItem value="18">Large (18px)</MenuItem>
              <MenuItem value="20">Extra Large (20px)</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Line Height</InputLabel>
            <Select
              value={lineHeight}
              onChange={(e) => setLineHeight(e.target.value)}
              label="Line Height"
            >
              <MenuItem value="1.2">Compact (1.2)</MenuItem>
              <MenuItem value="1.6">Normal (1.6)</MenuItem>
              <MenuItem value="2">Relaxed (2)</MenuItem>
            </Select>
          </FormControl>
        </SettingsSection>

        <SettingsSection>
          <SettingsTitle>Features</SettingsTitle>
          
          <FormControlLabel
            control={
              <Switch
                checked={showToolbar}
                onChange={(e) => setShowToolbar(e.target.checked)}
              />
            }
            label="Show Toolbar"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={spellCheck}
                onChange={(e) => setSpellCheck(e.target.checked)}
              />
            }
            label="Spell Check"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={wordWrap}
                onChange={(e) => setWordWrap(e.target.checked)}
              />
            }
            label="Word Wrap"
          />
        </SettingsSection>
      </SettingsDrawer>
    </PlaygroundContainer>
  );
}
