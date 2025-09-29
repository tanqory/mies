# Changelog

All notable changes to the @tanqory/mies component library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-28

### Added

#### 🚀 Mies X Extended Components
- **New Export Path**: `@tanqory/mies/x` for advanced components
- **13 New Components** for advanced dashboard and interaction patterns

##### Enhanced Input Components
- `Chips` - Tag input with add/remove functionality and keyboard navigation
- `RangeEnhanced` - Advanced range slider with progress visualization and custom formatting
- `AutocompleteEnhanced` - Search with filtering, custom options, and dropdown support

##### Dashboard & Layout Components
- `CalloutCard` - Call-to-action cards with illustrations, actions, and dismissible states
- `EmptyState` - Empty state screens with actions, illustrations, and responsive layouts
- `Page` - Layout structure with headers, actions, breadcrumbs, and pagination
- `TopBar` - App navigation with search, notifications, user menu, and mobile support
- `IndexFilters` - Advanced table filtering with search, filters, sorting, and tabs

##### Interactive Components
- `Notification` - Toast-style notifications with auto-dismiss and themes
- `PopupEnhanced` - Enhanced popover with advanced positioning and close behaviors
- `CounterAnimation` - Animated number counters with easing functions and intersection observer
- `DragDrop` - Sortable lists with drag & drop using @dnd-kit
- `DropZone` - File upload with drag & drop support, validation, and progress feedback

#### 📚 Documentation & Tooling
- **Complete Storybook Integration**: 12 comprehensive story files with examples
- **TypeScript Definitions**: Full type safety for all Mies X components
- **Multi-Entry Build**: Optimized build system with separate bundles for core and extended components
- **Enhanced README**: Comprehensive documentation with Mies X usage examples

### Changed
- **Component Count**: Updated from 48+ to 61+ total components
- **Build System**: Enhanced Vite configuration for multi-entry builds
- **Package Exports**: Added `./x` export path in package.json

### Technical Details
- **Bundle Size**:
  - Core: ~320KB (mjs) + ~220KB (js)
  - Mies X: ~61KB (mjs) + ~39KB (js)
- **Dependencies**: Added @dnd-kit for drag & drop functionality
- **TypeScript**: Full type coverage with proper module declarations

## [Unreleased] - 2025-09-26

### Added - MUI Migration Support Components 🚀

เพิ่มคอมโพเนนต์ใหม่เพื่อรองรับการ migrate จาก Material-UI (MUI):

#### New Components

- **Rating** (`rating.tsx`) - Star rating component with customizable precision and interaction
  - Support for half-star ratings
  - Keyboard navigation and accessibility
  - Controlled and uncontrolled modes
  - Custom icons and styling variants

- **Stepper** (`stepper.tsx`) - Step-by-step process indicator
  - Horizontal and vertical orientations
  - Active, completed, and error states
  - Custom icons and labels
  - Optional content display

- **Timeline** (`timeline.tsx`) - Chronological event display
  - Left, right, and center positioning
  - Custom dots with variants (primary, success, warning, destructive)
  - Flexible content structure with titles, descriptions, and timestamps
  - Visual separators for timeline sections

- **Autocomplete** (`autocomplete.tsx`) - Advanced select with search and creation
  - Single and multiple selection modes
  - Search filtering and custom creation
  - Grouped options support
  - Loading states and custom empty messages

- **DatePicker** (`date-picker.tsx`) - Comprehensive date/time selection
  - `DatePicker` - Single date selection with input
  - `DateRangePicker` - Date range selection with dual calendar
  - `TimePicker` - Time selection with 12/24 hour formats
  - `DateTimePicker` - Combined date and time selection

- **TreeView** (`tree-view.tsx`) - Hierarchical data display
  - Expandable/collapsible nodes
  - Multi-level nesting (up to 5 levels)
  - Single and multi-selection modes
  - Custom icons and disabled states
  - Keyboard navigation support

- **DataGrid** (`data-grid.tsx`) - Advanced data table with TanStack Table
  - Row selection with checkboxes
  - Column sorting and filtering
  - Pagination with customizable page sizes
  - Column visibility controls
  - Global search functionality
  - Loading and empty states
  - Density options (compact, standard, comfortable)
  - Row click and double-click handlers

### Updated

- **Package Dependencies**
  - Added `@tanstack/react-table ^8.21.3` for DataGrid functionality
  - All existing Radix UI and utility dependencies maintained

- **Build Configuration**
  - Updated TypeScript exports in `src/index.ts`
  - Added new component exports to main index file
  - Maintained backward compatibility with existing components

### Technical Improvements

- **TypeScript Support**: Full type definitions for all new components
- **Accessibility**: Built on Radix UI primitives where applicable
- **Styling**: Consistent with existing Tailwind CSS approach
- **Testing**: Components ready for integration testing

### Migration Support

- **MUI Compatibility**: New components provide API patterns similar to Material-UI
- **Component Mapping**: Clear migration path from MUI components
- **Props Alignment**: Similar prop names and behavior for easier migration

### Documentation

- **Component Coverage**: Now supports 50+ components (was 43)
- **Migration Guide**: Comprehensive MUI vs Mies comparison document
- **API Reference**: TypeScript definitions provide IntelliSense support

---

## Previous Versions

### [0.1.1] - 2025-09-25
- Initial release with core UI components
- Radix UI integration
- Tailwind CSS styling system
- TypeScript support
- Next.js and React.js examples