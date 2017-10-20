import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    title: "Collections",

    afterModel(model, transition) {
        this.set("navLinks.links", [
        ]);
    },

    setupController(controller, data) {
        controller.set("title", this.get("title"));
        controller.set("model", data);
        controller.set("hasDynamicPart", false);
        controller.set("collection", data);
        let pathParts = this.routeName.split(".").map((cur, i, arr) => {
            let routeName = arr.slice(0, i+1).join(".");
            let controller = this.controllerFor(routeName);
            return {
                label: controller.get("title"),
                route: routeName,
                routePart: cur
            };
        });
        this.set("path.parts", pathParts);
    }

});
