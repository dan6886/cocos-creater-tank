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
        speed: 3,
        status: 0,
        left_block: 0,
        right_block: 0,
        up_block: 0,
        down_block: 0,
        direction: {
            default: "up"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        this.schedule(function () {
            cc.log("计时器发生子弹");
            this.node.getComponent("BulletManager").fireBullet("up");
        }, 0.5);
    },
    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.status = 1;
                this.movePlayer(event.keyCode);
                this.direction = this.node.getChildByName("image").getComponent("PlayerImage").handleDirectionCode(event.keyCode);
                break;
        }
    },

    onKeyUp: function (event) {
        cc.log('release key:' + event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                this.status = 0;
                break;
        }
    },
    // update (dt) {},

    movePlayer: function (key) {
        switch (key) {
            case cc.macro.KEY.up:
                cc.log(this.up_block);
                if (this.up_block == 0) {
                    this.node.y = this.node.y + this.speed;
                }
                break;
            case cc.macro.KEY.down:
                if (this.down_block == 0) {
                    this.node.y = this.node.y - this.speed;
                }
                break;
            case cc.macro.KEY.left:
                if (this.left_block == 0) {
                    this.node.x = this.node.x - this.speed;
                }
                break;
            case cc.macro.KEY.right:
                if (this.right_block == 0) {
                    this.node.x = this.node.x + this.speed;
                }
                break;
        }
    },

    onCollisionEnter: function (other, self) {
        cc.log('on collision enter');
        var world = self.world;

        var preAabb = world.preAabb;
        cc.log(preAabb);
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用,当前节点的碰撞器里面检测，自己节点不管
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        // cc.log('on collision stay');
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        cc.log('on collision exit');
    },

    setMoveBlock: function (direction, arg) {
        cc.log('on setMoveBlock' + direction, arg);

        if ("up_block" == direction) {
            this.up_block += arg;
        } else if ("down_block" == direction) {
            this.down_block += arg;
        } else if ("left_block" == direction) {
            this.left_block += arg;
        } else if ("right_block" == direction) {
            this.right_block += arg;
        }
    }
});