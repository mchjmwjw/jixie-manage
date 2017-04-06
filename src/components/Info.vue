<template>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
            <h1 v-if="item.content.length > 0">
                {{ item.content }}
            </h1>
            <p v-else>
                <component :is="item.componentId"></component>
            </p>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import grid from "./Grid.vue";
    export default {
        data() {
            return {
                editableTabsValue: '2',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'                    
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: '',
                    componentId: grid
                }],
                tabIndex: 2
            }
        },
        methods: {
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: 'New Tab',
                        name: newTabName,
                        content: 'New Tab content'
                    });
                    this.editableTabsValue = newTabName;
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }                
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                }
            },
            len(val) {
                return true;
            }
        }
    }
</script>