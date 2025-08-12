
const url = "SORRY I Can't Show this ";


const email = document.getElementById("loginEmail");
const password = document.getElementById("Password");
const confirm_password = document.getElementById("Confirm_password");
const otpCode = document.getElementById("otp_code");

const verification_btn = document.getElementById("verification_btn");
const verifyOtp_btn = document.getElementById("verify_otp");
const next_btn = document.getElementById("next_btn");
const Change_Password = document.getElementById("new_password");

const errorBox = document.getElementById("errorBox");
const loader = document.getElementById("loader");
const ok = document.getElementById("ok");

let registerToken = "";
let loginToken = "";


// Show login page by default
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("verification").style.display = "none";
  document.getElementById("registerForm_design").style.display = "none"; 
});

   verification_btn.addEventListener("click", () => {
    if(!email.value.trim()) {
        return showError("Please enter your email.");
    }
    if(email.value.trim()) {
        Send_OTP(email);
    }
    
});

verifyOtp_btn.addEventListener("click", async () => {
     
  if (!otpCode) {
    return showError("Please enter the OTP code.");
  }
  OTP_VERIFY(email, otpCode);
});

next_btn.addEventListener("click",async ()=>{

  if(!OTP_VERIFY){
     return showError("Verify OTP First.");
  }
  document.getElementById("loginForm").style.display = "none";
        document.getElementById("toggle-buttons").style.display = "none";
  document.getElementById("verification").style.display = "none";
  document.getElementById("registerForm_design").style.display = "block";
  document.getElementById("registerForm").style.display = "flex";
});

Change_Password.addEventListener("click", async () => {

  if (
    !password ||
    !confirm_password
  ) {
    return showError("Please fill all fields.");
  }

  if (password.value !== confirm_password.value)
    return showError("Passwords do not match.");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password.value))
    return showError(
      "Password must be 8+ characters, include uppercase, lowercase, number, and special char."
    );
showLoader(true);
   ChangePassword(password, confirm_password);

});
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
        otp_type: "forgot",
        role: "user",
      }),
    });
    const data = await res.json();
    if (res.ok) {
      ShowOK("OTP sent successfully.");
         document.getElementById("loginForm").style.display = "none";
        document.getElementById("toggle-buttons").style.display = "none";
        document.getElementById("verification").style.display = "block";
        document.getElementById("registerForm_design").style.display = "none";
  
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

// Verify OTP (Register)
async function OTP_VERIFY(Email, OTP) {
  if (!OTP.value.trim()) return showError("Enter the OTP code.");
  showLoader(true);
  try {
    const res = await fetch(`${url}otp/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email.value.trim(),
        otp_code: OTP.value.trim(),
        otp_type: "forgot",
        role: "user",
      }),
    });
    
    
    const data = await res.json();
    if (res.ok) {
      registerToken = data.verification_token.join("");
     
      ShowOK("OTP verified.");
      document.getElementById("next_btn").style.display = "block";  
    } else {
      showError(data.message || "Failed to verify OTP.");
    }
  } catch (err) {
    showError("Error verifying OTP.");
  } finally {
    showLoader(false);
  }
}



async function ChangePassword(password, confirm_password)  {
  try {
    const res = await fetch(`${url}profile/password/reset`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password.value.trim(),
        confirm_password: confirm_password.value.trim(),
        verification_token: registerToken,
        role: "user",
      }),
    });

    const data = await res.json();
    if (res.ok) {
      ShowOK("Password changed successfully.");
      document.getElementById("logi").style.display = "block";
    } else {
      showError(data.message || "Failed to change password.");
    }
  } catch (err) {
    showError("Error changing password.");
  } finally {
    showLoader(false);
  }
}



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
