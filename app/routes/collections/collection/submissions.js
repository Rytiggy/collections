import Ember from 'ember';


export default Ember.Route.extend({

    title: 'Submissions',
    crumb: {},

    model() {
        const collection = this.modelFor('collections.collection');
        return Ember.RSVP.hash({
            cases: this.store.query('case', {
                collection: collection.id
            }),
            collection
        });
    },
    afterModel(model) {
        this.set('crumb.label', this.title);
        this.set('crumb.route', this.routeName);
        this.set('crumb.models', [model.collection]);

        this.set('nav.links', [{
            label: 'Settings',
            route: 'collections.collection.edit',
            models: [model.collection]
        }, {
            label: 'Submissions',
            route: 'collections.collection.submissions',
            models: [model.collection]
        }]);
    },

    setupController(controller, data) {
        controller.set('collection', data.collection);
        controller.set('cases', data.cases);
    }

});
