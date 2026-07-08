import { motion } from 'framer-motion'
import AssembleText from './AssembleText'

const Process = () => {
  const steps = [
    {
      title: 'Routine Lab Tests',
      description: 'Patient undergoes standard PhilHealth YAKAP lab tests at any clinic or RHU. No special equipment needed.',
      visual: 'lab',
    },
    {
      title: 'AI Risk Analysis',
      description: 'DiaSight processes 18 biomarkers through our trained ML model to calculate diabetic retinopathy risk.',
      visual: 'ai',
    },
    {
      title: 'Risk Classification',
      description: 'Instant classification into No DR, Mild DR, or Severe DR with detailed biomarker visualization.',
      visual: 'classification',
    },
    {
      title: 'Clinical Decision',
      description: 'Physician reviews results, explains to patient, and refers high-risk cases to ophthalmologist for early intervention.',
      visual: 'clinical',
    },
  ]

  const LabVisual = () => (
    <div className="mt-4 p-3 rounded-lg bg-dark/50 border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] text-gray-400">YAKAP Covered Tests</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['HbA1c', 'LDL', 'HDL', 'Cholesterol', 'eGFR', 'BUN', 'UCR', 'ALT', 'AST'].map((item) => (
          <span key={item} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-gray-400">
            <span className="text-accent">✓</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )

  const AIVisual = () => (
    <div className="mt-4 p-3 rounded-lg bg-dark/50 border border-white/5 overflow-hidden">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between p-1.5 rounded bg-dark-lighter/50">
          <span className="text-[10px] text-gray-400">Processing biomarkers...</span>
          <span className="text-[9px] text-primary">18/18</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-dark-lighter/50">
          <span className="text-[10px] text-gray-400">ML Model Analysis</span>
          <span className="text-[9px] text-accent">Complete</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-dark-lighter/50">
          <span className="text-[10px] text-gray-400">Risk Calculation</span>
          <span className="text-[9px] text-accent">Complete</span>
        </div>
      </div>
    </div>
  )

  const ClassificationVisual = () => (
    <div className="mt-4 p-3 rounded-lg bg-dark/50 border border-white/5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex-1 p-2 rounded-lg bg-green-500/20 text-center">
          <span className="text-[9px] text-green-400 font-medium">No DR</span>
          <p className="text-[7px] text-gray-500 mt-0.5">Low Risk</p>
        </div>
        <div className="flex-1 p-2 rounded-lg bg-yellow-500/20 text-center border border-yellow-500/50">
          <span className="text-[9px] text-yellow-400 font-medium">Mild DR</span>
          <p className="text-[7px] text-gray-500 mt-0.5">Moderate</p>
        </div>
        <div className="flex-1 p-2 rounded-lg bg-red-500/20 text-center">
          <span className="text-[9px] text-red-400 font-medium">Severe DR</span>
          <p className="text-[7px] text-gray-500 mt-0.5">High Risk</p>
        </div>
      </div>
      <div className="flex justify-center">
        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-[9px] text-yellow-400">
          Recommend referral
        </span>
      </div>
    </div>
  )

  const ClinicalVisual = () => (
    <div className="mt-4 p-3 rounded-lg bg-dark/50 border border-white/5">
      <div className="space-y-2">
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-dark-lighter/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] text-gray-400">PDF Report Generated</span>
          </div>
          <span className="text-[9px] text-accent">Ready</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-dark-lighter/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] text-gray-400">Biomarker Visualization</span>
          </div>
          <span className="text-[9px] text-accent">Complete</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-primary/20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] text-white">Early Referral</span>
          </div>
          <span className="text-primary text-xs" aria-hidden="true">→</span>
        </div>
      </div>
    </div>
  )

  const getVisual = (type) => {
    switch (type) {
      case 'lab': return <LabVisual />
      case 'ai': return <AIVisual />
      case 'classification': return <ClassificationVisual />
      case 'clinical': return <ClinicalVisual />
      default: return null
    }
  }

  return (
    <section id="process" className="py-20 md:py-30 bg-dark section-vignette overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            End-to-End Early Screening{' '}
            <span className="gradient-text">Workflow</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From routine lab tests to clinical decision — DiaSight streamlines the entire diabetic retinopathy
            screening process without requiring any specialized imaging equipment.
          </p>
        </motion.div>

        {/* Steps grid + closing quote (the page-wide trace line passes through here) */}
        <div className="relative">
          <div className="relative grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-depth card-hover border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <div>
                  {/* Step number + title */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-sm text-primary tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Visual */}
                  {getVisual(step.visual)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div className="relative z-10 mt-24 text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold text-white italic">
              <AssembleText text='"One early referral avoids a lifetime of blindness"' />
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
