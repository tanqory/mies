import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "./utils";

const treeViewVariants = cva("w-full");

const treeItemVariants = cva("", {
  variants: {
    level: {
      0: "pl-0",
      1: "pl-4",
      2: "pl-8",
      3: "pl-12",
      4: "pl-16",
      5: "pl-20",
    },
  },
  defaultVariants: {
    level: 0,
  },
});

const treeItemContentVariants = cva(
  "flex items-center gap-1 py-1.5 px-2 text-sm cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
  {
    variants: {
      selected: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: any;
}

export interface TreeViewContextValue {
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onSelect?: (nodeId: string, node: TreeNode) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
  multiSelect?: boolean;
  disableSelection?: boolean;
}

const TreeViewContext = React.createContext<TreeViewContextValue | undefined>(undefined);

const useTreeViewContext = () => {
  const context = React.useContext(TreeViewContext);
  if (!context) {
    throw new Error("Tree components must be used within a TreeView");
  }
  return context;
};

export interface TreeViewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeViewVariants> {
  data: TreeNode[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onExpansionChange?: (expandedIds: string[]) => void;
  multiSelect?: boolean;
  disableSelection?: boolean;
  defaultExpanded?: boolean;
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      data,
      selectedIds: controlledSelectedIds,
      expandedIds: controlledExpandedIds,
      onSelectionChange,
      onExpansionChange,
      multiSelect = false,
      disableSelection = false,
      defaultExpanded = false,
      ...props
    },
    ref
  ) => {
    const [internalSelectedIds, setInternalSelectedIds] = React.useState<Set<string>>(new Set());
    const [internalExpandedIds, setInternalExpandedIds] = React.useState<Set<string>>(
      new Set(defaultExpanded ? getAllNodeIds(data) : [])
    );

    const isSelectedControlled = controlledSelectedIds !== undefined;
    const isExpandedControlled = controlledExpandedIds !== undefined;

    const selectedIds = React.useMemo(() => {
      return isSelectedControlled
        ? new Set(controlledSelectedIds)
        : internalSelectedIds;
    }, [isSelectedControlled, controlledSelectedIds, internalSelectedIds]);

    const expandedIds = React.useMemo(() => {
      return isExpandedControlled
        ? new Set(controlledExpandedIds)
        : internalExpandedIds;
    }, [isExpandedControlled, controlledExpandedIds, internalExpandedIds]);

    const handleSelect = (nodeId: string, node: TreeNode) => {
      if (disableSelection || node.disabled) return;

      let newSelectedIds: Set<string>;

      if (multiSelect) {
        newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(nodeId)) {
          newSelectedIds.delete(nodeId);
        } else {
          newSelectedIds.add(nodeId);
        }
      } else {
        newSelectedIds = selectedIds.has(nodeId) ? new Set() : new Set([nodeId]);
      }

      if (!isSelectedControlled) {
        setInternalSelectedIds(newSelectedIds);
      }

      onSelectionChange?.(Array.from(newSelectedIds));
    };

    const handleExpand = (nodeId: string, expanded: boolean) => {
      const newExpandedIds = new Set(expandedIds);

      if (expanded) {
        newExpandedIds.add(nodeId);
      } else {
        newExpandedIds.delete(nodeId);
      }

      if (!isExpandedControlled) {
        setInternalExpandedIds(newExpandedIds);
      }

      onExpansionChange?.(Array.from(newExpandedIds));
    };

    const contextValue: TreeViewContextValue = {
      selectedIds,
      expandedIds,
      onSelect: handleSelect,
      onExpand: handleExpand,
      multiSelect,
      disableSelection,
    };

    return (
      <TreeViewContext.Provider value={contextValue}>
        <div ref={ref} className={cn(treeViewVariants(), className)} {...props}>
          {data.map((node) => (
            <TreeItem key={node.id} node={node} level={0} />
          ))}
        </div>
      </TreeViewContext.Provider>
    );
  }
);

TreeView.displayName = "TreeView";

export interface TreeItemProps {
  node: TreeNode;
  level: number;
}

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  ({ node, level }, ref) => {
    const { selectedIds, expandedIds, onSelect, onExpand, disableSelection } = useTreeViewContext();

    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedIds.has(node.id);

    const handleToggleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        onExpand?.(node.id, !isExpanded);
      }
    };

    const handleSelect = () => {
      onSelect?.(node.id, node);
    };

    const levelKey = Math.min(level, 5) as 0 | 1 | 2 | 3 | 4 | 5;

    return (
      <div ref={ref} className={cn(treeItemVariants({ level: levelKey }))}>
        <div
          className={cn(
            treeItemContentVariants({
              selected: isSelected && !disableSelection,
              disabled: node.disabled,
            })
          )}
          onClick={handleSelect}
          role="treeitem"
          aria-selected={isSelected}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-disabled={node.disabled}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelect();
            } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
              e.preventDefault();
              handleToggleExpand(e as any);
            } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
              e.preventDefault();
              handleToggleExpand(e as any);
            }
          }}
        >
          <div className="flex items-center gap-1">
            {hasChildren ? (
              <button
                className="p-0.5 hover:bg-accent rounded-sm transition-colors"
                onClick={handleToggleExpand}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            ) : (
              <div className="w-4" />
            )}

            {node.icon && (
              <span className="flex items-center justify-center w-4 h-4 text-muted-foreground">
                {node.icon}
              </span>
            )}

            <span className="flex-1 truncate">{node.label}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children!.map((childNode) => (
              <TreeItem key={childNode.id} node={childNode} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

TreeItem.displayName = "TreeItem";

// Utility function to get all node IDs for default expansion
function getAllNodeIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];

  const traverse = (nodeList: TreeNode[]) => {
    nodeList.forEach((node) => {
      ids.push(node.id);
      if (node.children) {
        traverse(node.children);
      }
    });
  };

  traverse(nodes);
  return ids;
}

// Additional utility components and hooks

export interface UseTreeViewProps {
  data: TreeNode[];
  defaultSelected?: string[];
  defaultExpanded?: string[];
  multiSelect?: boolean;
}

export function useTreeView({
  data,
  defaultSelected = [],
  defaultExpanded = [],
  multiSelect = false,
}: UseTreeViewProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(defaultSelected);
  const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpanded);

  const selectedNodes = React.useMemo(() => {
    const findNodes = (nodes: TreeNode[], ids: string[]): TreeNode[] => {
      const result: TreeNode[] = [];
      const traverse = (nodeList: TreeNode[]) => {
        nodeList.forEach((node) => {
          if (ids.includes(node.id)) {
            result.push(node);
          }
          if (node.children) {
            traverse(node.children);
          }
        });
      };
      traverse(nodes);
      return result;
    };

    return findNodes(data, selectedIds);
  }, [data, selectedIds]);

  const expandAll = () => {
    setExpandedIds(getAllNodeIds(data));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const selectAll = () => {
    if (multiSelect) {
      setSelectedIds(getAllNodeIds(data));
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return {
    selectedIds,
    setSelectedIds,
    expandedIds,
    setExpandedIds,
    selectedNodes,
    expandAll,
    collapseAll,
    selectAll,
    clearSelection,
  };
}

export { TreeView, TreeItem, treeViewVariants, treeItemVariants, treeItemContentVariants };