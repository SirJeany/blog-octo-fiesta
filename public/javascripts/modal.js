// https://www.w3schools.com/howto/howto_css_modal_images.asp
'use strict';

const myModal = document.getElementById('myModal');

if(myModal) {
    let projectImg = document.getElementById('projectImg');
    let modalImg = document.getElementById('img01');
    let captionText = document.querySelector('.modal-image-caption');

    projectImg.onclick = function() {
        console.log(this)
        myModal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

    // Close button
    let spanClose = document.querySelector('.modal-close');
    // Close the modal:
    spanClose.onclick = function() { myModal.style.display = "none"; }
}