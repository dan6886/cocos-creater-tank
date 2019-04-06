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
        // 这里可以预置一个图片texture2D，很激动
        playerTexture2D: {
            default: null,
            type: cc.Texture2D,
        },
        last_image: "up"
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.array = new Array();
        this.array["up"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 0, 28, 28));
        this.array["right"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 28, 28, 28));
        this.array["down"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 56, 28, 28));
        this.array["left"] = new cc.SpriteFrame(this.playerTexture2D, new cc.rect(0, 84, 28, 28));

    },
    start() {
        this.getComponent(cc.Sprite).spriteFrame = this.array["up"];
    },
    handleDirectionCode: function (keycode) {
        let direction = null;
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                direction = "up";
                break;
            case cc.macro.KEY.down:
                direction = "down";
                break;
            case cc.macro.KEY.left:
                direction = "left";
                break;
            case cc.macro.KEY.right:
                direction = "right";
                break;
        }
        this.setImageLookAt(direction);
        return direction;
    },
    setImageLookAt: function (direction) {
        cc.log("dire:" + direction);
        if (direction != this.last_image) {
            this.last_image = direction;
            this.getComponent(cc.Sprite).spriteFrame = this.array[direction];
        }
    }

    // update (dt) {},
});