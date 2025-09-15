import { FaInbox, FaPlus } from 'react-icons/fa';

/**
 * EmptyState Component
 * 
 * Props: None
 * 
 * Features:
 * - Displays when no leads are present
 * - Encourages user to add their first lead
 * - Glassmorphism styling consistent with theme
 */
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <FaInbox className="text-4xl text-blue-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Leads Yet
        </h3>
        
        <p className="text-gray-600 mb-8 max-w-md">
          Start building your lead database by adding your first potential customer. 
          Every great business relationship begins with a single lead.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Capture contact information</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Track communication history</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Manage follow-ups</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
          <div className="flex items-center justify-center gap-2 text-blue-700 font-medium">
            <FaPlus size={16} />
            <span>Switch to "Add Lead" tab to get started</span>
          </div>
        </div>
      </div>
    </div>
  );
}
