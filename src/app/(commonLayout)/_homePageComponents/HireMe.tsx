/* eslint-disable react/no-unescaped-entities */
// components/HireMePage.tsx
import {
  CheckCircle,
  Code,
  Smartphone,
  Bug,
  Database,
  Server,
  Gauge,
} from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import HireMeContacts from "./_hireMeContacts/HireMeContacts";

const HireMePage = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full Stack Website",
      headerColor: "from-indigo-500 to-purple-600",
      description:
        "Full-stack web applications using PostgreSQL, MongoDB, Express.js, React and Node.js.",
      features: [
        "Custom web application development",
        "RESTful API creation",
        "Database design & optimization",
        "User authentication & authorization",
        "Real-time functionality",
        "Payment gateway integration i.e. Stripe/SSL Commerz etc",
      ],
      price: "Starting at $100",
      delivery: "Delivery starts from 5 days",
      revisions: "Unlimited revisions",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Next.js Website",
      headerColor: "from-blue-500 to-cyan-500",
      description:
        "High-performance, SEO-optimized websites using Next.js with modern responsive layouts.",
      features: [
        "SSR & SSG implementation",
        "Mobile-first responsive design",
        "SEO & performance optimization",
        "TypeScript integration",
        "Modern UI/UX implementation",
        "User authentication & authorization",
        "Dynamic routing & API setup",
      ],
      price: "Starting at $100",
      delivery: "Delivery starts from 5 days",
      revisions: "Unlimited revisions",
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Website Bug Fixing",
      headerColor: "from-rose-500 to-pink-500",
      description:
        "Comprehensive debugging and issue resolution for existing websites.",
      features: [
        "Frontend & backend bug fixes",
        "CSS and layout correction",
        "Performance debugging",
        "Cross-browser compatibility",
        "Responsive adjustments",
        "Code refactoring",
        "Feature enhancements",
      ],
      price: "Starting at $30",
      delivery: "1-2 days delivery",
      revisions: "Unlimited revisions",
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend Development",
      headerColor: "from-emerald-500 to-teal-500",
      description:
        "Efficient, secure and scalable backend systems to power your applications.",
      features: [
        "Node.js & Express.js API development",
        "Authentication & JWT handling",
        "Real-time communication with Socket.io",
        "Error handling & validation",
        "Microservices architecture",
        "Server security best practices",
      ],
      price: "Starting at $60",
      delivery: "Delivery starts from 5 days",
      revisions: "Unlimited revisions",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database & Integrations",
      headerColor: "from-orange-500 to-yellow-500",
      description:
        "Robust database setup and third-party API integrations for seamless workflows.",
      features: [
        "MongoDB & PostgreSQL design",
        "Database normalization & indexing",
        "Cloud database setup (Firebase/AWS)",
        "Third-party API integration",
        "Data migration & backup",
        "Optimized query performance",
      ],
      price: "Starting at $60",
      delivery: "3-5 days delivery",
      revisions: "Unlimited revisions",
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Performance Optimization",
      headerColor: "from-yellow-500 to-lime-500",
      description:
        "Boost your website speed, reduce load times, and enhance SEO ranking.",
      features: [
        "Lighthouse performance improvements",
        "Lazy loading & code splitting",
        "Image & asset optimization",
        "Server-side caching strategies",
        "Minification & compression setup",
        "Core Web Vitals enhancement",
      ],
      price: "Starting at $50",
      delivery: "3-5 days delivery",
      revisions: "Unlimited revisions",
    },
  ];

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          title="Services I Offer"
          para="Professional full-stack developer specializing in Full stack,
            Next.js, backend systems and performance optimization."
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Colorful Header */}
              <div
                className={`p-6 bg-gradient-to-r ${service.headerColor} text-white flex items-center gap-4`}
              >
                <div className="p-2 bg-white/20 rounded-lg">{service.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm opacity-90">{service.price}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>🚀 {service.delivery}</span>
                  <span>🔄 {service.revisions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="my-12 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💼 100% Satisfaction Guaranteed | ⚡ Fast Delivery | 🔒 Secure
            Payments
          </p>
        </div>

        <HireMeContacts />
      </div>
    </section>
  );
};

export default HireMePage;
