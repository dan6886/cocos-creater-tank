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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        sprite2: {
            default: null,
            type: cc.SpriteFrame,
        },
        textture: {
            default: null,
            type: cc.Texture2D,

        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 重要的代码，获取本地纹理
        // this.textture = new cc.Texture2D();
        // this.textture.url = cc.url.raw('resources/tile.png');
        this.array = new Array();
        this.array["1"] = new cc.SpriteFrame(this.textture, cc.rect(32, 0, 16, 16));
        this.array["2"] = new cc.SpriteFrame(this.textture, cc.rect(16, 0, 16, 16));

    },

    start() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
        let map = this.node.getComponent(cc.TiledMap)
        cc.log(map);
        cc.log("map:" + map.getMapSize());
        cc.log("map:" + map.getTileSize());
        let properties = map.getProperties();
        cc.log("properties:" + properties);

        let layer = map.getLayer("grass");
        // layer.enabled = false
        cc.log(layer);
        let pos = layer.getPositionAt(cc.v2(1, 10));
        cc.log("Pos: " + pos);
        let pos2 = layer.getPositionAt(0, 0);
        cc.log("Pos: " + pos2);
        // 转换为相对于左下角的坐标
        let world_pos = layer.node.convertToWorldSpace(cc.v2(0, 0));
        cc.log(world_pos);
        // 设置新的图块，这里注意 creater里面的c_gid和editor 里面的e_gid;c_gid==e_gid+1
        layer.setTileGIDAt(0, 5, 5)
        // 读取layer层对应的属性
        let layyer_name = layer.getProperty("name");
        cc.log(layyer_name)
        //  map的GID是从1开始的
        let gridproperties = map.getPropertiesForGID(1);
        cc.log(gridproperties["p0"]);
        // 这个api还没弄懂
        let tile = layer.getTiledTileAt(1, 1, false);
        // layer.setTiledTileAt(0,0,tile);
        cc.log(tile);

        // layer.node.addChild(node);

        let wall_layer = map.getObjectGroup("wall");
        let wall_objects = wall_layer.getObjects();
        cc.log(wall_objects);
        let asset = map.tmxAsset;

        for (var i = 0; i < wall_objects.length; i++) {
            let wall_object = wall_objects[i];
            // 传入参数全局坐标，转换为节点以自身锚点为原点的相对坐标
            // 相对于node 左下角的坐标作为参数，返回世界坐标
            let v2 = wall_layer.node.convertToWorldSpace(cc.v2(wall_object.x, wall_object.y));
            // 传入参数全局坐标，转换为节点以自身锚点为原点的相对坐标
            let v = wall_layer.node.convertToNodeSpaceAR(v2);

            cc.log(v.x, v.y);
            let node = new cc.Node();
            node.group = "wall";
            node.x = v.x + wall_object.width / 2;
            node.y = v.y + wall_object.height / 2;;
            var sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = this.array["1"];
            var collider = node.addComponent(cc.BoxCollider);
            cc.log(sp.spriteFrame.getRect().size);
            collider.size = new cc.Size(16, 16);
            wall_layer.node.addChild(node);
        }
    },


    // update (dt) {},
});