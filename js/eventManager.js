/**
 * Created by Cheater on 2016/12/18.
 */
    //事件管理对象
var eventManager={
    //存放消息集合
    eventList:{},
    //添加事件
    addEvent:function(eventName,func){
        if(this.eventList[eventName]===undefined){
            this.eventList[eventName]=[func];
        }else{
            this.eventList[eventName].push(func);
        }
    },
    //移除事件
    removeEvent:function(eventName,func){
        if(this.eventList[eventName]===undefined){
            console.log("当前集合没有该事件（remove）");
            return;
        }
        if(func){
            var len=this.eventList[eventName].length;
            for(var i=len-1;i>=0;i--){
                if(this.eventList[eventName][i]===func){
                    this.eventList[eventName].splice(i,1);
                    break;
                }
            }
        }else{
            this.eventList[eventName]=[];
        }
    },
    //执行事件
    excute:function(eventName){
        var args=[].splice.call(arguments,1);
        var list=this.eventList[eventName];
        var that=this;
        if(list){
            for(var i=0;i<list.length;i++){
                list[i].apply(that,args);
            }
        }
    }
}
