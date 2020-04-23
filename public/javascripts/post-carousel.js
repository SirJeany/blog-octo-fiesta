'use strict';

$(document).ready(function() {
    $(".post-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        variableWidth: true,
        // prevArrow: false,
        // nextArrow: '.next-course',
        arrows: true,
        dots: true,
        pauseOnHover: true
        // responsive: [
        // {
        //     breakpoint: 900,
        //     settings: {
        //     slidesToShow: 2
        //     }
        // },
        // {
        //     breakpoint: 560,
        //     settings: {
        //     slidesToShow: 1
        //     }
        // }
        // ]
    });
});
