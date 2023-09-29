import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Enter your email and password below":
        "Enter your email and password below",
        "Log In to Dashboard Kit": "Log In to Dashboard Kit",
        "Forgot Password?": "Forgot Password?",
        "Password must be at least 8 characters": "Password must be at least 8 characters",
        "Login": "Login",
        "Don't have an account?": "Don't have an account?",
        "Sign Up":"Sign Up",
        "Overview": "Overview",
        "Tickets": "Tickets",
        "Ideas": "Ideas",
        "Contacts": "Contacts",
        "Agents": "Agents",
        "Articles": "Articles",
        "Settings": "Settings",
        "Subscription": "Subscription",
    },
  },
  id: {
    translation: {
      "Enter your email and password below": "Masukan email dan password anda",
      "Log In to Dashboard Kit": "Masuk Ke Dashboard Kit",
      "Forgot Password?": "Lupa Password?",
      "Password must be at least 8 characters": "Password setidaknya harus 8 karakter",
      "Login": "Masuk",
      "Don't have an account?": "Tidak memiliki akun?",
      "Sign Up": "Daftar",
      "Overview": "Ringkasan",
      "Tickets": "Tiket",
      "Ideas": "Ide",
      "Contacts": "Kontak",
      "Agents": "Agen",
      "Articles": "Artikel",
      "Settings": "Pengaturan",
      "Subscription": "Langganan",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
