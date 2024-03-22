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


        fetch('http://localhost:3009/api/auth/register', {
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

        fetch('http://localhost:3009/api/auth/login', {
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
                return response.json();
            })
            .then(data => {
                console.log('Login Success:', data);
                window.location.href = '/tasks';
            })
            .catch((error) => {
                console.error('Login Error:', error);
            });
    });
});