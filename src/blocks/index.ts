// Animation Blocks
export * from './animation-blocks';
export * from './animate-blocks';

// Media Blocks
export * from './media-blocks';

// DataViz Blocks
export * from './dataviz-blocks';
export * from './chart-blocks';

// Navigation Blocks
export * from './navigation-blocks';

// Re-export with different names to avoid conflicts
export type { BreadcrumbItem as BlockBreadcrumbItem } from './navigation-blocks';
export { DateRangePicker as BlockDateRangePicker } from './custom-date-range-picker-blocks';
export type { DateRangePickerProps as BlockDateRangePickerProps } from './custom-date-range-picker-blocks';

// Form Blocks
export * from './form-blocks';
export * from './form-wizard-blocks';

// Layout Blocks
export * from './layout-blocks';

// Dialog Blocks
export * from './dialog-blocks';

// DND Blocks
export * from './dnd-blocks';

// Multi-Language Blocks
export * from './multi-language-blocks';

// Component Blocks
export * from './carousel-blocks';
export * from './color-utils-blocks';
export * from './country-select-blocks';
export * from './custom-breadcrumbs-blocks';
export * from './custom-date-range-picker-blocks';
export * from './empty-content-blocks';
export * from './loading-screen-blocks';
export * from './table-blocks';

// Block Collections for easy import
import * as AnimationBlocksExports from './animation-blocks';
import * as AnimateBlocksExports from './animate-blocks';
import * as MediaBlocksExports from './media-blocks';
import * as CarouselBlocksExports from './carousel-blocks';
import * as DatavizBlocksExports from './dataviz-blocks';
import * as ChartBlocksExports from './chart-blocks';
import * as TableBlocksExports from './table-blocks';
import * as NavigationBlocksExports from './navigation-blocks';
import * as CustomBreadcrumbsBlocksExports from './custom-breadcrumbs-blocks';
import * as FormBlocksExports from './form-blocks';
import * as FormWizardBlocksExports from './form-wizard-blocks';
import * as CountrySelectBlocksExports from './country-select-blocks';
import * as CustomDateRangePickerBlocksExports from './custom-date-range-picker-blocks';
import * as LayoutBlocksExports from './layout-blocks';
import * as DialogBlocksExports from './dialog-blocks';
import * as ColorUtilsBlocksExports from './color-utils-blocks';
import * as LoadingScreenBlocksExports from './loading-screen-blocks';
import * as EmptyContentBlocksExports from './empty-content-blocks';
import * as DndBlocksExports from './dnd-blocks';
import * as MultiLanguageBlocksExports from './multi-language-blocks';

export const AnimationBlocks = {
  CountUpCard: AnimationBlocksExports.CountUpCard,
  TextReveal: AnimationBlocksExports.TextReveal,
  ScrollToTop: AnimationBlocksExports.ScrollToTop,
  AnimateCountUp: AnimateBlocksExports.AnimateCountUp,
  AnimateText: AnimateBlocksExports.AnimateText,
  BackToTopButton: AnimateBlocksExports.BackToTopButton,
  MotionContainer: AnimateBlocksExports.MotionContainer,
} as const;

export const MediaBlocks = {
  ImageGallery: MediaBlocksExports.ImageGallery,
  MediaCarousel: MediaBlocksExports.MediaCarousel,
  FileUploader: MediaBlocksExports.FileUploader,
  ImageCarousel: CarouselBlocksExports.ImageCarousel,
  TestimonialCarousel: CarouselBlocksExports.TestimonialCarousel,
  ProductCarousel: CarouselBlocksExports.ProductCarousel,
} as const;

export const DataVizBlocks = {
  StatsCards: DatavizBlocksExports.StatsCards,
  DataTable: DatavizBlocksExports.DataTable,
  ChartWidget: DatavizBlocksExports.ChartWidget,
  AnalyticsChart: ChartBlocksExports.AnalyticsChart,
  DashboardCharts: ChartBlocksExports.DashboardCharts,
  DataTableAdvanced: TableBlocksExports.DataTableAdvanced,
} as const;

export const NavigationBlocks = {
  Breadcrumbs: NavigationBlocksExports.Breadcrumbs,
  MegaMenu: NavigationBlocksExports.MegaMenu,
  Sidebar: NavigationBlocksExports.Sidebar,
  BreadcrumbNav: CustomBreadcrumbsBlocksExports.BreadcrumbNav,
} as const;

export const FormBlocks = {
  ContactForm: FormBlocksExports.ContactForm,
  LoginForm: FormBlocksExports.LoginForm,
  SearchBar: FormBlocksExports.SearchBar,
  CountrySelect: CountrySelectBlocksExports.CountrySelect,
  DateRangePicker: CustomDateRangePickerBlocksExports.DateRangePicker,
  MultiStepForm: FormWizardBlocksExports.MultiStepForm,
  ProgressStepper: FormWizardBlocksExports.ProgressStepper,
  StepNavigation: FormWizardBlocksExports.StepNavigation,
} as const;

export const LayoutBlocks = {
  HeroSection: LayoutBlocksExports.HeroSection,
  FeatureGrid: LayoutBlocksExports.FeatureGrid,
  Footer: LayoutBlocksExports.Footer,
} as const;

export const DialogBlocks = {
  ConfirmDialog: DialogBlocksExports.ConfirmDialog,
  ToastProvider: DialogBlocksExports.ToastProvider,
  useToast: DialogBlocksExports.useToast,
  toast: DialogBlocksExports.toast,
} as const;

export const DnDBlocks = {
  SortableList: DndBlocksExports.SortableList,
  SortableGrid: DndBlocksExports.SortableGrid,
  DragDropZone: DndBlocksExports.DragDropZone,
  KanbanBoard: DndBlocksExports.KanbanBoard,
} as const;

export const MultiLanguageBlocks = {
  LanguageSwitcher: MultiLanguageBlocksExports.LanguageSwitcher,
  TranslatedText: MultiLanguageBlocksExports.TranslatedText,
  TranslatedContent: MultiLanguageBlocksExports.TranslatedContentComponent,
  LocalizedNumber: MultiLanguageBlocksExports.LocalizedNumber,
  LocalizedDate: MultiLanguageBlocksExports.LocalizedDate,
  LocalizedList: MultiLanguageBlocksExports.LocalizedList,
  MultiLanguageProvider: MultiLanguageBlocksExports.MultiLanguageProvider,
  MultiLangNavigation: MultiLanguageBlocksExports.MultiLangNavigation,
  useLanguage: MultiLanguageBlocksExports.useLanguage,
  useTranslate: MultiLanguageBlocksExports.useTranslate,
  useCurrentLanguage: MultiLanguageBlocksExports.useCurrentLanguage,
  useLanguageSwitcher: MultiLanguageBlocksExports.useLanguageSwitcher,
} as const;

export const UtilityBlocks = {
  ColorPicker: ColorUtilsBlocksExports.ColorPicker,
  LoadingSpinner: LoadingScreenBlocksExports.LoadingSpinner,
  EmptyState: EmptyContentBlocksExports.EmptyState,
  AnimateCountUp: AnimateBlocksExports.AnimateCountUp,
  AnimateText: AnimateBlocksExports.AnimateText,
  BackToTopButton: AnimateBlocksExports.BackToTopButton,
  MotionContainer: AnimateBlocksExports.MotionContainer,
} as const;