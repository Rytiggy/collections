import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    organizeMode: false,
    groupView: false,
    cardView: true,
    selectedItems : Ember.A(), // List of items selected for actions like delete
    showDeleteConfirmation: false, // Modal for deleting items
    showGroupConfirmation: false, // Modal for grouping
    groupTitle: '',
    // Build list
    groups: Ember.computed('model.groups', function() {
        if(this.get('groupView')){ return; }
            let groups = this.get('model.groups');
            groups.forEach(function(group) {
            group.set('type', 'group');
        });
        return groups;
    }),
    list: Ember.computed.union('groups', 'model.items'),
    actions: {
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        },
        toggleDeleteConfirmation(){
            this.toggleProperty('showDeleteConfirmation');
        },
        clearSelected() {
            let selected = this.get('selectedItems');
            selected.clear();
        },
        clearModals() {
            this.set('showGroupConfirmation', false);
            this.set('showDeleteConfirmation', false);
            this.set('groupTitle', '');
        },
        deleteSelected(){
            let items = this.get('list');
            let selected = this.get('selectedItems');
            selected.forEach(item =>
                Ember.run.once(() =>
                  item.destroyRecord()
            ));
            items.removeObjects(selected);
            this.send('clearSelected');
            this.send('clearModals');
        },
        toggleGroupConfirmation ( ){
            this.toggleProperty('showGroupConfirmation');
        },
        groupSelected(){
            // Create new group
            let newGroup = this.get('store').createRecord('group', {
                title: this.get('groupTitle'),
                description: '',
                collection: this.get('model')
            });
            newGroup.save().then((record) => {
                // For each item, set group to new group
                let selected = this.get('selectedItems');
                selected.forEach(item => {
                    item.set('group', record);
                    item.save();
                });

                // remove items that were put into the group;
                let list = this.get('model.items');
                list.removeObjects(selected);
                this.send('clearSelected');
                this.send('clearModals');
            });
        },
        // Adds or removes item to the selectedItems list
        toggleSelectedList(selected, item){
            let currentList = this.get('selectedItems');
            if(!selected){
                currentList.removeObject(item);
            } else {
                currentList.addObject(item);
            }
        },
        changeView(cardView) {
            this.set('cardView', cardView);
        }
    }
});
