import Container from '../mixin/container';
import Togglable from '../mixin/togglable';
import Position from '../mixin/position';
import {
    $,
    addClass,
    removeClass,
    parent,
    hasAttr,
    isTouch,
    pointerEnter,
    pointerDown,
    pointerLeave,
    once,
    append,
    within,
    matches,
    remove,
} from '../../util';
export default {
    mixins: [Container, Togglable, Position],
    props: {
        text: String,
    },
    data: {
        text: '',
        delay:0,
        animation: ['uk-animation-scale-up'],
        duration: 5000,
        cls: 'uk-active',
    },
    connected () {
        console.log(this.text);
    },
    events: {
        focus: 'show',
        blur: 'hide',

        [`${pointerEnter} ${pointerLeave}`](e) {
            if (!isTouch(e)) {
                this[e.type === pointerEnter ? 'show' : 'hide']();
                console.log(e.type);
            }
        },

        [pointerDown](e) {
            if (isTouch(e)) {
                this.show();
                console.log(e.type);
            }
        },
    },
    methods: {
        show() {
            if (this.isToggled(this.tooltip || null) || !this.text) {
                return;
            }

            this._unbind = once(
                document,
                `show keydown ${pointerDown}`,
                this.hide,
                false,
                (e) =>
                    (e.type === pointerDown && !within(e.target, this.$el)) ||
                    (e.type === 'keydown' && e.keyCode === 27) ||
                    (e.type === 'show' && e.detail[0] !== this && e.detail[0].$name === this.$name)
            );
            clearTimeout(this.showTimer);
            this.showTimer = setTimeout(this._show, this.delay);
        },
        _show() {
            this.tooltip = append(
                this.container,
                `<div class="mui_${this.$options.name}_content">
                    <div class="mui_arrow"></div>
                    <div class="mui_${this.$options.name}_inner">${this.text}</div>
                 </div>`
            );
            on(this.tooltip, 'toggled', (e, toggled) => {
                console.log('sfsdf');
                if (!toggled) {
                    return;
                }

                this.positionAt(this.tooltip, this.$el);

                // const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);

                // this.origin =
                //     this.axis === 'y'
                //         ? `${flipPosition(dir)}-${align}`
                //         : `${align}-${flipPosition(dir)}`;
            });

            this.toggleElement(this.tooltip, true);

        },
        async hide() {
            if (matches(this.$el, 'input:focus')) {
                return;
            }

            clearTimeout(this.showTimer);

            if (!this.isToggled(this.tooltip || null)) {
                return;
            }

            await this.toggleElement(this.tooltip, false, false);
            remove(this.tooltip);
            this.tooltip = null;
            this._unbind();
        },
    }
};
