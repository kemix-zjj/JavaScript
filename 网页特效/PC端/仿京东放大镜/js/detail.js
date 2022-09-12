window.addEventListener('load',function(){
    var preview_img = document.querySelector('.preview_img'); //事件源 即触发事件的盒子，鼠标放上去开始放大的盒子
    var mask = document.querySelector('.mask'); //遮挡层
    var big = document.querySelector('.big');  //显示出来的放大图片

    //1.当我们鼠标经过preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mousrout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    //2.鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove',function(e){
        //(1).先计算出鼠标在盒子内的坐标=鼠标的位置 - 图片的位置
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //(2)减去盒子的高度 300的一半是150 就是我们mask的最终left和top值了
        //赋值要有style 且想要让鼠标在盒子的正中央，即让黄色盒子向上走150像素，向右走150像素。即-减去
        //(3)我们mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //(4)如果x坐标小于0了，就让他停在0的位置
        //遮挡层的最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0){
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0){
            maskY = 0;
        }else if (maskY >= maskMax){
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 3.大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        //大图
        var bigIMg = document.querySelector('.bigImg');
        //大图片的移动距离 X Y
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        //大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';

    })

})