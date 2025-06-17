# FitEquity Analytics - Strength Compass Prototype

A comprehensive React TypeScript application for AI-powered strength predictions and equity-focused insights in powerlifting. This platform provides athletes and coaches with data-driven tools to predict performance, track progress, and address equity barriers in strength sports.

## Quick Setup

### Prerequisites

Ensure you have the following installed:
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/strength-compass-frontend.git
   cd strength-compass-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME=Strength Compass
   VITE_LOG_LEVEL=debug
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

### Demo Accounts

The application includes pre-configured demo accounts:
- **Athlete Account**: `demo@athlete.com` (password: any 3+ characters)
- **Coach Account**: `demo@coach.com` (password: any 3+ characters)

## Project Overview

FitEquity Analytics addresses the critical need for equitable representation and data-driven insights in powerlifting. The platform combines machine learning predictions with equity-focused resources to help athletes understand their potential while acknowledging systemic barriers that may affect performance outcomes.

### Core Mission

- Provide accurate strength predictions using AI/ML models
- Highlight equity considerations in strength sports
- Offer resources for underrepresented demographics
- Enable coaches to support diverse athlete populations
- Promote inclusive participation in powerlifting

## Features

### For Athletes

**Strength Predictions**
- AI-powered total and individual lift predictions
- Confidence intervals and percentile rankings
- Equipment-specific adjustments
- Demographic-aware modeling

**What-If Scenarios**
- Explore age, bodyweight, and equipment changes
- Real-time prediction updates
- Scenario comparison tools

**Progress Tracking**
- Competition history logging
- Prediction accuracy monitoring
- Visual progress charts
- Performance trend analysis

**Equity Resources**
- Demographic-specific insights
- Barrier identification and mitigation
- Curated resource library
- Community support connections

### For Coaches

**Multi-Athlete Management**
- Team dashboard with key metrics
- Individual athlete monitoring
- Performance alerts and flags
- Meet scheduling and tracking

**Analytics and Insights**
- Team performance statistics
- Prediction accuracy by athlete
- Equipment and demographic distribution
- Progress trend identification

**Alert System**
- Performance drop notifications
- Upcoming meet reminders
- Prediction outlier alerts
- Action-required flags

### General Features

**User Experience**
- Responsive design for all devices
- Dark and light theme support
- Accessibility compliance (WCAG 2.1)
- Intuitive navigation and workflows

**Data Visualization**
- Interactive charts and graphs
- Progress trend analysis
- Peer comparison tools
- Statistical dashboards

## Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server

### Styling and UI
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind Forms** - Enhanced form styling
- **Tailwind Typography** - Rich text formatting
- **Lucide React** - Consistent icon library

### State Management
- **React Context API** - Application state management
- **Custom hooks** - Reusable stateful logic
- **Local Storage** - Persistent user preferences

### Data Visualization
- **Recharts** - React-based charting library
- **Custom components** - Specialized fitness visualizations

### Form Handling
- **React Hook Form** - Performant form management
- **Zod** - Runtime type validation
- **Hookform Resolvers** - Validation integration

### Routing and Navigation
- **React Router v6** - Client-side routing
- **Protected routes** - Role-based access control
- **Lazy loading** - Performance optimization

### HTTP Client
- **Axios** - HTTP request library
- **Interceptors** - Request/response handling
- **Error handling** - Centralized error management

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript compiler** - Type checking

## Project Structure

