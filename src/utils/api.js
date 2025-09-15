/**
 * Mock API utilities for Lead Management
 * 
 * This file simulates API calls with realistic delays and occasional failures
 * to demonstrate proper loading states and error handling.
 */

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API failure (10% chance)
const shouldFail = () => Math.random() < 0.1;

/**
 * Simulates posting a new lead to the server
 * @param {Object} lead - Lead data to save
 * @returns {Promise<Object>} - Response with success status and data
 */
export const postLead = async (lead) => {
  await delay(1500); // Simulate network latency
  
  if (shouldFail()) {
    throw new Error('Network error. Please check your connection and try again.');
  }

  // Simulate server processing
  const response = {
    success: true,
    message: 'Lead created successfully',
    data: {
      id: Date.now().toString(),
      ...lead,
      status: 'New',
      createdAt: new Date().toISOString()
    }
  };
  // Persist to localStorage so subsequent update/delete operations can find it
  try {
    const savedLeadsRaw = localStorage.getItem('leads');
    const savedLeads = savedLeadsRaw ? JSON.parse(savedLeadsRaw) : [];
    const updatedLeads = [response.data, ...savedLeads];
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
  } catch (_) {
    // If localStorage is unavailable, we still return success so UI state updates
  }

  return response;
};

/**
 * Simulates fetching leads from the server
 * @param {Object} params - Query parameters (page, limit, search, etc.)
 * @returns {Promise<Object>} - Response with leads array and pagination info
 */
export const fetchLeads = async (params = {}) => {
  await delay(1000); // Simulate network latency
  
  if (shouldFail()) {
    throw new Error('Failed to fetch leads. Please try again.');
  }

  // Get leads from localStorage
  const savedLeads = localStorage.getItem('leads');
  let leads = savedLeads ? JSON.parse(savedLeads) : [];

  // Apply search filter if provided
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    leads = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting if provided
  if (params.sortBy) {
    leads.sort((a, b) => {
      let aValue = a[params.sortBy];
      let bValue = b[params.sortBy];

      if (params.sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }

      if (params.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLeads = leads.slice(startIndex, endIndex);

  const response = {
    success: true,
    data: {
      leads: paginatedLeads,
      total: leads.length,
      page,
      totalPages: Math.ceil(leads.length / limit),
      hasNextPage: endIndex < leads.length,
      hasPrevPage: page > 1
    }
  };

  return response;
};

/**
 * Simulates updating a lead's status
 * @param {string} leadId - ID of the lead to update
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} - Response with updated lead data
 */
export const updateLead = async (leadId, updates) => {
  await delay(800); // Simulate network latency
  
  if (shouldFail()) {
    throw new Error('Failed to update lead. Please try again.');
  }

  // Get leads from localStorage
  const savedLeads = localStorage.getItem('leads');
  let leads = savedLeads ? JSON.parse(savedLeads) : [];

  // Find and update the lead
  const leadIndex = leads.findIndex(lead => lead.id === leadId);
  if (leadIndex === -1) {
    throw new Error('Lead not found');
  }

  leads[leadIndex] = {
    ...leads[leadIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  // Save back to localStorage
  localStorage.setItem('leads', JSON.stringify(leads));

  const response = {
    success: true,
    message: 'Lead updated successfully',
    data: leads[leadIndex]
  };

  return response;
};

/**
 * Simulates deleting a lead
 * @param {string} leadId - ID of the lead to delete
 * @returns {Promise<Object>} - Response with success status
 */
export const deleteLead = async (leadId) => {
  await delay(600); // Simulate network latency
  
  if (shouldFail()) {
    throw new Error('Failed to delete lead. Please try again.');
  }

  // Get leads from localStorage
  const savedLeads = localStorage.getItem('leads');
  let leads = savedLeads ? JSON.parse(savedLeads) : [];

  // Remove the lead
  const initialLength = leads.length;
  leads = leads.filter(lead => lead.id !== leadId);

  if (leads.length === initialLength) {
    throw new Error('Lead not found');
  }

  // Save back to localStorage
  localStorage.setItem('leads', JSON.stringify(leads));

  const response = {
    success: true,
    message: 'Lead deleted successfully'
  };

  return response;
};

/**
 * Simulates bulk operations (for future use)
 * @param {Array} leadIds - Array of lead IDs
 * @param {string} operation - Operation to perform
 * @returns {Promise<Object>} - Response with operation results
 */
export const bulkOperation = async (leadIds, operation) => {
  await delay(2000); // Simulate longer processing time
  
  if (shouldFail()) {
    throw new Error(`Failed to perform ${operation}. Please try again.`);
  }

  const response = {
    success: true,
    message: `${operation} completed successfully`,
    data: {
      processedCount: leadIds.length,
      operation
    }
  };

  return response;
};
