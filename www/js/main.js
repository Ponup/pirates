
requirejs.config({
    baseUrl: 'js',
    paths: {
    },
    shim: {
    }
});

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        requirejs(['game']);
    }
};

app.initialize();

