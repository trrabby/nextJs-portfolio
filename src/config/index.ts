export const config = () => {
  return {
    URL: process.env.VITE_LOCAL_URL,
    EmailJS_Service_ID: process.env.VITE_EmailJS_Service_ID,
    EmailJS_Template_ID: process.env.VITE_EmailJS_Template_ID,
    EmailJS_User_ID: process.env.VITE_EmailJS_User_ID,
  };
};
