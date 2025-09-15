import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

/**
 * Toast Component
 * 
 * Props:
 * - type: 'success' | 'error' | 'info' - Type of toast
 * - message: string - Message to display
 * - isVisible: boolean - Whether toast is visible
 * - onClose: function - Callback when toast is closed
 * - duration: number - Auto-close duration in ms (default: 3000)
 * 
 * Features:
 * - Auto-close functionality
 * - Manual close button
 * - Different styles for different types
 * - Smooth animations
 */
export default function Toast({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-green-400';
      case 'error':
        return 'bg-red-500 text-white border-red-400';
      case 'info':
      default:
        return 'bg-blue-500 text-white border-blue-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-xl" />;
      case 'error':
        return <FaExclamationCircle className="text-xl" />;
      case 'info':
      default:
        return <FaInfoCircle className="text-xl" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${getToastStyles()} backdrop-blur-sm border rounded-2xl shadow-2xl p-4 min-w-80 max-w-md`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
