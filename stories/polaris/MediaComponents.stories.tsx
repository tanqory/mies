import type { Meta, StoryObj } from '@storybook/react'
import {
  MediaCard,
  Thumbnail,
  VideoThumbnail,
} from '../../src/x'
import { Image, Video, File } from 'lucide-react'

const meta: Meta = {
  title: 'Polaris/Media',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const MediaCardExample: Story = {
  name: 'Media Card',
  render: () => (
    <div className="space-y-6 max-w-lg">
      <MediaCard
        title="Getting Started with Shopify Plus"
        description="Learn how to set up your store for success with our comprehensive guide."
        primaryAction={{
          content: 'View guide',
          onAction: () => console.log('View guide'),
        }}
        secondaryAction={{
          content: 'Learn more',
          onAction: () => console.log('Learn more'),
        }}
        dismissible
        onDismiss={() => console.log('Dismissed')}
      >
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <Image className="h-16 w-16 text-white" />
        </div>
      </MediaCard>

      <MediaCard
        title="Product Photography Tips"
        description="Improve your product photos with these professional techniques."
        primaryAction={{
          content: 'Watch video',
          onAction: () => console.log('Watch video'),
        }}
        portrait
      >
        <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
          <Video className="h-16 w-16 text-white" />
        </div>
      </MediaCard>
    </div>
  ),
}

export const ThumbnailExample: Story = {
  name: 'Thumbnail',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Image Thumbnails</h3>
        <div className="flex items-center gap-4">
          <Thumbnail
            source="https://via.placeholder.com/80"
            alt="Product image"
            size="small"
          />
          <Thumbnail
            source="https://via.placeholder.com/120"
            alt="Product image"
            size="medium"
          />
          <Thumbnail
            source="https://via.placeholder.com/160"
            alt="Product image"
            size="large"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Thumbnails with Icons</h3>
        <div className="flex items-center gap-4">
          <Thumbnail
            alt="Document"
            size="medium"
          >
            <File className="h-8 w-8 text-muted-foreground" />
          </Thumbnail>
          <Thumbnail
            alt="Video file"
            size="medium"
          >
            <Video className="h-8 w-8 text-muted-foreground" />
          </Thumbnail>
          <Thumbnail
            alt="Image file"
            size="medium"
          >
            <Image className="h-8 w-8 text-muted-foreground" />
          </Thumbnail>
        </div>
      </div>
    </div>
  ),
}

export const VideoThumbnailExample: Story = {
  name: 'Video Thumbnail',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Video with Thumbnail</h3>
        <VideoThumbnail
          videoLength={120}
          thumbnailUrl="https://via.placeholder.com/320x180"
          onVideoLoad={() => console.log('Video loaded')}
          onVideoError={() => console.log('Video error')}
          onClick={() => console.log('Video clicked')}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Video Progress</h3>
        <VideoThumbnail
          videoLength={180}
          progress={60}
          thumbnailUrl="https://via.placeholder.com/320x180"
          onVideoLoad={() => console.log('Video loaded')}
          showVideoLength
        />
      </div>
    </div>
  ),
}