```
src/
├── components/              # React components
│   ├── auth/               # Authentication components
│   │   ├── AuthGuard.tsx   # Route protection
│   │   ├── LoginForm.tsx   # Login interface
│   │   └── RegisterForm.tsx # Registration interface
│   ├── common/             # Shared components
│   │   ├── Header.tsx      # Application header
│   │   ├── Footer.tsx      # Application footer
│   │   ├── Layout.tsx      # Page layout wrapper
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── dashboard/          # Dashboard components
│   │   ├── PredictionDashboard.tsx # Main prediction view
│   │   └── StatsCard.tsx   # Metric display cards
│   ├── forms/              # Form components
│   │   ├── AthleteProfileForm.tsx # Profile input
│   │   └── WhatIfSimulator.tsx # Scenario modeling
│   ├── pages/              # Page components
│   │   ├── Landing.tsx     # Marketing homepage
│   │   ├── Dashboard.tsx   # Main athlete dashboard
│   │   ├── MeetLog.tsx     # Competition history
│   │   ├── CoachDashboard.tsx # Coach interface
│   │   ├── Resources.tsx   # Resource library
│   │   └── FAQ.tsx         # Frequently asked questions
│   └── visualizations/     # Chart components
│       ├── StrengthGauge.tsx # Circular progress indicator
│       ├── ProgressVisualizer.tsx # Trend charts
│       └── PercentileChart.tsx # Peer comparison
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication state
│   ├── PredictionContext.tsx # Prediction state
│   └── ThemeContext.tsx    # Theme management
├── hooks/                  # Custom React hooks
│   ├── useApi.ts          # API interaction hook
│   ├── useLocalStorage.ts # Persistent storage hook
│   └── useDebounce.ts     # Input debouncing
├── services/               # API and service layers
│   ├── api.ts             # HTTP client configuration
│   ├── auth.ts            # Authentication service
│   ├── prediction.ts      # ML prediction service
│   ├── meetLog.ts         # Competition data service
│   ├── coach.ts           # Coach dashboard service
│   └── storage.ts         # Local storage service
├── types/                  # TypeScript definitions
│   ├── athlete.ts         # Athlete-related types
│   ├── prediction.ts      # Prediction types
│   ├── meet.ts            # Competition types
│   ├── api.ts             # API response types
│   ├── auth.ts            # Authentication types
│   └── dashboard.ts       # Dashboard types
├── utils/                  # Utility functions
│   ├── logger.ts          # Logging functionality
│   ├── constants.ts       # Application constants
│   ├── formatters.ts      # Data formatting utilities
│   └── validators.ts      # Input validation
├── styles/                 # Global styles
│   └── globals.css        # Tailwind and custom CSS
├── App.tsx                 # Root application component
└── main.tsx               # Application entry point
```

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run type-check      # TypeScript compilation check
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Testing (when implemented)
npm test               # Run test suite
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

### Development Guidelines

**Code Style**
- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error boundaries
- Add comprehensive JSDoc comments
- Maintain consistent naming conventions

**Component Design**
- Create reusable, composable components
- Implement proper prop validation
- Use TypeScript interfaces for all props
- Follow single responsibility principle
- Optimize for performance and accessibility

**State Management**
- Use React Context for global state
- Implement custom hooks for complex logic
- Minimize prop drilling
- Cache expensive computations
- Handle loading and error states

**Testing Strategy**
- Unit tests for utilities and hooks
- Integration tests for components
- End-to-end tests for critical flows
- Mock external dependencies
- Maintain high test coverage

## API Integration

### Backend Requirements

The frontend expects a REST API with the following endpoint for ML predictions:

```
POST /api/predict
Content-Type: application/json

Request Body:
{
  "sex": "M" | "F" | "Mx",
  "age": number,
  "bw": number,        // bodyweight in kg
  "equip": string      // equipment type
}

Response:
{
  "success": true,
  "data": {
    "total_pred": number,
    "squat_pred": number,     // optional
    "bench_pred": number,     // optional
    "deadlift_pred": number,  // optional
    "wilks_pred": number,     // optional
    "pi_low": number,         // prediction interval low
    "pi_high": number,        // prediction interval high
    "percentile": number,     // optional
    "confidence": number,     // optional
    "metadata": {
      "model_version": string,
      "prediction_date": string,
      "features_used": string[]
    }
  }
}
```

### Fallback System

If the ML API is unavailable, the frontend automatically uses a fallback prediction system that generates realistic estimates based on:
- Demographic characteristics
- Equipment adjustments
- Age-related factors
- Bodyweight scaling

### Mock Data Services

For development and testing, the application includes comprehensive mock services:
- Authentication with demo accounts
- Sample competition history
- Coach dashboard with multiple athletes
- Progress tracking data
- Resource library content

## Environment Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` | Yes |
| `VITE_APP_NAME` | Application name | `Strength Compass` | No |
| `VITE_LOG_LEVEL` | Logging level | `debug` | No |
| `VITE_SUPPORT_EMAIL` | Support contact | - | No |

