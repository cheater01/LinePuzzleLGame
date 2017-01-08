/**
 * Created by Cheater on 2016/12/19.
 */
//����Gridö������
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

//����һ������Ԫ��  w:120 h:120
function Grid(){
    //������
    this.colIndex=0;
    //������
    this.rowIndex=0;
    //��
    this.width=0;
    //��
    this.height=0;
    //ͼƬ����
    this.img=null;
    //��������
    this.type=null;

    //�洢tag
    this.tag="";

    this.coloffset=0;
    this.rowoffset=0;

}

Grid.prototype={
    //��ʼ��������Ϣ
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




