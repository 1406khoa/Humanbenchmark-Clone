import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { saveScore } from '../services/scoreService';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface SaveScoreButtonProps {
  gameId: string;
  score: number;
  className?: string;
}

export function SaveScoreButton({ gameId, score, className = '' }: SaveScoreButtonProps) {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user) {
      showNotification('Please sign in to save your score', 'info');
      navigate('/auth');
      return;
    }

    try {
      setSaving(true);
      await saveScore(gameId, score);
      setSaved(true);
      showNotification('Score saved successfully!', 'success');
    } catch (error: any) {
      console.error('Failed to save score:', error);
      if (error.message.includes('JWT')) {
        showNotification('Session expired. Please sign in again.', 'error');
        navigate('/auth');
      } else {
        showNotification('Failed to save score. Please try again.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <button 
        disabled 
        className={`py-3 bg-green-600 text-white rounded-xl ${className}`}
      >
        Score Saved ✓
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className={`py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Save className="w-5 h-5" />
      <span>{saving ? 'Saving...' : 'Save Score'}</span>
    </button>
  );
}