### Configuration Files

**TypeScript Configuration**
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.node.json` - Node.js specific configuration
- Path mapping configured for `@/*` imports

**Build Configuration**
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

**Code Quality**
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.gitignore` - Git ignore patterns

## Deployment

### Build Process

1. **Install dependencies:**
   ```bash
   npm ci
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Test the build:**
   ```bash
   npm run preview
   ```

### Deployment Platforms

**Vercel (Recommended)**
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

**Netlify**
1. Upload the `dist/` folder
2. Configure redirects for SPA routing
3. Set environment variables

**AWS S3 + CloudFront**
1. Upload `dist/` contents to S3
2. Configure static website hosting
3. Set up CloudFront distribution

**Docker Deployment**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Production Considerations

**Performance**
- Enable gzip compression
- Configure proper caching headers
- Use CDN for static assets
- Monitor bundle size and optimize

**Security**
- Configure HTTPS
- Set security headers
- Validate environment variables
- Implement CSP policies

**Monitoring**
- Set up error tracking (Sentry)
- Monitor performance metrics
- Track user analytics
- Log important events

## Accessibility Features

### Compliance Standards
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode support

### Implementation Details
- Semantic HTML structure
- ARIA labels and roles
- Focus management
- Color contrast ratios 4.5:1 minimum
- Scalable text up to 200%

### Testing
- Automated accessibility testing
- Manual testing with screen readers
- Keyboard-only navigation testing
- Color blindness simulation

## Contributing

### Getting Started

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting:**
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```
5. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

**Code Standards**
- Follow existing code style and conventions
- Add TypeScript types for all new code
- Include JSDoc comments for functions
- Write unit tests for new features
- Ensure accessibility compliance

**Pull Request Process**
- Include a clear description of changes
- Reference relevant issues
- Add screenshots for UI changes
- Ensure all checks pass
- Request review from maintainers

**Bug Reports**
- Use the issue template
- Include reproduction steps
- Provide environment details
- Add relevant error messages

## Performance Optimization

### Code Splitting
- Route-based code splitting implemented
- Lazy loading for non-critical components
- Dynamic imports for large dependencies

### Bundle Optimization
- Tree shaking enabled
- Dead code elimination
- Asset optimization
- Vendor chunk separation

### Runtime Performance
- React.memo for expensive components
- useMemo for costly calculations
- useCallback for stable references
- Virtualization for large lists

### Monitoring
- Core Web Vitals tracking
- Bundle size monitoring
- Performance budgets
- Runtime error tracking

## Security Considerations

### Data Protection
- No sensitive data in localStorage
- Secure token handling
- Input validation and sanitization
- XSS prevention measures

### Authentication
- JWT token management
- Session timeout handling
- Role-based access control
- Secure logout process

### Dependencies
- Regular security audits
- Automated vulnerability scanning
- Dependency updates
- License compliance

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Core functionality works on all browsers
- Enhanced features for modern browsers
- Graceful degradation for older versions
- Mobile browser optimization

## Troubleshooting

### Common Issues

**Build Errors**
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Verify environment variables
- Check TypeScript errors

**Development Server Issues**
- Port conflicts (change in vite.config.ts)
- Network connectivity issues
- Proxy configuration problems
- Hot reload not working

**API Connection Problems**
- Verify VITE_API_BASE_URL
- Check CORS configuration
- Network firewall issues
- API server availability

**Performance Issues**
- Large bundle size
- Memory leaks
- Slow rendering
- Network requests

### Debug Mode

Enable debug logging:
```env
VITE_LOG_LEVEL=debug
```

View logs in browser console for detailed information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support and Contact

### Getting Help
- Check the FAQ section
- Search existing issues
- Create a new issue with details
- Join our community discussions

### Acknowledgments

- OpenPowerlifting database for training data
- The powerlifting community for feedback and insights
- Contributors and maintainers
- Open source dependency authors

---

**Note**: This is an academic project developed for the FitEquity Analytics initiative. The goal is to promote equity and inclusion in strength sports through data-driven insights and resources.