import type { Meta, StoryObj } from '@storybook/react'
import {
  KeyboardKey,
  KeyCombination,
} from '../../src/x'

const meta: Meta = {
  title: 'Polaris/Navigation',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const KeyboardKeyExample: Story = {
  name: 'Keyboard Key',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Individual Keys</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <KeyboardKey>⌘</KeyboardKey>
          <KeyboardKey>Ctrl</KeyboardKey>
          <KeyboardKey>Alt</KeyboardKey>
          <KeyboardKey>Shift</KeyboardKey>
          <KeyboardKey>Tab</KeyboardKey>
          <KeyboardKey>Esc</KeyboardKey>
          <KeyboardKey>Enter</KeyboardKey>
          <KeyboardKey>Space</KeyboardKey>
          <KeyboardKey>←</KeyboardKey>
          <KeyboardKey>→</KeyboardKey>
          <KeyboardKey>↑</KeyboardKey>
          <KeyboardKey>↓</KeyboardKey>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Letter and Number Keys</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <KeyboardKey>A</KeyboardKey>
          <KeyboardKey>B</KeyboardKey>
          <KeyboardKey>C</KeyboardKey>
          <KeyboardKey>1</KeyboardKey>
          <KeyboardKey>2</KeyboardKey>
          <KeyboardKey>3</KeyboardKey>
          <KeyboardKey>F1</KeyboardKey>
          <KeyboardKey>F12</KeyboardKey>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Special Keys</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <KeyboardKey>Delete</KeyboardKey>
          <KeyboardKey>Backspace</KeyboardKey>
          <KeyboardKey>Home</KeyboardKey>
          <KeyboardKey>End</KeyboardKey>
          <KeyboardKey>Page Up</KeyboardKey>
          <KeyboardKey>Page Down</KeyboardKey>
        </div>
      </div>
    </div>
  ),
}

export const KeyCombinationExample: Story = {
  name: 'Key Combination',
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">Common Shortcuts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Save document</span>
            <KeyCombination keys={['⌘', 'S']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Copy selection</span>
            <KeyCombination keys={['Ctrl', 'C']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Paste content</span>
            <KeyCombination keys={['Ctrl', 'V']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Select all</span>
            <KeyCombination keys={['⌘', 'A']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Undo action</span>
            <KeyCombination keys={['⌘', 'Z']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Redo action</span>
            <KeyCombination keys={['⌘', 'Shift', 'Z']} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Application Shortcuts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Open search</span>
            <KeyCombination keys={['⌘', 'K']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Create new item</span>
            <KeyCombination keys={['⌘', 'N']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Open preferences</span>
            <KeyCombination keys={['⌘', ',']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Toggle sidebar</span>
            <KeyCombination keys={['⌘', 'B']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Force refresh</span>
            <KeyCombination keys={['⌘', 'Shift', 'R']} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Advanced Combinations</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Developer tools</span>
            <KeyCombination keys={['⌘', 'Alt', 'I']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Switch workspace</span>
            <KeyCombination keys={['Ctrl', 'Alt', '→']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Lock screen</span>
            <KeyCombination keys={['⌘', 'Ctrl', 'Q']} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <span>Take screenshot</span>
            <KeyCombination keys={['⌘', 'Shift', '4']} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Help Text Examples</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Press <KeyCombination keys={['Tab']} /> to navigate to the next field.
          </p>
          <p>
            Use <KeyCombination keys={['Shift', 'Tab']} /> to go back to the previous field.
          </p>
          <p>
            Press <KeyCombination keys={['Enter']} /> to submit the form.
          </p>
          <p>
            Hold <KeyCombination keys={['Alt']} /> while clicking to select multiple items.
          </p>
        </div>
      </div>
    </div>
  ),
}