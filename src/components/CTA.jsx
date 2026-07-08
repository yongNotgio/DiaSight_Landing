import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-black border border-white/10 text-center overflow-hidden"
        >
          {/* Purple glow effects - top left and bottom right */}
          <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.3)_0%,_transparent_70%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Screening Today.{' '}
              <span className="block mt-2">Prevent Blindness Tomorrow.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Join healthcare providers across the Philippines who are using DiaSight to detect 
              diabetic retinopathy risk early — before symptoms appear, before it's too late.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="group flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all duration-300"
              >
                Start Free Trial
                <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
