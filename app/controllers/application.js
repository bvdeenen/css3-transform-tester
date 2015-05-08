import Ember from 'ember';

/* global _ */
/* global mathjs */

var $=Ember.$;

export default Ember.Controller.extend({
    matrix: null,
    matrix2: null,
    matrix3: null,
    matrix4: null,
    afterRender: function(){

        var canvas = $("#c3");
        var context = canvas[0].getContext("2d");
        this.grid(context, canvas.width(), canvas.height(), 50, 50);
        window._getT=function(){
            var matrix = getComputedStyle(document.querySelector("#c3")).
                getPropertyValue("transform");
            return matrix;
        };
        this.calcmatrix();

        var w=canvas.width(), h=canvas.height();
        var points = [ 
            [[0,0], [w,0], [0,h]],
            [[50,100], [300, 100], [50,400]
            ]
        ];
        this.makeMatrix(points);
    },
    makeMatrix: function(points){
        var f = function(p){
            // turn 3 points into a matrix of three x,y,1 column vectors
            return mathjs.matrix([
                [p[0][0], p[1][0], p[2][0]],
                [p[0][1], p[1][1], p[2][1]],
                [1,1,1]
            ]
            );
        };
        var source = f(points[0]);
        var target = f(points[1]);
        this.set('matrix2', source._data);
        this.set('matrix3', target._data);

        var transform = mathjs.multiply(
            source, mathjs.inv(target)
        );

        this.set('matrix4', transform._data);

        
    },
    grid: function(c, w, h, dx, dy){

        c.beginPath();
        for(var x=0; x<=w; x+=dx){
            c.moveTo(x,0); c.lineTo(x,h);
        }
        for(var y=0; y<=h; y+=dy){
            c.moveTo(0,y); c.lineTo(w,y);
        }
        c.stroke();

        c.font = "8pt";
        for(x=0; x<=w; x+=dx){
            for(y=0; y<=h; y+=dy){
                c.fillText("%@,%@".fmt(x,y), x,y);

            }
        }
    },
    calcmatrix: function() {
        var matrix=window._getT();
        var m = matrix.match(/matrix\((.*),(.*),(.*),(.*),(.*),(.*)\)/);

        m = _.map(m.slice(1), function(v){
            return Number.parseFloat(v);
        });

        matrix = mathjs.matrix([
            [m[0], m[2], m[4]],
            [m[1], m[3], m[5]],
            [0,  0,  1],
        ]);
        this.set('matrix', matrix._data);
    },
    actions: {
        calcmatrix: function(){
            this.calcmatrix();
        }
    }
});
