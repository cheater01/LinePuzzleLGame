/**
 * Created by Cheater on 2016/12/19.
 */
var Dir={
    "Up":"UP",
    "Down":"DOWN",
    "Left":"LEFT",
    "Right":"RIGHT"
}

//�û��������������
var InputController=(function(){
    var mouse_start_x=0;
    var mouse_start_y=0;
    var mouse_move_x=0;
    var mouse_move_y=0;
    var ismousedown=false;//���±�ʶ
    var dir=null;//����

    //ע��onmousedown�¼�
    this.onMouseDown=function(event){
        ismousedown=true;
        mouse_start_x=getEvent(event).offsetX;
        mouse_start_y=getEvent(event).offsetY;
        mouse_offset_x=getEvent(event).offsetX;
        mouse_offset_y=getEvent(event).offsetY;
        eventManager.excute("getGrid",mouse_start_x,mouse_start_y);
    }
    //ע��onmousemove�¼�
    this.onMouseMove=function(event){
        if(ismousedown==false){
            return;
        }
        mouse_move_x=getEvent(event).offsetX-mouse_start_x;
        mouse_move_y=getEvent(event).offsetY-mouse_start_y;
        //��ȡ����
        if(dir==null){
            dir=getDir(mouse_move_x,mouse_move_y);
            return;
        }
        eventManager.excute("getNextGrid",dir,function(){
            dir=null;
        });
        eventManager.excute("moveGrid",mouse_move_x,mouse_move_y);
        mouse_start_x=getEvent(event).offsetX;
        mouse_start_y=getEvent(event).offsetY;

    }

    this.onMouseUp=function(event){
        if(dir!=null){
            eventManager.excute("moveEnd",dir);
        }
        ismousedown=false;
        dir=null;
    }

    //�жϷ���
    function getDir(_mouse_move_x,_mouse_move_y){
        if(Math.abs(_mouse_move_x)>Math.abs(_mouse_move_y)){
            if(_mouse_move_x>0){
                return Dir.Right;

            }else if(_mouse_move_x<0){
                return Dir.Left;
            }
        }
        else if(Math.abs(_mouse_move_x)<Math.abs(_mouse_move_y)){
            if(_mouse_move_y<0){
                return Dir.Up;
            }
            else if(_mouse_move_y>0){
                return Dir.Down;
            }
        }
        return null;
    }


    function getEvent(event){
        return window.event||event;
    }

    return this;

})();


