import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

interface HealthCheck {
  status: string;
  timestamp: string;
  checks: {
    database: { status: string; details: any };
    tables: { status: string; details: any };
    content: { status: string; details: any };
    api: { status: string; details: any };
  };
}

interface Stats {
  users: { total: number; admins: number };
  projects: { total: number; featured: number; onHomepage: number };
  services: { total: number; onHomepage: number };
  blogPosts: { total: number; published: number };
  testimonials: { total: number; featured: number };
  partners: { total: number; featured: number };
  messages: { total: number; unread: number };
}

interface Issue {
  severity: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  fix: string;
}

export default function DebugDashboard() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'health' | 'stats' | 'issues' | 'schema'>('health');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      // Load health check
      const healthRes = await fetch('/api/debug/health');
      const healthData = await healthRes.json();
      setHealth(healthData);

      // Load stats
      const statsRes = await fetch('/api/debug/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Load issues
      const issuesRes = await fetch('/api/debug/issues');
      const issuesData = await issuesRes.json();
      setIssues(issuesData.issues || []);

      // Load schema
      const schemaRes = await fetch('/api/debug/schema');
      const schemaData = await schemaRes.json();
      setSchema(schemaData);
    } catch (error) {
      console.error('Error loading debug data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'unhealthy': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800 border-red-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading debug information...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Debug Dashboard</h1>
          <p className="text-gray-600">Comprehensive system diagnostics and health monitoring</p>
          <button
            onClick={loadDebugData}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Overall Status */}
        {health && (
          <div className={`mb-8 p-6 rounded-lg border-2 ${getStatusColor(health.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  System Status: {health.status.toUpperCase()}
                </h2>
                <p className="text-sm opacity-75">Last checked: {new Date(health.timestamp).toLocaleString()}</p>
              </div>
              <div className="text-4xl">
                {health.status === 'healthy' && '✅'}
                {health.status === 'warning' && '⚠️'}
                {health.status === 'unhealthy' && '❌'}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {['health', 'stats', 'issues', 'schema'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Health Tab */}
        {activeTab === 'health' && health && (
          <div className="space-y-6">
            {Object.entries(health.checks).map(([key, check]) => (
              <div key={key} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold capitalize">{key}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(check.status)}`}>
                    {check.status}
                  </span>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(check.details, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold capitalize mb-4 text-gray-900">{key}</h3>
                <div className="space-y-2">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">{subKey}:</span>
                      <span className="font-bold text-xl text-primary-600">{subValue as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Issues Tab */}
        {activeTab === 'issues' && (
          <div className="space-y-4">
            {issues.length === 0 ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">No Issues Found!</h3>
                <p className="text-green-600">Your application is running smoothly.</p>
              </div>
            ) : (
              issues.map((issue, index) => (
                <div key={index} className={`border-2 rounded-lg p-6 ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {issue.severity === 'error' && '❌'}
                        {issue.severity === 'warning' && '⚠️'}
                        {issue.severity === 'info' && 'ℹ️'}
                      </span>
                      <div>
                        <span className="font-semibold text-sm uppercase">{issue.category}</span>
                        <h4 className="font-bold text-lg">{issue.message}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pl-11">
                    <p className="text-sm"><strong>Fix:</strong> {issue.fix}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Schema Tab */}
        {activeTab === 'schema' && (
          <div className="space-y-6">
            {!schema || !schema.schema ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
                <span className="text-4xl mb-4 block">⚠️</span>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Schema Data Not Available</h3>
                <p className="text-yellow-600">Unable to load database schema information.</p>
                <button 
                  onClick={loadDebugData}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Database Schema Overview</h3>
                  <p className="text-gray-600 mb-4">Total Tables: <span className="font-bold text-primary-600">{schema.tables}</span></p>
                </div>
                
                {schema.schema && Object.entries(schema.schema).map(([tableName, tableInfo]: [string, any]) => (
                  <div key={tableName} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">{tableName}</h3>
                    <p className="text-sm text-gray-600 mb-4">Columns: {tableInfo.columnCount}</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nullable</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Default</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tableInfo.columns && tableInfo.columns.map((col: any, idx: number) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">{col.column_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{col.data_type}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{col.is_nullable}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{col.column_default || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
