import { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md animate-fade-in px-4">
      <div className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
        type === 'success' ? 'bg-green-100' : 'bg-red-100'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 shrink-0 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 shrink-0 text-red-600" />
        )}
        <span className={`${type === 'success' ? 'text-green-800' : 'text-red-800'} text-sm`}>
          {message}
        </span>
      </div>
    </div>
  );
}