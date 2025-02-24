import { addClass } from './class';
import {$, $$, append, remove} from './dom';



export async function countdown(selector, count) {
    const timer = 1000;
    let SETTIMER = null;
    const targetCls = 'timer_num';
    const template = `<div class="cont">
        <div class="spinner"></div>
        <span class="number">
            <i class="${targetCls}"></i>
        </span>
    </div>`
    let cn = count;
    return new Promise((resolve, reject) => {
        const countElement = append(selector, template);
        const target = $(`.${targetCls}`, countElement);
        const audio = new Audio('/audio/clock-clock-sound-clock-clock-time-10343.mp3');
        audio.play();
        target.innerHTML = cn;
        SETTIMER = setInterval(() => {
            if (cn === 0) {
                clearInterval(SETTIMER);
                remove(countElement);
                audio.pause();
                resolve();
            }else{
                target.innerHTML = --cn;
            }
        }, timer);
    })
}


export async function showAnswer(selector, text, audioSrc, delay = 0) {
    const effectAnswer = '/audio/sound_answer.mp3'
    const template = `<div class="answer">
        <p class=" qu_answer">${text}</p>
    </div>`
    
    return new Promise((resolve, reject) => {
        // const countElement = append(selector, template);
        const sliderWrap = $('#quizSlider').uiComponents.slider.Swiper;
        const activeIndex = sliderWrap.activeIndex;
        const slides = $$('.lists.swiper-slide');
        const objList = $$('.obj li', slides[activeIndex]);
        console.log(objList);
        if (!!objList) {
            objList.forEach((el)=>{
                const textAnswer = $('.text', el).innerHTML;
                if (text.indexOf(textAnswer) !== -1) {
                    addClass(el, 'answer-box');
                }
            })
        }

        const audio = new Audio(effectAnswer);
        const answerAudio = new Audio(audioSrc);
        audio.play();
        audio.onended = () =>{
            answerAudio.play();
        }
        answerAudio.onended = () =>{
            setTimeout(()=>{  
                resolve();
                // remove(countElement);
            }, delay)
        }

    })
}


export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}