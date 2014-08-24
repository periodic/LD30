define({ "height":20,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":20,
         "name":"Background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":20,
         "name":"Ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "height":20,
         "name":"Props",
         "objects":[
                {
                 "height":64,
                 "name":"Goal",
                 "properties":
                    {

                    },
                 "type":"Goal",
                 "visible":true,
                 "width":64,
                 "x":160,
                 "y":160
                }, 
                {
                 "height":64,
                 "name":"Start",
                 "properties":
                    {

                    },
                 "type":"StartPosition",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":1152
                }, 
                {
                 "gid":18,
                 "height":0,
                 "name":"The Block",
                 "properties":
                    {

                    },
                 "type":"Pushable",
                 "visible":true,
                 "width":0,
                 "x":64,
                 "y":1092
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "height":20,
         "name":"ToggleBlock",
         "objects":[
                {
                 "gid":12,
                 "height":64,
                 "name":"",
                 "properties":
                    {
                     "triggerId":"block1"
                    },
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":1024
                }, 
                {
                 "gid":12,
                 "height":64,
                 "name":"",
                 "properties":
                    {
                     "triggerId":"block2"
                    },
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":832
                }, 
                {
                 "gid":12,
                 "height":64,
                 "name":"",
                 "properties":
                    {
                     "triggerId":"block3"
                    },
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":640
                }, 
                {
                 "gid":12,
                 "height":64,
                 "name":"",
                 "properties":
                    {
                     "triggerId":"block4"
                    },
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":448
                }, 
                {
                 "gid":12,
                 "height":64,
                 "name":"",
                 "properties":
                    {
                     "triggerId":"block5"
                    },
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":64,
                 "y":256
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/..\/..\/..\/src\/js-games\/LD30\/images\/tileset.png",
         "imageheight":128,
         "imagewidth":256,
         "margin":0,
         "name":"ground",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":64,
         "tilewidth":64
        }, 
        {
         "firstgid":9,
         "image":"..\/..\/..\/..\/src\/js-games\/LD30\/images\/tileset2.png",
         "imageheight":128,
         "imagewidth":320,
         "margin":0,
         "name":"props",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":64,
         "tilewidth":64
        }],
 "tilewidth":64,
 "version":1,
 "width":10
})