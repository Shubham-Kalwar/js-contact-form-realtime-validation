document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Real-time validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        const errorIcon = nameInput.nextElementSibling;

        if (name === '') {
            showError(nameError, errorIcon, 'Full name is required.');
            return false;
        } else if (name.length < 2) {
            showError(nameError, errorIcon, 'Name must be at least 2 characters long.');
            return false;
        } else {
            hideError(nameError, errorIcon);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const errorIcon = emailInput.nextElementSibling;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === '') {
            showError(emailError, errorIcon, 'Email address is required.');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, errorIcon, 'Please enter a valid email address.');
            return false;
        } else {
            hideError(emailError, errorIcon);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        const errorIcon = messageInput.nextElementSibling;

        if (message === '') {
            showError(messageError, errorIcon, 'Message is required.');
            return false;
        } else if (message.length < 10) {
            showError(messageError, errorIcon, 'Message must be at least 10 characters long.');
            return false;
        } else {
            hideError(messageError, errorIcon);
            return true;
        }
    }

    // Helper functions to show/hide errors
    function showError(errorElement, iconElement, message) {
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
        iconElement.style.opacity = '1';
    }

    function hideError(errorElement, iconElement) {
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
        iconElement.style.opacity = '0';
    }

    // Add event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');

            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
                // Hide any remaining error icons
                document.querySelectorAll('.error-icon').forEach(icon => {
                    icon.style.opacity = '0';
                });
                document.querySelectorAll('.error-message').forEach(msg => {
                    msg.style.opacity = '0';
                });
            }, 3000);
        }
    });
});