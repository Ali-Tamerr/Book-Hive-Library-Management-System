## 2025-03-27 - [Fix Account Enumeration in Login]
**Vulnerability:** The login API leaked user existence (Account Enumeration) by returning distinct error messages ("User not found" vs "Incorrect password"). It also logged the attempted email addresses via `console.error` during login failures, exposing PII in the browser console.
**Learning:** Returning specific error messages for invalid login attempts allows attackers to verify which email addresses are registered in the system. Logging failed login attempts with PII to the client-side console exposes sensitive information.
**Prevention:** Always use generic error messages like "Invalid email or password." for both username and password failures. Never log PII or sensitive operation details to the client-side console.
