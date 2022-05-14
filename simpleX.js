			//variable declaration
            var keys = [];
            var level = [];
            level['maxHeight'] = 720;
            level['maxWidth'] = 1280;
            level['gravity'] = 0.62;
            level['friction'] = 0.85;
					            
            //variabili dei tasti
            var jumpkey = 90;         //salta - default z
            var destrakey = 39;       //muovi sinistra - default freccia destra
            var sinistrakey = 37;     //muovi destra - default freccia sinistra
			var dashkey = 88;			  //dash - default x	
            
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
                color: '#0400f8',
                speed: 0.9,
                defaultspeed: 0.9,
                jumpheight: 10.5,
                giasaltato : false,
            };

            
            var ground = {
                x: 0,
                width: level.maxWidth,
                height: 30,
                color: '#155261'
            };  ground['y']=level.maxHeight-ground.height;
            
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
                y: 0,
                width: 30,
                height: level.maxHeight,
                color: '#155261'
            };  rightWall['x']= level.maxWidth-rightWall.width;
            
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
                playerPhysics(player, level);
            }
            
            //this function draws the player
            function drawPlayer() {
                ctx.clearRect(0, 0, level.maxWidth, level.maxHeight);	//pulisci tutto
		    		//ombre del dash
                if (player.speed>player.defaultspeed){
                	if (player.xv < -10){
                		ctx.fillStyle ='#b0aefd';
                		ctx.fillRect(player.x-50, player.y+3, player.width-3, player.height-6);
                		ctx.fillStyle ='#7573ff';
                		ctx.fillRect(player.x-26, player.y+1, player.width-1, player.height-2);
                	}else if (player.xv > 10){
                		ctx.fillStyle ='#b0aefd';
                		ctx.fillRect(player.x+50, player.y+3, player.width-3, player.height-6);
                		ctx.fillStyle ='#7573ff';
                		ctx.fillRect(player.x+26, player.y+1, player.width-1, player.height-2);
                	}
                }
	     			//ora disegna effetticamente il player
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

            //this function handles the platformer physics - in realta' solo del player
            function playerPhysics(p1, lvl) {
                //gravity
                p1.yv += lvl.gravity;
                p1.y += p1.yv;
                
                //y collision
                for(var i = 0; i < lvl.length; i++) {
                    if(collisionBetween(p1, lvl[i])) {
                        p1.y += -p1.yv;
                        //dash
                        if(keys[dashkey]) {
                        	   p1.speed=p1.defaultspeed*3.2;
                          }else{
                        		p1.speed=player.defaultspeed;
                        }
                        //jump
                        if(keys[jumpkey]) {
                          if(!p1.giasaltato) {
                            p1.yv = -p1.jumpheight;
                            p1.giasaltato = true;
                          } else {
                           p1.yv = 0; 
                          }
                        } else {
                            p1.yv = 0;
                            p1.giasaltato = false;
                        }
                    }	
                }
                
                //x movement
                if(keys[destrakey]) {
                    p1.xv -= p1.speed;
                }
                if(keys[sinistrakey]) {
                    p1.xv += p1.speed;
                }
                p1.xv *= lvl.friction;
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
                        //wall dash
                        if(keys[dashkey]) {
                        	   p1.speed=p1.defaultspeed*3.2;
                          }else{
                        		p1.speed=player.defaultspeed;
                        }
                        //wall jumping
                        if(keys[jumpkey]) {
                         if(!p1.giasaltato) { 
                            p1.yv = -p1.jumpheight + 1;
                            if(p1.xv > 0) {
                                p1.xv = -10;
                            } else {
                                p1.xv = 10;
                            }
                            p1.giasaltato = true;
                         } else {
                            p1.xv = 0;
                         }
                       } else {
                            p1.xv = 0;
                            p1.giasaltato = false;
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
