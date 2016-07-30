define(function(require) {
        
    var config = require('config');
   
    if(AdMob) {
        AdMob.createBanner({
            adId: config.admobAdId,
            position: AdMob.AD_POSITION.TOP_CENTER,
            autoShow: true,
            isTesting: config.admobTesting 
        });
    }

    var positions = [
        [ 501, 393 ],
        [ 492, 231 ],
        [ 150, 843 ],
        [ 579, 1062 ],
        [ 825, 1497 ],
        [ 534, 1407 ],
        [ 615, 606 ],
    ];

	var basePath = ( 'Android' === device.platform || 'android' === device.platform ? '/android_asset/www/' : '' );
	var tapSound = new Media(basePath + 'audios/tap.wav');

    var attempts = 0;

    var okImage = new Image();
    okImage.src = 'img/ok.png';
    var koImage = new Image();
    koImage.src = 'img/ko.png';

    var leftPirate = document.getElementById('leftPirate'),
        rightPirate = document.getElementById('rightPirate');

    var fullWidth = 974,
        fullHeight = 1906;

    var scaledWidth = leftPirate.clientWidth,
        scaledHeight = leftPirate.clientHeight;

    var scalew = scaledWidth / fullWidth;
    var scaleh = scalew;

    var tolerance = 100 * scaleh;

    positions = positions.map(function(point) { return [ point[0] * scalew, point[1] * scaleh ]; });

    if(config.debug) {
        positions.forEach(function(pos) {
            addMark(leftPirate, 'ko', pos[0], pos[1]);
            addMark(rightPirate, 'ko', pos[0], pos[1]);
        });
    }

    function around(value, against, margin) {
        return ( against - margin ) <= value && value <= ( against + margin );
    }

    function nearPosition(x, y, point) {
        return around(x, point[0], tolerance) && around(y, point[1], tolerance);
    }

    function addMark(pirate, type, x, y) {
        var parentLeft = pirate.offsetLeft,
            parentTop = pirate.offsetTop;
        var image = new Image();
        image.src = 'img/' + type + '.png';
        image.style.left = ( parentLeft + ( x - tolerance ) ) + 'px';
        image.style.top = ( parentTop + ( y - tolerance ) ) + 'px';
        image.style.position = 'absolute';
        image.style.width = tolerance * 2 + 'px';
        image.style.height = tolerance * 2 + 'px';
        pirate.appendChild(image);
    }

    var onClick = function(ev) {
        if(ev.target.className != 'pirate-img') {
            return;
        }

        if(attempts >= positions.length) {
            return;
        }

        tapSound.play();

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
