import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, ClipboardList, Info, Activity, 
  TrendingUp, Calendar, Users
} from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/DashboardLayout'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const Dashboard = () => {
  const { doctor } = useAuth()
  const [stats, setStats] = useState({
    totalLabs: 0,
    todayLabs: 0,
    loading: true
  })
  const [monthlyData, setMonthlyData] = useState([])
  const [riskDistribution, setRiskDistribution] = useState({ nodr: 0, mild: 0, severe: 0 })

  useEffect(() => {
    if (doctor?.id) {
      fetchStats()
      fetchMonthlyData()
      fetchRiskDistribution()
    }
  }, [doctor])

  const fetchStats = async () => {
    try {
      // Get total labs count
      const { count: totalCount } = await supabase
        .from('labs')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', doctor.id)

      // Get today's labs count
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: todayCount } = await supabase
        .from('labs')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', doctor.id)
        .gte('created_at', today.toISOString())

      setStats({
        totalLabs: totalCount || 0,
        todayLabs: todayCount || 0,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  const fetchMonthlyData = async () => {
    try {
      const { data: labs } = await supabase
        .from('labs')
        .select('created_at')
        .eq('created_by', doctor.id)

      // Group by month
      const months = {}
      const now = new Date()
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = date.toLocaleString('default', { month: 'short', year: '2-digit' })
        months[key] = 0
      }

      labs?.forEach(lab => {
        const date = new Date(lab.created_at)
        const key = date.toLocaleString('default', { month: 'short', year: '2-digit' })
        if (months.hasOwnProperty(key)) {
          months[key]++
        }
      })

      setMonthlyData(Object.entries(months).map(([month, count]) => ({ month, count })))
    } catch (error) {
      console.error('Error fetching monthly data:', error)
    }
  }

  const fetchRiskDistribution = async () => {
    try {
      const { data } = await supabase
        .from('risk_classification')
        .select('risk_class, labs!inner(created_by)')
        .eq('labs.created_by', doctor.id)

      const distribution = { nodr: 0, mild: 0, severe: 0 }
      data?.forEach(item => {
        const riskClass = item.risk_class?.toLowerCase() || ''
        if (riskClass.includes('no dr') || riskClass === 'no dr') {
          distribution.nodr++
        } else if (riskClass.includes('mild')) {
          distribution.mild++
        } else if (riskClass.includes('severe')) {
          distribution.severe++
        }
      })

      setRiskDistribution(distribution)
    } catch (error) {
      console.error('Error fetching risk distribution:', error)
    }
  }

  const pieChartData = {
    labels: ['No DR', 'Mild DR', 'Severe DR'],
    datasets: [{
      data: [riskDistribution.nodr, riskDistribution.mild, riskDistribution.severe],
      backgroundColor: ['#4ade80', '#fbbf24', '#ef4444'],
      borderColor: ['#22c55e', '#f59e0b', '#dc2626'],
      borderWidth: 2
    }]
  }

  const barChartData = {
    labels: monthlyData.map(d => d.month),
    datasets: [{
      label: 'Assessments',
      data: monthlyData.map(d => d.count),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderColor: '#6366f1',
      borderWidth: 1,
      borderRadius: 4
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af' }
      }
    }
  }

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.05)' },
        beginAtZero: true
      }
    }
  }

  const quickActions = [
    { name: 'New Assessment', href: '/assessment', icon: FileText, color: 'from-primary to-secondary' },
    { name: 'Audit Logs', href: '/audit-logs', icon: ClipboardList, color: 'from-green-500 to-emerald-500' },
    { name: 'DR Information', href: '/dr-info', icon: Info, color: 'from-amber-500 to-orange-500' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-6 border border-primary/30"
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, Dr. {doctor?.first_name}!
          </h1>
          <p className="text-gray-400">
            Here's an overview of your diabetic retinopathy assessments.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Activity className="text-primary" size={24} />
              </div>
              <span className="text-xs text-gray-400">All time</span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              {stats.loading ? '...' : stats.totalLabs}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Total Assessments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Calendar className="text-green-500" size={24} />
              </div>
              <span className="text-xs text-gray-400">Today</span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              {stats.loading ? '...' : stats.todayLabs}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Today's Assessments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <TrendingUp className="text-amber-500" size={24} />
              </div>
              <span className="text-xs text-gray-400">Distribution</span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              {riskDistribution.mild}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Mild DR Cases</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <Users className="text-red-500" size={24} />
              </div>
              <span className="text-xs text-gray-400">High Risk</span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              {riskDistribution.severe}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Severe DR Cases</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Monthly Assessments</h3>
            <div className="h-64">
              <Bar data={barChartData} options={barOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              {(riskDistribution.nodr + riskDistribution.mild + riskDistribution.severe) > 0 ? (
                <Pie data={pieChartData} options={chartOptions} />
              ) : (
                <p className="text-gray-400">No data available yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.name}
                to={action.href}
                className={`group p-6 rounded-2xl bg-gradient-to-r ${action.color} hover:shadow-lg hover:shadow-primary/20 transition-all duration-300`}
              >
                <action.icon className="text-white mb-3" size={28} />
                <h4 className="text-lg font-semibold text-white">{action.name}</h4>
                <p className="text-white/70 text-sm mt-1">
                  {action.name === 'New Assessment' && 'Start a new patient risk assessment'}
                  {action.name === 'Audit Logs' && 'View all assessment records'}
                  {action.name === 'DR Information' && 'Learn about diabetic retinopathy'}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
