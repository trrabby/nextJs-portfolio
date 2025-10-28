/* eslint-disable react/no-unescaped-entities */
import { StaticImageData } from "next/image";

// Local asset imports
import nextImg from "../../public/portfolioAssets/skill-icon/next.png";
import reactRouter from "../../public/portfolioAssets/skill-icon/react-router.svg";
import expressImg from "../../public/portfolioAssets/skill-icon/express.png";
import githubImg from "../../public/portfolioAssets/skill-icon/github-logo.png";
import redux from "../../public/portfolioAssets/skill-icon/redux-svgrepo-com.svg";
import ts from "../../public/portfolioAssets/skill-icon/typescript-official-svgrepo-com.svg";
import mongoose from "../../public/portfolioAssets/skill-icon/mongoose.png";
import nextAuth from "../../public/portfolioAssets/skill-icon/nextAuth.png";
import daisi from "../../public/portfolioAssets/skill-icon/daisi.png";
import shadcn from "../../public/portfolioAssets/skill-icon/shadcn.png";
import antd from "../../public/portfolioAssets/skill-icon/antdesign.png";

// Skill Icons Export Object
export const skillIcons: { [key: string]: string | StaticImageData } = {
  // Programming Languages
  JavaScript:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  TypeScript: ts,

  // Frontend Frameworks
  React:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
  "Next.js": nextImg,
  "Redux/RTK Query": redux,
  "React Router DOM": reactRouter,

  // UI Libraries & Styling
  HTML: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
  CSS: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
  "Tailwind CSS":
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  "Material UI": "https://mui.com/static/logo.png",
  "Ant Design": antd,
  DaisyUI: daisi,
  "shadcn/ui": shadcn,

  // Backend & Runtime
  "Node.js":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
  "Express.js": expressImg,

  // Database & ORM
  MongoDB:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
  Mongoose: mongoose,
  PostgreSQL: "https://www.postgresql.org/media/img/about/press/elephant.png",
  Prisma: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",

  // Authentication & Security
  Firebase: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  "NextAuth.js": nextAuth,
  JWT: "https://jwt.io/img/pic_logo.svg",
  OAuth: "https://oauth.net/images/oauth-logo-square.png",

  // Development Tools
  Git: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
  GitHub: githubImg,
  Figma: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
};

// Helper function to get icon by skill name
export const getSkillIcon = (skillName: string): string | StaticImageData => {
  return skillIcons[skillName] || skillIcons["React"]; // Fallback to React icon
};

// Type for skill names for better TypeScript support
export type SkillName = keyof typeof skillIcons;

export default skillIcons;
