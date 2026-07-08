import { motion } from 'framer-motion'

const CaseStudies = () => {
  const stats = [
    {
      value: '4.7M',
      label: 'Filipino Diabetics',
      description: 'Potential patients who could benefit from early DR screening',
      source: 'International Diabetes Federation, 2024',
    },
    {
      value: '1.1M',
      label: 'May Have DR',
      description: 'Filipinos potentially living with undiagnosed diabetic retinopathy',
      source: 'Cando et al. 2024',
    },
    {
      value: '2.5M',
      label: 'Undiagnosed Cases',
      description: 'Diabetes cases that remain undiagnosed in the Philippines',
      source: 'International Diabetes Federation, 2024',
    },
    {
      value: '₱500K+',
      label: 'Cost Per Case',
      description: 'Potential savings per blindness case avoided through early detection',
      source: 'Healthcare cost analysis',
    },
  ]

  const targetMarkets = [
    {
      segment: 'Primary Users (B2B)',
      description: 'Rural Health Units, Barangay Health Stations, YAKAP clinics, private diagnostics, and community hospitals.',
    },
    {
      segment: 'Secondary Users',
      description: 'DOH, PhilHealth, LGUs — for Universal Health Care and data-driven policy adaptation.',
    },
    {
      segment: 'End Beneficiaries (B2B2C)',
      description: '7M+ at-risk patients including diagnosed and undiagnosed diabetics, working adults, YAKAP members, and rural populations.',
    },
  ]

  return (
    <section id="case-studies" className="py-20 md:py-30 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Silent Epidemic</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            The Scale of the{' '}
            <span className="gradient-text">Problem We're Solving</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every day in the Philippines, patients are slowly going blind from a disease they don't even know they have.
            Diabetic Retinopathy is one of the leading causes of irreversible blindness among working-age Filipinos.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-14">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l-2 border-primary/40 pl-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-primary font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-400 text-sm mb-2">{stat.description}</p>
              <p className="text-gray-600 text-xs italic">{stat.source}</p>
            </motion.div>
          ))}
        </div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-14 p-8 rounded-2xl card-depth border border-white/10 overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">The Current Barrier</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-primary-light font-semibold mb-2">Asymptomatic</div>
                <p className="text-gray-400 text-sm">DR shows no symptoms until vision loss is irreversible</p>
              </div>
              <div className="text-center">
                <div className="text-secondary font-semibold mb-2">Costly Diagnosis</div>
                <p className="text-gray-400 text-sm">Traditional screening requires expensive fundus cameras</p>
              </div>
              <div className="text-center">
                <div className="text-accent font-semibold mb-2">No Early Referral</div>
                <p className="text-gray-400 text-sm">No ophthalmologist referral unless irreversible vision loss occurs</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Target Market */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Target Market</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {targetMarkets.map((market, index) => (
              <motion.div
                key={market.segment}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-depth card-hover border border-white/10 rounded-2xl p-6"
              >
                <div className="text-primary font-semibold mb-3">{market.segment}</div>
                <p className="text-gray-400 text-sm">{market.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies
