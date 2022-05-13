			//variable declaration
            var keys = [];
            var level = [];
            level['maxHeight'] = 720;
            level['maxWidth'] = 1280;
            
            //variabili dei tasti
            var jumpkey = 90;         //default z
            var giasaltato = false;
            var destrakey = 39;       //default freccia destra
            var sinistrakey = 37;     //default freccia sinistra
            
            //events
            document.body.addEventListener("keydown", function(e) {
                keys[e.keyCode] = true;
            });
            document.body.addEventListener("keyup", function(e) {
                keys[e.keyCode] = false;
            });
            
            //make the level and player
            var player = {
                x: 0,
                y: 0,
                yv: 0,
                xv: 0,
                slope: 0,
                width: 25,
                height: 40,
                color: '#0400f8'
            };

            
            var ground = {
                x: 0,
                //y: level.maxHeight-30,
                width: level.maxWidth,
                height: 30,
                color: '#155261'
            }; ground['y']=level.maxHeight-ground.height;
            
            var ceiling = {
                x: 0,
                y: 0,
                width: level.maxWidth,
                height: 30,
                color: '#155261'
            };
            
            
            var leftWall = {
                x: 0,
                y: 0,
                width: 30,
                height: level.maxHeight,
                color: '#155261'
            };
            
            var rightWall = {
               
                x: 0,
                y: 0,
                width: 30,
                height: level.maxHeight,
                color: '#155261'
            };  rightWall.x= level.maxWidth-rightWall.width;
            
            var ceilingBlock = {
                x: 100,
                y: 400,
                width: 50,
                height: 20,
                color: '#155261'
            }           
            
            //this pushes all of the static objects into the level
            level.push(ground, leftWall, rightWall, ceilingBlock, ceiling);



            //if you don't have a canvas, this adds it
            if(document.getElementsByTagName('canvas').length == 0) {
                document.body.innerHTML += "".concat("<canvas id='canvas' width=" , level.maxWidth.toString() , " height=" , level.maxHeight.toString() , "></canvas>");
            }   var ctx = document.getElementById('canvas').getContext('2d');


            //start the engine
            window.onload = start;
            
            //this function is called at the start
            function start() {
                player.x = 50;
                player.y = level.maxHeight-80;
                update();
            }
            
            //this function is called every frame
            function update() {
                requestAnimationFrame(update);
                drawPlayer();
                drawLvl();
                //this function takes in the following:
                //the player | the level | the player speed | the player gravity //the player friction | the player jump height
                physics(player, level, 0.9, 0.62, 0.85, 10.5);
            }
            
            //this function draws the player
            function drawPlayer() {
                ctx.clearRect(0, 0, level.maxWidth, level.maxHeight);
                ctx.fillStyle = player.color;
                ctx.fillRect(player.x, player.y, player.width, player.height);
            }
            
            //this function draws the level
            function drawLvl() {
                for (var i = 0; i < level.length; i++) {
                    ctx.fillStyle = level[i].color;
                    ctx.fillRect(level[i].x, level[i].y, level[i].width, level[i].height);
                }
            }

            //this function handles the platformer physics
            function physics(p1, lvl, speed, gravity, friction, jumpheight) {
                //gravity
                p1.yv += gravity;
                p1.y += p1.yv;
                
                //y collision
                for(var i = 0; i < lvl.length; i++) {
                    if(collisionBetween(p1, lvl[i])) {
                        p1.y += -p1.yv;
                        if(keys[jumpkey]) {
                          if(!giasaltato) {
                            p1.yv = -jumpheight;
                            giasaltato = true;
                          } else {
                           p1.yv = 0; 
                          }
                        } else {
                            p1.yv = 0;
                            giasaltato = false;
                        }
                    }
                }
                
                //x movement
                if(keys[destrakey]) {
                    p1.xv -= speed;
                }
                if(keys[sinistrakey]) {
                    p1.xv += speed;
                }
                p1.xv *= friction;
                p1.x += -p1.xv;
                
                //slopes
                p1.slope = 0;
                for(var i = 0; i < lvl.length; i++) {
                    if(collisionBetween(p1, lvl[i])) {
                        if(p1.slope != -8) {
                            p1.y -= 1;
                            p1.slope += 1;
                        }
                    }
                }
                
                //x collision
                for(var i = 0; i < lvl.length; i++) {
                    if(collisionBetween(p1, lvl[i])) {
                        p1.y += p1.slope;
                        p1.x -= -p1.xv;
                        
                        //wall jumping
                        if(keys[jumpkey]) {
                         if(!giasaltato) { 
                            p1.yv = -jumpheight + 1;
                            if(p1.xv > 0) {
                                p1.xv = -10;
                            } else {
                                p1.xv = 10;
                            }
                            giasaltato = true;
                         } else {
                            p1.xv = 0;
                         }
                       } else {
                            p1.xv = 0;
                            giasaltato = false;
                       }   
                    }
                }
            }
            
            //this function detects the collision between the two given objects
            function collisionBetween(p1, lvl) {
                if (lvl.x < p1.x + p1.width &&
                    lvl.x + lvl.width > p1.x &&
                    lvl.y < p1.y + p1.height &&
                    lvl.y + lvl.height > p1.y) {
                    return true;
                } else {
                    return false;
                } 
            }
            
            //this function detects the collision between the two given objects
            function collisionBetween(p1, lvl) {
                if (lvl.x < p1.x + p1.width &&
                    lvl.x + lvl.width > p1.x &&
                    lvl.y < p1.y + p1.height &&
                    lvl.y + lvl.height > p1.y) {
                    return true;
                } else {
                    return false;
                } 
            }
