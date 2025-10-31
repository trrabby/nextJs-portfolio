/* eslint-disable react/no-unescaped-entities */
// components/HireMePage.tsx
import Link from "next/link";
import { CheckCircle, Code, Zap, Shield, Smartphone, Bug } from "lucide-react";

const HireMePage = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "MERN Stack Development",
      description:
        "Full-stack web applications using MongoDB, Express.js, React, and Node.js",
      features: [
        "Custom web application development",
        "RESTful API development",
        "Database design & optimization",
        "User authentication & authorization",
        "Real-time features implementation",
        "Payment gateway integration",
      ],
      price: "Starting at $50",
      delivery: "3-5 days delivery",
      revisions: "Unlimited revisions",
      fiverrLink:
        "https://www.fiverr.com/towfiqueomar/create-mern-stack-technology-based-website",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Next.js Responsive Development",
      description:
        "High-performance, SEO-optimized websites using Next.js with responsive design",
      features: [
        "Server-side rendering (SSR) & Static site generation (SSG)",
        "Mobile-first responsive design",
        "SEO optimization",
        "Performance optimization",
        "TypeScript integration",
        "Modern UI/UX implementation",
      ],
      price: "Starting at $40",
      delivery: "2-4 days delivery",
      revisions: "Unlimited revisions",
      fiverrLink:
        "https://www.fiverr.com/towfiqueomar/create-responsive-website-using-nextjs",
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Website Bug Fixing",
      description:
        "Comprehensive debugging and issue resolution for existing websites",
      features: [
        "JavaScript/TypeScript bug fixes",
        "CSS styling issues resolution",
        "Performance issues debugging",
        "Cross-browser compatibility",
        "Responsive design fixes",
        "Code optimization & refactoring",
      ],
      price: "Starting at $20",
      delivery: "1-2 days delivery",
      revisions: "Unlimited revisions",
      fiverrLink: "https://www.fiverr.com/towfiqueomar/fix-bug-of-your-website",
    },
  ];

  const technologies = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Material-UI",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "AWS",
    ],
    tools: ["Git", "Docker", "Jest", "Cypress", "Webpack", "Vite"],
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Hire Me for Your Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional full-stack developer specializing in MERN stack,
            Next.js, and bug fixing. Let's bring your ideas to life with clean,
            efficient, and scalable code.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Service Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.price}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
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

              {/* Service Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>🚀 {service.delivery}</span>
                  <span>🔄 {service.revisions}</span>
                </div>
                <Link
                  href={service.fiverrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center block"
                >
                  Order Now on Fiverr
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Technologies I Work With
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Frontend
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {technologies.frontend.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Backend
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {technologies.backend.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Code className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Tools & Testing
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {technologies.tools.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Let's discuss your requirements and create something amazing
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.fiverr.com/towfiqueomar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Visit My Fiverr Profile
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Directly
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💼 100% Satisfaction Guaranteed | ⚡ Fast Delivery | 🔒 Secure
            Payments
          </p>
        </div>
      </div>
    </section>
  );
};

export default HireMePage;
