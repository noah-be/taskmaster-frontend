var modal = document.getElementById('registerBox');
var link = document.getElementById("registerBtn");
var span = document.getElementsByClassName("close")[0];



function toggleModal() {
    var elementsToBlur = document.querySelectorAll('main, header, footer');

    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
        elementsToBlur.forEach(el => el.classList.add('blurred-background'));
    } else {
        modal.style.display = 'none';
        elementsToBlur.forEach(el => el.classList.remove('blurred-background'));
    }
}

link.onclick = function (event) {
    event.preventDefault();
    toggleModal();
}

span.onclick = function () {
    toggleModal();
}

window.onclick = function (event) {
    if (event.target == modal) {
        toggleModal();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signUpBtn').addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;


        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = '/tasks';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });



    document.getElementById('loginBtn').addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.text();
            })
            .then(message => {
                console.log(message);

                window.location.href = '/tasks';
            })
            .catch((error) => {
                console.error('Login Error:', error);
            });

    });

    document.getElementById('registerUsername').addEventListener('input', function () {
        const username = this.value;
        const feedbackElement = document.getElementById('usernameFeedback');

        if (username.length < 3) {
            feedbackElement.textContent = 'Username must be at least 3 characters';
            feedbackElement.style.color = 'red';
            return;
        }


        fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (data.isAvailable) {
                    feedbackElement.textContent = '';
                } else {
                    feedbackElement.textContent = 'Username is already taken';
                    feedbackElement.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                feedbackElement.textContent = 'Error checking username';
                feedbackElement.style.color = 'red';
            });

        updateSignUpButtonState();
    });

    document.getElementById('registerPassword').addEventListener('input', function () {
        const password = this.value;
        const passwordFeedback = document.getElementById('passwordFeedback');

        // Check the length
        if (password.length < 8) {
            passwordFeedback.textContent = 'Password must be at least 8 characters long';
            passwordFeedback.style.color = 'red';
            return;
        }

        // Check for a mix of upper and lower case letters
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            passwordFeedback.textContent = 'Password must include both upper and lower case letters';
            passwordFeedback.style.color = 'red';
            return;
        }

        // Check for numbers
        if (!/\d/.test(password)) {
            passwordFeedback.textContent = 'Password must include at least one number';
            passwordFeedback.style.color = 'red';
            return;
        }

        // Check for special characters
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordFeedback.textContent = 'Password must include at least one special symbol like !, @, #, etc.';
            passwordFeedback.style.color = 'red';
            return;
        }

        // All checks passed
        passwordFeedback.textContent = '';
        updateSignUpButtonState();
    });

    document.getElementById('toggleGuidelinesBtn').addEventListener('click', function () {
        const guidelines = document.getElementById('registrationGuidelines');
        if (guidelines.style.display === 'none' || guidelines.style.display === '') {
            guidelines.style.display = 'block';
            this.textContent = 'Hide Registration Guidelines';
        } else {
            guidelines.style.display = 'none';
            this.textContent = 'Show Registration Guidelines';
        }
    });

    function updateSignUpButtonState() {
        const usernameFeedback = document.getElementById('usernameFeedback').textContent;
        const passwordFeedback = document.getElementById('passwordFeedback').textContent;
        const signUpButton = document.getElementById('signUpBtn');

        signUpButton.disabled = usernameFeedback !== '' || passwordFeedback !== '';
    }


});



