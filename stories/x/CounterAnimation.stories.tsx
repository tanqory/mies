import type { Meta, StoryObj } from '@storybook/react'
import { CounterAnimation } from '../../src/components/x/counter-animation'
import { Button } from '../../src/components/ui/button'
import { useState } from 'react'

const meta: Meta<typeof CounterAnimation> = {
  title: 'Mies X/CounterAnimation',
  component: CounterAnimation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An animated counter component based on Polaris Core.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    start: 0,
    end: 100,
    duration: 2000,
    autoStart: true,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 text-center">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <CounterAnimation end={50} variant="default" size="2xl" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Primary</h3>
        <CounterAnimation end={75} variant="primary" size="2xl" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Success</h3>
        <CounterAnimation end={95} variant="success" size="2xl" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Warning</h3>
        <CounterAnimation end={25} variant="warning" size="2xl" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 text-center">
      <div>
        <span className="text-xs text-muted-foreground mr-2">XS:</span>
        <CounterAnimation end={100} size="xs" />
      </div>
      <div>
        <span className="text-sm text-muted-foreground mr-2">SM:</span>
        <CounterAnimation end={100} size="sm" />
      </div>
      <div>
        <span className="text-base text-muted-foreground mr-2">Default:</span>
        <CounterAnimation end={100} size="default" />
      </div>
      <div>
        <span className="text-lg text-muted-foreground mr-2">LG:</span>
        <CounterAnimation end={100} size="lg" />
      </div>
      <div>
        <span className="text-xl text-muted-foreground mr-2">XL:</span>
        <CounterAnimation end={100} size="xl" />
      </div>
      <div>
        <span className="text-2xl text-muted-foreground mr-2">2XL:</span>
        <CounterAnimation end={100} size="2xl" />
      </div>
    </div>
  ),
}

export const WithFormatting: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 text-center">
      <div>
        <h3 className="text-sm font-medium mb-2">Currency</h3>
        <CounterAnimation
          end={1234.56}
          size="2xl"
          precision={2}
          prefix="$"
          separator=","
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Percentage</h3>
        <CounterAnimation
          end={87.5}
          size="2xl"
          precision={1}
          suffix="%"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large Numbers</h3>
        <CounterAnimation
          end={1000000}
          size="2xl"
          separator=","
          formatValue={(val) => `${(val / 1000000).toFixed(1)}M`}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Custom Format</h3>
        <CounterAnimation
          end={42}
          size="2xl"
          formatValue={(val) => `Level ${Math.floor(val)}`}
        />
      </div>
    </div>
  ),
}

export const ControlledExample: Story = {
  render: () => {
    const [isAnimating, setIsAnimating] = useState(false)
    const [target, setTarget] = useState(100)

    const startAnimation = () => {
      setIsAnimating(true)
      setTarget(Math.floor(Math.random() * 1000))
    }

    return (
      <div className="text-center space-y-4">
        <div>
          <CounterAnimation
            key={target} // Force re-render for new animation
            end={target}
            size="4xl"
            weight="bold"
            variant="primary"
            duration={2000}
            onComplete={() => setIsAnimating(false)}
            autoStart={isAnimating}
          />
        </div>

        <Button
          onClick={startAnimation}
          disabled={isAnimating}
        >
          {isAnimating ? 'Counting...' : 'Start Random Count'}
        </Button>
      </div>
    )
  },
}

export const DifferentEasing: Story = {
  render: () => {
    const [key, setKey] = useState(0)

    const restart = () => setKey(prev => prev + 1)

    return (
      <div className="space-y-6 text-center">
        <Button onClick={restart} className="mb-4">
          Restart All Animations
        </Button>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-2">Linear</h3>
            <CounterAnimation
              key={`linear-${key}`}
              end={100}
              size="xl"
              duration={3000}
              easingFunction={(t) => t}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Ease Out</h3>
            <CounterAnimation
              key={`ease-out-${key}`}
              end={100}
              size="xl"
              duration={3000}
              easingFunction={(t) => t * (2 - t)}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Ease In</h3>
            <CounterAnimation
              key={`ease-in-${key}`}
              end={100}
              size="xl"
              duration={3000}
              easingFunction={(t) => t * t}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Bounce</h3>
            <CounterAnimation
              key={`bounce-${key}`}
              end={100}
              size="xl"
              duration={3000}
              easingFunction={(t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1}
            />
          </div>
        </div>
      </div>
    )
  },
}

export const StatsDashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Users</h3>
        <CounterAnimation
          end={15420}
          size="2xl"
          weight="bold"
          variant="primary"
          separator=","
          duration={2500}
        />
      </div>

      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Revenue</h3>
        <CounterAnimation
          end={89750}
          size="2xl"
          weight="bold"
          variant="success"
          prefix="$"
          separator=","
          duration={3000}
        />
      </div>

      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Growth</h3>
        <CounterAnimation
          end={23.8}
          size="2xl"
          weight="bold"
          variant="success"
          suffix="%"
          precision={1}
          duration={2000}
        />
      </div>

      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Orders</h3>
        <CounterAnimation
          end={3456}
          size="2xl"
          weight="bold"
          variant="primary"
          separator=","
          duration={2200}
        />
      </div>
    </div>
  ),
}