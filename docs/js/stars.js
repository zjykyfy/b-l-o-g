// 立即执行函数，用于封装星星效果的逻辑
!function() {
    // 初始化函数，设置事件监听器并开始动画
    function initialize() {
        addEventListeners();
        animateStars();
    }

    // 添加事件监听器，用于响应用户的鼠标和触摸操作
    function addEventListeners() {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchstart", handleTouchMove);
        window.addEventListener("resize", updateWindowSize);
    }

    // 更新窗口大小变量，以便正确放置星星
    function updateWindowSize() {
        documentWidth = window.innerWidth;
        documentHeight = window.innerHeight;
    }

    // 处理触摸移动事件，为每个触摸点创建星星
    function handleTouchMove(event) {
        if (event.touches.length > 0) {
            for (var i = 0; i < event.touches.length; i++) {
                createStar(event.touches[i].clientX, event.touches[i].clientY, getRandomColor());
            }
        }
    }

    // 处理鼠标移动事件，为鼠标位置创建星星
    function handleMouseMove(event) {
        var rect = document.body.getBoundingClientRect();
        var mouseX = event.clientX - rect.left - window.scrollX;
        var mouseY = event.clientY - rect.top - window.scrollY;
        for (var i = 0; i < 1; i++) {
            createStar(mouseX, mouseY, getRandomColor());
        }
        //调整同时生成的星星数量
    }

    // 创建星星并将其添加到星星数组中
    function createStar(x, y, color) {
        var star = new Star();
        star.init(x, y, color);
        stars.push(star);
    }

    // 动画循环，不断更新星星的位置
    function animateStars() {
        requestAnimationFrame(animateStars);
        updateStars();
    }

    // 更新所有星星的状态，移除生命周期结束的星星
    function updateStars() {
        for (var i = 0; i < stars.length; i++) {
            stars[i].update();
            if (stars[i].lifeSpan < 0) {
                stars[i].die();
                stars.splice(i, 1);
            }
        }
    }

    // 获取随机颜色，用于星星的颜色
    function getRandomColor() {
        var colors = ["#f94a70", "#ffd12b", "#49c99a", "#1f90ed"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 星星构造函数，定义星星的属性和方法
    function Star() {
        this.character = "*"; // 星星的形状
        this.lifeSpan = 120; // 星星的生命周期
        // 星星的初始样式
        this.initialStyles = {
            position: "fixed",
            top: "0",
            display: "block",
            pointerEvents: "none",
            "z-index": "10000000",
            fontSize: "20px",
            "will-change": "transform"
        };

        // 初始化星星，设置位置、速度和颜色
        this.init = function(x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };
            this.position = {
                x: x - 45,
                y: y + 15
            };
            this.initialStyles.color = color;
            this.element = document.createElement("span");
            this.element.innerHTML = this.character;
            applyStyles(this.element, this.initialStyles);
            this.update();
            document.body.appendChild(this.element);
        };

        // 更新星星的位置和大小
        this.update = function() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;
            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")";
        };

        // 移除生命周期结束的星星
        this.die = function() {
            this.element.parentNode.removeChild(this.element);
        };
    }

    // 应用样式到元素
    function applyStyles(element, styles) {
        for (var prop in styles) {
            element.style[prop] = styles[prop];
        }
    }

    // 文档的宽度和高度，用于确定星星的位置
    var documentWidth = window.innerWidth;
    var documentHeight = window.innerHeight;
    var stars = []; // 存储所有星星的数组

    initialize(); // 调用初始化函数
}();
