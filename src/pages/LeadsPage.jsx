import { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import { FaPlus, FaList } from 'react-icons/fa';
import { fetchLeads } from '../utils/api';
import { toast } from 'react-toastify';

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('form');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load leads from API on component mount
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchLeads();
      if (response.success) {
        setLeads(response.data.leads);
      } else {
        throw new Error('Failed to load leads');
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to load leads: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadAdded = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
    // Switch to list view to show the new lead
    setActiveTab('list');
  };

  const handleLeadUpdated = (updatedLead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
  };

  const handleLeadDeleted = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  const handleRetry = () => {
    loadLeads();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Lead Management
          </h1>
          <p className="text-gray-600 text-lg">
            Capture and manage your leads with style
          </p>
        </div>

        {/* Main glassmorphism container */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === 'form'
                    ? 'bg-white/30 text-blue-700 shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                <FaPlus size={16} />
                Add Lead
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === 'list'
                    ? 'bg-white/30 text-blue-700 shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                <FaList size={16} />
                View Leads ({leads.length})
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[600px]">
            {error ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
                  <div className="text-red-600 text-4xl mb-4">⚠️</div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Failed to Load Leads
                  </h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : activeTab === 'form' ? (
              <LeadForm onLeadAdded={handleLeadAdded} />
            ) : (
              <LeadList 
                leads={leads}
                onLeadUpdated={handleLeadUpdated}
                onLeadDeleted={handleLeadDeleted}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
