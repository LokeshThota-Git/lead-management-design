# Lead Management Module - Frontend

A beautiful, responsive Lead Management system built with React and Tailwind CSS, featuring glassmorphism design and comprehensive lead capture functionality.

## 🚀 What Was Built

This project implements a complete frontend-only Lead Management Module with:

- **Lead Capture Form** with real-time validation
- **Lead List Management** with search, sort, and status updates
- **Glassmorphism UI Design** with modern, frosted glass aesthetics
- **Responsive Design** optimized for mobile and desktop
- **Mock API Integration** with localStorage persistence
- **Accessibility Features** with keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **React 19** with functional components and hooks
- **Tailwind CSS 4** for styling with glassmorphism effects
- **React Router DOM** for navigation
- **React Toastify** for notifications
- **React Icons** for consistent iconography
- **Vite** for fast development and building

## 🎨 Design Decisions

### Glassmorphism Theme
- **Why**: Creates a modern, premium feel that stands out from typical business applications
- **Implementation**: Used `backdrop-blur`, semi-transparent backgrounds, and subtle borders
- **Colors**: Blue-purple gradient background with white/transparent overlays for optimal contrast
- **Accessibility**: Ensured AA contrast ratios and proper focus indicators

### Component Architecture
- **Modular Design**: Separate components for form, list, empty state, and loading states
- **Props-based Communication**: Clean data flow between parent and child components
- **Custom Hooks**: Reusable logic for form validation and API calls
- **Error Boundaries**: Graceful error handling with user-friendly messages

### Responsive Strategy
- **Mobile-First**: Designed for mobile screens first, then enhanced for desktop
- **Breakpoint Strategy**: Used Tailwind's responsive prefixes (sm:, md:, lg:)
- **Touch-Friendly**: Large touch targets and appropriate spacing for mobile devices

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/leads` to see the Lead Management Module

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 What is Simulated

### Mock API (`src/utils/api.js`)
- **postLead()** - Simulates creating a new lead with 1.5s delay
- **fetchLeads()** - Simulates fetching leads with 1s delay
- **updateLead()** - Simulates updating lead status with 800ms delay
- **deleteLead()** - Simulates deleting a lead with 600ms delay
- **Error Simulation** - 10% chance of API failure for realistic testing
- **localStorage Persistence** - Data persists across browser sessions

### Realistic Network Behavior
- Network delays simulate real API calls
- Loading states during all operations
- Error handling with retry functionality
- Success/error toast notifications

## 🎯 Key Features

### Lead Form
- **Validation Rules**:
  - Name: Required, non-empty
  - Email: Robust regex validation
  - Phone: 7-15 digits only
  - Message: Optional, max 500 characters
- **Real-time Validation**: Inline error messages
- **Loading States**: Spinner during submission
- **Success Feedback**: Toast notifications and form reset

### Lead List
- **Search**: Filter by name or email
- **Sorting**: By name, email, or creation date
- **Status Management**: Mark leads as "Contacted"
- **Expandable Messages**: View full message content
- **Responsive Layout**: Table on desktop, cards on mobile
- **Empty State**: Encouraging message when no leads exist

### UI/UX Features
- **Glassmorphism Design**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Fade-in, scale, and hover effects
- **Loading Skeletons**: Better perceived performance
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile Optimization**: Touch-friendly interface

## 🎨 Glassmorphism Implementation

### Key Tailwind Classes Used
```css
/* Main container */
bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl

/* Input fields */
bg-white/6 backdrop-blur-sm border border-white/10 rounded-lg

/* Cards */
bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl

/* Buttons */
bg-gradient-to-r from-blue-500 to-purple-600
```

### Custom CSS Animations
- `animate-fade-in` - Smooth entrance animations
- `animate-slide-in` - Toast notifications
- `animate-pulse-glow` - Loading states
- Custom scrollbar styling for glassmorphism theme

## 🔧 Configuration

### Environment Variables
No environment variables required - all API calls are mocked.

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📸 Screenshots

### Desktop View
- **Form**: Clean glassmorphism form with validation
- **List**: Responsive table with search and sort functionality

### Mobile View
- **Form**: Touch-optimized form layout
- **List**: Card-based layout for better mobile experience

*Note: Screenshots are available in the project root directory*

## 🧪 Testing

### Manual Testing Checklist
See `TEST_CHECKLIST.md` for comprehensive testing scenarios including:
- Form validation testing
- API simulation testing
- Mobile responsiveness
- Accessibility testing
- Error handling scenarios

### Test Coverage
- ✅ Form validation (all fields)
- ✅ API integration (success/error paths)
- ✅ Responsive design (mobile/desktop)
- ✅ Accessibility (keyboard/screen reader)
- ✅ Error handling (network failures)

## 🚀 Deployment

### Build for Production
```bash
npm run build 
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 Commit History

### Branch: `feature/lead-module-frontend`

1. **e60ed7a** - chore: setup lead module branch and run baseline
2. **306268c** - feat: create LeadsPage with glassmorphism layout and tab navigation
3. **227d5f3** - feat: create component scaffolding - LeadForm, LeadList, EmptyState, Toast, and mock API utils
4. **fa29c40** - feat: integrate mock API with localStorage persistence and enhance glassmorphism styling
5. **8c075c6** - feat: add UX polish with animations, loading skeletons, and enhanced micro-interactions

### Final Commit
```bash
git log --oneline -5
```

## 🎯 Future Enhancements

- Real backend API integration
- User authentication and authorization
- Lead import/export functionality
- Advanced filtering and search
- Lead analytics and reporting
- Email integration
- Lead assignment and team management

## 📄 License

This project is part of a frontend development assessment and is for demonstration purposes.

---

**Built with ❤️ using React, Tailwind CSS, and modern web development practices.**