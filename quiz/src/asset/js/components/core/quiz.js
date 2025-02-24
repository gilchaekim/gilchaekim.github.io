import Class from '../mixin/class';
import { default as Togglable, toggleHeight } from '../mixin/togglable';
import {
    $,
    $$,
    attr,
    index,
    append,
    countdown,
    showAnswer,
    Transition
} from '../../util';

export default {


    props: {
        subject: Boolean,
        isIntro: Boolean,
        answerDelay: Number,
        paging:Boolean,
        endMsg:Boolean,
    },

    data: {
        wrapper: '.swiper-wrapper',
        subject: false,
        isIntro: false,
        intro:'.intro',
        answerDelay:0,
        paging:false,
        endMsg:true,
        bgm:false,
    },

    computed: {
        wrapper({ wrapper }, $el) {
            return $(wrapper, $el)
        },
        inrto({ intro }) {
            return $(intro)
        },
    },
    created() {
        const that = this;
        window.quizFinished = false;
        fetch(`/src/python/${this.getJson()}`)
            .then(res => res.json())
            .then(function(res) {
                that.steps = res;
                if (that.endMsg) {
                    that.steps.push({
                        endMsg: '풀어보고 싶은 상식퀴즈 분야가 있다면 댓글로 남겨주세요!'
                    })                    
                }

                if (that.subject) {
                    that.makeHTMLSubject(res);
                } else {
                    that.makeHTML(res);
                }

                that.slider = GCui.slider(that.$el);
                setTimeout(() => {
                    that.start();
                }, 2000)


            })
    },
    connected() {
        if (this.bgm) {
            this.playAudio('/audio/bgm-shot2.mp3', null, .2, .8);
        }
    },

    events: [

        {

            name: 'click',

            el() {
                return document.documentElement;
            },

            handler(e) {
                e.preventDefault();
                // GCui.util.countdown('#contents', 3)
            }

        }

    ],

    methods: {
        async start() {
            console.log(this.isIntro);
            if (this.isIntro) {
                await this.intro();
            }
            for (let i = 0; i < this.steps.length; i++) {
                await this.play(this.steps[i], i);
                console.log(`사이클 ${i + 1} 끝`);
            }
            window.quizFinished = true;
        },
        async play(step, index) {
            const { subject, answerDelay } = this;
            const defaultpath = '/src/python/'
            console.log(index);
            return new Promise(async (resolve) => {
                if (!!step.endMsg) {
                    await this.playAudio('/audio/end_msg2.wav');
                    this.slider.Swiper.slideNext();
                } else {

                    if (subject) {
                        // 주관식
                        const qAudio = `${defaultpath}${step.question.audio}`;
                        const aAudio = `${defaultpath}${step.anwer.audio}`;
                        await this.playAudio(qAudio);
                        await countdown('#contents', 3)
                        await this.delay(500);
                        await showAnswer('#contents', step.anwer.text, aAudio, answerDelay)
                        await this.delay(500);
                        if (this.isIntro) {
                            if (this.steps.length - 1 === index) {
                                await this.delay(1000);
                            }else{
                                this.slider.Swiper.slideNext();
                            }
                            
                        }else{
                            this.slider.Swiper.slideNext();
                        }
                        if (this.steps.length - 1 !== index) {
                            await this.delay(1000);
                        }
                    } else {
                        // 객관식   
                        const qAudio = `${defaultpath}${step.question.audio}`;
                        const qu1Audio = `${defaultpath}${step.qu1.audio}`;
                        const qu2Audio = `${defaultpath}${step.qu2.audio}`;
                        const qu3Audio = `${defaultpath}${step.qu3.audio}`;
                        const aAudio = `${defaultpath}${step.anwer.audio}`;
                        await this.playAudio(qAudio);
                        // await this.playAudio(qu1Audio);
                        // await this.playAudio(qu2Audio);
                        // await this.playAudio(qu3Audio);
                        await countdown('#contents', 3)
                        await this.delay(500);
                        await showAnswer('#contents', step.anwer.text, aAudio);
                        
                        await this.delay(500);
                        if (this.isIntro) {
                            console.log(index);
                            if (this.steps.length - 1 === index) {
                                await this.delay(1000);
                            }else{
                                this.slider.Swiper.slideNext();
                            }
                            
                        }else{
                            if (this.steps.length - 1 === index) {
                                await this.delay(1000);
                            }else{
                                this.slider.Swiper.slideNext();
                            }
                        }
                        if (this.steps.length - 1 !== index) {
                            await this.delay(1500);
                        }
                    }
                }


                // 사이클 끝
                resolve();
            });
        },
        playAudio(src, duration = null, volume = 1, playbackRate=1) {
            return new Promise(resolve => {
                let audio = new Audio(src);
                
                audio.play();
                audio.volume = volume;
                audio.playbackRate = playbackRate;
                
                if (!!duration) {
                    let mutedTimer = duration / 5;
                    const timer = duration - mutedTimer;
                    setTimeout(()=>{
                        let interval = setInterval(()=>{
                            if (audio.volume < 0.2) {
                                clearInterval(interval);
                            }
                            console.log(audio.volume);
                            audio.volume = audio.volume - .1;
                        }, 100)
                    }, timer)
                    setTimeout(()=>{
                        audio.pause();
                        resolve();
                    }, duration)
                }else{
                    audio.onended = () => {
                        resolve();
                    }
                }

            });
        },
        makeHTML(json) {
            const { wrapper } = this;
            console.log(wrapper);
            const list = json;
            let str = ''
            for (let i = 0; i < list.length; i++) {
                const qu = list[i];
                if (!!qu.endMsg) {
                    str += `<div class="lists swiper-slide">
                        <div class="end_msg">
                            <p>${qu.endMsg}</p>
                        </div>
                    </div>`
                } else {
                    str += `<div class="lists swiper-slide">
                        <div class="quiz_type1">
                            <p class="title">${i + 1}번, ${qu.question.text}</p>
                            <ul class="obj">
                                <li>
                                    <span class="num">1.</span>
                                    <p class="text">${qu.qu1.text}</p>
                                </li>
                                <li>
                                    <span class="num">2.</span>
                                    <p class="text">${qu.qu2.text}</p>
                                </li>
                                <li>
                                    <span class="num">3.</span>
                                    <p class="text">${qu.qu3.text}</p>
                                </li>
                            </ul>
                        </div>
                    </div>`;
                }

            }

            append(wrapper, str)
        },
        makeHTMLSubject(json) {
            const { wrapper } = this;
            console.log(wrapper);
            const list = json;
            let str = ''
            for (let i = 0; i < list.length; i++) {
                const qu = list[i];
                if (!!qu.endMsg) {
                    str += `<div class="lists swiper-slide">
                        <div class="end_msg">
                            <p>${qu.endMsg}</p>
                        </div>
                    </div>`
                } else {
                    str += `<div class="lists swiper-slide">
                        <div class="quiz_type1">
                            <p class="title">${i + 1}번, ${qu.question.text}</p>
                            <div class="subject">
                                ${this.getSubjectLetter(qu.hint.text)}
                            </div>
                        </div>
                    </div>`;
                }

            }

            append(wrapper, str)
        },
        getSubjectLetter(str) {
            const hint = str;
            const dvd = hint.split('|');
            let html = '';
            for (let i = 0; i < dvd.length; i++) {
                const str = dvd[i];
                if (str.indexOf('/') !== -1) {
                    const str2 = str.split('/');
                    for (let j = 0; j < str2.length; j++) {
                        const str = str2[j];
                        html+=mkgroup(str, 'box');    
                    }
                }else{
                    html+=mkgroup(str);
                }
            }

            function mkgroup(str, cls = null) {
                let html = '';
                if (str.indexOf('[') !== -1 && str.indexOf('/') === -1) {
                    html+=`<span class="${!!cls ? cls : 'hint-text'}">${str.replaceAll('[', '').replaceAll(']', '')}</span>\n`
                }else{
                    const letters = str.split('')
                    for (let i = 0; i < letters.length; i++) {
                        html+=`<span class="letter-box">${letters[i]}</span>\n`
                    }
                }
                return html;
            }

            return html;
            
            
            // if (hint) {
                
            // }
            // for (let j = 0; j < hint.length; j++) {
            //     str += `<span>${hint[j]}</span>`
            // }
        },
        getJson() {
            const urlParams = new URL(location.href).searchParams;
            console.log(urlParams);
            return urlParams.get('json');
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async intro() {
            await await this.playAudio('/audio/bgm1.mp3', 5000);
            return new Promise((resolve, reject) => {
                Transition.start(this.inrto, {
                    opacity:0,
                    left: '-100%'
                }, 500).then(()=>{
                    // this.hide();
                    resolve();
                })

                
            })
        }

    }

};