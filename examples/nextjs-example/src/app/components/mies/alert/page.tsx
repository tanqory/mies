'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Alert,
  AlertDescription,
  AlertTitle,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../../../components/navigation';
import { Palette } from 'lucide-react';

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

export default function AlertPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Alert</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Display important messages, notifications, and status updates to users.
              Supports multiple variants for different types of information and actions.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Status Messages
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Multiple Variants
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Icon Support
            </Badge>
          </div>
        </div>

        {/* Component Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Component Overview</h2>
              <p className="text-muted-foreground">
                The Alert component provides a way to display important information to users.
                It supports different variants (default, destructive) and can include
                custom icons, titles, and descriptions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Variants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Palette className="h-4 w-4" /></div>
                  <div className="text-sm text-muted-foreground">Customizable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Smartphone className="h-6 w-6" /></div>
                  <div className="text-sm text-muted-foreground">Responsive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">♿</div>
                  <div className="text-sm text-muted-foreground">Accessible</div>
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
              title="Default Alert"
              code={`<Alert>
  <LucideIcons.Info className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`}
            >
              <Alert>
                <LucideIcons.Info className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the cli.
                </AlertDescription>
              </Alert>
            </CodeExample>

            <CodeExample
              title="Destructive Alert"
              code={`<Alert variant="destructive">
  <LucideIcons.AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`}
            >
              <Alert variant="destructive">
                <LucideIcons.AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
            </CodeExample>

            <CodeExample
              title="Simple Alert"
              code={`<Alert>
  <LucideIcons.CheckCircle className="h-4 w-4" />
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`}
            >
              <Alert>
                <LucideIcons.CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>
            </CodeExample>

            <CodeExample
              title="Warning Alert"
              code={`<Alert>
  <LucideIcons.AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    This action cannot be undone. Please proceed with caution.
  </AlertDescription>
</Alert>`}
            >
              <Alert>
                <LucideIcons.AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>
            </CodeExample>
          </CardContent>
        </Card>

        <Separator />

        {/* Variants Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Alert Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Information</h3>
              <Alert>
                <LucideIcons.Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message to provide helpful context.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Success</h3>
              <Alert>
                <LucideIcons.CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Operation completed successfully. Your data has been saved.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Warning</h3>
              <Alert>
                <LucideIcons.AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please review your changes before proceeding.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Error</h3>
              <Alert variant="destructive">
                <LucideIcons.AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again or contact support.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* API Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">API Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Alert</h3>
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
                      <td className="p-2"><code>variant</code></td>
                      <td className="p-2">"default" | "destructive"</td>
                      <td className="p-2">"default"</td>
                      <td className="p-2">The visual style variant of the alert</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2"><code>className</code></td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Additional CSS classes to apply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AlertTitle</h3>
              <p className="text-sm text-muted-foreground">
                The AlertTitle component renders the main heading of the alert. It's typically used with an icon and description.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AlertDescription</h3>
              <p className="text-sm text-muted-foreground">
                The AlertDescription component renders the main content of the alert. It provides detailed information about the alert message.
              </p>
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
                  <li>• Use appropriate icons for different alert types</li>
                  <li>• Keep alert messages concise and actionable</li>
                  <li>• Use consistent language and tone</li>
                  <li>• Place alerts near the relevant content</li>
                  <li>• Provide clear next steps when appropriate</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use alerts for general content or marketing messages</li>
                  <li>• Stack multiple alerts of the same type</li>
                  <li>• Use destructive variant for non-critical issues</li>
                  <li>• Include too much text in a single alert</li>
                  <li>• Use alerts for permanent content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Common Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Form Validation</h3>
              <Alert variant="destructive">
                <LucideIcons.AlertCircle className="h-4 w-4" />
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>
                  Please correct the following errors:
                  <ul className="mt-2 ml-4 list-disc">
                    <li>Email is required</li>
                    <li>Password must be at least 8 characters</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Status</h3>
              <Alert>
                <LucideIcons.Wifi className="h-4 w-4" />
                <AlertTitle>System Maintenance</AlertTitle>
                <AlertDescription>
                  Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.
                  Some features may be temporarily unavailable.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Feature Announcement</h3>
              <Alert>
                <LucideIcons.Sparkles className="h-4 w-4" />
                <AlertTitle>New Feature Available</AlertTitle>
                <AlertDescription>
                  Try our new dashboard analytics! Get insights into your data with
                  interactive charts and real-time updates.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}