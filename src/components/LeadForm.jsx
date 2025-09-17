import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaRegCommentDots, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postLead } from '../utils/api';

/**
 * LeadForm Component
 * 
 * Props:
 * - onLeadAdded: function - Callback when a lead is successfully added
 * 
 * Features:
 * - Form validation with inline error messages
 * - Loading state during submission
 * - Success/error toast notifications
 * - Glassmorphism styling
 */
export default function LeadForm({ onLeadAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
        }
      case 'phone':
        {
          const phoneRegex = /^\d{7,15}$/;
          return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Phone must be 7-15 digits' : '';
        }
      case 'message':
        return value.length > 500 ? 'Message must be 500 characters or less' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await postLead(formData);
      
      if (response.success) {
        onLeadAdded(response.data);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        toast.success(response.message);
      } else {
        throw new Error(response.message || 'Failed to add lead');
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Lead</h2>
        <p className="text-gray-600">Capture potential customer information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaUser className="inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/6 backdrop-blur-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-105 focus-ring ${
              errors.name ? 'border-red-300' : 'border-white/10'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaEnvelope className="inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/6 backdrop-blur-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-105 focus-ring ${
              errors.email ? 'border-red-300' : 'border-white/10'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaPhone className="inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/6 backdrop-blur-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-105 focus-ring ${
              errors.phone ? 'border-red-300' : 'border-white/10'
            }`}
            placeholder="Enter phone number (7-15 digits)"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaRegCommentDots className="inline mr-2" />
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className={`w-full px-4 py-3 bg-white/6 backdrop-blur-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-105 focus-ring resize-none ${
              errors.message ? 'border-red-300' : 'border-white/10'
            }`}
            placeholder="Enter any additional message or notes"
          />
          <div className="flex justify-between mt-1">
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.message.length}/500
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="inline mr-2 animate-spin" />
              Adding Lead...
            </>
          ) : (
            'Add Lead'
          )}
        </button>
      </form>
    </div>
  );
}
