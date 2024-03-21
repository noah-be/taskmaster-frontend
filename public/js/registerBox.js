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
