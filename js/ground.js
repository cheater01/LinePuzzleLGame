/**
 * Created by cheater on 2016/12/22.
 */


//地图对象
var Ground=(function(){
    //存放网格集合(二维数组)
    this.gridArr=[];
    //列数
    this.colCount=3;
    //行数
    this.rowCount=5;

    this.offset=120;

    //当前操作的网格
    this.curGrid=null;
    //目标网格
    this.targetGrid=null;

    //开始标记的网格
    var startGrid=null;

    //读取配置信息生成地图
    this.initGround=function(level){
        var level="Level"+level;
        //读取配置表
        if(LevelConfig[level]===undefined){
            console.log("参数有误!"+level);
            return;
        }
        this.gridArr=[];
        var levelArr=LevelConfig[level];
        var rowlen=levelArr.length;
        for(var rowIndex=0;rowIndex<rowlen;rowIndex++){
            var cellArr=levelArr[rowIndex];
            var colLen=cellArr.length;
            var _gridArr=[];
            for(var colIndex=0;colIndex<colLen;colIndex++){
                //var _colIndex=colIndex*this.offset;
                //var _rowIndex=rowIndex*this.offset;
                //读取路径配置
                if(GridImgConfig[cellArr[colIndex]]===undefined){
                    console.log("参数有误:"+cellArr[colIndex]);
                    return;
                }
                var _url=GridImgConfig[cellArr[colIndex]];
                var grid=new Grid();
                grid.init(colIndex,rowIndex,this.offset,this.offset,_url,cellArr[colIndex]);
                //把START类型网格预存起来
                if(grid.type=="START"){
                    startGrid=grid;
                }
                _gridArr.push(grid);
            }
            this.gridArr.push(_gridArr);
        }
        console.log(this.gridArr);
    }

    this.drawGrids=function(){
        for(var rowIndex=0;rowIndex<this.gridArr.length;rowIndex++){
            for(var colIndex=0;colIndex<this.gridArr[rowIndex].length;colIndex++){
                this.gridArr[rowIndex][colIndex].drawMe();
            }
        }
    }

    this.clearGround=function(){
        //for(var rowIndex=0;rowIndex<this.gridArr.length;rowIndex++){
        //    for(var colIndex=0;colIndex<this.gridArr[colIndex].length;colIndex++){
        //        this.gridArr[rowIndex][colIndex].wipeMe();
        //    }
        //}
        CanvasCommand.excute("clearRect",[0,0,1024,768]);
    }

    this.getGrid=function(mouseX,mouseY){
        for(var rowIndex=0;rowIndex<this.gridArr.length;rowIndex++){
            for(var colIndex=0;colIndex<this.gridArr[rowIndex].length;colIndex++){
                var grid=this.gridArr[rowIndex][colIndex];
                //console.log(grid);
                if(grid.isInside(mouseX,mouseY)){
                    return grid;
                }
            }
        }
        return null;

    }
    var self=this;
    //获取鼠标点击到的网格函数
    this.getClickGrid=function(mouseX,mouseY){
        self.curGrid=self.getGrid(mouseX,mouseY);
        // console.log(self.curGrid);
        //移动检测
        if(self.curGrid==null){
            console.log("没有点击到网格!!");
            return;

        }
        if(IsmMove(self.curGrid)==false){
            self.curGrid=null;
            console.log("该盒子不能移动");
        }
    }
    //移动当前网格事件
    this.getNextGrid=function(dir,callback){
        if(self.curGrid==null){
            return;
        }
        if(self.targetGrid!=null){
            return;
        }
        var _colIndex=self.curGrid.colIndex;
        var _rowIndex=self.curGrid.rowIndex;
        switch(dir){
            case Dir.Down:
                _rowIndex++;
                break;
            case Dir.Up:
                _rowIndex--;
                break;
            case Dir.Left:
                _colIndex--;
                break;
            case Dir.Right:
                _colIndex++;
                break;
        }
        if(IsExceedArr(_rowIndex,_colIndex)==false){
            //获取当前方向的网格
            ;           self.targetGrid=self.gridArr[_rowIndex][_colIndex];
            //目标网格是Null才能移动
            if(self.targetGrid.type!=GridType.Null){
                self.targetGrid=null;
                callback();
                return
            }
            if(self.targetGrid.coloffset>self.curGrid.coloffset){
                min_x=self.curGrid.coloffset;
                max_x=self.targetGrid.coloffset;
            }else{
                min_x=self.targetGrid.coloffset;
                max_x=self.curGrid.coloffset;
            }
            if(self.targetGrid.rowoffset>self.curGrid.rowoffset){
                min_y=self.curGrid.rowoffset;
                max_y=self.targetGrid.rowoffset;
            }else{
                min_y=self.targetGrid.rowoffset;
                max_y=self.curGrid.rowoffset;
            }
        }else{
            callback();
        }
    }
    var min_x=0;
    var max_x=0;
    var min_y=0;
    var max_y=0;

    var offset_x=0;
    var offset_y=0;

    this.moveGrid=function(move_x,move_y){
        if(self.targetGrid==null){
            return;
        }
        self.curGrid.wipeMe();
        offset_x=self.curGrid.coloffset;
        offset_y=self.curGrid.rowoffset;
        self.curGrid.moveTo(move_x,move_y);
        if(self.curGrid.rowoffset<=min_y){
            self.curGrid.rowoffset=min_y;
        }
        if(self.curGrid.rowoffset>=max_y){
            self.curGrid.rowoffset=max_y;
        }
        if(self.curGrid.coloffset<=min_x){
            self.curGrid.coloffset=min_x;
        }
        if(self.curGrid.coloffset>=max_x){
            self.curGrid.coloffset=max_x;
        }
        offset_x=offset_x-self.curGrid.coloffset;
        offset_y=offset_y-self.curGrid.rowoffset;
        self.curGrid.drawMe();
    }

    //注册移动结束处理函数
    this.moveEnd=function(dir){
        if(self.targetGrid==null){
            return;
        }
        if(self.curGrid==null){
            return;
        }
        var isExchange=false;
        if(offset_x==0){
            if(offset_y>0){
                if(dir==Dir.Up){
                    console.log("last up");
                    isExchange=true;
                }

            }else if(offset_y<0){
                if(dir==Dir.Down){
                    isExchange=true;
                    console.log("last down");
                }
            }else{
                if(dir==Dir.Up){
                    if(self.curGrid.rowoffset==max_y){
                        isExchange=false;
                    }else{
                        isExchange=true;
                    }
                }else if(dir==Dir.Down){
                    if(self.curGrid.rowoffset==min_y){
                        isExchange=false;
                    }else{
                        isExchange=true;
                    }
                }
            }
        }
        if(offset_y==0){
            if(offset_x>0){
                if(dir==Dir.Left){
                    isExchange=true;
                    console.log("last left");
                }
            }else if(offset_x<0){
                if(dir==Dir.Right){
                    isExchange=true;
                    console.log("last rigt");
                }
            }else{
                if(dir==Dir.Left){
                    if(self.curGrid.coloffset==max_x){
                        isExchange=false;
                    }else{
                        isExchange=true;
                    }
                }else if(dir==Dir.Right){
                    if(self.curGrid.coloffset==min_x){
                        isExchange=false;
                    }else{
                        isExchange=true;
                    }
                }
            }
        }
        if(isExchange==true){
            exchangeArr(self.curGrid,self.targetGrid);

        }else{
            self.targetGrid.resetMe();
            self.curGrid.resetMe();
        }

        self.curGrid=null;
        self.targetGrid=null;

        checkPoint();

    }

    //是否超过二维数组下标
    function IsExceedArr(rowIndex,colIndex){
        if(rowIndex>=5||rowIndex<0||colIndex>=3||colIndex<0){
            console.log("超出下标");
            return true;
        }
        return false;
    }

    //交换两个网格在二维数组的位置
    function exchangeArr(cur,tar){
        var temp_colIndex=cur.colIndex;
        var temp_rowIndex=cur.rowIndex;
        self.gridArr[tar.rowIndex][tar.colIndex]=cur;
        self.gridArr[cur.rowIndex][cur.colIndex]=tar;
        cur.rowIndex=tar.rowIndex;
        cur.colIndex=tar.colIndex;
        tar.rowIndex=temp_rowIndex;
        tar.colIndex=temp_colIndex;
        tar.resetMe();
        cur.resetMe();
        console.log(self.gridArr);
    }

    //判断点击的网格是否是可以移动的类型
    function IsmMove(grid){
        if(grid.type==GridType.NOT_MOVE
        ||grid.type==GridType.START
        ||grid.type==GridType.END
        ||grid.type==GridType.Null
        ){
            return false;
        }
        return true;
    }

    //判断路径是否正确
    function checkPoint(){
        //开始网格获向上的坐标
        findPointByDir(startGrid,"W");
    }

    //寻找路径函数
    function findPointByDir(grid,dir){
        var _colIndex=grid.colIndex;
        var _rowIndex=grid.rowIndex;
        switch(dir){
            case "W":
                _rowIndex--;
                break;
            case "S":
                _rowIndex++;
                break;
            case "A":
                _colIndex--;
                break;
            case "D":
                _colIndex++;
                break;
        }
        if(IsExceedArr(_rowIndex,_colIndex)==true){
            //超出下标
            return false;
        }
        var _findGrid=self.gridArr[_rowIndex][_colIndex];
        var _type=_findGrid.type;
        if(_type=="NOT_MOVE"||_type=="MOVE"||_type=="Null"){
            return false;
        }
        if(_type=="END"){
            setTimeout(function(){
                alert("拼接成功");
                eventManager.excute("NextLevel");
            },1000/30);
        }

        var _str1=_type[0];
        var _str2=_type[1];
        if(dir=="W"){
            if(_str1=="S"){
                return findPointByDir(_findGrid,_str2);
            }else if(_str2=="S"){
                return findPointByDir(_findGrid,_str1);
            }else{
                return false;
            }
        }else if(dir=="S"){
            if(_str1=="W"){
                return findPointByDir(_findGrid,_str2);
            }else if(_str2=="W"){
                return findPointByDir(_findGrid,_str1);
            }else{
                return false;
            }
        }
        else if(dir=="A"){
            if(_str1=="D"){
                return findPointByDir(_findGrid,_str2);
            }else if(_str2=="D"){
               return findPointByDir(_findGrid,_str1);
            }else{
                return false;
            }
        }
        else if(dir=="D"){
            if(_str1=="A"){
                return findPointByDir(_findGrid,_str2);
            }else if(_str2=="A"){
                return findPointByDir(_findGrid,_str1);
            }else{
                return false;
            }
        }
    }



    return this;
})();