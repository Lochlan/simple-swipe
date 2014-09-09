(function (window) {
    'use strict';

    function SimpleSwipe(elId, callbackMove, callbackEnd) {
        this.el = document.getElementById(elId);
        this.callbackMove = callbackMove;
        this.callbackEnd = callbackEnd;
        this.addListeners();
    }

    SimpleSwipe.prototype = {
        el: undefined,
        callbackMove: undefined,
        callbackEnd: undefined,
        startX: undefined,
        startY: undefined,
        x: undefined,
        y: undefined,
        getAngle: function () {
            function mod(a, n) { return ((a % n) + n) % n; }
            var r = Math.atan2(this.y - this.startY, this.startX - this.x); // radians
            return mod(Math.round(r * 180 / Math.PI), 360); // degrees
        },
        getDirection: function () {
            var angle = this.getAngle();
            return (angle >= 315 || angle <= 45) ? 'left'
                : (angle > 45 && angle < 135) ? 'down'
                    : (angle >= 135 && angle <= 225) ? 'right'
                        : 'up';
        },
        getLength: function () {
            var length = Math.round(Math.sqrt(Math.pow(this.x - this.startX, 2) + Math.pow(this.y - this.startY, 2)));
            return isNaN(length) ? 0 : length;
        },
        touchStart: function (event) {
            event.preventDefault();
            if (event.touches.length === 1) {
                this.startX = event.touches[0].pageX;
                this.startY = event.touches[0].pageY;
            } else {
                this.touchCancel();
            }
        },
        touchMove: function (event) {
            event.preventDefault();
            if (event.touches.length === 1) {
                this.x = event.touches[0].pageX;
                this.y = event.touches[0].pageY;
                if (this.callbackMove) {
                    this.callbackMove({
                        direction: this.getDirection(),
                        length: this.getLength(),
                    }, this.el);
                }
            } else {
                this.touchCancel();
            }
        },
        touchEnd: function (event) {
            event.preventDefault();
            if (this.callbackEnd) {
                this.callbackEnd({
                    direction: this.getDirection(),
                    length: this.getLength(),
                }, this.el);
            }
            this.touchCancel();
        },
        touchCancel: function () {
            delete this.startX;
            delete this.startY;
            delete this.x;
            delete this.y;
        },
        handleEvent: function (event) {
            switch (event.type) {
            case 'touchcancel':
                this.touchCancel();
                break;
            case 'touchend':
                this.touchEnd(event);
                break;
            case 'touchleave':
                this.touchCancel();
                break;
            case 'touchmove':
                this.touchMove(event);
                break;
            case 'touchstart':
                this.touchStart(event);
                break;
            }
        },
        addListeners: function () {
            this.el.addEventListener('touchcancel', this);
            this.el.addEventListener('touchend', this);
            this.el.addEventListener('touchleave', this);
            this.el.addEventListener('touchmove', this);
            this.el.addEventListener('touchstart', this);
        },
        removeListeners: function () {
            this.el.removeEventListener('touchstart', this);
            this.el.removeEventListener('touchend', this);
            this.el.removeEventListener('touchcancel', this);
            this.el.removeEventListener('touchleave', this);
            this.el.removeEventListener('touchmove', this);
        },
    };

    window.SimpleSwipe = SimpleSwipe;
}(window));
