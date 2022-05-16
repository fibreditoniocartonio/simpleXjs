      //crea il canvas
      const widthRes = 16;  const heightRes = 9;  //costanti che indicano la risoluzione - 16:9      
      var canvasWidth = document.documentElement.clientWidth-30;    //prendo la larghezza massima del client e la imposto come larghezza del canvas (tolgo 30 pixel nel caso ci sia la barra laterale/altre cose)
      var canvasHeight = (canvasWidth/widthRes)*heightRes;          //scalo l'altezza del canvas in base alla larghezza per mantenere la risoluzione che ho indicato
      if(document.getElementsByTagName('canvas').length == 0) {     //crea il canvas con le variabili che ho creato
          document.body.innerHTML += "".concat("<canvas id='canvas' width=" , canvasWidth , " height=" , canvasHeight , "></canvas>");
      }   var ctx = document.getElementById('canvas').getContext('2d');
           
			//variabili dei tasti
      var keys = [];
      var jumpkey = 90;         //salta - default z
      var destrakey = 39;       //muovi sinistra - default freccia destra
      var sinistrakey = 37;     //muovi destra - default freccia sinistra
			var dashkey = 88;		  //dash - default x	
            
      //events
      document.body.addEventListener("keydown", function(e) {
          keys[e.keyCode] = true;
      });
          document.body.addEventListener("keyup", function(e) {
          keys[e.keyCode] = false;
      });
            
      //make the player
      var player = {
        x: 0,
        y: 0,
        yv: 0,
        xv: 0,
        slope: 0,
        width: 24.4,
        height: 40,
        color: '#0400f8',
        speed: 0.9,
        defaultspeed: 0.9,
        jumpheight: 10.5,
        giasaltato : false,
      };

			//caricare il livello
			var level = []; //create the level array
			var lvlNumber=0;			

      //prendo lvlNumber e carico il livello scelto - sadly non ancora da file perchè siamo a corto di budget
			function leggiLivelloDaFile() {	//funz che carica il livello scelto - i livello sono salvati come stringhe
				switch (lvlNumber) {
					case 0: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttl..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................f");
					break;

					case 1: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl..........................................................l..........................................................l..bbbbbbb.................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..................................bbbbbbbbbb..............l..........................................................l..........................................................l..........................................................l..........................................................l....................bb....................................l................bb........................................l............bb............................................l........bb................................................l....bb....................................................f");
					break;

					case 2: stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...b...b.bbb.bbb.b.bbb...bbb.bbb.bbb.bbb...b...b.bbb.bbb...bbb...b.....bbb...b.....................................................................................................................................l...bb.bb.b.b.b.b.b.b.b...b.b.b.b.b.b.b.....bb..b.b...b.....b.b..bb.....b.b..bb.....................................................................................................................................l...b.b.b.bbb.bbb.b.b.b...bb..bbb.b.b.bbb...b.b.b.bbb.bbb...b.b.b.b.b.b.b.b.b.b.....................................................................................................................................l...b...b.b.b.bb..b.b.b...b.b.bb..b.b...b...b..bb.b.....b...b.b...b..b..b.b...b.....................................................................................................................................l...b...b.b.b.b.b.b.bbb...bbb.b.b.bbb.bbb...b...b.bbb.bbb...bbb...b.b.b.bbb...b.....................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l.........................................................................................................................................................................................................b.........l.........................................................................................................................................................................................................b.........l.........................................................................................................................................................................................................b.........l................................................................................................................................................................................................bb.......b.........l...............................................................................................................................................................................................bbb.......b.........l......................b.........................................................bbbbbbbb...bbbb................b............bbb....bbbb.......................................................bbbb.......b.........l.............................................................................................................................................................................................bbbbb.......b...b.b.b.l..............................................bb.........bb.................................................................................b..b..........bb..b.............................bbbbbb.......b...bbbbb.l...............b....bbbbb.............bb......bb.........bb..................bbb..............b......bb.....b..b..b.....b...........bb.....bb..bb........bbb..bb...........bbbb............bbbbbbb.......b...bbbbb.l............................bb........bb......bb.........bb...............................................................................bbb..bbb......bbbb..bbb.....bb..............bb..bbbbbbbb.......b...bb.bb.l............................bb........bb......bb.........bb..............................................................................bbbb..bbbb....bbbbb..bbbb....bb..............bb.bbbbbbbbb......bbb..bb.bb.lbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbf");
					break;
										
					default:
					alert("Errore nel caricamento del livello - Carico level 0")
					lvlNumber=0;
					leggiLivelloDaFile() 
				}
				return
			}

			function stringToLevel(lvlString){
				level = [];
				var widthTot=0;
				var heightTot=1;
				for (let i = 0; i < lvlString.length; i++) { //ciclo la stringa livello per trasformarlo da stringa a livello vero
				switch (lvlString[i]){
						case 't': // t è il top floor/ceiling
							widthTot++;
							break;
					
						case 'l': // l è il left floor
							heightTot++;
							break;
					
						case 'b': // b indica un blocco da 25px*25px
							var blocco = {
           	    			x: (i%widthTot)*25,
                			y: (heightTot-1)*25,
                			width: 26,
      		    				height: 26,
            					color: '#155261'								
							}
							level.push(blocco);
							break;
											
						case 'f': // f è il bottom floor, è una sola e indica la fine del livello (legge la lunghezza da t). Da qui inizializzo le robe					
							widthTot++;
							heightTot++;
							break;
					
						case '.': // . è vuoto/aria
							break;															
					}
				}
        
				level['maxWidth'] = widthTot*25;
				level['maxHeight'] = heightTot*25;
        if (level.maxWidth < canvas.width){    //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
            canvasWidth=level.maxWidth;
        }else{
            canvasWidth=canvas.width;
        }
        if (level.maxHeight < canvas.height){    //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
            canvasHeight=level.maxHeight;
        }else{
            canvasHeight=canvas.height;
        }         
        
        //qui carico delle cose io ma saranno dati contenuti nei vari livelli, dopo il carattere 'f'        
				level['gravity'] = 0.62;
        level['friction'] = 0.85;
				level['xStartingPos']=50;
	  //	level['yStartingPos']=level.maxHeight-80;
				level['yStartingPos']=280;

				var ground = {
               		x: 0,
               		width: level.maxWidth,
               		height: 26,
               		color: '#155261'
            	};  ground['y']=level.maxHeight-ground.height;

            	var ceiling = {
           	    	x: 0,
                	y: 0,
                	width: level.maxWidth,
      		    	height: 26,
            		color: '#155261'
            	};
            	            
            	var leftWall = {
               		x: 0,
               		y: 0,
               		width: 26,
               		height: level.maxHeight,
               		color: '#155261'
           		 };
            
            	var rightWall = {
               		y: 0,
               		width: 26,
               		height: level.maxHeight,
               		color: '#155261'
            	};  rightWall['x']= level.maxWidth-rightWall.width;	
            				
				level.push(ground, ceiling, leftWall, rightWall); //this pushes all of the static objects into the level
				   
        ctx.clearRect(0, 0, canvas.width, canvas.height); //pulisce tutto per evitare dubbi
				nuovoLivello();				
			}
			
			leggiLivelloDaFile(); //chiama le funzioni di sopra

			//bottone per scegli il livello
			const buttonLvl0 = document.createElement('button')
			buttonLvl0.innerText = 'level--'
			buttonLvl0.addEventListener('click', () => {
			  lvlNumber--;
			  leggiLivelloDaFile();
			})
			const buttonLvl1 = document.createElement('button')
			buttonLvl1.innerText = 'level++'
			buttonLvl1.addEventListener('click', () => {
			  lvlNumber++;
			  leggiLivelloDaFile();
			})
			document.body.appendChild(buttonLvl0)
			document.body.appendChild(buttonLvl1)
			
      //start the engine
      window.onload = start;
            
      //this function is called at the start
      function start() {
				nuovoLivello();
        update();
      }

			function nuovoLivello(){	//azzera i dati del player
                player.x = level.xStartingPos;
                player.y = level.yStartingPos;
                player.speed = player.defaultspeed;
			}
                            
      //this function is called every frame
      function update() {
        requestAnimationFrame(update);
        drawLvl();
        drawPlayer();
        playerPhysics(player, level);
      }
            
      function drawPlayer() {
			  //variabili che praticamente gestiscono la visuale      
        var xdisegnata=0;	//mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull asse x
        if (player.x < canvasWidth/2) {	//se la x del player è minore di mezzo canvas la tiene com'è
          xdisegnata=player.x;
        }else{
          if (player.x > level.maxWidth-canvasWidth/2){ //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
              xdisegnata=canvasWidth-level.maxWidth+player.x;
          }else{
              xdisegnata=canvasWidth/2;	
          }
        }
        var ydisegnata=0;	//mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull'asse y
        if (player.y < canvasHeight/2) {	//se la y del player è minore di mezzo canvas la tiene com'è
           ydisegnata=player.y;
        }else{
            if (player.y > level.maxHeight-canvasHeight/2){ //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
              ydisegnata=canvasHeight-level.maxHeight+player.y;
            }else{
              ydisegnata=canvasHeight/2;	
            }
        }
      
        //ombre del dash
        if (player.speed>player.defaultspeed){
            if (player.xv < -10){
                ctx.fillStyle ='#b0aefd';
                ctx.fillRect(xdisegnata-50, ydisegnata+3, player.width-3, player.height-6);
                ctx.fillStyle ='#7573ff';
                ctx.fillRect(xdisegnata-26, ydisegnata+1, player.width-1, player.height-2);
            }else if (player.xv > 10){
               ctx.fillStyle ='#b0aefd';
               ctx.fillRect(xdisegnata+50, ydisegnata+3, player.width-3, player.height-6);
               ctx.fillStyle ='#7573ff';
               ctx.fillRect(xdisegnata+26, ydisegnata+1, player.width-1, player.height-2);
            }
        }
	     //ora disegna effettivamente il player
        ctx.fillStyle = player.color;
        ctx.fillRect(xdisegnata, ydisegnata, player.width, player.height);                
      }
            
      //this function draws the level
      function drawLvl() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);	//pulisci tutto il canvas
        for (var i = 0; i < level.length; i++) {
          ctx.fillStyle = level[i].color;
          //variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
          var xdisegnata=0
          if (player.x < canvasWidth/2){
            xdisegnata=level[i].x;
          }else{
            if (player.x > level.maxWidth-canvasWidth/2){
              xdisegnata=level[i].x-level.maxWidth+canvasWidth;
            }else{
              xdisegnata=level[i].x-player.x+canvasWidth/2;
            }
          }
					var ydisegnata=0
          if (player.y < canvasHeight/2){
            ydisegnata=level[i].y;
          }else{
            if (player.y > level.maxHeight-canvasHeight/2){
              ydisegnata=level[i].y-level.maxHeight+canvasHeight;
            }else{
              ydisegnata=level[i].y-player.y+canvasHeight/2;
            }
          }
          //ora disegno il livello                    
          ctx.fillRect(xdisegnata, ydisegnata, level[i].width, level[i].height);
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
      } //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
            
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
