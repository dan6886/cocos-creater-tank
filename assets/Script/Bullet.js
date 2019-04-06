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
        bullet_Texture: {
            default: null,
            type: cc.Texture2D,
        },
        speed: {
            default: 1,
            type: cc.Integer,
        },
        direction: {
            default: "up",
            type: cc.String,
        },
        offset_x: 0,
        offset_y: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.array = new Array();
        this.array["up"] = new cc.SpriteFrame(this.bullet_Texture, new cc.rect(0, 0, 8, 8));
        this.array["right"] = new cc.SpriteFrame(this.bullet_Texture, new cc.rect(8, 0, 8, 8));
        this.array["down"] = new cc.SpriteFrame(this.bullet_Texture, new cc.rect(16, 0, 8, 8));
        this.array["left"] = new cc.SpriteFrame(this.bullet_Texture, new cc.rect(24, 0, 8, 8));
        // 这里v2的构造方法被坑了
        this.pointOffset = new Array();
        this.pointOffset["up"] = new cc.v2(0, 16);
        this.pointOffset["right"] = new cc.v2(16, 0);
        this.pointOffset["down"] = new cc.v2(0, -16);
        this.pointOffset["left"] = new cc.v2(-16, 0);
    },

    start() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.array["up"];
        cc.log("ddsd");
    },
    init: function (direction, speed, startpostition, manager, parent) {
        cc.log("init:" + direction);
        this.direction = direction;
        this.speed = speed;
        this.manager = manager;
        this.node.parent = parent;
        this.node.position = startpostition.add(this.pointOffset[this.direction]);
        this.node.getComponent(cc.Sprite).spriteFrame = this.array[this.direction];
    },
    fire: function () {
        cc.log("fire:" + this.direction);
        this.active = true;
    },
    update(dt) {
        if (this.active) {
            this.moveBullet(this.direction);
        }
    },
    moveBullet: function (direction) {

        switch (direction) {
            case "up":
                if (true) {
                    this.node.y = this.node.y + this.speed;
                }
                break;
            case "down":
                if (true) {
                    this.node.y = this.node.y - this.speed;
                }
                break;
            case "right":
                if (true) {
                    this.node.x = this.node.x + this.speed;
                }
                break;
            case "left":
                if (true) {
                    this.node.x = this.node.x - this.speed;
                }
                break;
        }
        if (this.node.x > 200 || this.node.x < -200 || this.node.y > 200 || this.node.y < -200) {
            this.sleepBullet();
            this.manager.manager
        }
    },
    sleepBullet: function () {
        cc.log("回收子弹");
        this.node.x = 0;
        this.node.y = 0;
        this.active = false;
        this.manager.putBackBullet(this.node);
    }
});