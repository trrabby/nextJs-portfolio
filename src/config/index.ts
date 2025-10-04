export const config = () => ({
  Backend_URL: process.env.NEXT_PUBLIC_Backend_URL,
  EmailJS_Service_ID: process.env.NEXT_PUBLIC_EmailJS_Service_ID,
  EmailJS_Template_ID: process.env.NEXT_PUBLIC_EmailJS_Template_ID,
  EmailJS_User_ID: process.env.NEXT_PUBLIC_EmailJS_User_ID,
  Recaptcha_Client_Key: process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY,
  Recaptcha_Server_Key: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY,
  Google_Client_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
  Google_Client_Secret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
  Github_Client_ID: process.env.NEXT_GITHUB_CLIENT_ID,
  Github_Client_Secret: process.env.NEXT_GITHUB_CLIENT_SECRET,
});
