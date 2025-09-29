'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
} from '@tanqory/mies';
import { PageLayout } from '../../../../components/navigation';

const TypographyExample = ({
  title,
  className,
  description,
  example = "The quick brown fox jumps over the lazy dog"
}: {
  title: string;
  className: string;
  description: string;
  example?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Badge variant="outline" className="text-xs">{className}</Badge>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
    <div className={`${className} bg-muted/50 p-4 rounded-lg border`}>
      {example}
    </div>
  </div>
);

export default function TypographyPage() {
  const headingStyles = [
    {
      title: "Heading 1",
      className: "text-4xl font-bold tracking-tight lg:text-5xl",
      description: "Main page headers and primary headings",
      example: "Main Page Title"
    },
    {
      title: "Heading 2",
      className: "text-3xl font-semibold tracking-tight",
      description: "Section headers and secondary headings",
      example: "Section Header"
    },
    {
      title: "Heading 3",
      className: "text-2xl font-semibold tracking-tight",
      description: "Subsection headers",
      example: "Subsection Title"
    },
    {
      title: "Heading 4",
      className: "text-xl font-semibold tracking-tight",
      description: "Component and card headers",
      example: "Component Header"
    },
  ];

  const bodyStyles = [
    {
      title: "Large Text",
      className: "text-lg",
      description: "Large body text for emphasis",
      example: "Important information that needs to stand out from regular body text."
    },
    {
      title: "Body Text",
      className: "text-base",
      description: "Default body text and paragraphs",
      example: "Regular body text used for most content, providing good readability and comfortable reading experience."
    },
    {
      title: "Small Text",
      className: "text-sm",
      description: "Secondary information and captions",
      example: "Supporting information, captions, and secondary details that complement the main content."
    },
    {
      title: "Extra Small",
      className: "text-xs",
      description: "Labels, badges, and fine print",
      example: "Fine print, labels, and other micro-content that requires minimal space."
    },
  ];

  const specialStyles = [
    {
      title: "Muted Text",
      className: "text-muted-foreground",
      description: "Secondary text with reduced emphasis",
      example: "This text appears with reduced opacity for secondary information."
    },
    {
      title: "Lead Text",
      className: "text-xl text-muted-foreground",
      description: "Introduction text and subtitles",
      example: "Lead text that introduces sections or provides context for the following content."
    },
    {
      title: "Inline Code",
      className: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded",
      description: "Inline code snippets",
      example: "const example = 'inline code';"
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Typography</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Carefully crafted typography scale with consistent spacing, optimal line heights,
              and excellent readability across all devices and screen sizes.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Inter Font
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Responsive Scale
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Accessible
            </Badge>
          </div>
        </div>

        {/* Typography Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Typography System</h2>
              <p className="text-muted-foreground">
                Our typography system uses Inter font family for optimal readability and modern appearance.
                The scale is designed to create clear hierarchy while maintaining consistency across
                different content types and screen sizes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Inter</div>
                  <div className="text-sm text-muted-foreground">Primary Font</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Size Variants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1.6</div>
                  <div className="text-sm text-muted-foreground">Line Height Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">AA</div>
                  <div className="text-sm text-muted-foreground">WCAG Compliance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heading Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Heading Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {headingStyles.map((style, index) => (
              <TypographyExample key={index} {...style} />
            ))}
          </CardContent>
        </Card>

        {/* Body Text Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Body Text Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {bodyStyles.map((style, index) => (
              <TypographyExample key={index} {...style} />
            ))}
          </CardContent>
        </Card>

        {/* Special Text Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Special Text Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {specialStyles.map((style, index) => (
              <TypographyExample key={index} {...style} />
            ))}
          </CardContent>
        </Card>

        <Separator />

        {/* Typography Scale */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Typography Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Complete typography scale with Tailwind CSS classes and corresponding sizes.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Class</th>
                      <th className="text-left p-2">Size</th>
                      <th className="text-left p-2">Line Height</th>
                      <th className="text-left p-2">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2"><code>text-xs</code></td>
                      <td className="p-2">12px</td>
                      <td className="p-2">16px</td>
                      <td className="p-2">Labels, captions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-sm</code></td>
                      <td className="p-2">14px</td>
                      <td className="p-2">20px</td>
                      <td className="p-2">Secondary text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-base</code></td>
                      <td className="p-2">16px</td>
                      <td className="p-2">24px</td>
                      <td className="p-2">Body text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-lg</code></td>
                      <td className="p-2">18px</td>
                      <td className="p-2">28px</td>
                      <td className="p-2">Large text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-xl</code></td>
                      <td className="p-2">20px</td>
                      <td className="p-2">28px</td>
                      <td className="p-2">Headings</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-2xl</code></td>
                      <td className="p-2">24px</td>
                      <td className="p-2">32px</td>
                      <td className="p-2">Section headers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-3xl</code></td>
                      <td className="p-2">30px</td>
                      <td className="p-2">36px</td>
                      <td className="p-2">Page headers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>text-4xl</code></td>
                      <td className="p-2">36px</td>
                      <td className="p-2">40px</td>
                      <td className="p-2">Main titles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Code Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Typography</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`<h1 className="text-4xl font-bold tracking-tight">
  Main Title
</h1>

<p className="text-lg text-muted-foreground">
  Lead paragraph with larger text
</p>

<p className="text-base">
  Regular body text for content
</p>

<span className="text-sm text-muted-foreground">
  Caption or secondary information
</span>`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Typography Combinations</h3>
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Article Title
                </h2>
                <p className="text-xl text-muted-foreground">
                  This is a subtitle or lead paragraph that introduces the main content.
                </p>
                <p className="text-base">
                  This is the main body text. It uses the default text size and provides
                  good readability for longer content. The line height is optimized for
                  comfortable reading.
                </p>
                <p className="text-sm text-muted-foreground">
                  Published on March 15, 2024 • 5 min read
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Typography Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use consistent hierarchy throughout your application</li>
                  <li>• Pair headings with appropriate body text sizes</li>
                  <li>• Use muted text for secondary information</li>
                  <li>• Test readability on different screen sizes</li>
                  <li>• Maintain adequate line spacing for readability</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Mix too many font sizes on one page</li>
                  <li>• Use very long lines of text without breaks</li>
                  <li>• Set text too small for accessibility</li>
                  <li>• Override font weights without purpose</li>
                  <li>• Use poor color contrast for text</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}