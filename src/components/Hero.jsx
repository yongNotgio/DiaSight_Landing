import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Aurora from './Aurora'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#6366f1", "#8b5cf6", "#6366f1"]} 
          amplitude={1.2} 
          blend={0.6}
          speed={0.5}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-[1]" />
      
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm text-gray-300">AI-Powered Risk Stratification for Diabetic Retinopathy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          We See the{' '}
          <span className="gradient-text">Unseen.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6"
        >
          DiaSight detects diabetic retinopathy risk before symptoms appear — using only routine lab tests. 
          No retinal scans needed. One early referral avoids a lifetime of blindness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2.5 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-sm">4.7M Filipino diabetics at risk</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-sm">1.1M may already have DR</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-sm">Leading cause of preventable blindness</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/login"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Start Screening
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="#services"
            className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
