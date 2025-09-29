'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Alert,
  AlertDescription,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../../components/navigation';
import {
  TopBar,
  CalloutCard,
  EmptyState,
  Page,
  IndexFilters,
  DropZone,
  Chips,
  RangeEnhanced,
  AutocompleteEnhanced,
  Notification,
  PopupEnhanced,
  CounterAnimation,
  DragDrop,
} from '@tanqory/mies/x';

export default function MiesXPage() {
  const [chipItems, setChipItems] = React.useState([
    { id: '1', label: 'React', value: 'react' },
    { id: '2', label: 'TypeScript', value: 'typescript' },
  ]);

  const [rangeValue, setRangeValue] = React.useState([25, 75]);

  const [selectedOptions, setSelectedOptions] = React.useState(['option1']);

  const autocompleteOptions = [
    { value: 'nextjs', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'storybook', label: 'Storybook' },
  ];

  const dragDropItems = [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
    { id: '3', content: 'Task 3' },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Mies X Extended Components</h1>
              <p className="text-muted-foreground text-lg">
                Advanced dashboard components imported from @tanqory/mies/x
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">13 Extended Components</Badge>
            <Badge variant="outline">Import from /x</Badge>
          </div>
        </div>

        <Alert>
          <LucideIcons.Info className="h-4 w-4" />
          <AlertDescription>
            Extended components require separate import: <code className="bg-muted px-2 py-1 rounded">import &#123; TopBar &#125; from '@tanqory/mies/x'</code>
          </AlertDescription>
        </Alert>

        {/* TopBar Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Navigation className="h-5 w-5" />
              TopBar
            </CardTitle>
            <CardDescription>
              Application navigation bar with logo, search, notifications, and user menu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <TopBar
                logo={{ source: "/logo.png", alt: "Tanqory", width: 32, height: 32 }}
                searchField={
                  <TopBar.SearchField
                    placeholder="Search components..."
                    onSubmit={(query) => console.log('Search:', query)}
                  />
                }
                userMenu={{
                  name: "John Doe",
                  detail: "john@example.com",
                  avatar: "/avatar.jpg",
                  actions: [
                    {
                      items: [
                        { content: "Profile", onAction: () => console.log('Profile') },
                        { content: "Settings", onAction: () => console.log('Settings') },
                        { content: "Sign out", onAction: () => console.log('Sign out') }
                      ]
                    }
                  ]
                }}
                notifications={{
                  count: 3,
                  onAction: () => console.log('Notifications')
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Page Component */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layout className="h-5 w-5" />
              Page Layout
            </CardTitle>
            <CardDescription>
              Complete page layout with header, actions, and breadcrumbs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Page
                title="Users Management"
                subtitle="Manage user accounts and permissions"
                primaryAction={{ content: "Add User", onAction: () => console.log('Add user') }}
                secondaryActions={[
                  { content: "Export", onAction: () => console.log('Export') },
                  { content: "Import", onAction: () => console.log('Import') }
                ]}
                breadcrumbs={[
                  { content: "Home", onAction: () => console.log('Home') },
                  { content: "Users" }
                ]}
              >
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Page content goes here
                  </CardContent>
                </Card>
              </Page>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Input Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chips Input</CardTitle>
              <CardDescription>Tag input with add/remove functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <Chips
                chips={chipItems}
                placeholder="Add a technology..."
                onChipsChange={setChipItems}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enhanced Range</CardTitle>
              <CardDescription>Advanced range slider with progress visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <RangeEnhanced
                value={rangeValue}
                onValueChange={setRangeValue}
                min={0}
                max={100}
                step={1}
                label="Price Range"
                showLabels
                formatLabel={(value) => `$${value}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enhanced Autocomplete</CardTitle>
              <CardDescription>Search with filtering and custom options</CardDescription>
            </CardHeader>
            <CardContent>
              <AutocompleteEnhanced
                options={autocompleteOptions}
                placeholder="Search technologies..."
                onSelectionChange={(value) => console.log('Selected:', value)}
                allowMultiple={false}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Counter Animation</CardTitle>
              <CardDescription>Animated number counters with easing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <CounterAnimation
                    end={1234}
                    duration={2000}
                    prefix="$"
                    suffix="K"
                    className="text-2xl font-bold text-primary"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Revenue</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <CounterAnimation
                    end={98.5}
                    duration={2000}
                    decimals={1}
                    suffix="%"
                    className="text-2xl font-bold text-accent"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CalloutCard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Megaphone className="h-5 w-5" />
              Callout Card
            </CardTitle>
            <CardDescription>
              Call-to-action cards with illustrations and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalloutCard
                title="Upgrade to Pro"
                illustration="/upgrade.svg"
                primaryAction={{ content: "Upgrade Now", onAction: () => console.log('Upgrade') }}
                secondaryAction={{ content: "Learn More", onAction: () => console.log('Learn more') }}
              >
                Unlock advanced features and get priority support for your projects.
              </CalloutCard>

              <CalloutCard
                title="Invite Your Team"
                illustration="/team.svg"
                primaryAction={{ content: "Send Invites", onAction: () => console.log('Invite') }}
                dismissed={false}
                onDismiss={() => console.log('Dismissed')}
              >
                Collaborate better by inviting team members to join your workspace.
              </CalloutCard>
            </div>
          </CardContent>
        </Card>

        {/* EmptyState */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.FileX className="h-5 w-5" />
              Empty State
            </CardTitle>
            <CardDescription>
              Empty state screens with actions and illustrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              heading="No users found"
              image="/empty-state.svg"
              action={{ content: "Add first user", onAction: () => console.log('Add user') }}
              secondaryAction={{ content: "Import users", onAction: () => console.log('Import') }}
            >
              Get started by adding your first user to the system. You can also import users from a CSV file.
            </EmptyState>
          </CardContent>
        </Card>

        {/* DropZone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Upload className="h-5 w-5" />
              Drop Zone
            </CardTitle>
            <CardDescription>
              File upload with drag & drop support and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropZone
              accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
              onDrop={(files) => console.log('Dropped files:', files)}
              label="Drop images here or click to browse"
              helperText="Upload up to 5 images (max 5MB each)"
            />
          </CardContent>
        </Card>

        {/* DragDrop */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Move className="h-5 w-5" />
              Drag Drop
            </CardTitle>
            <CardDescription>
              Sortable lists with drag & drop functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DragDrop
              items={dragDropItems}
              onReorder={(items) => console.log('Reordered:', items)}
              renderItem={(item) => (
                <div className="p-3 border rounded-lg bg-background cursor-move">
                  {item.content}
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* IndexFilters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Filter className="h-5 w-5" />
              Index Filters
            </CardTitle>
            <CardDescription>
              Advanced filtering with search, tabs, and sort options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IndexFilters
              tabs={[
                { id: "all", content: "All Users", badge: "150" },
                { id: "active", content: "Active", badge: "120" },
                { id: "inactive", content: "Inactive", badge: "30" }
              ]}
              selected={0}
              onSelect={(index) => console.log('Selected tab:', index)}
              filters={[
                {
                  key: "role",
                  label: "Role",
                  type: "select",
                  options: [
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                    { label: "Guest", value: "guest" }
                  ]
                },
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" }
                  ]
                }
              ]}
              searchValue=""
              onSearchChange={(value) => console.log('Search:', value)}
              sortOptions={[
                { label: "Name A-Z", value: "name-asc" },
                { label: "Name Z-A", value: "name-desc" },
                { label: "Date created", value: "created-desc" }
              ]}
              sortSelected="name-asc"
              onSortChange={(value) => console.log('Sort:', value)}
            />
          </CardContent>
        </Card>

        {/* Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Bell className="h-5 w-5" />
              Notification
            </CardTitle>
            <CardDescription>
              Toast-style notifications with auto-dismiss
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => console.log('Show success notification')}
              >
                Success
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => console.log('Show error notification')}
              >
                Error
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Show info notification')}
              >
                Info
              </Button>
            </div>
            <div className="border rounded-lg p-4">
              <Notification
                type="success"
                title="Success!"
                message="Your changes have been saved successfully."
                onDismiss={() => console.log('Notification dismissed')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}