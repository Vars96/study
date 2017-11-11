(function (w) {
    /*
       * 管道的特点：
       * 1、成对出现，所以x轴可以共享，但是y轴不共享
       * 2、上下管道之间的路径固定，可以由用户指定
       * 3、管道的高度是随机生成的，随机生成上管道的高度，下管道就可以计算了
       * 4、当管道走出画布，从右边出来时，高度需要重新随机生成
       * */

    /*
    * constructor { Pipe } 管道
    * param { ctx: Context } 绘图环境
    * param { imgDown：Image } 口朝下的管道，在画布的上面
    * param { imgUp：Image } 口朝上的管道，在画布的下面
    * param { space：number } 上下管道的间距
    * param { landHeight：number } 大地的高度
    * param { speed：number } 速度
    * */
    function Pipe(ctx,imgDown,imgUp,space,landHeight,speed){
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;

        // 管道最小高度
        this.minHeight = 100;

        // 管道默认的宽高
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;

        Pipe.len ++;

        this.x =300+ this.width*3*(Pipe.len -1);
        this.y =0;

        this._init();
    }

    Pipe.len =0;

    Pipe.prototype ={
        _init:function () {
            //单个管道的最大高度
            var maxHeight =this.ctx.canvas.height -this.landHeight -this.space -this.minHeight;
            //随机生成管道的高度
            var randomHeight =Math.random()*maxHeight;
            randomHeight =randomHeight <this.minHeight ? this.minHeight : randomHeight;

            //上管道的坐标 =随机管道高度 -默认的高度
            this.downY = randomHeight -this.imgDown.height;
            //下管道的y坐标 =随机生成的管道高度 +上下管道的间隔
            this.upY =randomHeight +this.space;
        },
        draw:function () {
            //this.ctx.beginPath()  可以选择每画一个路径清一次，也可以一次清六个路径
            this.ctx.drawImage(this.imgDown,this.x,this.downY)
            this.ctx.drawImage(this.imgUp,this.x,this.upY)
            this._drawPath();
        },
        update:function(){
            this.x -=this.speed;
            if(this.x <=-this.width){
                this._init();
                this.x +=this.width*3*Pipe.len;
            }
        },
        _drawPath:function () {
            this.ctx.rect(this.x,this.downY,this.width,this.height)
            this.ctx.rect(this.x,this.upY,this.width,this.height)
        }
    }

    //工厂模式
    w.getPipe =function (ctx,imgDown,imgUp,space,landHeight,speed) {
            return new Pipe(ctx,imgDown,imgUp,space,landHeight,speed)
    }
}(window))