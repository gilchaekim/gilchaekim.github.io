import Class from '../mixin/class';
import SliderDrag from '../mixin/slider-drag';
import SliderNav from '../mixin/slider-nav';
import {
    $,
    $$,
    addClass,
    children,
    css,    
    data,
    dimensions,
    findIndex,
    includes,
    last,
    toFloat,
    toggleClass,
    toNumber,
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
        dots:false,
        infinite:false,
        centered:false,
    },
    beforeConnect () {
        const {arrows} = this;
        console.log(arrows);
        css(this.$el, 'background', "#0f0");

    },
    computed: {
        slides({slLists}, $el) {
            console.log(slLists);
            return $$(slLists, $el);
        },
        maxLength() {
            return this.slides.length;
        }
    },
    events: [
        {
            name: 'click',

            // delegate() {
            //     return this.selSlides;
            // },

            handler(e) {
                console.log(this.maxLength);
            },
        },
    ],
    methods: {
        show() {

        }
    }
};