import React, { useState } from 'react';
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
  LucideIcons,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Slider,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tanqory/mies';

interface ComponentsPageProps {
  onNavigate: (path: string) => void;
}

export default function ComponentsPage({ onNavigate }: ComponentsPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Core Components</h1>
            <p className="text-muted-foreground text-lg">
              Essential UI building blocks built on Radix UI primitives
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">48 Components</Badge>
          <Badge variant="outline">Radix UI</Badge>
          <Badge variant="outline">Accessible</Badge>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LucideIcons.Navigation className="h-5 w-5" />
            Component Categories
          </CardTitle>
          <CardDescription>
            Jump to different sections of the component library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Buttons', icon: LucideIcons.MousePointer },
              { name: 'Forms', icon: LucideIcons.FileEdit },
              { name: 'Data Display', icon: LucideIcons.BarChart },
              { name: 'Layout', icon: LucideIcons.Layout },
              { name: 'Feedback', icon: LucideIcons.MessageCircle },
              { name: 'Navigation', icon: LucideIcons.Menu },
            ].map((category) => {
              const Icon = category.icon;
              return (
                <Button key={category.name} variant="outline" className="h-16 flex-col gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

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

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume: {sliderValue[0]}</label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
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
          <CardDescription>Badges, avatars, tables, and progress indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Badges</h4>
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Avatars</h4>
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
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Table</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>
                      <Badge>Premium</Badge>
                    </TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-4">
              <h4 className="font-medium">Loading Skeletons</h4>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Layout Components */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Components</CardTitle>
          <CardDescription>Cards, separators, and accordion layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Accordion</h4>
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
                  Yes. It comes with default styles that matches the other components' aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Card Layouts</h4>
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
          </div>
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
              <Alert>
                <LucideIcons.Info className="h-4 w-4" />
                <AlertTitle>Overview Tab</AlertTitle>
                <AlertDescription>
                  This is the overview section with key metrics and information.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="analytics">
              <Alert>
                <LucideIcons.BarChart className="h-4 w-4" />
                <AlertTitle>Analytics Tab</AlertTitle>
                <AlertDescription>
                  Analytics charts and data visualizations would be displayed here.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="settings">
              <Alert>
                <LucideIcons.Settings className="h-4 w-4" />
                <AlertTitle>Settings Tab</AlertTitle>
                <AlertDescription>
                  Application settings and preferences can be configured here.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Explore More</CardTitle>
          <CardDescription>
            Continue exploring the @tanqory/mies component library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => onNavigate('/foundation')}>
              <LucideIcons.Palette className="mr-2 h-4 w-4" />
              Foundation
            </Button>
            <Button variant="outline" onClick={() => onNavigate('/mies-x')}>
              <LucideIcons.Zap className="mr-2 h-4 w-4" />
              Mies X Extended
            </Button>
            <Button variant="outline" onClick={() => onNavigate('/animation')}>
              <LucideIcons.TrendingUp className="mr-2 h-4 w-4" />
              Component Blocks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}