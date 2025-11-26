'use client';

import * as React from 'react';
import { styled } from '@mui/system';
import { Editor } from '@mui/x-editor';
import { Card, CardContent, Typography, Chip, Grid, Container } from '@mui/material';

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

const ExampleCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ExampleEditor = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  padding: '1rem',
  marginTop: '1rem',
  minHeight: '200px',
  border: `1px solid ${theme.palette.divider}`,
  '& .ProseMirror': {
    outline: 'none',
    minHeight: '150px',
  },
}));

interface Example {
  title: string;
  description: string;
  tags: string[];
  initialContent: string;
}

const examples: Example[] = [
  {
    title: 'Blog Post',
    description: 'A typical blog post with title, paragraphs, and formatting',
    tags: ['Articles', 'Content'],
    initialContent: `<h1>My First Blog Post</h1>
    <p>This is an example of a blog post created with the MUI X Editor. You can add <strong>bold text</strong>, <em>italic text</em>, and more.</p>
    <p>The editor supports multiple paragraphs, making it perfect for long-form content.</p>`,
  },
  {
    title: 'Product Description',
    description: 'E-commerce product description with features list',
    tags: ['E-commerce', 'Marketing'],
    initialContent: `<h2>Premium Wireless Headphones</h2>
    <p>Experience crystal-clear audio with our latest wireless headphones.</p>
    <h3>Key Features:</h3>
    <ul>
      <li>Active Noise Cancellation</li>
      <li>40-hour battery life</li>
      <li>Premium comfort padding</li>
      <li>Bluetooth 5.2 connectivity</li>
    </ul>`,
  },
  {
    title: 'Meeting Notes',
    description: 'Structured meeting notes with action items',
    tags: ['Business', 'Productivity'],
    initialContent: `<h2>Team Meeting - Q4 Planning</h2>
    <p><strong>Date:</strong> November 26, 2024</p>
    <p><strong>Attendees:</strong> Product, Engineering, Design</p>
    <h3>Discussion Points:</h3>
    <ol>
      <li>Q3 retrospective</li>
      <li>Q4 roadmap priorities</li>
      <li>Resource allocation</li>
    </ol>
    <h3>Action Items:</h3>
    <ul>
      <li>[ ] Update project timeline</li>
      <li>[ ] Schedule design review</li>
      <li>[ ] Send Q3 report</li>
    </ul>`,
  },
  {
    title: 'Technical Documentation',
    description: 'API documentation with code examples',
    tags: ['Documentation', 'Technical'],
    initialContent: `<h1>API Reference</h1>
    <h2>Authentication</h2>
    <p>All API requests require authentication using an API key.</p>
    <h3>Example Request:</h3>
    <pre><code>curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/users</code></pre>
    <h3>Response:</h3>
    <pre><code>{
  "status": "success",
  "data": []
}</code></pre>`,
  },
  {
    title: 'Newsletter',
    description: 'Email newsletter with sections and highlights',
    tags: ['Email', 'Marketing'],
    initialContent: `<h1>📧 Weekly Newsletter</h1>
    <h2>This Week's Highlights</h2>
    <ul>
      <li>🚀 New feature launch</li>
      <li>📊 Q3 results are in</li>
      <li>🎯 Upcoming events</li>
    </ul>
    <blockquote>
      <p>"Innovation distinguishes between a leader and a follower." - Steve Jobs</p>
    </blockquote>
    <p>Thank you for being part of our community!</p>`,
  },
  {
    title: 'Recipe',
    description: 'Cooking recipe with ingredients and steps',
    tags: ['Lifestyle', 'Food'],
    initialContent: `<h1>🥘 Classic Pasta Carbonara</h1>
    <p><strong>Prep Time:</strong> 10 minutes | <strong>Cook Time:</strong> 20 minutes</p>
    <h2>Ingredients:</h2>
    <ul>
      <li>400g spaghetti</li>
      <li>200g pancetta</li>
      <li>4 large eggs</li>
      <li>100g Parmesan cheese</li>
      <li>Black pepper</li>
    </ul>
    <h2>Instructions:</h2>
    <ol>
      <li>Cook the spaghetti according to package directions</li>
      <li>While pasta cooks, crisp the pancetta in a large pan</li>
      <li>Beat eggs and cheese together</li>
      <li>Drain pasta, reserving 1 cup pasta water</li>
      <li>Toss hot pasta with pancetta and egg mixture</li>
    </ol>`,
  },
];

export default function ExamplesPage() {
  return (
    <PageContainer>
      <PageHeader>
        <Container maxWidth="lg">
          <PageTitle>Examples Gallery</PageTitle>
          <PageSubtitle>
            Explore different use cases and see how the MUI X Editor adapts to various content types.
            Each example is fully interactive - feel free to edit and experiment!
          </PageSubtitle>
        </Container>
      </PageHeader>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Grid container spacing={4}>
          {examples.map((example, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ExampleCard>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {example.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {example.description}
                  </Typography>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    {example.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                      />
                    ))}
                  </div>

                  <ExampleEditor>
                    <Editor
                      initialContent={example.initialContent}
                      placeholder="Edit this example..."
                    />
                  </ExampleEditor>
                </CardContent>
              </ExampleCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
}
