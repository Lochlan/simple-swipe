(function (window) {
    'use strict';

    function SimpleSwipe(el, callbackMove, callbackEnd) {
        this.el = el;
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
        prevX: undefined,
        prevY: undefined,
        x: undefined,
        y: undefined,
        getAngle: function (x0, y0, x1, y1) {
            x0 = x0 || this.startX;
            y0 = y0 || this.startY;
            x1 = x1 || this.x;
            y1 = y1 || this.y;
            function mod(a, n) { return ((a % n) + n) % n; }
            var r = Math.atan2(y1 - y0, x0 - x1); // radians
            return mod(Math.round(r * 180 / Math.PI), 360); // degrees
        },
        getDirection: function (angle) {
            angle = angle || this.getAngle();
            return (angle >= 315 || angle <= 45) ? 'left'
                : (angle > 45 && angle < 135) ? 'down'
                    : (angle >= 135 && angle <= 225) ? 'right'
                        : 'up';
        },
        getLength: function (x0, y0, x1, y1) {
            x0 = x0 || this.startX;
            y0 = y0 || this.startY;
            x1 = x1 || this.x;
            y1 = y1 || this.y;
            var length = Math.round(Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)));
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
                this.prevX = this.x;
                this.prevY = this.y;
                this.x = event.touches[0].pageX;
                this.y = event.touches[0].pageY;
                if (this.callbackMove) {
                    this.callbackMove({
                        event: event,
                        direction: this.getDirection(),
                        directionLast: this.getDirection(this.getAngle(this.prevX, this.prevY)),
                        length: this.getLength(),
                        lengthLast: this.getLength(this.prevX, this.prevY),
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
                    event: event,
                    direction: this.getDirection(),
                    length: this.getLength(),
                }, this.el);
            }
            this.touchCancel();
        },
        touchCancel: function () {
            delete this.startX;
            delete this.startY;
            delete this.prevX;
            delete this.prevY;
            delete this.x;
            delete this.y;
        },
        handleEvent: function (event) {
            switch (event.type) {
                case 'touchmove':
                    this.touchMove(event);
                    break;
                case 'touchstart':
                    this.touchStart(event);
                    break;
                case 'touchend':
                    this.touchEnd(event);
                    break;
                case 'touchcancel':
                    this.touchCancel();
                    break;
                case 'touchleave':
                    this.touchCancel();
                    break;
            }
        },
        addListeners: function () {
            for(var i = 0; i < this.el.length; i++) {
                this.el[i].addEventListener('touchcancel', this);
                this.el[i].addEventListener('touchend', this);
                this.el[i].addEventListener('touchleave', this);
                this.el[i].addEventListener('touchmove', this);
                this.el[i].addEventListener('touchstart', this);
            }
        },
        removeListeners: function () {
            for(var i = 0; i < this.el.length; i++) {
                this.el[i].removeEventListener('touchcancel', this);
                this.el[i].removeEventListener('touchend', this);
                this.el[i].removeEventListener('touchleave', this);
                this.el[i].removeEventListener('touchmove', this);
                this.el[i].removeEventListener('touchstart', this);
            }
        },
    };

    window.SimpleSwipe = SimpleSwipe;
}(window));
