import {
    $, 
    append,
    find,
    css,
    includes,
    dimensions,
    height,
    Transition
} from '../../util/index';

const active = [];

export default {
    props: { 
        text: String,
        duration:Number,
        aniSpped:Number,
    },
    data: {
        duration:5000,
        aniSpped:300,
        margin:10,
        gravity:'bottom',
        position:40,
        template: `
        <div class="toast_pop_wrap">
            <p class="toast"></p>
        </div>
        `,
        text:null,
        $text:null,
        isClose:false
    },
    created(){
        const $el = $(this.template);
        this.$mount(append(document.body, $el));
        find('.toast', $el).innerHTML = this.text;
    },
    connected(){
        this.show();
    },
    methods: {
        show() {
            const { gravity, position, margin } = this;
            Transition.start(css(this.$el, {"opacity":'.5', [gravity] : position - 40}), {
                opacity:1,
                [gravity]: position
            }, this.aniSpped).then(()=>{
                this.hide();
            })
            if(active.length){
                for (let i = active.length -1; i >= 0; i--) {
                    this.pushing(active[i], i)
                }
            }
            active.push(this);
        },
        hide() {
            setTimeout(()=> {
                Transition.start(css(this.$el, {"opacity":'1'}), {
                    opacity:0
                }, this.aniSpped).then(()=>{
                    if (includes(active, this)) {
                        active.splice(active.indexOf(this), 1);
                    }
                    this.$destroy(true);
                })
            }, this.duration);
        },
        pushing(el, n) {
            const {gravity} = this;
            const {$el, margin, position} = el;
            const oldHeight = height($el) + margin ;
            const newPostion = oldHeight + position;
            Transition.start(css($el, {[gravity]:position}), {
                [gravity]: oldHeight + position
            }, this.aniSpped)
            el.position = newPostion;
        }
    }
};