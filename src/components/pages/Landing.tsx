// src/components/pages/Landing.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  BarChart3,
  Zap,
  Target,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Demo requested for:', email);
    setEmail('');
    alert('Thanks! We\'ll send you demo access soon.');
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Predictions',
      description: 'Get personalized strength predictions based on your demographics, experience, and equipment using machine learning.',
    },
    {
      icon: Users,
      title: 'Peer Comparisons',
      description: 'See how your performance compares to athletes with similar profiles while understanding equity factors.',
    },
    {
      icon: Shield,
      title: 'Equity-Focused Insights',
      description: 'Receive contextual information about potential barriers and resources tailored to your demographic group.',
    },
    {
      icon: BarChart3,
      title: 'Progress Visualization',
      description: 'Track your strength journey with beautiful charts that show your growth over time.',
    },
    {
      icon: Zap,
      title: 'What-If Scenarios',
      description: 'Explore how changes in weight, age, or equipment might affect your predicted performance.',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set realistic, data-driven goals and get guidance on achieving them safely and effectively.',
    },
  ];

  const stats = [
    { label: 'Athletes Analyzed', value: '350K+' },
    { label: 'Predictions Made', value: '50K+' },
    { label: 'Accuracy Rate', value: '85%+' },
    { label: 'Countries', value: '45+' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Competitive Powerlifter',
      content: 'Strength Compass helped me understand my potential and set realistic goals. The equity insights opened my eyes to barriers I didn\'t even realize existed.',
      avatar: '👩‍🦰',
    },
    {
      name: 'Marcus Johnson',
      role: 'Masters Athlete',
      content: 'As a 45-year-old lifter, I love seeing how my age group performs and getting specific advice for masters athletes. It\'s motivating!',
      avatar: '👨‍🦲',
    },
    {
      name: 'Coach Elena',
      role: 'Strength Coach',
      content: 'The coach dashboard helps me track all my athletes and identify who needs extra support. It\'s become essential to my coaching.',
      avatar: '👩‍🎓',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Your <span className="text-yellow-300">Strength Compass</span> for Equitable Training
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Predict your powerlifting potential, understand performance factors, and access resources 
                tailored to your demographic with our AI-powered analytics platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 flex items-center justify-center group"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Predicted Total</span>
                    <span className="text-2xl font-bold text-yellow-300">487.5 kg</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-yellow-400 h-3 rounded-full w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">185kg</div>
                      <div className="text-sm text-blue-200">Squat</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">125kg</div>
                      <div className="text-sm text-blue-200">Bench</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">177.5kg</div>
                      <div className="text-sm text-blue-200">Deadlift</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need for <span className="text-primary-600">equitable training</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge machine learning with equity-focused insights 
              to help every athlete reach their potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by athletes and coaches
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community is saying about Strength Compass
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to discover your strength potential?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of athletes using data-driven insights to achieve their goals
          </p>
          
          <form onSubmit={handleDemoRequest} className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for demo access"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-6 py-3 rounded-r-lg transition-colors"
              >
                Get Demo
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Free to get started
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Privacy focused
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;