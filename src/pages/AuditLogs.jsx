import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, FileText, Calendar, User, Activity,
  ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/DashboardLayout'

const AuditLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedLog, setExpandedLog] = useState(null)
  const { doctor } = useAuth()

  useEffect(() => {
    fetchAuditLogs()
  }, [doctor])

  const fetchAuditLogs = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('audit_logs')
        .select(`
          *,
          doctors (first_name, last_name, email),
          labs (*),
          risk_classification (risk_class)
        `)
        .eq('doctor_id', doctor.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setLogs(data || [])
    } catch (err) {
      console.error('Error fetching audit logs:', err)
      setError('Failed to load audit logs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRiskBadge = (riskClass) => {
    const risk = riskClass?.toLowerCase() || ''
    if (risk.includes('no dr')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          No DR
        </span>
      )
    }
    if (risk.includes('mild')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
          Mild DR
        </span>
      )
    }
    if (risk.includes('severe')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
          Severe DR
        </span>
      )
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
        Pending
      </span>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredLogs = logs.filter(log => {
    const searchLower = searchTerm.toLowerCase()
    const doctorName = `${log.doctors?.first_name || ''} ${log.doctors?.last_name || ''}`.toLowerCase()
    const riskClass = (log.risk_class || '').toLowerCase()
    const labId = (log.lab_id || '').toLowerCase()
    const auditId = (log.id || '').toLowerCase()
    
    return (
      doctorName.includes(searchLower) ||
      riskClass.includes(searchLower) ||
      labId.includes(searchLower) ||
      auditId.includes(searchLower)
    )
  })

  const labFields = [
    { key: 'age', label: 'Age', unit: 'years' },
    { key: 'sex', label: 'Sex', format: (v) => v === 1 ? 'Male' : v === 2 ? 'Female' : 'N/A' },
    { key: 'duration', label: 'Duration', unit: 'years' },
    { key: 'sbp', label: 'SBP', unit: 'mmHg' },
    { key: 'dbp', label: 'DBP', unit: 'mmHg' },
    { key: 'hbp', label: 'HBP', format: (v) => v === 1 ? 'No' : v === 2 ? 'Yes' : 'N/A' },
    { key: 'hba1c', label: 'HbA1c', unit: '%' },
    { key: 'ldl', label: 'LDL', unit: 'mg/dL' },
    { key: 'hdl', label: 'HDL', unit: 'mg/dL' },
    { key: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL' },
    { key: 'triglycerides', label: 'Triglycerides', unit: 'mg/dL' },
    { key: 'urea', label: 'Urea', unit: 'mg/dL' },
    { key: 'bun', label: 'BUN', unit: 'mg/dL' },
    { key: 'uric', label: 'Uric Acid', unit: 'mg/dL' },
    { key: 'egfr', label: 'eGFR', unit: 'mL/min' },
    { key: 'ucr', label: 'UCR' },
    { key: 'alt', label: 'ALT', unit: 'U/L' },
    { key: 'ast', label: 'AST', unit: 'U/L' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
            <p className="text-gray-400 mt-1">Review all patient assessment records</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-dark-lighter rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto text-gray-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">No audit logs found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Complete an assessment to see logs here'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Log Header */}
                <div
                  className="p-4 md:p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start md:items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/20">
                        <FileText className="text-primary" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-white">
                            Audit #{log.id.slice(0, 8)}...
                          </h3>
                          {getRiskBadge(log.risk_class)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(log.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            Dr. {log.doctors?.first_name} {log.doctors?.last_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity size={14} />
                            Lab: {log.lab_id?.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedLog === log.id ? (
                        <ChevronUp className="text-gray-400" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedLog === log.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-4 md:p-6 bg-dark-lighter/50">
                      <h4 className="text-sm font-semibold text-gray-300 mb-4">Lab Values</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {labFields.map(field => {
                          const value = log.labs?.[field.key]
                          const displayValue = field.format 
                            ? field.format(value)
                            : value !== null && value !== undefined 
                              ? `${value}${field.unit ? ' ' + field.unit : ''}`
                              : 'N/A'
                          return (
                            <div key={field.key} className="bg-dark/50 rounded-lg p-3">
                              <p className="text-xs text-gray-500">{field.label}</p>
                              <p className="text-sm font-medium text-white mt-1">{displayValue}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredLogs.length > 0 && (
          <p className="text-sm text-gray-400 text-center">
            Showing {filteredLogs.length} of {logs.length} audit logs
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AuditLogs
