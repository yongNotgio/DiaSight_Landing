import { motion } from 'framer-motion'

const LogoStrip = () => {
  const partners = [
    'Rural Health Units',
    'PhilHealth YAKAP',
    'Community Hospitals',
    'Barangay Health Stations',
    'Private Diagnostics',
    'DOH',
  ]

  // Duplicate the array for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-6 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mb-8"
        >
          Designed for healthcare providers across the Philippines
        </motion.p>
      </div>
      
      {/* Logo Loop Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex gap-12 md:gap-16"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex items-center gap-12 md:gap-16 text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
            >
              <span className="text-sm font-medium uppercase tracking-[0.15em] whitespace-nowrap">{partner}</span>
              <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden="true" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoStrip
