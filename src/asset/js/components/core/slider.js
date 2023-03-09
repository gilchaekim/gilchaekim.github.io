import Class from '../mixin/class';
import SliderDrag from '../mixin/slider-drag';
// import SliderNav from '../mixin/slider-nav';
import Transitioner from '../internal/slider-transitioner'
import {
    $,
    $$,
    addClass,
    children,
    css,    
    append,
    attr,
    data,
    dimensions,
    findIndex,
    includes,
    last,
    toFloat,
    toggleClass,
    toNumber,
    hasClass,
} from '../../util/index';
import {cssPrefix} from 'GC-data'

export default {
    mixins: [Class],
    props: {
        index: Number,
        autoplay: Number,
        arrows: Boolean,
        dots: Boolean,
        infinite: Boolean,
        centered: Boolean,
        verticl: Boolean
    },
    data: {
        index:0,
        slContainer:'.mui_slide_container',
        slLists:'.mui_slide_list',
        slItems:'.mui_slide_items',
        slNav:'.mui_slider_nav',
        clsActive:'.mui_active',
        autoplay:0,
        arrows:true,
        arrowsHTML:`<div class="mui_slider_controls">
            <button type="button" class="mui_arrows mui_prev" mui-action="prev"><span>이전</span></button>
            <button type="button" class="mui_arrows mui_next" mui-action="next"><span>다음</span></button>
        </div>`,
        dotsHTML:`<div class="mui_slider_dots">
            <div class="mui_slider_inner"></div>
        </div>`,
        dots:false,
        infinite:false,
        centered:false,
        Transitioner,
        // <button type="button" class="mui_dot" mui-item="1"></button>
    },
    beforeConnect () {
        const { arrowsHTML } = this;
        this.arrows = !!this.arrows && append(this.$el, arrowsHTML);
    },
    computed: {
        slides({slLists}, $el) {
            console.log(slLists);
            return $$(slLists, $el);
        },
        maxLength() {
            return this.slides.length;
        },
        wrapper({slContainer}, $el) {
            return $(slContainer, $el)
        }
    },
    events: [
        {
            name: 'click',

            delegate() {
                return '.mui_arrows';
            },

            handler(e) {
                const action = attr(e.current, 'mui-action');
                this.show(action);
                console.log(this.wrapper);
            },
        },
    ],
    methods: {
        show(action) {
            console.log(action);
        }
    }
};