/**
 * Created by Cheater on 2016/12/18.
 */

var CanvasCommand=(function(){
    var canvas=document.getElementById("myGame");
    //canvas.width=360;
    //canvas.height=600;
    canvas.width=1024;
    canvas.height=768;
    var context=canvas.getContext("2d");
    console.log(context);
    //注册canvas鼠标按下，移动，放手事件
    canvas.onmousedown=function(event){
        eventManager.excute("onMouseDown",event)
    };
    canvas.onmousemove=function(event){
        eventManager.excute("onMouseMove",event);
    };
    canvas.onmouseup=function(event){
        eventManager.excute("onMouseUp",event);
    }
    //提供给外部调用的函数
    var Action={
        drawImage:function(img,x,y,width,height){
            img.onload=function(){
                context.drawImage(img,x,y,width,height);
            }
            context.drawImage(img,x,y,width,height);
        },
        clearRect:function(x,y,width,height){
            context.clearRect(x,y,width,height);
        }
    };
    return{
        //msg:{func,[]}
        excute:function(funcName,args){
            Action[funcName].apply(this,args);
        }
    }
})();
