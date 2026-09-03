'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const PROJECTS = [
{
  id: 'gold-price-gru',
  category: 'Deep Learning',
  year: '2026',
  title: 'Gold Price Prediction with GRU',
  link: 'https://goldpredik.streamlit.app/',

  stack: [
    'Python',
    'TensorFlow',
    'GRU',
    'Time Series',
    'Streamlit',
  ],

  overview:
    'A gold-price forecasting project using a Gated Recurrent Unit (GRU) neural network, historical gold prices, and economic indicators. The workflow uses lag, return, moving average, standard deviation, EMA, and momentum features, then evaluates the forecasting model with MAE, RMSE, MAPE, and R².',

  recruiterPerspective:
    'Demonstrates practical experience in time-series forecasting, deep learning experimentation, feature scenario comparison, model evaluation, and deployment of a trained forecasting model as an interactive application.',

  metrics: [
    {
      value: 'GRU',
      label: 'MODEL',
      detail: 'Gated Recurrent Unit for monthly time-series forecasting',
    },
    {
      value: '4',
      label: 'SCENARIOS',
      detail: 'Compared different combinations of gold, USD, and inflation features',
    },
    {
      value: '5.20%',
      label: 'TEST MAPE',
      detail: 'Mean Absolute Percentage Error on the test set',
    },
    {
      value: '0.924',
      label: 'TEST R²',
      detail: 'Coefficient of determination on the test set',
    },
  ],

  workflow: [
    'Prepare and organize monthly gold price and economic data',
    'Create six-month sequences for time-series forecasting',
    'Train GRU models across four feature scenarios',
    'Compare scenarios using validation performance',
    'Evaluate the selected model on unseen test data',
    'Deploy the forecasting model through Streamlit',
  ],

  skills: [
    'Time Series Forecasting',
    'GRU',
    'Deep Learning',
    'TensorFlow',
    'Feature Engineering',
    'Model Evaluation',
    'Data Preprocessing',
    'Streamlit',
  ],

  fullTechStack: {
    languages: ['Python'],
    libraries: [
      'TensorFlow',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'Streamlit',
    ],
    algorithms: [
      'GRU',
      'Time-Series Forecasting',
    ],
    methods: [
      'Feature Scaling',
      'Sequence Generation',
      'Scenario Comparison',
      'MAE',
      'RMSE',
      'MAPE',
      'R²',
    ],
  },
},
  {
  id: 'national-energy-analysis',
  category: 'Data Analysis',
  year: '2025',
  title: 'National Electricity Consumption & Energy Efficiency Analysis',
  link: 'https://listrik.streamlit.app/',

  stack: [
    'Python',
    'Pandas',
    'Statistical Analysis',
    'Multiple Linear Regression',
    'IBM Granite',
  ],

  overview:
    'An analysis of electricity consumption, population, and regional economic data across 34 Indonesian provinces from 2017–2023. The project develops energy-efficiency metrics from GDP/PDRB per capita and electricity consumption per capita, applies multiple linear regression, and uses IBM Granite for AI-assisted classification and policy insights.',

  recruiterPerspective:
    'Demonstrates practical data analysis, statistical modeling, visualization-oriented reasoning, and the use of generative AI to support structured classification and interpretation.',

  metrics: [
    {
      value: '34',
      label: 'PROVINCES',
      detail: 'National coverage across Indonesian provinces',
    },
    {
      value: '2017–23',
      label: 'PERIOD',
      detail: 'Seven years of consumption and economic data',
    },
    {
      value: 'MLR',
      label: 'MODEL',
      detail: 'Multiple Linear Regression for relationship analysis',
    },
    {
      value: 'AI',
      label: 'INSIGHTS',
      detail: 'IBM Granite-assisted classification and policy insights',
    },
  ],

  workflow: [
    'Integrate provincial electricity, population, and PDRB data',
    'Build per-capita consumption and energy-efficiency metrics',
    'Analyze relationships with multiple linear regression',
    'Classify patterns and summarize policy insights with IBM Granite',
  ],

  skills: [
    'Data Analysis',
    'Statistical Analysis',
    'Data Visualization',
    'Multiple Linear Regression',
    'IBM Granite / Generative AI',
    'Data-Driven Decision Making',
  ],

  fullTechStack: {
    languages: ['Python'],
    libraries: ['Pandas', 'NumPy'],
    algorithms: ['Multiple Linear Regression', 'AI-based Classification'],
    methods: [
      'Per-capita Metrics',
      'Energy-efficiency Analysis',
      'Statistical Classification',
      'Policy Insight Generation',
    ],
  },
},
  {
  id: 'home-credit',
  category: 'Machine Learning',
  year: '2024',
  title: 'Bank Loan Approval Classification',
  link: 'https://pinjaman-cvau8lsjucr8poxn2qlnri.streamlit.app/#hasil-prediksi',

  stack: [
    'Python',
    'Logistic Regression',
    'Random Forest',
    'XGBoost',
    'Scikit-learn',
  ],

  overview:
    'A comparative machine learning study for bank loan approval classification. The project applies preprocessing, feature engineering, feature selection, encoding, normalization, and SMOTE, then compares Logistic Regression, Random Forest, and XGBoost using Accuracy, Precision, Recall, F1-score, and AUC.',

  recruiterPerspective:
    'Demonstrates a rigorous classification workflow, comparative model evaluation, and research communication. This project became the basis of a JAIC publication.',

  metrics: [
    {
      value: '3',
      label: 'MODELS',
      detail: 'Logistic Regression, Random Forest, and XGBoost',
    },
    {
      value: 'SMOTE',
      label: 'BALANCING',
      detail: 'Class imbalance handled during preprocessing',
    },
    {
      value: 'AUC',
      label: 'EVALUATION',
      detail: 'Measured alongside Accuracy, Precision, Recall, and F1-score',
    },
    {
      value: 'JAIC',
      label: 'PUBLICATION',
      detail: 'Published as first author in JAIC, Vol. 9 No. 5',
    },
  ],

  workflow: [
    'Preprocess, encode, normalize, and select relevant features',
    'Apply SMOTE to address class imbalance',
    'Train Logistic Regression, Random Forest, and XGBoost',
    'Compare models using classification performance metrics',
    'Document the findings as published research',
  ],

  skills: [
    'Logistic Regression',
    'Random Forest',
    'XGBoost',
    'Classification',
    'Feature Engineering',
    'SMOTE',
    'Scikit-learn',
    'Python',
    'Model Evaluation',
  ],

  fullTechStack: {
    languages: ['Python'],
    libraries: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
    ],
    algorithms: [
      'Logistic Regression',
      'Random Forest',
      'XGBoost',
    ],
    methods: [
      'Feature Engineering',
      'Feature Selection',
      'Encoding & Normalization',
      'SMOTE',
      'AUC & F1-score',
    ],
  },
},

