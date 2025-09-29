// Component configuration for showcase
export interface ComponentItem {
  name: string;
  href: string;
  icon: string;
  packageType: 'Foundation' | '@tanqory/mies' | 'Extra' | 'Custom';
  description?: string;
}

export interface ComponentSection {
  title: string;
  items: ComponentItem[];
}

// Foundation components
const foundationComponents: ComponentItem[] = [
  {
    name: 'Colors',
    href: '/components/foundation/colors',
    icon: 'palette',
    packageType: 'Foundation',
    description: 'Color palette and theme system'
  },
  {
    name: 'Typography',
    href: '/components/foundation/typography',
    icon: 'type',
    packageType: 'Foundation',
    description: 'Text styles and font system'
  },
  {
    name: 'Grid',
    href: '/components/foundation/grid',
    icon: 'grid',
    packageType: 'Foundation',
    description: 'Layout grid system'
  },
  {
    name: 'Icons',
    href: '/components/foundation/icons',
    icon: 'star',
    packageType: 'Foundation',
    description: 'Icon library and usage'
  },
  {
    name: 'Shadows',
    href: '/components/foundation/shadows',
    icon: 'layers',
    packageType: 'Foundation',
    description: 'Shadow and elevation system'
  }
];

// Mies components (main library)
const miesComponents: ComponentItem[] = [
  {
    name: 'Accordion',
    href: '/components/mies/accordion',
    icon: 'chevron-down',
    packageType: '@tanqory/mies',
    description: 'Collapsible content panels'
  },
  {
    name: 'Alert',
    href: '/components/mies/alert',
    icon: 'alert-triangle',
    packageType: '@tanqory/mies',
    description: 'Alert messages and notifications'
  },
  {
    name: 'Alert Dialog',
    href: '/components/mies/alert-dialog',
    icon: 'message-square',
    packageType: '@tanqory/mies',
    description: 'Modal alert dialogs'
  },
  {
    name: 'Aspect Ratio',
    href: '/components/mies/aspect-ratio',
    icon: 'maximize',
    packageType: '@tanqory/mies',
    description: 'Maintain aspect ratios'
  },
  {
    name: 'Autocomplete',
    href: '/components/mies/autocomplete',
    icon: 'search',
    packageType: '@tanqory/mies',
    description: 'Search and select from options'
  },
  {
    name: 'Avatar',
    href: '/components/mies/avatar',
    icon: 'user',
    packageType: '@tanqory/mies',
    description: 'User profile pictures'
  },
  {
    name: 'Badge',
    href: '/components/mies/badge',
    icon: 'tag',
    packageType: '@tanqory/mies',
    description: 'Status indicators and counters'
  },
  {
    name: 'Breadcrumb',
    href: '/components/mies/breadcrumb',
    icon: 'navigation',
    packageType: '@tanqory/mies',
    description: 'Navigation breadcrumbs'
  },
  {
    name: 'Button',
    href: '/components/mies/button',
    icon: 'mouse-pointer',
    packageType: '@tanqory/mies',
    description: 'Interactive buttons'
  },
  {
    name: 'Card',
    href: '/components/mies/card',
    icon: 'credit-card',
    packageType: '@tanqory/mies',
    description: 'Content containers'
  },
  {
    name: 'Checkbox',
    href: '/components/mies/checkbox',
    icon: 'check-square',
    packageType: '@tanqory/mies',
    description: 'Selection checkboxes'
  },
  {
    name: 'Collapsible',
    href: '/components/mies/collapsible',
    icon: 'chevron-up',
    packageType: '@tanqory/mies',
    description: 'Collapsible content'
  },
  {
    name: 'Data Grid',
    href: '/components/mies/data-grid',
    icon: 'table',
    packageType: '@tanqory/mies',
    description: 'Advanced data tables'
  },
  {
    name: 'Date Picker',
    href: '/components/mies/date-picker',
    icon: 'calendar',
    packageType: '@tanqory/mies',
    description: 'Date selection component'
  },
  {
    name: 'Dialog',
    href: '/components/mies/dialog',
    icon: 'square',
    packageType: '@tanqory/mies',
    description: 'Modal dialogs'
  },
  {
    name: 'Input',
    href: '/components/mies/input',
    icon: 'type',
    packageType: '@tanqory/mies',
    description: 'Text input fields'
  },
  {
    name: 'Input OTP',
    href: '/components/mies/input-otp',
    icon: 'hash',
    packageType: '@tanqory/mies',
    description: 'One-time password input'
  },
  {
    name: 'Label',
    href: '/components/mies/label',
    icon: 'tag',
    packageType: '@tanqory/mies',
    description: 'Form labels'
  },
  {
    name: 'Progress',
    href: '/components/mies/progress',
    icon: 'activity',
    packageType: '@tanqory/mies',
    description: 'Progress indicators'
  },
  {
    name: 'Radio Group',
    href: '/components/mies/radio-group',
    icon: 'circle',
    packageType: '@tanqory/mies',
    description: 'Radio button groups'
  },
  {
    name: 'Rating',
    href: '/components/mies/rating',
    icon: 'star',
    packageType: '@tanqory/mies',
    description: 'Star rating component'
  },
  {
    name: 'Select',
    href: '/components/mies/select',
    icon: 'chevron-down',
    packageType: '@tanqory/mies',
    description: 'Dropdown selection'
  },
  {
    name: 'Separator',
    href: '/components/mies/separator',
    icon: 'minus',
    packageType: '@tanqory/mies',
    description: 'Content separators'
  },
  {
    name: 'Skeleton',
    href: '/components/mies/skeleton',
    icon: 'loader',
    packageType: '@tanqory/mies',
    description: 'Loading placeholders'
  },
  {
    name: 'Slider',
    href: '/components/mies/slider',
    icon: 'sliders',
    packageType: '@tanqory/mies',
    description: 'Range sliders'
  },
  {
    name: 'Stepper',
    href: '/components/mies/stepper',
    icon: 'trending-up',
    packageType: '@tanqory/mies',
    description: 'Step-by-step navigation'
  },
  {
    name: 'Switch',
    href: '/components/mies/switch',
    icon: 'toggle-left',
    packageType: '@tanqory/mies',
    description: 'Toggle switches'
  },
  {
    name: 'Table',
    href: '/components/mies/table',
    icon: 'table',
    packageType: '@tanqory/mies',
    description: 'Data tables'
  },
  {
    name: 'Tabs',
    href: '/components/mies/tabs',
    icon: 'layout',
    packageType: '@tanqory/mies',
    description: 'Tabbed content'
  },
  {
    name: 'Textarea',
    href: '/components/mies/textarea',
    icon: 'file-text',
    packageType: '@tanqory/mies',
    description: 'Multi-line text input'
  },
  {
    name: 'Timeline',
    href: '/components/mies/timeline',
    icon: 'clock',
    packageType: '@tanqory/mies',
    description: 'Timeline components'
  },
  {
    name: 'Toggle',
    href: '/components/mies/toggle',
    icon: 'toggle-right',
    packageType: '@tanqory/mies',
    description: 'Toggle buttons'
  },
  {
    name: 'Tooltip',
    href: '/components/mies/tooltip',
    icon: 'help-circle',
    packageType: '@tanqory/mies',
    description: 'Hover tooltips'
  },
  {
    name: 'Tree View',
    href: '/components/mies/tree-view',
    icon: 'git-branch',
    packageType: '@tanqory/mies',
    description: 'Hierarchical tree views'
  }
];

