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
      showNotification('You need to login first!', 'info');
      navigate('/auth');
      return;
    }

    try {
      setSaving(true);
      await saveScore(gameId, score);
      setSaved(true);
      showNotification('Saved!', 'success');
    } catch (error: any) {
      console.error('❌ Error:', error);
      if (error.response?.status === 401) {
        showNotification('Login session has expired. Please log in again.', 'error');
        navigate('/auth');
      } else {
        showNotification('Points cannot be saved. Please try again.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <button disabled className={`py-3 bg-green-600 text-white rounded-xl ${className}`}>
        Saved ✓
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
      <span>{saving ? 'Saving...' : 'Save'}</span>
    </button>
  );
}
