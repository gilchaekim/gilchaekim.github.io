import {
    each,
    isArray,
    append,
    empty,
    attr,
    toggleClass,
    parent,
    removeClass,
    addClass,
    $$,
    hasClass,
} from '../../util';
export default {

    props: {
        data: Object,
        mainFrame:String,
        idName:String,
    },

    data: {
        data: null,
        buildData: [],
        idName:"treeId",
        treeNavCls:"tree_nav",
        treeLink:".tree_lists a.name",
        activeCls:'mui-active',
        highlightCls:'mui-highlight',
        highlightItem:'highlightItem',
        activeItem:'activeItem',
        mainFrame:null,
        index:0,
    },
    created(){
        console.log(this.data);
    },
    beforeConnect(){
        this.appendTree(this.data);
        if(!!this.highlightItem) {
            attr(this.mainFrame, 'src', $(`#${this.highlightItem}`).pathname)
        }
    },


    computed: {
        mainFrame({mainFrame}) {
            return $(mainFrame);
        },
        highlightItem(){
            return localStorage.getItem(this.keyHighlightItem);
        },
        activeItem({keyActiveItem}){
            return JSON.parse(localStorage.getItem(this.keyActiveItem)) || [];
        },
        keyHighlightItem({idName, highlightItem}){
            return `${idName}${highlightItem}`
        },
        keyActiveItem({idName, activeItem}){
            return `${idName}${activeItem}`
        }
    },

    events: [
        {
            name: 'click',
            delegate() {
                return this.treeLink;
            },
            handler(e) {
                e.preventDefault();
                this.highlight(e.current.id)
                attr(this.mainFrame, 'src', e.current.pathname)
            }
        },        
        {
            name: 'click',
            delegate() {
                return `.${this.treeNavCls}`;
            },
            handler(e) {
                const item = parent(e.current);
                const id = e.current.id;
                const {activeCls, setSelected} = this;
                if(hasClass(item, activeCls)){
                    removeClass(item, activeCls);
                    setSelected(id, false);
                }else{
                    addClass(item, activeCls)
                    setSelected(id, true);
                }
            }
        }
    ],

    methods: {
        build(data){
            return this.sortData(data, 0);
        },
        appendTree(data){
            const {$el, build} = this;
            append($el, build(data));
        },
        sortData(data, index){
            const deps = ++index;
            const hilight = this.highlightItem;
            const {
                $el,
                treeNavCls,
                highlightCls,
                activeCls,
                idName,
                activeItem,
            } = this;
            let str = ''
            empty($el);
            each(data, (data, key) => {
                let idIndex = this.index++;
                let id = `${idName}${deps}${idIndex}`;
                if (!isArray(data)) {
                    str+=`
                    <div class="tree_wrap ${activeItem.length && activeItem.find((arr)=>arr === id)?activeCls:""}">
                        <button type="button" id="${id}" class="${treeNavCls}">${key}</button>
                        <div class="tree_sub_wrap">${this.sortData(data, deps)}</div>
                    </div>
                    `;
                }else{
                    str+=`
                    <div class="tree_lists">
                        <span>
                            <a href="${data[0]}" class="name ${hilight === id ? highlightCls:""}" id="${id}">${key}</a>
                            <a href="${data[0]}" class="blank" target="_blank" title="새 창" tabindex="-1">${key}</a>
                        </span>
                    </div>
                    `;
                }
            })
            
            return str;
        },
        highlight(id){
            const { highlightCls, setHighlight, $el } = this;
            let { highlightItem } = this;
            console.log(highlightItem);
            const newItem = $(`#${id}`, $el);
            const item = $(`#${highlightItem}`, $el);
            item && removeClass(item, highlightCls)
            this.highlightItem = id;
            addClass( newItem, highlightCls );
            setHighlight(id);
        },
        setSelected(id, action){
            let items = this.activeItem;
            const add = (id) =>{
                items.push(id);
            }
            const remove = (id) =>{
                for (let i = 0; i < this.activeItem.length; i++) {
                    if(this.activeItem[i] === id){
                        this.activeItem.splice(i, 1);
                    }
                }
            }
            (action?add:remove)(id);
            this.activeItem = items ;
            localStorage.setItem(this.keyActiveItem, JSON.stringify(this.activeItem));
        },
        setHighlight(id){
            localStorage.setItem(this.keyHighlightItem, id);
        },
        refresh(){
            this.clearStorage();
        },
        clearStorage(){
            localStorage.removeItem(this.keyHighlightItem);
            localStorage.removeItem(this.keyActiveItem);
        }
    }
};

