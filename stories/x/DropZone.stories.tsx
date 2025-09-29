import type { Meta, StoryObj } from "@storybook/react"
import { DropZone } from "../../src/x"

const meta: Meta<typeof DropZone> = {
  title: "Mies X/DropZone",
  component: DropZone,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "active", "error", "disabled"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["file", "image", "video"],
    },
    allowMultiple: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    overlay: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Upload files",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("All files:", files)
      console.log("Accepted:", acceptedFiles)
      console.log("Rejected:", rejectedFiles)
    },
    onDropAccepted: (files) => console.log("Accepted files:", files),
    onDropRejected: (files) => console.log("Rejected files:", files),
  },
}

export const ImageOnly: Story = {
  args: {
    label: "Upload images",
    type: "image",
    accept: "image/*",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("All files:", files)
      console.log("Accepted:", acceptedFiles)
      console.log("Rejected:", rejectedFiles)
    },
  },
}

export const SingleFile: Story = {
  args: {
    label: "Upload document",
    allowMultiple: false,
    accept: ".pdf,.doc,.docx",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("All files:", files)
      console.log("Accepted:", acceptedFiles)
      console.log("Rejected:", rejectedFiles)
    },
  },
}

export const SmallSize: Story = {
  args: {
    label: "Upload avatar",
    size: "sm",
    type: "image",
    accept: "image/*",
    allowMultiple: false,
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Avatar uploaded:", acceptedFiles)
    },
  },
}

export const LargeSize: Story = {
  args: {
    label: "Upload media files",
    size: "lg",
    type: "video",
    accept: "video/*,image/*",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Media files:", acceptedFiles)
    },
  },
}

export const WithCustomText: Story = {
  args: {
    label: "Upload product images",
    overlayText: "Drop images here to upload",
    errorOverlayText: "Some files are not supported",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Product images:", acceptedFiles)
    },
    children: (
      <div className="text-center">
        <div className="text-lg font-medium">Drag & drop your product images</div>
        <div className="text-sm text-muted-foreground mt-1">
          Supports JPG, PNG, GIF up to 10MB each
        </div>
      </div>
    ),
  },
}

export const Disabled: Story = {
  args: {
    label: "Upload disabled",
    disabled: true,
    onDrop: (files) => console.log("This should not trigger"),
  },
}

export const WithError: Story = {
  args: {
    label: "Upload with error",
    error: true,
    errorOverlayText: "Upload failed. Please try again.",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Files with error:", files)
    },
  },
}

export const Active: Story = {
  args: {
    label: "Drop files here",
    active: true,
    overlayText: "Release to upload files",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Active drop:", acceptedFiles)
    },
  },
}

export const WithCustomValidator: Story = {
  args: {
    label: "Upload with validation",
    customValidator: (file: File) => {
      // Only allow files smaller than 1MB
      return file.size <= 1024 * 1024
    },
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Validated files:", acceptedFiles)
      if (rejectedFiles.length > 0) {
        console.log("Files too large:", rejectedFiles)
      }
    },
    children: (
      <div className="text-center">
        <div className="text-lg font-medium">Upload files (max 1MB)</div>
        <div className="text-sm text-muted-foreground mt-1">
          Files larger than 1MB will be rejected
        </div>
      </div>
    ),
  },
}

export const HiddenLabel: Story = {
  args: {
    label: "Hidden label",
    labelHidden: true,
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("Files with hidden label:", acceptedFiles)
    },
  },
}

export const WithCallbacks: Story = {
  args: {
    label: "Upload with callbacks",
    onDrop: (files, acceptedFiles, rejectedFiles) => {
      console.log("onDrop - All:", files.length, "Accepted:", acceptedFiles.length, "Rejected:", rejectedFiles.length)
    },
    onDropAccepted: (files) => {
      console.log("onDropAccepted:", files.map(f => f.name))
    },
    onDropRejected: (files) => {
      console.log("onDropRejected:", files.map(f => f.name))
    },
    onDragEnter: () => console.log("onDragEnter"),
    onDragLeave: () => console.log("onDragLeave"),
    onFileDialogClose: () => console.log("onFileDialogClose"),
  },
}