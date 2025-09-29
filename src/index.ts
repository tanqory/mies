// UI Components
export * from './components/ui/accordion'
export * from './components/ui/alert-dialog'
export * from './components/ui/alert'
export * from './components/ui/aspect-ratio'
export * from './components/ui/avatar'
export * from './components/ui/badge'
export * from './components/ui/breadcrumb'
export * from './components/ui/button'
export * from './components/ui/calendar'
export * from './components/ui/card'
// export * from './components/ui/carousel' // Temporarily disabled due to React version compatibility
// export * from './components/ui/chart' // Temporarily disabled due to React version compatibility
export * from './components/ui/checkbox'
export * from './components/ui/collapsible'
export * from './components/ui/command'
export * from './components/ui/context-menu'
export * from './components/ui/dialog'
export * from './components/ui/drawer'
export * from './components/ui/dropdown-menu'
// export * from './components/ui/form' // Temporarily disabled due to FormProvider import issue
export * from './components/ui/hover-card'
export * from './components/ui/input'
export * from './components/ui/input-otp'
export * from './components/ui/label'
export * from './components/ui/menubar'
export * from './components/ui/navigation-menu'
export * from './components/ui/pagination'
export * from './components/ui/popover'
export * from './components/ui/progress'
export * from './components/ui/radio-group'
export * from './components/ui/resizable'
export * from './components/ui/scroll-area'
export * from './components/ui/select'
export * from './components/ui/separator'
export * from './components/ui/sheet'
export * from './components/ui/sidebar'
export * from './components/ui/skeleton'
export * from './components/ui/slider'
export * from './components/ui/sonner'
export * from './components/ui/switch'
export * from './components/ui/table'
export * from './components/ui/tabs'
export * from './components/ui/textarea'
export * from './components/ui/toggle'
export * from './components/ui/toggle-group'
export * from './components/ui/tooltip'

// New MUI-equivalent components
export * from './components/ui/autocomplete'
export * from './components/ui/data-grid'
export * from './components/ui/date-picker'
export * from './components/ui/rating'
export * from './components/ui/stepper'
export * from './components/ui/timeline'
export * from './components/ui/tree-view'

// Utilities
export * from './components/ui/utils'
export * from './components/ui/use-mobile'

// Theme Provider
export { ThemeProvider, useTheme } from 'next-themes'

// Icons
export * as LucideIcons from 'lucide-react'

// Charts
export * as ReCharts from 'recharts'

// Component Blocks - Export selectively to avoid conflicts
export {
  // Animation blocks
  CountUpCard, TextReveal, ScrollToTop,
  AnimateCountUp, AnimateText, BackToTopButton, MotionContainer,

  // Media blocks
  ImageGallery, MediaCarousel, FileUploader,

  // Navigation blocks
  Breadcrumbs as BlockBreadcrumbs,
  BreadcrumbNav,
  MegaMenu as BlockMegaMenu,
  Sidebar as BlockSidebar,

  // Layout blocks
  HeroSection, FeatureGrid, Footer,

  // Form blocks
  ContactForm, LoginForm, SearchBar,

  // Dialog blocks
  ConfirmDialog as BlockConfirmDialog,
  ToastProvider, useToast, toast,

  // Data visualization blocks
  StatsCards, DataTable as BlockDataTable, ChartWidget,
  AnalyticsChart, DashboardCharts, DataTableAdvanced,

  // Carousel blocks
  ImageCarousel, TestimonialCarousel, ProductCarousel,

  // Other component blocks
  ColorPicker, CountrySelect, EmptyState, LoadingSpinner,

  // Block collections
  AnimationBlocks, MediaBlocks, DataVizBlocks, NavigationBlocks,
  FormBlocks, LayoutBlocks, DialogBlocks, UtilityBlocks
} from './blocks';

// Export types separately to avoid conflicts
export type {
  // Navigation types with prefixes
  BreadcrumbItem as BlockBreadcrumbItem,
  BreadcrumbNavItem, BreadcrumbNavProps,
  MegaMenuItem, MegaMenuSection, MegaMenuProps,
  SidebarItem, SidebarProps,

  // Layout types
  HeroAction, HeroSectionProps,
  Feature, FeatureGridProps,
  FooterLink, FooterSection, SocialLink, FooterProps,

  // Media types
  GalleryImage, ImageGalleryProps,
  MediaItem, MediaCarouselProps,
  FileItem, FileUploaderProps,

  // Date picker with prefix
  DateRangePicker as BlockDateRangePickerComponent,
  DateRangePickerProps as BlockDateRangePickerProps,
  DateRange
} from './blocks';