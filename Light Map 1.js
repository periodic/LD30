define({ "height":10,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 8, 8, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "name":"Ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "height":10,
         "name":"Goal",
         "objects":[
                {
                 "height":44,
                 "name":"EndPosition",
                 "properties":
                    {

                    },
                 "type":"EndPosition",
                 "visible":true,
                 "width":62,
                 "x":322,
                 "y":134
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "height":10,
         "name":"Start",
         "objects":[
                {
                 "height":50,
                 "name":"StartPosition",
                 "properties":
                    {

                    },
                 "type":"StartPosition",
                 "visible":true,
                 "width":50,
                 "x":322,
                 "y":388
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "name":"Background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "height":10,
         "name":"Blocks",
         "objects":[
                {
                 "gid":12,
                 "height":64,
                 "name":"Block1",
                 "properties":
                    {
                     "triggerId":"light1"
                    },
                 "type":"ToggleBlock",
                 "visible":true,
                 "width":64,
                 "x":448,
                 "y":320
                }, 
                {
                 "gid":12,
                 "height":64,
                 "name":"Block2",
                 "properties":
                    {
                     "triggerId":"light1"
                    },
                 "type":"ToggleBlock",
                 "visible":true,
                 "width":64,
                 "x":192,
                 "y":320
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
         "image":"images\/tileset.png",
         "imageheight":128,
         "imagewidth":256,
         "margin":0,
         "name":"tileset",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":64,
         "tilewidth":64
        }, 
        {
         "firstgid":9,
         "image":"images\/tileset2.png",
         "imageheight":128,
         "imagewidth":384,
         "margin":0,
         "name":"tileset2",
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
