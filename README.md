# Human Benchmark Clone

A cognitive testing application built with React that helps users measure and improve their cognitive abilities through various interactive games and challenges.

## 🎮 Features

### Games
- **Reaction Time**: Test your response speed
- **Visual Memory**: Remember and recreate patterns
- **Number Memory**: Recall increasingly long number sequences
- **Word Memory**: Remember if you've seen words before
- **Typing Speed**: Measure your typing speed and accuracy
- **Chimp Test**: Challenge your memory like a chimpanzee

### User Features
- Account creation and authentication
- Score tracking and history
- Personal best records
- Performance analytics with beautiful charts
- Cross-device progress syncing

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Mysql, NodeJs
- **Build Tool**: Vite
- **Deployment**: Vercel (Frontend), Railway (Backend & Database)

## 🏗️ Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── charts/       # Data visualization components
│   └── games/        # Game-specific components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── services/         # API and external service integrations
├── styles/          # Global styles and CSS modules
├── types/           # TypeScript type definitions
└── utils/           # Helper functions and utilities
```

## 🎯 Games Description

### Reaction Time Test
Measures how quickly you can respond to a visual stimulus. Click when the color changes from red to green.

### Visual Memory Test
Tests your visual memory by asking you to remember and reproduce patterns of increasing complexity.

### Number Memory Test
Challenges your numerical memory by showing you increasingly longer numbers that you must recall.

### Word Memory Test
Tests your verbal memory by asking you to identify whether words have appeared before in a sequence.

### Typing Speed Test
Measures your typing speed and accuracy with random text passages.

### Chimp Test
Inspired by famous chimpanzee memory tests, challenges you to remember the positions of numbers in a grid.

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/1406khoa/Humanbenchmark-Clone.git
   cd Humanbenchmark-Clone
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) (Unique, required)
- `password_hash`: VARCHAR(255) (Hashed password)
- `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
### Scores Table
- `id`: UUID (Primary Key)
- `user_id`: (UUID (Foreign Key to users.id))
- `game_id`: VARCHAR(255)
- `score`: INTEGER
- `create_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## 🔐 Security Features

- JWT authentication for secure login
- Password hashing with bcrypt
- Protected API endpoints
- User data isolation

## 🎨 UI/UX Features

- Responsive design
- Interactive animations
- Real-time feedback
- Progress indicators
- Performance analytics
- Clean and modern interface

## 📱 Performance Optimizations

- Code splitting
- Lazy loading
- Memoization
- Debounced inputs
- Optimized assets
- Efficient state management

## 🧪 Game Algorithms

Each game implements specific algorithms for:
- Score calculation
- Difficulty progression
- Performance metrics
- Statistical analysis
## 🌍 Deployment
- Frontend: Deployed on Vercel, with automatic updates from GitHub.
- Backend: Hosted on Railway, connected to MySQL for storing scores and user data.
- Database: MySQL database deployed on Railway with secured access.
- Environment Management: Configured .env files on Vercel and Railway to store sensitive credentials securely.

## 📈 Future Improvements

- Additional cognitive games
- Social features and leaderboards
- More detailed analytics
- Mobile app version
- Offline support
- Accessibility improvements





