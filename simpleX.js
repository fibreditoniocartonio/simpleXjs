      //crea il canvas
      const widthRes = 720;  const heightRes = 540;  //costanti che indicano la risoluzione - 4:3      
      var scala=0;
      for (scala=1; ;scala++){    //calcola quante volte riesco a farci stare nella schermata la risoluzione di cui sopra, poi salva la variabile scala che moltiplica tutto
          if(widthRes*scala > document.documentElement.clientWidth){
            scala--;
            if(heightRes*scala > document.documentElement.clientHeight){
              scala--;
              break;
            }else{
              break;
            }
          }
      }
//      if (scala < 1){alert("Your screen is too small... Try to zoom out your browser page a little (Usually Ctrl and -)");}
      if (scala < 1){scala=1;}
      var canvasWidth = widthRes*scala;
      var canvasHeight = heightRes*scala;
      if(document.getElementsByTagName('canvas').length == 0) {     //crea il canvas con le variabili che ho creato
          document.body.innerHTML += "".concat("<canvas id='canvas' width=" , canvasWidth , " height=" , canvasHeight , "></canvas>");
      }   var ctx = document.getElementById('canvas').getContext('2d');
           
	  //variabili dei tasti
      var keys = [];            //vettore tasti
      var tastoGiaSchiacciato = false; //mi serve per alcune funzioni tipo selectScreen()
      var jumpkey = 90;         //salta - default z
      var destrakey = 39;       //muovi sinistra - default freccia destra
      var sinistrakey = 37;     //muovi destra - default freccia sinistra
      var sukey = 38;           //default freccia su
      var giukey = 40;          //default freccia giu
      var dashkey = 88;		      //dash - default x
      var sparokey = 65;		    //shoot - default a
      var startkey = 13;		    //start - default INVIO/ENTER
            
      //events - leggi tasti schiacciati
      document.body.addEventListener("keydown", function(e) {
          keys[e.keyCode] = true;
      });
          document.body.addEventListener("keyup", function(e) {
          keys[e.keyCode] = false;
      });
            
      //prototipo del player
      function Player() {
      	this.life=16;
      	this.lifeMax=16;
        this.x= 0;
        this.y= 0;
        this.yv= 0;
        this.xv= 0;
        this.slope= 0;
        this.width= (25*scala)-0.5;
        this.height= 40*scala;
        this.color= '#0400f8';
        this.defaultColor= '#0400f8';
        this.damagedColor= '#990003';
        this.charge0color= '#ffc000';
        this.charge1color= '#49ff37';
        this.charge2color= '#14dfff';        
        this.speed= 0.9*scala;
        this.defaultspeed= 0.9*scala;
        this.jumpheight= 11.5*scala;
        this.giasaltato = false;
        this.giasparato = false;
        this.facingRight = true;
        this.invulnerability = 0;
        carica= 0; //carica dei colpi
      }
      var player = new Player(); //creo il player

			//caricare il livello
			var level = []; //create the level array
			var lvlNumber=1;
      var stageSelection=true;			

      		//prendo lvlNumber e carico il livello scelto - sadly non ancora da file perchè siamo a corto di budget
			function leggiLivelloDaFile() {	//funz che carica il livello scelto - i livello sono salvati come stringhe
				switch (lvlNumber) {
					case 1: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttl..................................................l..................................................l..................................................l..................................................l......................................P...........l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..............................P...................l....................................P.............l..................................................f");
					break;

					case 2: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl..........................................................l..........................................................l..bbbbbbb.................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..........................................................l..................................bbbbbbbbbb..............l..........................................................l..........................................................l..........................................................l..........................................................l....................bb....................................l................bb........................................l............bb............................................l........bb................................................l....bb....................................................f");
					break;

					case 3: stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...b...b.bbb.bbb.b.bbb...bbb.bbb.bbb.bbb...b...b.bbb.bbb...bbb...b.....bbb...b.....................................................................................................................................l...bb.bb.b.b.b.b.b.b.b...b.b.b.b.b.b.b.....bb..b.b...b.....b.b..bb.....b.b..bb.....................................................................................................................................l...b.b.b.bbb.bbb.b.b.b...bb..bbb.b.b.bbb...b.b.b.bbb.bbb...b.b.b.b.b.b.b.b.b.b.....................................................................................................................................l...b...b.b.b.bb..b.b.b...b.b.bb..b.b...b...b..bb.b.....b...b.b...b..b..b.b...b.....................................................................................................................................l...b...b.b.b.b.b.b.bbb...bbb.b.b.bbb.bbb...b...b.bbb.bbb...bbb...b.b.b.bbb...b.....................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l.........................................................................................................................................................................................................b.........l.........................................................................................................................................................................................................b.........l.........................................................................................................................................................................................................b.........l................................................................................................................................................................................................bb.......b.........l...............................................................................................................................................................................................bbb.......b.........l......................b.........................................................bbbbbbbb...bbbb................b............bbb....bbbb.......................................................bbbb.......b.........l.............................................................................................................................................................................................bbbbb.......b...b.b.b.l..............................................bb.........bb.................................................................................b..b..........bb..b.............................bbbbbb.......b...bbbbb.l...............b....bbbbb.............bb......bb.........bb..................bbb..............b......bb.....b..b..b.....b...........bb.....bb..bb........bbb..bb...........bbbb............bbbbbbb.......b...bbbbb.l............................bb........bb......bb.........bb...............................................................................bbb..bbb......bbbb..bbb.....bb..............bb..bbbbbbbb.......b...bb.bb.l............................bb........bb......bb.........bb..............................................................................bbbb..bbbb....bbbbb..bbbb....bb..............bb.bbbbbbbbb......bbb..bb.bb.lbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbf");
					break;
										
					default:
					alert("Errore nel caricamento del livello - carico il level 1")
					lvlNumber=1;
					leggiLivelloDaFile();
				}
				return
			}

			function stringToLevel(lvlString){
				level = []; //azzera level
				entity = []; //azzera entity
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
           	    			x: (i%widthTot)*25*scala,
                			y: (heightTot-1)*25*scala,
                			width: (25*scala)+1,
      		    				height: (25*scala)+1,
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
              
           				//ora le entita' (lettere maiuscole)
            			case 'P': // P indica un pipistrello
             			 	var pipistrello = new newPipistrello();
             			 	pipistrello.x= (i%widthTot)*25*scala;
             				pipistrello.y= (heightTot-1)*25*scala;
							entity.push(pipistrello);
							break;  															
					}
				}
        
				level['maxWidth'] = widthTot*25*scala;
				level['maxHeight'] = heightTot*25*scala;
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
				level['gravity'] = 0.62*scala;
        level['friction'] = 0.85;
				level['xStartingPos']=50*scala;
				level['yStartingPos']=280*scala;

				var ground = {
               		x: 0,
               		width: level.maxWidth,
               		height: (25*scala)+1,
               		color: '#155261'
            	};  ground['y']=level.maxHeight-ground.height;

            	var ceiling = {
           	    	x: 0,
                	y: 0,
                	width: level.maxWidth,
      		    	height: (25*scala)+1,
            		color: '#155261'
            	};
            	            
            	var leftWall = {
               		x: 0,
               		y: 0,
               		width: (25*scala)+1,
               		height: level.maxHeight,
               		color: '#155261'
           		 };
            
            	var rightWall = {
               		y: 0,
               		width: (25*scala)+1,
               		height: level.maxHeight,
               		color: '#155261'
            	};  rightWall['x']= level.maxWidth-rightWall.width;	
            				
				level.push(ground, ceiling, leftWall, rightWall); //this pushes all of the static objects into the level
				   
        		ctx.clearRect(0, 0, canvas.width, canvas.height); //pulisce tutto per evitare dubbi				
			} 
      
      var entity = []; //create the level array. Ogni entità deve avere: x, y, width, height e il metodo physics che determinerà come si comporta l'entità
      //adesso inizio i prototipi delle entita'
      function newSparo() {//lo sparo creato dal player
        this.life= 1;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.x= player.x;
        this.y= player.y+(10*scala);
        this.xv= 0;
        this.width= 20*scala;
        this.height= 10*scala;
        this.color= player.charge0color;
        this.speed= 3.9*scala;
        this.facingRight= player.facingRight;
        this.perforation= false;
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if (this.facingRight){
            this.xv -= this.speed;
          }else{
            this.xv += this.speed;
          }
          this.xv *= level.friction;
          this.x += -this.xv;    
          //collisione dello sparo con level
          for (i=0; i<level.length;i++){
            if (collisionBetween(this,level[i])){
              this.life--;
            }
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type)  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                entity[i].life-=this.damage;
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life--;
                }
              }
            }
          }
        }
      }

      function newPipistrello() {//mostro pipistrello
        this.life= 1;
        this.type= "mostro";
        this.damage= 1;
        this.x= 0;
        this.y= 0;
        this.xv= 0;
        this.yv= 0;
        this.slope = 0;
        this.width= 30*scala;
        this.height= 30*scala;
        this.color= '#a400ff';
        this.speed= 0.5*scala;
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento
          if (this.x < player.x){
            this.xv -= this.speed;
          }else{
            this.xv += this.speed;
          }
          if (this.y < player.y){
            this.yv -= this.speed;
          }else{
            this.yv += this.speed;
          }
          this.xv *= level.friction;
          this.yv *= level.friction;
          this.x += -this.xv;
          this.y += -this.yv;   
          //collisione con level

          this.slope = 0;	//serve per i bordi tipo
          for(var i = 0; i < level.length; i++) {
            if(collisionBetween(this, level[i])) {
              if(this.slope != -8) {
                this.y -= 1;
                this.slope += 1;
              }
            }
          }
          // level collision
          for(var i = 0; i < level.length; i++) {
            if(collisionBetween(this, level[i])) {
              this.y += this.slope;
              this.x += this.xv*2;
              this.xv = 0;
            } 
            if(collisionBetween(this, level[i])) {
              this.y += this.yv*2;
              this.yv = 0;
            }   
          }

          //other entity mostro collision - e' un po buggata
          for(var i = 0; i < entity.length; i++) {
          	if (entity[i].life > 0 && entity[i].type=="mostro" && !(i==indiceDiQuestaEntity)){
            	if(collisionBetween(this, entity[i])) {
              		this.x += this.xv*1.95;
              		this.xv = 0;
					this.y += this.yv*1.95;
					this.yv = 0;
            	}  
            }
          } 
        }              
      }
      
