'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import CodeIcon from '@mui/icons-material/Code';
import ExtensionIcon from '@mui/icons-material/Extension';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import TranslateIcon from '@mui/icons-material/Translate';
import PaletteIcon from '@mui/icons-material/Palette';

const FeaturesSection = styled('section')(({ theme }) => ({
  padding: '6rem 1.5rem',
  backgroundColor: theme.palette.background.default,
}));

const FeaturesContainer = styled('div')(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
}));

const SectionHeader = styled('div')(() => ({
  textAlign: 'center',
  marginBottom: '4rem',
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

const FeaturesGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
}));

const FeatureCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const FeatureIcon = styled('div')(({ theme }) => ({
  width: '56px',
  height: '56px',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  transition: 'transform 0.3s',
  '& svg': {
    fontSize: '28px',
    color: theme.palette.primary.main,
  },
}));

const FeatureTitle = styled('h3')(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  color: theme.palette.text.primary,
}));

const FeatureDescription = styled('p')(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
  margin: 0,
}));

const FeatureTags = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '1rem',
}));

const FeatureTag = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const features: Feature[] = [
  {
    icon: <FormatBoldIcon />,
    title: 'Rich Text Formatting',
    description: 'Full support for bold, italic, underline, strikethrough, and more text formatting options.',
    tags: ['Bold', 'Italic', 'Underline'],
  },
  {
    icon: <CodeIcon />,
    title: 'Code Blocks',
    description: 'Syntax highlighting for multiple programming languages with automatic indentation.',
    tags: ['Syntax Highlight', 'Auto-indent'],
  },
  {
    icon: <ExtensionIcon />,
    title: 'Extensible Plugins',
    description: 'Built on ProseMirror\'s powerful plugin system for custom functionality.',
    tags: ['Plugins', 'Extensions', 'Custom'],
  },
  {
    icon: <SpeedIcon />,
    title: 'High Performance',
    description: 'Optimized rendering and efficient DOM updates for smooth editing experience.',
    tags: ['Fast', 'Optimized', 'Smooth'],
  },
  {
    icon: <SecurityIcon />,
    title: 'TypeScript Support',
    description: 'Full TypeScript definitions for type-safe development and better IDE support.',
    tags: ['TypeScript', 'Type-safe', 'IntelliSense'],
  },
  {
    icon: <DevicesIcon />,
    title: 'Responsive Design',
    description: 'Works seamlessly across desktop, tablet, and mobile devices.',
    tags: ['Mobile', 'Tablet', 'Desktop'],
  },
  {
    icon: <TranslateIcon />,
    title: 'Internationalization',
    description: 'Built-in support for multiple languages and RTL text direction.',
    tags: ['i18n', 'RTL', 'Localization'],
  },
  {
    icon: <PaletteIcon />,
    title: 'Theme Customization',
    description: 'Easily customize colors, fonts, and styles to match your brand.',
    tags: ['Themes', 'Customizable', 'Styles'],
  },
];

export function Features() {
  return (
    <FeaturesSection>
      <FeaturesContainer>
        <SectionHeader>
          <SectionTitle>Everything You Need</SectionTitle>
          <SectionSubtitle>
            Packed with powerful features to create the perfect editing experience
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon className="feature-icon">
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureTags>
                {feature.tags.map((tag, tagIndex) => (
                  <FeatureTag key={tagIndex}>{tag}</FeatureTag>
                ))}
              </FeatureTags>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
}
