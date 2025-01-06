import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load game components
const ReactionTime = React.lazy(() => import('./pages/ReactionTime'));
const VisualMemory = React.lazy(() => import('./pages/VisualMemory'));
const NumberMemory = React.lazy(() => import('./pages/NumberMemory'));
const WordMemory = React.lazy(() => import('./pages/WordMemory'));
const TypingSpeed = React.lazy(() => import('./pages/TypingSpeed'));
const ChimpTest = React.lazy(() => import('./pages/ChimpTest'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const GameStats = React.lazy(() => import('./pages/GameStats'));
const Auth = React.lazy(() => import('./pages/Auth'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Auth route outside of Layout */}
          <Route path="auth" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Auth />
            </Suspense>
          } />
          
          {/* All other routes use the main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="reaction-time" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ReactionTime />
              </Suspense>
            } />
            <Route path="visual-memory" element={
              <Suspense fallback={<LoadingSpinner />}>
                <VisualMemory />
              </Suspense>
            } />
            <Route path="number-memory" element={
              <Suspense fallback={<LoadingSpinner />}>
                <NumberMemory />
              </Suspense>
            } />
            <Route path="word-memory" element={
              <Suspense fallback={<LoadingSpinner />}>
                <WordMemory />
              </Suspense>
            } />
            <Route path="typing-speed" element={
              <Suspense fallback={<LoadingSpinner />}>
                <TypingSpeed />
              </Suspense>
            } />
            <Route path="chimp-test" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ChimpTest />
              </Suspense>
            } />
            <Route path="dashboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="stats/:gameId" element={
              <Suspense fallback={<LoadingSpinner />}>
                <GameStats />
              </Suspense>
            } />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;