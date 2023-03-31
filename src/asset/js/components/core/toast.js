import {
    $, 
    append,
    find,
    css,
} from '../../util/index';
export default {
    props: { 
        text: String,
    },
    data: {
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
    },
    computed:{
        $text({text}, $el){
            return find('.toast', $el).innerHTML = text;
        }
    },
    connected(){
        this.show();
    },
    methods: {
        show() {
            css(this.$text)
        },
        hide() {
            setTimeout(this.$destroy(true), 5000);
        },
        build() {

        }
    }
};
