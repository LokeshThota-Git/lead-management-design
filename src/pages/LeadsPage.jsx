import { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import { FaPlus, FaList } from 'react-icons/fa';

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('form');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load leads from localStorage on component mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  // Save leads to localStorage whenever leads state changes
  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const handleLeadAdded = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleLeadUpdated = (updatedLead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
  };

  const handleLeadDeleted = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
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
            {activeTab === 'form' ? (
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
