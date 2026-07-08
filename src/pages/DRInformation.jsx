import { motion } from 'framer-motion'
import { 
  Eye, AlertTriangle, Shield, Heart, Activity,
  ArrowLeft, CheckCircle, XCircle, Info, Stethoscope
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

const DRInformation = () => {
  const stages = [
    {
      name: 'No DR',
      severity: 'None',
      color: 'green',
      description: 'No visible signs of diabetic retinopathy. The retina appears healthy with no microaneurysms or hemorrhages.',
      symptoms: ['Normal vision', 'No visible changes in the retina'],
      icon: CheckCircle
    },
    {
      name: 'Mild NPDR',
      severity: 'Stage 1',
      color: 'yellow',
      description: 'Mild Non-Proliferative Diabetic Retinopathy. Small areas of balloon-like swelling (microaneurysms) in the retina\'s tiny blood vessels.',
      symptoms: ['Usually no symptoms', 'May have slight blurriness', 'Microaneurysms present'],
      icon: Info
    },
    {
      name: 'Moderate NPDR',
      severity: 'Stage 2',
      color: 'orange',
      description: 'Moderate Non-Proliferative Diabetic Retinopathy. Blood vessels that nourish the retina may swell and distort. They may also lose their ability to transport blood.',
      symptoms: ['Blurred vision', 'Fluctuating vision', 'Impaired color vision', 'Dark spots or strings'],
      icon: AlertTriangle
    },
    {
      name: 'Severe NPDR',
      severity: 'Stage 3',
      color: 'red',
      description: 'Severe Non-Proliferative Diabetic Retinopathy. Many more blood vessels are blocked, depriving blood supply to areas of the retina. These areas secrete growth factors that signal the retina to grow new blood vessels.',
      symptoms: ['Significant vision changes', 'Dark areas in vision', 'Difficulty seeing at night', 'Colors appear faded'],
      icon: XCircle
    },
    {
      name: 'Proliferative DR',
      severity: 'Stage 4',
      color: 'red',
      description: 'Advanced stage where the retina grows new blood vessels (neovascularization). These new vessels are fragile and can leak blood, leading to severe vision loss or blindness.',
      symptoms: ['Severe vision loss', 'Floaters', 'Sudden vision changes', 'Risk of retinal detachment'],
      icon: XCircle
    }
  ]

  const riskFactors = [
    { title: 'Duration of Diabetes', description: 'The longer you have diabetes, the greater your risk of developing diabetic retinopathy.', icon: Activity },
    { title: 'Poor Blood Sugar Control', description: 'High blood sugar levels damage blood vessels throughout the body, including those in the eyes.', icon: Stethoscope },
    { title: 'High Blood Pressure', description: 'Hypertension can damage the delicate blood vessels in the retina.', icon: Heart },
    { title: 'High Cholesterol', description: 'Elevated cholesterol can lead to fatty deposits in blood vessels.', icon: AlertTriangle },
    { title: 'Pregnancy', description: 'Pregnancy can worsen diabetic retinopathy in women with diabetes.', icon: Shield },
    { title: 'Tobacco Use', description: 'Smoking increases the risk of diabetes complications including retinopathy.', icon: XCircle }
  ]

  const preventionTips = [
    'Maintain good blood sugar control (HbA1c < 7%)',
    'Keep blood pressure under 130/80 mmHg',
    'Maintain healthy cholesterol levels',
    'Get annual dilated eye exams',
    'Quit smoking and avoid tobacco',
    'Exercise regularly (at least 150 minutes/week)',
    'Take medications as prescribed',
    'Report any vision changes immediately'
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          
          <div className="glass rounded-2xl p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-primary/20">
                <Eye className="text-primary" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Diabetic Retinopathy</h1>
                <p className="text-gray-400 mt-1">Understanding DR: Causes, Stages, and Prevention</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">What is Diabetic Retinopathy?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Diabetic retinopathy is a diabetes complication that affects the eyes. It's caused by damage to the 
            blood vessels of the light-sensitive tissue at the back of the eye (retina). At first, diabetic 
            retinopathy may cause no symptoms or only mild vision problems. Eventually, it can cause blindness.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The condition can develop in anyone who has type 1 or type 2 diabetes. The longer you have diabetes 
            and the less controlled your blood sugar is, the more likely you are to develop this eye complication.
          </p>
        </motion.div>

        {/* Stages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Stages of Diabetic Retinopathy</h2>
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`glass rounded-2xl p-6 border-l-4 ${
                  stage.color === 'green' ? 'border-l-green-500' :
                  stage.color === 'yellow' ? 'border-l-yellow-500' :
                  stage.color === 'orange' ? 'border-l-orange-500' :
                  'border-l-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    stage.color === 'green' ? 'bg-green-500/20' :
                    stage.color === 'yellow' ? 'bg-yellow-500/20' :
                    stage.color === 'orange' ? 'bg-orange-500/20' :
                    'bg-red-500/20'
                  }`}>
                    <stage.icon className={`${
                      stage.color === 'green' ? 'text-green-500' :
                      stage.color === 'yellow' ? 'text-yellow-500' :
                      stage.color === 'orange' ? 'text-orange-500' :
                      'text-red-500'
                    }`} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        stage.color === 'green' ? 'bg-green-500/20 text-green-400' :
                        stage.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                        stage.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {stage.severity}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{stage.description}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-2">Signs & Symptoms:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {stage.symptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              stage.color === 'green' ? 'bg-green-500' :
                              stage.color === 'yellow' ? 'bg-yellow-500' :
                              stage.color === 'orange' ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}></span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Factors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Risk Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="p-3 rounded-xl bg-red-500/20 w-fit mb-4">
                  <factor.icon className="text-red-400" size={24} />
                </div>
                <h3 className="font-semibold text-white mb-2">{factor.title}</h3>
                <p className="text-sm text-gray-400">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prevention Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-green-500/20">
              <Shield className="text-green-500" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Prevention & Management</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {preventionTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-300">{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Treatment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Treatment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Early Stage (Mild/Moderate NPDR)</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                  Careful management of diabetes
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                  Regular monitoring with dilated eye exams
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                  Blood pressure and cholesterol control
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Advanced Stage (Severe NPDR/PDR)</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-2"></span>
                  Anti-VEGF injections
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-2"></span>
                  Laser treatment (photocoagulation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-2"></span>
                  Vitrectomy surgery
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-4 bg-amber-500/10 border border-amber-500/30"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-amber-200 font-medium">Medical Disclaimer</p>
              <p className="text-sm text-amber-200/70 mt-1">
                This information is for educational purposes only and should not be considered medical advice. 
                The DiaSight risk assessment tool is intended for screening purposes only. Always consult with 
                a qualified healthcare professional for diagnosis and treatment decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default DRInformation
