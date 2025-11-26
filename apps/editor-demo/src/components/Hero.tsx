'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import * as BaseUI from '@base-ui-components/react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import Link from 'next/link';

const HeroSection = styled('section')(({ theme }) => ({
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 1.5rem',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  position: 'relative',
  overflow: 'hidden',
}));

const HeroContent = styled('div')(() => ({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
}));

const HeroText = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

const HeroTitle = styled('h1')(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 800,
  lineHeight: 1.1,
  color: theme.palette.text.primary,
  margin: 0,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const HeroSubtitle = styled('p')(({ theme }) => ({
  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
  fontWeight: 400,
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
  margin: 0,
  maxWidth: '600px',
}));

const HeroButtons = styled('div')(() => ({
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
}));

const EditorPreview = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  padding: '1.5rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '16px',
    opacity: 0.1,
    zIndex: -1,
  },
}));

const EditorHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const EditorDot = styled('div')<{ color: string }>(({ color }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color,
}));

const EditorContent = styled('div')(({ theme }) => ({
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  fontFamily: 'monospace',
  fontSize: '14px',
  color: theme.palette.text.primary,
}));

const CodeLine = styled('div')<{ indent?: number }>(({ theme, indent = 0 }) => ({
  paddingLeft: `${indent * 20}px`,
  display: 'flex',
  alignItems: 'center',
  '& .keyword': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  '& .string': {
    color: '#22863a',
  },
  '& .function': {
    color: '#6f42c1',
  },
  '& .comment': {
    color: theme.palette.text.disabled,
    fontStyle: 'italic',
  },
}));

const FeatureBadge = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '24px',
  backgroundColor: theme.palette.primary.main + '15',
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: '1rem',
}));

export function Hero() {
  const [typedText, setTypedText] = React.useState('');
  const fullText = 'Build rich text experiences with ease';

  React.useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection>
      <HeroContent>
        <HeroText>
          <FeatureBadge>
            <span>✨</span>
            <span>Powered by ProseMirror</span>
          </FeatureBadge>
          
          <HeroTitle>
            {typedText}
            <span style={{ opacity: typedText.length < fullText.length ? 1 : 0 }}>|</span>
          </HeroTitle>
          
          <HeroSubtitle>
            A powerful WYSIWYG editor component for React applications. Built on top of ProseMirror 
            with Material-UI integration, providing a seamless editing experience with full TypeScript support.
          </HeroSubtitle>
          
          <HeroButtons>
            <Button
              component={Link}
              href="/playground"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: '12px',
              }}
            >
              Try it Live
            </Button>
            
            <Button
              component={Link}
              href="/docs"
              variant="outlined"
              size="large"
              startIcon={<CodeIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: '12px',
              }}
            >
              View Docs
            </Button>
          </HeroButtons>
        </HeroText>

        <EditorPreview>
          <EditorHeader>
            <EditorDot color="#ff5f57" />
            <EditorDot color="#ffbd2e" />
            <EditorDot color="#28ca42" />
            <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.6 }}>editor.tsx</span>
          </EditorHeader>
          
          <EditorContent>
            <CodeLine>
              <span className="keyword">import</span>&nbsp;
              <span>{`{ Editor }`}</span>&nbsp;
              <span className="keyword">from</span>&nbsp;
              <span className="string">'@mui/x-editor'</span>;
            </CodeLine>
            
            <CodeLine>
              &nbsp;
            </CodeLine>
            
            <CodeLine>
              <span className="keyword">function</span>&nbsp;
              <span className="function">MyApp</span>
              <span>() {`{`}</span>
            </CodeLine>
            
            <CodeLine indent={1}>
              <span className="keyword">const</span>&nbsp;
              <span>[content, setContent] =</span>&nbsp;
              <span className="function">useState</span>
              <span>(
                <span className="string">''</span>
              );</span>
            </CodeLine>
            
            <CodeLine>
              &nbsp;
            </CodeLine>
            
            <CodeLine indent={1}>
              <span className="keyword">return</span>&nbsp;(
            </CodeLine>
            
            <CodeLine indent={2}>
              <span>&lt;</span>
              <span className="function">Editor</span>
            </CodeLine>
            
            <CodeLine indent={3}>
              <span>value=</span>
              <span>{`{content}`}</span>
            </CodeLine>
            
            <CodeLine indent={3}>
              <span>onChange=</span>
              <span>{`{setContent}`}</span>
            </CodeLine>
            
            <CodeLine indent={3}>
              <span>placeholder=</span>
              <span className="string">"Start typing..."</span>
            </CodeLine>
            
            <CodeLine indent={2}>
              <span>/&gt;</span>
            </CodeLine>
            
            <CodeLine indent={1}>
              <span>);</span>
            </CodeLine>
            
            <CodeLine>
              <span>{`}`}</span>
            </CodeLine>
          </EditorContent>
        </EditorPreview>
      </HeroContent>
    </HeroSection>
  );
}
