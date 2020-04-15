'use strict'

const heroImageDiv = document.getElementById('heroImage');
let imgH = heroImageDiv.offsetHeight;
let imgW = heroImageDiv.offsetWidth;
let heroImage = document.createElement('img');

heroImage.setAttribute('src', `http://unsplash.it/${imgW}/${imgH}`);
heroImageDiv.appendChild(heroImage);
