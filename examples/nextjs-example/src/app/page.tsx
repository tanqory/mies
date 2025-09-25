'use client';

// Import core components only to avoid SSR issues
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
  Skeleton,
  Separator,
  useTheme,
  LucideIcons,
} from '@tanqory/mies';
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
      >
        <LucideIcons.Sun className="h-4 w-4" />
        <span className="ml-2">Toggle Theme (loading...)</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <LucideIcons.Moon className="h-4 w-4" /> : <LucideIcons.Sun className="h-4 w-4" />}
      <span className="ml-2">Toggle Theme</span>
    </Button>
  );
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">@tanqory/mies</h1>
            <p className="text-muted-foreground">Next.js 15 Example - Component Showcase</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Alert */}
        <Alert>
          <LucideIcons.Info className="h-4 w-4" />
          <AlertTitle>Welcome!</AlertTitle>
          <AlertDescription>
            This is a demonstration of the @tanqory/mies component library running in Next.js 15 with App Router.
          </AlertDescription>
        </Alert>

        {/* Buttons & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons & Actions</CardTitle>
            <CardDescription>Different button variants and interactive elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <LucideIcons.Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              <Button onClick={handleLoadingDemo} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <LucideIcons.Download className="h-4 w-4 mr-2" />
                    Start Download
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="th">Thailand</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Enter your message..." />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked === true)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <label htmlFor="notifications" className="text-sm">
                  Email notifications
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Contact</label>
              <RadioGroup defaultValue="email" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <label htmlFor="email" className="text-sm">Email</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <label htmlFor="phone" className="text-sm">Phone</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <label htmlFor="sms" className="text-sm">SMS</label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Data Display */}
        <Card>
          <CardHeader>
            <CardTitle>Data Display</CardTitle>
            <CardDescription>Badges, avatars, and progress indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>XY</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs Navigation</CardTitle>
            <CardDescription>Tabbed content sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <LucideIcons.Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,543</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                      <LucideIcons.DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12,345</div>
                      <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                      <LucideIcons.Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">847</div>
                      <p className="text-xs text-muted-foreground">+23% from last hour</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>View your analytics data here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                      <LucideIcons.BarChart className="h-8 w-8 mr-2" />
                      Analytics charts would go here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                      <ThemeToggle />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p>Built with @tanqory/mies component library</p>
          <p className="text-sm mt-1">Next.js 15 • App Router • TypeScript</p>
        </div>
      </div>
    </main>
  );
}
