/* eslint-disable react/no-unescaped-entities */

import { SectionHead } from "@/components/SectionHead";
import { ContactForm } from "./_ContactsForm/ContactsForm";

export const Contacts = () => {
  return (
    <section className="relative mt-10 py-20 min-h-screen flex items-center justify-center  transition-colors duration-700">
      <div className="relative w-full max-w-5xl mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* --- Left Section: Intro Text --- */}
          <div className="flex flex-col justify-center p-8 lg:p-12 rounded-2xl shadow-xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md border border-gray-300 dark:border-slate-700 transition-all">
            <div className="space-y-6">
              {/* Logo or Icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/40">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 4h20v16H2z M4 8l8 5 8-5" />
                  </svg>
                </div>
                <div>
                  <h1 className="flex gap-1 lg:text-2xl font-bold text-gray-800 dark:text-white text-nowrap">
                    Towfiq <span className="text-accent">Verse Support</span>
                  </h1>
                </div>
              </div>

              {/* Heading */}
              <SectionHead
                title="Get In Touch"
                titleColor="text-gray-900 dark:text-white text-2xl"
                special="Would love to hear from you"
                specialColor="text-gray-600 dark:text-gray-300"
              />

              {/* Description */}
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                Have a question, suggestion, or partnership idea? Send a message
                and I'll get back to you as soon as possible. Whether you're a
                client or collaborator, I value your words.
              </p>

              {/* Highlights */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">
                    Fast response time
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8l9 6 9-6M3 16l9 6 9-6" />
                    </svg>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">
                    Direct communication
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Section: Contact Form --- */}
          <div className="rounded-2xl shadow-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-8 lg:p-10 transition-all">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form and we’ll get in touch
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
