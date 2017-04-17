<template>
    <div class="treemg">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-tree
            class="filter-tree" 
            :data="kinds"
            :props="defaultProps"
            show-checkbox
            node-key="id"        
            :expand-on-click-node="false"
            :render-content="renderContent"
            :filter-node-method="filterNode"
            expand-on-click-node
            ref="kindtree">
        </el-tree>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
let id = 1000;
import { mapGetters, mapActions } from 'vuex'
import manage from '../../api/manage.js'
export default {
    watch: {
        filterText(val) {
            this.$refs.kindtree.filter(val);
        }
    },

    data() {
        return {
            filterText: '',
            data2: [],
            defaultProps: {
                children: 'children',
                label: 'k_name'
            }
        }
    },

    created: function() {
        this.$store.dispatch('getAllKinds', {kinds: manage.tree});
    },

    computed: mapGetters({
        kinds: 'allkinds'
    }),

    methods: {
        append(store, data) {
            store.append({ id: id++, k_name: 'testtest', children: [] }, data);
        },

        remove(store, data) {
            store.remove(data);
        },

        renderContent(h, { node, data, store }) {
            return (
            <span>
                <span>
                <span><el-input value={node.label}></el-input></span>
                </span>
                <span style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.append(store, data) }>添加</el-button>
                <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
                </span>
            </span>);
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.k_name.indexOf(value) !== -1;
        }
    }
};
</script>

<style>
div.treemg .el-tree .el-input {
    width: 30%;
    vertical-align: middle;
}
div.treemg .el-tree .el-input input {
    height: 25px;    
}
div.treemg > div.el-input {
    margin: 0 auto 5px auto;
}
div.treemg > .el-button {
    
}
</style>