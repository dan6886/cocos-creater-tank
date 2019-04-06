// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        playerTexture2D: {
            default: null,
            type: cc.Texture2D,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.array = new Array();
        this.array["up"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 0, 28, 28));
        this.array["down"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 28, 28, 28));
        this.array["left"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 56, 28, 28));
        this.array["right"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 84, 28, 28));

    },

    start() {
        this.node.Sprite.SpriteFrame = this.array["up"];
    },

    // update (dt) {},
});