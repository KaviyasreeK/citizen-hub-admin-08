# Government Member Management System

A secure web-based portal for managing government member data and records with role-based access control.

## 🚀 Features

- **User Authentication**: Role-based login system (User/Administrator)
- **Member Management**: Add, view, update, and search member records
- **Financial Tracking**: Complete financial details and payment status tracking
- **Update Requests**: Request-based member information updates with approval workflow
- **Search Functionality**: Search members by member number or site number
- **Responsive Design**: Modern, mobile-friendly interface
- **Role-Based Access**: Different permissions for users and administrators

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Build Tool**: Vite
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives
- **Notifications**: Toast notifications with Sonner

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (Shadcn/ui)
│   ├── LoginPage.tsx          # Authentication interface
│   ├── MemberDashboard.tsx    # Main dashboard with member table
│   ├── MemberDetails.tsx      # Detailed member view
│   ├── AddMemberModal.tsx     # Add new member form
│   ├── UpdateRequestModal.tsx # Request member updates
│   ├── FinancialDetailsModal.tsx # Financial information display
│   └── PendingRequestsModal.tsx  # Admin approval interface
├── pages/
│   ├── Index.tsx              # Main page with auth state
│   └── NotFound.tsx           # 404 error page
├── hooks/                     # Custom React hooks
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles & design tokens
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd government-member-management
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
   Navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 👥 Usage

### Login Credentials
The system uses mock authentication. Enter any username and password, then select your role:

- **User**: Can view and search members, request updates
- **Administrator**: All user permissions plus add members and approve requests

### Key Functionality

1. **Dashboard**: View all members in a searchable table
2. **Search**: Filter by member number or site number
3. **Member Details**: Click "Extra Info" to view complete member profile
4. **Add Member**: Administrators can add new members (button in top-right)
5. **Update Requests**: Users can request member information updates
6. **Financial Details**: View payment status and financial information
7. **Pending Requests**: Administrators can approve/reject update requests

## 🎨 Design System

The project uses a comprehensive design system with:

- **CSS Variables**: Semantic color tokens in `src/index.css`
- **Tailwind Config**: Custom theme configuration in `tailwind.config.ts`
- **Component Library**: Shadcn/ui components for consistent styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📝 Data Structure

### Member Object
```typescript
interface Member {
  memberNo: string;
  memberName: string;
  memberType: string;
  siteNo?: string;
  siteName?: string;
  // ... additional fields for personal and financial data
}
```

## 🔒 Security Features

- Role-based access control
- Input validation on forms
- Secure authentication flow (mock implementation)
- Protected routes and actions

## 🚀 Deployment

To deploy the application:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your web server or hosting platform

### Deployment Platforms
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is designed for government use and follows applicable security and compliance requirements.

## 🆘 Support

For technical support or questions about the system, please contact the development team or system administrator.

---

**Built with ❤️ for Government Operations**