// Extra/Custom components
const extraComponents: ComponentItem[] = [
  {
    name: 'Animation',
    href: '/animation',
    icon: 'zap',
    packageType: 'Extra',
    description: 'Animation effects and transitions'
  },
  {
    name: 'Carousel',
    href: '/carousel',
    icon: 'images',
    packageType: 'Extra',
    description: 'Image and content carousels'
  },
  {
    name: 'Charts',
    href: '/charts',
    icon: 'bar-chart',
    packageType: 'Extra',
    description: 'Data visualization charts'
  },
  {
    name: 'DND',
    href: '/dnd',
    icon: 'move',
    packageType: 'Extra',
    description: 'Drag and drop functionality'
  },
  {
    name: 'Forms',
    href: '/forms',
    icon: 'file-edit',
    packageType: 'Extra',
    description: 'Advanced form components'
  },
  {
    name: 'Form Wizard',
    href: '/form-wizard',
    icon: 'file-text',
    packageType: 'Extra',
    description: 'Multi-step forms'
  },
  {
    name: 'Layout',
    href: '/layout',
    icon: 'layout',
    packageType: 'Extra',
    description: 'Layout patterns and grids'
  },
  {
    name: 'Multi-Language',
    href: '/multi-language',
    icon: 'globe',
    packageType: 'Extra',
    description: 'Internationalization features'
  },
  {
    name: 'Navigation',
    href: '/navigation',
    icon: 'navigation',
    packageType: 'Extra',
    description: 'Navigation components'
  },
  {
    name: 'Upload',
    href: '/upload',
    icon: 'upload',
    packageType: 'Extra',
    description: 'File upload components'
  },
  {
    name: 'Utilities',
    href: '/utilities',
    icon: 'settings',
    packageType: 'Extra',
    description: 'Utility components and helpers'
  }
];

// All components grouped by sections
export const allComponents: ComponentSection[] = [
  {
    title: 'Foundation',
    items: foundationComponents
  },
  {
    title: '@tanqory/mies',
    items: miesComponents.sort((a, b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Extra',
    items: extraComponents.sort((a, b) => a.name.localeCompare(b.name))
  }
];

// Get component by href
export function getComponentByHref(href: string): ComponentItem | undefined {
  for (const section of allComponents) {
    const component = section.items.find(item => item.href === href);
    if (component) return component;
  }
  return undefined;
}

// Search components
export function searchComponents(query: string): ComponentItem[] {
  const lowerQuery = query.toLowerCase();
  const results: ComponentItem[] = [];

  for (const section of allComponents) {
    for (const item of section.items) {
      if (
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.packageType.toLowerCase().includes(lowerQuery)
      ) {
        results.push(item);
      }
    }
  }

  return results;
}