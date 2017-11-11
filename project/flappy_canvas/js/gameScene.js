(function (w) {
    function GameScene(ctx,imgObj) {
        this.ctx =ctx;
        this.imgObj =imgObj;

        //听众队列
        this.listeners =[]

        //游戏角色
        this.roles =[];
        this._initRoles();
    }
    GameScene.prototype ={
        _initRoles:function () {
            //获取游戏背景:两个轮播的天空
            for(var i=0;i<2;i++){
                this.roles.push(getSky( this.ctx, this.imgObj.sky, 3 ))
            }
            //6个管道
            for(var i=0;i<6;i++){
                this.roles.push(getPipe( this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 150, this.imgObj.land.height, 3 ))
            }
            //4个大地
            for(var i=0;i<4;i++){
                this.roles.push(getLand( this.ctx, this.imgObj.land, 3 ))
            }
            //一个小鸟
            this.roles.push(getBird(this.ctx,this.imgObj.bird,3,1,10,10))
        },
        addListener:function (listener) {
            this.listeners.push(listener)
        },
        trigger:function () {
            this.listeners.forEach(function (notify) {
                notify();
            })
        },
        draw:function () {
            /*
           * 每次绘制新的游戏画面时，
           * 先判断小鸟有没有碰撞，
           * 如果碰撞则触发游戏结束事件，监听者将告知听众
           * */
            var bird = getBird();
            var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;

            // 如果小鸟撞向管道，或者飞出天空，或者duang~duang~duang，那么游戏结束
            if ( ctx.isPointInPath( birdCoreX, birdCoreY )
                || birdCoreY < 0
                || birdCoreY > (ctx.canvas.height - this.imgObj.land.height) )
            {
                //触发游戏结束场景
               this.trigger()
            }
            //否则游戏继续
            else {
                //先一次清除出于同一个画布的六个管道的路径
                this.ctx.beginPath();
                //forEach中的回调函数：callback(ele,index ,arr)
                this.roles.forEach(function (role) {
                    role.draw()
                    role.update()
                })
            }
        }
    }
    w.getGameScene =function (ctx,imgObj) {
        return new GameScene(ctx,imgObj)
    }
}(window))