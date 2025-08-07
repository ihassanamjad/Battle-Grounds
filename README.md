# Fallon Insurance Agency - Battle Grounds 🏆

A fully custom, self-hosted sales contest platform that replicates and surpasses the functionality of tools like SalesScreen, Spinify, and Ambition. Built with modern web technologies and designed for maximum engagement and performance tracking.

## 🎯 Core Features

### 🏆 Contest Management
- **Create & Edit Contests**: Set goals, dates, participants, and themes
- **12 Gamified Themes**: Football field, rocket to moon, sailboat race, and more
- **Prize Management**: Milestone and final prizes with automatic unlocking
- **Duplicate Past Contests**: Easy contest replication for recurring events

### 📊 Real-Time Leaderboard
- **Sortable Rankings**: By premium, deals, or goal percentage
- **Badge System**: 25K Club, 30K Qualifier, Goal Achiever badges
- **Progress Indicators**: Visual pace tracking with color coding
- **Confetti Celebrations**: Animated celebrations for milestones

### ⚔️ Head-to-Head Battles
- **Agent Showdowns**: Side-by-side animated battles
- **Progress Bars**: Real-time battle progress visualization
- **Battle Taglines**: Dynamic messaging based on competition intensity
- **Winner Highlights**: Glow effects and confetti for victors

### 📝 Deal Submission
- **Mobile-Friendly Form**: Responsive design for all devices
- **Multi-Line Support**: Auto, Home, Life, Commercial, and more
- **Real-Time Updates**: Instant leaderboard updates
- **Admin Approval**: Pending/approved/rejected status management

### 📺 TV Display Mode
- **Full-Screen Display**: Perfect for office TVs and monitors
- **Auto-Rotating Views**: Leaderboard, battles, countdown, live feed
- **Animated Transitions**: Smooth view transitions every 10 seconds
- **Public Access**: No login required for display mode

### 🛠️ Admin Control Panel
- **Contest Management**: Create, edit, duplicate contests
- **Agent Management**: Add, edit, deactivate agents
- **Deal Approval**: Review and approve submitted deals
- **Data Export**: CSV exports for deals, leaderboard, and agents
- **Analytics Dashboard**: Key metrics and performance insights

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **State Management**: Zustand for global state
- **Notifications**: React Hot Toast for user feedback
- **Confetti**: Canvas Confetti for celebrations
- **Icons**: Lucide React for consistent iconography

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Battle-Grounds
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
   Navigate to `http://localhost:3000`

## 🎮 Usage

### For Agents
1. **Submit Deals**: Navigate to "Deal Submission" to log new sales
2. **View Leaderboard**: Check your ranking and progress
3. **Track Battles**: Monitor head-to-head competitions
4. **Celebrate Wins**: Watch confetti animations for milestones

### For Administrators
1. **Manage Contests**: Create and configure sales contests
2. **Approve Deals**: Review and approve submitted deals
3. **Monitor Performance**: Use analytics dashboard for insights
4. **Export Data**: Download reports for external analysis

### For TV Displays
1. **TV Mode**: Navigate to `/tv` for full-screen display
2. **Auto-Rotation**: Views automatically rotate every 10 seconds
3. **Public Access**: No authentication required for display mode

## 🎨 Contest Themes

The platform includes 12 unique gamified themes:

1. **🏈 Drive to 500K** - Football field progression
2. **🚀 Rocket to the Moon** - Fuel gauge and boosters
3. **⛵ Sail to Success** - Regatta race with wind gusts
4. **🎈 Rise Above** - Hot air balloon altitude
5. **🏝️ Flight Path** - Jet from NYC to LA
6. **🏙️ Empire State Build** - Skyscraper construction
7. **⚙️ Machine of Momentum** - Steampunk factory
8. **🗺️ Sales Territory Domination** - Map conquest
9. **⛰️ Climb the Summit** - Everest expedition
10. **🚒 Thrill Ride** - Theme park roller coaster
11. **🐊 Slay the Dragon** - Boss fight mechanics
12. **🎺 Battle of the Bands** - Song building progression

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_APP_NAME="Fallon Insurance Agency Battle Grounds"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Customization
- **Colors**: Modify `tailwind.config.js` for brand colors
- **Themes**: Add new contest themes in `types/index.ts`
- **Badges**: Customize badge logic in `store/index.ts`

## 📊 Data Structure

### Core Entities
- **Agents**: Sales representatives with profiles and ratings
- **Contests**: Sales competitions with goals and themes
- **Deals**: Individual sales with premium amounts and lines of business
- **Battles**: Head-to-head competitions between agents
- **Prizes**: Milestone and final rewards for achievements

### State Management
The application uses Zustand for global state management with:
- Real-time data updates
- Computed leaderboard rankings
- Badge and milestone tracking
- Notification management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Configure environment variables

### Self-Hosted
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx recommended)

## 🔌 Integrations

### Zapier (Planned)
- **Inbound**: Accept data from GoHighLevel, AgencyZoom
- **Outbound**: Push alerts to Slack, SMS, Google Sheets

### Slack (Planned)
- Deal submission notifications
- Milestone celebrations
- Battle result announcements

## 🎯 Future Enhancements

- **Real-time WebSocket**: Live updates across all clients
- **Mobile App**: React Native companion app
- **Advanced Analytics**: Detailed performance insights
- **API Integration**: CRM and accounting system connections
- **Multi-tenant**: Support for multiple agencies
- **Advanced Gamification**: More themes and mechanics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for Fallon Insurance Agency.

## 🆘 Support

For technical support or feature requests, contact the development team.

---

**Built with ❤️ for Fallon Insurance Agency**