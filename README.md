# 📬 Contact Us Module

A responsive, atomic, and modular Contact Us workflow built using React + Material UI (MUI). It includes user form submission, OTP verification, and a confirmation success message — all managed using reusable components and clean state logic.

---

## 🚀 Features

- ✅ **Atomic Components** — Each part (Form, OTP, Success) is modular.
- ✅ **Step-Based Flow** — FORM → OTP → SUCCESS handled via state-driven flow.
- ✅ **Reusable Modal** — Central `GeneralModal` for all steps.
- ✅ **Data Persistence** — Form input retained across steps (optional: `localStorage`).
- ✅ **Responsive UI** — Mobile & desktop friendly using MUI breakpoints.
- ✅ **Custom Hook (`useFetch`)** — Simplified API calls.
- ✅ **Clean UX** — OTP auto-focus, inline validations, smooth transitions.
- ✅ **ToggleIcon** — Smart navbar icon toggler (☰ / ❌) with clean UI behavior.

---

## Folder Structure

* `src`: Source code folder  
  + `components`: React components folder  
    - `Contact`: Contact section components  
      * `ContactForm.jsx`: 📝 User input form  
      * `OtpVerification.jsx`: 🔐 OTP input and verification logic  
      * `OtpSuccessMessage.jsx`: ✅ Success thank-you screen  
      * `OtpInputGroup.jsx`: 🔢 OTP input container (4/6 boxes)  
      * `SingleOtpInput.jsx`: 🔲 Individual OTP input box  
    - `Modal`:  
      * `GeneralModal.jsx`: 📦 Reusable modal wrapper  
    - `Navbar`:  
      * `Navbar.jsx`: 🧭 Top navigation bar  
      * `ToggleIcon.jsx`: ☰ / ❌ mobile toggle icon  
  + `hooks`:  
    - `useFetch.js`: 🔄 Custom API hook  
  + `utils`:  
    - `constants.js`: 🌐 API endpoints, codes  
    - `maskEmail.js`: ✉️ Email masking helper  

* `public`: Public assets folder  
* `docs`: Documentation folder  
* `tests`: Unit tests folder  


---


## ⚙️ Technologies Used

- React
- Material UI (MUI)
- Custom Hooks (`useFetch`)
- LocalStorage (optional)
- Clean CSS-in-JS (`sx`)

---

## 📌 How It Works

1. **User opens modal** via `Contact Us` button.
2. **Fills form** → Data is stored in `contactData`.
3. **OTP is sent** → User enters 4-digit code.
4. **OTP is verified** → Final success screen is shown.
5. (Optional) **Data persists** across steps via state/localStorage.

---

## ✨ How to Use

```bash
npm install
npm start
