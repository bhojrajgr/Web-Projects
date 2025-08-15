// Interactive Form Validation

const form = document.querySelector('form');
const fields = [
  { id: 'name', validate: value => value.trim() !== '', message: 'Name is required.' },
  { id: 'email', validate: value => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value), message: 'Enter a valid email.' },
  { id: 'password', validate: value => value.length >= 6, message: 'Password must be at least 6 characters.' },
  { id: 'phone number', validate: value => /^\d{10,}$/.test(value.replace(/\D/g, '')), message: 'Enter a valid phone number.' },
  { id: 'address', validate: value => value.trim() !== '', message: 'Address is required.' }
];

// Password strength meter

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
let strengthMeter, strengthBar, strengthText;
if (!document.getElementById('password-strength')) {
  strengthText = document.createElement('div');
  strengthText.className = 'strength-text';
  strengthMeter = document.createElement('div');
  strengthMeter.className = 'strength-meter';
  strengthBar = document.createElement('div');
  strengthBar.className = 'strength-bar';
  strengthMeter.appendChild(strengthBar);
  passwordError.parentNode.insertBefore(strengthText, passwordError.nextSibling);
  passwordError.parentNode.insertBefore(strengthMeter, strengthText.nextSibling);
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 10) score++;
  if (score <= 1) return { text: 'Weak', color: '#e53e3e', width: '33%' };
  if (score <= 3) return { text: 'Medium', color: '#f6ad55', width: '66%' };
  return { text: 'Strong', color: '#38a169', width: '100%' };
}

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  if (val.length === 0) {
    strengthText.textContent = '';
    strengthBar.style.width = '0';
    strengthBar.style.background = '#eee';
    strengthMeter.classList.remove('active');
    strengthText.classList.remove('active');
    return;
  }
  const strength = getPasswordStrength(val);
  strengthText.textContent = `Strength: ${strength.text}`;
  strengthBar.style.width = strength.width;
  strengthBar.style.background = strength.color;
  strengthMeter.classList.add('active');
  strengthText.classList.add('active');
});

// Email format feedback
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
emailInput.addEventListener('input', () => {
  const val = emailInput.value;
  if (val.length === 0) {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    return;
  }
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  } else {
    emailError.textContent = 'Enter a valid email.';
    emailInput.classList.add('invalid');
  }
});

fields.forEach(field => {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.id.replace(/\s/g, '-') + '-error');
  input.addEventListener('blur', () => {
    if (!field.validate(input.value)) {
      error.textContent = field.message;
      input.classList.add('invalid');
    } else {
      error.textContent = '';
      input.classList.remove('invalid');
    }
  });
  input.addEventListener('focus', () => {
    error.textContent = '';
    input.classList.remove('invalid');
  });
});

form.addEventListener('submit', function(e) {
  let valid = true;
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.id.replace(/\s/g, '-') + '-error');
    if (!field.validate(input.value)) {
      error.textContent = field.message;
      input.classList.add('invalid');
      valid = false;
    } else {
      error.textContent = '';
      input.classList.remove('invalid');
    }
  });
  if (!valid) {
    e.preventDefault();
    document.getElementById('form-success').textContent = '';
  } else {
    e.preventDefault();
    document.getElementById('form-success').textContent = 'Form submitted successfully!';
    form.reset();
    strengthMeter.textContent = '';
    setTimeout(() => {
      document.getElementById('form-success').textContent = '';
    }, 3000);
  }
});
