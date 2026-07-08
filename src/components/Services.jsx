import { motion } from 'framer-motion'

// Custom EKG pulse glyph — DiaSight's own mark, in place of stock icons
const PulseGlyph = ({ className }) => (
  <svg viewBox="0 0 32 14" fill="none" className={className} aria-hidden="true">
    <path
      d="M0 7 H9 L12 2 L17 12 L20 4 L22 7 H32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Ring gauge showing the 18 analyzed biomarkers
const RingGauge = () => (
  <svg viewBox="0 0 72 72" className="w-16 h-16" aria-hidden="true">
    <defs>
      <linearGradient id="diasight-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6366f1" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
    <circle
      cx="36" cy="36" r="30"
      stroke="url(#diasight-ring)"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="141 188"
      transform="rotate(-90 36 36)"
    />
    <text x="36" y="41" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">18</text>
  </svg>
)

const Services = () => {
  const services = [
    {
      label: 'Lab-Only Screening',
      title: 'Screen Without Expensive Equipment',
      description: 'Works with already available routine lab tests covered by PhilHealth YAKAP. No retinal scans or fundus cameras needed — just existing lab setup.',
      tags: ['No Imaging Required', 'PhilHealth Covered', 'Accessible'],
      visual: 'lab',
    },
    {
      label: 'AI Risk Engine',
      title: 'AI-Powered Risk Stratification',
      description: 'Instantly classifies DR risk (Low, Mild, Severe) from routine lab results using a rigorously validated machine learning model built on peer-reviewed research.',
      tags: ['Rigorously Validated', 'Peer-Reviewed Research', 'Real-time'],
      visual: 'ai',
    },
    {
      label: 'Biomarker Dashboard',
      title: 'Real-Time Biomarker Visualization',
      description: "Displays intuitive charts highlighting abnormal lab values to aid doctor's interpretation. Consolidates all relevant biomarkers into one view.",
      tags: ['Visual Charts', 'Trend Analysis', 'Abnormal Alerts'],
      visual: 'biomarker',
    },
    {
      label: 'Clinical Support',
      title: 'Clinical Decision Support',
      description: 'DiaSight empowers — NOT REPLACES — physicians and lab technologists, keeping them at the center of patient care with evidence-based recommendations.',
      tags: ['Evidence-Based', 'Clinician-Centered', 'Transparent'],
      visual: 'clinical',
    },
  ]

  // Visual Components
  const LabVisual = () => (
    <div className="card-depth border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white text-sm font-medium">YAKAP Lab Tests</span>
        <span className="text-xs text-accent px-2 py-1 rounded bg-accent/15">PhilHealth Covered</span>
      </div>
      <div className="space-y-3">
        {[
          { name: 'HbA1c (Glycated Hemoglobin)', status: 'Key biomarker', color: 'bg-primary' },
          { name: 'Lipid Profile (LDL, HDL, Cholesterol)', status: 'Cardiovascular risk', color: 'bg-secondary' },
          { name: 'Kidney Function (eGFR, BUN, UCR)', status: 'Nephropathy indicator', color: 'bg-accent' },
          { name: 'Blood Glucose (FBS)', status: 'Diabetes marker', color: 'bg-primary-light' },
        ].map((task, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${task.color}`} />
              <span className="text-white text-sm">{task.name}</span>
            </div>
            <span className="text-gray-500 text-xs">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const AIVisual = () => (
    <div className="card-depth border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="mb-4">
          <RingGauge />
        </div>
        <h4 className="text-white font-medium mb-2">Risk Classification Output</h4>
        <p className="text-gray-500 text-xs text-center mb-6">ML model analyzes 18 biomarkers to predict diabetic retinopathy risk</p>
        <div className="w-full space-y-3">
          <div className="flex gap-2 justify-center mb-4">
            <span className="px-3 py-2 rounded-lg bg-green-500/20 text-sm text-green-400">No DR</span>
            <span className="px-3 py-2 rounded-lg bg-yellow-500/20 text-sm text-yellow-400">Mild DR</span>
            <span className="px-3 py-2 rounded-lg bg-red-500/20 text-sm text-red-400">Severe DR</span>
          </div>
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1.5 rounded-full bg-primary/20 text-xs text-primary">
              Validated Model
            </span>
            <span className="px-3 py-1.5 rounded-full bg-secondary/20 text-xs text-secondary">
              Peer-Reviewed
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  const BiomarkerVisual = () => (
    <div className="card-depth border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <PulseGlyph className="w-6 h-3 text-primary" />
        <span className="text-white text-sm font-medium">Biomarker Dashboard</span>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">HbA1c</span>
            <span className="text-yellow-400">7.2%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">eGFR</span>
            <span className="text-red-400">45 mL/min</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">LDL Cholesterol</span>
            <span className="text-green-400">98 mg/dL</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )

  const ClinicalVisual = () => (
    <div className="card-depth border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <PulseGlyph className="w-6 h-3 text-primary" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Clinician in the Loop</p>
            <p className="text-gray-500 text-xs">Every result is reviewed by a physician</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
            <span className="text-primary text-sm" aria-hidden="true">✓</span>
            <span className="text-sm text-gray-300">Transparent AI Analysis</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
            <span className="text-secondary text-sm" aria-hidden="true">✓</span>
            <span className="text-sm text-gray-300">Explainable to Patients</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10">
            <span className="text-accent text-sm" aria-hidden="true">✓</span>
            <span className="text-sm text-gray-300">Evidence-Based Recommendations</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-light/10">
            <span className="text-primary-light text-sm" aria-hidden="true">✓</span>
            <span className="text-sm text-gray-300">Physician Makes the Final Call</span>
          </div>
        </div>
      </div>
    </div>
  )

  const getVisual = (type) => {
    switch (type) {
      case 'lab': return <LabVisual />
      case 'ai': return <AIVisual />
      case 'biomarker': return <BiomarkerVisual />
      case 'clinical': return <ClinicalVisual />
      default: return null
    }
  }

  return (
    <section id="services" className="py-20 md:py-30 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            AI-Powered Screening for<br />
            <span className="gradient-text">Early Detection</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DiaSight transforms diabetes care from reactive to proactive — identifying risk before damage occurs, 
            enabling early intervention, and preventing blindness through timely treatment.
          </p>
        </motion.div>

        {/* Services - Alternating Layout */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Content Side */}
              <div className="flex-1 max-w-xl">
                <span className="block text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                  {service.label}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-sm border border-white/10 text-white hover:bg-white/5 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 flex justify-center">
                {getVisual(service.visual)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
