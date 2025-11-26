import * as React from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-state';
import {
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleStrikethrough,
  toggleCode,
  toggleBlockquote,
  toggleBulletList,
  toggleOrderedList,
  setHeading,
  setParagraph,
  setCodeBlock,
  addLink,
  insertImage,
  insertHorizontalRule,
} from '../commands';
import { undo, redo } from 'prosemirror-history';

const ToolbarRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export interface EditorToolbarProps {
  className?: string;
  disabled?: boolean;
  config?: any;
  executeCommand: (command: Command) => void;
  editorState: EditorState | null;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = React.memo(({
  className,
  disabled,
  config,
  executeCommand,
  editorState,
}) => {
  // Check which marks are active
  const getActiveMarks = () => {
    if (!editorState) return [];
    const marks: string[] = [];
    const { marks: schemaMarks } = editorState.schema;
    
    if (schemaMarks.bold && schemaMarks.bold.isInSet(editorState.storedMarks || editorState.selection.$from.marks())) {
      marks.push('bold');
    }
    if (schemaMarks.italic && schemaMarks.italic.isInSet(editorState.storedMarks || editorState.selection.$from.marks())) {
      marks.push('italic');
    }
    if (schemaMarks.underline && schemaMarks.underline.isInSet(editorState.storedMarks || editorState.selection.$from.marks())) {
      marks.push('underline');
    }
    if (schemaMarks.strikethrough && schemaMarks.strikethrough.isInSet(editorState.storedMarks || editorState.selection.$from.marks())) {
      marks.push('strikethrough');
    }
    if (schemaMarks.code && schemaMarks.code.isInSet(editorState.storedMarks || editorState.selection.$from.marks())) {
      marks.push('code');
    }
    
    return marks;
  };

  const activeMarks = getActiveMarks();

  const handleFormatClick = (format: string, command: Command) => {
    executeCommand(command);
  };

  const handleLinkClick = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand(addLink(url));
    }
  };

  const handleImageClick = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand(insertImage(url));
    }
  };

  return (
    <ToolbarRoot className={className}>
      {/* Undo/Redo */}
      <StyledToggleButtonGroup
        size="small"
        aria-label="history"
        disabled={disabled}
      >
        <ToggleButton value="undo" aria-label="undo" onClick={() => executeCommand(undo)}>
          <UndoIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="redo" aria-label="redo" onClick={() => executeCommand(redo)}>
          <RedoIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      {/* Text Formatting */}
      <StyledToggleButtonGroup
        size="small"
        value={activeMarks}
        aria-label="text formatting"
        disabled={disabled}
      >
        <ToggleButton
          value="bold"
          aria-label="bold"
          selected={activeMarks.includes('bold')}
          onClick={() => handleFormatClick('bold', toggleBold())}
        >
          <FormatBoldIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="italic"
          aria-label="italic"
          selected={activeMarks.includes('italic')}
          onClick={() => handleFormatClick('italic', toggleItalic())}
        >
          <FormatItalicIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="underline"
          aria-label="underline"
          selected={activeMarks.includes('underline')}
          onClick={() => handleFormatClick('underline', toggleUnderline())}
        >
          <FormatUnderlinedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="strikethrough"
          aria-label="strikethrough"
          selected={activeMarks.includes('strikethrough')}
          onClick={() => handleFormatClick('strikethrough', toggleStrikethrough())}
        >
          <StrikethroughSIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="code"
          aria-label="inline code"
          selected={activeMarks.includes('code')}
          onClick={() => handleFormatClick('code', toggleCode())}
        >
          <CodeIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      {/* Lists */}
      <StyledToggleButtonGroup
        size="small"
        aria-label="lists"
        disabled={disabled}
      >
        <ToggleButton
          value="list-bullet"
          aria-label="bulleted list"
          onClick={() => executeCommand(toggleBulletList())}
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="list-numbered"
          aria-label="numbered list"
          onClick={() => executeCommand(toggleOrderedList())}
        >
          <FormatListNumberedIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      {/* Blocks and Inserts */}
      <StyledToggleButtonGroup
        size="small"
        aria-label="insert"
        disabled={disabled}
      >
        <ToggleButton
          value="quote"
          aria-label="quote"
          onClick={() => executeCommand(toggleBlockquote())}
        >
          <FormatQuoteIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="link"
          aria-label="link"
          onClick={handleLinkClick}
        >
          <LinkIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="image"
          aria-label="image"
          onClick={handleImageClick}
        >
          <ImageIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </ToolbarRoot>
  );
});
