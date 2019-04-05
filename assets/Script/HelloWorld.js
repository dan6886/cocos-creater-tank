cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        this.label.string = "11111";
    },

    // called every frame
    update: function (dt) {
        this.label.node.x = this.label.node.x-1;
        // cc.log("update"+this.label.node.x);
            
    },
});
