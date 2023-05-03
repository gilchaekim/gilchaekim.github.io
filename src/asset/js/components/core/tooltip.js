import {
    $,
    addClass,
    removeClass,
    parent,
    hasAttr
} from '../../util';
export default {
    props: {
        text: String,
    },
    data: {
        text: '',
    },
    connected () {
        console.log(this.text);
    },
    events: [
        {
            name: 'focusin',
            handler(e) {
                this.show()
            }
        },
        {
            name: 'focusout',
            handler(e) {
                this.hide()
            }
        }
    ],
    methods: {
        show() {

        },
        hide() {
            
        }
    }
};
