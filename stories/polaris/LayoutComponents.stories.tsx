import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  BlockStack,
  InlineStack,
  Grid,
  GridItem,
  Bleed,
  FormLayout,
  FormLayoutGroup,
  Layout,
  LayoutSection
} from '../../src/x'
import { Input, Button } from '../../src'

const meta: Meta = {
  title: 'Polaris/Layout and Structure',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const BoxExample: Story = {
  name: 'Box',
  render: () => (
    <div className="space-y-4">
      <Box
        padding="2"
        background="surface-neutral"
        borderRadius="2"
        borderWidth="025"
        borderColor="border"
      >
        <p>Box with padding, background, border radius, and border</p>
      </Box>

      <Box
        padding="3"
        background="surface-selected"
        borderRadius="3"
        shadow="md"
      >
        <p>Box with shadow and selected background</p>
      </Box>
    </div>
  ),
}

export const StacksExample: Story = {
  name: 'Block Stack & Inline Stack',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Block Stack (Vertical)</h3>
        <BlockStack gap="2">
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Block Stack Item 1
          </Box>
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Block Stack Item 2
          </Box>
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Block Stack Item 3
          </Box>
        </BlockStack>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Stack (Horizontal)</h3>
        <InlineStack gap="2" align="center">
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Inline Item 1
          </Box>
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Inline Item 2
          </Box>
          <Box padding="2" background="surface-neutral" borderRadius="1">
            Inline Item 3
          </Box>
        </InlineStack>
      </div>
    </div>
  ),
}

export const GridExample: Story = {
  name: 'Grid',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">3 Column Grid</h3>
        <Grid columns="3" gap="2">
          <GridItem>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Grid Item 1
            </Box>
          </GridItem>
          <GridItem>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Grid Item 2
            </Box>
          </GridItem>
          <GridItem>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Grid Item 3
            </Box>
          </GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Grid with Spanning</h3>
        <Grid columns="4" gap="2">
          <GridItem columnSpan={2}>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Spans 2 columns
            </Box>
          </GridItem>
          <GridItem>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Item 1
            </Box>
          </GridItem>
          <GridItem>
            <Box padding="3" background="surface-neutral" borderRadius="1" className="text-center">
              Item 2
            </Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
}

export const FormLayoutExample: Story = {
  name: 'Form Layout',
  render: () => (
    <div className="max-w-md">
      <FormLayout>
        <FormLayoutGroup
          title="Personal Information"
          helpText="This information will be displayed publicly"
        >
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input placeholder="Email address" type="email" />
        </FormLayoutGroup>

        <FormLayoutGroup
          title="Address"
          helpText="Your billing address"
        >
          <Input placeholder="Street address" />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="City" />
            <Input placeholder="Postal code" />
          </div>
        </FormLayoutGroup>

        <Button className="w-full">Save</Button>
      </FormLayout>
    </div>
  ),
}

export const BleedExample: Story = {
  name: 'Bleed',
  render: () => (
    <Box padding="4" background="surface-neutral" borderRadius="2">
      <p className="mb-4">This is content inside a box with padding.</p>

      <Bleed marginInlineStart="4" marginInlineEnd="4">
        <Box padding="3" background="surface" borderRadius="1" className="border">
          This content "bleeds" outside the parent's horizontal padding
        </Box>
      </Bleed>

      <p className="mt-4">More content that respects the original padding.</p>
    </Box>
  ),
}