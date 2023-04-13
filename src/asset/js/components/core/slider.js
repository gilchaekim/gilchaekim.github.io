import Class from '../mixin/class';
import Swiper from '../core/swiper'
import {
    $,
    $$,
    addClass,
    children,
    css,    
    append,
    attr,
    clamp,
    data,
    dimensions,
    findIndex,
    includes,
    last,
    toFloat,
    toggleClass,
    toNumber,
    hasClass,
    removeClass,
} from '../../util/index';
import {cssPrefix} from 'GC-data'

export default {
    mixins: [Class],
    props: {
        autoplay: Boolean,
        pagination:Boolean,
        paginationType:String,
        paging:Boolean,
        controller:Boolean,
    },
    data: {
        index:0,
        delay:3000,
        autoplay: false,
        slider:'.slider',
        loop:true,
        paging:false,
        Swiper:null,
        controller:false,
        pagination:false,
        paginationType:"fraction", //	'bullets' | 'fraction' | 'progressbar' | 'custom'
        pagingTemplate : `<div class="swiper_page_nav">
            <em class="current"></em>
            <em class="total"></em>
        </div>`,
        controllerTemplate:`<div class="swiper_controller">
            <button type="button" class="control_btn"><span>재생/정지</span></button>
        </div>`,
        paginationCls:'.swiper-pagination',
        paginationTemplate:`<div class="swiper_pagenation"></div>`,
    },
    beforeConnect(){
        let {autoplay, delay, pagination, paginationCls, paginationType, paginationTemplate} = this.$props;
        if(autoplay){
            autoplay = {
                delay:delay
            };
        }
        if(pagination){
            // append($(this.slider), paginationTemplate);
            append(this.$el, paginationTemplate);
            console.log(paginationCls);
            pagination = {
                el:paginationCls,
                type:paginationType
            }
        }
    },
    connected () {
        const { $el, pagingTemplate, $props, format, slider, setCurrentIndex, controller, controllerTemplate } = this;
        this.Swiper = new Swiper(slider, $props);
        if( this.paging ){
            this.paging = append($el, pagingTemplate);
            setCurrentIndex();
            $('.total', this.paging).innerHTML = format(this.Swiper.slides.length)
        }
        if( controller ){
            this.controller = append($el, controllerTemplate);
        }
        swiperEvents(this);
    },
    computed: {
        slider({slider}, $el) {
            return $(slider, $el);
        }
    },
    events: [
        {
            name: 'click',
            delegate() {
                return '.control_btn';
            },
            handler(e) {
                const btn = e.current;
                hasClass(btn, 'stop') ? this.play(btn) :  this.stop(btn);
            },
        },
    ],
    methods: {
        format(number) {
            return String(number).length === 1 ? `0${number}` : number;
        },
        play(el){
            const { Swiper } = this;
            Swiper.autoplay.start();
            removeClass(el, 'stop');
        },
        stop(el){
            const { Swiper } = this;
            Swiper.autoplay.stop();
            addClass(el, 'stop');
        },
        setCurrentIndex() {
            const { format, paging, Swiper } = this;
            const activeEl = Swiper.slides.find((el)=>hasClass(el, 'swiper-slide-active'));
            const activeIndex = Number(attr(activeEl, 'data-swiper-slide-index'))+1;
            $('.current', paging).innerHTML = format(activeIndex);
        }
    },
};


function swiperEvents(obj) {
    const { Swiper, paging, setCurrentIndex } =  obj;
    Swiper.on('slideChange', function () {
        setTimeout(()=>{
            !!paging && setCurrentIndex();
        }, 0)
    });
}