import Class from '../mixin/class';
import sliderDrag from '../mixin/slider-drag';

import {
    $,
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
    mixins: [Class, sliderDrag],
    props: {
        clsActivated: Boolean,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number,
        selSlides: String,
    },
    computed: {
        selSlides({$el}) {
            return $el;
        }
    }
};