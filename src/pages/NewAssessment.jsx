import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  User, Heart, Droplets, Activity, Pill, 
  ChevronRight, ChevronLeft, Check, AlertCircle, 
  Loader2, RotateCcw, Home
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/DashboardLayout'

const ML_API_URL = import.meta.env.VITE_ML_API_URL

const steps = [
  { id: 1, name: 'Demographics', icon: User, fields: ['age', 'sex', 'duration'] },
  { id: 2, name: 'Vital Signs', icon: Heart, fields: ['sbp', 'dbp', 'hbp'] },
  { id: 3, name: 'Glycemic & Lipids', icon: Droplets, fields: ['hba1c', 'ldl', 'hdl', 'cholesterol', 'triglycerides'] },
  { id: 4, name: 'Renal Function', icon: Activity, fields: ['urea', 'bun', 'uric', 'egfr', 'ucr'] },
  { id: 5, name: 'Liver Function', icon: Pill, fields: ['alt', 'ast'] }
]

const fieldConfigs = {
  age: { 
    label: 'Age', 
    type: 'number', 
    min: 18, 
    max: 120, 
    placeholder: 'Enter patient age',
    unit: 'years',
    hint: 'Patient must be 18 or older'
  },
  sex: { 
    label: 'Biological Sex', 
    type: 'select', 
    options: [{ value: 1, label: 'Male' }, { value: 2, label: 'Female' }],
    hint: 'Select biological sex at birth'
  },
  duration: { 
    label: 'Diabetes Duration', 
    type: 'number', 
    min: 0, 
    max: 100, 
    placeholder: 'Enter years since diagnosis',
    unit: 'years',
    hint: 'Years since diabetes diagnosis'
  },
  sbp: { 
    label: 'Systolic Blood Pressure', 
    type: 'number', 
    min: 70, 
    max: 250, 
    placeholder: 'Enter systolic BP',
    unit: 'mmHg',
    hint: 'Normal range: 90-120 mmHg'
  },
  dbp: { 
    label: 'Diastolic Blood Pressure', 
    type: 'number', 
    min: 40, 
    max: 150, 
    placeholder: 'Enter diastolic BP',
    unit: 'mmHg',
    hint: 'Normal range: 60-80 mmHg'
  },
  hbp: { 
    label: 'History of Hypertension', 
    type: 'select', 
    options: [{ value: 1, label: 'No' }, { value: 2, label: 'Yes' }],
    hint: 'Has the patient been diagnosed with high blood pressure?'
  },
  hba1c: { 
    label: 'HbA1c', 
    type: 'number', 
    step: 0.1, 
    min: 4, 
    max: 15, 
    placeholder: 'Enter HbA1c value',
    unit: '%',
    hint: 'Normal: <5.7% | Prediabetes: 5.7-6.4% | Diabetes: ≥6.5%'
  },
  ldl: { 
    label: 'LDL Cholesterol', 
    type: 'number', 
    min: 20, 
    max: 400, 
    placeholder: 'Enter LDL value',
    unit: 'mg/dL',
    hint: 'Optimal: <100 mg/dL'
  },
  hdl: { 
    label: 'HDL Cholesterol', 
    type: 'number', 
    min: 10, 
    max: 150, 
    placeholder: 'Enter HDL value',
    unit: 'mg/dL',
    hint: 'Desirable: >40 mg/dL (men), >50 mg/dL (women)'
  },
  cholesterol: { 
    label: 'Total Cholesterol', 
    type: 'number', 
    min: 100, 
    max: 500, 
    placeholder: 'Enter total cholesterol',
    unit: 'mg/dL',
    hint: 'Desirable: <200 mg/dL'
  },
  triglycerides: { 
    label: 'Triglycerides', 
    type: 'number', 
    min: 30, 
    max: 1000, 
    placeholder: 'Enter triglycerides value',
    unit: 'mg/dL',
    hint: 'Normal: <150 mg/dL'
  },
  urea: { 
    label: 'Serum Urea', 
    type: 'number', 
    min: 5, 
    max: 200, 
    placeholder: 'Enter serum urea value',
    unit: 'mg/dL',
    hint: 'Normal range: 15-40 mg/dL'
  },
  bun: { 
    label: 'Blood Urea Nitrogen (BUN)', 
    type: 'number', 
    min: 3, 
    max: 100, 
    placeholder: 'Enter BUN value',
    unit: 'mg/dL',
    hint: 'Normal range: 7-20 mg/dL'
  },
  uric: { 
    label: 'Uric Acid', 
    type: 'number', 
    step: 0.1, 
    min: 1, 
    max: 15, 
    placeholder: 'Enter uric acid value',
    unit: 'mg/dL',
    hint: 'Normal: 3.5-7.2 mg/dL (men), 2.6-6.0 mg/dL (women)'
  },
  egfr: { 
    label: 'eGFR', 
    type: 'number', 
    min: 5, 
    max: 150, 
    placeholder: 'Enter eGFR value',
    unit: 'mL/min/1.73m²',
    hint: 'Normal: ≥90 | Mild decrease: 60-89 | Moderate: 30-59'
  },
  ucr: { 
    label: 'Urine Albumin-to-Creatinine Ratio', 
    type: 'number', 
    min: 0, 
    max: 5000, 
    placeholder: 'Enter UACR value',
    unit: 'mg/g',
    hint: 'Normal: <30 | Microalbuminuria: 30-300 | Macroalbuminuria: >300'
  },
  alt: { 
    label: 'ALT (SGPT)', 
    type: 'number', 
    min: 5, 
    max: 500, 
    placeholder: 'Enter ALT value',
    unit: 'U/L',
    hint: 'Normal range: 7-56 U/L'
  },
  ast: { 
    label: 'AST (SGOT)', 
    type: 'number', 
    min: 5, 
    max: 500, 
    placeholder: 'Enter AST value',
    unit: 'U/L',
    hint: 'Normal range: 10-40 U/L'
  }
}

const NewAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const { doctor } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, trigger, getValues, reset } = useForm({
    mode: 'onChange'
  })

  const currentStepFields = steps.find(s => s.id === currentStep)?.fields || []

  const validateCurrentStep = async () => {
    const isValid = await trigger(currentStepFields)
    return isValid
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 5) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')

    try {
      // Generate unique lab_id
      const labId = crypto.randomUUID()

      // Prepare lab data
      const labData = {
        lab_id: labId,
        created_by: doctor.id,
        age: parseInt(data.age),
        sex: parseInt(data.sex),
        duration: parseInt(data.duration),
        sbp: parseFloat(data.sbp),
        dbp: parseFloat(data.dbp),
        hbp: parseInt(data.hbp),
        hba1c: parseFloat(data.hba1c),
        ldl: parseFloat(data.ldl),
        hdl: parseFloat(data.hdl),
        cholesterol: parseFloat(data.cholesterol),
        triglycerides: parseFloat(data.triglycerides),
        urea: parseFloat(data.urea),
        bun: parseFloat(data.bun),
        uric: parseFloat(data.uric),
        egfr: parseFloat(data.egfr),
        ucr: parseFloat(data.ucr),
        alt: parseFloat(data.alt),
        ast: parseFloat(data.ast)
      }

      // Insert into labs table
      const { error: labError } = await supabase
        .from('labs')
        .insert([labData])

      if (labError) throw labError

      // Prepare ML API request (note field name mappings)
      const mlPayload = {
        age: labData.age,
        sex: labData.sex,
        sbp: labData.sbp,
        dbp: labData.dbp,
        hbp: labData.hbp,
        duration: labData.duration,
        hb1ac: labData.hba1c, // Note: API uses hb1ac
        ldl: labData.ldl,
        hdl: labData.hdl,
        chol: labData.cholesterol, // Note: API uses chol
        urea: labData.urea,
        bun: labData.bun,
        uric: labData.uric,
        egfr: labData.egfr,
        trig: labData.triglycerides, // Note: API uses trig
        ucr: labData.ucr,
        alt: labData.alt,
        ast: labData.ast
      }

      // Call ML API
      const mlResponse = await fetch(ML_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mlPayload)
      })

      if (!mlResponse.ok) throw new Error('ML prediction failed')

      const prediction = await mlResponse.json()
      const riskClass = prediction.prediction || 'Unknown'

      // Insert into risk_classification table
      const { data: riskData, error: riskError } = await supabase
        .from('risk_classification')
        .insert([{
          lab_id: labId,
          risk_class: riskClass
        }])
        .select()
        .single()

      if (riskError) throw riskError

      // Update audit_logs with risk classification
      await supabase
        .from('audit_logs')
        .update({
          risk_classification_id: riskData.id,
          risk_class: riskClass
        })
        .eq('lab_id', labId)

      setResult({
        labId,
        riskClass,
        labData
      })

    } catch (err) {
      console.error('Assessment error:', err)
      setError(err.message || 'An error occurred during assessment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    reset()
    setCurrentStep(1)
    setResult(null)
    setError('')
  }

  const getRiskColor = (risk) => {
    const riskLower = risk?.toLowerCase() || ''
    if (riskLower.includes('no dr')) return 'text-green-500'
    if (riskLower.includes('mild')) return 'text-amber-500'
    if (riskLower.includes('severe')) return 'text-red-500'
    return 'text-gray-400'
  }

  const getRiskBgColor = (risk) => {
    const riskLower = risk?.toLowerCase() || ''
    if (riskLower.includes('no dr')) return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    if (riskLower.includes('mild')) return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30'
    if (riskLower.includes('severe')) return 'from-red-500/20 to-rose-500/20 border-red-500/30'
    return 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
  }

  // Result display
  if (result) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className={`glass rounded-2xl p-8 bg-gradient-to-br ${getRiskBgColor(result.riskClass)} border`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4`}>
                <Check className={`w-10 h-10 ${getRiskColor(result.riskClass)}`} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Assessment Complete</h2>
              <p className="text-gray-400">Lab ID: {result.labId.slice(0, 8)}...</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm text-gray-400 mb-2">Risk Classification</p>
              <p className={`text-4xl font-bold ${getRiskColor(result.riskClass)}`}>
                {result.riskClass}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Patient Age</p>
                <p className="text-lg font-semibold text-white">{result.labData.age} years</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Diabetes Duration</p>
                <p className="text-lg font-semibold text-white">{result.labData.duration} years</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">HbA1c</p>
                <p className="text-lg font-semibold text-white">{result.labData.hba1c}%</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Blood Pressure</p>
                <p className="text-lg font-semibold text-white">{result.labData.sbp}/{result.labData.dbp}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                <Home size={20} />
                Dashboard
              </button>
              <button
                onClick={resetForm}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <RotateCcw size={20} />
                New Assessment
              </button>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${currentStep > step.id 
                    ? 'bg-primary border-primary text-white' 
                    : currentStep === step.id 
                      ? 'border-primary text-primary' 
                      : 'border-white/20 text-gray-500'}
                `}>
                  {currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-white/10'}`} 
                       style={{ width: '80px' }} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span 
                key={step.id} 
                className={`text-xs ${currentStep === step.id ? 'text-white' : 'text-gray-500'}`}
                style={{ width: '80px', textAlign: 'center' }}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            {(() => {
              const StepIcon = steps.find(s => s.id === currentStep)?.icon || User
              return <StepIcon className="text-primary" size={24} />
            })()}
            {steps.find(s => s.id === currentStep)?.name}
          </h2>

          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentStepFields.map((fieldName) => {
                const config = fieldConfigs[fieldName]
                return (
                  <div key={fieldName} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {config.label} {config.unit && <span className="text-gray-500">({config.unit})</span>}
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    {config.type === 'select' ? (
                      <select
                        {...register(fieldName, { required: `${config.label} is required` })}
                        className="w-full px-4 py-3 bg-dark-lighter rounded-xl border border-white/10 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="text-gray-500">Select an option...</option>
                        {config.options.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-dark-lighter">{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        <input
                          type={config.type}
                          step={config.step || 'any'}
                          min={config.min}
                          max={config.max}
                          placeholder={config.placeholder}
                          {...register(fieldName, { 
                            required: `${config.label} is required`,
                            min: { value: config.min, message: `Minimum value is ${config.min}` },
                            max: { value: config.max, message: `Maximum value is ${config.max}` }
                          })}
                          className="w-full px-4 py-3 bg-dark-lighter rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {config.unit && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                            {config.unit}
                          </span>
                        )}
                      </div>
                    )}
                    {config.hint && !errors[fieldName] && (
                      <p className="text-xs text-gray-500">{config.hint}</p>
                    )}
                    {errors[fieldName] && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors[fieldName].message}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Submit Assessment
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default NewAssessment