{
  id: 'lumpy-skin',
  category: 'Machine Learning',
  year: '2024',
  title: 'Lumpy Skin Disease Prediction',
  image: '/images/lsd.jpg',
  link: 'https://prediksilumpy.streamlit.app/',

  stack: [
    'Python',
    'Random Forest',
    'Scikit-learn',
    'Machine Learning',
    'Spatial Data',
    'Streamlit',
  ],

  overview:
    'A Random Forest classification application for predicting the likelihood of Lumpy Skin Disease (LSD) in cattle using spatial and environmental factors. It combines geographic coordinates with cattle population density, vapor pressure, and minimum daily temperature to generate a prediction and probability estimate, with an interactive spatial view of reported cases.',

  recruiterPerspective:
    'Demonstrates the application of machine learning to a real-world agricultural and epidemiological problem while combining tabular prediction with geographic data visualization.',

  metrics: [
    {
      value: '24.8K',
      label: 'RECORDS',
      detail: 'Dataset containing 24,803 records',
    },
    {
      value: '20',
      label: 'VARIABLES',
      detail: 'Dataset variables covering spatial and environmental information',
    },
    {
      value: '5',
      label: 'PREDICTORS',
      detail: 'Location, cattle density, vapor pressure, and minimum temperature inputs',
    },
    {
      value: 'RF',
      label: 'MODEL',
      detail: 'Random Forest classification for tabular spatial data',
    },
  ],

  workflow: [
    'Prepare spatial and environmental dataset',
    'Process and scale predictive variables',
    'Generate LSD classification and probability estimates',
    'Visualize reported LSD cases through an interactive map',
  ],

  skills: [
    'Machine Learning',
    'Random Forest',
    'Classification',
    'Feature Scaling',
    'Spatial Data',
    'Data Cleaning',
    'Scikit-learn',
    'Streamlit',
  ],

  fullTechStack: {
    languages: ['Python'],
    libraries: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Streamlit',
    ],
    algorithms: [
      'Random Forest',
    ],
    methods: [
      'Feature Scaling',
      'Spatial Analysis',
      'Probability Estimation',
      'Data Visualization',
    ],
  },
},

  {
  id: 'carbon-emission',
  category: 'Machine Learning',
  year: '2024',
  title: 'Vehicle CO₂ Emission Prediction',
  image: '/images/emisi.jpg',
  link: 'https://prediksiemisi.streamlit.app/',

  stack: [
    'Python',
    'Scikit-learn',
    'Linear Regression',
    'Regression',
    'Streamlit',
  ],

  overview:
    'A Linear Regression application to estimate vehicle carbon dioxide (CO₂) emissions in grams per kilometer. The model uses engine size, cylinders, and city, highway, and combined fuel-consumption attributes, then presents predictions through Streamlit.',

  recruiterPerspective:
    'Demonstrates an end-to-end machine learning workflow from structured vehicle data and feature preprocessing to model inference and deployment as an interactive application.',

  metrics: [
    {
      value: '5',
      label: 'INPUT FEATURES',
      detail: 'Engine size, cylinders, city, highway, and combined fuel consumption',
    },
    {
      value: 'g/km',
      label: 'OUTPUT',
      detail: 'Estimated carbon dioxide emissions per kilometer',
    },
    {
      value: 'LR',
      label: 'MODEL',
      detail: 'Linear Regression for structured vehicle data',
    },
    {
      value: 'LIVE',
      label: 'DEPLOYMENT',
      detail: 'Interactive Streamlit application',
    },
  ],

  workflow: [
    'Collect vehicle specifications and fuel consumption data',
    'Scale the model input features',
    'Process the input through the trained prediction model',
    'Generate estimated CO₂ emissions in grams per kilometer',
  ],

  skills: [
    'Linear Regression',
    'Regression',
    'Feature Scaling',
    'Data Preprocessing',
    'Python',
    'Scikit-learn',
    'Streamlit',
    'Model Deployment',
  ],

  fullTechStack: {
    languages: ['Python'],
    libraries: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Streamlit',
    ],
    algorithms: [
      'Linear Regression',
    ],
    methods: [
      'Feature Scaling',
      'Model Inference',
      'Structured Data Processing',
    ],
  },
},

  {
  id: 'jgo',
  category: 'Mobile Application',
  year: '2024',
  title: 'J-Go — Jogja Uncovered',
  image: '/images/Jgo.png',
  link: 'https://drive.google.com/file/d/1rvvISrfV_R5q-FthAd9Tb8GrupPHUZt/view?usp=drivesdk',

  stack: [
    'Machine Learning',
    'Recommendation System',
    'TensorFlow Lite',
    'Flutter',
    'Google Cloud',
  ],

  overview:
    'J-Go (Jogja Uncovered) is a Bangkit Academy 2024 mobile application designed to help travelers discover lesser-known destinations in Yogyakarta. Built by a multidisciplinary Machine Learning, Cloud Computing, and Mobile Development team, it combines recommendations, maps, destination information, a multilingual virtual guide, and user feedback.',

  recruiterPerspective:
    'Demonstrates experience working on a multidisciplinary product that combines machine learning, recommendation systems, mobile development, and cloud technologies to address a real-world tourism problem.',

  metrics: [
    {
      value: 'ML',
      label: 'RECOMMENDATION',
      detail: 'Personalized tourism recommendation based on user context',
    },
    {
      value: 'ID + EN',
      label: 'LANGUAGES',
      detail: 'Multilingual support for Indonesian and international users',
    },
    {
      value: '5+',
      label: 'FEATURES',
      detail: 'Maps, recommendations, destination information, virtual guide, and feedback',
    },
    {
      value: '7',
      label: 'TEAM',
      detail: 'Multidisciplinary project involving ML, cloud, and mobile development',
    },
  ],

  workflow: [
    'Identify tourism accessibility and hidden-destination discovery problems',
    'Develop tourism recommendations based on user context',
    'Integrate machine learning with the mobile application',
    'Integrate cloud and application components',
    'Deploy, test, and debug the integrated system',
  ],

  skills: [
    'Machine Learning',
    'Recommendation System',
    'TensorFlow Lite',
    'Flutter',
    'Mobile Development',
    'Google Cloud',
    'Product Development',
    'System Integration',
  ],

  fullTechStack: {
    languages: [
      'Python',
    ],
    libraries: [
      'TensorFlow Lite',
    ],
    algorithms: [
      'Recommendation System',
    ],
    methods: [
      'Personalized Recommendation',
      'User Preference Analysis',
      'System Integration',
      'Mobile Application Development',
      'Cloud Deployment',
    ],
  },
},
];

