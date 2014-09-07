(function (window) {
    'use strict';

    function SimpleSwipe(elId, callback, minSwipeLength) {
        this.el = document.getElementById(elId);
        this.callback = callback;
        this.minSwipeLength = minSwipeLength || this.minSwipeLength;
        this.addListeners();
    }

    SimpleSwipe.prototype = {
        el: undefined,
        callback: undefined,
        minSwipeLength: 72,
        startX: undefined,
        startY: undefined,
        endX: undefined,
        endY: undefined,
        getAngle: function (x0, y0, x1, y1) {
            function mod(a, n) { return ((a % n) + n) % n; }
            var r = Math.atan2(y1 - y0, x0 - x1); // radians
            return mod(Math.round(r * 180 / Math.PI), 360); // degrees
        },
        getDirection: function (angle) {
            return (angle >= 315 || angle <= 45) ? 'left'
                : (angle > 45 && angle < 135) ? 'down'
                    : (angle >= 135 && angle <= 225) ? 'right'
                        : 'up';
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
                this.endX = event.touches[0].pageX;
                this.endY = event.touches[0].pageY;
            } else {
                this.touchCancel();
            }
        },
        touchEnd: function (event) {
            event.preventDefault();
            var swipeLength = Math.round(Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2)));
            var angle = this.getAngle(this.startX, this.startY, this.endX, this.endY);
            if (swipeLength >= this.minSwipeLength) {
                this.callback(this.getDirection(angle), this.el);
            }
            this.touchCancel();
        },
        touchCancel: function () {
            delete this.startX;
            delete this.startY;
            delete this.endX;
            delete this.endY;
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
