define(function(require) {
   
    if(AdMob) {
        var config = require('config');

        AdMob.createBanner({
            adId: config.admobAdId,
            position: AdMob.AD_POSITION.TOP_CENTER,
            autoShow: true,
            isTesting: config.admobTesting 
        });
    }

    var tolerance = 30;

    var positions = [
        [ 501, 393 ],
        [ 492, 231 ],
        [ 150, 843 ],
        [ 579, 1062 ],
        [ 825, 1497 ],
        [ 534, 1407 ],
        [ 615, 606 ],
    ];

    var attempts = 0;

    var okImage = new Image();
    okImage.src = 'img/ok.png';
    var koImage = new Image();
    koImage.src = 'img/ko.png';

    var fullHeight = 1906;
    var leftPirate = document.getElementById('leftPirate');
    var rightPirate = document.getElementById('rightPirate');
    var imageHeight = leftPirate.clientHeight;
    var scale = imageHeight/fullHeight;
    positions = positions.map(function(point) { return [ point[0] * scale, point[1] * scale ]; });

    function around(value, against, margin) {
        return ( against - margin ) <= value && value <= ( against + margin );
    }

    function nearPosition(x, y, point) {
        return around(x, point[0], tolerance) && around(y, point[1], tolerance);
    }

    function addMark(pirate, type, x, y) {
        var image = new Image();
        image.src = 'img/' + type + '.png';
        image.style.left = ( x - tolerance ) + 'px';
        image.style.top = ( y - tolerance ) + 'px';
        image.style.position = 'absolute';
        image.style.width = tolerance * 2 + 'px';
        image.style.height = tolerance * 2 + 'px';
        pirate.appendChild(image);
    }

    var onClick = function(ev) {
        if(ev.target.className != 'pirate') {
            return;
        }
        if(attempts >= positions.length) {
            return;
        }

        attempts++;

        var x = ev.offsetX,
            y = ev.offsetY;
        for(var i = 0; i < positions.length; i++) {
            if(nearPosition(x, y, positions[i])) {
                addMark(rightPirate, 'ok', x, y);
                addMark(leftPirate, 'ok', x, y);
                return;
            }    
        }
        addMark(leftPirate, 'ko', x, y);
        addMark(rightPirate, 'ko', x, y);
    };

    leftPirate.addEventListener('click', onClick, false);
    rightPirate.addEventListener('click', onClick, false);
});
