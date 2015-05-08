import Ember from 'ember';
/* global _ */
/* global sprintf */

export default Ember.Component.extend({
    classNames: ['table'],
    name: null,
    matrix: null,
    rounded: function(){
        var m = this.get('matrix');
        var r = _.map(m, function(row){
            return _.map(row, function(v){
                return sprintf("%.3f",v);
            });
        });
        return r;
    }.property('matrix'),
});
