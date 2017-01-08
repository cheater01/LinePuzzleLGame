/**
 * Created by Cheater on 2016/12/18.
 */
(function(window){
    var level=1;
   //游戏入口
    var main=(function(){
        console.log("game start!!");
        initEvent();
        Ground.initGround(level);
        Ground.drawGrids();
    })();

    function initEvent(){
        eventManager.addEvent("onMouseDown",InputController.onMouseDown);
        eventManager.addEvent("onMouseMove",InputController.onMouseMove);
        eventManager.addEvent("onMouseUp",InputController.onMouseUp);

        eventManager.addEvent("getGrid",Ground.getClickGrid);
        eventManager.addEvent("getNextGrid",Ground.getNextGrid);
        eventManager.addEvent("moveGrid",Ground.moveGrid);
        eventManager.addEvent("moveEnd",Ground.moveEnd);
        eventManager.addEvent("NextLevel",function(){
            level++;
            if(level==4){
                var img=document.createElement("img");
                img.src=imgDataUrl;
                Ground.clearGround();
                CanvasCommand.excute("drawImage",[img,0,0,1024,768]);
                return;
            }
            Ground.initGround(level);
            Ground.drawGrids();
        });

    }




}(window))