/*
			const buttonLvl0 = document.createElement('button')
			buttonLvl0.innerText = 'level--'
			buttonLvl0.addEventListener('click', () => {
			  lvlNumber--;
			  nuovoLivello();
			})
			const buttonLvl1 = document.createElement('button')
			buttonLvl1.innerText = 'level++'
			buttonLvl1.addEventListener('click', () => {
			  lvlNumber++;
			  nuovoLivello();
			})
			document.body.appendChild(buttonLvl0)
			document.body.appendChild(buttonLvl1)
*/			
      //start the engine
      window.onload = start;
            
      //this function is called at the start
		function start() {
      update();
		}

		function nuovoLivello(){	//azzera i dati del player
			player = new Player();
			leggiLivelloDaFile();
      player.x = level.xStartingPos;
      player.y = level.yStartingPos;
		}
                            
      //this function is called every frame
      function update() {
        requestAnimationFrame(update); //credo che sia la roba che crea il ciclo del gioco
        if (!stageSelection){
          drawLvl();
          drawHUD();		//if you move drawHUD() under playerPhysics() the HUD will always be drawn on top of everything, but i like it this way. Entities and the player are more important then the hud lol
          drawEntity(); //in questa funzione viene chiamata anche il metodo entity[i].physics per le entità che vengono disegnate su schermo (le uniche che carico)
          drawPlayer(); 
          playerPhysics(player, level);
        }else{
          stageSelect();
        }
      }

	  function xDisegnata(){
        if (player.x < canvasWidth/2) {	//se la x del player è minore di mezzo canvas la tiene com'è
          xdisegnata=player.x;
        }else{
          if (player.x > level.maxWidth-canvasWidth/2){ //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
              xdisegnata=canvasWidth-level.maxWidth+player.x;
          }else{
              xdisegnata=canvasWidth/2;	
          }
        }
        return xdisegnata;	
	  }
	  function yDisegnata(){
       if (player.y < canvasHeight/2) {	//se la y del player è minore di mezzo canvas la tiene com'è
           ydisegnata=player.y;
        }else{
            if (player.y > level.maxHeight-canvasHeight/2){ //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
              ydisegnata=canvasHeight-level.maxHeight+player.y;
            }else{
              ydisegnata=canvasHeight/2;	
            }
        }
        return ydisegnata;
	  }
            
      function drawPlayer() {
			  //variabili che praticamente gestiscono la visuale      
        var xdisegnata=xDisegnata();	//mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull asse x
        var ydisegnata=yDisegnata();	//mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull'asse y
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
            if (player.xv < (-10*scala)){
                ctx.fillStyle ='#b0aefd';
                ctx.fillRect(xdisegnata-(50*scala), ydisegnata+(3*scala), player.width-(3*scala), player.height-(6*scala));
                ctx.fillStyle ='#7573ff';
                ctx.fillRect(xdisegnata-(26*scala), ydisegnata+(1*scala), player.width-(1*scala), player.height-(2*scala));
            }else if (player.xv > (10*scala)){
               ctx.fillStyle ='#b0aefd';
               ctx.fillRect(xdisegnata+(50*scala), ydisegnata+(3*scala), player.width-(3*scala), player.height-(6*scala));
               ctx.fillStyle ='#7573ff';
               ctx.fillRect(xdisegnata+(26*scala), ydisegnata+(1*scala), player.width-(1*scala), player.height-(2*scala));
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

      function drawHUD(){
      	ctx.fillStyle = '#9e9e9e';
		ctx.fillRect(8*scala, 8*scala, (player.lifeMax*6+39)*scala, 29*scala);
		ctx.fillStyle = '#3d3b3b';
		ctx.fillRect(10*scala, 10*scala, (player.lifeMax*6+40)*scala, 30*scala);
		ctx.fillStyle = player.color; //ora disegno la x che sara' del colore del player attivo
		ctx.fillRect(13*scala, 13*scala, 8*scala, 8*scala);ctx.fillRect(29*scala, 13*scala, 8*scala, 8*scala);ctx.fillRect(13*scala, 29*scala, 8*scala, 8*scala);ctx.fillRect(29*scala, 29*scala, 8*scala, 8*scala);ctx.fillRect(21*scala, 21*scala, 8*scala, 8*scala);
		for (i=0; i < player.lifeMax; i++) {
			if (i < player.life){
				ctx.fillStyle = player.charge0color;
			}else{
				ctx.fillStyle = '#797979';
			}
			ctx.fillRect((i*6+43)*scala, 15*scala, 5*scala, 20*scala);
		}
      }
      
      function drawEntity(){   //disegna le entità a schermo e chiama la entity[i].physics
        for (var i = 0; i < entity.length; i++) {
          if (entity[i].life > 0){ //calcola la entita solo se la sua vita è maggiore di zero
            ctx.fillStyle = entity[i].color;
            //variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
            var xdisegnata=0
            if (player.x < canvasWidth/2){
              xdisegnata=entity[i].x;
            }else{
              if (player.x > level.maxWidth-canvasWidth/2){
                xdisegnata=entity[i].x-level.maxWidth+canvasWidth;
              }else{
                xdisegnata=entity[i].x-player.x+canvasWidth/2;
              }
            }
			      var ydisegnata=0
            if (player.y < canvasHeight/2){
              ydisegnata=entity[i].y;
            }else{
              if (player.y > level.maxHeight-canvasHeight/2){
                ydisegnata=entity[i].y-level.maxHeight+canvasHeight;
              }else{
                ydisegnata=entity[i].y-player.y+canvasHeight/2;
              }
            }
            //ora disegno l'entita e chiamo physics se e' dentro il canvas disegnato+unQuartoDiCanvas (questa roba non si applica se è uno sparo del player - se no si bugga tutto)                    
            if ( (xdisegnata > (-canvasWidth/4) && xdisegnata < (canvasWidth+(canvasWidth/4))) && (ydisegnata > (-canvasHeight/4) && ydisegnata < (canvasHeight+(canvasHeight/4))) || entity[i].type=="sparoDelPlayer") { //questo if fa i controlli spiegati sopra 
              ctx.fillRect(xdisegnata, ydisegnata, entity[i].width, entity[i].height);
              entity[i].physics(xdisegnata,ydisegnata, i);
            }
          }
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
              p1.speed=p1.defaultspeed*2.5;
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
          player.facingRight = true;
        }
        if(keys[sinistrakey]) {
          p1.xv += p1.speed;
          player.facingRight = false;
        }
        p1.xv *= lvl.friction;
        p1.x += -p1.xv;
                
        //shooting
        if(keys[sparokey]) {
          if(!player.giasparato){
            var sparo = new newSparo();
            entity.push(sparo);
            player.giasparato = true;
          }else{
            player.carica++;
            if (player.carica > 100){ //disegna i pallini del colore della carica intorno al player
              var xdisegnata=xDisegnata(); var ydisegnata=yDisegnata();
              var xrandom=((-player.width/4)+Math.floor(Math.random() * (player.width/2)))*3; var yrandom=((-player.height/4)+Math.floor(Math.random() * (player.height/2)))*2;
              ctx.fillStyle = player.charge0color;
        	  ctx.fillRect(xdisegnata+(player.width/2)+xrandom, ydisegnata+(player.height/2)+yrandom, 8*scala, 8*scala);
            }else if(player.carica > 25){
              var xdisegnata=xDisegnata(); var ydisegnata=yDisegnata();
              var xrandom=((-player.width/4)+Math.floor(Math.random() * (player.width/2)))*3; var yrandom=((-player.height/4)+Math.floor(Math.random() * (player.height/2)))*2;
              ctx.fillStyle = player.charge1color;
        	  ctx.fillRect(xdisegnata+(player.width/2)+xrandom, ydisegnata+(player.height/2)+yrandom, 8*scala, 8*scala);
            }   
          }
        }else{
          if (player.giasparato){
            if (player.carica > 100){
            	var sparo = new newSparo();
                sparo.width= 50*scala;
                sparo.height= 25*scala;
                if (!sparo.facingRight){
                	sparo.x= sparo.x-player.width;
                }
                sparo.y= player.y+(5*scala);
                sparo.color= player.charge2color;
                sparo.perforation=true;
                entity.push(sparo);
            }else if (player.carica > 25){
            	var sparo = new newSparo();
            	sparo.width= 35*scala;
            	sparo.height= 15*scala;
            	sparo.color= player.charge1color;
            	entity.push(sparo);
            }
            player.color=player.defaultColor ;
            player.carica=0;
            player.giasparato=false;
          }
        }
                
        p1.slope = 0;	//serve per i bordi tipo
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
              p1.speed=p1.defaultspeed*2.5;
            }else{
              p1.speed=player.defaultspeed;
            }
            //wall jumping
            if(keys[jumpkey]) {
              if(!p1.giasaltato) { 
                p1.yv = -p1.jumpheight + 1;
                if(p1.xv > 0) {
                  p1.xv = -10*scala;
                } else {
                  p1.xv = 10*scala;
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

        //entity collison
        if (player.invulnerability < 1){
			    for(var i = 0; i < entity.length; i++) {
				    if(entity[i].life > 0 && !(entity[i].type=="sparoDelPlayer")) {
              if(collisionBetween(player, entity[i])) {
						    player.color=player.damagedColor;
						    player.life=player.life-entity[i].damage;
						    player.invulnerability=50;
						    break;
            	}
        		}
        	}
       	}else{
       		player.invulnerability--;
       		if (player.invulnerability < 45){
       			player.color='#4b48ff';
       		}
       		if (player.invulnerability < 5){
       			player.color=player.defaultColor;
       		}	
       	}

      	//gameover
      	if(player.life==0){
      		drawHUD();
      		alert("Gameover");
      		stageSelection=true;
      	} 
      } //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
      
      //this function detects the collision between the two given objects - la uso anche con le entità lol
      function collisionBetween(p1, lvl) {
        if (lvl.x < p1.x + p1.width 
        && lvl.x + lvl.width > p1.x 
        && lvl.y < p1.y + p1.height 
        && lvl.y + lvl.height > p1.y) {
                return true;
        } else {
                return false;
        } 
      }    


      function stageSelect(){
          var img = document.getElementById("stageselect");
          ctx.drawImage(img, 0, 0, canvasWidth,canvasHeight);
            //leggo che tasto viene schiacciato. Con invio o dash si inizia a giocare, con le freccie si cicla tra i livelli
            if (keys[startkey] || keys[dashkey]){
              stageSelection=false;
              nuovoLivello();
            }
            if (keys[sukey] && !tastoGiaSchiacciato){
             if(lvlNumber==4){lvlNumber=3; 
             }else if(lvlNumber==5){lvlNumber=2;
             }else if(lvlNumber==6){lvlNumber=1;
             }else if(lvlNumber==7){lvlNumber=8;
             }else if(lvlNumber==3){lvlNumber=2;
             }else if(lvlNumber==8){lvlNumber=1;}             
            }
            if (keys[giukey] && !tastoGiaSchiacciato){
             if(lvlNumber==1){lvlNumber=6;
             }else if(lvlNumber==2){lvlNumber=5;
             }else if(lvlNumber==3){lvlNumber=4;
             }else if(lvlNumber==8){lvlNumber=7;
             }else if(lvlNumber==7){lvlNumber=6;
             }else if(lvlNumber==4){lvlNumber=5;}                      
            }
            if (keys[sinistrakey] && !tastoGiaSchiacciato){
             if(lvlNumber==2){lvlNumber=1;
             }else if(lvlNumber==3){lvlNumber=8;
             }else if(lvlNumber==4){lvlNumber=7;
             }else if(lvlNumber==5){lvlNumber=6;
             }else if(lvlNumber==1){lvlNumber=8;
             }else if(lvlNumber==6){lvlNumber=7;}                 
            }
            if (keys[destrakey] && !tastoGiaSchiacciato){
             if(lvlNumber==1){lvlNumber=2;
             }else if(lvlNumber==2){lvlNumber=3;
             }else if(lvlNumber==5){lvlNumber=4;
             }else if(lvlNumber==6){lvlNumber=5;
             }else if(lvlNumber==7){lvlNumber=4;
             }else if(lvlNumber==8){lvlNumber=3;} 
            }            
            if(keys[destrakey] || keys[sinistrakey] || keys[giukey] || keys[sukey]){ //serve per evitare che in un attimo ti sposti di un bordello di livelli 
                   tastoGiaSchiacciato=true;
            }else{ tastoGiaSchiacciato=false;}
            
            //ora disegno un quadrato intorno al livello selezionato
            ctx.fillStyle = player.charge0color;
            switch (lvlNumber){
              case 1:
                ctx.fillRect( (9+128)*scala, (10)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+128)*scala, (10)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+128)*scala, (135)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+128)*scala, (10)*scala, 10*scala, 135*scala );
                break;
                
              case 2:
                ctx.fillRect( (9+256)*scala, (10)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+256)*scala, (10)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+256)*scala, (135)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+256)*scala, (10)*scala, 10*scala, 135*scala );
                break;
                
              case 3:
                ctx.fillRect( (9+386)*scala, (10+130)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+386)*scala, (10+130)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+386)*scala, (135+130)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+386)*scala, (10+130)*scala, 10*scala, 135*scala );              
                break;
                
              case 4:
                ctx.fillRect( (9+386)*scala, (10+260)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+386)*scala, (10+260)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+386)*scala, (135+260)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+386)*scala, (10+260)*scala, 10*scala, 135*scala );               
                break;
                
              case 5:
                ctx.fillRect( (9+256)*scala, (10+386)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+256)*scala, (10+386)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+256)*scala, (135+386)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+256)*scala, (10+386)*scala, 10*scala, 135*scala );            
                break;
                
              case 6:
                ctx.fillRect( (9+128)*scala, (10+386)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9+128)*scala, (10+386)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9+128)*scala, (135+386)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135+128)*scala, (10+386)*scala, 10*scala, 135*scala );                
                break;
                
              case 7:
                ctx.fillRect( (9)*scala, (10+260)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9)*scala, (10+260)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9)*scala, (135+260)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135)*scala, (10+260)*scala, 10*scala, 135*scala );              
                break;
                
              case 8:
                ctx.fillRect( (9)*scala, (10+130)*scala, 135*scala, 10*scala );
                ctx.fillRect( (9)*scala, (10+130)*scala, 10*scala, 135*scala );
                ctx.fillRect( (9)*scala, (135+130)*scala, 135*scala, 10*scala );
                ctx.fillRect( (135)*scala, (10+130)*scala, 10*scala, 135*scala );               
                break;                                                                                                                
            }
      } 
