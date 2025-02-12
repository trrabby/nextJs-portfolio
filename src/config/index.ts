export const config = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.LOCAL_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    EmailJS_Service_ID: process.env.EmailJS_Service_ID,
    EmailJS_Template_ID: process.env.EmailJS_Template_ID,
    EmailJS_User_ID: process.env.EmailJS_User_ID,
  };
};
