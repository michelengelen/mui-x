import * as React from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
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
import { EditorCommand } from '../models';

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
  onCommand: (command: EditorCommand) => void;
  editorState: any;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  className,
  disabled,
  config,
  onCommand,
  editorState,
}) => {
  const [formats, setFormats] = React.useState<string[]>([]);
  const [alignment, setAlignment] = React.useState<string>('left');

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
    // Handle format changes
    newFormats.forEach((format) => {
      onCommand({ type: 'format', payload: format });
    });
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onCommand({ type: 'align', payload: newAlignment });
    }
  };

  return (
    <ToolbarRoot className={className}>
      <StyledToggleButtonGroup
        size="small"
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        disabled={disabled}
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
          <FormatUnderlinedIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        disabled={disabled}
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenterIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          <FormatAlignJustifyIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup
        size="small"
        aria-label="text formatting"
        disabled={disabled}
      >
        <ToggleButton
          value="list-bullet"
          aria-label="bulleted list"
          onClick={() => onCommand({ type: 'list', payload: 'bullet' })}
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="list-numbered"
          aria-label="numbered list"
          onClick={() => onCommand({ type: 'list', payload: 'numbered' })}
        >
          <FormatListNumberedIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup
        size="small"
        aria-label="insert"
        disabled={disabled}
      >
        <ToggleButton
          value="quote"
          aria-label="quote"
          onClick={() => onCommand({ type: 'block', payload: 'quote' })}
        >
          <FormatQuoteIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="code"
          aria-label="code"
          onClick={() => onCommand({ type: 'block', payload: 'code' })}
        >
          <CodeIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="link"
          aria-label="link"
          onClick={() => onCommand({ type: 'insert', payload: 'link' })}
        >
          <LinkIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="image"
          aria-label="image"
          onClick={() => onCommand({ type: 'insert', payload: 'image' })}
        >
          <ImageIcon fontSize="small" />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </ToolbarRoot>
  );
};
