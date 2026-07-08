import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      quote: 'The ability to screen for diabetic retinopathy risk using routine lab tests is a game-changer for rural health units where fundus cameras are unavailable.',
      name: 'Healthcare Professional',
      role: 'Rural Health Unit',
    },
  ]

  const milestones = [
    {
      title: 'Expert Clinical Review',
      description: 'Developed in consultation with medical and biomedical AI experts, with reliability assessed through expert clinical review.',
    },
    {
      title: 'Clinical Readiness',
      description: 'Proven robust and reliable for early risk stratification; ready for real-world pilot deployment.',
    },
  ]

  return (
    <section id="validation" className="py-20 md:py-30 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Validation & Progress</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Built With{' '}
            <span className="gradient-text">Clinical Rigor</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DiaSight is being developed in consultation with medical and biomedical AI experts,
            and is ready for real-world pilot deployment.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-2xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-depth border border-white/10 rounded-2xl p-8"
            >
              <div>
                <span className="block font-serif text-6xl leading-none text-primary/50" aria-hidden="true">&ldquo;</span>
                <blockquote className="text-lg text-white mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-depth card-hover border border-white/10 rounded-2xl p-6"
            >
              <span className="mb-4 block h-2 w-2 rounded-[2px] bg-primary/70" />
              <h3 className="text-lg font-semibold text-white mb-2">{milestone.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
