import { SectionHead } from "@/components/SectionHead";
import styles from "./styles.module.css";
import LoginForm from "./_LoginForm/LoginForm";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

const Login = () => {
  return (
    <div
      className={`${styles.loginImgBg} min-h-screen flex items-center justify-center px-4 bg-cover relative`}
    >
      {/* Return/Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-white/30 transition"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Home</span>
      </Link>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-center space-y-2">
        {/* Section Head */}
        <SectionHead
          title="SIGN IN"
          titleColor="text-accent"
          special="Access awaits you — let’s get started."
          specialColor="text-gray-800 pt-2"
        />

        {/* Login Form */}
        <div className="mt-0">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
