import { SectionHead } from "@/components/SectionHead";
import styles from "../login/styles.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import RegisterForm from "./_registerForm/RegisterForm";

const Register = () => {
  return (
    <div
      className={`${styles.loginImgBg} bg-fixed min-h-screen flex items-center justify-center px-4 bg-cover relative py-5`}
    >
      {/* Return/Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-white/30 transition text-white"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Home</span>
      </Link>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-center space-y-2">
        {/* Section Head */}
        <SectionHead
          title="CREATE ACCOUNT"
          titleColor="text-accent"
          special="Join us today — it only takes a moment!"
          specialColor="text-gray-800 pt-2"
        />

        {/* Register Form */}
        <div className="mt-0">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
