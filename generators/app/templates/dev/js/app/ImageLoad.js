/**
 * Created by Dev_iMac1 on 19/04/17.
 */

function ImageLoad() {
    var sections = document.getElementsByClassName('section-element');

    var setOnload = function (section, realImageUrl) {

        var image = new Image();
        image.onload = function () {
            section.style.backgroundImage = realImageUrl;
            section.classList.remove('loading');
        };

        image.onerror = function () {
            section.style.backgroundImage = realImageUrl;
            section.classList.remove('loading');
        };

        image.src = realImageUrl;
    };

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionStyle = window.getComputedStyle(section);

        var realImageUrl = sectionStyle.backgroundImage;

        section.style.backgroundImage = 'url("/images/ring.svg")';
        section.classList.add('loading');

        setOnload(section, realImageUrl);
    }
}

module.exports = ImageLoad;
