// src/components/pages/Resources.tsx
import React, { useState } from 'react';
import { ExternalLink, Book, Video, Users, Wrench, Search, Filter } from 'lucide-react';
import type { Resource } from '@/types';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDemographic, setSelectedDemographic] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Women in Powerlifting: Breaking Barriers',
      description: 'Comprehensive guide addressing common challenges faced by female powerlifters, including equipment considerations, training adaptations, and community support.',
      url: 'https://example.com/women-powerlifting',
      type: 'article',
      tags: ['women', 'equity', 'training', 'community'],
      relevantFor: {
        sex: ['F'],
        ageRange: [16, 65],
        equipment: ['Raw', 'Wraps', 'Single-ply'],
      },
    },
    {
      id: '2',
      title: 'Masters Powerlifting: Training After 40',
      description: 'Evidence-based approaches to strength training for masters athletes, including recovery strategies, injury prevention, and age-appropriate programming.',
      url: 'https://example.com/masters-training',
      type: 'article',
      tags: ['masters', 'age', 'training', 'recovery'],
      relevantFor: {
        ageRange: [40, 90],
        equipment: ['Raw', 'Wraps', 'Single-ply', 'Multi-ply'],
      },
    },
    {
      id: '3',
      title: 'Accessible Powerlifting Gyms Directory',
      description: 'Database of powerlifting gyms with accessibility features, adaptive equipment, and inclusive training environments.',
      url: 'https://example.com/accessible-gyms',
      type: 'tool',
      tags: ['accessibility', 'gyms', 'adaptive', 'inclusion'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 90],
      },
    },
    {
      id: '4',
      title: 'Equipment on a Budget: Getting Started in Powerlifting',
      description: 'Cost-effective approaches to acquiring powerlifting equipment, from basic gear to competition-ready setups.',
      url: 'https://example.com/budget-equipment',
      type: 'article',
      tags: ['equipment', 'budget', 'beginner', 'accessibility'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 65],
        experience: ['Beginner', 'Intermediate'],
      },
    },
    {
      id: '5',
      title: 'Mental Health in Competitive Powerlifting',
      description: 'Video series addressing performance anxiety, body image, and mental wellness in strength sports.',
      url: 'https://example.com/mental-health-series',
      type: 'video',
      tags: ['mental health', 'competition', 'wellness', 'psychology'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 90],
      },
    },
    {
      id: '6',
      title: 'Powerlifting for People with Disabilities',
      description: 'Research-backed guide on adaptive powerlifting techniques, classification systems, and para-powerlifting opportunities.',
      url: 'https://example.com/adaptive-powerlifting',
      type: 'research',
      tags: ['disability', 'adaptive', 'para-powerlifting', 'inclusion'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 90],
      },
    },
    {
      id: '7',
      title: 'Supportive Communities for LGBTQ+ Athletes',
      description: 'Directory of inclusive powerlifting communities, online groups, and resources for LGBTQ+ athletes.',
      url: 'https://example.com/lgbtq-communities',
      type: 'community',
      tags: ['LGBTQ+', 'community', 'inclusion', 'support'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 90],
      },
    },
    {
      id: '8',
      title: 'Nutrition on a Budget for Strength Athletes',
      description: 'Practical nutrition strategies for powerlifters with limited financial resources, including meal planning and supplement alternatives.',
      url: 'https://example.com/budget-nutrition',
      type: 'article',
      tags: ['nutrition', 'budget', 'meal planning', 'accessibility'],
      relevantFor: {
        sex: ['M', 'F', 'Mx'],
        ageRange: [16, 90],
      },
    },
  ];

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'community', label: 'Communities' },
    { value: 'tool', label: 'Tools' },
    { value: 'research', label: 'Research' },
  ];

  const demographics = [
    { value: 'all', label: 'All Demographics' },
    { value: 'women', label: 'Women' },
    { value: 'masters', label: 'Masters (40+)' },
    { value: 'beginners', label: 'Beginners' },
    { value: 'adaptive', label: 'Adaptive/Disability' },
    { value: 'lgbtq', label: 'LGBTQ+' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
    
    const matchesDemographic = selectedDemographic === 'all' || 
                              resource.tags.some((tag: string) => {
                                switch (selectedDemographic) {
                                  case 'women': return tag === 'women';
                                  case 'masters': return tag === 'masters' || tag === 'age';
                                  case 'beginners': return tag === 'beginner';
                                  case 'adaptive': return tag === 'disability' || tag === 'adaptive';
                                  case 'lgbtq': return tag === 'LGBTQ+';
                                  default: return true;
                                }
                              });
    
    return matchesSearch && matchesCategory && matchesDemographic;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return Book;
      case 'video': return Video;
      case 'community': return Users;
      case 'tool': return Wrench;
      case 'research': return Book;
      default: return Book;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'community': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'tool': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'research': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resources for Equitable Training
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Curated resources addressing barriers and promoting inclusive participation in powerlifting.
            Find support, guidance, and community regardless of your background.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Demographic Filter */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedDemographic}
                onChange={(e) => setSelectedDemographic(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                {demographics.map(demo => (
                  <option key={demo.value} value={demo.value}>
                    {demo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <TypeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{resource.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                  >
                    View Resource
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or filters to find relevant resources.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDemographic('all');
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Contributing Section */}
        <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
            Know of a Resource We're Missing?
          </h2>
          <p className="text-primary-700 dark:text-primary-300 mb-6 max-w-2xl mx-auto">
            Help us build a more comprehensive resource library by suggesting additions 
            that promote equity and inclusion in powerlifting.
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Suggest a Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;