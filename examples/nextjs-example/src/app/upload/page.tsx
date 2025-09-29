'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Progress,
  Switch,
  Label,
  Alert,
  AlertDescription,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Mock FileUploader component (simplified version)
function FileUploader({
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  accept = '*/*',
  onFilesChange,
  showPreview = true
}) {
  const [files, setFiles] = React.useState([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (selectedFiles) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      error: file.size > maxSize ? `File too large (${formatFileSize(file.size)} > ${formatFileSize(maxSize)})` : null,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    setFiles(prev => [...prev, ...newFiles]);
    onFilesChange?.(newFiles);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const validFiles = files.filter(f => !f.error);

    // Simulate upload progress
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress } : f
        ));
      }
    }

    setIsUploading(false);
    alert('Files uploaded successfully!');
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
          isDragOver ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
            <LucideIcons.Upload className="w-full h-full" />
          </div>
          <p className="text-lg font-medium mb-1">
            Drag files here or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Maximum file size {formatFileSize(maxSize)}
            {multiple && ` (max ${maxFiles} files)`}
          </p>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Selected files ({files.length})</h4>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setFiles([])}>
                Clear all
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.filter(f => !f.error).length === 0 || isUploading}
              >
                {isUploading ? 'Uploading...' : `Upload ${files.filter(f => !f.error).length} files`}
              </Button>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((fileItem) => (
              <Card key={fileItem.id} className="p-3">
                <div className="flex items-center space-x-3">
                  {showPreview && fileItem.preview ? (
                    <img
                      src={fileItem.preview}
                      alt={fileItem.file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                      <LucideIcons.FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileItem.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(fileItem.file.size)}
                    </p>
                    {fileItem.error && (
                      <p className="text-sm text-destructive">{fileItem.error}</p>
                    )}
                    {fileItem.progress > 0 && (
                      <Progress value={fileItem.progress} className="mt-1" />
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {fileItem.error ? (
                      <Badge variant="destructive">Error</Badge>
                    ) : (
                      <Badge variant="secondary">Ready</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileItem.id)}
                    >
                      <LucideIcons.X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  const [showPreview, setShowPreview] = React.useState(true);
  const [avatarFile, setAvatarFile] = React.useState(null);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Upload</h1>
            <p className="text-muted-foreground text-lg">
              File upload components with drag & drop, progress tracking, and validation
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">4 Upload Types</Badge>
            <Badge variant="outline">Drag & Drop</Badge>
            <Badge variant="outline">Progress Tracking</Badge>
          </div>
        </div>

        {/* Alert */}
        <Alert>
          <LucideIcons.Info className="h-4 w-4" />
          <AlertDescription>
            All upload components support drag & drop, file validation, and preview functionality.
          </AlertDescription>
        </Alert>

        {/* Single File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.File className="h-5 w-5" />
              Single File Upload
            </CardTitle>
            <CardDescription>
              Upload a single file with validation and preview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              <FileUploader
                multiple={false}
                maxSize={5 * 1024 * 1024} // 5MB
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>
          </CardContent>
        </Card>

        {/* Multiple File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Files className="h-5 w-5" />
              Multiple File Upload
            </CardTitle>
            <CardDescription>
              Upload multiple files with batch processing and individual progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Controls */}
            <Card className="bg-muted/50">
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
              </CardContent>
            </Card>

            <FileUploader
              multiple={true}
              maxFiles={5}
              maxSize={10 * 1024 * 1024} // 10MB
              showPreview={showPreview}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </CardContent>
        </Card>

        {/* Avatar Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.User className="h-5 w-5" />
              Avatar Upload
            </CardTitle>
            <CardDescription>
              Specialized upload component for profile pictures with circular preview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-sm mx-auto space-y-6">
              {/* Avatar Preview */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {avatarFile ? (
                    <img
                      src={avatarFile}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LucideIcons.User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>

              <FileUploader
                multiple={false}
                maxSize={1 * 1024 * 1024} // 1MB
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onFilesChange={(files) => {
                  if (files[0] && files[0].preview) {
                    setAvatarFile(files[0].preview);
                  }
                }}
              />

              <div className="text-center text-sm text-muted-foreground">
                <p>Allowed: JPEG, JPG, PNG, GIF</p>
                <p>Max size: 1MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.FolderPlus className="h-5 w-5" />
              Upload Zones
            </CardTitle>
            <CardDescription>
              Different styles of upload areas for various use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Upload Box */}
                <Card className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
                      <LucideIcons.Upload className="w-full h-full" />
                    </div>
                    <p className="font-medium">Upload files</p>
                    <p className="text-sm text-muted-foreground">Click to browse</p>
                  </CardContent>
                </Card>

                {/* Enhanced Upload Box */}
                <Card className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-primary">
                      <LucideIcons.CloudUpload className="w-full h-full" />
                    </div>
                    <p className="font-medium text-primary">Drop files here</p>
                    <p className="text-sm text-muted-foreground">Or click to upload</p>
                  </CardContent>
                </Card>
              </div>

              {/* Compact Upload Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Documents', 'Images', 'Videos'].map((type) => (
                  <Card key={type} className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 text-muted-foreground">
                        <LucideIcons.Plus className="w-full h-full" />
                      </div>
                      <p className="text-sm font-medium">{type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Upload Features
            </CardTitle>
            <CardDescription>
              Available features and capabilities of the upload components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.MousePointer, title: 'Drag & Drop', description: 'Native drag and drop support for files' },
                { icon: LucideIcons.Shield, title: 'File Validation', description: 'Size and type validation with error handling' },
                { icon: LucideIcons.Eye, title: 'Image Previews', description: 'Automatic preview generation for images' },
                { icon: LucideIcons.BarChart, title: 'Progress Tracking', description: 'Real-time upload progress indicators' },
                { icon: LucideIcons.CheckSquare, title: 'Batch Upload', description: 'Upload multiple files simultaneously' },
                { icon: LucideIcons.Smartphone, title: 'Mobile Friendly', description: 'Optimized for touch devices' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}