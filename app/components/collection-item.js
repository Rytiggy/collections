import Ember from 'ember';

export default Ember.Component.extend({
    selected: false,
    actions : {
        markSelected () {
            this.toggleProperty('selected');
        }
    }
});
