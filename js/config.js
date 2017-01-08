/**
 * Created by Cheater on 2016/12/22.
 */

/**
 * 配置信息相关
 * LevelConfig:关卡配置
 * GridImgConfig:网格图片路径
 */

var LevelConfig={
    "Level1":[
        ["NOT_MOVE","END","NOT_MOVE"],
        ["MOVE","MOVE","WS"],
        ["WS","Null","MOVE"],
        ["MOVE","WS","MOVE"],
        ["NOT_MOVE","START","NOT_MOVE"],
    ],
    "Level2":[
        ["END","NOT_MOVE","NOT_MOVE"],
        ["Null","WS","MOVE"],
        ["WS","MOVE","MOVE"],
        ["WD","AD","AS"],
        ["NOT_MOVE","NOT_MOVE","START"]
    ],
    "Level3":[
        ["END","NOT_MOVE","NOT_MOVE"],
        ["Null","WS","MOVE"],
        ["WD","MOVE","Null"],
        ["WD","AS","AS"],
        ["NOT_MOVE","NOT_MOVE","START"]
    ],
    "Level4":[
        ["END","NOT_MOVE","NOT_MOVE"],
        ["NOT_MOVE","NOT_MOVE","NOT_MOVE"],
        ["NOT_MOVE","MOVE","Null"],
        ["NOT_MOVE","NOT_MOVE","NOT_MOVE"],
        ["NOT_MOVE","NOT_MOVE","START"]
    ]
}

var GridImgConfig={
    "MOVE":"images/Move.png",
    "NOT_MOVE":"images/NotMove.png",
    "START":"images/Start.png",
    "END":"images/End.png",
    "AD":"images/A-D.png",
    "AS":"images/A-S.png",
    "DS":"images/D-S.png",
    "WA":"images/W-A.png",
    "WD":"images/W-D.png",
    "WS":"images/W-S.png",
    "Null":"images/Null.png"
}