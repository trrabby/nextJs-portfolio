import { SectionHead } from "@/components/SectionHead";
import styles from "./styles.module.css";
import LoginForm from "./_LoginForm/LoginForm";

const Login = () => {
  return (
    <div
      className={`${styles.loginImgBg} min-h-screen flex items-center justify-center px-4 bg-cover`}
    >
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
