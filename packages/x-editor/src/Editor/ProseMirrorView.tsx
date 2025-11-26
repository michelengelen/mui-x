import * as React from 'react';
import { styled } from '@mui/material/styles';
import { EditorView } from 'prosemirror-view';

const ViewContainer = styled('div')(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  position: 'relative',
  
  '& .ProseMirror': {
    position: 'relative',
    outline: 'none',
    padding: theme.spacing(2),
    minHeight: '100%',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    
    '&:focus': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: -2,
    },
  },
  
  '& .editor-placeholder': {
    position: 'relative',
    
    '&::before': {
      content: 'attr(data-placeholder)',
      position: 'absolute',
      color: theme.palette.text.disabled,
      pointerEvents: 'none',
    },
  },
  
  // Typography styles
  '& p': {
    margin: 0,
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    lineHeight: 1.25,
    '&:first-child': {
      marginTop: 0,
    },
  },
  
  '& h1': { fontSize: '2em' },
  '& h2': { fontSize: '1.5em' },
  '& h3': { fontSize: '1.25em' },
  '& h4': { fontSize: '1em' },
  '& h5': { fontSize: '0.875em' },
  '& h6': { fontSize: '0.85em' },
  
  '& ul, & ol': {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
  },
  
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  
  '& blockquote': {
    borderLeft: `3px solid ${theme.palette.divider}`,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
  
  '& pre': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    overflow: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.875em',
    marginBottom: theme.spacing(1),
  },
  
  '& code': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius / 2,
    padding: '0.2em 0.4em',
    fontFamily: 'monospace',
    fontSize: '0.875em',
  },
  
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
  
  '& hr': {
    border: 'none',
    borderTop: `2px solid ${theme.palette.divider}`,
    margin: theme.spacing(2, 0),
  },
  
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
    
    '&:hover': {
      textDecoration: 'none',
    },
  },
  
  // Selection styles
  '& .ProseMirror-selectednode': {
    outline: `2px solid ${theme.palette.primary.light}`,
  },
  
  // Gap cursor styles
  '& .ProseMirror-gapcursor': {
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',
    
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: -2,
      width: 20,
      borderTop: `1px solid ${theme.palette.text.primary}`,
      animation: 'ProseMirror-cursor-blink 1.1s steps(2, start) infinite',
    },
  },
  
  '& .ProseMirror-focused .ProseMirror-gapcursor': {
    display: 'block',
  },
  
  '@keyframes ProseMirror-cursor-blink': {
    to: {
      visibility: 'hidden',
    },
  },
}));

export interface ProseMirrorViewProps {
  className?: string;
  editorView: React.MutableRefObject<EditorView | null>;
}

export const ProseMirrorView: React.FC<ProseMirrorViewProps> = ({
  className,
  editorView,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current && editorView.current) {
      containerRef.current.appendChild(editorView.current.dom);
      
      return () => {
        if (containerRef.current?.contains(editorView.current?.dom)) {
          containerRef.current.removeChild(editorView.current.dom);
        }
      };
    }
  }, [editorView]);

  return <ViewContainer ref={containerRef} className={className} />;
};
