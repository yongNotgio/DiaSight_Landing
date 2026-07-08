import { motion } from 'framer-motion'

const Benefits = () => {
  const benefits = [
    {
      title: 'No Fundus Camera Needed',
      description: 'Screens for DR risk using routine blood work your clinic already runs — no retinal imaging equipment to buy, maintain, or staff.',
    },
    {
      title: 'Aligned With PhilHealth YAKAP',
      description: 'Built around lab tests already covered by the YAKAP benefit package, so screening adds no lab cost for the patient.',
    },
    {
      title: 'Made for Rural Health Units',
      description: 'Runs on a standard clinic computer — designed for RHUs, barangay health stations, and YAKAP clinics, not just city hospitals.',
    },
    {
      title: 'Clinician in the Loop',
      description: 'DiaSight supports the physician\'s judgment rather than replacing it — every risk result is reviewed and explained by a clinician.',
    },
    {
      title: 'Results in the Same Visit',
      description: 'Risk classification comes back while the patient is still at the clinic, so counseling and referral happen on the spot.',
    },
    {
      title: 'A Clear Referral Pathway',
      description: 'High-risk patients are flagged for ophthalmologist referral early — while treatment can still preserve their vision.',
    },
  ]

  return (
    <section id="benefits" className="py-20 md:py-30 bg-dark section-vignette">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Benefits</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Why Healthcare Providers Choose{' '}
            <span className="gradient-text">DiaSight</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DiaSight removes the equipment, cost, and access barriers that keep diabetic retinopathy
            screening out of reach for most Filipino communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex gap-5 border-t border-white/10 pt-8"
            >
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-[2px] bg-primary/70 transition-colors group-hover:bg-primary" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
