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
        bullet: {
            default: null,
            type: cc.Prefab,
        },
        bullet_num: {
            default: 2,
            type: cc.Integer,
        }
    },

    onLoad() {},

    start() {
        this.bulletPool = new cc.NodePool();
        let initCount = 2;
        for (let i = 0; i < initCount; ++i) {
            let bullet = cc.instantiate(this.bullet); // 创建节点
            bullet.x = 0;
            bullet.y = 0;
            this.bulletPool.put(bullet); // 通过 put 接口放入对象池
        }
    },
    fireBullet: function () {
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            let bullet = this.bulletPool.get();
            let bullet_sp = bullet.getComponent("Bullet");
            let direction = this.node.getComponent("PlayerControl").direction;
            bullet_sp.init(direction, 3, this.node.position, this, this.node.parent);
            bullet_sp.fire();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            // cc.log("不能发生子弹");
        }
    },
    putBackBullet: function (node) {
        this.bulletPool.put(node);
    }
    // update (dt) {},
});