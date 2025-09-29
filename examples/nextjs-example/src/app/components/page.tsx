'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Badge,
  Separator,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';
import { ComponentCard, ComponentSearch } from '../../components/showcase';
import { allComponents, searchComponents } from '../../config/components-config';

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredComponents, setFilteredComponents] = React.useState(allComponents);

  // Handle search
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredComponents(allComponents);
    } else {
      const searchResults = searchComponents(searchQuery);

      // Group search results by section
      const groupedResults = allComponents.map(section => ({
        ...section,
        items: section.items.filter(item =>
          searchResults.some(result => result.name === item.name)
        )
      })).filter(section => section.items.length > 0);

      setFilteredComponents(groupedResults);
    }
  }, [searchQuery]);

  // Calculate total component count
  const totalComponents = allComponents.reduce((sum, section) => sum + section.items.length, 0);
  const filteredCount = filteredComponents.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">
              Component Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete collection of beautifully designed, accessible components built with @tanqory/mies.
              Copy, paste, and customize to build your next project.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {totalComponents} Components
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              TypeScript
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Responsive
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Dark Mode
            </Badge>
          </div>
        </div>

        {/* Search */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <ComponentSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search components... (e.g., button, form, navigation)"
              className="w-full"
            />
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Found {filteredCount} component{filteredCount !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Component Sections */}
        <div className="space-y-12">
          {filteredComponents.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-6">
              {/* Section Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>
                  <Badge variant="secondary">{section.items.length}</Badge>
                </div>
                <p className="text-muted-foreground">
                  {section.title === 'Foundation' &&
                    'Core design tokens including colors, typography, spacing, and icons.'
                  }
                  {section.title === '@tanqory/mies' &&
                    'Main component library with buttons, forms, navigation, and data display components.'
                  }
                  {section.title === 'Extra' &&
                    'Advanced components and custom implementations for complex use cases.'
                  }
                </p>
              </div>

              {/* Component Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {section.items.map((component) => (
                  <ComponentCard
                    key={component.name}
                    item={component}
                  />
                ))}
              </div>

              {/* Separator between sections */}
              {sectionIndex < filteredComponents.length - 1 && (
                <Separator className="my-12" />
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredCount === 0 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <LucideIcons.Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No components found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching with different keywords or browse all components below.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline font-medium"
              >
                Clear search and show all components
              </button>
            </CardContent>
          </Card>
        )}

        {/* Footer CTA */}
        {!searchQuery && (
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Ready to get started?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore individual components to see detailed examples, API documentation, and copy-paste ready code.
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    <LucideIcons.Zap className="h-3 w-3 mr-1" />
                    Fast Setup
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    <LucideIcons.Palette className="h-3 w-3 mr-1" />
                    Customizable
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    <LucideIcons.Shield className="h-3 w-3 mr-1" />
                    Accessible
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}