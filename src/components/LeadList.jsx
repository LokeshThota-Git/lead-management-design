import { useState, useMemo } from 'react';
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaCheckCircle, FaTrash, FaExpand, FaCompress } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { updateLead, deleteLead } from '../utils/api';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';

/**
 * LeadList Component
 * 
 * Props:
 * - leads: array - Array of lead objects
 * - onLeadUpdated: function - Callback when a lead is updated
 * - onLeadDeleted: function - Callback when a lead is deleted
 * - loading: boolean - Loading state
 * 
 * Features:
 * - Search functionality
 * - Sorting by name, email, or date
 * - Responsive table/card layout
 * - Expandable message view
 * - Status management
 */
export default function LeadList({ leads, onLeadUpdated, onLeadDeleted, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [leads, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleExpanded = (leadId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    setExpandedRows(newExpanded);
  };

  const handleStatusUpdate = async (leadId) => {
    try {
      const current = leads.find(l => l.id === leadId);
      const nextStatus = current?.status === 'Contacted' ? 'New' : 'Contacted';
      const response = await updateLead(leadId, { status: nextStatus });
      
      if (response.success) {
        onLeadUpdated(response.data);
        toast.success(`Status set to ${nextStatus}`);
      } else {
        throw new Error(response.message || 'Failed to update lead status');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await deleteLead(leadId);
        
        if (response.success) {
          onLeadDeleted(leadId);
          toast.success(response.message);
        } else {
          throw new Error(response.message || 'Failed to delete lead');
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  if (loading) {
    return <LoadingSkeleton type="table" count={5} />;
  }

  if (leads.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/6 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus-ring transition-all duration-200"
          />
        </div>
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-2">
                    Email {getSortIcon('email')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Date {getSortIcon('createdAt')}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredAndSortedLeads.map((lead, index) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-all duration-200 hover:scale-[1.01]" style={{ animationDelay: `${index * 0.1}s` }}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-xs">
                      {lead.message ? (
                        <div>
                          <p className="truncate">
                            {lead.message.length > 50 
                              ? `${lead.message.substring(0, 50)}...` 
                              : lead.message
                            }
                          </p>
                          {lead.message.length > 50 && (
                            <button
                              onClick={() => toggleExpanded(lead.id)}
                              className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center gap-1"
                            >
                              {expandedRows.has(lead.id) ? (
                                <>
                                  <FaCompress size={10} />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <FaExpand size={10} />
                                  Show More
                                </>
                              )}
                            </button>
                          )}
                          {expandedRows.has(lead.id) && (
                            <div className="mt-2 p-2 bg-white/10 rounded text-xs">
                              {lead.message}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No message</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'New'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStatusUpdate(lead.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          lead.status === 'New'
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-blue-600 hover:bg-blue-100'
                        }`}
                        title={lead.status === 'New' ? 'Mark as Contacted' : 'Mark as New'}
                      >
                        <FaCheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Lead"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredAndSortedLeads.map((lead, index) => (
          <div key={lead.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.email}</p>
                <p className="text-sm text-gray-600">{lead.phone}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                lead.status === 'New'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {lead.status}
              </span>
            </div>

            {lead.message && (
              <div className="mb-3">
                <p className="text-sm text-gray-700">
                  {expandedRows.has(lead.id) ? lead.message : 
                   lead.message.length > 100 ? `${lead.message.substring(0, 100)}...` : lead.message}
                </p>
                {lead.message.length > 100 && (
                  <button
                    onClick={() => toggleExpanded(lead.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center gap-1"
                  >
                    {expandedRows.has(lead.id) ? (
                      <>
                        <FaCompress size={10} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FaExpand size={10} />
                        Show More
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
              <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(lead.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  lead.status === 'New'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <FaCheckCircle className="inline mr-1" />
                {lead.status === 'New' ? 'Mark Contacted' : 'Mark New'}
              </button>
              <button
                onClick={() => handleDelete(lead.id)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <FaTrash className="inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
