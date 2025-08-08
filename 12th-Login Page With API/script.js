const url = "Sorry But API is personal ";

// Elements
const email = document.getElementById("Email");
const firstName = document.getElementById("First_Name");
const lastName = document.getElementById("Last");
const userName = document.getElementById("User_Name");
const phoneNumber = document.getElementById("Phone_number");
const password = document.getElementById("Password");
const conformPassword = document.getElementById("Confirm_password");
const otpCode = document.getElementById("otp_code");
const verification = document.getElementById("verification");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginOtpCode = document.getElementById("loginOtpCode");

const sendOtpButton = document.getElementById("send_otp");
const verifyOtpButton = document.getElementById("Verify_otp");
const registerButton = document.getElementById("Register");
const sendLoginOtp = document.getElementById("sendLoginOtp");
const verifyLoginOtp = document.getElementById("verifyLoginOtp");
const real_login = document.getElementById("real_login");
const real_signup = document.getElementById("real_signup");
const profileInput = document.getElementById("profileInput");
const profilePreview = document.getElementById("profilePreview");
const registerForm_design = document.getElementById("registerForm_design");
const toggle_button = document.getElementById("toggle-buttons");
const verification_btn = document.getElementById("verification_btn");


const errorBox = document.getElementById("errorBox");
const loader = document.getElementById("loader");
const ok = document.getElementById("ok");

let registerToken = "";
let loginToken = "";

// Send OTP (Register)
async function Send_OTP(email ) {
  {
  if (!email.value.trim()) return showError("Enter your email first.");
  showLoader(true);
  try {
    const res = await fetch(`${url}otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value.trim(),
        otp_type: "create",
        role: "user",
      }),
    });
    const data = await res.json();
    if (res.ok) {
      ShowOK("OTP sent successfully.");
    } else {
      showError(data.message || "Failed to send OTP.");
    }
  } catch (err) {
    showError("Error sending OTP.");
  } finally {
    showLoader(false);
  }
}
}
document.getElementById("showRegister").addEventListener("click", function () {
    if(!otpCode.value.trim()) return showError("Enter the OTP code.");
    OTP_VERIFY(email, otpCode.value.trim());
       document.getElementById("register").style.display = "block";
});
// Verify OTP (Register)
async function OTP_VERIFY(Email,OTP)  {
  if (!otpCode.value.trim()) return showError("Enter the OTP code.");
  showLoader(true);
  try {
    const res = await fetch(`${url}otp/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email.value.trim(),
        otp_code: OTP,
        otp_type: "create",
        role: "user",
      }),
    });

    const data = await res.json();
    if (res.ok) {
      registerToken = data.verification_token.join("");
      ShowOK("OTP verified.");
    } else {
      showError(data.message || "Failed to verify OTP.");
    }
  } catch (err) {
    showError("Error verifying OTP.");
  } finally {
    showLoader(false);
  }
}

document.getElementById("Register").addEventListener("click", async () => {
  if(registerToken === "") return showError("Please verify OTP first.");
  const imageFile = profileInput.files[0];
  if (!imageFile) return showError("Select a profile image.");
  if (!registerToken) return showError("Please verify OTP first.");

  const formData = new FormData();
  formData.append("role", "user");
  formData.append("email", email.value.trim());
  formData.append("phone_number", phoneNumber.value.trim());
  formData.append("password", password.value);
  formData.append("confirm_password", conformPassword.value);
  formData.append("verification_token", registerToken);
  formData.append("username", userName.value.trim());
  formData.append("first_name", firstName.value.trim());
  formData.append("last_name", lastName.value.trim());
  formData.append("image", imageFile);

  showLoader(true);
  try {
    const res = await fetch(`${url}register`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      ShowOK("Registered successfully. Now you can login by clicking the following link;");
     
    } else {
      showError(data.message || "Registration failed.");
    }
  } catch (err) {
    showError("Error while registering.");
  } finally {
    showLoader(false);
  }
});


function showLoader(show) {
  loader.style.display = show ? "block" : "none";
}

// Error Message Box
function showError(message) {
  errorBox.innerText = message;
  errorBox.style.display = "block";
  setTimeout(() => (errorBox.style.display = "none"), 10000);
}
function ShowOK(message) {
  ok.innerText = message;
  ok.style.display = "block";
  setTimeout(() => (ok.style.display = "none"), 10000);
}

// Show login page by default
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm_design").style.display = "none";
  document.getElementById("text1").style.display = "none";
  document.getElementById("showRegister").style.display = "none"; 
  verification_btn.style.display = "none";
  verification.style.display = "none";
});

// Toggle Views
document.getElementById("showlogin_text").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm_design").style.display = "none";
  document.getElementById("text2").style.display = "block";
  document.getElementById("showRegister").style.display = "none"; 
   verification_btn.style.display = "none";
  document.getElementById("showLogin").style.display = "block";
  document.getElementById("text1").style.display = "none";

 document.getElementById("showLogin").addEventListener("click", () => {
 signin();
});

});

document.getElementById("showRegister_text").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("showLogin").style.display = "none";
   verification_btn.style.display = "block";



   verification_btn.addEventListener("click", () => { 
      if (
    !email.value.trim() ||
    !userName.value.trim() ||
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !phoneNumber.value.trim() ||
    !password.value ||
    !conformPassword.value
  ) {
    return showError("Please fill all fields.");
   
  }

  if (password.value !== conformPassword.value)
    return showError("Passwords do not match.");

  const usernameRegex = /^(?!.*\s)(?=.*_)[A-Za-z0-9_]{3,}$/;
  if (!usernameRegex.test(userName.value))
    return showError("Username must have no spaces, contain _, and be at least 3 characters.");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password.value))
    return showError(
      "Password must be 8+ characters, include uppercase, lowercase, number, and special char."
    );

  const imageFile = profileInput.files[0];
  if (!imageFile) return showError("Select a profile image.");

    verification.style.display = "block";
        document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm_design").style.display = "none";
  document.getElementById("text1").style.display = "none";
  document.getElementById("showRegister").style.display = "block"; 
  verification_btn.style.display = "none";
        Send_OTP(email);


  document.getElementById("showlogin_text_2").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm_design").style.display = "none";
  document.getElementById("text2").style.display = "block";
  document.getElementById("showRegister").style.display = "none"; 
   verification_btn.style.display = "none";
  document.getElementById("showLogin").style.display = "block";
  document.getElementById("text1").style.display = "none";
  document.getElementById("text1_2").style.display = "none";
  verification.style.display = "none";
 
//  document.getElementById("showLogin").addEventListener("click", () => {

//  signin();
// });

});
   });
 
  const text2 = document.getElementById("text2");
  if (text2) text2.style.display = "none";

  document.getElementById("registerForm_design").style.display = "flex";
  document.getElementById("text1").style.display = "flex";
  document.getElementById("showRegister").style.display = "flex";
  document.getElementById("registerForm").style.display = "flex"; 

 document.getElementById("showRegister").addEventListener("click", () => {
  register_user();
 });
});
// Image Preview
profileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

 document.getElementById("showLogin").addEventListener("click", () => {
   signin();
 });

 async function signin() {
    if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
      return showError("Please enter email and password.");
    }

    showLoader(true);
    try {
      const res = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.value.trim(),
          password: loginPassword.value.trim(),
          role: "user",
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        ShowOK("Login successful.");
      }
      else{
        showError(data.message || "Login failed.");
      }
    } catch (err) {
      showError("Error logging in.");
    } finally {
      showLoader(false);
    }
  }
