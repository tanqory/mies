import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader, type FileItem } from '../../src/blocks/media-blocks/file-uploader';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Switch } from '../../src/components/ui/switch';
import { Label } from '../../src/components/ui/label';
import { Badge } from '../../src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/ui/avatar';
import { cn } from '../../src/components/ui/utils';

// Single File Upload Demo
function UploadSingleFileDemo() {
  const [file, setFile] = React.useState<FileItem | null>(null);

  const handleUpload = async (files: FileItem[]) => {
    console.log('Uploading single file:', files[0]);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('File uploaded successfully!');
  };

  return (
    <div className="max-w-md mx-auto">
      <FileUploader
        multiple={false}
        maxSize={5 * 1024 * 1024} // 5MB
        onFilesChange={(files) => setFile(files[0] || null)}
        onUpload={handleUpload}
        accept="image/*,.pdf,.doc,.docx"
      />
      {file && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">Selected:</p>
          <p className="text-sm text-muted-foreground">{file.file.name}</p>
        </div>
      )}
    </div>
  );
}

// Multi File Upload Demo
function UploadMultiFileDemo() {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [showPreview, setShowPreview] = React.useState(true);
  const [orientation, setOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');

  const handleUpload = async (files: FileItem[]) => {
    console.log('Uploading multiple files:', files);
    // Simulate upload with progress
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress } : f
        ));
      }
    }
    alert('All files uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Upload Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="preview-switch"
              checked={showPreview}
              onCheckedChange={setShowPreview}
            />
            <Label htmlFor="preview-switch">Show image preview</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="orientation-switch"
              checked={orientation === 'horizontal'}
              onCheckedChange={(checked) =>
                setOrientation(checked ? 'horizontal' : 'vertical')
              }
            />
            <Label htmlFor="orientation-switch">Horizontal layout</Label>
          </div>
        </CardContent>
      </Card>

      {/* Upload Component */}
      <FileUploader
        multiple={true}
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
        onFilesChange={setFiles}
        onUpload={handleUpload}
        showPreview={showPreview}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Upload Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Total files: {files.length}</p>
              <p>Ready to upload: {files.filter(f => !f.error).length}</p>
              <p>Errors: {files.filter(f => f.error).length}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Avatar Upload Demo
function UploadAvatarDemo() {
  const [avatarFile, setAvatarFile] = React.useState<FileItem | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string>('');

  const validateFile = (file: File): string | null => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      return `File is larger than 1MB`;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG and GIF files are allowed';
    }

    return null;
  };

  const handleAvatarUpload = async (files: FileItem[]) => {
    const file = files[0];
    if (file) {
      console.log('Uploading avatar:', file);
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Avatar uploaded successfully!');
    }
  };

  React.useEffect(() => {
    if (avatarFile?.preview) {
      setAvatarPreview(avatarFile.preview);
    }
  }, [avatarFile]);

  return (
    <div className="max-w-sm mx-auto space-y-6">
      {/* Avatar Preview */}
      <div className="flex justify-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarPreview} alt="Avatar preview" />
          <AvatarFallback>
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Upload Component */}
      <FileUploader
        multiple={false}
        maxSize={1 * 1024 * 1024} // 1MB
        onFilesChange={(files) => setAvatarFile(files[0] || null)}
        onUpload={handleAvatarUpload}
        accept="image/jpeg,image/jpg,image/png,image/gif"
      />

      {/* Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Allowed: JPEG, JPG, PNG, GIF</p>
        <p>Max size: 1MB</p>
      </div>
    </div>
  );
}

// Upload Box Demo
function UploadBoxDemo() {
  const [draggedFiles, setDraggedFiles] = React.useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setDraggedFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Upload Box */}
        <Card className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="font-medium">Upload files</p>
            <p className="text-sm text-muted-foreground">Click to browse</p>
          </CardContent>
        </Card>

        {/* Custom Upload Box */}
        <Card
          className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="font-medium text-primary">Drop files here</p>
            <p className="text-sm text-muted-foreground">Or click to upload</p>
            {draggedFiles.length > 0 && (
              <div className="mt-4">
                <Badge variant="secondary">
                  {draggedFiles.length} files dropped
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Compact Upload Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Documents', 'Images', 'Videos'].map((type) => (
          <Card key={type} className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm font-medium">{type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Demo components array following Next-TS pattern
const DEMO_COMPONENTS = [
  { name: 'Upload single file', component: <UploadSingleFileDemo /> },
  { name: 'Upload multi file', component: <UploadMultiFileDemo /> },
  { name: 'Upload avatar', component: <UploadAvatarDemo /> },
  { name: 'Upload box', component: <UploadBoxDemo /> },
];

// Meta configuration
const meta: Meta<typeof UploadSingleFileDemo> = {
  title: 'Blocks/Upload',
  component: UploadSingleFileDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Upload component blocks following Next-TS upload-view patterns with file upload functionality.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadSingleFileDemo>;

// Main Upload View Story
export const UploadView: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Upload</h1>
        <p className="text-muted-foreground">
          File upload components with drag & drop, progress tracking, and validation
        </p>
        <div className="text-sm text-muted-foreground">
          Supports multiple file types, size validation, and preview functionality
        </div>
      </div>

      <div className="space-y-16">
        {DEMO_COMPONENTS.map((demo, index) => (
          <section key={demo.name} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{demo.name}</h2>
              <div className="text-sm text-muted-foreground">
                {demo.name} demonstration with validation and progress tracking
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              {demo.component}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Upload view component exactly like Next-TS upload-view implementation with various upload types.',
      },
    },
  },
};

// Individual component stories
export const SingleFileExample: Story = {
  render: () => <UploadSingleFileDemo />,
};

export const MultiFileExample: Story = {
  render: () => <UploadMultiFileDemo />,
};

export const AvatarExample: Story = {
  render: () => <UploadAvatarDemo />,
};

export const UploadBoxExample: Story = {
  render: () => <UploadBoxDemo />,
};

// Export demo components and data
export { DEMO_COMPONENTS };