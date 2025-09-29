import type { Meta, StoryObj } from '@storybook/react'
import {
  Chips,
  RangeEnhanced,
  Notification,
  PopupEnhanced,
  CounterAnimation,
  DragDrop,
  AutocompleteEnhanced,
} from '../../src/x'
import { Button } from '../../src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card'
import { Rocket, Zap, Palette, FileText } from 'lucide-react'
import { useState } from 'react'

const meta: Meta = {
  title: 'Mies X/Overview',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Mies X - Extended component library based on Polaris Core. Import from @tanqory/mies/x',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AllComponents: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', value: 'react' },
      { id: '2', label: 'TypeScript', value: 'typescript' },
    ])

    const [rangeValue, setRangeValue] = useState([75])

    const [dragItems, setDragItems] = useState([
      { id: '1', content: <div className="p-2 flex items-center gap-2"><Rocket className="h-4 w-4" /> Task 1: Setup project</div> },
      { id: '2', content: <div className="p-2 flex items-center gap-2"><Zap className="h-4 w-4" /> Task 2: Add components</div> },
      { id: '3', content: <div className="p-2 flex items-center gap-2"><Palette className="h-4 w-4" /> Task 3: Style components</div> },
      { id: '4', content: <div className="p-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Task 4: Write documentation</div> },
    ])

    const autocompleteOptions = [
      { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
      { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
      { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
      { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
      { value: 'nextjs', label: 'Next.js', description: 'The React Framework for the Web' },
    ]

    const [selectedFramework, setSelectedFramework] = useState('')

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Mies X Components</h1>
          <p className="text-muted-foreground">
            Extended component library based on Polaris Core
          </p>
          <code className="text-sm bg-muted px-2 py-1 rounded mt-2 inline-block">
            import {`{ Component }`} from '@tanqory/mies/x'
          </code>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chips */}
          <Card>
            <CardHeader>
              <CardTitle>Chips</CardTitle>
              <CardDescription>
                Tag input with add/remove functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Chips
                chips={chips}
                onChipsChange={setChips}
                placeholder="Add technologies..."
                variant="default"
              />
            </CardContent>
          </Card>

          {/* Range Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle>Range Enhanced</CardTitle>
              <CardDescription>
                Advanced range slider with progress visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RangeEnhanced
                value={rangeValue}
                onValueChange={setRangeValue}
                label="Project Progress"
                showProgress
                showValue
                showMinMax
                formatValue={(val) => `${val}%`}
                min={0}
                max={100}
                progressColor="#10b981"
              />
            </CardContent>
          </Card>

          {/* Notification */}
          <Card>
            <CardHeader>
              <CardTitle>Notification</CardTitle>
              <CardDescription>
                Toast-style notifications with auto-dismiss
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Notification
                  variant="success"
                  title="Success!"
                  description="Your changes have been saved."
                  autoClose={false}
                />
                <Notification
                  variant="warning"
                  title="Warning"
                  description="Please review your settings."
                  autoClose={false}
                />
              </div>
            </CardContent>
          </Card>

          {/* Popup Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle>Popup Enhanced</CardTitle>
              <CardDescription>
                Click-triggered popups with advanced features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <PopupEnhanced
                  trigger={<Button variant="outline">Settings</Button>}
                  title="Quick Settings"
                  size="default"
                >
                  <div className="space-y-2">
                    <p className="text-sm">Configure your preferences</p>
                    <Button size="sm" className="w-full">Save Changes</Button>
                  </div>
                </PopupEnhanced>

                <PopupEnhanced
                  trigger={<Button variant="outline">Help</Button>}
                  title="Need Help?"
                  arrow
                >
                  <p className="text-sm">Contact support for assistance.</p>
                </PopupEnhanced>
              </div>
            </CardContent>
          </Card>

          {/* Counter Animation */}
          <Card>
            <CardHeader>
              <CardTitle>Counter Animation</CardTitle>
              <CardDescription>
                Animated counters with easing effects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Users</p>
                  <CounterAnimation
                    end={12845}
                    size="xl"
                    weight="bold"
                    variant="primary"
                    separator=","
                    duration={2000}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                  <CounterAnimation
                    end={95750}
                    size="xl"
                    weight="bold"
                    variant="success"
                    prefix="$"
                    separator=","
                    duration={2500}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Autocomplete Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle>Autocomplete Enhanced</CardTitle>
              <CardDescription>
                Advanced search with filtering and grouping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AutocompleteEnhanced
                options={autocompleteOptions}
                value={selectedFramework}
                onValueChange={setSelectedFramework}
                placeholder="Choose a framework..."
                searchable
                clearable
              />
            </CardContent>
          </Card>
        </div>

        {/* Drag Drop - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Drag & Drop</CardTitle>
            <CardDescription>
              Sortable lists with drag and drop functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DragDrop
              items={dragItems}
              onItemsChange={setDragItems}
              showHandle
              layout="vertical"
            />
          </CardContent>
        </Card>

        {/* Installation & Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Installation & Usage</CardTitle>
            <CardDescription>
              How to use Mies X components in your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  npm install @tanqory/mies
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Import Components</h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  {`import { Chips, RangeEnhanced, Notification } from '@tanqory/mies/x'`}
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• TypeScript support</li>
                  <li>• Tailwind CSS styling</li>
                  <li>• Accessible components</li>
                  <li>• Customizable themes</li>
                  <li>• React hooks included</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}