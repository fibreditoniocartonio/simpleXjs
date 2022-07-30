      var versioneDiGioco = "v1.20220730"; //aggiunto il mostro Bunny
      debugMode=false;    //you can enable debugMode with the console (press f12 in the browser)
      showMouseBox=false; //you can enable showMouseBox with the console (press f12 in the browser)
      
      //crea il canvas
      var realCanvasWidth = 960;  //level editor in 16:9
      var canvasWidthDefault=720; //per mostrare il level, 4:3
      var canvasHeightDefault = 540;
      var canvasWidth = canvasWidthDefault;            
      var canvasHeight = canvasHeightDefault;
      if(document.getElementsByTagName('canvas').length == 0) {     //crea il canvas con le variabili che ho creato
          document.body.innerHTML += "".concat("<div class='caricaPartitaDiv' id='caricaPartitaDiv'><input type='file' id='fileCaricaPartita' disabled></div><div class='canvasDiv' id='canvasDivId' tabIndex='1'><canvas id='canvas' width=" , realCanvasWidth , " height=" , canvasHeight , "></canvas></div>");
      }   var ctx = document.getElementById('canvas').getContext('2d');

	    //variabili dei tasti - prima o poi faro' un'opzione nel menu per poterli cambiare ingame
      var keys = []; //vettore associativo dei tasti (tiene dentro dei bool)
      var mouseX=0; var mouseY=0; //coordinate mouse
      var lvlCanvasMouseX=0; var lvlCanvasMouseY=0; //coordinate mouse rispetto a level (nel mini canvas)
      var mouseClick=false; //il mouse ha schiacciato
      var tastoGiaSchiacciato = false; 
      var jumpkey = "z";         		//salta - default z
      var destrakey = "ArrowRight";     //muovi sinistra - default freccia destra
      var sinistrakey = "ArrowLeft";    //muovi destra - default freccia sinistra
      var sukey = "ArrowUp";           	//default freccia su
      var giukey = "ArrowDown";         //default freccia giu
      var dashkey = "x";		    	//dash - default x
      var sparokey = "a";				//shoot - default a
      var startkey = "Enter";			//start - default INVIO/ENTER
      var lkey = "d";					//power- - default e
      var rkey = "c";					//power+ - default c

      var ultimoTastoLetto="";
      document.addEventListener("keydown", function(e) {//events - leggi tasti schiacciati
          keys[e.key] = true;
          ultimoTastoLetto=e.key;
      });
      document.addEventListener("keyup", function(e) {//events - leggi tasti rilasciati
          keys[e.key] = false;
      });
      
      document.addEventListener('mouseup', function(e) {//legge se smetto di cliccare
          mouseClick=false;
      });      
      document.addEventListener('mousedown', function(e) {//legge se clicco
          mouseClick=true;
      });                     
      
      canvas.addEventListener("mousemove", function(e) {//legge la posizione del mouse - questo e' solo un evento di canvas e non di document perche' la posizione mi serve solo sul canvas (ottimizzo)
          var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
          mouseX=Math.round(((e.clientX - cRect.left)/(cRect.right-cRect.left))*realCanvasWidth); //coordinate acquisite riproporzionate perche' il canvas ha grandezza variabile, ma coordinate fisse
          mouseY=Math.round(((e.clientY - cRect.top)/window.innerHeight)*canvasHeightDefault); //coordinate acquisite riproporzionate perche' il canvas ha grandezza variabile, ma coordinate fisse  
      });      

      //prototipo del player
      function Player() {//in realta' fa da telecamera nel leveleditor
        this.x= 0;
        this.y= 0;
        this.width= 24;
        this.height= 24;
        this.color="#0400f8";
        this.showPlayerCamera=false; //mostra l'iconcina della telecamera che serve per spostarsi nel livello e simula la visione del player
        this.snapMode=false;
        this.showCoordinates=true;
        this.showGrid=true;
        this.showLevelBar=true;
        this.permanentLevelBar=false;
      }
      player= new Player();

    //inizializzo le entita' che sara' possibile inserire tramite l'editor
	  var listaEntityStringa="01234567⁰¹²³⁴⁵⁶⁷àÀèÈPSB";
    var listaEntity=creaListaEntity(listaEntityStringa, false);
    var listaTipoEntity=creaListaTipoEntity(listaEntity);
	  listaEntity=creaListaEntity(listaEntityStringa, listaTipoEntity);
      function creaListaEntity(listaEntityStringa, listaTipoEntity){
        var tuttiItipiEntity=[];
        if(listaTipoEntity){
          for(j=0; j<listaTipoEntity.length; j++){
            var entity=[];
          	for (i=0; i < listaEntityStringa.length; i++) {
              entitaLetta=costruisciEntita(listaEntityStringa[i]);
              if(entitaLetta.type == listaTipoEntity[j]){entity.push(entitaLetta);}
    	      }
            tuttiItipiEntity.push(entity);
          }
        }else{
        	for (i=0; i < listaEntityStringa.length; i++){tuttiItipiEntity.push(costruisciEntita(listaEntityStringa[i]));}        
        }
      	return tuttiItipiEntity;
        function costruisciEntita(lettera){
          var entita;
	      	switch(lettera){
			        case '0': case '1': case '2': case '3': entita = new newPickUp_Armor(parseInt(listaEntityStringa[i],10)); break;
			        case '4': case '5': case '6': case '7': entita = new newPickUp_Subtank(parseInt(listaEntityStringa[i],10)-4);  break;
    					case '⁰': case '¹': case '²': case '³': case '⁴': case '⁵': case '⁶': case '⁷': entita = new newPickUp_Cuore(listaEntityStringa[i]); break;				    
    					case 'à': entita/*lifeRec small*/ = new newPickUp_LifeEnergy(2);  entita.width=10; entita.height=10; break;
    					case 'À': entita/*lifeRec big*/ = new newPickUp_LifeEnergy(8);  entita.width=18; entita.height=18; break;
    					case 'è': entita/*weaponRec small*/ = new newPickUp_WeaponEnergy(2);  entita.width=10; entita.height=10; break;
    					case 'È': entita/*weaponRec big*/ = new newPickUp_WeaponEnergy(8);  entita.width=18; entita.height=18; break;      		
    					case 'P': entita = new newPipistrello();  break;
    					case 'S': entita = new newSpike();  break;
    					case 'B': entita = new newBunny();  break;
	      	}
          entita["letter"]=lettera;
          return entita;        
        }
      }
      function creaListaTipoEntity(listaEntity){
        var listaTipi=[]; //starting, vengono aggiunti in automatico
        for(i=0; i<listaEntity.length; i++){
          var isNuovoTipo=true;
          for(j=0; j<listaTipi.length; j++){
            if(listaEntity[i].type==listaTipi[j]){
              isNuovoTipo=false;
            }
          }
          if(isNuovoTipo){listaTipi.push(listaEntity[i].type);}
        }
        return listaTipi;
      }
            
  //gamestate - se == -1: stato nel level editor
  var gamestate=0;
  //stato 0: nel menu principale 
  //stato 1: selezione del livello 
  //stato 2: menu di pausa 
  //stato 3: menu opzioni 
  //stato 4: opzioni nelle stage selection 
  //stato 5: c'e' un alert aperto 
  //stato 6: nel menu carica livello
  var objMenuPrincipale= new newMenuPrincipale(); //inizializza il menu principale
  
	//caricare il livello
	var level = []; //create the level array      					
  stringaLivelloDefault="tttttttttttttttttttttttttttttttttttl..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..................................l..X...............................l..................................l..................................z0.62;0.85;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261; ";//livello base - lo spazio alla fine e' importante
  stringaLivello=stringaLivelloDefault;         
	function stringToLevel(lvlString){			
		level = []; //azzera level
		entity = []; //azzera entity
		var foreground = []; //crea un vettore tipo level per i blocchi di foreground
		var background = []; //crea un vettore tipo level per i blocchi di background
		var widthTot=0;
		var heightTot=1;
		for (i = 0; i < lvlString.length; i++) { //ciclo la stringa livello per trasformarlo da stringa a livello vero
			switch (lvlString[i]){
				case 'X'://posizione iniziale del player
          var currentIndex=i;
					level['xStartingPos'] = (i%widthTot)*20;
					level['yStartingPos'] = (heightTot-2)*20;
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
          i=currentIndex;
          leggiBlocco(level,lvlString[i]);
          level[level.length-1].color="#0400f8";
					break;

				case 't': // t è il top floor/ceiling
					widthTot++;
					break;
					
				case 'l': // l è il left floor
					heightTot++;
					break;
        
        case 'w': // w funziona come left floor ma indica anche il water level
					heightTot++;
          level['waterLevel'] = ((heightTot-1)*20)+7; //setta il waterlevel
					break;

				case '.': // . è vuoto/aria
					break;
              
		        //ora le entita' (lettere maiuscole)
		        case 'P': // P indica un pipistrello
		        	var pipistrello = new newPipistrello();
              		pipistrello['letter'] = lvlString[i];
		         	pipistrello.x= (i%widthTot)*20;
		        	pipistrello.y= (heightTot-1)*20+10;
    				entity.push(pipistrello);
    				checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
    				break;

		        case 'B': // B indica un bunny (coniglio)
		        	var entita = new newBunny();
		         	entita.x= (i%widthTot)*20;
		        	entita.y= (heightTot-1)*20-2;
					entity.push(entita);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
					break;    					
		          
		        case 'S': //S sono le spike (le spine che instaKillano)
		          var spike= new newSpike();
              spike['letter'] = lvlString[i];
		          spike.x= (i%widthTot)*20;
		          spike.y= (heightTot-1)*20; 
				      entity.push(spike);
				      if(lvlString[i-1]=='p' || lvlString[i-1]=='q' || lvlString[i-1]=='r' ){leggiBlocco(background,lvlString[i-1]);} //se il blocco prima era un background lo carica sotto la entita' letta
		          break;

		        case '0': case '1': case '2': case '3': //sono i pezzi di armatura
			        var armatura = new newPickUp_Armor(parseInt(lvlString[i],10));
              armatura['letter'] = lvlString[i];
  				    armatura.x= (i%widthTot)*20;
  				    armatura.y= (heightTot-1)*20; 
    					entity.push(armatura);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
  				    break;

		        case '4': case '5': case '6': case '7': //sono le subtank
			        var subtankLetta = new newPickUp_Subtank(parseInt(lvlString[i],10)-4);
              subtankLetta['letter'] = lvlString[i];
  				    subtankLetta.x= (i%widthTot)*20;
  				    subtankLetta.y= (heightTot-1)*20; 
    					entity.push(subtankLetta);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
  				    break;

				case '⁰': case '¹': case '²': case '³': case '⁴': case '⁵': case '⁶': case '⁷': //sono i cuori che aumentano la vita
					//caratteri per copiare/incollare:  ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
			        var cuore = new newPickUp_Cuore(lvlString[i]);
              cuore['letter'] = lvlString[i];
  				    cuore.x= (i%widthTot)*20;
  				    cuore.y= (heightTot-1)*20-1; 
    					entity.push(cuore);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
  				    break;				    

				case 'à'://small life recovery
			        var lifeRec = new newPickUp_LifeEnergy(2);
              lifeRec['letter'] = lvlString[i];
			        lifeRec.width=10;
			        lifeRec.height=10;
  				    lifeRec.x= (i%widthTot)*20+(10-lifeRec.width/2);
  				    lifeRec.y= (heightTot-1)*20+1; 
    					entity.push(lifeRec);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
  				    break;

				case 'À'://big life recovery
			        var lifeRec = new newPickUp_LifeEnergy(8);
              lifeRec['letter'] = lvlString[i];
			        lifeRec.width=18;
			        lifeRec.height=18;			        
  				    lifeRec.x= (i%widthTot)*20+(10-lifeRec.width/2);
  				    lifeRec.y= (heightTot-1)*20+1; 
    					entity.push(lifeRec);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
  				    break;

				case 'è'://small weapon recovery
			        var weaponRec = new newPickUp_WeaponEnergy(2);
              weaponRec['letter'] = lvlString[i];
			        weaponRec.width=10;
			        weaponRec.height=10;			        
  				    weaponRec.x= (i%widthTot)*20+(10-weaponRec.width/2);
  				    weaponRec.y= (heightTot-1)*20+1; 
  					  entity.push(weaponRec);
					    checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				      break;
				case 'È'://big weapon recovery
			        var weaponRec = new newPickUp_WeaponEnergy(8);
              weaponRec['letter'] = lvlString[i];
			        weaponRec.width=18;
			        weaponRec.height=18;			        
  				    weaponRec.x= (i%widthTot)*20+(10-weaponRec.width/2);
  				    weaponRec.y= (heightTot-1)*20+1;
    					entity.push(weaponRec);
    					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				      break;																		    	        	 							

				//i blocchi
				case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h': case 'i': case 'j': case 'k': 
					// le lettere dalla a alla k indicano un blocco da 20px*20px di colori diversi
					leggiBlocco(level,lvlString[i]);
					break;

				case 'm': case 'n': case 'o'://foreground
					leggiBlocco(foreground,lvlString[i]);
					break;

				case 'p': case 'q': case 'r'://background 
					leggiBlocco(background,lvlString[i]);
					break;	
											
				case 'z': // 'z' indica la fine del livello. Da qui in poi non sto leggendo piu blocchi e entita' ma le caratteristiche del livello come gravita', posizione iniziale del player e colore dei blocchi del livello
          level['indiceZ']=i;
					widthTot++;
					heightTot++;
					level['gravity'] = readNumber();
					level['friction'] = readNumber();
			    level['gravityWater'] = level.gravity*4/7;
			    level['frictionWater'] = level.friction*9/10;
					blocksColors(level,11);//this will push color[] to level, it will contain the blocks colors
					blocksColors(foreground,3);
					blocksColors(background,3);
					level['foreground'] = foreground;
					level['background'] = background;
					level['backGroundImg'] = readBackground();
					break;
			}//fine dello switch case															
		}//fine del for					        
		//imposto la grandezza del livello e lo confronto con la grandezza del canvas
		level['maxWidth'] = widthTot*20;
		level['maxHeight'] = heightTot*20;
        if (level.maxWidth < canvasWidth){ //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
           		canvasWidth=level.maxWidth;
        }else{
          if(level.maxWidth > canvasWidth){
            if(level.maxWidth > canvasWidthDefault){
              canvasWidth=canvasWidthDefault;
            }else{canvasWidth=level.maxWidth;}
          }
        }
        if (level.maxHeight < canvasHeight){ //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
           		canvasHeight=level.maxHeight;
        }else{
          if(level.maxHeight > canvasHeight){
            if(level.maxHeight > canvasHeightDefault){
              canvasHeight=canvasHeightDefault;
            }else{canvasHeight=level.maxHeight;}
          }
        }    
		//imposto i colori dei blocchi in base a quello che ho letto
		for(i=0; i<level.length;i++){
			switch(level[i].lettera){
				case 'a': level[i].color=level.color[0]; break;
				case 'b': level[i].color=level.color[1]; break;
				case 'c': level[i].color=level.color[2]; break;
				case 'd': level[i].color=level.color[3]; break;
				case 'e': level[i].color=level.color[4]; break;
				case 'f': level[i].color=level.color[5]; break;
				case 'g': level[i].color=level.color[6]; break;
				case 'h': level[i].color=level.color[7]; break;
				case 'i': level[i].color=level.color[8]; break;
				case 'j': level[i].color=level.color[9]; break;
				case 'k': level[i].color=level.color[10]; break;
			}
		}
		for(i=0; i<level.foreground.length;i++){
			switch(level.foreground[i].lettera){
				case 'm': level.foreground[i].color=level.foreground.color[0]; break;
				case 'n': level.foreground[i].color=level.foreground.color[1]; break;
				case 'o': level.foreground[i].color=level.foreground.color[2]; break;
			}
		}
		for(i=0; i<level.background.length;i++){
			switch(level.background[i].lettera){
				case 'p': level.background[i].color=level.background.color[0]; break;
				case 'q': level.background[i].color=level.background.color[1]; break;
				case 'r': level.background[i].color=level.background.color[2]; break;
			}
		}				
    //ora inizializzo i bordi - ho schiacciato il codice perche' occupava righe inutili. e' molto simile al prototipo di blocco    
		var ground = {x: 0, width: level.maxWidth, height: (20)+1, color: level.color[0], lettera: "a"};  ground['y']=level.maxHeight-ground.height;
  	var ceiling = {x: 0, y: 0, width: level.maxWidth, height: (20)+1, color: level.color[0], lettera: "a"};        	            
  	var leftWall = {x: 0, y: 0, width: (20)+1, height: level.maxHeight, color: level.color[0], lettera: "a"};
  	var rightWall = {y: 0, width: (20)+1, height: level.maxHeight, color: level.color[0], lettera: "a"}; rightWall['x']= level.maxWidth-rightWall.width;	            				
		level.push(ground, ceiling, leftWall, rightWall); //this pushes all of the static objects into the level				   
    // ora definisco le funzioni interne di stringToLevel()
		function readNumber(){//compone i vari caratteri di una stringa in numero. Esempio traduce "10.91;" in numeroLetto=10.91
			var numeroLetto=0;
			var isDecimale=false;
			var esponente=0;
			for (i++ ; i < lvlString.length; i++) {
				if (lvlString[i] != ";"){
					if (lvlString[i]=='.' || lvlString[i]==','){ //determina se il numero che sto leggendo avra' delle cifre decimali
						isDecimale=true;
					}else{
						if(!isDecimale){
							numeroLetto=(numeroLetto*10)+Number(lvlString[i]);
						}else{
							esponente--;
							numeroLetto=numeroLetto+(Number(lvlString[i])*Math.pow(10,esponente))
						}
					}
				}else{
					break;
				}			
			}
			return numeroLetto;
		}
		function readBackground(){
			var immagineLetta="";
			if (i < lvlString.length){
				for (i++ ; i < lvlString.length; i++) {
						immagineLetta+=lvlString[i]
				}
			}
			if (immagineLetta!="" && immagineLetta!=" "){
				var img = new Image();
				img.src = immagineLetta;
				return img;
			}else{
				return "";
			}
		}
		function readColor(){
			var coloreLetto="";
			if (i < lvlString.length){
				for (i++ ; i < lvlString.length; i++) {
					if (lvlString[i] != ";"){
						coloreLetto+=lvlString[i]
					}else{
						break;
					}
				}
			}
			if (coloreLetto==""){
				return "#155261";
			}else{
				return coloreLetto;
			}						
		}
		function blocksColors(vettore,numeroDiLetture){
			var color = [];
			for (n=0; n<numeroDiLetture; n++){
				color[n]=readColor();	
			}
			vettore['color']=color;
		}
		function leggiBlocco(vettore,lettera){
			var blocco = new Blocco(i,widthTot,heightTot);
			for (n=1; ;n++){	//controllo che se le lettere dopo sono uguali a questo blocco. Se lo sono non sto a creare tanti blocchetti ma ne faccio solo uno piu' largo per ottimizzare
					if(lvlString[i+n]==lettera){
						blocco.width=blocco.width+(20);
					}else{
						i=i+n-1;
						break; //del for
					}
			}
			blocco.width=blocco.width+1;
			blocco['lettera'] = lettera;
			vettore.push(blocco);
		}				
		function Blocco(i,widthTot,heightTot) { //prototipo di blocco
           	this.x= (i%widthTot)*20;
            this.y= (heightTot-1)*20;
            this.width= 20;
      		this.height= 20+1;
            this.color= '#155261';            													
		}
		function checkBackAndForGround(background,foreground,bloccoPrima){
			if(bloccoPrima =='p' || bloccoPrima=='q' || bloccoPrima=='r'){
				leggiBlocco(background,bloccoPrima);
			}else if(bloccoPrima=='m' || bloccoPrima=='n' || bloccoPrima=='o' ){
				leggiBlocco(foreground,bloccoPrima);
			}
		}							
	}//fine di stringToLevel()
      
      var entity = []; //create the entity array. Ogni entità deve avere: x, y, width, height e il metodo physics che determinerà come si comporta l'entità
      //adesso inizio i prototipi delle entita' - disattivo le physics e le cancello che non servono nel level editor      
      function newPipistrello() {//mostro pipistrello
        this.life= 1;
        this.type= "monster";
        this.name="bat";
        this.damage= 1;
        this.x= 0;
        this.y= 0;
        this.xv= 0;
        this.yv= 0;
        this.slope = 0;
        this.width= 34;
        this.height= 16;
        this.color= '#8500b5';
        this.color2= '#d7b600';
        this.speed= 0.5;
        this.hasPhysics=false;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          var unitX=this.width/10;
          var unitY=this.height/10;
		      ctx.fillStyle = this.color2;
          halfBatDraw(xdisegnata,this.width,ydisegnata,this.height,unitX,unitY);
          halfBatDraw(xdisegnata,this.width,ydisegnata,this.height,-unitX,unitY);
          ctx.fillStyle = this.color;
          halfBatDraw(xdisegnata+1.5,this.width-3,ydisegnata+1.5,this.height-3,unitX,unitY);
          halfBatDraw(xdisegnata+1.5,this.width-3,ydisegnata+1.5,this.height-3,-unitX,unitY);          
          function halfBatDraw(xdisegnata,width,ydisegnata,height,unitX,unitY){
          	ctx.beginPath();
  		      ctx.lineWidth = "1";          
  		      ctx.moveTo(xdisegnata+width/2, ydisegnata+unitY*2);
  		      ctx.lineTo(xdisegnata+width/2+unitX, ydisegnata);
            ctx.lineTo(xdisegnata+width/2+unitX, ydisegnata+unitY*3);
            ctx.lineTo(xdisegnata+width/2+unitX*2.5, ydisegnata);
            ctx.lineTo(xdisegnata+width/2+unitX*5, ydisegnata+height-unitY);
            ctx.lineTo(xdisegnata+width/2+unitX*2.5, ydisegnata+height-unitY*2.5);
            ctx.lineTo(xdisegnata+width/2+unitX*1.25, ydisegnata+height-unitY/2);
            ctx.lineTo(xdisegnata+width/2+unitX, ydisegnata+height-unitY*2.4);
            ctx.lineTo(xdisegnata+width/2, ydisegnata+height);
            ctx.lineTo(xdisegnata+width/2, ydisegnata+unitY*2);
            ctx.fill();
          }
        }                    
      }

      function newBunny(){//mostro coniglio
        this.life= 2;
        this.type= "monster";
        this.name="bunny";
        this.damage= 4;
        this.facingRight=false;
        this.gotHit=false;
        this.x= 0;
        this.y= 0;
        this.xv= 0;
        this.yv= 0;
        this.timer=0;
        this.slope = 0;
        this.isOnGround=false;
        this.width= 28;
        this.height= 28;
        this.color= '#a57aff';
        this.color2= '#ffc925';
        this.color3= '#b20101';
        this.color4= '#69ff00';
        this.speed= 8;
        this.jumpHeight=10;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
		  color1=this.color;
		  color2=this.color2;
          head=this.width/10*4;
          ctx.fillStyle = color1;
          ctx.fillRect(xdisegnata, ydisegnata+head, this.width, this.height-head);
          if(this.facingRight){
          	drawHead(xdisegnata+this.width-head,ydisegnata+1,head,color2);
          }else{
          	drawHead(xdisegnata,ydisegnata+1,head,color2);
          }
          function drawHead(x,y,head, eyeColor){
          	ctx.fillRect(x, y, head, head);	
          	ctx.fillRect(x+head-head/5*2, y-head/3*2, head/5*2, head/3*2);	
          	ctx.fillRect(x, y-head/3*2, head/5*2, head/3*2);	
          	ctx.fillStyle = eyeColor;
          	ctx.fillRect(x+head-head/5*2, y+head/5, head/5, head/5);	
          	ctx.fillRect(x+head/5, y+head/5, head/5, head/5);	
          }
        }
      }      
                  
      function newSpike() {//le spine per terra
        this.life= 9999999999;
        this.type= "obstacle";
        this.name="spike";
        this.damage= 9999999999;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.color= '#bcbcbc';
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //funzione per disegnare la spina
        	ctx.beginPath();
		      ctx.lineWidth = "1";
		      ctx.fillStyle = this.color;
		      ctx.moveTo(xdisegnata, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height);
	        ctx.lineTo(xdisegnata+(this.width/2), ydisegnata-2);
	        ctx.lineTo(xdisegnata, ydisegnata+this.height);
		      ctx.fill();
          ctx.strokeStile="#000000"; ctx.stroke();
        }              
      }

      function newPickUp_Armor(indicePassato) {//le spine per terra
        this.life= 9999999999;
        this.type= "pickup";
        this.name="armor pickup";
        this.indice=indicePassato;//indicePassato=0 -> helmet, indicePassato=1 -> legs, indicePassato=2 -> buster, indicePassato=3 -> corpo
        switch(this.indice){
        	case 0: this.name="helmet upgrade"; break;
        	case 1: this.name="boots upgrade"; break;
        	case 2: this.name="buster upgrade"; break;
        	case 3: this.name="body upgrade"; break;
        }
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.color=player.color;
        this.color2="#cccccc"; 
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle=this.color;
			    ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);        	
        	ctx.fillStyle=this.color2;
			    ctx.fillRect(xdisegnata+1, ydisegnata+1, this.width-2, this.height-2);
			    ctx.textAlign = "center";
			    ctx.font = "small-caps bold 18px Lucida Console";
    			var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
    			switch(this.indice){
    				case 0: disegnaTestoConBordino("H",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),this.color,this.color2);break;
    				case 1: disegnaTestoConBordino("L",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),this.color,this.color2);break;
    				case 2: disegnaTestoConBordino("B",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),this.color,this.color2);break;
    				case 3: disegnaTestoConBordino("C",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),this.color,this.color2);break;
    			}
    			ctx.textAlign = "left";//lo azzero se no mi si bugga in alcuni menu
        }//fine di selfDraw	              
      }

      function newPickUp_Subtank(indicePassato) {//le spine per terra
        this.life= 9999999999;
        this.type= "pickup";
        this.name="subtank";
        this.indice=indicePassato;
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.color=player.color;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle=this.color;
    			ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
    			ctx.textAlign = "center";
    			ctx.font = "small-caps bold 12px Lucida Console";
    			var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo			
    			disegnaTestoConBordino("S"+(this.indice+1),xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),"#ffcc00","#000000");
    			ctx.textAlign = "left";//lo azzero se no mi si bugga in alcuni menu
        }//fine di selfDraw           
      }

      function newPickUp_Cuore(indicePassatoNonParsato) {//le spine per terra
        this.life= 9999999999;
        this.type= "pickup";
        this.name="heart tank";
        this.indice=parsaApici(indicePassatoNonParsato);
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.color="#ff2f97";
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
          ctx.beginPath();
  		    ctx.lineWidth = "2";
  		    ctx.fillStyle = this.color; //rosa
  		    ctx.strokeStyle = "#999999"; //grigio
  		    ctx.moveTo(xdisegnata, ydisegnata);
  		    ctx.lineTo(xdisegnata+(this.width/2)-(this.width/10), ydisegnata);
  		    ctx.lineTo(xdisegnata+(this.width/2), ydisegnata+(this.height/5));
  		    ctx.lineTo(xdisegnata+(this.width/2)+(this.width/10), ydisegnata);
  		    ctx.lineTo(xdisegnata+(this.width), ydisegnata);
  		    ctx.lineTo(xdisegnata+(this.width), ydisegnata+(this.height/2));
  		    ctx.lineTo(xdisegnata+(this.width/2), ydisegnata+this.height);
  		    ctx.lineTo(xdisegnata, ydisegnata+(this.height/2));
  		    ctx.lineTo(xdisegnata, ydisegnata);
  		    ctx.fill();
  		    ctx.stroke();
          ctx.font="small-caps bold 10px Lucida Console"; ctx.textAlign="center"; disegnaTestoConBordino(this.indice, xdisegnata+this.width/2, ydisegnata+this.height/2+ctx.measureText("O").width/2, "#000000","#cccccc"); ctx.textAlign="left";
        }//fine di selfDraw
        function parsaApici(stringaDiApici){//parsa ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ in numeri
    			switch(stringaDiApici){
    				case "⁰": return 0;break;
    				case "¹": return 1;break;
    				case "²": return 2;break;
    				case "³": return 3;break;
    				case "⁴": return 4;break;
    				case "⁵": return 5;break;
    				case "⁶": return 6;break;
    				case "⁷": return 7;break;
    				case "⁸": return 8;break;
    				case "⁹": return 9;break;
    			}        	
        }
      }              

      function newPickUp_LifeEnergy(vitaRecuperata) {
        this.life= 9999999999;
        this.type= "pickup";
        this.name="life recovery";
        this.damage= -vitaRecuperata;
        this.x= 0;
        this.y= 0;
        this.yv = 0;
        this.width= 20;
        this.height= 20;
        this.color="#d70000";
        this.isInWater = false;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle = "#868686";
			    ctx.fillRect(xdisegnata-3, ydisegnata+3, this.width+6, this.height-6);        
        	ctx.fillStyle = "#d70000";
        	ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
        	ctx.fillStyle = "#ffe100";
			    ctx.fillRect(xdisegnata+2, ydisegnata+2, this.width-4, this.height-4);			
        }//fine di selfDraw              
      }

      function newPickUp_WeaponEnergy(usageRecuparato) {
        this.life= 9999999999;
        this.type= "pickup";
        this.name="weapon e. recovery";
        this.damage= 0;
        this.usageRestore=usageRecuparato;
        this.x= 0;
        this.y= 0;
        this.yv = 0;
        this.width= 20;
        this.height= 20;
        this.color="#003ef0";
        this.isInWater = false;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle = "#003ef0";
        	ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
        	ctx.fillStyle = "#3AB7D4";
			    ctx.fillRect(xdisegnata+2, ydisegnata+2, this.width-4, this.height-4);
        	ctx.fillStyle = "#ff7c00";
        	ctx.fillRect(xdisegnata, ydisegnata-1.5+this.height/2, this.width, 3);			
        }//fine di selfDraw             
      }                         
      			
    //start the engine
    var player = new Player(); //creo il player
    window.onload = start;
              
    //this function is called at the start
  	function start() {
      update();
  	}
  	
    function nuovoLivello(){	//azzera i dati del player e carica un nuovo livello (da stringa e non da file...)
  		player = new Player();
        sideMenu = new newSideMenu();
  		stringToLevel(stringaLivello);
      	player.x = level.xStartingPos;
      	player.y = level.yStartingPos;
  	}
                                  
    function update() {//this function is called every frame
      requestAnimationFrame(update); //credo che sia la roba che crea il ciclo del gioco
      if (gamestate==1){
        stageSelect();
      }else if (gamestate==2){
        objMenuDiPausa.drawMenuDiPausa();
      }else if(gamestate==3){
        objMenuOpzioni.drawMenuOpzioni();
      }else if(gamestate==0){
        objMenuPrincipale.drawMenuPrincipale(true);
      }else if (gamestate==4){
        objMenuOpzioniStageSelect.drawMenu(); 
      }else if (gamestate==6){
        objMenuCaricaPartita.drawMenu();
      }else if (gamestate==5){
        objAlert.drawMenu();
      }else{
        disegnaSchermoDiGioco(false); //ATTENZIONE: se le viene passato true oltre a disegnare le entita' calcola anche le lore physics
        playerPhysics(player, level); //chiama la funzione physics del player
        mouseCoordinatesConverter();
      }
    }

    function mouseCoordinatesConverter(){
          if (player.x+(player.width/2) < canvasWidth/2){
            lvlCanvasMouseX=mouseX;
          }else{
            if (player.x+(player.width/2) > level.maxWidth-canvasWidth/2){
              lvlCanvasMouseX=mouseX+level.maxWidth-canvasWidth;
            }else{
              lvlCanvasMouseX=mouseX+player.x+(player.width/2)-canvasWidth/2;
            }
          }
          if (player.y < canvasHeight/2){
            lvlCanvasMouseY=mouseY;
          }else{
            if (player.y > level.maxHeight-canvasHeight/2){
              lvlCanvasMouseY=mouseY+level.maxHeight-canvasHeight;
            }else{
              lvlCanvasMouseY=mouseY+player.y-canvasHeight/2;
            }
          }
          lvlCanvasMouseX=Math.floor(lvlCanvasMouseX/20);//converte in blocchi
          lvlCanvasMouseY=Math.floor(lvlCanvasMouseY/20);
    }
      
    function disegnaSchermoDiGioco(doEntityPhysics){
          ctx.clearRect(0, 0, canvas.width, canvas.height);	//pulisci tutto il canvas
          drawBackgroundImage();
          drawLvl(level.background);//disegna i blocchi non materiali che colorano lo sfondo (passa false come isDrawingWater - non disegna l'acqua)
          drawLvl(level);//disegna i blocchi fisici del livello (passa false come isDrawingWater - non disegna l'acqua)
          drawEntity(doEntityPhysics); //in questa funzione viene chiamata anche il metodo entity[i].physics per le entità che vengono disegnate su schermo (le uniche che carico)
          drawPlayer(); //disegna il player
          drawLvl(level.foreground);//disegna i blocchi non materiali che stanno sopra tutto il resto (effetto grafico) e il waterlevel (passa true a isDrawingWater)
          drawWater();
          if(player.showGrid){drawGrid();}//disegna la griglia per separare i blocchi
          drawHUD();
          //da qui in poi disegno la parte piu' a destra del canvas, dove mettero' i tool per editare il livello
          sideMenu.drawSideMenu();
    }

    function xDisegnata(){
        if (player.x+(player.width/2) < canvasWidth/2) {	//se la x del player è minore di mezzo canvas la tiene com'è
          xdisegnata=player.x;
        }else{
          if (player.x+(player.width/2) > level.maxWidth-canvasWidth/2){ //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
              xdisegnata=canvasWidth-level.maxWidth+player.x;
          }else{
              xdisegnata=canvasWidth/2-(player.width/2);	
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
        if(player.showPlayerCamera){
          var xdisegnata=xDisegnata();
          var ydisegnata=yDisegnata();
          ctx.fillStyle=player.color; 
          ctx.fillRect(xdisegnata-player.width*2/10, ydisegnata+player.height/10, player.width*8/10, player.height*8/10);
          ctx.fillRect(xdisegnata+player.width*6/10, ydisegnata+player.height/2-player.height*1.5/10, player.width*2/10, player.height*3/10); 
          ctx.fillRect(xdisegnata+player.width*8/10, ydisegnata+player.height/2-player.height*3/10, player.width*2/10, player.height*6/10);
        }
      }

	function drawBackgroundImage(){//disegna immagine di sfondo
        if(level.backGroundImg != "" && level.backGroundImg != null ){//se esiste disegna lo sfondo
        	ctx.drawImage(level.backGroundImg, 0, 0, canvasWidth,canvasHeight);
        }
	}
  
  function drawWater(){  //disegna l'acqua
      if(level.waterLevel){//disegnala solo se esiste
        ctx.fillStyle = "#0400f850";
        var ydisegnata=0
        if (player.y < canvasHeight/2){
            ydisegnata=level.waterLevel;
        }else{
          if (player.y > level.maxHeight-canvasHeight/2){
            if(level.waterLevel<level.maxHeight-canvasHeight){
              ydisegnata=0;
            }else{
              ydisegnata=level.waterLevel-level.maxHeight+canvasHeight;
            }
          }else{
            if(level.waterLevel<player.y-canvasHeight/2){
              ydisegnata=0;
            }else{
              ydisegnata=level.waterLevel-player.y+canvasHeight/2;
            }
          }
        }
        ctx.fillRect(0, ydisegnata, canvasWidth, canvasHeight);
      }        
  }
	          
      //this function draws the level (usata anche per level.foreground e level.background - basta che sia un arrey di oggetti blocco)
      function drawLvl(lvl) {
        for (var i = 0; i < lvl.length; i++) {
          ctx.fillStyle = lvl[i].color;
          //variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
          var xdisegnata=0
          if (player.x+(player.width/2) < canvasWidth/2){
            xdisegnata=lvl[i].x;
          }else{
            if (player.x+(player.width/2) > level.maxWidth-canvasWidth/2){
              xdisegnata=lvl[i].x-level.maxWidth+canvasWidth;
            }else{
              xdisegnata=lvl[i].x-player.x-(player.width/2)+canvasWidth/2;
            }
          }
		  var ydisegnata=0
          if (player.y < canvasHeight/2){
            ydisegnata=lvl[i].y;
          }else{
            if (player.y > level.maxHeight-canvasHeight/2){
              ydisegnata=lvl[i].y-level.maxHeight+canvasHeight;
            }else{
              ydisegnata=lvl[i].y-player.y+canvasHeight/2;
            }
          }
          //ora disegno il livello[i]
          if(xdisegnata+lvl[i].width>-1 && xdisegnata<canvasWidth+1){ctx.fillRect(xdisegnata, ydisegnata, lvl[i].width, lvl[i].height);}                    
          if(debugMode || lvl[i].lettera=="X"){ ctx.font="bold 10px Lucida Console"; ctx.textAlign="center"; disegnaTestoConBordino(lvl[i].lettera, xdisegnata+lvl[i].width/2, ydisegnata+lvl[i].height/2+ctx.measureText("O").width/2, "#000000","#cccccc"); ctx.textAlign="left";}
        }
      }
       
      function drawGrid() {
        ctx.fillStyle = "#dcdcdc80";
        for (var i = 0; i < level.maxWidth; i+=20) {
          var xdisegnata=0;
          if (player.x+(player.width/2) < canvasWidth/2){
            xdisegnata=i;
          }else{
            if (player.x+(player.width/2) > level.maxWidth-canvasWidth/2){
              xdisegnata=i-level.maxWidth+canvasWidth;
            }else{
              xdisegnata=i-player.x-(player.width/2)+canvasWidth/2;
            }
          }
          ctx.fillRect(xdisegnata, 0, 1, canvasHeight);          
        }
        for (var i = 0; i < level.maxHeight; i+=20) {
		      var ydisegnata=0;
          if (player.y < canvasHeight/2){
            ydisegnata=i;
          }else{
            if (player.y > level.maxHeight-canvasHeight/2){
              ydisegnata=i-level.maxHeight+canvasHeight;
            }else{
              ydisegnata=i-player.y+canvasHeight/2;
            }
          }
          ctx.fillRect(0, ydisegnata, canvasWidth, 1);          
        }                               
      }   

	  function drawHUD(){
		if(player.showCoordinates){//disegna coordinate
			ctx.font = "small-caps bold 15px Lucida Console";
			ctx.textAlign="right"; 
			if(player.showPlayerCamera){
				disegnaTestoConBordino("cameraX:"+Math.floor((player.x+player.width/2)/20)+" cameraY:"+Math.floor((player.y+player.height/2)/20), canvasWidth-3, 7+ctx.measureText("O").width/2, "#cccccc", "#000000");
			}
			ctx.textAlign="left"; 
			if(mouseX<canvasWidthDefault){
				disegnaTestoConBordino("mouseX:"+lvlCanvasMouseX+" mouseY:"+lvlCanvasMouseY, 3, 7+ctx.measureText("O").width/2, "#cccccc", "#000000");
			}
		}
	  }	
      
      function drawEntity(doEntityPhysics){   //disegna le entità a schermo e chiama la entity[i].physics
        for (var i = 0; i < entity.length; i++) {
          if (entity[i].life > 0){ //calcola la entita solo se la sua vita è maggiore di zero
            //variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
            var xdisegnata=0;
            if (player.x+(player.width/2) < canvasWidth/2){
              xdisegnata=entity[i].x;
            }else{
              if (player.x+(player.width/2) > level.maxWidth-canvasWidth/2){
                xdisegnata=entity[i].x-level.maxWidth+canvasWidth;
              }else{
                xdisegnata=entity[i].x-player.x-(player.width/2)+canvasWidth/2;
              }
            }
			      var ydisegnata=0;
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
            if ( (xdisegnata+entity[i].width > (-canvasWidth/8) && xdisegnata < (canvasWidth+(canvasWidth/8))) && (ydisegnata > (-canvasHeight/8) && ydisegnata < (canvasHeight+(canvasHeight/8))) || entity[i].type=="sparoDelPlayer") { //questo if fa i controlli spiegati sopra 
              if(entity[i].canSelfDraw==true){
                  entity[i].selfDraw(xdisegnata,ydisegnata, i);
              }else{
              	  ctx.fillStyle = entity[i].color;
                  ctx.fillRect(xdisegnata, ydisegnata, entity[i].width, entity[i].height);
              }
              if(doEntityPhysics && entity[i].hasPhysics){entity[i].physics(xdisegnata,ydisegnata, i);}
            }
          }
        }
      }
      
      function newSideMenu(){
        this.width=realCanvasWidth-canvasWidthDefault;
        this.height=canvasHeightDefault;
        this.openedTab=0;
        this.nrTab=3;
        this.mouseTimer=0;
        this.showAnotherMenu=false;
        this.showExitMenu=false;
        this.showExtendLevelMenu=false;
        this.showModifyBackgroundMenu=false;
        this.extendLevelMenu_staScrivendo=false;
        this.extendLevelMenu_staScrivendo_Width=false;
        this.newNumberWidth=0;
        this.newNumberHeight=0;
        this.selected="NIENTE";//blocco/entita' selezionata - se vuoto deve essere == "NIENTE"
        this.fill=false;
        this.isSelecting=false;
        this.modifyBlock=false;
    		this.showModifyBlockMenu=false;
    		this.startingColor=[0,0,0,255];
    		this.modifyBlockLetter=""; 
        this.showEntityTimer=0;
        this.incrementaTimer=false;       
        this.drawSideMenu = async function (){
          if(this.mouseTimer>0 && !this.showAnotherMenu){this.mouseTimer--;}//timer mouse
          ctx.fillStyle="#cccccc"; ctx.fillRect(canvasWidthDefault, 0, this.width, this.height); //sfondo
          this.tabCode(); //disegno la parte in alto delle tab e le gestisco (mouse input)
          switch(this.openedTab){//disegno la tab aperta
            case 0: this.toolTabCode(); break;
            case 1: this.blockTabCode(); break;
            case 2: this.entityTabCode(); break;
          }
          if(player.showLevelBar){this.drawlevelBar();}
          if(this.showAnotherMenu && this.showExitMenu){this.drawExitMenu();}
          if(this.showAnotherMenu && this.showExtendLevelMenu){this.drawExtendLevelMenu();}
          if(this.showAnotherMenu && this.showModifyBackgroundMenu){this.drawModifyBackgroundMenu();}
          if(this.showAnotherMenu && this.showModifyBlockMenu){this.drawModifyBlockMenu();}
          if(this.selected!="NIENTE"){await this.piazzaBloccoCode();}
          ctx.textAlign="left";//sistemo almeno non si buggano gli altri menu
        }//fine drawSideMenu()
        this.tabCode = function (){
          tabWidth=this.width/this.nrTab;
          tabHeight=20;        
          ctx.textAlign="center";
          for(i=0; i<this.nrTab; i++){
            var tabTitle=""; var textSize=20;
            switch(i){
              case 0: tabTitle="tools";break;
              case 1: tabTitle="blocks";break;
              case 2: tabTitle="entities";break;
            }
            for(j=textSize;j>2;j--){//riduco le dimensioni del testo se la scritta non ci sta
              ctx.font = "small-caps bold "+j+"px Lucida Console";
              if(ctx.measureText(tabTitle).width < tabWidth-4){break;}  
            }
            if(i!=this.openedTab){
              ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+i*tabWidth, 0, tabWidth, tabHeight); //sfondo scuro tab non selez
              ctx.fillStyle="#6c6c6c"; ctx.fillRect(canvasWidthDefault+(i+1)*tabWidth-1, 0, 1, tabHeight); //separatore tab
            }
            disegnaTestoConBordino(tabTitle, canvasWidthDefault+i*tabWidth+(tabWidth/2), tabHeight/2+ctx.measureText("o").width/2, "#000000");//testo della tab
            if(checkMouseBox(canvasWidthDefault+i*tabWidth,0,tabWidth,tabHeight) && mouseClick && !this.showAnotherMenu){
			  if(i!=this.openedTab){this.selected="NIENTE"; this.isSelecting=false; this.modifyBlock=false; this.fill=false;} //azzero la selezione al cambio di tab
              this.openedTab=i; 
            }
          }          
        }//fine tabCode()
        this.toolTabCode = function (){
          var numeroVoci=10;         
          var voceHeight=(this.height-20)/numeroVoci;
          ctx.textAlign="left"; ctx.font = "small-caps bold 15px Lucida Console";
          for(k=0; k<numeroVoci; k++){
            switch(k){
              case 0://show player coordinate 
                var word="Show Coordinates"; 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                disegnaTestoConBordino("[ ]", canvasWidthDefault+5+5+ctx.measureText(word).width, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(player.showCoordinates){disegnaTestoConBordino(" X", canvasWidthDefault+4+5+ctx.measureText(word).width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");}
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){player.showCoordinates=!player.showCoordinates; this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;             
              case 1://show player camera 
                var word="Show Player Camera"; 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                disegnaTestoConBordino("[ ]", canvasWidthDefault+5+5+ctx.measureText(word).width, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(player.showPlayerCamera){disegnaTestoConBordino(" X", canvasWidthDefault+4+5+ctx.measureText(word).width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");}
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){player.showPlayerCamera=!player.showPlayerCamera; this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;            
              case 2://show grid
                var word="Show Grid"; 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                disegnaTestoConBordino("[ ]", canvasWidthDefault+5+5+ctx.measureText(word).width, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(player.showGrid){disegnaTestoConBordino(" X", canvasWidthDefault+4+5+ctx.measureText(word).width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");}
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){player.showGrid=!player.showGrid; this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;
              case 3://snap mode 
                var word="Camera snap mode"; 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                disegnaTestoConBordino("[ ]", canvasWidthDefault+5+5+ctx.measureText(word).width, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(player.snapMode){disegnaTestoConBordino(" X", canvasWidthDefault+4+5+ctx.measureText(word).width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");}
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){player.snapMode=!player.snapMode; this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;
              case 4://level bars
                var word="Enable level bars"; 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                disegnaTestoConBordino("[ ]", canvasWidthDefault+5+5+ctx.measureText(word).width, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(player.showLevelBar){
                	disegnaTestoConBordino(" X", canvasWidthDefault+4+5+ctx.measureText(word).width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                	disegnaTestoConBordino("permanent [ ]", canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2+ctx.measureText("o").width+3, "#000000");	
                }
                if(player.permanentLevelBar){disegnaTestoConBordino("X", canvasWidthDefault+2+ctx.measureText("permanent [").width, 21+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2+ctx.measureText("o").width+3, "#000000");}
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){
                  	if(player.permanentLevelBar){player.permanentLevelBar=false; player.showLevelBar=false;
                  	}else if(player.showLevelBar){player.permanentLevelBar=true;
                  	}else{player.showLevelBar=true;}
                  	this.mouseTimer=10; this.selected="NIENTE"; }
                }
                break;
              case 5://modify water level
                var word="Add water level";
                if(level.waterLevel){
                  word="Remove water";
                }
                if(this.selected=="w"){
                  ctx.fillStyle="#979797"; ctx.fillRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  ctx.strokeStyle="#222222"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                } 
                disegnaTestoConBordino(word, canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){
                    this.mouseTimer=10;
                    if(level.waterLevel){//se c'e' l'acqua la toglie
                      var indice=-1;
                      for(o=0; o<level.indiceZ; o++){
                        if(stringaLivello[o]=="w"){
                          indice=o; break;
                        }
                      }
                      stringaLivello=stringaLivello.slice(0,indice)+"l"+stringaLivello.slice(indice+1);
                      stringToLevel(stringaLivello);                      
                    }else{//se non c'e' l'acqua invece la puoi mettere
                      if(this.selected=="w"){
                        this.selected="NIENTE";
                      }else{
                        this.selected="w";
                      }
                    }
                  }
                }
                break;                                
              case numeroVoci-4://extend level
                disegnaTestoConBordino("Modify level lenght", canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000"); 
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){this.showExtendLevelMenu=true;this.showAnotherMenu=true; this.newNumberWidth=0; this.newNumberHeight=0; this.selected="NIENTE"; this.mouseTimer=10;}                  
                }
                break;
              case numeroVoci-3://exit to main menu
                disegnaTestoConBordino("Modify background image", canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000"); 
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){
			        document.getElementById("caricaPartitaDiv").style.zIndex = "10";
			        document.getElementById("fileCaricaPartita").disabled=false; 
                  	this.showModifyBackgroundMenu=true;this.showAnotherMenu=true; this.selected="NIENTE"; this.mouseTimer=10;
                  }
                }
                break;                                                
              case numeroVoci-2://save level 
                disegnaTestoConBordino("Save Level", canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000");
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){salvaLivello(); this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;
              case numeroVoci-1://exit to main menu
                disegnaTestoConBordino("Back to main menu", canvasWidthDefault+5, 20+(voceHeight*k)+voceHeight/2+ctx.measureText("o").width/2, "#000000"); 
                if(checkMouseBox(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4)){
                  ctx.strokeStyle="#000000"; ctx.lineWidth="2";
                  ctx.strokeRect(canvasWidthDefault+2,20+voceHeight*k+2,this.width-4,voceHeight-4);
                  if(mouseClick && this.mouseTimer==0){this.showExitMenu=true;this.showAnotherMenu=true; this.selected="NIENTE"; this.mouseTimer=10;}
                }
                break;                                              
            }//fine switch
          }
        }//fine di toolTabCode()
        this.drawExitMenu = function (){
          ctx.textAlign="center"; ctx.font = "small-caps bold 22px Lucida Console";
          var string1="do you really want to exit?";
          var string2="every unsaved progress will be lost.";
          var menuWidth=ctx.measureText(string2).width+8;
          var menuHeight=8+(ctx.measureText("O").width+4)*5;
          ctx.fillStyle="#cccccc"; ctx.fillRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          ctx.strokeStyle="#000000"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          disegnaTestoConBordino(string1,realCanvasWidth/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width,"#000000");
          disegnaTestoConBordino(string2,realCanvasWidth/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+(menuHeight-8)/3,"#000000");
          disegnaTestoConBordino("yes",realCanvasWidth/2-menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/3,"#000000");
          if(checkMouseBox(realCanvasWidth/2-menuWidth/4-ctx.measureText("aaa").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/3,ctx.measureText("aaa").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2-menuWidth/4-ctx.measureText("aaa").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/3,ctx.measureText("aaa").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){
              canvasWidth = canvasWidthDefault; canvasHeight = canvasHeightDefault;            
              objMenuPrincipale= new newMenuPrincipale(); gamestate=0;
            }
          }
          disegnaTestoConBordino("no",realCanvasWidth/2+menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/3,"#000000");
          if(checkMouseBox(realCanvasWidth/2+menuWidth/4-ctx.measureText("aaa").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/3,ctx.measureText("aaa").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2+menuWidth/4-ctx.measureText("aaa").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/3,ctx.measureText("aaa").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){this.showExitMenu=false;this.showAnotherMenu=false;}
          }            
        }//fine di drawExitMenu()
        this.drawExtendLevelMenu = function (){
          ctx.textAlign="center"; ctx.font = "small-caps bold 22px Lucida Console";
          var string1="LEVEL LENGHT MENU";
          var string2="width: "+(level.maxWidth/20)+" blocks - height: "+(level.maxHeight/20)+" blocks";
          var menuWidth=ctx.measureText(string2).width+8;
          var menuHeight=8+(ctx.measureText("O").width+4)*7;
          ctx.fillStyle="#cccccc"; ctx.fillRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          ctx.strokeStyle="#000000"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          disegnaTestoConBordino(string1,realCanvasWidth/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width,"#000000");
          disegnaTestoConBordino(string2,realCanvasWidth/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+(menuHeight-8)/4,"#000000");
          disegnaTestoConBordino("new width: ____",realCanvasWidth/2-menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/4,"#000000");
          if(this.newNumberWidth!=0){disegnaTestoConBordino(this.newNumberWidth,realCanvasWidth/2-menuWidth/4+ctx.measureText("new width: ").width/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/4-2,"#000000");}
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2-menuWidth/4-ctx.measureText(" new width: xxxx ").width/2,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/4,ctx.measureText(" new width: xxxx ").width,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2-menuWidth/4-ctx.measureText(" new width: xxxx ").width/2,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/4,ctx.measureText(" new width: xxxx ").width,4*ctx.measureText("O").width/2);
            if(mouseClick){this.extendLevelMenu_staScrivendo=true; this.extendLevelMenu_staScrivendo_Width=true; this.newNumberWidth=0; ultimoTastoLetto="";}              
          }
          disegnaTestoConBordino("new height: ____",realCanvasWidth/2+menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/4,"#000000");
          if(this.newNumberHeight!=0){disegnaTestoConBordino(this.newNumberHeight,realCanvasWidth/2+menuWidth/4+ctx.measureText("new height: ").width/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(menuHeight-8)/4-2,"#000000");}
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2+menuWidth/4-ctx.measureText(" new height: xxxx ").width/2,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/4,ctx.measureText(" new height: xxxx ").width,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2+menuWidth/4-ctx.measureText(" new height: xxxx ").width/2,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+2*(menuHeight-8)/4,ctx.measureText(" new height: xxxx ").width,4*ctx.measureText("O").width/2);
            if(mouseClick){this.extendLevelMenu_staScrivendo=true; this.extendLevelMenu_staScrivendo_Width=false; this.newNumberHeight=0; ultimoTastoLetto="";}
          }
          disegnaTestoConBordino("confirm",realCanvasWidth/2-menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+3*(menuHeight-8)/4,"#000000");
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){stringToLevel(aggiornaLivelloExtend(this.newNumberWidth,this.newNumberHeight)); this.showExtendLevelMenu=false;this.showAnotherMenu=false;}
          }
          disegnaTestoConBordino("cancel",realCanvasWidth/2+menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+3*(menuHeight-8)/4,"#000000");
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){this.showExtendLevelMenu=false;this.showAnotherMenu=false;}
          }
          if(this.extendLevelMenu_staScrivendo){
            switch(ultimoTastoLetto){
              case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                if(this.extendLevelMenu_staScrivendo_Width){this.newNumberWidth=this.newNumberWidth*10+parseInt(ultimoTastoLetto,10);
                }else{this.newNumberHeight=this.newNumberHeight*10+parseInt(ultimoTastoLetto,10);}
                ultimoTastoLetto="";
                break;
              case 'Backspace':
                if(this.extendLevelMenu_staScrivendo_Width){this.newNumberWidth=Math.floor(this.newNumberWidth/10);
                }else{this.newNumberHeight=Math.floor(this.newNumberHeight/10);}
                ultimoTastoLetto="";              
                break;
              case 'Enter':
                this.extendLevelMenu_staScrivendo=false;
                break;                                       
            }
          }
          function aggiornaLivelloExtend(newWidth,newHeight){
            if(newWidth>0){
              var differenzaWidth=(newWidth*20)-level.maxWidth;
              if(differenzaWidth>0){
                var puntiInPiu=""; var tInPiu=""; 
                for(var i=0; i<(differenzaWidth/20); i++){puntiInPiu+="."; tInPiu+="t";}
                for(var i=1; i<level.maxHeight/20; i++){
                  var newStringaLivello="";
                  if(i==1){
                    newStringaLivello = stringaLivello.slice(0, (level.maxWidth/20)-1) + tInPiu + stringaLivello.slice(-1+level.maxWidth/20);
                  }else{
                    newStringaLivello = stringaLivello.slice(0, (i*(level.maxWidth/20-1)+(i-1)*(puntiInPiu.length)) ) + puntiInPiu + stringaLivello.slice((i*(level.maxWidth/20-1)+(i-1)*(puntiInPiu.length)));
                  }
                  stringaLivello=newStringaLivello;  
                }
              }else if(differenzaWidth<0){
                for(var i=1; i<level.maxHeight/20; i++){
                  var newStringaLivello="";
				  newStringaLivello = stringaLivello.slice(0, (i*(level.maxWidth/20-1)+(i)*(differenzaWidth/20)))+ stringaLivello.slice(i*(level.maxWidth/20-1)+(i-1)*(differenzaWidth/20));
                  stringaLivello=newStringaLivello;
                }
              }
              level.maxWidth+=differenzaWidth; //serve per i calcoli della height, se no viene sbagliato perche' li fa subito dopo
            }
            if(newHeight>0){
              var differenzaHeight=(newHeight*20)-level.maxHeight;
              if(differenzaHeight>0){
                var rigaInPiu="l";
                for(var i=1;i<level.maxWidth/20-1;i++){rigaInPiu+=".";}
                for(var i=1; i<differenzaHeight/20+1; i++){
                  var newStringaLivello="";
                  newStringaLivello = stringaLivello.slice(0, (level.maxWidth/20-1)*(level.maxHeight/20-1)) + rigaInPiu + stringaLivello.slice((level.maxWidth/20-1)*(level.maxHeight/20-1));
                  stringaLivello=newStringaLivello;
                }  
              }else if(differenzaHeight<0){
                  var newStringaLivello="";
                  newStringaLivello = stringaLivello.slice(0, (level.maxWidth/20-1)*(level.maxHeight/20-1+(differenzaHeight/20))) + stringaLivello.slice((level.maxWidth/20-1)*(level.maxHeight/20-1));
                  stringaLivello=newStringaLivello;
              }
              level.maxHeight+=differenzaHeight;                          
            }
            if(player.x>level.maxWidth){player.x=level.maxWidth-player.width*2}
            if(player.y>level.maxHeight){player.y=level.maxHeight-player.height*2}            
            return stringaLivello;
          }                     
        }//fine di drawExtendLevelMenu()
        this.drawlevelBar = function (){
       		var oriBarWidth=38; var oriBarHeight=15;
       		var oriBarX=(player.x/level.maxWidth)*canvasWidth-(oriBarWidth/2); var oriBarY=canvasHeight-3-oriBarHeight;
       		var verBarWidth=15; var verBarHeight=34;
       		var verBarX=canvasWidth-3-verBarWidth; var verBarY=(player.y/level.maxHeight)*canvasHeight-(verBarHeight/2);
       		if(player.permanentLevelBar || checkMouseBox(0,canvasHeight-3-oriBarHeight,canvasWidth,oriBarHeight+3)){
	       		if(oriBarX+oriBarWidth>canvasWidthDefault){oriBarWidth=(canvasWidthDefault-oriBarX);}
	       		if(oriBarX<0){oriBarWidth+=oriBarX; oriBarX=0;}
	        	if(!this.showAnotherMenu && checkMouseBox(0,canvasHeight-3-oriBarHeight,canvasWidth,oriBarHeight+3) && mouseClick && !checkMouseBox(canvasWidth-3-verBarWidth,0,verBarWidth+3,canvasHeight)){
	        		oriBarX=mouseX-oriBarWidth/2;
	        		player.x=((oriBarX+oriBarWidth/2)*level.maxWidth)/canvasWidth;
	        		this.mouseTimer=30;
	        	}
	        	ctx.fillStyle="#cccccc"; ctx.fillRect(oriBarX, oriBarY, oriBarWidth, oriBarHeight);
	        	ctx.strokeStyle="#000000"; ctx.strokeRect(oriBarX, oriBarY, oriBarWidth, oriBarHeight);	        	
        	}
       		if(player.permanentLevelBar || checkMouseBox(canvasWidth-3-verBarWidth,0,verBarWidth+3,canvasHeight)){
	       		if(verBarY+verBarHeight>canvasHeightDefault){verBarHeight=(canvasHeightDefault-verBarY);}
	       		if(verBarY<0){verBarHeight+=verBarY; verBarY=0;}
	        	if(!this.showAnotherMenu && checkMouseBox(canvasWidth-3-verBarWidth,0,verBarWidth+3,canvasHeight) && mouseClick && !checkMouseBox(0,canvasHeight-3-oriBarHeight,canvasWidth,oriBarHeight+3)){
	        		verBarY=mouseY-verBarHeight/2;
	        		player.y=((verBarY+verBarHeight/2)*level.maxHeight)/canvasHeight;
	        		this.mouseTimer=30;
	        	}
	        	ctx.fillStyle="#cccccc"; ctx.fillRect(verBarX, verBarY, verBarWidth, verBarHeight);
	        	ctx.strokeStyle="#000000"; ctx.strokeRect(verBarX, verBarY, verBarWidth, verBarHeight);	        	
        	}        				
        }//fine di drawLevelBar()
        this.drawModifyBackgroundMenu = async function (){
          ctx.textAlign="center"; ctx.font = "small-caps bold 14px Lucida Console";
          var offsetY=10;
          var string1="BACKGROUND MENU";
          var string2="Upload the new image. Confirm without uploading to remove the current background.";
          var menuWidth=8+ctx.measureText(string2).width;
          var menuHeight=8+(ctx.measureText("O").width+4)*5;
          ctx.fillStyle="#cccccc"; ctx.fillRect(realCanvasWidth/2-menuWidth/2, -offsetY+canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          ctx.strokeStyle="#000000"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2, -offsetY+canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          disegnaTestoConBordino(string1, realCanvasWidth/2, -offsetY+4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width,"#000000");
          disegnaTestoConBordino(string2, realCanvasWidth/2, -offsetY+4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+(menuHeight-8)/5,"#000000");
          disegnaTestoConBordino("confirm",realCanvasWidth/2-menuWidth/4, -offsetY+4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+3*(menuHeight-8)/4,"#000000");
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width, -offsetY+5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width, -offsetY+5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4, ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){
            	var immagineLetta = await controllaFile();
      				stringaLivello = rimuoviBackgroundCorrente(stringaLivello)+immagineLetta;
      				stringToLevel(stringaLivello);
            	document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
            	document.getElementById("fileCaricaPartita").value="";
            	document.getElementById("fileCaricaPartita").disabled=true;
            	document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
            	this.showModifyBackgroundMenu=false; this.showAnotherMenu=false;
            }
          }
          disegnaTestoConBordino("cancel",realCanvasWidth/2+menuWidth/4,-offsetY+4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+3*(menuHeight-8)/4,"#000000");
          if(!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width, -offsetY+5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width, -offsetY+5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+3*(menuHeight-8)/4,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){
              	document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
              	document.getElementById("fileCaricaPartita").value="";
              	document.getElementById("fileCaricaPartita").disabled=true;
              	document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
            	this.showModifyBackgroundMenu=false; this.showAnotherMenu=false;
            }
          }
          function rimuoviBackgroundCorrente(lvlString){
          	var i=level.indiceZ; //parti da dopo la z
          	for (; i < lvlString.length; i++) { //ciclo fino all'ultimo colore
				if(lvlString[i]==" "){break;}//lo spazio c'e' solo prima dell'immagine di sfondo
			}
			lvlString=lvlString.slice(0,i)+" ";
			return lvlString;          					
          }
	      async function controllaFile(){ //controlla che il file sia caricato correttamente
	      		if(document.getElementById("fileCaricaPartita").value==""){ return "";}
	            var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
	            if(uploadedFile.size > (2*1024*1024)){//controlla la dimensione del file - non deve essere superiore a 1MB
	               objAlert = new newAlert("The file size limit is 2MB. Upload a smaller file.",gamestate); gamestate=5;
	               return false;
	            }
	            var immagineBase64Letta = await readFileAsDataURL(uploadedFile);
	            return immagineBase64Letta;
	            	            
	            async function readFileAsDataURL(uploadedFile) {
	                let stringaLetta = await new Promise((resolve) => {
	                    let fileReader = new FileReader();
	                    fileReader.onload = (e) => resolve(fileReader.result);
	                    fileReader.readAsDataURL(uploadedFile);
	                });
	                return stringaLetta;
	            }                                    
	      }//fine di controllaFile()          
        }//fine di drawModifyBackground()        
        this.blockTabCode = function (){
      		var offsetY=this.selectAndEraserCode()+20;
      		var voceHeight=ctx.measureText("O").width*2;
            var word="modify block color";
            ctx.textAlign="center"; ctx.font = "small-caps bold 15px Lucida Console";
            if(this.modifyBlock){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);}
            ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);
            disegnaTestoConBordino(word, canvasWidthDefault+this.width/2, offsetY-2+voceHeight-ctx.measureText("O").width/2, "#000000");
            if(checkMouseBox(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4)){
              ctx.strokeStyle="#000000"; ctx.lineWidth="2";
              ctx.strokeRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);
              if(mouseClick && this.mouseTimer==0){this.modifyBlock=!this.modifyBlock; this.selected="NIENTE"; this.fill=false; this.isSelecting=false; this.mouseTimer=10;}			
            }
            offsetY+=voceHeight;
            word="fill rectangle";
            if(this.fill){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);}
            ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);
            if(this.selected!="NIENTE"){
	            disegnaTestoConBordino(word, canvasWidthDefault+this.width/2, offsetY-2+voceHeight-ctx.measureText("O").width/2, "#000000");
	            if (checkMouseBox(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4)){
	              ctx.strokeStyle="#000000"; ctx.lineWidth="2";
	              ctx.strokeRect(canvasWidthDefault+2, offsetY+2, this.width-4, voceHeight-4);
	              if(mouseClick && this.mouseTimer==0){this.fill=!this.fill; this.isSelecting=false; this.modifyBlock=false; this.mouseTimer=10;}			
	            }
            }else{
            	disegnaTestoConBordino(word, canvasWidthDefault+this.width/2, offsetY-2+voceHeight-ctx.measureText("O").width/2, "#676767");
            }
            offsetY+=voceHeight;            
            ctx.textAlign="center"; ctx.font = "bold 15px Lucida Console";
            var blockLetter=["PLATFORM BLOCKS","a","b","c","d","e","f","g","h","i","j","k","X","FOREGROUND BLOCKS","m","n","o","BACKGROUND BLOCKS","p","q","r"];
            var altezzaTotale=canvasHeightDefault-offsetY+10;
            var numeroRighe=9; var rigaCorrente=0;
            var altezzaRiga=altezzaTotale/numeroRighe;
            var larghezzaScritta=this.width/3;
            offsetY-=10;
            for(i=0;i<blockLetter.length;i++){
            	if(blockLetter[i].length>2){
            		disegnaTestoConBordino(blockLetter[i], canvasWidthDefault+this.width/2, offsetY-2+altezzaRiga*(rigaCorrente+1)-ctx.measureText("O").width/2, "#000000");
            	}else{
            		for(j=0; j<3;j++){
            			if(blockLetter[i].length<2){
                    var latoRect=ctx.measureText("O").width*2;
            				var rectColor="";
            				if(this.selected==blockLetter[i]){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4);}
                    if(blockLetter[i]=="X"){
                      rectColor=player.color;
                      ctx.font = "small-caps bold 10px Lucida Console";
                      disegnaTestoConBordino("starting", canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2, offsetY+altezzaRiga*(rigaCorrente)+ctx.measureText("O").width, "#000000","#cccccc");
                      disegnaTestoConBordino("position", canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2, offsetY-4+altezzaRiga*(rigaCorrente+1), "#000000","#cccccc");
                      ctx.font = "bold 15px Lucida Console";
                    }else{rectColor=this.getBlockColor(blockLetter[i]);}                    
            				ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4);
            				if(checkMouseBox(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4)){
            					ctx.strokeStyle="#000000"; ctx.lineWidth="2"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4); 
            					if(mouseClick && this.mouseTimer==0){
            						this.mouseTimer=10;
            						if(this.modifyBlock){
                         				 if(blockLetter[i]!="X"){
	  							          	var k=0; for(l=1; l<rectColor.length; l+=2){
	  							          		this.startingColor[k]=parseInt(rectColor[l]+rectColor[l+1],16);
	  							          		k++;
	  							          	}            						
	              							this.showModifyBlockMenu=true; this.showAnotherMenu=true;
	              							this.modifyBlockLetter=blockLetter[i];
	                          			}
            							this.modifyBlock=false;
            						}else{
            							if(this.selected==blockLetter[i]){
            								this.selected="NIENTE";
            							}else{
            								this.selected=blockLetter[i];
            							}
            							this.isSelecting=false;
            							this.fill=false;
            						}
            					}
            				}
            				ctx.fillStyle=rectColor; ctx.fillRect(canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2-latoRect/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2-latoRect/2+ctx.measureText("o").width/4, latoRect, latoRect);
            				ctx.strokeStyle="#222222"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2-latoRect/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2-latoRect/2+ctx.measureText("o").width/4, latoRect, latoRect);
            				if(debugMode || blockLetter[i]=="X"){disegnaTestoConBordino(blockLetter[i], canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2+ctx.measureText("O").width/2, "#000000","#cccccc");}
            				i++;
            			}
            		}
            		i--;
            	}
            	rigaCorrente++;
            }
            ctx.textAlign="left";
        }//fine di blockTabCode()
        this.getBlockColor = function (blockLetter){
        	var puntiVirgola=0;
        	var colore=[];
        	for(k=level.indiceZ; k<stringaLivello.length; k++){
            if(stringaLivello[k]==" "){break;}
        		if (stringaLivello[k] == ";"){
					     puntiVirgola++;
        		}
        		if(puntiVirgola>1){
        			var coloreLetto="";
    					for (; k < stringaLivello.length; k++) {
    						if (stringaLivello[k] != ";"){
    							coloreLetto+=stringaLivello[k]
    						}else{
    							if (coloreLetto==""){
    								colore[(puntiVirgola-2)]="#155261";
    								break;
    							}else{
    								colore[(puntiVirgola-2)]=coloreLetto;
    								coloreLetto="";
    								k--; break;
    							}
    						}
    					}        			
        		}
        	}
        	switch(blockLetter){
        		case "a": return colore[0]; break; 
        		case "b": return colore[1]; break;
        		case "c": return colore[2]; break;
        		case "d": return colore[3]; break;
        		case "e": return colore[4]; break;
        		case "f": return colore[5]; break;
        		case "g": return colore[6]; break;
        		case "h": return colore[7]; break;
        		case "i": return colore[8]; break;
        		case "j": return colore[9]; break;
        		case "k": return colore[10]; break;
        		case "m": return colore[11]; break;
        		case "n": return colore[12]; break;
        		case "o": return colore[13]; break;
        		case "p": return colore[14]; break;
        		case "q": return colore[15]; break;
        		case "r": return colore[16]; break;
        	}
        }
        this.drawModifyBlockMenu = function (){
          if(this.mouseTimer>1){this.mouseTimer--;}
          ctx.textAlign="center"; ctx.font = "bold 18px Lucida Console";
          var string1="MODIFY BLOCK COLOR"; if(debugMode){string1+=": "+this.modifyBlockLetter;}
          var string2=["r:","g:","b:","α:"];
          var menuWidth=realCanvasWidth/2;
          var menuHeight=8+(ctx.measureText("O").width+4)*12;
          var rectDimension=8*(menuHeight-8)/12;
          var rectColor="#";
          for(i=0; i<4; i++){if(this.startingColor[i]>15){if(!(i==3 && this.startingColor[i]==255)){rectColor+=this.startingColor[i].toString(16);}}else{rectColor+="0"+this.startingColor[i].toString(16);}}
          var xOffset=10;
          ctx.fillStyle="#cccccc"; ctx.fillRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          ctx.strokeStyle="#000000"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2, canvasHeightDefault/2-menuHeight/2, menuWidth, menuHeight);
          ctx.fillStyle=rectColor; ctx.fillRect(realCanvasWidth/2+menuWidth/2-xOffset-rectDimension, 2+canvasHeightDefault/2-menuHeight/2+2*(menuHeight-8)/12, rectDimension*0.91, rectDimension*0.91);
          disegnaTestoConBordino(rectColor, realCanvasWidth/2+menuWidth/2-xOffset-rectDimension+rectDimension*0.91/2, -3+canvasHeightDefault/2-menuHeight/2+2*(menuHeight-8)/12+rectDimension*0.91, "#000000", "#cccccc");
          disegnaTestoConBordino(string1,realCanvasWidth/2,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width,"#000000");
          ctx.textAlign="left";
          for(i=0; i<4; i++){
          	xOffset=10;
          	var textColor=""; switch (i) {case 0: textColor="#ff0000";break; case 1: textColor="#00ff00";break; case 2: textColor="#0000ff";break; default: textColor="#000000";break;}
          	disegnaTestoConBordino(string2[i],realCanvasWidth/2-menuWidth/2+xOffset,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(i+1)*(menuHeight-8)/12,textColor);
          	xOffset+=10+ctx.measureText("α:").width;
          	disegnaTestoConBordino("-",realCanvasWidth/2-menuWidth/2+xOffset,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(i+1)*(menuHeight-8)/12,textColor);
          	ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2+xOffset-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5);
          	if(this.startingColor[i]>0 && this.mouseTimer==1 && checkMouseBox(realCanvasWidth/2-menuWidth/2+xOffset-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5)){
          		ctx.strokeStyle="#000000"; ctx.lineWidth="2"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2+xOffset-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5);
          		if(mouseClick){ this.startingColor[i]--; this.mouseTimer=10;}	
          	}
          	xOffset+=5+ctx.measureText("O").width;
          	var barLength=menuWidth-xOffset*2-rectDimension-ctx.measureText("000").width;
          	ctx.fillStyle="#676767"; ctx.fillRect(realCanvasWidth/2-menuWidth/2+xOffset,-2+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(i+1)*(menuHeight-8)/12, barLength, 3);
          	var sliderWidth=5; var sliderX=realCanvasWidth/2-menuWidth/2+xOffset-sliderWidth/2;
          	if(checkMouseBox(realCanvasWidth/2-menuWidth/2+xOffset,-2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, barLength, ctx.measureText("O").width*2) && mouseClick){
          		this.startingColor[i]=-4+Math.round((mouseX-sliderX)*255/barLength);
          		if(this.startingColor[i]<0){this.startingColor[i]=0;} if(this.startingColor[i]>255){this.startingColor[i]=255;}
          	}
          	sliderX+=barLength*this.startingColor[i]/255;
          	ctx.fillStyle="#272727"; ctx.fillRect(sliderX, -1+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12+ctx.measureText("O").width/2, sliderWidth, ctx.measureText("O").width);
          	disegnaTestoConBordino("+  "+this.startingColor[i],realCanvasWidth/2-menuWidth/2+xOffset+barLength+10,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+2*(i+1)*(menuHeight-8)/12,textColor);
          	ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2+xOffset+barLength+13.5-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5);
          	if(this.startingColor[i]<255 && this.mouseTimer==1 && checkMouseBox(realCanvasWidth/2-menuWidth/2+xOffset+barLength+13.5-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5)){
          		ctx.strokeStyle="#000000"; ctx.lineWidth="2"; ctx.strokeRect(realCanvasWidth/2-menuWidth/2+xOffset+barLength+13.5-ctx.measureText("O").width/2, 2+canvasHeightDefault/2-menuHeight/2+2*(i+1)*(menuHeight-8)/12, ctx.measureText("O").width*1.5, ctx.measureText("O").width*1.5);
          		if(mouseClick){ this.startingColor[i]++; this.mouseTimer=10;}	
          	}	
          }
          ctx.textAlign="center"; ctx.font = "small-caps bold 18px Lucida Console";
          disegnaTestoConBordino("confirm",realCanvasWidth/2-menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+10*(menuHeight-8)/12,"#000000");
          if(checkMouseBox(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+10*(menuHeight-8)/12,ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2-menuWidth/4-ctx.measureText("confirm").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+10*(menuHeight-8)/12,ctx.measureText("confirm").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){
            	stringToLevel(modificaColore(rectColor,this.modifyBlockLetter));
		        this.showAnotherMenu=false; this.showModifyBlockMenu=false;
				this.startingColor=[0,0,0,255]; this.modifyBlockLetter="";
            }
          }
          disegnaTestoConBordino("cancel",realCanvasWidth/2+menuWidth/4,4+canvasHeightDefault/2-menuHeight/2+ctx.measureText("O").width+10*(menuHeight-8)/12,"#000000");
          if(checkMouseBox(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+10*(menuHeight-8)/12,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2)){
            ctx.strokeStyle="#000000"; ctx.lineWidth="2";
            ctx.strokeRect(realCanvasWidth/2+menuWidth/4-ctx.measureText("cancel").width,5+canvasHeightDefault/2-menuHeight/2-ctx.measureText("O").width/2+10*(menuHeight-8)/12,ctx.measureText("cancel").width*2,4*ctx.measureText("O").width/2);
            if(mouseClick){
		        this.showAnotherMenu=false; this.showModifyBlockMenu=false;
				this.startingColor=[0,0,0,255]; this.modifyBlockLetter="";	            
            }
          }          
          ctx.textAlign="left";
          function modificaColore(colore,lettera){
          	var puntoVirgolaPrima=0; var puntoVirgolaLetti=0;
          	var inizioColore=0; var fineColore=0;
        	switch(lettera){
        		case "a": puntoVirgolaPrima= 2; break; 
        		case "b": puntoVirgolaPrima= 3; break;
        		case "c": puntoVirgolaPrima= 4; break;
        		case "d": puntoVirgolaPrima= 5; break;
        		case "e": puntoVirgolaPrima= 6; break;
        		case "f": puntoVirgolaPrima= 7; break;
        		case "g": puntoVirgolaPrima= 8; break;
        		case "h": puntoVirgolaPrima= 9; break;
        		case "i": puntoVirgolaPrima= 10; break;
        		case "j": puntoVirgolaPrima= 11; break;
        		case "k": puntoVirgolaPrima= 12; break;
        		case "m": puntoVirgolaPrima= 13; break;
        		case "n": puntoVirgolaPrima= 14; break;
        		case "o": puntoVirgolaPrima= 15; break;
        		case "p": puntoVirgolaPrima= 16; break;
        		case "q": puntoVirgolaPrima= 17; break;
        		case "r": puntoVirgolaPrima= 18; break;
        	}
        	for(k=level.indiceZ; k<stringaLivello.length; k++){
            if(stringaLivello[k]==" "){break;}
        		if (stringaLivello[k] == ";"){
					     puntoVirgolaLetti++;
        		}
        		if(puntoVirgolaLetti==puntoVirgolaPrima && inizioColore==0){inizioColore=k+1;}
        		if(puntoVirgolaLetti==puntoVirgolaPrima+1){fineColore=k; break;}
        	}        	          	
        	stringaLivello=stringaLivello.slice(0,inizioColore)+colore+stringaLivello.slice(fineColore);
          	return stringaLivello;
          }
        }
        this.entityTabCode = function (){        
      			var offsetY=this.selectAndEraserCode()+23+ctx.measureText("O").width;
            ctx.textAlign="center"; ctx.font = "small-caps bold 15px Lucida Console";
            var quantitaPerRiga=8;
            var larghezzaScritta=this.width/quantitaPerRiga;
            var altezzaTotale=canvasHeightDefault-offsetY+5;
            var numeroRighe=listaTipoEntity.length;
            for(o=0; o<listaEntity.length; o++){numeroRighe+=Math.ceil(listaEntity[o].length/quantitaPerRiga);} 
            var rigaCorrente=0;
            var altezzaRiga=altezzaTotale/numeroRighe;
            offsetY-=10;
            this.incrementaTimer=false;
            for(o=0;o<listaTipoEntity.length;o++){
            	disegnaTestoConBordino(listaTipoEntity[o], canvasWidthDefault+this.width/2, offsetY-2+altezzaRiga*(rigaCorrente+1)-ctx.measureText("O").width/2, "#000000");
              rigaCorrente++
              for(i=0; i<listaEntity[o].length; i++){
                for(j=0;j<quantitaPerRiga;j++){
                  var latoRect=ctx.measureText("O").width*2;
                  if(this.selected==listaEntity[o][i].letter){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4);}
                  ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4);
                  var rectColor=listaEntity[o][i].color;
                  if(checkMouseBox(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4)){
            		  ctx.strokeStyle="#000000"; ctx.lineWidth="2"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+2, offsetY+2+altezzaRiga*(rigaCorrente), larghezzaScritta-4, altezzaRiga-4);
            		  ctx.textAlign="center"; ctx.font="small-caps bold 10px Lucida Console";
            		  var entityRectWidth=listaEntity[o][i].width+10; if(entityRectWidth<ctx.measureText(listaEntity[o][i].name).width+10){entityRectWidth=ctx.measureText(listaEntity[o][i].name).width+10;}
                      ctx.fillStyle="#cccccc"; ctx.fillRect(canvasWidthDefault/2-entityRectWidth/2, canvasHeightDefault/2-listaEntity[o][i].height/2-10, entityRectWidth, listaEntity[o][i].height+20+ctx.measureText("O").width);
                      ctx.strokeStyle="#000000"; ctx.lineWidth="2"; ctx.strokeRect(canvasWidthDefault/2-entityRectWidth/2, canvasHeightDefault/2-listaEntity[o][i].height/2-10, entityRectWidth, listaEntity[o][i].height+20+ctx.measureText("O").width);  
                      disegnaTestoConBordino(listaEntity[o][i].name, canvasWidthDefault/2, canvasHeightDefault/2+listaEntity[o][i].height/2+8-2+ctx.measureText("O").width, "#000000");
                      if(listaEntity[o][i].canSelfDraw==true){
                          listaEntity[o][i].selfDraw(canvasWidthDefault/2-listaEntity[o][i].width/2, canvasHeightDefault/2-listaEntity[o][i].height/2, i); 
                      }else{
                      	  ctx.fillStyle = listaEntity[o][i].color;
                          ctx.fillRect(canvasWidthDefault/2-listaEntity[o][i].width/2, canvasHeightDefault/2-listaEntity[o][i].height/2, listaEntity[o][i].width, listaEntity[o][i].height);
                      }
                      ctx.textAlign="center"; ctx.font="small-caps bold 15px Lucida Console";
            					if(mouseClick && this.mouseTimer==0){
            						this.mouseTimer=10;
          							if(this.selected==listaEntity[o][i].letter){
          								this.selected="NIENTE";
          							}else{
          								this.selected=listaEntity[o][i].letter;
          							}
          							this.isSelecting=false;
            					}
            				}
            				ctx.fillStyle=rectColor; ctx.fillRect(canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2-latoRect/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2-latoRect/2+ctx.measureText("o").width/4, latoRect, latoRect);
            				ctx.strokeStyle="#222222"; ctx.strokeRect(canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2-latoRect/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2-latoRect/2+ctx.measureText("o").width/4, latoRect, latoRect);
            				if(true){disegnaTestoConBordino(listaEntity[o][i].letter, canvasWidthDefault+j*larghezzaScritta+larghezzaScritta/2, offsetY-2+altezzaRiga*(rigaCorrente)+altezzaRiga/2+ctx.measureText("O").width/2, "#000000","#cccccc");}
            				i++;
                    if(i>listaEntity[o].length-1){break;}
                }rigaCorrente++;i--;
              }                  
            }
            ctx.textAlign="left";      
        }//fine di entityTabCode()        
        this.selectAndEraserCode = function (){
        	ctx.textAlign="center"; ctx.font = "small-caps bold 15px Lucida Console";
        	var voceWidth=this.width/2;
        	var voceHeight=ctx.measureText("O").width*2;
	        var word1="select"; var word2="eraser"; var word3="deselect";
	        if(this.isSelecting){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4);}
	        if(this.selected=="."){ctx.fillStyle="#8c8c8c"; ctx.fillRect(canvasWidthDefault+voceWidth+2, 22, voceWidth-4, voceHeight-4);}
	        ctx.strokeStyle="#676767"; ctx.lineWidth="1"; ctx.strokeRect(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4); ctx.strokeRect(canvasWidthDefault+voceWidth+2, 22, voceWidth-4, voceHeight-4);
	        if(this.selected=="NIENTE"){ 
	        	disegnaTestoConBordino(word1, canvasWidthDefault+voceWidth/2, 20+voceHeight/2+ctx.measureText("o").width/2, "#000000");
		        if(checkMouseBox(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4)){
		          ctx.strokeStyle="#000000"; ctx.lineWidth="2";
		          ctx.strokeRect(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4);
		          if(mouseClick && this.mouseTimer==0){this.isSelecting=!this.isSelecting; this.modifyBlock=false; this.fill=false; this.mouseTimer=10;}
		        }
	        }else{
	        	disegnaTestoConBordino(word3, canvasWidthDefault+voceWidth/2, 20+voceHeight/2+ctx.measureText("o").width/2, "#000000");
		        if(checkMouseBox(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4)){
		          ctx.strokeStyle="#000000"; ctx.lineWidth="2";
		          ctx.strokeRect(canvasWidthDefault+2, 22, voceWidth-4, voceHeight-4);
		          if(mouseClick && this.mouseTimer==0){this.selected="NIENTE"; this.fill=false; this.mouseTimer=10;}
		        }	        	
	        }
        	disegnaTestoConBordino(word2, canvasWidthDefault+voceWidth+voceWidth/2, 20+voceHeight/2+ctx.measureText("o").width/2, "#000000");
	        if(checkMouseBox(canvasWidthDefault+voceWidth+2, 22, voceWidth-4, voceHeight-4)){
	          ctx.strokeStyle="#000000"; ctx.lineWidth="2";
	          ctx.strokeRect(canvasWidthDefault+voceWidth+2, 22, voceWidth-4, voceHeight-4);
	          if(mouseClick && this.mouseTimer==0){
	          	if(this.selected=="."){
					this.selected="NIENTE"; 
	          	}else{
	          		this.selected="."; 
	          	}
	          	this.isSelecting=false; this.modifyBlock=false; this.fill=false; this.mouseTimer=10;
	          }
	        }	        
	        ctx.textAlign="left";				
			return voceHeight; 
        }//fine di selectAndEraserCode()
        this.piazzaBloccoCode = function (){
          if(mouseClick && mouseY>25 && mouseX>25 && mouseX<canvasWidth-25 && mouseY<canvasHeight-25){
            var indice=(level.maxWidth/20-1)*lvlCanvasMouseY;
            if(this.selected=="w"){
              if(stringaLivello[indice]!="t"){
                for(i=level.maxWidth/20-1; i<level.indiceZ; i++){
                  if(stringaLivello[i]=="w"){
                    stringaLivello=stringaLivello.slice(0,i)+"l"+stringaLivello.slice(i+1);
                  }
                }
                stringaLivello=stringaLivello.slice(0,indice)+"w"+stringaLivello.slice(indice+1);
                this.selected="NIENTE";
                stringToLevel(stringaLivello);
              }
            }else{
            	if(this.fill){
					indiceX=lvlCanvasMouseX;
					var bloccoDaCambiare=stringaLivello[indice+indiceX];
					var startY=indice;
					var y=startY; 
					var x=indiceX;
					var miFermo=false;
					for(; y>-1; y-=(level.maxWidth/20-1)){if(stringaLivello[y+x]!=bloccoDaCambiare){ y+=(level.maxWidth/20-1); startY=y; break;}}
					for(; y<level.indiceZ; y+=(level.maxWidth/20-1)){
						if(stringaLivello[y+indiceX]!=bloccoDaCambiare){
							break;
						}else{
							if(miFermo){break;}
							var stringaBlocchi=this.selected;
							x=indiceX; var startX=x+y;
							for(;x>-1; x--){
								if(stringaLivello[y+x]!=bloccoDaCambiare){ 
									if(stringaLivello[y+x]!="l"){miFermo=true;}
									x+=2; startX=x+y-1; break;
								}
							}
							for(;x<level.maxWidth/20-1; x++){
								if(stringaLivello[y+x]!=bloccoDaCambiare){
									x--;
									miFermo=true;
									break;
								}else{
									stringaBlocchi+=this.selected;
								}	
							}
							var stringa1=stringaLivello.slice(0,startX);
							var stringa2=stringaLivello.slice(startX+(stringaBlocchi.length))
							stringaLivello=stringa1+stringaBlocchi+stringa2;
							stringToLevel(stringaLivello);
						}	
					}
            	}else{
	              indice+=lvlCanvasMouseX;
	              if(indice<level.indiceZ){
	                switch(stringaLivello[indice]){
	                  case "t": case "l": case "w": break;//nei casi dei blocchi speciali non fare nulla
	                  default: 
	                    stringaLivello=stringaLivello.slice(0,indice)+this.selected+stringaLivello.slice(indice+1);
	                    stringToLevel(stringaLivello);
	                    break; 
	                }
	              }
            	}
            }
          }
        }//fine di piazzaBloccoCode()
      }//fine di sideMenu
      
      function playerPhysics(p1, lvl) {//this function handles the platformer physics - in realta' solo del player
        if(player.snapMode){//1 movimento di griglia alla volta
          var cameraSpeed=20;                                             
          if(!tastoGiaSchiacciato && keys[destrakey] && (p1.x+p1.width<lvl.maxWidth-20)){//x movement (camera)
            p1.x += cameraSpeed;
            tastoGiaSchiacciato=true;
          }
          if(!tastoGiaSchiacciato && keys[sinistrakey] && (p1.x>20)) {
            p1.x -= cameraSpeed;
            tastoGiaSchiacciato=true;
          }
          if(!tastoGiaSchiacciato && keys[sukey]&& (p1.y>20)) {//y movement (camera)
            p1.y -= cameraSpeed;
            tastoGiaSchiacciato=true;
          }
          if(!tastoGiaSchiacciato && keys[giukey]&& (p1.y+p1.height<lvl.maxHeight-20)) {
            p1.y += cameraSpeed;
            tastoGiaSchiacciato=true;
          }          
        }else{
          var cameraSpeed=3;
          if(keys[dashkey]){cameraSpeed=9;}else{cameraSpeed=3;}                                             
          if(keys[destrakey] && (p1.x+p1.width<lvl.maxWidth-20)){//x movement (camera)
            p1.x += cameraSpeed;
          }
          if(keys[sinistrakey] && (p1.x>20)) {
            p1.x -= cameraSpeed;
          }
          if(keys[sukey]&& (p1.y>20)) {//y movement (camera)
            p1.y -= cameraSpeed;
          }
          if(keys[giukey]&& (p1.y+p1.height<lvl.maxHeight-20)) {
            p1.y += cameraSpeed;
          }        
        }
        if(tastoGiaSchiacciato && !(keys[destrakey] || keys[sinistrakey] || keys[sukey] || keys[giukey])){ //azzera tasto gia schiacciato
          tastoGiaSchiacciato=false;
        }
      } //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
          
      function collisionBetween(p1, lvl) {//this function detects the collision between the two given objects - la uso anche con le entità lol
        if (lvl.x < p1.x + p1.width 
        && lvl.x + lvl.width > p1.x 
        && lvl.y < p1.y + p1.height 
        && lvl.y + lvl.height > p1.y) {
                return true;
        } else {
                return false;
        } 
      }
      
      function checkMouseBox(x,y,width,height){
        x--; y--;
        width+=2; height+=2;
        if(showMouseBox){
          tempColor=ctx.fillStyle;
          ctx.fillStyle="#ff330044";
          ctx.fillRect(x, y, width, height);
          ctx.fillStyle=tempColor;
        }
        if(mouseX>x && mouseX<x+width && mouseY>y && mouseY<y+height){
          return true;
        }else{
          return false;
        }
      }     

      function disegnaTestoConBordino(stringaDiTesto, xdisegnata, ydisegnata, coloreTesto, coloreBordino){
        if(coloreBordino){
        	ctx.fillStyle = coloreBordino;
        	ctx.fillText(stringaDiTesto, xdisegnata+1, ydisegnata+1);
        	ctx.fillText(stringaDiTesto, xdisegnata+1, ydisegnata-1);
        	ctx.fillText(stringaDiTesto, xdisegnata-1, ydisegnata+1);
        	ctx.fillText(stringaDiTesto, xdisegnata-1, ydisegnata-1);
        }
      	ctx.fillStyle = coloreTesto;
      	ctx.fillText(stringaDiTesto, xdisegnata, ydisegnata);
      }       
  
  function newAlert(stringaDiTesto, gameStatePrecedente){
  	      this.isOpen=false;
          this.text=stringaDiTesto;
          this.width=0;
          this.height=0;
          this.prevGameState=gameStatePrecedente;
          ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
          this.widthMax=ctx.measureText(stringaDiTesto+"aa").width;
          this.heightMax=ctx.measureText("O").width*2;
          this.drawMenu = function (){
            if (!this.isOpen && !this.isClosing){//animazione di apertura del menu
              if (this.width < this.widthMax){this.width+=(this.widthMax/20);}//always 20 frames to open, no matter how long the text is
              if (this.height < this.heightMax){this.height+=15;}
              if (this.height > this.heightMax-1 && this.width > this.widthMax-1){//quando il menu e' tutto aperto:
              	this.isOpen=true;
              }
            }
  		    ctx.fillStyle = "#d2d2d2"; ctx.fillRect((realCanvasWidth/2)-this.width/2-15,(canvasHeightDefault/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b"; ctx.fillRect((realCanvasWidth/2)-this.width/2,(canvasHeightDefault/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde  
            if(this.isOpen){  //quando il menu e' tutto aperto
                  ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
                  var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
                  ctx.textAlign = "center";
            	  disegnaTestoConBordino(this.text, realCanvasWidth/2, canvasHeightDefault/2+textHeight/2,"#d2d2d2","#000000");
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
                  //ora gestisco gli input
                  if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey] || mouseClick){
                    if(!tastoGiaSchiacciato){
                     tastoGiaSchiacciato=true;
                     gamestate=this.prevGameState;
                    }
                  }else{
                    tastoGiaSchiacciato=false;
                  }		          	
          }//fine di if(is.Open)           
       }
  }  

  function newMenuCaricaPartita(){//carica livello
	    this.isOpen=false;
        this.isClosing=false;
        this.indexAlterato=false;
        this.premutoConferma=false;
        this.premutoCancella=false;
        this.fileLetto=false;
        this.width=0;
        this.height=0;
        this.widthMax=realCanvasWidth/3;
        this.heightMax=canvasHeight-425;
        this.indice=0;
        this.daPulire=false;
        this.numeroDiVoci=1;
        this.drawMenu = async function (){ //asincrono perche' se viene caricata la partita bisogna aspettare che legga il file
          if (!this.isOpen && !this.isClosing){//animazione di apertura del menu
            if (this.width < this.widthMax){this.width+=10;}
            if (this.height < this.heightMax){this.height+=15;}
            if (this.height > this.heightMax-1 && this.width > this.widthMax-1){//quando il menu e' tutto aperto:
            	this.isOpen=true;
            }
          }
          if(this.daPulire){
            objMenuPrincipale.drawMenuPrincipale(false);
            document.getElementById("caricaPartitaDiv").style.zIndex = "10";
            this.daPulire=false;
          }
          ctx.clearRect((realCanvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
		  ctx.fillStyle = "#d2d2d2"; ctx.fillRect((realCanvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
          ctx.fillStyle = "#52b58b"; ctx.fillRect((realCanvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde

          if(this.isOpen){ //quando il menu e' tutto aperto
                if (!this.indexAlterato){
                  document.getElementById("caricaPartitaDiv").style.zIndex = "10";
                  document.getElementById("fileCaricaPartita").disabled=false;
                  this.indexAlterato=true;
                }
                ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
                {//disegno la scritta - {} per diminuire lo scope di ydisegnata
                  var ydisegnata=((canvasHeight/2)-(this.height/2))+30;
                  ctx.textAlign = "center";
                  disegnaTestoConBordino("upload level file", realCanvasWidth/2, ydisegnata,"#d2d2d2","#000000");
                  ctx.font = "small-caps bold 20px Lucida Console";
                  ydisegnata=((canvasHeight/2)+(this.height/2))-30;
                  disegnaTestoConBordino((dashkey+" to confirm"), realCanvasWidth/2, ydisegnata,"#d2d2d2","#000000");
                  if (jumpkey==" "){disegnaTestoConBordino(("spacebar to cancel"), realCanvasWidth/2, ydisegnata+20,"#d2d2d2","#000000");
                  }else{ disegnaTestoConBordino((jumpkey+" to cancel"), realCanvasWidth/2, ydisegnata+20,"#d2d2d2","#000000");}
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
          			}		
                //mouse input 
                if(checkMouseBox((-3+realCanvasWidth/2-ctx.measureText((dashkey+" to confirm")).width/2), 2+(ydisegnata-ctx.measureText("O").width), 6+(ctx.measureText((dashkey+" to confirm")).width), 1+(ctx.measureText("O").width))){
                	ctx.strokeStyle="#000000"; ctx.strokeRect((-3+realCanvasWidth/2-ctx.measureText((dashkey+" to confirm")).width/2), 2+(ydisegnata-ctx.measureText("O").width), 6+(ctx.measureText((dashkey+" to confirm")).width), 1+(ctx.measureText("O").width));
                	if(mouseClick){this.premutoConferma=true;}
                }
                if(checkMouseBox((-3+realCanvasWidth/2-ctx.measureText((jumpkey+" to cancel")).width/2), 2+(ydisegnata+20-ctx.measureText("O").width), 6+(ctx.measureText((jumpkey+" to cancel")).width), 1+(ctx.measureText("O").width))){
                	ctx.strokeStyle="#000000"; ctx.strokeRect((-3+realCanvasWidth/2-ctx.measureText((jumpkey+" to cancel")).width/2), 2+(ydisegnata+20-ctx.measureText("O").width), 6+(ctx.measureText((jumpkey+" to cancel")).width), 1+(ctx.measureText("O").width));
                	if(mouseClick){this.premutoCancella=true;}
                }                   
                //tasti
                  if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {this.premutoConferma=true;}                           			
                  if(keys[jumpkey] && !tastoGiaSchiacciato) {this.premutoCancella=true;}
                  if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                    tastoGiaSchiacciato=true;
                  }else{
                    tastoGiaSchiacciato=false;
                  }
                  if(this.premutoConferma){
                    this.premutoConferma=false;
                    this.daPulire=true;
                    document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                    this.fileLetto=await controllaFile();
                    if (this.fileLetto){
                      this.isOpen=false;
                      this.daPulire=false;
                      this.isClosing=true;
                      document.getElementById("fileCaricaPartita").value="";//svuota il robino dell'input del file di html
                    }                   
                  }
                  if(this.premutoCancella){
                    this.premutoCancella=false;
                    this.isOpen=false;
                    this.isClosing=true;                  
                  }	                  			          	
        }//fine di if(is.Open)
          
        if(this.isClosing){//animazione di chiusura del menu
            if(this.indexAlterato){//disattiva il tasto "sfoglia file" e riporta il focus sul canvas
              document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
              document.getElementById("fileCaricaPartita").disabled=true; //questo comando disattiva il focus sul canvas, devo riattivare il focus se no non legge piu i tasti
              document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
              this.indexAlterato=false;                           
            }
            objMenuPrincipale.drawMenuPrincipale(false); //pulisce lo schermo disegnando lo sfondo (menu principale)
            if (this.width > 0){this.width-=20;}
            if (this.height > 0){this.height-=20;}           
            ctx.fillStyle = "#d2d2d2"; ctx.fillRect((realCanvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b"; ctx.fillRect((realCanvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
            if (this.height-1 < 0 && this.width-1 < 0){//quando il menu e' tutto chiuso:
            	nelMenuCaricaPartita=false;
              if (this.fileLetto){
                stringaLivello=this.fileLetto;
                nuovoLivello();
                gamestate=-1;
              }else{
                gamestate=0;
                objMenuPrincipale.drawMenuPrincipale(false);
              }
            }
        }//fine di if(is.Closing)
        
        async function controllaFile(){ //controlla che il file sia caricato correttamente
            var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
            var stringaCaricaPartita="";
            if(uploadedFile.size > (5*1024*1024)){//controlla la dimensione del file - non deve essere superiore a 1MB
               objAlert = new newAlert("The file size limit is 5MB. Upload a smaller file.",gamestate); gamestate=5;
               return false;
            }
            async function readFileAsText(uploadedFile) {
                let text = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsText(uploadedFile);
                });
                return text;
            }          
            stringaLivelloLetta = await readFileAsText(uploadedFile);
            return stringaLivelloLetta;                          
        }//fine di controllaFile()                
     }//fine di drawMenu()               
	}//fine di menuCaricaPartita

	function newMenuPrincipale(){
		this.width=realCanvasWidth;
		this.height=canvasHeight;
		this.indice=0;
		this.isClosing=false;
    this.sceltaFatta=false;
		this.closingIndex=0;
		this.isGoingToStageSelection=false;
		this.drawMenuPrincipale = function (canInput){
			ctx.clearRect(0,0,realCanvasWidth,canvasHeight);//pulisce tutto
			ctx.fillStyle = "#020219"; ctx.fillRect(0,0,realCanvasWidth+1,canvasHeight+1);//sfondo nero
			ctx.textAlign = "right";
      ctx.font = "small-caps bold 15px Lucida Console";
      disegnaTestoConBordino("by lordf", realCanvasWidth-3, canvasHeight-2,"#d2d2d2bb","#020219");
      ctx.textAlign = "left";
      var spostaX=ctx.measureText("simple").width/2;
      disegnaTestoConBordino(versioneDiGioco, 3, canvasHeight-2,"#d2d2d2bb","#020219");
			ctx.font = "small-caps bold oblique 250px Lucida Console";
			disegnaTestoConBordino("X",spostaX+realCanvasWidth/2,243,"#ff9200","#ffd600");
			ctx.font = "small-caps bold oblique 125px Lucida Console";
			disegnaTestoConBordino("simple",spostaX+realCanvasWidth/2-(ctx.measureText("simple").width),200,"#0001cb","#02b0ef");
      ctx.font = "small-caps bold oblique 40px Lucida Console";
      disegnaTestoConBordino("level editor",spostaX+realCanvasWidth/2-(ctx.measureText("level editor ").width),243,"#ff9200","#ffd600");
			ctx.font = "small-caps bold oblique 75px Lucida Console";
			disegnaTestoConBordino("js",161+spostaX+realCanvasWidth/2,245,"#0001cb","#02b0ef");
			ctx.font = "small-caps bold 30px Lucida Console"; ctx.textAlign = "center";
			if(this.indice==0){disegnaTestoConBordino("new level",realCanvasWidth/2,400,"#ff9200","#f9c065");}else{disegnaTestoConBordino("new level",realCanvasWidth/2,400,"#0001cb","#02b0ef");}      
			if(this.indice==1){disegnaTestoConBordino("load level",realCanvasWidth/2,450,"#ff9200","#f9c065");}else{disegnaTestoConBordino("load level",realCanvasWidth/2,450,"#0001cb","#02b0ef");}
			if(canInput && !this.isClosing){//input dei tasti                           
        //mouse  
        if(checkMouseBox((realCanvasWidth/2-ctx.measureText("new level").width/2),(400-ctx.measureText("O").width),(ctx.measureText("new level").width),(ctx.measureText("O").width))){
          this.indice=0;
          if(mouseClick){this.sceltaFatta=true;}
        }
        if(checkMouseBox((realCanvasWidth/2-ctx.measureText("load level").width/2),(450-ctx.measureText("O").width),(ctx.measureText("load level").width),(ctx.measureText("O").width))){
          this.indice=1;
          if (mouseClick){this.sceltaFatta=true;}
        }
        //tasti
        if(keys[sukey] && !tastoGiaSchiacciato) {
					if(this.indice > 0){
						this.indice--;
					}else{
						this.indice=1;
					}
            	}
            	if(keys[giukey] && !tastoGiaSchiacciato) {
					if(this.indice < 1){
						this.indice++;
					}else{
						this.indice=0;
					}
        }
        if((keys[startkey]||keys[dashkey]) && !tastoGiaSchiacciato) {
	         this.sceltaFatta=true;
        }
        //tasto conferma schiacciato/mouseclick
        if(this.sceltaFatta){
          this.sceltaFatta=false;
					switch(this.indice){
						case 0://nuovo livello 
              this.isClosing=true;             
							break;
						case 1://carica livello da file
              objMenuCaricaPartita=new newMenuCaricaPartita();
              gamestate=6;
							break;											
					}
        }
        //nessun tasto schiacciato                                          
        if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                	tastoGiaSchiacciato=true;
          }else{
                	tastoGiaSchiacciato=false;
        }				
			}
    	if(this.isClosing){//animazione di chiusura del menu
    		ctx.fillStyle = "#000000";
    		this.closingIndex+=13;
    		ctx.fillRect(0,0,realCanvasWidth,this.closingIndex);
    		ctx.fillRect(0,canvasHeight-this.closingIndex,realCanvasWidth,this.closingIndex);
		    ctx.fillRect(0,0,this.closingIndex,canvasHeight);
		    ctx.fillRect(realCanvasWidth-this.closingIndex,0,realCanvasWidth-this.closingIndex,canvasHeight);
    		if ( this.closingIndex > ((realCanvasWidth/2)-1) ){//quando e' tutto chiuso
    			ctx.textAlign = "left";// se no si bugga della roba
          stringaLivello=stringaLivelloDefault;
          nuovoLivello();  
          gamestate=-1;
        }
      }		
    }
	}

  function salvaLivello(){
        //controllo prima che ci sia la starting position
        var xCount=0;
        for(i=0; i<stringaLivello.length;i++){
          if(stringaLivello[i]=="X"){xCount++;}
          if(stringaLivello[i]=="z"){break;}
        }
        if(xCount==0){
          objAlert = new newAlert("you must set the player starting position", gamestate); gamestate=5;
        }else if(xCount>1){
          objAlert = new newAlert("you must set only one player starting position", gamestate); gamestate=5;
        }else{  
          //creo il file simpleXjs.dataDiOggi.savegame da scaricare
          const dataDiOggi=creaData(); //prende la data di oggi
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaLivello));
          element.setAttribute('download', "simpleXjs."+dataDiOggi+".level");
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          document.getElementById('canvasDivId').focus();
          return;
          
          function creaData(){
            var temp = new Date();
            var dateStr = padStr(temp.getFullYear()) +"."+
                          padStr(1 + temp.getMonth()) +"."+
                          padStr(temp.getDate()) +"-"+
                          padStr(temp.getHours()) +"."+
                          padStr(temp.getMinutes());
            return dateStr;
            function padStr(i) {//sistema tipo 01 e 11 per avere tutto su due cifre
                return (i < 10) ? "0" + i : "" + i;
            }        
          }
        }
  }
