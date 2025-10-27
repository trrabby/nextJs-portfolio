import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import RegisterForm from "./_registerForm/RegisterForm";
import bgImage from "../../../../../public/portfolioAssets/4.webp"; // Use the same bg image

const Register = () => {
  return (
    <section className="relative lg:py-20 min-h-screen flex items-center justify-center bg-slate-900">
      {/* --- Background Image with Overlay --- */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          quality={90}
          placeholder="blur"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      </div>

      {/* --- Main Content Card --- */}
      <div className="relative w-full max-w-5xl mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Left Section - Welcome Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12 text-white">
            <div className="space-y-6">
              {/* Brand */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h1 className=" flex gap-1 text-2xl font-bold text-white">
                    Towfiq <span className="text-accent">Verse</span>
                  </h1>
                  <p className="text-blue-200 text-sm">Join Our Community</p>
                </div>
              </div>

              {/* Heading */}
              <SectionHead
                title="Create Account"
                titleColor="text-white"
                special="Start your journey with us"
                specialColor="text-blue-200"
              />

              {/* Description */}
              <p className="text-lg text-blue-100 text-justify leading-relaxed">
                Join thousands of creators and professionals who are already
                building amazing things with our platform.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-white">Get started in minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    </svg>
                  </div>
                  <span className="text-white">
                    Full access to all features
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white">Secure & reliable platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Register Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl shadow-2xl p-8 lg:p-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Get Started
              </h2>
              <p className="text-blue-100">Create your account in seconds</p>
            </div>

            {/* Register Form */}
            <RegisterForm />

            {/* Additional Links */}
            <div className="text-center mt-8 space-y-3 pt-6 border-t border-white/10">
              <p className="text-blue-100 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-white font-semibold hover:text-blue-200 transition-colors underline"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-blue-100 text-xs">
                By registering, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
