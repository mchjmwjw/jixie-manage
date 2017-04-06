<template>
    <div>
        <el-row :gutter="20">   <!-- gutter 来指定每行之间的间隔 -->
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                    <el-tree class="filter-tree" :data="data2" :props="defaultProps"
                        default-expand-all :filter-node-method="filterNode" ref="tree2">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="18">                
                <div class="grid-content bg-purple">
                    <tabpanel></tabpanel>
                </div>
            </el-col>
        </el-row>
    </div>    
</template>

<script>
    import Tabpanel from "./Info.vue";
    export default {
        components: {
            'tabpanel': Tabpanel
        },

        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val); // $refs 包含了所有拥有ref注册的子组件
            }
        },

        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },

        data() {
            return {
                filterText: '',
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        }
    };
</script>