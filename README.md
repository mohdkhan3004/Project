# CitySolve - Community Issue Reporting Platform

A modern, responsive web application for reporting and tracking local community issues like potholes, garbage problems, street light outages, and more.

## Features

### 🏠 User Portal
- **Issue Reporting**: Submit complaints with location mapping, image upload, and priority levels
- **Real-time Tracking**: Track complaint status with unique reference numbers
- **Browse Issues**: View all community complaints with filtering and search
- **Interactive Maps**: Precise location selection using Leaflet maps
- **AI-Powered Descriptions**: Automatic complaint description generation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🏛️ Admin Dashboard
- **Complaint Management**: View, filter, and manage all submitted complaints
- **Real-time Statistics**: Live dashboard with complaint metrics
- **Status Updates**: Track complaint progress through different stages
- **Advanced Filtering**: Search and filter by status, type, location, and more
- **Detailed Views**: Comprehensive complaint information with evidence

### 🗄️ Database Integration
- **Supabase Backend**: Robust PostgreSQL database with real-time capabilities
- **Data Persistence**: All complaints stored securely in the cloud
- **Multi-device Sync**: Access data from any device with automatic synchronization
- **Real-time Updates**: Live updates across all connected clients
- **Scalable Architecture**: Built to handle growing user bases

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom animations
- **Maps**: Leaflet + React Leaflet
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **State Management**: React Hooks + Custom Services
- **Real-time**: Supabase Realtime subscriptions

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citysolve
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the migration files in order:
     - `supabase/migrations/create_complaints_table.sql`
     - `supabase/migrations/create_admin_users_table.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - User Portal: `http://localhost:5173`
   - Admin Dashboard: `http://localhost:5173/admin`

### Admin Access
- **Email**: `citysolve1122@gmail.com`
- **Password**: `1122`

## Database Schema

### Complaints Table
- Stores all complaint information including location, images, and status
- Supports real-time updates and filtering
- Includes audit trails with created/updated timestamps

### Admin Users Table
- Manages admin authentication and roles
- Supports multiple admin levels and permissions

## Key Features Explained

### Real-time Synchronization
The application uses Supabase's real-time capabilities to ensure all users see the latest data without manual refreshes. This includes:
- New complaint submissions appear instantly
- Status updates reflect immediately
- Statistics update in real-time

### Multi-device Support
- **Responsive Design**: Optimized for all screen sizes
- **Cloud Storage**: All data stored in Supabase cloud
- **Cross-platform**: Works on any device with a web browser
- **Offline Resilience**: Graceful handling of network issues

### Advanced Mapping
- **Interactive Maps**: Click to select precise locations
- **Geolocation**: Automatic user location detection
- **Visual Markers**: Clear indication of selected locations
- **Address Resolution**: Convert coordinates to readable addresses

### Image Management
- **Drag & Drop Upload**: Easy image uploading interface
- **AI Integration**: Automatic description generation based on images
- **Secure Storage**: Images stored as base64 data URLs
- **Responsive Display**: Images adapt to different screen sizes

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify, Vercel, or similar
The application is a static site that can be deployed to any static hosting service. Make sure to:
1. Set environment variables in your hosting platform
2. Configure build settings to use `npm run build`
3. Set the publish directory to `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.

---

**CitySolve** - Building stronger communities through technology and citizen engagement.