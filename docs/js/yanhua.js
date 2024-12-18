//创造主体函数
    function Fire(options){
        this.x = options.x;
        this.y = options.y;
        this.box = options.parent
        this.init();
    }
    //初始状态，创建燃放的烟花并让它出现在鼠标点击位置的正下方
    Fire.prototype.init = function(){
        this.div = document.createElement("div");
        this.div.className = "fire";
        this.div.style.left = this.x + "px";
        // this.div.style.top = this.y;
        this.div.style.background = randomColor();
        this.box.appendChild(this.div);
        //烟花上升
        this.fly();
    }
    //让烟花上升到鼠标点击的高度，然后让其消失并创建小烟花
    Fire.prototype.fly =function(){
        move(this.div,{
            top:this.y
        },()=>{
            this.div.remove();
            this.creatSmall();
        })
    }
    //创建小烟花，设置其宽高位置为鼠标点击位置
    Fire.prototype.creatSmall = function(){
        //圆周烟花的半径
        var r = random(100,200);
        for(var i=0;i<12;i++){
            let small = document.createElement("div");
            small.className = "small";
            small.style.left = this.x + "px";
            small.style.top = this.y + "px";
            small.style.background = randomColor();
            this.box.appendChild(small);
            //计算小烟花运动至指定圆周的位置
            var l = Math.round(Math.sin(Math.PI/180*30*i)*r) + this.x;
            var t = Math.round(Math.cos(Math.PI/180*30*i)*r) + this.y;
            //让小烟花到达目标处后消失不见
            move(small,{
                left:l,
                top:t
            },function(){
                small.remove();
            });
        }
    }


    var obox = document.querySelector(".box");
    obox.onclick = function(eve){
        var e = eve || window.event;
        new Fire({
            x:e.offsetX,
            y:e.offsetY,
            parent:this
        });
        

    }