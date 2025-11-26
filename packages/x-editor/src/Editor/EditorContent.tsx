import * as React from 'react';
import { styled } from '@mui/material/styles';

const ContentRoot = styled('div')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflow: 'auto',
  outline: 'none',
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
  '&[contenteditable="true"]:empty:before': {
    content: 'attr(data-placeholder)',
    color: theme.palette.text.disabled,
    pointerEvents: 'none',
  },
  '& p': {
    margin: 0,
    marginBottom: theme.spacing(1),
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: 0,
    marginBottom: theme.spacing(1.5),
  },
  '& ul, & ol': {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
  },
  '& blockquote': {
    borderLeft: `3px solid ${theme.palette.divider}`,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  '& code': {
    backgroundColor: theme.palette.action.hover,
    padding: '2px 4px',
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'monospace',
  },
  '& pre': {
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    overflow: 'auto',
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

export interface EditorContentProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  className,
  value,
  onChange,
  placeholder,
  disabled,
  readOnly,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isUpdatingRef = React.useRef(false);

  // Update content when value prop changes (controlled mode)
  React.useEffect(() => {
    if (!contentRef.current || isUpdatingRef.current) {
      return;
    }

    if (contentRef.current.innerHTML !== value) {
      contentRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = React.useCallback(() => {
    if (!contentRef.current) return;

    isUpdatingRef.current = true;
    const newValue = contentRef.current.innerHTML;
    onChange(newValue);

    // Reset the flag after the React update cycle
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  }, [onChange]);

  const handlePaste = React.useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  return (
    <ContentRoot
      ref={contentRef}
      className={className}
      contentEditable={!disabled && !readOnly}
      onInput={handleInput}
      onPaste={handlePaste}
      data-placeholder={placeholder}
      suppressContentEditableWarning
      spellCheck
      role="textbox"
      aria-multiline="true"
      aria-label="Editor content"
      aria-disabled={disabled}
      aria-readonly={readOnly}
    />
  );
};
