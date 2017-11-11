(function (w) {
    /*
      * constructor { Bird } 鸟构造函数
      * param { ctx: Context } 绘图环境
      * param { img: Image } 鸟图
      * param { widthFrame: number } 一排的帧数
      * param { heightFrame: number } 一列的帧数
      * param { x: number } 鸟的起始x轴坐标
      * param { y: number } 鸟的起始y轴坐标
      * */
    function Bird(ctx,img,widthFrame,heightFrame,x,y){
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;

        //计算小鸟的高度
        this.width =this.img.width /widthFrame;
        this.height =this.img.height /heightFrame;

        //当前帧数
        this.currentFrame =0;

        //速度和加速度
        this.speed =2;
        this.speedPlus =0.05;

        this._bind();
    }

    Bird.prototype ={
        constructor:Bird,
        draw:function () {
            //当下落速度为1时，旋转10度
            var baseRadian =Math.PI/180*10;
            var maxRadian =Math.PI/180*45;

            //根据速度，计算旋转的角度
            var rotateRadian =baseRadian*this.speed;
            //最大的旋转角度为45度
            rotateRadian =rotateRadian >=maxRadian ?maxRadian :rotateRadian;

            this.ctx.save();

            /*
           * 1、平移到小鸟的中心点
           * 2、然后根据下落的速度旋转坐标系
           * 3、绘制小鸟，但是绘制的x和y坐标变为负的宽高一半。
           * */
            this.ctx.translate(this.x +this.width/2,this.y +this.height/2)
            this.ctx.rotate(rotateRadian);
            this.ctx.drawImage(this.img,
                this.width*this.currentFrame,0,this.width,this.height,
                -this.width/2,-this.height/2,this.width,this.height);

            this.ctx.restore()
        },
        update:function () {
            this.currentFrame =++this.currentFrame >this.widthFrame ? 0:this.currentFrame;
            this.y +=this.speed;
            this.speed +=this.speedPlus;
        },
        _bind:function () {
            var self =this;
            this.ctx.canvas.addEventListener("click",function () {
                self.speed =-1.5;
            })
        }
    }

    //单例模式：整个游戏只需要一个小鸟
    var bird =null;
    w.getBird =function (ctx,img,widthFrame,heightFrame,x,y) {
        if(!bird){
            bird =new Bird(ctx,img,widthFrame,heightFrame,x,y)
        }
        return bird;
    }
}(window))