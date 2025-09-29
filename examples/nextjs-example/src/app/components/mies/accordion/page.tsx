'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tanqory/mies';
import { PageLayout } from '../../../../components/navigation';
import { Palette, Keyboard } from 'lucide-react';

const CodeExample = ({ title, code, children }: { title: string; code: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="border rounded-lg p-4 bg-muted/20">
      {children}
    </div>
    <div className="bg-muted p-4 rounded-lg">
      <pre className="text-sm overflow-x-auto"><code>{code}</code></pre>
    </div>
  </div>
);

export default function AccordionPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Accordion</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A collapsible content component that allows users to expand and collapse sections
              to show or hide content. Perfect for FAQs, settings panels, and content organization.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Collapsible
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Accessible
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Keyboard Navigation
            </Badge>
          </div>
        </div>

        {/* Component Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Component Overview</h2>
              <p className="text-muted-foreground">
                The Accordion component is built on top of Radix UI primitives, providing
                excellent accessibility and keyboard navigation out of the box. It supports
                single or multiple items being open at once.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">A11y</div>
                  <div className="text-sm text-muted-foreground">Accessible</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">WAI-ARIA</div>
                  <div className="text-sm text-muted-foreground">Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Keyboard className="h-6 w-6" /></div>
                  <div className="text-sm text-muted-foreground">Keyboard Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Palette className="h-4 w-4" /></div>
                  <div className="text-sm text-muted-foreground">Customizable</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <CodeExample
              title="Basic Accordion"
              code={`<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CodeExample>

            <CodeExample
              title="Multiple Accordion"
              code={`<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
    <AccordionContent>
      Yes! This accordion allows multiple items to be open simultaneously.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How does it work?</AccordionTrigger>
    <AccordionContent>
      Set the type prop to "multiple" to allow multiple items to be open.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
                  <AccordionContent>
                    Yes! This accordion allows multiple items to be open simultaneously.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does it work?</AccordionTrigger>
                  <AccordionContent>
                    Set the type prop to "multiple" to allow multiple items to be open.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Any limitations?</AccordionTrigger>
                  <AccordionContent>
                    No limitations! You can have as many items open as you want.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CodeExample>
          </CardContent>
        </Card>

        <Separator />

        {/* API Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">API Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Accordion</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2"><code>type</code></td>
                      <td className="p-2">"single" | "multiple"</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Determines whether one or multiple items can be opened at the same time</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>collapsible</code></td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">When type is "single", allows closing all items</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>defaultValue</code></td>
                      <td className="p-2">string | string[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">The default value for controlled components</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>value</code></td>
                      <td className="p-2">string | string[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">The controlled value of the accordion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AccordionItem</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2"><code>value</code></td>
                      <td className="p-2">string</td>
                      <td className="p-2">A unique value for the item</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>disabled</code></td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">When true, prevents the user from interacting with the item</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use for organizing related content sections</li>
                  <li>• Provide clear, descriptive trigger labels</li>
                  <li>• Use for FAQs and help documentation</li>
                  <li>• Keep content sections focused and concise</li>
                  <li>• Use consistent content structure across items</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Nest accordions more than 2 levels deep</li>
                  <li>• Use for primary navigation</li>
                  <li>• Hide critical information that users need immediately</li>
                  <li>• Use vague or unclear trigger labels</li>
                  <li>• Include too much content in a single section</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}