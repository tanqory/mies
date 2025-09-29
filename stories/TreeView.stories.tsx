import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, TreeNode, useTreeView } from '../src/components/ui/tree-view';
import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { Folder, File, Image, Music, Video, Archive, FolderOpen } from 'lucide-react';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tree view component that displays hierarchical data in an expandable tree structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiSelect: {
      control: 'boolean',
      description: 'Allow multiple item selection',
    },
    disableSelection: {
      control: 'boolean',
      description: 'Disable item selection',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    icon: <Folder className="h-4 w-4" />,
    children: [
      {
        id: '1-1',
        label: 'Projects',
        icon: <Folder className="h-4 w-4" />,
        children: [
          {
            id: '1-1-1',
            label: 'Project A',
            icon: <Folder className="h-4 w-4" />,
            children: [
              { id: '1-1-1-1', label: 'README.md', icon: <File className="h-4 w-4" /> },
              { id: '1-1-1-2', label: 'package.json', icon: <File className="h-4 w-4" /> },
            ],
          },
          {
            id: '1-1-2',
            label: 'Project B',
            icon: <Folder className="h-4 w-4" />,
            children: [
              { id: '1-1-2-1', label: 'index.html', icon: <File className="h-4 w-4" /> },
              { id: '1-1-2-2', label: 'styles.css', icon: <File className="h-4 w-4" /> },
            ],
          },
        ],
      },
      {
        id: '1-2',
        label: 'Archives',
        icon: <Archive className="h-4 w-4" />,
        children: [
          { id: '1-2-1', label: 'backup.zip', icon: <Archive className="h-4 w-4" /> },
          { id: '1-2-2', label: 'old-files.tar.gz', icon: <Archive className="h-4 w-4" /> },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Media',
    icon: <Folder className="h-4 w-4" />,
    children: [
      {
        id: '2-1',
        label: 'Images',
        icon: <Folder className="h-4 w-4" />,
        children: [
          { id: '2-1-1', label: 'photo1.jpg', icon: <Image className="h-4 w-4" /> },
          { id: '2-1-2', label: 'photo2.png', icon: <Image className="h-4 w-4" /> },
          { id: '2-1-3', label: 'logo.svg', icon: <Image className="h-4 w-4" /> },
        ],
      },
      {
        id: '2-2',
        label: 'Music',
        icon: <Folder className="h-4 w-4" />,
        children: [
          { id: '2-2-1', label: 'song1.mp3', icon: <Music className="h-4 w-4" /> },
          { id: '2-2-2', label: 'song2.wav', icon: <Music className="h-4 w-4" /> },
        ],
      },
      {
        id: '2-3',
        label: 'Videos',
        icon: <Folder className="h-4 w-4" />,
        children: [
          { id: '2-3-1', label: 'tutorial.mp4', icon: <Video className="h-4 w-4" /> },
          { id: '2-3-2', label: 'demo.avi', icon: <Video className="h-4 w-4" /> },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Downloads',
    icon: <Folder className="h-4 w-4" />,
    children: [
      { id: '3-1', label: 'installer.exe', icon: <File className="h-4 w-4" /> },
      { id: '3-2', label: 'document.pdf', icon: <File className="h-4 w-4" /> },
    ],
  },
];

const simpleData: TreeNode[] = [
  {
    id: 'item-1',
    label: 'Item 1',
    children: [
      { id: 'item-1-1', label: 'Sub Item 1.1' },
      { id: 'item-1-2', label: 'Sub Item 1.2' },
      {
        id: 'item-1-3',
        label: 'Sub Item 1.3',
        children: [
          { id: 'item-1-3-1', label: 'Sub Sub Item 1.3.1' },
          { id: 'item-1-3-2', label: 'Sub Sub Item 1.3.2' },
        ],
      },
    ],
  },
  {
    id: 'item-2',
    label: 'Item 2',
    children: [
      { id: 'item-2-1', label: 'Sub Item 2.1' },
      { id: 'item-2-2', label: 'Sub Item 2.2', disabled: true },
    ],
  },
  { id: 'item-3', label: 'Item 3' },
];

export const Default: Story = {
  args: {
    data: simpleData,
  },
  render: (args) => (
    <div className="w-80">
      <TreeView {...args} />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    data: sampleData,
    defaultExpanded: false,
  },
  render: (args) => (
    <div className="w-80">
      <TreeView {...args} />
    </div>
  ),
};

export const MultiSelect: Story = {
  args: {
    data: simpleData,
    multiSelect: true,
  },
  render: (args) => (
    <div className="w-80">
      <TreeView {...args} />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    data: simpleData,
    disableSelection: true,
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-80">
      <TreeView {...args} />
    </div>
  ),
};

export const Expanded: Story = {
  args: {
    data: sampleData,
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-80">
      <TreeView {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledTreeView() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['1', '2']);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <TreeView
            data={sampleData}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            onSelectionChange={setSelectedIds}
            onExpansionChange={setExpandedIds}
            multiSelect
          />
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Selected: {selectedIds.length ? selectedIds.join(', ') : 'None'}</p>
          <p>Expanded: {expandedIds.length ? expandedIds.join(', ') : 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: function TreeViewWithActions() {
    const treeView = useTreeView({
      data: sampleData,
      defaultExpanded: ['1'],
      multiSelect: true,
    });

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={treeView.expandAll} size="sm" variant="outline">
            Expand All
          </Button>
          <Button onClick={treeView.collapseAll} size="sm" variant="outline">
            Collapse All
          </Button>
          <Button onClick={treeView.selectAll} size="sm" variant="outline">
            Select All
          </Button>
          <Button onClick={treeView.clearSelection} size="sm" variant="outline">
            Clear Selection
          </Button>
        </div>

        <div className="w-80">
          <TreeView
            data={treeView.selectedIds.length > 0 ? sampleData : sampleData}
            selectedIds={treeView.selectedIds}
            expandedIds={treeView.expandedIds}
            onSelectionChange={treeView.setSelectedIds}
            onExpansionChange={treeView.setExpandedIds}
            multiSelect
          />
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Selected items: {treeView.selectedNodes.length}</p>
          <div className="max-w-80">
            {treeView.selectedNodes.map(node => (
              <div key={node.id} className="flex items-center gap-1 mt-1">
                {node.icon}
                <span>{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const FileSystem: Story = {
  render: function FileSystemTree() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['root']);

    const fileSystemData: TreeNode[] = [
      {
        id: 'root',
        label: 'project-folder',
        icon: <FolderOpen className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'src',
            label: 'src',
            icon: <Folder className="h-4 w-4 text-blue-500" />,
            children: [
              {
                id: 'components',
                label: 'components',
                icon: <Folder className="h-4 w-4 text-blue-500" />,
                children: [
                  { id: 'button.tsx', label: 'Button.tsx', icon: <File className="h-4 w-4 text-blue-400" /> },
                  { id: 'input.tsx', label: 'Input.tsx', icon: <File className="h-4 w-4 text-blue-400" /> },
                  { id: 'tree-view.tsx', label: 'TreeView.tsx', icon: <File className="h-4 w-4 text-blue-400" /> },
                ],
              },
              {
                id: 'styles',
                label: 'styles',
                icon: <Folder className="h-4 w-4 text-blue-500" />,
                children: [
                  { id: 'globals.css', label: 'globals.css', icon: <File className="h-4 w-4 text-green-500" /> },
                  { id: 'components.css', label: 'components.css', icon: <File className="h-4 w-4 text-green-500" /> },
                ],
              },
              { id: 'index.ts', label: 'index.ts', icon: <File className="h-4 w-4 text-yellow-500" /> },
              { id: 'app.tsx', label: 'App.tsx', icon: <File className="h-4 w-4 text-blue-400" /> },
            ],
          },
          {
            id: 'public',
            label: 'public',
            icon: <Folder className="h-4 w-4 text-blue-500" />,
            children: [
              { id: 'favicon.ico', label: 'favicon.ico', icon: <Image className="h-4 w-4 text-purple-500" /> },
              { id: 'logo.svg', label: 'logo.svg', icon: <Image className="h-4 w-4 text-purple-500" /> },
            ],
          },
          { id: 'package.json', label: 'package.json', icon: <File className="h-4 w-4 text-red-500" /> },
          { id: 'README.md', label: 'README.md', icon: <File className="h-4 w-4 text-gray-600" /> },
          { id: 'tsconfig.json', label: 'tsconfig.json', icon: <File className="h-4 w-4 text-blue-600" /> },
        ],
      },
    ];

    return (
      <div className="space-y-4">
        <div className="w-96 border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">File Explorer</h3>
          <TreeView
            data={fileSystemData}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            onSelectionChange={setSelectedIds}
            onExpansionChange={setExpandedIds}
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Selected file: {selectedIds[selectedIds.length - 1]}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A file system explorer example with colored icons and realistic folder structure.',
      },
    },
  },
};

export const OrganizationalChart: Story = {
  render: function OrganizationalChart() {
    const orgData: TreeNode[] = [
      {
        id: 'ceo',
        label: 'CEO - John Smith',
        icon: <User className="h-4 w-4 text-red-500" />,
        children: [
          {
            id: 'cto',
            label: 'CTO - Sarah Johnson',
            icon: <User className="h-4 w-4 text-blue-500" />,
            children: [
              {
                id: 'dev-lead',
                label: 'Dev Lead - Mike Brown',
                icon: <User className="h-4 w-4 text-green-500" />,
                children: [
                  { id: 'dev-1', label: 'Developer - Alice Cooper', icon: <User className="h-4 w-4 text-gray-500" /> },
                  { id: 'dev-2', label: 'Developer - Bob Wilson', icon: <User className="h-4 w-4 text-gray-500" /> },
                ],
              },
              {
                id: 'qa-lead',
                label: 'QA Lead - Emma Davis',
                icon: <User className="h-4 w-4 text-purple-500" />,
                children: [
                  { id: 'qa-1', label: 'QA Engineer - Tom Miller', icon: <User className="h-4 w-4 text-gray-500" /> },
                ],
              },
            ],
          },
          {
            id: 'cmo',
            label: 'CMO - Lisa Anderson',
            icon: <User className="h-4 w-4 text-orange-500" />,
            children: [
              { id: 'marketing-1', label: 'Marketing Specialist - Chris Lee', icon: <User className="h-4 w-4 text-gray-500" /> },
              { id: 'marketing-2', label: 'Content Writer - Diana Ross', icon: <User className="h-4 w-4 text-gray-500" /> },
            ],
          },
        ],
      },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['ceo', 'cto', 'cmo']);

    return (
      <div className="space-y-4">
        <div className="w-96">
          <h3 className="text-sm font-medium mb-2">Organization Chart</h3>
          <TreeView
            data={orgData}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            onSelectionChange={setSelectedIds}
            onExpansionChange={setExpandedIds}
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="text-xs text-muted-foreground p-2 bg-gray-50 rounded">
            Selected employee: {selectedIds[selectedIds.length - 1]}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An organizational chart example showing company hierarchy with role-based icons.',
      },
    },
  },
};