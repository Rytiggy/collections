import DS from 'ember-data';

const {
    Model,
    attr,
} = DS;

export default Model.extend({
    name: attr('string'),
    value: attr(),
    properties: attr(), // Property hash to store additional information about a parameter.
});