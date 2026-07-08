import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'How does DiaSight detect diabetic retinopathy without retinal imaging?',
      answer: 'DiaSight uses machine learning to analyze routine lab biomarkers (like HbA1c, lipid profile, and kidney function tests) that are already covered by PhilHealth YAKAP. Research has shown strong correlations between these biomarkers and DR risk, allowing us to identify at-risk patients before symptoms appear — without expensive fundus cameras or specialized equipment.',
    },
    {
      question: 'What is the accuracy of DiaSight\'s AI model?',
      answer: 'DiaSight\'s AI model has been rigorously developed and validated using peer-reviewed research methodology, and reviewed by medical and biomedical AI experts. We are continuing to validate performance on Filipino patient cohorts and will publish detailed metrics once that validation is complete.',
    },
    {
      question: 'Which lab tests are required for DiaSight screening?',
      answer: 'DiaSight works with standard PhilHealth YAKAP-covered tests including: HbA1c (glycated hemoglobin), fasting blood glucose, lipid profile (LDL, HDL, cholesterol, triglycerides), kidney function (eGFR, BUN, creatinine, uric acid), and liver enzymes (ALT, AST). A total of 18 biomarkers are analyzed.',
    },
    {
      question: 'Does DiaSight replace the need for ophthalmologist consultation?',
      answer: 'No. DiaSight is a clinical decision support tool that empowers — not replaces — physicians. It helps identify high-risk patients who should be referred to an ophthalmologist for confirmation. The goal is early detection and timely referral, not replacement of clinical judgment.',
    },
    {
      question: 'Can rural health units and barangay health stations use DiaSight?',
      answer: 'Yes! DiaSight is specifically designed for resource-limited settings. It requires zero additional equipment costs — if your clinic can run routine lab tests, you can use DiaSight. Our lightweight AI runs efficiently on standard computers, making it accessible to RHUs, barangay health stations, and YAKAP clinics nationwide.',
    },
    {
      question: 'How does DiaSight align with PhilHealth coverage?',
      answer: 'DiaSight leverages lab tests already covered under PhilHealth\'s Yaman ng Kalusugan (YAKAP) program. This means patients can get screened for DR risk at no additional out-of-pocket cost for the lab work.',
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-30 bg-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQs</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400">Everything you need to know about DiaSight screening.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl card-depth border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
