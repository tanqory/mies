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
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Mock DND Components (simplified versions)
function SortableList() {
  const [items, setItems] = React.useState([
    { id: 1, text: 'First item', category: 'high' },
    { id: 2, text: 'Second item', category: 'medium' },
    { id: 3, text: 'Third item', category: 'low' },
    { id: 4, text: 'Fourth item', category: 'high' },
  ]);

  const [draggedItem, setDraggedItem] = React.useState(null);

  const handleDragStart = (e: React.DragEvent, item: any) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newItems = [...items];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const draggedItemData = newItems.splice(draggedIndex, 1)[0];
    newItems.splice(targetIndex, 0, draggedItemData);
    setItems(newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`p-4 border rounded-lg cursor-move transition-all ${
            draggedItem?.id === item.id ? 'opacity-50 scale-95' : 'hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            <LucideIcons.GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1">{item.text}</span>
            <Badge variant={item.category === 'high' ? 'destructive' : item.category === 'medium' ? 'secondary' : 'outline'}>
              {item.category}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanBoard() {
  const [columns, setColumns] = React.useState({
    todo: [
      { id: 1, title: 'Design homepage', description: 'Create mockups for the main page' },
      { id: 2, title: 'Setup database', description: 'Configure PostgreSQL connection' },
    ],
    inProgress: [
      { id: 3, title: 'Implement authentication', description: 'Add login and signup functionality' },
    ],
    done: [
      { id: 4, title: 'Project setup', description: 'Initialize Next.js project with TypeScript' },
      { id: 5, title: 'UI components', description: 'Install and configure component library' },
    ]
  });

  const columnTitles = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(columns).map(([columnId, tasks]) => (
        <div key={columnId} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{columnTitles[columnId as keyof typeof columnTitles]}</h3>
            <Badge variant="secondary">{tasks.length}</Badge>
          </div>

          <div className="space-y-3 min-h-[200px] p-4 border-2 border-dashed rounded-lg">
            {tasks.map((task) => (
              <Card key={task.id} className="cursor-move hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DragDropZone() {
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
      >
        <LucideIcons.Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium">Drop files here</h3>
        <p className="text-muted-foreground">Drag and drop files to upload them</p>
      </div>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <LucideIcons.FileText className="h-4 w-4" />
                  <span className="text-sm">{fileName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                  >
                    <LucideIcons.X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DNDPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Drag & Drop</h1>
            <p className="text-muted-foreground text-lg">
              Interactive drag and drop components for sortable lists, kanban boards, and file uploads
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">4 DND Patterns</Badge>
            <Badge variant="outline">Touch Support</Badge>
            <Badge variant="outline">Smooth Animations</Badge>
          </div>
        </div>

        {/* Sortable List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.List className="h-5 w-5" />
              Sortable List
            </CardTitle>
            <CardDescription>
              Reorder items in a list by dragging and dropping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SortableList />
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Columns className="h-5 w-5" />
              Kanban Board
            </CardTitle>
            <CardDescription>
              Drag tasks between different status columns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KanbanBoard />
          </CardContent>
        </Card>

        {/* Drag Drop Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.FolderPlus className="h-5 w-5" />
              File Drop Zone
            </CardTitle>
            <CardDescription>
              Drop files directly into designated areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DragDropZone />
          </CardContent>
        </Card>

        {/* DND Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Drag & Drop Features
            </CardTitle>
            <CardDescription>
              Available features and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.MousePointer, title: 'Mouse Support', description: 'Click and drag with mouse' },
                { icon: LucideIcons.Smartphone, title: 'Touch Support', description: 'Touch gestures on mobile devices' },
                { icon: LucideIcons.Zap, title: 'Smooth Animations', description: 'Fluid transitions during drag' },
                { icon: LucideIcons.Target, title: 'Drop Zones', description: 'Visual feedback for valid drop areas' },
                { icon: LucideIcons.ArrowUpDown, title: 'Multi-directional', description: 'Horizontal and vertical sorting' },
                { icon: LucideIcons.Copy, title: 'Copy/Move Modes', description: 'Different interaction patterns' },
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