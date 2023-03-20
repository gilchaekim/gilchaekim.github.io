import {
    each,
    isArray,
    append,
} from '../../util';
export default {

    props: {
        data: Object
    },

    data: {
        data: null,
        buildData: [],
        idName:"treeId",
        str:"",
        index:0,
    },

    connected(){
        const {$el, build} = this;
        console.log(build());
        append($el, build())
        
    },


    computed: {
        // data({data}) {
        //     return this.build(data);
        // }
    },

    events: [
        {

            name: 'click',

            handler(e) {
                e.preventDefault();                
            }
        },
        {

            name: 'scroll',

            el: window,

            handler() {

                // this.$emit('resize');

            }

        }
    ],

    methods: {
        build(){
            const { data } = this.$props;
            return this.sortData(data, 0);
        },
        indent(n) {
            const str = '\t';
            let indent = '';
            for (let i = 1; i < n; i++) {
                indent+=str
            }
            return indent;
        },
        sortData(data, index){
            const deps = ++index;
            let str = ''
            
            each(data, (data, key) => {
                let idIndex = this.index++;
                if (!isArray(data)) {
                    // str+=`${this.indent(deps)}<div class="tree_wrap" id="${this.idName+deps+idIndex}">\n`
                    // str+=`${this.indent(deps+1)}<p>${key}</p>\n`
                    // str+=`${this.indent(deps+1)}<div>\n`
                    // str+=`${this.indent(deps+2)}${this.sortData(data, deps)}`
                    // str+=`${this.indent(deps+1)}</div>\n`
                    // str+=`${this.indent(deps)}</div>\n`
                    str+=`<div class="tree_wrap" id="${this.idName+deps+idIndex}"><button type="button" class="tree_nav">${key}</button><div class="tree_sub_wrap">${this.sortData(data, deps)}</div></div>
                    `
                }else{
                    // str+=`${this.indent(deps)}<div class="tree_lists">\n`
                    // str+=`${this.indent(deps+1)}<a href="${data[0]}">${key}</a>\n`
                    // str+=`${this.indent(deps)}</div>\n`
                    str+=`<div class="tree_lists">
                        <span>
                            <a href="${data[0]}" class="name">${key}</a>
                            <a href="${data[0]}" class="blank" target="_blank">${key}</a>
                        </span>
                    </div>`
                }
            })
            return str;
            
            // this.$el.innerHTML = 'sdfsdf'
        }
    },
    update: {

        read({test, aaaa}) {
            return {
                test: 'dddd',
                aaaa: 'dffadfsf'
            }

        },
        write({test}) {


        },

        events: ['resize']

    }

};

