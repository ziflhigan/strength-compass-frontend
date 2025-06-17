// src/components/pages/FAQ.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Book, Shield, Users } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'How accurate are the strength predictions?',
      answer: 'Our machine learning model achieves approximately 85% accuracy with an average error of ±16kg when tested on unseen data. The model is trained on over 350,000 powerlifting meet records and considers factors like age, sex, bodyweight, and equipment. However, individual results can vary based on training history, genetics, and other personal factors not captured in the dataset.',
    },
    {
      id: '2',
      category: 'general',
      question: 'What data is used to generate predictions?',
      answer: 'Our predictions are based on the OpenPowerlifting database, which contains meet results from thousands of sanctioned powerlifting competitions worldwide. The model uses your demographic information (age, sex, bodyweight, equipment type) to find patterns in how similar athletes have performed historically.',
    },
    {
      id: '3',
      category: 'equity',
      question: 'How does the platform address equity and bias in strength sports?',
      answer: 'We acknowledge that historical powerlifting data may reflect systemic inequities. Our platform provides contextual information about potential barriers faced by different demographic groups, offers curated resources for underrepresented athletes, and presents predictions alongside equity insights rather than as absolute truths. We continuously work to identify and mitigate algorithmic bias in our models.',
    },
    {
      id: '4',
      category: 'equity',
      question: 'Why do I see different predictions for different demographic groups?',
      answer: 'Strength performance varies across demographic groups due to a combination of physiological, social, and systemic factors. Our model reflects these patterns found in historical data while providing context about equity factors that may influence these differences. The goal is to provide realistic expectations while acknowledging that individual potential may not be limited by demographic averages.',
    },
    {
      id: '5',
      category: 'technical',
      question: 'What machine learning algorithm do you use?',
      answer: 'We use ensemble methods, specifically Random Forest and Gradient Boosting regressors, which excel at capturing non-linear relationships in tabular data. These models are trained on features including age, sex, bodyweight, and equipment type. We chose these algorithms for their robustness, interpretability through feature importance, and strong performance on sports prediction tasks.',
    },
    {
      id: '6',
      category: 'technical',
      question: 'How often is the model updated?',
      answer: 'Our prediction models are retrained quarterly using the latest competition data from OpenPowerlifting. We continuously monitor model performance and will update more frequently if significant drift is detected. Users are notified when predictions are generated using updated models.',
    },
    {
      id: '7',
      category: 'usage',
      question: 'Should I use these predictions to set my training goals?',
      answer: 'Our predictions should be used as one data point among many when setting goals. They provide insight into what might be achievable based on historical patterns, but individual circumstances, training quality, and personal factors can significantly impact results. Always consult with qualified coaches and consider your personal situation when goal setting.',
    },
    {
      id: '8',
      category: 'usage',
      question: 'Can I track my progress against predictions?',
      answer: 'Yes! Our meet log feature allows you to record your actual competition results and compare them to your predictions. This helps you understand how your training is progressing and whether you\'re outperforming or underperforming relative to the model\'s expectations.',
    },
    {
      id: '9',
      category: 'privacy',
      question: 'What data do you collect and how is it used?',
      answer: 'We collect only the information necessary to provide predictions: age, sex, bodyweight, and equipment preferences. Competition results you choose to log are stored to track your progress. We do not sell personal data to third parties. All data is encrypted and stored securely. You can request data deletion at any time.',
    },
    {
      id: '10',
      category: 'privacy',
      question: 'Is my personal information shared with others?',
      answer: 'No. Your personal information and individual predictions are never shared with other users or third parties. When we publish research or insights, we only use aggregated, anonymized data that cannot be traced back to individual users.',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Questions', icon: HelpCircle },
    { value: 'general', label: 'General', icon: Book },
    { value: 'equity', label: 'Equity & Bias', icon: Users },
    { value: 'technical', label: 'Technical', icon: Book },
    { value: 'usage', label: 'Usage', icon: HelpCircle },
    { value: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about our platform, predictions, and approach to equity in powerlifting.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.value;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-lg"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.question}
                </span>
                {openItems.has(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-700 dark:text-primary-300 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? We're here to help. Reach out to our team 
            for personalized assistance with your questions about the platform or powerlifting in general.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Contact Support
            </button>
            <button className="border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 font-medium px-6 py-3 rounded-lg transition-colors">
              Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;