const FILTERS = [
  'All',
  'Machine Learning',
  'Deep Learning',
  'Data Analysis',
];

function Metric({ metric }) {
  return (
    <div className="rounded-xl border border-[#252b3e] bg-[#0d1120] px-4 py-3">
      <p className="text-xl font-extrabold tracking-tight text-[#f8fafc] sm:text-2xl">
        {metric.value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#22d3ee]">
        {metric.label}
      </p>

      <p className="mt-1 text-[11px] leading-4 text-[#8f9ab1]">
        {metric.detail}
      </p>
    </div>
  );
}

function Workflow({ steps }) {
  const { lang } = useLanguage();

  return (
    <div className="rounded-xl border border-[#252b3e] bg-[#121728] p-4 sm:p-5">
      <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f9ab1]">
        <GitBranch className="size-3.5" />
        {lang === 'ID' ? 'Alur Kerja' : 'Workflow'}
      </p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={`${step}-${index}`} className="relative text-center">
            <span className="mx-auto grid size-7 place-items-center rounded-full bg-[#38bdf8] text-xs font-extrabold text-[#07101e] shadow-[0_0_18px_rgba(56,189,248,.45)]">
              {index + 1}
            </span>

            <p className="mt-2 text-xs font-bold text-[#e6edf8]">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isOpen, onToggle }) {
  const { lang } = useLanguage();

  return (
    <motion.article
      layout
      className="overflow-hidden rounded-2xl border border-[#283149] border-l-4 border-l-[#22d3ee] bg-[linear-gradient(135deg,#151a30,#0d1020)] shadow-[0_18px_36px_rgba(0,0,0,.26)]"
    >
      <button
        type="button"
        onClick={onToggle}
        className="block w-full p-5 text-left sm:p-6"
      >
        <div className="flex gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f8ba5]">
              {project.category} · {project.year}
            </p>

            <h3 className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-[#f8fafc] sm:text-2xl">
              {project.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-md border border-[#303850] bg-[#20253a] px-2.5 py-1 font-mono text-[10px] text-[#aebbd0]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden size-[94px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#303850] bg-[#0a0d18] sm:flex sm:size-[112px]">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                width={130}
                height={76}
                className="size-full object-cover"
              />
            ) : (
              <BrainCircuit className="size-9 text-[#67e8f9]" />
            )}
          </div>

          <span className="mt-8 grid size-8 shrink-0 place-items-center rounded-full border border-[#3b435c] text-[#b6c1d4]">
            {isOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((metric, index) => (
            <Metric
              key={`${metric.label}-${index}`}
              metric={metric}
            />
          ))}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#283149] px-5 pb-6 pt-5 sm:px-6">
              <div className="rounded-xl border border-[#1f5770] bg-[#102031] p-4">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f9ab1]">
                  <Layers3 className="size-3.5" />
                  {lang === 'ID' ? 'Ringkasan Proyek' : 'Project Overview'}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#c0cadb]">
                  {project.overview}
                </p>
              </div>

              <div className="mt-5">
                <Workflow steps={project.workflow} />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#283149] pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f9ab1]">
                    {lang === 'ID' ? 'Keahlian yang Ditunjukkan' : 'Skills Demonstrated'}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border border-[#15516d] bg-[#102435] px-3 py-1 text-[11px] font-medium text-[#67e8f9]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#2563eb]"
                  >
                    <ExternalLink className="size-4" />
                    {lang === 'ID' ? 'Buka Proyek' : 'Open Project'}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [openProject, setOpenProject] = useState(null);

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter(
          (project) => project.category === activeFilter,
        );

  return (
    <section
      id="projects"
      className="theme-section w-full bg-[#08090b] px-5 py-20 text-[#f8fafc] sm:px-8 lg:px-12 lg:py-24 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="max-w-5xl border-b border-[#2a3146] pb-6">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#b6a9d9]">
            <span className="h-px w-7 bg-[#9d4edd]" />
            {lang === 'ID' ? 'Proyek' : 'Projects'}
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[.95] tracking-[-0.06em] text-[#f8fafc] sm:text-5xl lg:text-6xl">
            {lang === 'ID' ? 'Proyek Data & AI Pilihan' : 'Selected Data & AI Projects'}
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-[#b6c1d4] sm:text-base">
            {lang === 'ID'
              ? 'Setiap proyek menampilkan fokus, pendekatan, dan teknologi yang digunakan. Klik kartu proyek untuk melihat case study lengkap.'
              : 'Each project highlights its focus, approach, and the technologies used. Click a project card to explore the complete case study.'}
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#252b3e] pb-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setOpenProject(null);
                }}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition ${
                  activeFilter === filter
                    ? 'bg-[#4c1d95] text-white'
                    : 'text-[#aebbd0] hover:bg-[#171c2c] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <p className="flex items-center gap-2 text-xs font-medium text-[#8f9ab1]">
            <BarChart3 className="size-4 text-[#a78bfa]" />
            {filteredProjects.length} {lang === 'ID' ? 'proyek' : 'projects'}
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openProject === project.id}
              onToggle={() =>
                setOpenProject((current) =>
                  current === project.id
                    ? null
                    : project.id,
                )
              }
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#7f8ba5]">
          <Sparkles className="size-3.5 text-[#a78bfa]" />
          {lang === 'ID' ? 'Pilih proyek untuk melihat case study.' : 'Select a project to view its case study.'}
        </div>
      </div>
    </section>
  );
}
