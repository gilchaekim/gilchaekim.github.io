import { $, $$, append, dimensions, attr } from '../../util/index';
export default {

    props: {},

    data: {
        WIDTH: 0,
        HEIGHT: 0,
        canvas: '',
        con: '',
        g: '',
        pxs: [],
        numberObject: 8e3,
        numberBall: 80,
        pulsion: 16,
        speedX: 5,
        speedY: 2,
        colorRect: "rgba(255,255,255,",
        opacityRect: .4,
        rint: 30,
        radius: 100,
    },
    connected() {
        const { $el } = this;
        this.canvasElement = append($el, $('<canvas class="bg"></canvas>'));
        this.canvas = this.canvasElement.getContext("2d");
        this.WIDTH = dimensions($el).width
        this.HEIGHT = dimensions($el).height;
        attr(this.canvasElement, "width", this.WIDTH)
        attr(this.canvasElement, "height", this.HEIGHT)
        this.render();
    },
    methods: {
        BrowserDetection() {
            if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var e = new Number(RegExp.$1);
                rint = 10;
                pulsion = 3
            } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var t = new Number(RegExp.$1);
                rint = 50;
                pulsion = 16
            } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var n = new Number(RegExp.$1);
                rint = 50;
                pulsion = 16
            } else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var r = new Number(RegExp.$1);
                rint = 50;
                pulsion = 16
            } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var i = new Number(RegExp.$1);
                rint = 50;
                pulsion = 16
            }
            WIDTH = window.innerWidth;
            if (WIDTH < 1024) {
                numberObject = 19e3;
                numberBall = 10;
                pulsion = 2;
                rint = 10
            }
        },
        // draw() {
        //     const {
        //         WIDTH,
        //         HEIGHT,
        //         pxs,
        //     } = this;
        //     this.canvas.clearRect(0, 0, WIDTH, HEIGHT);
        //     // console.log(pxs)
        //     for (let i = 0; i < pxs.length; i++) {
        //         pxs[i].fade();
        //         pxs[i].move();
        //         pxs[i].draw()
        //     }
        // },
        render() {
            const {
                WIDTH,
                HEIGHT,
                numberObject,
                // canvas,
                // pxs,
                numberBall,
                colorRect,
                opacityRect,
                rint,
                speedX,
                speedY,
                radius,
                pulsion,
            } = this;
            // let {
            //     g
            // } = this;
            // let g;

            // console.log(WIDTH)
            // console.log(HEIGHT)
            function draw() {
                con.clearRect(0, 0, WIDTH, HEIGHT);
                for (var e = 0; e < pxs.length; e++) {
                    pxs[e].fade();
                    pxs[e].move();
                    pxs[e].draw()
                }
            }
            function Circle() {
                this.s = {
                    ttl: numberObject,
                    xmax: speedX,
                    ymax: speedY,
                    rmax: radius,
                    rt: pulsion,
                    xdef: 960,
                    ydef: 540,
                    xdrift: 4,
                    ydrift: 4,
                    random: true,
                    blink: true
                };
                this.reset = function() {
                    this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
                    this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
                    this.r = (this.s.rmax - 1) * Math.random() + 1;
                    this.dx = Math.random() * this.s.xmax * (Math.random() < .5 ? -1 : 1);
                    this.dy = Math.random() * this.s.ymax * (Math.random() < .5 ? -1 : 1);
                    this.hl = this.s.ttl / rint * (this.r / this.s.rmax);
                    this.rt = Math.random() * this.hl;
                    this.s.rt = Math.random() + 1;
                    this.stop = Math.random() * .2 + .4;
                    this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
                    this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1)
                };
                this.fade = function() {
                    this.rt += this.s.rt
                };
                this.draw = function() {
                    if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
                    else if (this.rt >= this.hl) this.reset();
                    var e = 1 - this.rt / this.hl;
                    con.beginPath();
                    con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
                    con.closePath();
                    var t = this.r * e;
                    g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, t <= 0 ? 1 : t);
                    g.addColorStop(1, colorRect + e * opacityRect + ")");

                    con.fillStyle = g;
                    con.fill()
                };
                this.move = function() {
                    // const WIDTH = window.innerWidth;
                    // const HEIGHT = window.innerHeight;
                    this.x += this.rt / this.hl * this.dx;
                    this.y += this.rt / this.hl * this.dy;
                    if (this.x > WIDTH || this.x < 0) this.dx *= -1;
                    if (this.y > HEIGHT || this.y < 0) this.dy *= -1
                };
                this.getX = function() {
                    return this.x
                };
                this.getY = function() {
                    return this.y
                }
            }

            // var WIDTH;
            // var HEIGHT;
            var canvas;
            var con;
            var g;
            var pxs = new Array;
            // var numberObject = 8e3;
            // var numberBall = 10;
            // var pulsion = 16;
            // var speedX = 5;
            // var speedY = 2;
            // var colorRect = "rgba(255,255,255,";
            // var opacityRect = .2;
            // var rint = 30;
            // var radius = 68;

            // WIDTH = window.innerWidth;
            // HEIGHT = window.innerHeight;
            // canvas = this.canvasElement;


            con = this.canvas;

            for (let i = 0; i < numberBall; i++) {
                pxs[i] = new Circle;
                pxs[i].reset();
            }

            setInterval(draw, rint);
        },

    }
};