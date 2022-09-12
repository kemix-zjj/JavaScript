window.addEventListener('load',function(){
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');

    var focusWidth = focus.offsetWidth;

    //2.鼠标经过focus，就显示隐藏左右按钮
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        //鼠标经过图片，就停止自动播放的定时器
        clearInterval(timer);
        timer = null;  //清除定时器
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标离开图片，就又开启定时器
        timer = setInterval(function(){
            //手动调用点击事件
            arrow_r.click();
        },2000);
    })

    //3.动态生成小圆圈 有几张图片，我就生成几个小圆圈
     var ul = focus.querySelector('ul');
     var ol = focus.querySelector('.circle');
     for ( var i =0; i < ul.children.length; i++){
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来设置
        li.setAttribute('index',i);
        //把小li插入ol里面
        ol.appendChild(li);

        //4.我们可以在直接生成小圆圈的同时直接绑定点击事件  ---小圆圈的排他思想
        li.addEventListener('click',function(){
            // 干掉所有人 把所有的小li 清除current类名
            for (var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            // 留下我自己  把当前的小li 设置current类名
            this.className = 'current';
            //5.点击小圆圈，移动图片 当然移动的是ul
            //ul移动的距离=小圆圈的索引号 * 图片的宽度 注意是负值，因为图片是向左走的
            //当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('index');

            // 小bug
            //当我们点击了某个小li 就要把这个小li 的索引号给num 
            num = index;
            //当我们点击了某个小li 就要把这个小li 的索引号给circle
            circle = index;

            animate(ul,-index * focusWidth);
     })
    }
            //把ol里面的第一个小li设置为类名current 默认是点击状态
            ol.children[0].className = 'current';

            //6.克隆第一张图片（li） 放到ul最后面!!!!且是写在生成小圆圈的后面，不会再额外添加一个小圆圈
            var first = ul.children[0].cloneNode(true);
            ul.appendChild(first);

            //7.点击右侧按钮，图片滚动一张
            var num = 0;
            //  circle 控制小圆圈的播放
            var circle = 0;

            //flag节流阀
            var flag = true;

            //右侧按钮
            arrow_r.addEventListener('click',function(){
              if (flag){
                  flag = false;
                   //如果走到了最后复制的一张图片，此时我们的ul要快速复原 left = 0
               if (num == ul.children.length-1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-num*focusWidth,function(){
                flag = true; //打开节流阀
            });

            //8.点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            //如果circle == 4 说明走到最后我们克隆的这张图片了我们就复原
            if (circle == ol.children.length){
                circle = 0;
            }
              //调用函数
              circleChange();
              }
    });


    //左侧按钮
    arrow_l.addEventListener('click',function(){
        if (flag){
            flag = false;
            //如果走到了第一张图片，此时我们的ul要快速复原 最后一张图片
        if (num == 0){
            num = ul.children.length-1;
            ul.style.left = -num * focusWidth + 'px';
            
        }
        num--;
        animate(ul,-num*focusWidth,function(){
            flag = true;//打开节流阀
        });

        //8.点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle--;
        //如果circle<0 说明我们第一张图片，则小圆圈要改为第4个小圆圈（3）
        // if (circle < 0){
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length-1 : circle;
        //调用函数
        circleChange();
        }
});
        //9.封装函数 相同代码进行封装
        function circleChange(){
             //先清除其他小圆圈的current类名
             for (var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            //留下当前的小圆圈的current类名
            ol.children[circle].className = 'current';
        }

         //10.自动播放轮播图  ===> 类似于点击右侧按钮
         var timer = setInterval(function(){
            //手动调用点击事件
            arrow_r.click();
        },2000);
})