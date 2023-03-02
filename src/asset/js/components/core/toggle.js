import Lazyload from '../mixin/lazyload';
import Media from '../mixin/media';
import Togglable from '../mixin/togglable';

import {
    $, 
    addClass, 
    removeClass, 
    toggleClass, 
    hasClass, 
    isFocusable, 
    Dimensions, 
    height, 
    isVisible, 
    width, 
    toNodes, 
    findAll, 
    queryAll, 
    attr, 
    isBoolean, 
    includes, 
    trigger,
    observeIntersection
} from '../../util/index';
import {cssPrefix} from 'GC-data'
export default {
    mixins: [Lazyload, Togglable],
    props: {
        href: String,
        target: null,
        mode: 'list',
        queued: Boolean,
    },
    data: {
        target: false,
        href: false,
        mode: 'click',
        queued: false,
        cont: `.${cssPrefix}toggle-cont`,
        activeClass: `${cssPrefix}active`
    },

    computed: {
        target: {
            get({ href, target }, $el) {
                target = queryAll(target || href, $el);
                return (target.length && target) || [$el];
            },

            watch() {
                this.updateAria();
                this.lazyload(this.$el, this.target);
            },

            document: true,
            immediate: true,
        },
    },
    
    connected() {
        if (!includes(this.mode, 'media') && !isFocusable(this.$el)) {
            attr(this.$el, 'tabindex', '0');
        }
    },

    events: [
        {
            name: 'click',

            filter() {
                return ['click', 'hover'].some((mode) => includes(this.mode, mode));
            },
            handler(e) {
                console.log(e)
                e.preventDefault();
                this.toggle();
                // this.toggleElement(e.current);
            }
        }
    ],

    methods: {
        async toggle(type) {
            if (!trigger(this.target, type || 'toggle', [this])) {
                return;
            }

            if (!this.queued) {
                return this.toggleElement(this.target);
            }

            const leaving = this.target.filter((el) => hasClass(el, this.clsLeave));

            if (leaving.length) {
                for (const el of this.target) {
                    const isLeaving = includes(leaving, el);
                    this.toggleElement(el, isLeaving, isLeaving);
                }
                return;
            }

            const toggled = this.target.filter(this.isToggled);
            await this.toggleElement(toggled, false);
            await this.toggleElement(
                this.target.filter((el) => !includes(toggled, el)),
                true
            );
        },

        updateAria(toggled) {
            if (includes(this.mode, 'media')) {
                return;
            }

            attr(
                this.$el,
                'aria-expanded',
                isBoolean(toggled) ? toggled : this.isToggled(this.target)
            );
        },
    }
};
