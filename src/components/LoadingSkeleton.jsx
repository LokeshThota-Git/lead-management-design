/**
 * LoadingSkeleton Component
 * 
 * Props:
 * - type: 'table' | 'card' - Type of skeleton to display
 * - count: number - Number of skeleton items to show
 * 
 * Features:
 * - Animated loading skeletons
 * - Matches the layout of actual content
 * - Glassmorphism styling
 */
export default function LoadingSkeleton({ type = 'table', count = 5 }) {
  if (type === 'table') {
    return (
      <div className="hidden lg:block bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Message</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {Array.from({ length: count }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-white/20 rounded-full w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-6 bg-white/20 rounded"></div>
                      <div className="h-6 w-6 bg-white/20 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Card skeleton
  return (
    <div className="lg:hidden space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="h-5 bg-white/20 rounded w-32 mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-48 mb-1"></div>
              <div className="h-4 bg-white/20 rounded w-24"></div>
            </div>
            <div className="h-6 bg-white/20 rounded-full w-16"></div>
          </div>
          <div className="mb-3">
            <div className="h-4 bg-white/20 rounded w-full mb-1"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
          <div className="h-3 bg-white/20 rounded w-20 mb-3"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-white/20 rounded"></div>
            <div className="flex-1 h-8 bg-white/20 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
