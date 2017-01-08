/**
 * Created by Cheater on 2016/12/19.
 */
//定义Grid枚举类型
var GridType={};
GridType.MOVE="MOVE";
GridType.NOT_MOVE="NOT_MOVE";
GridType.START="START";
GridType.END="END";
GridType.AD="AD";
GridType.AS="AS";
GridType.DS="DS";
GridType.WA="WA";
GridType.WD="WD";
GridType.WS="WS";
GridType.Null="Null";

//定义一个网格单元类  w:120 h:120
function Grid(){
    //列坐标
    this.colIndex=0;
    //行坐标
    this.rowIndex=0;
    //宽
    this.width=0;
    //高
    this.height=0;
    //图片对象
    this.img=null;
    //网格类型
    this.type=null;

    //存储tag
    this.tag="";

    this.coloffset=0;
    this.rowoffset=0;

}

Grid.prototype={
    //初始化网格信息
    init:function(colIndex,rowIndex,width,height,imgUrl,type){
        this.colIndex=colIndex;
        this.rowIndex=rowIndex;
        this.width=width;
        this.height=height;
        this.img=new Image();
        this.img.src=imgUrl;
        this.type=type;
        this.coloffset=colIndex*width;
        this.rowoffset=rowIndex*height;
    },
    drawMe:function(){
        CanvasCommand.excute("drawImage",[this.img,this.coloffset,this.rowoffset,this.width,this.height]);
    },
    wipeMe:function(){
        CanvasCommand.excute("clearRect",[this.coloffset,this.rowoffset,this.width,this.height]);
    },
    moveTo:function(offsetX,offsetY){
        this.coloffset+=offsetX;
        this.rowoffset+=offsetY;
    },
    resetMe:function(){
        this.wipeMe();
        this.coloffset=this.colIndex*this.width;
        this.rowoffset=this.rowIndex*this.height;
        this.drawMe();
    },
    isInside:function(mouseX,mouseY){
        var minX=this.coloffset;
        var maxX=minX+this.width;
        var minY=this.rowoffset;
        var maxY=minY+this.height;
        //console.log("minX:"+minX+" maxX:"+maxX+" minY:"+minY+" maxY:"+maxY);
        if(minX<mouseX&&mouseX<maxX&&minY<mouseY&&mouseY<maxY){
            return true;
        }
        return false;
    }

}




