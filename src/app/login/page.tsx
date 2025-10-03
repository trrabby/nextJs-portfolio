import { SectionHead } from "@/components/SectionHead";
import styles from "./styles.module.css";
import LoginForm from "./_LoginForm/LoginForm";

const Login = () => {
  return (
    <div
      className={`${styles.loginImgBg} bg-center bg-cover flex flex-col min-h-screen items-center justify-center AdminLogin`}
    >
      <SectionHead
        title={"GET IN AND ENJOY ENDLESS OPPORTUNITIES"}
        titleColor="text-third"
        special={
          "If You are just a watcher. Leave this page soon. You are getting tracked."
        }
        specialColor="text-red-500 animate-pulse pt-2"
      ></SectionHead>
      <div className="flex flex-col lg:flex-row items-center justify-center text-center w-full">
        <div className="lg:w-6/12 rounded-lg mb-5 lg:mt-5 flex flex-col items-center justify-center text-center  ">
          <div className="w-full rounded-lg mb-5 mt-5 flex flex-col items-center justify-center text-center">
            <div className="w-full mx-auto flex flex-col items-center justify-center  text-white backdrop-blur-lg p-5 min-h-[calc(100vh-270px)] rounded-xl space-y-2 font-extrabold md:my-5 shadow-lg shadow-accent ">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
