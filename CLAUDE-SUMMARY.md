# SportiveAI - Summary & Current State

## 🎯 Current Status
**Multi-dashboard sports nutrition app** with AI-powered supplement recommendations for young athletes (6-18 years). Built for investor demo with complete onboarding flow and real protocol database integration.

### ✅ Completed (100% Functional)
- **Onboarding Flow** (6 steps) - Complete with 58,320 real protocols via SQLite
- **Parent Dashboard** - Purchase flow, child monitoring, health tracking
- **Academy Dashboard** - B2B multi-athlete management, billing, analytics
- **Admin Dashboard** - Platform management, user oversight, system metrics
- **Authentication System** - Persistent sessions, login/logout, user switching
- **Navigation Flow** - Protected routes, auto-redirect, user menu
- **SQLite Integration** - Real protocol matching algorithm (16 columns)
- **Electron App** - Secure IPC communication, production-ready

### 🔥 Next Priority
1. **UI/UX Optimization** - Loading states, animations, error handling
2. **TypeScript Configuration** - Add tsconfig.json for explicit TS setup
3. **Testing Framework** - Unit tests and e2e validation

## 🏗️ Architecture
- **Tech Stack**: React 19.1.0 + TypeScript 4.9.5 + Electron 36.4.0
- **Styling**: Tailwind CSS + Glassmorphism design
- **Database**: SQLite (58,320 protocols) + better-sqlite3
- **Routing**: React Router DOM 7.6.2
- **State**: React Context (OnboardingContext + AuthContext)
- **Authentication**: Session persistence, protected routes, user switching

## 📁 Key Files Structure
```
src/
├── App.tsx                                 # Main routing
├── pages/onboarding/                       # 6-step flow ✅
├── pages/dashboard/
│   ├── ParentDashboard.tsx                 # B2C dashboard ✅
│   ├── AcademyDashboard.tsx                # B2B dashboard ✅
│   ├── AdminDashboard.tsx                  # Platform management ✅
│   └── components/                         # Reusable cards ✅
├── database/
│   ├── protocols.db                        # 58k protocols ✅
│   ├── protocolService.js                  # SQLite service ✅
│   └── import-csv.js                       # CSV importer ✅
├── types/onboarding.ts + academy.ts + admin.ts + auth.ts  # TypeScript types ✅
├── context/AuthContext.tsx                     # Authentication state ✅
├── components/
│   ├── LoginPage.tsx                           # Login with user type selection ✅
│   ├── ProtectedRoute.tsx                      # Route protection ✅
│   └── UserMenu.tsx                            # User dropdown (Portal-based) ✅
├── hooks/useAuthRedirect.ts                    # Auto-redirect logic ✅
└── data/mockAcademyData.ts + mockAdminData.ts + mockAuthData.ts  # Mock data ✅
```

## 🚀 Commands
- `npm run electron-dev` - Start dev environment
- `npm run build` - Production build
- `npx @electron/rebuild` - Fix native modules
- `node src/database/import-csv.js` - Import CSV to SQLite

## 🎨 Design System
- **Primary Color**: #3AAA35 (SportiveAI green)
- **Parent Theme**: Green variants for B2C (parents)
- **Academy Theme**: Blue variants for B2B (institutions)
- **Admin Theme**: Red/orange variants for platform management
- **Glassmorphism**: backdrop-blur-md + bg-white/40 pattern
- **Responsive**: Mobile-first with Tailwind breakpoints

## 📊 Current Routes
- `/` - Landing page
- `/login` - Authentication page (user type selection + demo accounts)
- `/onboarding` - 6-step athlete profiling
- `/dashboard` - Parent dashboard (B2C) [Protected: parent only]
- `/academy` - Academy dashboard (B2B) [Protected: academy only]
- `/admin` - Admin dashboard (Platform management) [Protected: admin only]

## 🔗 Context & State
- **OnboardingContext**: Complete athlete profile data
- **AuthContext**: Session management, user state, login/logout
- **Mock Data**: Parent (child monitoring) + Academy (247 athletes) + Admin (1,847 users)
- **Real Data**: 58,320 supplement protocols with exact matching
- **Demo Accounts**: 8 users (3 parents, 3 academies, 2 admins) with quick access

## ⚡ Performance Notes
- SQLite queries optimized with indexes
- Component-level state management
- Lazy loading for dashboard sections
- Glassmorphism with backdrop-blur performance
- Portal-based dropdowns for z-index management
- Session persistence with localStorage (24h expiry)

## 🐛 Known Issues
- TypeScript warnings on unused imports (minor)
- Mock data only (no real backend API)
- OAuth buttons UI-only (no real Google/Apple integration)

## 💡 Development Notes
- Always test with `npm run electron-dev`
- Use existing glassmorphism patterns for consistency
- Follow color themes: Parent (green) vs Academy (blue) vs Admin (red/orange)
- Maintain mock data structure for demo purposes
- Test login: Parent (`sarah.johnson@email.com` / `Parent123!`)
- Protected routes auto-redirect based on user type
- Portal-based components for z-index issues
- Update this summary after major changes

## 🔐 Demo Credentials
- **Parent**: `sarah.johnson@email.com` / `Parent123!` → `/dashboard`
- **Academy**: `admin@elitesportsacademy.com` / `Academy123!` → `/academy`  
- **Admin**: `admin@sportiveai.com` / `Admin123!` → `/admin`

---
*This condensed summary replaces the full CLAUDE.md for efficient context management in new conversations.*