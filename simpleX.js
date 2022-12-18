      var versioneDiGioco = "v0.20221218"; //Troppo difficile, usa Joy2Key oppure AntimicroX per i gamepad ;D
      debugMode=false; //you can enable debugMode with the console (press f12 in the browser)
      
      //crea il canvas
      var canvasWidth = 720;
      var canvasHeight = 540;
      if(document.getElementsByTagName('canvas').length == 0) {     //crea il canvas con le variabili che ho creato
          document.body.innerHTML += "".concat("<div class='caricaPartitaDiv' id='caricaPartitaDiv'><input type='file' id='fileCaricaPartita' disabled></div><div class='canvasDiv' id='canvasDivId' tabIndex='1'><canvas id='canvas' width=" , canvasWidth , " height=" , canvasHeight , "></canvas></div>");
      }   var ctx = document.getElementById('canvas').getContext('2d');

      var stringaSalvataggio="";

	//variabili dei tasti - prima o poi faro' un'opzione nel menu per poterli cambiare ingame
      var keys = []; //vettore associativo dei tasti (tiene dentro dei bool)
      var tastoGiaSchiacciato = false;  //mi serve per alcune funzioni tipo selectScreen()
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

      //prototipo del player
      function Player() {
      	this.lifeMax=16;
        for(i=0; i<8; i++){if(heartAcquired[i]){this.lifeMax+=2;}} //aumenta la vita massima di 2 per ogni cuore trovato
        this.life=this.lifeMax;
        this.x= 0;
        this.y= 0;
        this.yv= 0;
        this.xv= 0;
        this.slope= 0;
        this.width= 24;
        this.height= 38;
        this.color1= '#003ef0';
        this.color2= '#3AB7D4';
        this.coloreArmatura='#e1e1e1';
        this.defaultColor1='#003ef0';
        this.defaultColor2='#3AB7D4';
        this.defaultColoreArmatura='#e1e1e1';
        this.damagedColor='#990003';
        this.charge0color='#ffc000';
        this.charge1color='#49ff37';
        this.charge2color='#14dfff';        
        this.charge3color='#ff3788';        
        this.speed= 0.9;
        this.defaultspeed= 0.9;
        this.jumpheight= 11.5;
        this.giasaltato = false;
        this.giasparato = false;
        this.facingRight = true;
        this.isInWater = false;
        this.invulnerability = 0;
        this.canMove = true;
        this.canChangeWeap=true;
        this.carica = 0;
        this.activePower=0;
        this.activeShot=0;
        this.power = [ //vettore dei poteri
        {usageMax: 28, usage:28, color1:'#687968', color2:'#d9b289', nome:'Homing Torpedo'},
        {usageMax: 28, usage:28, color1:'#1a914f', color2:'#60d1aa', nome:'Chameleon Sting'},
        {usageMax: 28, usage:28, color1:'#e13e60', color2:'#a1c1aa', nome:'Rolling Shield'},
        {usageMax: 28, usage:28, color1:'#f14f02', color2:'#f8e179', nome:'Fire Wave'},
        {usageMax: 28, usage:28, color1:'#e40097', color2:'#e191c1', nome:'Storm Tornado'},
        {usageMax: 28, usage:28, color1:'#f8b202', color2:'#a1a1a1', nome:'Electric Spark'},
        {usageMax: 28, usage:28, color1:'#606081', color2:'#81aa89', nome:'Boomerang Cutter'},
        {usageMax: 28, usage:28, color1:'#35e1f8', color2:'#f8e14f', nome:'Shotgun Ice'},
        ];
        this.disegnaPlayer = function (xdisegnata,ydisegnata,larghezza,altezza,dettagli,colore1,colore2,coloreArmatura){
        	  var coloreTemp=colore2;
              ctx.fillStyle = colore1;
              //testa
              ctx.fillRect(xdisegnata+(larghezza/2)-6, ydisegnata-2, 12, 12);
              //gambe
              ctx.fillRect(xdisegnata+(larghezza/2)-8, ydisegnata+(altezza)-18, 6, 18);
              ctx.fillRect(xdisegnata+(larghezza/2)+2, ydisegnata+(altezza)-18, 6, 18);
              //braccia
              if(player.facingRight){
                ctx.fillRect(xdisegnata+2-6, ydisegnata+11, 6, 15);
                ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11, 15, 6);
              }else{
                ctx.fillRect(xdisegnata+2-15, ydisegnata+11, 15, 6);
                ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11, 6, 15);
              }
              if(dettagli){
                if(armaturaAcquired=="true,true,true,true"){
                    colore2=colore1;
                }
                //testa
                if(armaturaAcquired[0]){
                  ctx.fillStyle = coloreArmatura;
                  ctx.fillRect(xdisegnata+(larghezza/2)-6, ydisegnata-2, 12, 3);
                  ctx.fillRect(xdisegnata+(larghezza/2)-6, ydisegnata-2, 2, 9);
                  ctx.fillRect(xdisegnata+(larghezza/2)+6-2, ydisegnata-2, 2, 9);
                }
                //gambe
                ctx.fillStyle = colore2;
                ctx.fillRect(xdisegnata+(larghezza/2)-8, ydisegnata+(altezza)-18, 6, 12);
                ctx.fillRect(xdisegnata+(larghezza/2)+2, ydisegnata+(altezza)-18, 6, 12);
                if(armaturaAcquired[1]){
                  ctx.fillStyle = coloreArmatura;
                  ctx.fillRect(xdisegnata+(larghezza/2)-8, ydisegnata+(altezza)-6, 6, 6);
                  ctx.fillRect(xdisegnata+(larghezza/2)+2, ydisegnata+(altezza)-6, 6, 6);
                  if(armaturaAcquired=="true,true,true,true"){
	                  ctx.fillStyle = coloreTemp;
	                  ctx.fillRect(xdisegnata+(larghezza/2)-8, ydisegnata+(altezza)-8, 6, 2);
	                  ctx.fillRect(xdisegnata+(larghezza/2)+2, ydisegnata+(altezza)-8, 6, 2);
                  }
                }
                //braccia
                ctx.fillStyle = colore2;                
                if(player.facingRight){
                  ctx.fillRect(xdisegnata+2-6, ydisegnata+11, 6, 10);
                  ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11, 10, 6);
                  if(armaturaAcquired[2]){
                    ctx.fillStyle = coloreArmatura;
                    ctx.fillRect(xdisegnata+2-6, ydisegnata+11+10, 6, 5);
                    ctx.fillRect(xdisegnata+(larghezza)-2+15-5, ydisegnata+11, 5, 6);
                    if(armaturaAcquired=="true,true,true,true"){
                    	ctx.fillStyle = coloreTemp;
	                    ctx.fillRect(xdisegnata+2-6, ydisegnata+11+10-2, 6, 2);
	                    ctx.fillRect(xdisegnata+(larghezza)-2+15-5-2, ydisegnata+11, 2, 6);
                    }                    
                  }                  
                }else{
                  ctx.fillRect(xdisegnata+2-10, ydisegnata+11, 10, 6);
                  ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11, 6, 10);
                  if(armaturaAcquired[2]){
                    ctx.fillStyle = coloreArmatura;
                    ctx.fillRect(xdisegnata+2-15, ydisegnata+11, 5, 6);
                    ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11+10, 6, 5);
                    if(armaturaAcquired=="true,true,true,true"){
                    	ctx.fillStyle = coloreTemp;
	                    ctx.fillRect(xdisegnata+2-15+5, ydisegnata+11, 2, 6);
	                    ctx.fillRect(xdisegnata+(larghezza)-2, ydisegnata+11+10-2, 6, 2);
                    }                                        
                  }                     
                }                
                //corpo
                if(armaturaAcquired[3]){
                  ctx.fillStyle = coloreArmatura;
                }else{
                  ctx.fillStyle = colore1;
                }                
              }                
              //corpo
              ctx.beginPath();
      		  ctx.lineWidth = "0";
      		  ctx.moveTo(xdisegnata-3, ydisegnata+10);
      		  ctx.lineTo(xdisegnata+larghezza+3, ydisegnata+10);
              ctx.lineTo(xdisegnata+(larghezza/2), ydisegnata+(altezza)-5);
              ctx.lineTo(xdisegnata-3, ydisegnata+10);
      		  ctx.fill();                         
        }
      }
      
      levelDefeated = [false, false, false, false, false, true, false, true]; //vettore che tiene quanti livelli sono stati superati
      heartAcquired = [false, false, false, false, false, false, false, false]; //vettore che tiene quanti cuori sono stati trovati
      subtank = [//vettore di subtanks - e' scollegata dal player almeno non si resetta al cambio del livello
    		{lifeMax: 20, life:parseInt(0,10), acquired:false},
    		{lifeMax: 20, life:parseInt(0,10), acquired:false},
    		{lifeMax: 20, life:parseInt(0,10), acquired:false},
    		{lifeMax: 20, life:parseInt(0,10), acquired:false},
      ];
      armaturaAcquired = [false, false, false, false];//vettore che tiene quante armatura e' stata trovata - 0:testa, 1:gambe, 2:buster, 3:corpo (quando ci sara': 4:aduchen)
      
  //gamestate - se == -1: stato in gioco
  var gamestate=0;
  //stato 0: nel menu principale - var nelMenuPrincipale=true; 
  //stato 1: selezione del livello - var stageSelection=false; 
  //stato 2: menu di pausa - var menuDiPausa=false; 
  //stato 3: menu opzioni - var nelMenuOpzioni=false; 
  //stato 4: opzioni nelle stage selection - var nelleOpzioniStageSelect=false; 
  //stato 5: c'e' un alert aperto - var alertAperto=false; 
  //stato 6: nel menu carica partita - var nelMenuCaricaPartita=false; 
  var objMenuPrincipale= new newMenuPrincipale(); //inizializza il menu principale
  
	//caricare il livello
	var level = []; //create the level array
	var lvlNumber=1;
      					
    //prendo lvlNumber e carico il livello scelto - sadly non ancora da file perchè siamo a corto di budget
	function leggiLivelloDaFile() {	//funz che carica il livello scelto - i livello sono salvati come stringhe + backgroundImage in base64 alla fine
		switch (lvlNumber) {/*
i livelli sono disposti cosi in realta':1 8
			  						  3     4    
			  						  5     7
										6 2     (mi serve per assegnare correttamente i poteri)*/
										
			case 1: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...a................qqqqqqqqqqqqq...................................................iiiiiiiiiii.................................l...a..⁶.........⁷..qqqqqqqqqqqqqqqq.................................................iiiiiiiiiiiP................................l.X.a...............qqqqqqqqqqqqqqqqq....àààà.ÀÀÀÀ.ÈÈÈÈ.èèèè.........................iiiiiiiiiii.................................l...a.aaa.......aaa.qqqqqqqqqqqqqqqqq....aaaaaaaaaaaaaaaaaaa........................iiiiiiiiiiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiiiigggiiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiiiighgiiiii................................l...a......aaa......qqqqqqqqqqqqqqqqq...............................................iiiigghggiiii................................l...a..⁴.........⁵..qqqqqqqqqqqqqqqqqaaa....4...5...6...7...........................iiiighhhgiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiigghghggiii................................l...a.aaa.......aaa.qqqqqqqqqqqqqqqqq...............................................iiighhghhgiii................................l...a................qqqqqqqrqqqqqqqq...............................................iigghhghhggii................................l...a.................qqqqqrrqqqqqq......aaaaaaaaaaaaaaaaaaa...aaaa...aaa...........iighhhghhhgii................................l...a......aaa.........qqqqrrqqqq...................................................igghhhhhhhggi................................l...a..².........³......qqrrr.......................................................ighhhhghhhhgi................................l...a.....................rrr....kkjkk.....kkjkk.....kkjkk.....kkjkk................ighhhhhhhhhgi................................l...a.aaa.......aaa.......rrr...kkkkkkk...kkkkkkk...kkkkkkk...kkkkkkk.....aaa.......igggggggggggi................................l...a.....................rrr....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii................................l...a.....................rr.....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii..................A.............l...a......aaa............rr.....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii................................l...a..⁰.........¹........rr.....oo1oo.....oo0oo.....oo2oo.....oo3oo....aaa.........i.....i.....i................................l...a....................rrr.....ooooo.....ooooo.....ooooo.....ooooo................i.....i.....i................................l...a.aaa.......aaa......rrr.....ooooo.....ooooo.....ooooo.....ooooo................i.....i.....i.............................aaal........................rrr.....ooooo.....ooooo.....ooooo.....ooooo...................i.....i...................................l........................rrr...akkkkkkkaaakkkkkkkaaakkkkkkkaaakkkkkkka.................i.....i...............................B...l........................rrr..aaakkjkkaaaaakkjkkaaaaakkjkkaaaaakkjkkaaa................i.....i...................................z0.62;0.85;#155261;#155261;#155261;#155261;#155261;#155261;#030101;#ffd300;#610015;#a70002;#1552db;#155261;#155261;#6fcbfc82;#155261;#2c7f00;#612f00;");			
				break;

			case 8: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl..........................................................l..........................................................l..eeeeeee.................................................l..........................................................l............ggggggg.......................................l..........................................................l.....................fffffff..............................l..........................................................l..........................................................l..............................ggggggg.....................l..........................................................l........................................eeeeeee...........l..........................................................l..................................................aaa.....l..........a...............................................l..........a.......h...h..ccccc.ddd.ccc.d.d.c.ddd.c.c.....fl..........a...bbb.h.h.h..c.....d.d.c.c.d.d....d..c.c......l..........a...b.b.h.h.h..c..cc.dd..ccc.d.d.c..d...c.......l..........aaa.bbb..h.h...c...c.d.d.c.c..d..c..d...c.......l.........................cccc.............................l.........................................................gl..........................................................l..........................................................l...........................cccccccccccccccccccccccccccc...l....X.....................................................l....................bb....................................l................bb........................................l............gg............................................l........ff................................................l....ee....................................................z0.25;0.85;#2F4858;#716F71;#81B2C5;#6D98BA;#EACDC2;#ebdb9d;#d6ba54;#490047;;;;;;;;;;data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7AARRHVja3kAAQAEAAAAWgAA/+EAGEV4aWYAAElJKgAIAAAAAAAAAAAAAAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyRDg3NUE1MDZCODExRUFBNTA4RDczQURFRkZCM0VDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyRDg3NUE0MDZCODExRUFBNTA4RDczQURFRkZCM0VDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJGQkVENjIwNkM5QjRFQzI5QzhGNEU0NDkyNjMyOEVGOCIgc3RSZWY6ZG9jdW1lbnRJRD0iRkJFRDYyMDZDOUI0RUMyOUM4RjRFNDQ5MjYzMjhFRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/2wBDAAEBAQEBAQEBAQEBAQEBAQICAQEBAQMCAgICAwMEBAMDAwMEBAYFBAQFBAMDBQcFBQYGBgYGBAUHBwcGBwYGBgb/2wBDAQEBAQEBAQMCAgMGBAMEBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgb/wAARCAIcAtADAREAAhEBAxEB/8QAHwABAAEFAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAYRAAAQMDAwIDBQUEBgQHCgkNAQIDEQAEBQYSIQcxE0FRCCJhcYEJFBUykSNCofAWFzOxwdEkUtLTGCUmYnLh8RknNTZDkpOis8I0R1NVY2Z0goOjskRFRlZnc8PUpbTi/8QAHQEBAAIDAQEBAQAAAAAAAAAAAAECAwUGBAcICf/EAFERAAEDAgUBBQMIBgcECQUAAwEAAhEDBAUGEiExQQcTIlFhcYGRFDJCobHB0fAVI1KS0uEWFzNicoKTNEOi8QgkRFNUY3OD4iU1RbLCo4TT/9oADAMBAAIRAxEAPwD+ApE8n9K7BedVg8xH5fr3oi3Flg8rkMdmMvaWblxjsA2yvMXaVpCWEvOBtsr5B95ZCeOeaodzESi1P8mrCSitLEcjzPIqUVFESiJREoiURKIlESiJREoiURKIlESiJREoiURSBJiY9KIhBBjzoirSjvI/jRFGw/CiKopG3ykDuKIrZ7/9dEUURKIlESiJREoiURKIlESiJREoiURKIlETtRFJmZPc0RRREoiURKIlESiJRFdICgIiB2oiK5SR2J8poiroisGZM+dEQkmJ8u1EUURSTJmI+FEUAxyKIknn4nmiJRFMcTPn2oiiiJRFJAEQZmiKKIlESiJREoiURKIp2ngngHzoir8P4/woikJ2wRzzRFQokweYPrRFTREoiURKIlESiJREoiURKIlESiJRFcQRG0+ZoiuAQfd4PrMfrUEAiFIML7F6J+2v1X6EdEOunQvSFto57SvXTE4a1zdzmdBYu/u7b8OyQvW1NXFxbLdTKwoEIWnggGUiDqbzCbe8vqNw/Vrpa9MOcB4xDtQBh2w2njpsSvTRun0KD6beHRPntPX38L47JBJImCfM1tvpT5+z7l5eioUePnwKlFZoiURKIlESiJREoiURKIlESiJREoiURKIlESiKpJgyaIqe5+JoivIkgCPOhRb7H6YzuUwWoNT2Fmh/CaXXaJzt4bptJYVdLUhgeGpW9e5SFD3AqI5isZeA6EXPqJHBPG7ueYq4KKng88JqUUEDyM/SiKKIlESiJREoiURKIlESiJREoiURKIlESiKTM8iPhFEUURKIlESiJREoiURXESIHYHzNEXQnH4P+iqswdRtjUqc+m2RpH8LdKzYlkqN395/s4DgDfh/n53dqxBx70hFz4P5TEeVZUVCgod/pzRFTREoiURKIlESiJREoikd+RI86IooiURKIlESiJRFM8ER596IpB4/KDHnRFUlW4wQPhRFXwfjBoimiK2sHvJg+U0RUcR35ntRFFESiJREoiURKIlESiJREoiURKIpB48+DxRFcCvOQYTzxRFVwoAx+tEUExHYDzmiKJJSTB78RRFa447z50RKIlESiJREoiURVHbAjv50RU0RKIlESiJREoiURKIlESiJRFeSZEmCR6URQEwZERVS1pMoo2c8k8/CrIqD5x2oiiiJREoiqKSADxzRFTREoiURKIlESiJREoiURVBJMTwDRFUUeh/WiKggjuKIooiURKIlESiJREoiURSDBkURXAR5Ru9PKiJIgmQYPujtRFaoiURKIlESiJREoiURKIlESiJREoiURKIlESiK4I2wex7keVEUo45kz5AHtUEAqRE7r7e6S6B9kDM+yv1z1f1N6ta9037Qmn85phvplonD9Om77H3Vq/dXKb9RuzdoKYZRbrnwydx2gASqtRWr4gzE6bW0g6gQ4vfPiaR80BsHUCefTeV6GsouoEl0P6D8/y9hXxGvgCQJn3vPnzrbN1/S5Xm544UKMDcAPn8KsioJkTA78URUURKIlESiJREoiURKIlESiJREoiURTuPAnt6URATPfv69qIqlH6en/AFURNpkSQZ8poigwCQIj0JoipPHx+VESiJREoiURKIlESiJREoiURKIlESiJREoiURKIpBiflxRFUVniCRxzRFSST3oiiiJREoikRInt50RR8qIgEkD1NEUkCO8maIooiURKIlESiJRFVAAlU89ooiuyIB7A9pqCQEUHukyIjkmpRCDyQTMdqIrRmTPfzoiiiJREoiURKIlESiJREmJ+IoiSeB6dqIlESiJREoiURKIpg+h/SiKKIlESiJREoiURKIlESiJREBIMiiKtJEGYk+ZFEVaU7Z5n6UjdFVRFbX9OO0d6IqBPPaPjREIiiKKIlESiJREoiURKIlESiJREoiURSnvwQI9aIpmCexnvFEUSSIngURRREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIpHPEgT60RD9OPSiIkAnk8DvRFBiTHbyoiURKIlESiKtIBH5oM8CKIs/HXjuNyNhkW2rW4csL1p5ti9tw6ytSFBQS42eFpJHKTwRIqj262wiyc7l3dQZvK5t+1xtg9lsi9cuWOHsE2to0pxZUUMspG1tsEkBI4SOKim0tCLVkx9TxWRFYMyZ7zzREoiURKIlESiJREoiURKIqj+VP1oipoiURKIlESiK4lIiSOZ45oirP+FEQCBEk/M0RUFA8uOPWiKgCZ5EepoienPaiIBJAkCaIooikTzBjj1oiAx2ketEUURKIlEUggQRM/HtRFWFnzHHwoimVRxBntxRFQrk/GOfnRFAJHaiKKIlESiJREoiURKIlEVSRzMgAetEUd+5/U0RRREgnsJoiURTA/1vL0oiAAiSY59KIhA8jP0oiiiJREoiURKIlESiJREoiURKIlESiJREoiURKIlEVW0lMxzNEVNESiJREoiURKIlESiJRFIjzMURR/M0RKIlESiJREoiURSDBB9KIrniDng0RSTxz7s/WiKgdu8czyO1EVKu55n40RRREoiURKIlESiJREoiURTPHMn0FEUURSDHkD86IooiURVJTPMxzxxRFdTwe4Md4HNIkINl9c+zp7GPWD2m9FdcdddOLbAO4XoN01utS6qXldYY3Hurtbe4t2lIbaubppSlTdpI2BZMQlJgkau+xayw6vSZWdpNV2lmxMuAJI2BjjlemhaXFy12gTp3PsXyhe2j1hd3VlcoSm4s7hbL6W3UrAWhRSoBQJBEjuDB7+lbJpkT0/PHovNssJfzHHlVkVEmI8qIh795+M0RRREoiURKIlESiJRE4jtzPeiKRHnP0oirEcEEhI9aIrZ5JPrREoiURKIlESiJREoiURKIpBjyB486IooiURXUCAZHJ9fSiK12oiURVe7ESqiKmiKRHnPbyoikhMcHnzmiIAOJIg+lEVNESiKQCeBRFBEcGiJREoikCZ+AoiiiJREoiURKIlESiJRFUCQPUehoigmTMR8KIooiURKIlESiJREoiURKIpIEAyCT5URRRFO0+hoibT6ecURCCO4oiiJ+lESOJ8qIlESiJRFI+vbyFEQiDwDHlIoiBJPYH9KIoIjiiJREoiURKIlESiJRE/kURKIpIiORz6URRREoilJIIjzoiuCUg+fMzRFu8TqDL4NjMW+LvHLRrP4pVjmG0ISfHtVKStSDuBgShBkQfd71UtaSpBIWnMklUfQVZQra+fpRFboimOJ+NEUURTHoR27miJBiY49aIkECY4NEUURKIlESiJREAngURTBM9hHrREiPT9aIooiURKIlESiJREoiURVBIiTMn8ooiggjv+k0RTtI78elEVaYHnIjvHaiK1RFUEqPMURQASYA5oiRxPlNEUURKIlESiJREoiURKIlEUjj1+EURRREoiURKIlESiJREoiURKIlESiIBPAoimD6HvRECSZgdu9EUURKIlESiKQDB8hE80RSkgGTPHaKIoUZJPr60RRREoiURKIlESiJRFIBPYedEQgjuKIqwQe/5u0xRFSkwqVTx50RU/z2oiURKIlESiJREoiURP8O9EVQBV6c/GiKmiJ6/CiKraeDxz60RVAKSRz3PIFEVfaB+lEUKMDz5HFEVoknvRE2nj4niiKqDChxA+NEVM9/j8KIgMCIB+Yoigmf8ACiJREoiURKIpJnyA+VEUURKInY/KiKojzkkHuY86IoAJ7URCkjkj+NEQJJjjvRFHaiJREoiURKIq+dvMggcCIoiooimSRBM/OiKQZgQJng9qIqaIqpkACOPpRFTEf9tESiJREoiURKIlESiJRFIEmOPrRFJECJEzyKIqeKIp2/FPb1oiRwTI48qIo8poiURKIpkxHkKIgEmKIoPBI9KIrwA2wOSRxz2oitkCTHrxRFJEEmUgjyFEVHeiK6kEd+xHaiKqAOw4oiggCT2n4xRFSQSPzTJ4FEVuiJREoirHKSTHHHNEVFESiJREoiURKIlESiJREoiqJJAB/WiKntREk8/E80RKIlESiJRFM8Qe3lREjiZHymiKKIq0p7zxI4FEUQok8cjvRFUNsSCRHfmiKCABPIntz5URQRztBEHtRFEyIPkOKIhJPeiKJI7GKIpMnk+XE0RRRFUlJV/nRFJG2RB5HFEVO3iQQaIo8poiURKIlESiJREoiURKIlEUgkdqIooiURKIlESiJREoiURVJ7cglPwoipoiURKIlEU8x8JoiiiJREoiURKIlESiJREoikcEH0NEVS4nzk+tEVFESiJREoiURKIlESiJRFUkkAwYoiJHIJkA+c0RSrsO0eoPFEVFEV1B4PaBRFSkyqT5+tQ4gNkouk1NpbLaUvbTHZgWSbi8xFpespscm1dJDFy0HG9ym1EJVtIlBhSTwQDVKdQVBKkggrnQoQEyQSB2rIoVKyZI8h5URUURKIqiSfl5cURU0RKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIgJBkURTPczyaIqtyjykQB6URU+8eOT8KIkH0P6URIkSOTPYURVBB7kxRFIQPWaIrgiPX4zRFQod+T2+lEVO4AAAdvM0RQoknkg/KiKmSOxiiKZJ7kn60RRREoiURKIlESiJRFIEmJiiKKIlESiJREoiURKIlESiJRFXuIAA7x3miKiiJMfWiJREoikgjvRFFESiJREoiURKIlESiJREBgzRFJ79iJ9aIooiURKIlESiJREoiURKIpAEGTB8qIpPdXc/GiKCBAgyT3oiiiK8FDgTJ9aIqQhQPkY9acopV27D1MVAAARUKMntAjipRU0RKIlEUkkiCZoiiiJREoiURKIlESiJREoievEyKIpIgxM/GiKKIlESiJREoiURKIlEUgE8CiKpKZ+I8wfWiKpKUySJ4PnRFVtHPHfvRECQO0/KaIhIA57URQOYEESeAKoXtRXgw8ezThHlDZqzdR6Iq0Wtw4tKQ0tIUoDctBAE+poS6dlBICqTaXClhvwincSNykkJET3P071IDz0Uamq14DxmWXue48I/z51BJA4UyFZW2pCtq0KQSPdC0kGoBJ6KVTsAHMn5VZFQQR5GPKaIooiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoikgAAzJPlRFFESiJREoikevHHrRFFESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiKQQJkTI4oijz59e9EVSu/Hby4oipoiURVBUCIHfuaIq949DRFbUZJNEUURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiKQCe1EVaRtPJAMcc0RXKIoJgTUEgIqkIccUlLaFKJHZIk1XVJgIs5vGXLkFe1oE9lzNSGvd1VDUaFsGsO0mPFecWr0QBt/Wrim0eqxGuQdlnN2Vs0AEMtyP3lJk/rQaQeFjNVxWTt+J+c1Y1N9lXW6U2jmST8DzTU4prdKsu+IEhDKZUo8O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VQQCQBH0qwpuhFNBT80Sp0BEqdDUSryYhEqESiJREifpREjmfOiJBPYTRFMK9D+lW0uKKQhR8o+dWDNkVXh/H+FXAAEInhjzNV0CUU7E/E1cCEVUAdgBRFNESiJREoiURKIlESiJREoiURKIlESiLT1z62CURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlW0uRKaHIlXDAiVdEoiURKIlEUgH0P0FFUuAUkQQJHPmaKrn+SrCBHr8aKhcSoO6eJj1irBpKhVRzM/wq/dhFVTQ1FEAdgBVgAEU1KJRFO0xMGiprapCCRPbnsRRV1mVUEc89vhRNblISnuOamCAqkkqqAOQBI9BQAkqEBkVk0BFTvkGAe3eKaGoqhMcmD8qnQ1EE8yIg1ZFNESiJQCUSpIIRKhEgnsJq2lxCKYPof0oGEoqggnvxV+7CKfDHmasAAinYn4mhAKKdifT+NA0BFVUolESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlEWnrn1sEoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESrBpIRKkMPVEq+hsIlQGAFEq6JREoif4USQFUEEx2g+dFQvCqCDJkwP76KO8KnYkTECfI0VS4lQBHJTzPlVtDlVVbTJIV/Cr6BCJtBieT61YNARVVKJREoqlwCq2q9KKpf5KoI9T5UUa3Kdg8+/rSCVUklTCRAgT8auGOIUKQRJAER8KkM80U1cNARKlFEfm+PpREAAEc/U0RTREoiURKkAlFUEqIkDip0ORNivl9asGeaKQgzzEedWDQCir2J57/CrIgSkTwOe9EUwB2AH0oimiJREoiURKIlESiJREopLSAlFCURKIlESiJREoilIk/DzoiiiKdvYyD9akAlFO2OeDHeDRwLRupDS47K0XWxwXWx6jxBWI1aQ5KtoeOine2YhxsT5+IP86g16UfOCdzVPRdtobp5rTqbk7rD6B09f6pyllYKurqwximy43bhSUFZ3LAjetI791CtvgmDYpmS5NGwpmrUaJIaRMAgTuRtJA968WIXtlhNAVLp4Y0mJM87mNvYV6gPZQ9pAgAdHtXk+kW4H/tq6f+rLP/8A4F/xZ/EtT/S3LUf7S3/i/BSfZO9pEGP6ndXD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");
				break;

			case 4: stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l..j...j.kkk.jjj.k...jj...kkk...j.....kkk...j.......................................................................................................................................................................l..j...j.k.k.j.j.k...j.j..k.k..jj.....k.k..jj.......................................................................................................................................................................l..j.j.j.k.k.jjj.k...j.j..k.k.j.j.iii.k.k.j.j.......................................................................................................................................................................l..j.j.j.k.k.jj..k...j.j..k.k...j.....k.k...j.......................................................................................................................................................................l...j.j..kkk.j.j.kkk.jj...kkk...j.....kkk...j.......................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l.........................................................................................................................................................................................................f.........l.........................................................................................................................................................................................................hi........l.........................................................................................................................................................................................................hii.......l................................................................................................................................................................................................gg.......h.........l...............................................................................................................................................................................................ggg.......h.........l......................d.........................................................dddddddd...dddd................e............ddd....dddd.......................................................gggg.......h.........l.............................................................................................................................................................................................ggggg.......h...g.g.g.l.............................................ffff.......ffff................................................................................g..g..........gg..g.............................gggggg.......h...ggggg.l...............d....deddd............ffff.....ff.........ff..................ddd..............e......dd.....e..e..e.....d...........de.....gg..gg........ggg..gg...........dddd............ggggggg.......h...ggggg.l.X.........................ffff.......ff......ff.........ff...............................................................................ggg..ggg......gggg..ggg....ffff............ffff.gggggggg.......h...gg.gg.l............................ff........ff......ff.........ff..............................................................................gggg..gggg....ggggg..gggg....ff..............ff.ggggggggg......ggg..gg.gg.lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..ccccccccccccccc...ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..ccccccccccccccccccccccccccccccccccccccccccccccccccccclbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc..cbbbbbbbbbbbbbc...cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc..cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbSSbbbbbbbbbbbbbbbSSSbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbSSbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbz0.62;0.85;#00000000;#5d4900;#21ad10;#c34e29;#d6ba54;#005f00;#86310e;#bcbcbc;#fcfcfc;#a60000;#402fd6;;;;;;; data:image/png;base64,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");
				break;
        
		    case 7: stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................l..................................................l..................................................l......................................P...........l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................w...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..............................P...................l..X.................................P.............l..................................................z0.62;0.85;");  
		     	break;
        
			case 5: stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l...................................................................................................................................................................................................mmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l...................................................................................................................................................................................................mmmmmcccccccccccccqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................mmmmcccccccccccccqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................mmmmmqccccqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqccccqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqPqqqqqqqqqqqqqqqqddddddddddddddddddddddd.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddddddddddddddddddddddd.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..........................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................bccccccccccccccccccccccccccccccc..........................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................ccccccccccccccccccccccccccccccccbbbb............................................bbbbbbbbbbbbbbddddd..............ddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................cccccccccccccccccccccccccccccccccccb............................................ccccccccccccccccccc..............ddccccccccccccccccccccc.............................................................................................................................................................l..............................................bbbbbbbbbbbbbbbbbbbbbbbb....................................cccccccccccccccccccccccccccccccccccc................................bbbbbbbbbbbbccccccccccccccccccc..............ddddddddddddddddddddddd.............................................................................................................................................................l..............................................cccccccccccccccccccccccc....................................cccccccccccccccccccccccccccccccccccc................................ccccccccccccccccccccccccccccccc..............ddddddddddddddddddddddd.............................................................................................................................................................l.X................................bbbbbbbbbbbbccccccccccccccccccccccccbbbb................................cccccccccccccccccccccccccccccccccccc....................bbbbbbbbbbbbcccccccccccccccccccccccccccccccdd............ddccccccccccccccccccccc.............................................................................................................................................................l..................................cccccccccccccccccccccccccccccccccccccccc................................cccccccccccccccccccccccccccccccccccc....................ccccccccccccccccccccccccccccccccccccccccccccc............ddccccccccccccccccccccc.............................................................................................................................................................lbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccbbbb....................bbbbbbbbccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc....................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............ccccccccccccccccccccd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd..............cccccccccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd...................cccccccccccccdd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd..................cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd.................cccccccccccccdd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd................cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd...............cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..................................................................................ccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..................................................................................ccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccc.......................qqqccddcccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l..........................................................................................................................................................................................................cccccccccccd......................qqqccddcccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l..........................................................................................................................................................................................................ccccccccccccd.....................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccd....................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccd...................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccccd..................qqqcc..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccd.................qqqcc..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qqrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccccccdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................z0.62;0.85;#00000000;#dee9ff;#ccce7c;#8fdada;;;;;;;;#aa9f11;;;#81790c;#413003;#123551; data:image/png;base64,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");
				break; //questo diventera' il case 8

			case 3: stringToLevel("tttttttttttttttttttttttttttttttttttl..................................l.aaa.bbb.ccc.dd..eee.fff.gggg.h.h.l.a.a.b.b.c...d.d.e...f...g....h.h.l.aaa.bb..c.P.d.d.eee.fff.g.gg.hhh.l.a.a.b.b.c...d.d.e...f...g..g.h.h.l.a.a.bbb.ccc.dd..eee.f...ggg..h.h.l..................................l..................................l...aaaaaaaaaaaaaaaaaaaaaaaaaaaa...l..................................l..................................l.i.jjjjj.k.k......................l.....j...k.k......................l.i...j...kk.......................l.i.j.j...k.k......................l.i.jjj...k.k......................l..................................l..................................l..................................l...m...m.n...n.ooo.ppp.qqqq.rrr...l...mm.mm.nn..n.o.o.p.p.q..q.r.r...l...m.m.m.n.n.n.o.o.ppp.q..q.rrr...l.X.m...m.n..nn.o.o.p...q.qq.rr....l...m...m.n...n.ooo.p...qqqq.r.r...l..................................z0.62;0.85;#000000;#dee9ff;#ccce7c;#8fdada;#d7dc8f;;;;;;;#aa9f11;;;#81790c;#413003;#123551; data:image/png;base64,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");
				break;

			case 2: stringToLevel("tttttttttttttttttttttttttttttttttttl...a.....a...a.....a...a.....a...al.P.a.....a.P.a.....a.P.a.....a.P.al...a.....a...a.....a...a.....a...alaaaa.....aaaaa.....aaaaa.....aaaaal.......aaaaa.........aaaaa.......al.......a...a.........a...a.......al.......a.P.a.........a.P.a.......al.......a...a.........a...a.......al.......aaaaa.........aaaaa.......al.............aaaaaaa.............alaaaa..aaaaa..a.....a..aaaaa..aaaaal...a..a...a..a.....a..a...a..a...al.P.a..a.P.a..a..X..a..a.P.a..a.P.al...a..a...a..a..a..a..a...a..a...alaaaa..aaaaa..a..a..a..aaaaa..aaaaal.............aaaaaaa.............al.......aaaaa.........aaaaa.......al.......a...a.........a...a.......al.......a.P.a.........a.P.a.......al.......a...a.........a...a.......al.......aaaaa.........aaaaa.......alaaaa.....aaaaa.....aaaaa.....aaaaal...a.....a...a.....a...a.....a...al.P.a.....a.P.a.....a.P.a.....a.P.al...a.....a...a.....a...a.....a...az0.62;0.85;");
				break;				
				
			default:
        objAlert = new newAlert("Errore nel caricamento del livello - carico il level 1",gamestate); gamestate=5; 
				lvlNumber=1;
				leggiLivelloDaFile();
		}
		return
	}

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
                    
		        case 'A': // A indica un ape (bomb bee)
		        	var entita = new newBombBee();
		         	entita.x= (i%widthTot)*20;
		        	entita.y= (heightTot-1)*20-2;
					entity.push(entita);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
					break;                    					
		          
		        case 'S': //S sono le spike (le spine che instaKillano)
		          var spike= new newSpike();
		          spike.x= (i%widthTot)*20;
		          spike.y= (heightTot-1)*20; 
				  entity.push(spike);
				  checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
		          break;

		        case '0': case '1': case '2': case '3': //sono i pezzi di armatura
			        var armatura = new newPickUp_Armor(parseInt(lvlString[i],10));
				    armatura.x= (i%widthTot)*20;
				    armatura.y= (heightTot-1)*20; 
					entity.push(armatura);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;

		        case '4': case '5': case '6': case '7': //sono le subtank
			        var subtankLetta = new newPickUp_Subtank(parseInt(lvlString[i],10)-4);
				    subtankLetta.x= (i%widthTot)*20;
				    subtankLetta.y= (heightTot-1)*20; 
					entity.push(subtankLetta);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;

				case '⁰': case '¹': case '²': case '³': case '⁴': case '⁵': case '⁶': case '⁷': //sono i cuori che aumentano la vita
					//caratteri per copiare/incollare:  ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
			        var cuore = new newPickUp_Cuore(lvlString[i]);
				    cuore.x= (i%widthTot)*20;
				    cuore.y= (heightTot-1)*20-1; 
					entity.push(cuore);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;				    

				case 'à'://small life recovery
			        var lifeRec = new newPickUp_LifeEnergy(2);
			        lifeRec.width=10;
			        lifeRec.height=10;
				    lifeRec.x= (i%widthTot)*20+(10-lifeRec.width/2);
				    lifeRec.y= (heightTot-1)*20+1; 
					entity.push(lifeRec);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;

				case 'À'://big life recovery
			        var lifeRec = new newPickUp_LifeEnergy(8);
			        lifeRec.width=18;
			        lifeRec.height=18;			        
				    lifeRec.x= (i%widthTot)*20+(10-lifeRec.width/2);
				    lifeRec.y= (heightTot-1)*20+1; 
					entity.push(lifeRec);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;

				case 'è'://small weapon recovery
			        var weaponRec = new newPickUp_WeaponEnergy(2);
			        weaponRec.width=10;
			        weaponRec.height=10;			        
				    weaponRec.x= (i%widthTot)*20+(10-weaponRec.width/2);
				    weaponRec.y= (heightTot-1)*20+1; 
					entity.push(weaponRec);
					checkBackAndForGround(background,foreground,lvlString[i-1]); //se il blocco prima era un background o foreground lo carica sotto il player
				    break;
				case 'È'://big weapon recovery
			        var weaponRec = new newPickUp_WeaponEnergy(8);
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
        if (level.maxWidth < canvas.width){ //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
           		canvasWidth=level.maxWidth;
        }else{
           		canvasWidth=canvas.width;
        }
        if (level.maxHeight < canvas.height){ //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
           		canvasHeight=level.maxHeight;
        }else{
           		canvasHeight=canvas.height;
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
		var ground = {x: 0, width: level.maxWidth, height: (20)+1, color: level.color[0]};  ground['y']=level.maxHeight-ground.height;
    	var ceiling = {x: 0, y: 0, width: level.maxWidth, height: (20)+1, color: level.color[0]};        	            
    	var leftWall = {x: 0, y: 0, width: (20)+1, height: level.maxHeight, color: level.color[0]};
    	var rightWall = {y: 0, width: (20)+1, height: level.maxHeight, color: level.color[0]}; rightWall['x']= level.maxWidth-rightWall.width;	            				
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

      //adesso inizio i prototipi delle entita'
      
      function newSparo(larghezza,altezza) {//lo sparo creato dal player
        this.life= 1;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+6;
        }else{
         this.x= player.x-6-larghezza; 
        }
        this.xv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+9;
        this.color=player.charge0color;
        this.speed= 3.9;
        this.perforation=false;
        this.canPassWall=false;
        this.hasPhysics=true;
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
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.life=-1;
	            }
	          }
          }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}          
          }
          //collisione dello sparo con altre entita'
          if(this.type!="enemyShot"){
	          for (i=0; i<entity.length;i++){
	            if (!(i == indiceDiQuestaEntity)){
	              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
	                if(entity[i].getHit){entity[i].getHit("sparo",this.damage);}
	                if (!(entity[i].life < 1 && this.perforation)){
	                  this.life=-1;
	                }
	              }
	            }
	          }
          }
          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-1;
            this.active=false;
          }
        }
      }

      function newSparoCharge3(xPassata,yPassata,larghezza,altezza,indicePassato,faceRight,goUp) {//lo sparo creato dal player - carica 3
      	this.index=indicePassato;
      	this.numeroFigli=5;
        this.life= 1;
        this.type= "sparoDelPlayer";
        this.damage= 4;
        this.facingRight=faceRight;
        this.x=xPassata;       
        this.startingX=this.x;
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=yPassata;
        this.startingY=yPassata;
        this.minY=this.startingY-(this.height);
        this.maxY=this.startingY+(this.height);
        this.startingDirection=goUp;
        this.goingUp=goUp;
        this.color=player.charge0color;
        this.speed=2.5;
        this.ySpeed=2.5;//velocita con cui va su e giu
        this.perforation=true;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
	        //movimento x dello sparo
	        if (this.facingRight){
	          this.xv -= this.speed;
	        }else{
	          this.xv += this.speed;
	        }
	        this.xv *= level.friction;
	        this.x += -this.xv; 
			//movimento y dello sparo
	        if (this.goingUp){
	          this.yv -= this.ySpeed;
	          if(this.y < this.minY){
	          	this.goingUp=false;
	          }
	        }else{
	          this.yv += this.ySpeed;
	          if(this.y > this.maxY){
	          	this.goingUp=true;
	          }	          
	        }
	        this.yv *= level.friction;
	        this.y += this.yv;
	        //creazione degli spari figli
	        if(this.index<this.numeroFigli-1){
				if(creaFiglio(this.startingX,this.facingRight,this.x,this.width,this.startingY,this.height,this.index,this.color,this.startingDirection)){
					this.index=this.numeroFigli;
				}
	        }
	        //collisione dello sparo con level
	        if(!this.canPassWall){
	         for (i=0; i<level.length;i++){
	           if (collisionBetween(this,level[i])){
	             this.life=-1;
	           }
	         }
	        }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}
	        }
	        //collisione dello sparo con altre entita'
	        for (i=0; i<entity.length;i++){
	          if (!(i == indiceDiQuestaEntity)){
	            if ( entity[i].life > 0 && !(this.type==entity[i].type || entity[i].type=="pickup" || entity[i].type=="ostacolo" || entity[i].type=="piattaforma" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
	              if(entity[i].getHit){entity[i].getHit("sparoCh3",this.damage);}
	              if (!(entity[i].life < 1 && this.perforation)){
	                this.life=-1;
	              }
	            }
	          }
	        }
          //non c'e' nessun activeShot-- perche' il counter lo altera lo sparoInvisibile
                    
			function creaFiglio(startingX,facingRight,x,width,startingY,height,index,color,startingDirection){
				var xMax=startingX;		
				if(facingRight){
					if(((x)-(width))>xMax){
						var sparoFiglio = new newSparoCharge3((x-width),startingY,width,height,index+1,facingRight,startingDirection);
		                sparoFiglio.color= color;
		                entity.push(sparoFiglio);						
						return true;
					}
				}else{
					if(x+(width)<(xMax)){
						var sparoFiglio = new newSparoCharge3((x+(width)),startingY,width,height,index+1,facingRight,startingDirection);
		                sparoFiglio.color= color;
		                entity.push(sparoFiglio);						
						return true;
					}	
				}
				return false;
			}//fine di crea figlio
	      }//fine di this.physics      
      }

      function newHomingMissle(larghezza,altezza,color1Pass,color2Pass,pesoShot) {//lo sparo creato dal player
        this.life= 1;
        this.active=true;
        this.activeShotCounter=pesoShot;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        if(player.facingRight){
         this.x= player.x+player.width+6;
         this.xv=3;
        }else{
         this.x= player.x-6-larghezza; 
         this.xv=-3;
        }
        this.speed= 1.3;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+9;
        this.targetIndex=-1;
        this.color1=color1Pass;
        this.color2=color2Pass;
        this.perforation=false;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle=this.color1;
          ctx.beginPath();
	      ctx.lineWidth = 1;
	      var larghezzaMissile=this.width/2;
		  var velMin=3;
	      if(this.xv<velMin && this.xv>-velMin && this.yv>velMin){//dritto verso l'alto
			  baseMissileVerticale( (xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
		      ctx.fillStyle=this.color2;
		      ctx.fillRect(xdisegnata+this.width/2+larghezzaMissile/2-1, ydisegnata+larghezzaMissile+2, 2, larghezzaMissile-1);
		      ctx.fillRect(xdisegnata+this.width/2-larghezzaMissile/2-1, ydisegnata+larghezzaMissile+2, 2, larghezzaMissile-1);			
	      }else if(this.xv<velMin && this.xv>-velMin && this.yv<velMin){//dritto verso il basso
      		  baseMissileVerticale( (xdisegnata), (ydisegnata+this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
		      ctx.fillStyle=this.color2;
		      ctx.fillRect(xdisegnata+this.width/2+larghezzaMissile/2-1, ydisegnata-1, 2, larghezzaMissile-1);
		      ctx.fillRect(xdisegnata+this.width/2-larghezzaMissile/2-1, ydisegnata-1, 2, larghezzaMissile-1);      		  
	      }else if(this.yv<velMin && this.yv>-velMin && this.xv>velMin){//dritto a destra
     		  baseMissileLaterale( (xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile), this.color2);
		      ctx.fillStyle=this.color2;
		      ctx.fillRect(xdisegnata-1, ydisegnata+this.height/2-larghezzaMissile/2-1, larghezzaMissile-1, 2);
		      ctx.fillRect(xdisegnata-1, ydisegnata+this.height/2+larghezzaMissile/2-1, larghezzaMissile-1, 2);	     		  
	      }else if(this.yv<velMin && this.yv>-velMin && this.xv<velMin){//dritto a sinistra
			  baseMissileLaterale( (xdisegnata+this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
		      ctx.fillStyle=this.color2;
		      ctx.fillRect(xdisegnata+this.width-larghezzaMissile+2, ydisegnata+this.height/2-larghezzaMissile/2-1, larghezzaMissile-1, 2);
		      ctx.fillRect(xdisegnata+this.width-larghezzaMissile+2, ydisegnata+this.height/2+larghezzaMissile/2-1, larghezzaMissile-1, 2);			  
	      }else if(this.xv>velMin && this.yv>velMin){//verso l'alto e destra
	       	  baseMissileDiagonale( (xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
	          ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle=this.color2;
		      ctx.moveTo(xdisegnata-1, ydisegnata+this.height-larghezzaMissile+1);
		      ctx.lineTo(xdisegnata+larghezzaMissile-1, ydisegnata+this.height-larghezzaMissile-larghezzaMissile/2-2);
		      ctx.moveTo(xdisegnata+larghezzaMissile-1, ydisegnata+this.height+1);
		      ctx.lineTo(xdisegnata+larghezzaMissile*2-1, ydisegnata+this.height-larghezzaMissile/2-2); 
		      ctx.stroke();	       	  
	      }else if(this.xv<velMin && this.yv>velMin){//verso l'alto e sinistra
			  baseMissileDiagonale( (xdisegnata+this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
	          ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle=this.color2;
		      ctx.moveTo(xdisegnata+this.width-larghezzaMissile+1, ydisegnata+this.height+1);
		      ctx.lineTo(xdisegnata+this.width-larghezzaMissile-larghezzaMissile/2-1, ydisegnata+this.height-larghezzaMissile/2-1);
		      ctx.moveTo(xdisegnata+this.width+1, ydisegnata+this.height-larghezzaMissile+1);
		      ctx.lineTo(xdisegnata+this.width-larghezzaMissile/2-1, ydisegnata+this.height-larghezzaMissile-larghezzaMissile/2-1);
		      ctx.stroke();			  
	      }else if(this.xv<velMin && this.yv<velMin){//verso il basso e sinistra
			  baseMissileDiagonale( (xdisegnata+this.width), (ydisegnata+this.height), (-this.width), (-this.height), (-larghezzaMissile), (-larghezzaMissile));
	          ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle=this.color2;
		      ctx.moveTo(xdisegnata+this.width-larghezzaMissile+1, ydisegnata-1);
		      ctx.lineTo(xdisegnata+this.width-larghezzaMissile-larghezzaMissile/2-1, ydisegnata+larghezzaMissile-2);
		      ctx.moveTo(xdisegnata+this.width+1, ydisegnata+larghezzaMissile-1);
		      ctx.lineTo(xdisegnata+this.width-larghezzaMissile/2-1, ydisegnata+larghezzaMissile+larghezzaMissile/2+1);
		      ctx.stroke();			  
	      }else if(this.xv>velMin && this.yv<velMin){//verso il basso e destra
			  baseMissileDiagonale( (xdisegnata), (ydisegnata+this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
	          ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle=this.color2;
		      ctx.moveTo(xdisegnata-1, ydisegnata+this.height-larghezzaMissile-1);
		      ctx.lineTo(xdisegnata+larghezzaMissile/2+1, ydisegnata+this.height-larghezzaMissile+larghezzaMissile/2+1);
		      ctx.moveTo(xdisegnata+larghezzaMissile-1, ydisegnata-1);
		      ctx.lineTo(xdisegnata+larghezzaMissile+larghezzaMissile/2+1, ydisegnata+larghezzaMissile/2+1);
		      ctx.stroke();			  
	      }
	      function baseMissileVerticale(xdisegnata,ydisegnata,width,height,larghezzaMissile,altezzaMissile){
		      ctx.moveTo(xdisegnata+width/2, ydisegnata);
		      ctx.lineTo(xdisegnata+width/2+larghezzaMissile/2, ydisegnata+altezzaMissile);
		      ctx.lineTo(xdisegnata+width/2+larghezzaMissile/2, ydisegnata+height);
		      ctx.lineTo(xdisegnata+width/2-larghezzaMissile/2, ydisegnata+height);
		      ctx.lineTo(xdisegnata+width/2-larghezzaMissile/2, ydisegnata+altezzaMissile);
		      ctx.lineTo(xdisegnata+width/2, ydisegnata);
		      ctx.fill();     	
	      }
	      function baseMissileLaterale(xdisegnata,ydisegnata,width,height,larghezzaMissile,altezzaMissile){
		      ctx.moveTo(xdisegnata+width, ydisegnata+height/2);
		      ctx.lineTo(xdisegnata+width-larghezzaMissile, ydisegnata+height/2+altezzaMissile/2);
		      ctx.lineTo(xdisegnata, ydisegnata+height/2+altezzaMissile/2);
		      ctx.lineTo(xdisegnata, ydisegnata+height/2-altezzaMissile/2);
		      ctx.lineTo(xdisegnata+width-larghezzaMissile, ydisegnata+height/2-altezzaMissile/2);
		      ctx.lineTo(xdisegnata+width, ydisegnata+height/2);
		      ctx.fill();     	
	      }
	      function baseMissileDiagonale(xdisegnata,ydisegnata,width,height,larghezzaMissile,altezzaMissile){
		      ctx.moveTo(xdisegnata+width, ydisegnata);
		      ctx.lineTo(xdisegnata+width, ydisegnata+altezzaMissile);
		      ctx.lineTo(xdisegnata+larghezzaMissile, ydisegnata+height);
		      ctx.lineTo(xdisegnata, ydisegnata+height-altezzaMissile);
		      ctx.lineTo(xdisegnata+width-larghezzaMissile, ydisegnata);
		      ctx.lineTo(xdisegnata+width, ydisegnata);
		      ctx.fill();	      	
	      }	                
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if(this.targetIndex==-1){
          	this.targetIndex=findTarget(this.x+this.width/2,this.y+this.height/2);
          	if(this.xv<0){this.xv-=this.speed}else{this.xv+=this.speed}
          }else{
          	if(entity[this.targetIndex].life>0){//insegue il target
	          	if(this.x<entity[this.targetIndex].x+(entity[this.targetIndex].width/2)){
	          		this.xv += this.speed;
	          	}else{
	          		this.xv -= this.speed;	
	          	}
	          	if(this.y<entity[this.targetIndex].y+(entity[this.targetIndex].height/2)){
	          		this.yv -= this.speed/(1.5);
	          	}else{
	          		this.yv += this.speed/(1.5);	
	          	}          		
          	}else{
          		this.targetIndex=-1;
          	}
          }
          this.xv *= level.friction;
          this.x += this.xv;
          this.yv *= level.friction;
          this.y += -this.yv;             
          //collisione dello sparo con level
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.life=-1;
	            }
	          }
          }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}          
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("missle",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
            }
          }          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-this.activeShotCounter;
            this.active=false;
          }
          function findTarget(x,y){
          	var closestEntityX=999999999999; 
          	var closestEntityY=999999999999; 
          	var closestEntityIndex=-1;
          	for (i=0; i<entity.length;i++){
				if(entity[i].life > 0){
					if(entity[i].type=="mostro" || entity[i].type=="monster"){
						if(((entity[i].x<x && entity[i].x>x-canvasWidth/1.25)||(entity[i].x>x && entity[i].x<x+canvasWidth/1.25))&&((entity[i].y<y && entity[i].y>y-canvasHeight/1.25)||(entity[i].y>y && entity[i].y<y+canvasHeight/1.25))){//se e' circa nello schermo
							var entX=entity[i].x+entity[i].width/2;
							var entY=entity[i].y+entity[i].height/2;
							prevDistanceX=x-closestEntityX; if(prevDistanceX<0){prevDistanceX=-1*prevDistanceX;}
							prevDistanceY=y-closestEntityY; if(prevDistanceY<0){prevDistanceY=-1*prevDistanceY;}
							distanceX=x-entX; if(distanceX<0){distanceX=-1*distanceX;}
							distanceY=y-entY; if(distanceY<0){distanceY=-1*distanceY;}
							if((distanceX+distanceY)<(prevDistanceX+prevDistanceY)){
								closestEntityX=entX;
								closestEntityY=entY;
								closestEntityIndex=i;		
							}
						}
					}
				}
          	}
          	return closestEntityIndex;
          }//fine findTarget
        }//fine homingMissle physics
      }//fine newHomingMissle      

      function newChameleonSting(larghezza,altezza) {//lo sparo creato dal player - cham sting main
        this.life= 1;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+17;
        }else{
         this.x= player.x-17-larghezza; 
        }
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+7;
        this.figliY=player.y+14;
        this.color="#b0f000";
        this.timer=0;
        this.growthSpeed=0.1;
        this.hasPhysics=true;
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
        	this.timer++;
        	this.width+=this.growthSpeed;
        	this.x-=this.growthSpeed/2;
        	this.height+=this.growthSpeed;
        	this.y-=this.growthSpeed/2;
	        //collisione dello sparo con altre entita'
	        for (i=0; i<entity.length;i++){
	          if (!(i == indiceDiQuestaEntity)){
	            if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
	              if(entity[i].getHit){entity[i].getHit("chameleonCh1",this.damage);}
	              if (!(entity[i].life < 1)){
	                this.life=-1;
	              }
	            }
	          }
	        }
        	if(this.timer>10 && this.life>0){//crea figli
				var sparoFiglio = new newChameleonSting_Figli(this.x,this.figliY,30,6,4,0,this.facingRight,this.color);
	            entity.push(sparoFiglio);
				var sparoFiglio = new newChameleonSting_Figli(this.x,this.figliY-5,30,6,4,1,this.facingRight,this.color);
	            entity.push(sparoFiglio);
				var sparoFiglio = new newChameleonSting_Figli(this.x,this.figliY-1,30,6,4,-1,this.facingRight,this.color);
	            entity.push(sparoFiglio);	            	            		
	        	this.life=-1;	
        	}	                	
        }//fine physics
      }//fine cham sting main
      function newChameleonSting_Figli(xPass,yPass,larghezza,altezza,xSpeedPass,ySpeedPass,facingRightPass,colorPass) {//figli di cham sting
        this.life= 1;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=facingRightPass;
        this.x=xPass;
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=yPass;
        this.color=colorPass;
        this.xSpeed= xSpeedPass;
        this.ySpeed= ySpeedPass;
        this.perforation=false;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.strokeStyle=this.color;
          ctx.beginPath();
          var larghezzaLinea=6;
	      ctx.lineWidth = larghezzaLinea;
	      if(this.ySpeed==0){//dritto
		      ctx.moveTo(xdisegnata, ydisegnata+this.height/2-larghezzaLinea/2);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2-larghezzaLinea/2);
		  }else if((this.ySpeed>0.1 && this.facingRight)||(this.ySpeed<-0.1 && !this.facingRight)){
		      ctx.moveTo(xdisegnata, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata);		  	
		  }else if((this.ySpeed<-0.1 && this.facingRight)||(this.ySpeed>0.1 && !this.facingRight)){
		      ctx.moveTo(xdisegnata, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height);		  	
		  }
		  ctx.stroke();
		}        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if (this.facingRight){
            this.xv -= this.xSpeed;
          }else{
            this.xv += this.xSpeed;
          }
          this.xv *= level.friction;
          this.x += -this.xv;    
          this.yv -= this.ySpeed;
          this.yv *= level.friction;
          this.y += this.yv;          
          //collisione dello sparo con level
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.life=-1;
	            }
	          }
          }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}          
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("chameleonCh1",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
            }
          }
		  //disattiva counter dei colpi          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-1;
            this.active=false;
          }
        }
      }      

      function newRollingShield(larghezza,altezza) {//lo sparo creato dal player
        this.life= 1;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+6;
         this.xv= -10;
        }else{
         this.x= player.x-6-larghezza; 
         this.xv= 10;
        }
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y;
        this.color="#2860b8";
        this.speed= 2;
        this.rotation=0;
        this.isInWater=false;
        this.canBounce=true;
        this.perforation=false;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle=this.color;
          ctx.beginPath();
	      ctx.lineWidth = 1;
	      if(this.rotation<5){
	      	  var lungLato = this.width/2;
		      ctx.moveTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2-lungLato/2);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2+lungLato/2);
		      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2+lungLato/2);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2-lungLato/2);
		      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
		      ctx.fill();
	      }else{
		      ctx.moveTo(xdisegnata+this.width/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width-this.width/4, ydisegnata+this.height/8);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2);
		      ctx.lineTo(xdisegnata+this.width-this.width/4, ydisegnata+this.height-this.height/8);
		      ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width/4, ydisegnata+this.height-this.height/8);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2);
		      ctx.lineTo(xdisegnata+this.width/4, ydisegnata+this.height/8);
		      ctx.lineTo(xdisegnata+this.width/2, ydisegnata);
		      ctx.fill();	      	      	      	
	      }
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          this.rotation++; if(this.rotation>10){this.rotation=0;} //animazione rotazione
          //movimento dello sparo
          if (this.facingRight){
            this.xv -= this.speed;
          }else{
            this.xv += this.speed;
          }
          this.xv *= level.friction;
          this.x += -this.xv;
	        var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
	            if (!this.isInWater){
	                this.isInWater = true;
	                this.yv = 0;
	            }
	            gravityApplicata = level.gravityWater;
	            frizioneApplicata = level.frictionWater;
	        }else{
	            this.isInWater = false;
	            gravityApplicata = level.gravity;
	            frizioneApplicata = level.friction;            
	        }      
	        this.yv += gravityApplicata;//get level gravity
	        if(this.yv>19){this.yv=19;}//limita la gravita'
	        this.y += this.yv;//apply gravity

	        for(i=0; i<level.length; i++) {// collision with level
	          if(((this.y+this.height)>level[i].y)&&((this.y+this.height)<level[i].y+19)&&(collisionBetween(this,level[i]))){//collison verso il basso
	            this.y=level[i].y-this.height-1;
	            this.yv=this.yv/2;
	          }
	          if((((this.x+this.width)>level[i].x)||(this.x<(level[i].x+level[i].width)))&&(collisionBetween(this,level[i]))){//collsion laterale
	          	if(this.canBounce){
	          		this.canBounce=false;
	          		if(this.facingRight){
	          			this.x=level[i].x-this.width-1;	
	          		}else{
	          			this.x=level[i].x+level[i].width+1;
	          		}
	          		this.xv=0;
	          		this.facingRight=!this.facingRight;	
	          	}else{
	          		this.life=-1;	
	          	}
	          }	
	        }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("shieldCh1",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
            }
          }          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;
          }
        }//fine physics
      }//fine rolling shield

      function newRollingShieldCharge3(larghezza,altezza) {//lo sparo creato dal player
        this.life= 2;
        this.duration=700;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.width= larghezza;
        this.height= altezza;
        this.x=player.x+player.width/2-this.width/2;
        this.y=player.y+player.height/2-this.height/2;
        this.color="#2860b899";
        this.rotation=0;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle=this.color;
          ctx.beginPath();
	      ctx.lineWidth = 1;
	      if(this.rotation<5){
	      	  var lungLato = this.width/2;
		      ctx.moveTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2-lungLato/2);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2+lungLato/2);
		      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2+lungLato/2);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2-lungLato/2);
		      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
		      ctx.fill();
	      }else{
		      ctx.moveTo(xdisegnata+this.width/2, ydisegnata);
		      ctx.lineTo(xdisegnata+this.width-this.width/4, ydisegnata+this.height/8);
		      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2);
		      ctx.lineTo(xdisegnata+this.width-this.width/4, ydisegnata+this.height-this.height/8);
		      ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height);
		      ctx.lineTo(xdisegnata+this.width/4, ydisegnata+this.height-this.height/8);
		      ctx.lineTo(xdisegnata, ydisegnata+this.height/2);
		      ctx.lineTo(xdisegnata+this.width/4, ydisegnata+this.height/8);
		      ctx.lineTo(xdisegnata+this.width/2, ydisegnata);
		      ctx.fill();	      	      	      	
	      }
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          this.rotation++; if(this.rotation>10){this.rotation=0;} //animazione rotazione
          //movimento dello sparo
          this.x=player.x+player.width/2-this.width/2;
          this.y=player.y+player.height/2-this.height/2;
        
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" )  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if (!(entity[i].life < this.life)){
                  this.life=-1;
                }
                if(entity[i].getHit){entity[i].getHit("shieldCh3",this.damage);}
              }
            }
          }
          //duration
          this.duration--;
          if(this.duration<0){this.life=-1;}
          //disattivazione sparo          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;
            player.canChangeWeap=true;
          }
        }//fine physics
      }//fine rolling shield charge3

      function newFireWave(larghezza,altezza) {//lo sparo creato dal player
      	this.timer=0;
        this.life= 1;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        if(player.facingRight){
         this.x= player.x+player.width+14;
        }else{
         this.x= player.x-8-larghezza; 
        }
        this.y=player.y+9;
        this.width= larghezza;
        this.height= altezza;
        this.color1=player.power[3].color1;
        this.color2=player.power[3].color2;
        this.inWater=false;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          var numeroFiamme=Math.round((this.width/10));
          var fiammeWidth=(this.width/numeroFiamme)-1;
          for(i=0;i<numeroFiamme;i++){
          	ctx.fillStyle=this.color1;
          	ctx.fillRect(xdisegnata+1+i*fiammeWidth, ydisegnata, fiammeWidth-1, this.height);
          	disegnaFiammella(xdisegnata+1+i*fiammeWidth, ydisegnata,fiammeWidth-1,this.color1);	
          	ctx.fillStyle=this.color2;
          	ctx.fillRect(xdisegnata+3+i*fiammeWidth, ydisegnata+2, fiammeWidth-5, this.height-4);
          	disegnaFiammella(xdisegnata+3+i*fiammeWidth, ydisegnata+2,fiammeWidth-5,this.color2);	
          }         
          function disegnaFiammella(x,y,fiammeWidth,color){
	          ctx.fillStyle=color;
	          ctx.beginPath();
		      ctx.lineWidth = 1;
		      var lato=fiammeWidth/6;
		      ctx.moveTo(x, y+1);
		      ctx.lineTo(x+lato, y-lato*2);
		      ctx.lineTo(x+lato*2, y+1);
		      ctx.lineTo(x+lato*4, y-lato*4);
		      ctx.lineTo(x+lato*6, y+1);
		      ctx.lineTo(x, y+1);
		      ctx.fill();          	
          }          
        }       
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
        //movimento(insieme al player)
	      if(player.facingRight){
	       this.x= player.x+player.width+14;
	      }else{
	       this.x= player.x-8-larghezza; 
	      }
	      this.y=player.y+9;
        if (this.y > level.waterLevel){  //determina se sei in acqua o no
          this.inWater=true;
        }          
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("fireCh1",this.damage);}
              }
            }
          }
          if(keys[sparokey] && !this.inWater &&player.power[3].usage>0 && player.activePower==4 && (player.carica<150 || !armaturaAcquired[2])){
          	if(this.timer==40){
          		player.power[3].usage--;
          		this.timer=0;
          	}else{this.timer++;}
          }else{
          	this.life= -1;
          	player.activeShot=player.activeShot-3;
          }
        }
      }
      
      function newFireWaveCharge3Main(larghezza,altezza) {//lo sparo creato dal player
        this.life= 1;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+6;
         this.xv= -1;
        }else{
         this.x= player.x-6-larghezza; 
         this.xv= 1;
        }
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y;
        this.color1=player.power[3].color1;
        this.color2=player.power[3].color2;
        this.speed= 1;
        this.perforation=true;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
            var numeroFiamme=1;
            var fiammeWidth=(this.width/numeroFiamme)-1;
            for(i=0;i<numeroFiamme;i++){
            	ctx.fillStyle=this.color1;
            	ctx.fillRect(xdisegnata+1+i*fiammeWidth, ydisegnata, fiammeWidth-1, this.height);
            	disegnaFiammella(xdisegnata+1+i*fiammeWidth, ydisegnata,fiammeWidth-1,this.color1);	
            	ctx.fillStyle=this.color2;
            	ctx.fillRect(xdisegnata+3+i*fiammeWidth, ydisegnata+2, fiammeWidth-5, this.height-4);
            	disegnaFiammella(xdisegnata+3+i*fiammeWidth, ydisegnata+2,fiammeWidth-5,this.color2);	
            }         
            function disegnaFiammella(x,y,fiammeWidth,color){
    	        ctx.fillStyle=color;
    	        ctx.beginPath();
    		      ctx.lineWidth = 1;
    		      var lato=fiammeWidth/6;
    		      ctx.moveTo(x, y+1);
    		      ctx.lineTo(x+lato, y-lato*2);
    		      ctx.lineTo(x+lato*2, y+1);
    		      ctx.lineTo(x+lato*4, y-lato*4);
    		      ctx.lineTo(x+lato*6, y+1);
    		      ctx.lineTo(x, y+1);
    		      ctx.fill();          	
            }          
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if (this.facingRight){
            this.xv -= this.speed;
          }else{
            this.xv += this.speed;
          }
          this.xv *= level.friction;
          this.x += -this.xv;
	        var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
              this.life=-1;
	        }     
	        this.yv += level.gravity;
	        if(this.yv>19){this.yv=19;}  //limita la gravita'
	        this.y += this.yv;           //apply gravity

	        for(i=0; i<level.length; i++) {//y collision with level
	          if(((this.y+this.height)>level[i].y)&&((this.y+this.height)<level[i].y+19)&&(collisionBetween(this,level[i]))){//collison verso il basso
	            this.y=level[i].y-this.height-0.2;
              var sparofiglio = new newFireWaveCharge3Figli(this.x,this.y,this.width,this.height,4,this.facingRight); sparofiglio.active=true; entity.push(sparofiglio);
              this.life=-1; this.active=false;
	          }
	          if((((this.x+this.width)>level[i].x)||(this.x<(level[i].x+level[i].width)))&&(collisionBetween(this,level[i]))){//collsion laterale
	          		this.life=-1;	
	          }	
	        }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("fireCh3",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
            }
          }          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;
          }
        }//fine physics
      }//fine firewave charge3 main
      function newFireWaveCharge3Figli(xPass,yPass,larghezza,altezza,indicePass,facingPass){
        this.life= 1;
        this.indice=indicePass;
        this.active=false;
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.facingRight=facingPass;
        this.appoggiatoInBasso=false;
        this.x=xPass;
        this.y=yPass;
        this.startingY=this.y;                
        this.width= larghezza;
        this.height= altezza;
        this.startingHeight=this.height;
        this.color1=player.power[3].color1;
        this.color2=player.power[3].color2;
        this.speed= 1;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
            var numeroFiamme=Math.floor(this.height/this.startingHeight);
            var fiammeWidth=this.width-1;
            for(i=1;i<numeroFiamme+1;i++){
            	ctx.fillStyle=this.color1;
            	ctx.fillRect(xdisegnata+1, ydisegnata+this.height-(this.startingHeight*i), fiammeWidth-1, this.startingHeight);
            	disegnaFiammella(xdisegnata+1, ydisegnata+this.height-(this.startingHeight*i),fiammeWidth-1,this.color1);	
            	ctx.fillStyle=this.color2;
            	ctx.fillRect(xdisegnata+3, ydisegnata+2+this.height-(this.startingHeight*i), fiammeWidth-5, this.startingHeight-4);
            	disegnaFiammella(xdisegnata+3, ydisegnata+2+this.height-(this.startingHeight*i),fiammeWidth-5,this.color2);	
            }         
            function disegnaFiammella(x,y,fiammeWidth,color){
    	        ctx.fillStyle=color;
    	        ctx.beginPath();
    		      ctx.lineWidth = 1;
    		      var lato=fiammeWidth/6;
    		      ctx.moveTo(x, y+1);
    		      ctx.lineTo(x+lato, y-lato*2);
    		      ctx.lineTo(x+lato*2, y+1);
    		      ctx.lineTo(x+lato*4, y-lato*4);
    		      ctx.lineTo(x+lato*6, y+1);
    		      ctx.lineTo(x, y+1);
    		      ctx.fill();          	
            }          
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          this.height+=this.startingHeight/4;
          this.y-=this.startingHeight/4;
          this.appoggiatoInBasso=false;
	        for(i=0; i<level.length; i++) {//y collision with level
            this.height+=1;
	          if(((this.y+this.height)>level[i].y)&&((this.y+this.height)<level[i].y+19)&&(collisionBetween(this,level[i]))){//collison verso il basso
              this.height-=1;
              this.appoggiatoInBasso=true;
              if(this.height==this.startingHeight*4){
                if(this.facingRight){ var sparofiglio = new newFireWaveCharge3Figli(this.x+this.width+1,this.startingY,this.width,this.startingHeight,-1,this.facingRight); sparofiglio.active=this.active; entity.push(sparofiglio);  
                }else{ var sparofiglio = new newFireWaveCharge3Figli(this.x-this.width-1,this.startingY,this.width,this.startingHeight,-1,this.facingRight); sparofiglio.active=this.active; entity.push(sparofiglio);}
                this.life=-1; this.active=false;
                if(this.indice>1){var sparofiglio = new newFireWaveCharge3Figli(this.x,this.startingY,this.width,this.startingHeight,this.indice-1,this.facingRight); entity.push(sparofiglio); this.indice=-1;}
              }
              this.height+=1;                            
	          }
            this.height-=1;
	          if((((this.x+this.width)>level[i].x)||(this.x<(level[i].x+level[i].width)))&&(collisionBetween(this,level[i]))){//collsion laterale
	          	this.life=-1;	
	          }	
	        }
          if(!this.appoggiatoInBasso){this.life=-1;}
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("fireCh3",this.damage);}
              }
            }
          }          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;
          }
        }//fine physics
      }//fine firewave ch3 figlio  
      
      function newStormTornado(xPassata,yPassata,larghezza,altezza,indicePassato,faceRight,goUp) {//lo sparo creato dal player - carica 3
      	this.index=indicePassato;
        this.active=true;
        this.main=false;
        this.contaLife=0;
        this.facingRight=faceRight;
        if(indicePassato==0){
        	if(goUp){//individua il main
        		this.main=true;
        	}
	        if(this.facingRight){
	         this.x= xPassata+player.width+6;
	        }else{
	         this.x= xPassata-6-larghezza; 
	        }        	
        }else{this.x=xPassata;}
        this.startingX=this.x;
      	this.numeroFigli=40;
        this.life= 1;
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.xv= 0;
        this.yv= 0;
        this.width=larghezza;
        this.height=altezza;
        this.y=yPassata;
        this.startingY=yPassata;
        this.minY=this.startingY-(this.height/4);
        this.maxY=this.startingY+(this.height/4);
        this.minX=this.startingX-(this.width);
        this.maxX=this.startingX+(this.width);        
        this.startingDirection=goUp;
        this.goingUp=goUp;
        this.moveNext=faceRight;
        this.color="#f5aad5";
        this.speed=0.5;
        this.xSpeed=1;
        this.ySpeed=0.5;//velocita con cui va su e giu
        this.perforation=true;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
        	this.speed+=0.0012;
	        //movimento x dello sparo
	        if (this.facingRight){
	          this.xv -= this.speed;
	        }else{
	          this.xv += this.speed;
	        }
	        this.xv *= level.friction;
	        this.x += -this.xv; 
			//movimento y dello sparo
	        if (this.goingUp){
	          this.yv -= this.ySpeed;
	          if (this.facingRight){this.xv -= this.xSpeed/2;
	          }else{this.xv += this.xSpeed/2;}
	          if(this.y < this.minY){
	          	this.goingUp=false;
	          }
	        }else{
	          this.yv += this.ySpeed;
	          if (this.facingRight){this.xv += this.xSpeed;
	          }else{this.xv -= this.xSpeed;}	          
	          if(this.y > this.maxY){
	          	this.goingUp=true;
	          }	          
	        }	        
	        this.yv *= level.friction;
	        this.y += this.yv;
	        this.xv *= level.friction;
	        this.x += -this.xv; 	        
	        //creazione degli spari figli
	        if(this.index<this.numeroFigli-1){
				if(creaFiglio(this.startingX,this.facingRight,this.x,this.width,this.startingY,this.height,this.index,this.color,this.startingDirection,this.speed)){
					this.index=this.numeroFigli;
				}
	        }
	        //collisione dello sparo con level
	        if(!this.canPassWall){
	         for (i=0; i<level.length;i++){
	           if (collisionBetween(this,level[i])){
	             this.life=-1;
	           }
	         }
	        }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}
	        }
	        //collisione dello sparo con altre entita'
	        for (i=0; i<entity.length;i++){
	          if (!(i == indiceDiQuestaEntity)){
	            if ( entity[i].life > 0 && !(this.type==entity[i].type || entity[i].type=="pickup" || entity[i].type=="ostacolo" || entity[i].type=="piattaforma" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
	              if(entity[i].getHit){entity[i].getHit("stormCh1",this.damage);}
	              this.damage= 0;
	            }
	          }
	        }
          if(this.contaLife>420){
          	this.life=-1;	
          }this.contaLife++;
          
          if(this.main){
            //disattiva colpi su schermo
            if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
              player.activeShot=player.activeShot-3; 
              this.active=false;       
            }
          }                    
    			function creaFiglio(startingX,facingRight,x,width,startingY,height,index,color,startingDirection,velocita){
    				var xMax=startingX;		
    				if(facingRight){
    					if(((x)-(width))>xMax){
    						var sparoFiglio = new newStormTornado((x-width),startingY,width,height,index+1,facingRight,startingDirection);
    		                sparoFiglio.color= color;
    		                sparoFiglio.speed=velocita;
    		                entity.push(sparoFiglio);						
    						return true;
    					}
    				}else{
    					if(x+(width)<(xMax)){
    						var sparoFiglio = new newStormTornado((x+(width)),startingY,width,height,index+1,facingRight,startingDirection);
    		                sparoFiglio.color= color;
    		                sparoFiglio.speed=velocita;
    		                entity.push(sparoFiglio);						
    						return true;
    					}	
    				}
    				return false;
    			}//fine di crea figlio
	      }//fine di this.physics      
      }
      
      function newStormTornadoCharge3(xPass,yPass,larghezza,altezza,facingRight,durata,main){//lo sparo creato dal player
        this.life= 1;
        this.duration=durata;
        this.active=main;
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.facingRight=facingRight;
        if(this.active){        
          if(this.facingRight){
           this.x= player.x+player.width+6;
          }else{
           this.x= player.x-6-larghezza;
           this.facingRight=true; 
          }
          this.startingX=this.x;
        }else{
           this.startingX=xPass;
           this.x=xPass;
        }
        this.xv= 0;
        this.xMassima=this.startingX+1;
        this.xMinima=this.startingX-1;
        this.width= larghezza;
        this.height= altezza;
        this.y=yPass;
        this.color=player.power[4].color2+"99";
        this.speed= 0.1;
        this.maxFigli=Math.ceil(canvasWidth/(this.height+1));
        this.figli=0;
        this.hasPhysics=true;
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if (this.facingRight){
            this.xv += this.speed;
            if(this.x>this.xMassima){this.facingRight=!this.facingRight}
          }else{
            this.xv -= this.speed;
            if(this.x<this.xMinima){this.facingRight=!this.facingRight}
          }
          this.xv *= level.friction;
          this.x += this.xv;    
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("stormCh3",this.damage);}
              }
            }
          }
          if(this.active){
            this.figli++;
            if(this.figli<this.maxFigli){
              var goRight=false;
              if(this.figli%2==0){goRight=true;}
              var sparoFiglio=new newStormTornadoCharge3(this.startingX,(this.y-this.figli*(this.height+1)),this.width,this.height,goRight,0,false); entity.push(sparoFiglio);
              var sparoFiglio=new newStormTornadoCharge3(this.startingX,(this.y+this.figli*(this.height+1)),this.width,this.height,goRight,0,false); entity.push(sparoFiglio);
            }
          }
          this.duration++; if(this.duration>80){this.life=-1;}
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;
          }
        }
      }      

      function newElectricSpark(larghezza,altezza){//lo sparo creato dal player - electric spark charge 0
        this.life= 1;
        this.active=true;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+6;
        }else{
         this.x= player.x-6-larghezza; 
        }
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+9;
        this.color=player.charge0color;
        this.speedX= 2;
        this.speedY= 0;
        this.perforation=false;
        this.canPassWall=false;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle="#f83cf8";
          ctx.beginPath();
	      ctx.lineWidth = 1;
	      var lungLato = this.width/4;
	      ctx.moveTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
	      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata);
	      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2-lungLato/2);
	      ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2+lungLato/2);
	      ctx.lineTo(xdisegnata+this.width/2+lungLato/2, ydisegnata+this.height);
	      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata+this.height);
	      ctx.lineTo(xdisegnata, ydisegnata+this.height/2+lungLato/2);
	      ctx.lineTo(xdisegnata, ydisegnata+this.height/2-lungLato/2);
	      ctx.lineTo(xdisegnata+this.width/2-lungLato/2, ydisegnata);
	      ctx.fill();          
        }
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){ 
          if (this.facingRight){//movimento dello sparo
            this.xv -= this.speedX;
          }else{
            this.xv += this.speedX;
          }
          this.yv += this.speedY; 
          this.xv *= level.friction;
          this.yv *= level.friction;
          this.x += -this.xv;
          this.y += -this.yv;
              
          //collisione dello sparo con level
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.life=-1;
	              if(this.speedX!=0){//ora genera figli (quindi solo con collisioni con level)
		              var sparoFiglioUp = new newElectricSpark(this.width,this.height);
		              sparoFiglioUp.x=this.x+this.xv/2;
		              sparoFiglioUp.y=this.y;
		              sparoFiglioUp.canPassWall=true;
		              sparoFiglioUp.active=false;
		              sparoFiglioUp.speedX=0; sparoFiglioUp.speedY=-this.speedX;
		              entity.push(sparoFiglioUp);
		              var sparoFiglioDown = new newElectricSpark(this.width,this.height);
		              sparoFiglioDown.x=this.x+this.xv/2;
		              sparoFiglioDown.y=this.y;
		              sparoFiglioDown.canPassWall=true;
		              sparoFiglioDown.active=false;
		              sparoFiglioDown.speedX=0; sparoFiglioDown.speedY=this.speedX;
		              entity.push(sparoFiglioDown);
	              }	              
	            }
	          }
          }else{
          	if(this.x>level.maxWidth+100 || this.x<-100){
          		this.life=-1;
          	}
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("electricCh1",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
            }
          }
          //disattiva colpi su schermo
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            this.active=false;
            player.activeShot=player.activeShot-1;       
          }          
        }
      }
      
      function newElectricSparkCharge3(xPass,yPass,larghezza,altezza,facingRight){//lo sparo creato dal player - electric spark charge 3
        this.life= 1;
        this.active=facingRight;
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.facingRight=facingRight;        
        this.x=xPass;
        this.y=yPass;
        this.xv= 0;
        this.width= larghezza;
        this.height=this.width;
        this.heightMax= altezza;
        this.color=player.charge0color;
        this.speedX= 2;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.color1="#f83cf8";
        this.color2="#cb18ff99";
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle=this.color2;
          ctx.fillRect(xdisegnata+this.width/4, ydisegnata+this.width/2, this.width/2, this.height-this.width/2);
          drawPalla(xdisegnata, ydisegnata,this.width,this.width,this.color1);
          drawPalla(xdisegnata, ydisegnata+this.height-this.width/2,this.width,this.width,this.color1);
          function drawPalla(xdisegnata, ydisegnata,pallawidth,pallaheight,color){
            ctx.fillStyle=color;
            ctx.beginPath();
    	      ctx.lineWidth = 1;
    	      var lungLato = pallawidth/4;
    	      ctx.moveTo(xdisegnata+pallawidth/2-lungLato/2, ydisegnata);
    	      ctx.lineTo(xdisegnata+pallawidth/2+lungLato/2, ydisegnata);
    	      ctx.lineTo(xdisegnata+pallawidth, ydisegnata+pallaheight/2-lungLato/2);
    	      ctx.lineTo(xdisegnata+pallawidth, ydisegnata+pallaheight/2+lungLato/2);
    	      ctx.lineTo(xdisegnata+pallawidth/2+lungLato/2, ydisegnata+pallaheight);
    	      ctx.lineTo(xdisegnata+pallawidth/2-lungLato/2, ydisegnata+pallaheight);
    	      ctx.lineTo(xdisegnata, ydisegnata+pallaheight/2+lungLato/2);
    	      ctx.lineTo(xdisegnata, ydisegnata+pallaheight/2-lungLato/2);
    	      ctx.lineTo(xdisegnata+pallawidth/2-lungLato/2, ydisegnata);
    	      ctx.fill();
          }          
        }
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          if(this.height<this.heightMax){
            this.height+=(this.heightMax/10);
            this.y-=(this.heightMax/20);
          }else{ 
            if (this.facingRight){//movimento dello sparo
              this.xv -= this.speedX;
            }else{
              this.xv += this.speedX;
            } 
            this.xv *= level.friction;
            this.x += -this.xv;
          }    
          //disattivazione dello sparo fuori dal livello
        	if(this.x>level.maxWidth+50 || this.x<-50){
        		this.life=-1;
        	}
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("electricCh3",this.damage);}
              }
            }
          }
          //disattiva colpi su schermo
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            this.active=false;
            player.activeShot=player.activeShot-3;       
          }          
        }
      }             

      function newBoomerangCutter(larghezza,altezza) {//lo sparo creato dal player
        this.type= "sparoDelPlayer";
        this.damage= 1;      
        this.life= 1;
        this.active=true;
        if(player.yv>0){
        	this.goUp=false;
        }else{
        	this.goUp=true;
        }
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+6;
        }else{
         this.x= player.x-6-larghezza; 
        }
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+9;
        this.color=player.charge0color;
        this.speedX= 2.6;
        this.speedY= 0;
        this.speedX2= 0;
        this.speed= 0;
        this.entityPickedIndex=-1;
        this.hitSomething=false;
        this.perforation=true;
        this.canPassWall=true;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.strokeStyle=player.power[6].color1;
          ctx.beginPath();
	      ctx.lineWidth = 8;
	      ctx.moveTo(xdisegnata, ydisegnata);
	      ctx.lineTo(xdisegnata+this.width-(ctx.lineWidth/2), ydisegnata);
          ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height-(ctx.lineWidth/2));
	      ctx.stroke();
	      ctx.lineWidth = 4;
	      ctx.strokeStyle=player.power[6].color2;
	      ctx.stroke();
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if(this.speedX>0){
	        if (this.facingRight){
	          this.xv -= this.speedX;
	        }else{
	          this.xv += this.speedX;
	        }
	        if (this.goUp){
	          this.yv += this.speedY;
	        }else{
	          this.yv -= this.speedY;
	        }	          	          
	        this.speedX-=0.2;
			this.speedY+=0.2;
		  }else if(this.speedY>0){
	        if (this.facingRight){
	          this.xv += this.speedX2;
	        }else{
	          this.xv -= this.speedX2;
	        }
	        if (this.goUp){
	          this.yv += this.speedY;
	        }else{
	          this.yv -= this.speedY;
	        }          	          
	        this.speedY-=0.2;
			this.speedX2+=0.2;
		  }else if (this.speedX2>0){
	        if (this.facingRight){
	          this.xv += this.speedX2;
	        }else{
	          this.xv -= this.speedX2;
	        }
	        if (this.goUp){
	          this.yv -= this.speed;
	        }else{
	          this.yv += this.speed;
	        }          	          
	        this.speedX2-=0.2;
			this.speed+=0.2;		  	
          }else{//da qui in poi insegue il player
          	if(this.x>player.x+(player.width/2)){
          		this.xv += this.speed/2;
          	}else{
          		this.xv -= this.speed/2;	
          	}
          	if(this.y>player.y+(player.height/2)){
          		this.yv += this.speed/2;
          	}else{
          		this.yv -= this.speed/2;	
          	}          	
          }
          this.xv *= level.friction;
          this.x += -this.xv;
          this.yv *= level.friction;
          this.y += -this.yv;
          	             
          //collisione dello sparo con level
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.life=-1;
	            }
	          }
          }else{
	        	if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
	        		this.life=-1;
	        	}          
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){//danno ai mostri
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("boomerangCh1",this.damage);}
                this.hitSomething=true;
                if (!(entity[i].life < 1 && this.perforation)){
                  this.life=-1;
                }
              }
			  if(this.entityPickedIndex==-1){//raccoglie gli oggetti
			  	if(entity[i].life > 0 && entity[i].type=="pickup"){
			  		if(collisionBetween(this,entity[i])){
		              	this.entityPickedIndex=i;
		              	this.hitSomething=true;			  			
			  		}
			  	}
			  }
            }
          }
          if(this.entityPickedIndex!=-1){
          	entity[this.entityPickedIndex].x=this.x;
          	entity[this.entityPickedIndex].y=this.y;
          }
          if(collisionBetween(this,player) && this.speedX<0.3){
          	if(!this.hitSomething){
          		if(player.power[6].usage<player.power[6].usageMax){player.power[6].usage++;}
          	}
          	this.life=-1;
          }          
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-1;
            this.active=false;       
          }
        }
      }
      
      function newBoomerangCutterCharge3(larghezza,altezza,indicePassato,facingRightPassato) {//lo sparo creato dal player
        this.type= "sparoDelPlayer";
        this.damage= 2;
        this.indice=indicePassato;      
        this.life= 1;
        if(this.indice==0){this.active=true;}
        if(this.indice>1){
        	this.goUp=false;
        }else{
        	this.goUp=true;
        }
        this.facingRight=facingRightPassato;        
        if(player.facingRight){
         this.x= player.x+player.width+6;
        }else{
         this.x= player.x-6-larghezza; 
        }
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=player.y+9;
        this.speedX= 2.4;
        this.speedY= 0;
        this.speedX2= 0;
        this.speedX3= 0;
        this.speed= 0;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.strokeStyle=player.power[6].color1;
          ctx.beginPath();
	        ctx.lineWidth = 12;
	        ctx.moveTo(xdisegnata, ydisegnata);
	        ctx.lineTo(xdisegnata+this.width-(ctx.lineWidth/2), ydisegnata);
          ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height-(ctx.lineWidth/2));
	        ctx.stroke();
	        ctx.lineWidth = 6;
	        ctx.strokeStyle=player.power[6].color2;
	        ctx.stroke();
	        ctx.lineWidth = 12;
	        ctx.strokeStyle="#71ff0060";
	        ctx.stroke();          
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          //movimento dello sparo
          if(this.speedX>0){
	        if (this.facingRight){
	          this.xv -= this.speedX;
	        }else{
	          this.xv += this.speedX;
	        }
	        if (this.goUp){
	          this.yv += this.speedY;
	        }else{
	          this.yv -= this.speedY;
	        }	          	          
	        this.speedX-=0.2;
    			this.speedY+=0.2;
    		  }else if(this.speedY>0){
    	        if (this.facingRight){
    	          this.xv += this.speedX2;
    	        }else{
    	          this.xv -= this.speedX2;
    	        }
    	        if (this.goUp){
    	          this.yv += this.speedY;
    	        }else{
    	          this.yv -= this.speedY;
    	        }          	          
    	        this.speedY-=0.2;
    			    this.speedX2+=0.2;
    		  }else if (this.speedX2>0){
    	        if (this.facingRight){
    	          this.xv += this.speedX2;
    	        }else{
    	          this.xv -= this.speedX2;
    	        }
    	        if (this.goUp){
    	          this.yv -= this.speedX3;
    	        }else{
    	          this.yv += this.speedX3;
    	        }          	          
    	        this.speedX2-=0.2;
    			    this.speedX3+=0.2;
    		  }else if (this.speedX3>0){
    	        if (this.facingRight){
    	          this.xv -= this.speedX3/1.3;
    	        }else{
    	          this.xv += this.speedX3/1.3;
    	        }
    	        if (this.goUp){
    	          this.yv -= this.speed;
    	        }else{
    	          this.yv += this.speed;
    	        }          	          
    	        this.speedX3-=0.2;
    			    this.speed+=0.2;              		  	
          }else{//da qui in poi esce dallo schermo
            switch(this.indice){
              case 0: this.xv += this.speed/1.8; this.yv -= this.speed/2; break;
              case 1: this.xv -= this.speed/1.8; this.yv -= this.speed/2; break;
              case 2: this.xv += this.speed/1.8; this.yv += this.speed/2; break;
              case 3: this.xv -= this.speed/1.8; this.yv += this.speed/2; break;
            }         	
          }
          this.xv *= level.friction;
          this.x += -this.xv;
          this.yv *= level.friction;
          this.y += -this.yv;      
           	             
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("boomerangCh3",this.damage);}
              }
            }
          }
        	
          //disattivazione quando esce dallo schermo
          if((this.x > (player.x+player.width+(canvasWidth*2)))||( this.x < (player.x-(canvasWidth*2)))){
  	        		this.life=-1;
  	      }                    
          if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
            player.activeShot=player.activeShot-3;
            this.active=false;       
          }
        }
      }      
      
      function newShotgunIce(xPassataR,xPassataL,yPassata,larghezza,altezza,isPadrePassato,xSpeedPassato,ySpeedPassato,facingRightPassato) {//lo sparo creato dal player - shotgun ice charge 0
        this.life= 1;
        this.active=isPadrePassato;
        this.type= "sparoDelPlayer";
        this.damage= 1;
        this.facingRight=facingRightPassato;        
        if(this.facingRight){
         this.x= xPassataR;
        }else{
         this.x= xPassataL; 
        }
        this.xv= 0;
        this.yv= 0;
        this.width= larghezza;
        this.height= altezza;
        this.y=yPassata; 
        this.speed= xSpeedPassato;
        this.yspeed= ySpeedPassato;
        this.isFather=isPadrePassato;
        this.isDying=false;
        this.perforation=false;
        this.canPassWall=false;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.strokeStyle=player.power[7].color1;
          ctx.beginPath();
	      ctx.lineWidth = (this.width/8);
	      ctx.moveTo(xdisegnata+this.width/2, ydisegnata);
	      ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width, ydisegnata);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width, ydisegnata+this.height);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata, ydisegnata+this.height);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata, ydisegnata);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata);
	      ctx.stroke();          
        }
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){ 
          if (this.facingRight){//movimento dello sparo
            this.xv -= this.speed;
          }else{
            this.xv += this.speed;
          }
          this.yv += this.yspeed; 
          this.xv *= level.friction;
          this.yv *= level.friction;
          this.x += -this.xv;
          this.y += -this.yv;
              
          //collisione dello sparo con level
          if(!this.canPassWall){
	          for (i=0; i<level.length;i++){
	            if (collisionBetween(this,level[i])){
	              this.isDying=true;
	              if(this.facingRight){
	              	this.x=level[i].x-this.width-1;
	              }else{
	              	this.x=level[i].x+level[i].width+1;
	              }
	            }
	          }
          }else{
          	if(this.x>level.maxWidth+100 || this.x<-100){
          		this.life=-1;
              this.isFather=false;
          	}
          }
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot")  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("iceCh1",this.damage);}
                if (!(entity[i].life < 1 && this.perforation)){
                  this.isDying=true;
                }
              }
            }
          }          
          //genera figlio alla morte se isPadre, altrimenti muore e basta
          if(this.isDying){
            //this.x += this.xv;         
            if(this.isFather){
              var sparoFiglio = new newShotgunIce(this.x,this.x,(this.y+this.height/4),this.width/2,this.height/2,false,2.5,0,!this.facingRight); entity.push(sparoFiglio);
              var sparoFiglio = new newShotgunIce(this.x,this.x,(this.y+this.height/4),this.width/2,this.height/2,false,2.5,1,!this.facingRight); entity.push(sparoFiglio);
              var sparoFiglio = new newShotgunIce(this.x,this.x,(this.y+this.height/4),this.width/2,this.height/2,false,2.5,2,!this.facingRight); entity.push(sparoFiglio);
              var sparoFiglio = new newShotgunIce(this.x,this.x,(this.y+this.height/4),this.width/2,this.height/2,false,2.5,-1,!this.facingRight); entity.push(sparoFiglio);
              var sparoFiglio = new newShotgunIce(this.x,this.x,(this.y+this.height/4),this.width/2,this.height/2,false,2.5,-2,!this.facingRight); entity.push(sparoFiglio);
            }
            this.life=-1;
          }
          
          if(this.isFather){
            //disattiva colpi su schermo
            if(this.active && (this.life<1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){
              this.active=false;
              player.activeShot=player.activeShot-3;       
            }
          }          
        }
      }

      function newShotgunIceCharge3(larghezza,altezza) {// ShotgunIce Charge 3
        this.life= 1;
        this.active=true;
        this.type= "piattaforma";
        this.damage= 0;
        this.damageToEnemy= 2;
        this.facingRight=player.facingRight;        
        if(this.facingRight){
         this.x= player.x+player.width+3+larghezza/2;
        }else{
         this.x= player.x-3-larghezza; 
        }
        this.xv= 0;
        this.yv= 0;
        this.width=0;
        this.height=altezza;
        this.widthMax= larghezza;
        this.y=player.y+9;
        this.color=player.power[7].color1+"EE";
        this.speed= 0.05;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          ctx.fillStyle=this.color;
          var larghezzaRuota=this.width/4;
          var altezzaRuota=this.height/7;
          ctx.fillRect(xdisegnata-2, ydisegnata, this.width+4, this.height-altezzaRuota);
          if(this.width==this.widthMax){
            ctx.fillRect(xdisegnata+this.width/2-larghezzaRuota/2, ydisegnata, larghezzaRuota, this.height+1);
          }          
        }        
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          if(this.width<this.widthMax){ //crescita da fermo
            this.width+=(this.widthMax/10);
            this.x-=(this.width/20);
          }else{ //movimento dello sparo         
            if (this.facingRight){
              this.xv -= this.speed;
            }else{
              this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            if(this.speed<3){this.speed+=0.01;}//accelera
  	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
  	            if (!this.isInWater){
  	                this.isInWater = true;
  	                this.yv = 0;
  	            }
  	            gravityApplicata = level.gravityWater;
  	            frizioneApplicata = level.frictionWater;
  	        }else{
  	            this.isInWater = false;
  	            gravityApplicata = level.gravity;
  	            frizioneApplicata = level.friction;            
  	        }      
  	        this.yv += gravityApplicata;//get level gravity
  	        if(this.yv>this.width){this.yv=this.width;}//limita la gravita'
  	        this.y += this.yv;//apply gravity            
          }    
	        for(i=0; i<level.length; i++) {// collision with level
	          if(((this.y+this.height)>level[i].y)&&((this.y+this.height)<level[i].y+this.yv+1)&&(collisionBetween(this,level[i]))){//collison verso il basso
	            this.y=level[i].y-this.height-1;
	            this.yv=this.yv/2;
	          }
	          if((((this.x+this.width)>level[i].x)||(this.x<(level[i].x+level[i].width)))&&(collisionBetween(this,level[i]))){//collsion laterale
	          		this.life=-1;	
	          }	
	        }
          if(collisionBetween(this, player)&&(((this.x+this.width)>player.x)||(this.x<(player.x+player.width)))){//collisione laterale player
            player.x-=this.xv;
            for(var j = 0; j < level.length; j++){
              if(collisionBetween(player, level[j])){
                player.x+=this.xv*2;
              }
            }  
          }                  
          //collisione dello sparo con altre entita'
          for (i=0; i<entity.length;i++){
            if (!(i == indiceDiQuestaEntity)){
              if ( entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type=="pickup" || entity[i].type=="enemyShot" )  && collisionBetween(this,entity[i]) ){	//controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                if(entity[i].getHit){entity[i].getHit("iceCh3",this.damage);}
              }
            }
          }
          if(player.activePower!=8){this.life-=0.5;}//distruzione se il player cambia weapon
          if(this.active && (this.life<0.1 || ((xdisegnata > canvasWidth)||( xdisegnata+this.width < 0)))){//disattivazione sparo
            player.activeShot=player.activeShot-3;
            this.active=false;
          }
        }
      }
      
      function rectTest(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
      }            

      function newPipistrello() {//mostro pipistrello
        this.life= 1;
        this.type= "monster";
        this.damage= 1;
        this.x= 0;
        this.y= 0;
        this.xv= 0;
        this.yv= 0;
        this.timer=0;
        this.alSoffitto=false;
        this.slope = 0;
        this.width= 34;
        this.height= 16;
        this.color1= '#8500b5';
        this.color2= '#d7b600';
        this.speed= 0.5;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          if(this.alSoffitto){
            this.height=-1*this.height;
            ydisegnata=ydisegnata-this.height;
            xdisegnata+=this.width/8;
            this.width=this.width*3/4;
          }
          var unitX=this.width/10;
          var unitY=this.height/10;          
		      ctx.fillStyle = this.color2;
          halfBatDraw(xdisegnata,this.width,ydisegnata,this.height,unitX,unitY);
          halfBatDraw(xdisegnata,this.width,ydisegnata,this.height,-unitX,unitY);
          ctx.fillStyle = this.color1;
          halfBatDraw(xdisegnata+1.5,this.width-3,ydisegnata+1.5,this.height-3,unitX,unitY);
          halfBatDraw(xdisegnata+1.5,this.width-3,ydisegnata+1.5,this.height-3,-unitX,unitY);
          if(this.alSoffitto){this.height=-1*this.height; this.width=this.width*4/3;}                    
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
        this.getHit= function(nome,danno){
        	this.life-=danno;
        }                  
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
          if(this.timer<1){//movimento verso il player
            this.alSoffitto=false;
            if (this.x < player.x-1){
              this.xv -= this.speed;
            }else if(this.x > player.x+player.width-1){
              this.xv += this.speed;
            }
            if (this.y < player.y+1){
              this.yv -= this.speed;
            }else{
              this.yv += this.speed;
            }
            this.xv *= level.friction;
            this.yv *= level.friction;
            this.x += -this.xv;
            this.y += -this.yv;
          }else{//movimento verso l'alto
            if(!this.alSoffitto){
               this.yv = this.speed*8;
               this.y += -this.yv;
             }
          }   
          
          this.slope = 0;	//serve per i bordi tipo
          for(var i = 0; i < level.length; i++) {
            if(collisionBetween(this, level[i])) {
              if(this.slope != -8) {
                this.y -= 1;
                this.slope += 1;
              }
            }
          }
          
          for(var i = 0; i < level.length; i++) {//level collision
            if(collisionBetween(this, level[i])) {
              var latoSopra = new rectTest(this.x, this.y, this.width, 2);
              if(this.timer>0 && collisionBetween(latoSopra, level[i])){this.alSoffitto=true;}            
              this.y += this.slope;
              this.x += this.xv*2;
              this.xv = 0;
              if(this.alSoffitto){
                this.y += this.yv;
                this.yv = 0;              
              }else{
                this.y += this.yv*2;
                this.yv = 0;              
              }              
            }   
          }
          if(this.alSoffitto){this.timer--;}
          
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
          //collision col player
          if(collisionBetween(this, player)) {
        	 this.xv = 0;
			 this.yv = 0;
           	 this.timer=50; 		
          }            
        }              
      }

      function newBunny() {//mostro coniglio
        this.life= 2;
        this.type= "monster";
        this.damage= 4;
        this.invulnerability=0;
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
        this.color3= '#dddddd';
        this.color4= '#69ff00';
        this.speed= 12;
        this.jumpHeight=10;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
		  color1=this.color;
		  color2=this.color2;
          if(this.gotHit){
          	this.gotHit=false;
			color1=this.color3;
			color2=this.color3;          	
          }
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
        this.getHit= function(nome,danno){
        	if(this.invulnerability<1){
        		this.gotHit=true;
        		this.life-=danno;
        		this.invulnerability=3;
        	}
        }          
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
			this.timer++;
			if(this.invulnerability>0){this.invulnerability--;}
        	
	      	var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
	            if (!this.isInWater){
	                this.isInWater = true;
	                this.yv = 0;
	            }
	            gravityApplicata = level.gravityWater;
	            frizioneApplicata = level.frictionWater;
	        }else{
	            this.isInWater = false;
	            gravityApplicata = level.gravity;
	            frizioneApplicata = level.friction;            
	        }      
	        this.yv += gravityApplicata;//get level gravity
	        if(this.yv>(this.height)){//limita la gravita' massima raggiungibile
	        	this.yv=this.height;
	        }
	        if(!this.isOnGround){this.y += this.yv;}//apply gravity
	        this.xv = this.xv*frizioneApplicata; //riduce gradualmente xv
	        this.x += this.xv;//apply movimento x
	        
	        for(var i = 0; i < level.length; i++) {//collision with level
              var latoSotto = new rectTest(this.x+this.width/2-2, this.y+this.height-3, 4, 2);
              if(collisionBetween(latoSotto, level[i])){ //collisione y col pavimento
              	this.y=level[i].y-this.height;
              	this.yv=0;
              	this.isOnGround=true;
              }else if(collisionBetween(this, level[i])){ //tutte altre collisioni con level
                this.x += -this.xv;
                //this.xv=0;
              } 	        
	        }

	        if(this.timer>250 && this.isOnGround && Math.floor(Math.random()*100) < 50){ //sparo
				this.timer=1;
				var sparo = new newSparo(20,10);
				if(this.facingRight){
					sparo.x=this.x+this.width-sparo.width; 	
				}else{
					sparo.x=this.x; 
				}
				sparo.y=this.y-this.width/6;
				sparo.facingRight=this.facingRight;
				sparo.type="enemyShot"; sparo.color=this.color4;
				sparo.damage=2;
				sparo.speed=sparo.speed/2;
				entity.push(sparo); 
	        }

	        if(this.timer%100==0 && this.isOnGround){ //salto
	        	var siGira=25;
	        	if((this.facingRight && this.x>player.x)||(!this.facingRight && this.x<player.x)){siGira=85;}
	        	if(Math.floor(Math.random()*100) < siGira){ this.facingRight=!this.facingRight}
	        	this.yv = -this.jumpHeight;
	        	this.isOnGround=false;
	        	this.xv = -this.speed;
	        	if(this.facingRight){this.xv=-this.xv;}
	        }           
        }              
      }//fine newBunny()  
      
      function newBombBee() {//mostro ape
        this.life= 2;
        this.type= "monster";
        this.name= "bomb wasp";
        this.damage= 2;
        this.invulnerability=0;
        this.facingRight=false;
        this.maxTimer=100;
        this.timer=this.maxTimer/2;
        this.bombTimer=0;
        this.gotHit=false;
        this.x= 0;
        this.y= 0;
        this.xv= 0;
        this.yv= 0;
        this.isOnGround=false;
        this.width= 17;
        this.height= 36;
        this.color = '#ffdd22';
        this.color2= '#ccaa00';
        this.color3= '#dddddd'; //damage color
        this.color4= '#00ddff';
        this.speed= 0.5;
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
		  color1=this.color;
		  color2=this.color2;
          color3=this.color4;
          if(this.gotHit){
          	this.gotHit=false;
			color1=this.color3;
			color2=this.color3; 
            color3=this.color3;         	
          }
          unit=this.height/4;
          ctx.fillStyle = color3+"55";
          ctx.strokeStyle = color3;
          ctx.lineWidth = "1";
          ctx.beginPath();
	      ctx.moveTo(xdisegnata-unit/2, ydisegnata-unit/2);
	      ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2-unit-unit/2);
          ctx.lineTo(xdisegnata-unit/2+this.width+unit*2, ydisegnata-unit/2);
          ctx.lineTo(xdisegnata-unit/2+this.width+unit*2, ydisegnata-unit/2+this.height-unit);
          ctx.lineTo(xdisegnata+this.width/2, ydisegnata+this.height/2-unit/2);
          ctx.lineTo(xdisegnata-unit/2, ydisegnata-unit/2+this.height-unit);
          ctx.lineTo(xdisegnata-unit/2, ydisegnata-unit/2);
	      ctx.fill(); ctx.stroke();
          ctx.fillStyle = color1;
          ctx.fillRect(xdisegnata+unit/2, ydisegnata, unit*2, unit*2+1);
          ctx.fillRect(xdisegnata+unit/2, ydisegnata+unit*3-1, unit*2, unit-1);
          ctx.fillStyle = color2;
          if(this.facingRight){
            ctx.fillRect(xdisegnata+unit/2, ydisegnata+unit*2, unit+unit/2, unit);
            ctx.fillRect(xdisegnata+unit*2, ydisegnata+unit/2, unit, unit);
          }else{          
            ctx.fillRect(xdisegnata, ydisegnata+unit/2, unit, unit);
            ctx.fillRect(xdisegnata+unit, ydisegnata+unit*2, unit+unit/2, unit);
          }
        }
        this.getHit= function(nome,danno){
        	if(this.invulnerability<1){
        		this.gotHit=true;
        		this.life-=danno;
        		this.invulnerability=3;
        	}
        }          
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
			if(this.invulnerability>0){this.invulnerability--;}
            if(this.bombTimer>0){this.bombTimer--;}
        	this.timer++;
            var centro=this.x+this.width/2;
            if(this.timer>this.maxTimer){
                this.timer=1;
                if(centro<player.x+player.width/2){
                    this.facingRight=true;
                }else if(centro>player.x+player.width/2){
                    this.facingRight=false;
                }
            }
	        
            if(this.facingRight){//movimento
                this.xv+=this.speed;
            }else{
                this.xv-=this.speed;
            }
            this.xv=this.xv*level.friction;
            this.x+=this.xv;
            
            if(centro<player.x+player.width*2 && centro>player.x-player.width){
                if(this.bombTimer<1){
                    bomba= new newBombBee_Bomb(centro, this.y+this.height);
                    entity.push(bomba);
                    this.bombTimer=50;
                }
            }         
        }              
      }//fine newBombBee()                  
      function newBombBee_Bomb(x,y) {//bomba del mostro ape
        this.life= 1;
        this.type= "enemyShot";
        this.name= "bomb bee bomb";
        this.damage= 0;
        this.timer=0;
        this.x= x;
        this.y= y;
        this.yv= 0;
        this.isOnGround=false;
        this.width= 10;
        this.height= 10;
        this.color  = '#999999';
        this.color2 = '#880000';
        this.color3 = '#ff0000';
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
		  color1=this.color;
		  color2=this.color2;
          if(this.timer>40){color2=this.color3;}
          redPoint=this.width/10*6;
          ctx.fillStyle = color1;
          ctx.fillRect(xdisegnata, ydisegnata+redPoint/2, this.width, this.height-redPoint/2);
          ctx.fillStyle = color2;
          ctx.fillRect(xdisegnata+this.width/2-redPoint/2, ydisegnata, redPoint, redPoint);
        }         
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
	      	var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
	            if (!this.isInWater){
	                this.isInWater = true;
	                this.yv = 0;
	            }
	            gravityApplicata = level.gravityWater;
	            frizioneApplicata = level.frictionWater;
	        }else{
	            this.isInWater = false;
	            gravityApplicata = level.gravity;
	            frizioneApplicata = level.friction;            
	        }      
	        this.yv += gravityApplicata;//get level gravity
	        if(this.yv>(this.height)){//limita la gravita' massima raggiungibile
	        	this.yv=this.height;
	        }
            if(!this.isOnGround){
                this.y += this.yv; //apply gravity
            }else{ //timer e esplosione
                this.timer++;
                if(this.timer>60){
                    esplosion= new esplosione(this.x+this.width/2,this.y+this.height/2,1,1,this.width*3,this.height*3,1);
                    entity.push(esplosion);
                    this.life=-1;
                }            
            }   	        	        
	        for(var i = 0; i < level.length; i++) {//collision with level
              var latoSotto = new rectTest(this.x+this.width/2-2, this.y+this.height-3, 4, 2);
              if(collisionBetween(latoSotto, level[i])){ //collisione y col pavimento
              	this.y=level[i].y-this.height;
              	this.yv=0;
              	this.isOnGround=true;
              } 
	        }      
        }              
      }//fine newBombBee_Bomb()
      
      function esplosione(x,y,widthIni,heightIni,widthMax,heightMax,danno) {
        this.life= 1;
        this.timer=5;
        this.type= "enemyShot";
        this.name= "explosion";
        this.damage= danno;
        this.x= x-widthIni/2;
        this.y= y-heightIni/2;
        this.width= widthIni;
        this.widthMax= widthMax;
        this.heightMax= heightMax;
        this.height= heightIni;
        this.color = '#dd0000';
        this.color2= '#eecc00';
        this.hasPhysics=true;
        this.canSelfDraw=true;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
		  color1=this.color;
		  color2=this.color2;
          ctx.fillStyle = color1;
          ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
          innerX=this.width/2; innerY=this.height/2;
          ctx.fillStyle = color2;
          ctx.fillRect(xdisegnata+this.width/2-innerX/2, ydisegnata+this.height/2-innerY/2, innerX, innerY);
        }         
        this.physics= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){
            if(this.width<this.widthMax){
                this.x=this.x-this.width/4;
                this.width+=this.width/2; 
            }
            if(this.height<this.heightMax){
                this.y=this.y-this.width/4;
                this.height+=this.width/2; 
            }
            if(this.width>this.widthMax-1 && this.height>this.heightMax-1){this.timer--;}
            if(this.timer<0){this.life=-1;}
        }              
      }//fine esplosione()       
                  
      function newSpike() {//le spine per terra
        this.life= 9999999999;
        this.type= "obstacle";
        this.damage= 9999999999;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=false;
        this.color= '#bcbcbc';
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
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
        this.indice=indicePassato;//indicePassato=0 -> helmet, indicePassato=1 -> legs, indicePassato=2 -> buster, indicePassato=3 -> corpo
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle=player.defaultColor1;
			    ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);        	
        	ctx.fillStyle=player.defaultColoreArmatura;
			    ctx.fillRect(xdisegnata+1, ydisegnata+1, this.width-2, this.height-2);
			    ctx.textAlign = "center";
			    ctx.font = "small-caps bold 18px Lucida Console";
    			var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
    			switch(this.indice){
    				case 0: disegnaTestoConBordino("H",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),player.defaultColor1,player.defaultColoreArmatura);break;
    				case 1: disegnaTestoConBordino("L",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),player.defaultColor1,player.defaultColoreArmatura);break;
    				case 2: disegnaTestoConBordino("B",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),player.defaultColor1,player.defaultColoreArmatura);break;
    				case 3: disegnaTestoConBordino("C",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),player.defaultColor1,player.defaultColoreArmatura);break;
			}
			ctx.textAlign = "left";//lo azzero se no mi si bugga in alcuni menu
        }//fine di selfDraw
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
			if(armaturaAcquired[this.indice]){//se il player l'ha gia' trovata disattiva l'entita'
				this.life=-1;
			}else{//da qui inizia this.physics vero e proprio
				if(collisionBetween(this, player)) {//quando il player lo raccoglie
					this.life=-1;
					switch(this.indice){
						case 0: objAlert = new newAlert("You have found the helmet upgrade! You can break some blocks with a headbutt.",gamestate); gamestate=5;
							break;
						case 1: objAlert = new newAlert("You have found the boots upgrade! Press "+dashkey+" to dash.",gamestate); gamestate=5;
							break;
						case 2: objAlert = new newAlert("You have found the buster upgrade! You can charge a more powerfull shot.",gamestate); gamestate=5;
							break;
						case 3: objAlert = new newAlert("You have found the chest upgrade! You receive less damage.",gamestate); gamestate=5;
							break;														
					}
					armaturaAcquired[this.indice]=true;
				}				
			} 	        
        }//fine di physics              
      }

      function newPickUp_Subtank(indicePassato) {//le spine per terra
        this.life= 9999999999;
        this.type= "pickup";
        this.indice=indicePassato;
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=true;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle=player.defaultColor1;
			ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
			ctx.textAlign = "center";
			ctx.font = "small-caps bold 18px Lucida Console";
			var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo			
			disegnaTestoConBordino("S",xdisegnata+(this.width/2), (ydisegnata+(this.height-2)/2+textHeight/2),player.charge0color,player.defaultColor1);
			ctx.textAlign = "left";//lo azzero se no mi si bugga in alcuni menu
        }//fine di selfDraw
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
			if(subtank[this.indice].acquired){//se il player l'ha gia' trovata disattiva l'entita'
				this.life=-1;
			}else{//da qui inizia this.physics vero e proprio
				if(collisionBetween(this, player)) {//quando il player lo raccoglie
					this.life=-1;
					objAlert = new newAlert("You have found a Subtank! Store the energy you don't need to use it later.",gamestate); gamestate=5;
					subtank[this.indice].acquired=true;
				}				
			} 	        
        }//fine di physics              
      }

      function newPickUp_Cuore(indicePassatoNonParsato) {//le spine per terra
        this.life= 9999999999;
        this.type= "pickup";
        this.indice=parsaApici(indicePassatoNonParsato);
        this.damage= 0;
        this.x= 0;
        this.y= 0;
        this.width= 20;
        this.height= 20;
        this.canSelfDraw=true;
        this.hasPhysics=true;
        this.selfDraw= function(xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.beginPath();
		    ctx.lineWidth = "2";
		    ctx.fillStyle = "#ff2f97"; //rosa
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
        }//fine di selfDraw
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
			if(heartAcquired[this.indice]){//se il player l'ha gia' trovata disattiva l'entita'
				this.life=-1;
			}else{//da qui inizia this.physics vero e proprio
				if(collisionBetween(this, player)) {//quando il player lo raccoglie
					this.life=-1;
					objAlert = new newAlert("You have found a Heart! Max life augmented.",gamestate); gamestate=5;
					heartAcquired[this.indice]=true;
					player.lifeMax+=2;
					player.life+=2;
				}				
			} 	        
        }//fine di physics
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
        this.damage= -vitaRecuperata;
        this.x= 0;
        this.y= 0;
        this.yv = 0;
        this.width= 20;
        this.height= 20;
        this.isInWater = false;
        this.canSelfDraw=true;
        this.hasPhysics=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle = "#868686";
			ctx.fillRect(xdisegnata-3, ydisegnata+3, this.width+6, this.height-6);        
        	ctx.fillStyle = "#d70000";
        	ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
        	ctx.fillStyle = "#ffe100";
			ctx.fillRect(xdisegnata+2, ydisegnata+2, this.width-4, this.height-4);			
        }//fine di selfDraw
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
	      	var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
	            if (!this.isInWater){
	                this.isInWater = true;
	                this.yv = 0;
	            }
	            gravityApplicata = level.gravityWater;
	            frizioneApplicata = level.frictionWater;
	        }else{
	            this.isInWater = false;
	            gravityApplicata = level.gravity;
	            frizioneApplicata = level.friction;            
	        }      
	        this.yv += gravityApplicata;//get level gravity
	        if(this.yv>(this.height)){//limita la gravita' massima raggiungibile
	        	this.yv=this.height;
	        }
	        this.y += this.yv;//apply gravity

	        for(var i = 0; i < level.length; i++) {//y collision with level
	          if(collisionBetween(this, level[i])) {
	            this.y=level[i].y-this.height;
	          }	
	        }
			for(var i = 0; i < entity.length; i++) {//y collision with entities that are solid (ostacolo e piattaforma)
				if(entity[i].life>0 && (entity[i].type=="ostacolo" || entity[i].type=="piattaforma")){
              if(((this.y+this.height)>entity[i].y)&&((this.y+this.height)<entity[i].y+19)&&(collisionBetween(this,entity[i]))) {
		            this.y=entity[i].y-this.height;
		          }
		        }
	        }	        		        
	        
			if(collisionBetween(this, player)) {//quando il player lo raccoglie
				this.life=-1;
			}
        }//fine di physics              
      }

      function newPickUp_WeaponEnergy(usageRecuparato) {
        this.life= 9999999999;
        this.type= "pickup";
        this.damage= 0;
        this.usageRestore=usageRecuparato;
        this.x= 0;
        this.y= 0;
        this.yv = 0;
        this.width= 20;
        this.height= 20;
        this.isInWater = false;
        this.canSelfDraw=true;
        this.hasPhysics=true;
        this.selfDraw= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){//funzione per disegnare l'entita
        	ctx.fillStyle = "#003ef0";
        	ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
        	ctx.fillStyle = "#3AB7D4";
			ctx.fillRect(xdisegnata+2, ydisegnata+2, this.width-4, this.height-4);
        	ctx.fillStyle = "#ff7c00";
        	ctx.fillRect(xdisegnata, ydisegnata-1.5+this.height/2, this.width, 3);			
        }//fine di selfDraw
        this.physics= function( xdisegnata, ydisegnata, indiceDiQuestaEntity){
	      var gravityApplicata = 0; var frizioneApplicata = 0;
	        if (this.y > level.waterLevel){  //determina se sei in acqua o no
	            if (!this.isInWater){
	                this.isInWater = true;
	                this.yv = 0;
	            }
	            gravityApplicata = level.gravityWater;
	            frizioneApplicata = level.frictionWater;
	        }else{
	            this.isInWater = false;
	            gravityApplicata = level.gravity;
	            frizioneApplicata = level.friction;            
	        }      
	        this.yv += gravityApplicata;//get level gravity
	        if(this.yv>(this.height)){//limita la gravita' massima raggiungibile
	        	this.yv=this.height;
	        }
	        this.y += this.yv;//apply gravity

	        for(var i = 0; i < level.length; i++) {//y collision with level
	          if(collisionBetween(this, level[i])) {
	            this.y=level[i].y-this.height;
	          }	
	        }
			for(var i = 0; i < entity.length; i++) {//y collision with entities that are solid (ostacolo e piattaforma)
				if(entity[i].life>0 && (entity[i].type=="ostacolo" || entity[i].type=="piattaforma")){
		          if(((this.y+this.height)>entity[i].y)&&((this.y+this.height)<entity[i].y+19)&&(collisionBetween(this,entity[i]))) {
		            this.y=entity[i].y-this.height;
		          }
		        }
	        }	        		        
	        
    			if(collisionBetween(this, player)) {//quando il player lo raccoglie
    				this.life=-1;
    				if(levelDefeated!="false,false,false,false,false,false,false,false"){
    					for(;this.usageRestore>0;){
    						if(player.activePower!=0){
    							if(player.power[player.activePower-1].usage<player.power[player.activePower-1].usageMax){
    								this.usageRestore--;
    								player.power[player.activePower-1].usage++;	
    							}else{
    								for(i=0;i<9;i++){
    									if(i!=8){
    										if(levelDefeated[i]){
    											if(player.power[i].usage<player.power[i].usageMax){
    												this.usageRestore--;
    												player.power[i].usage++;
    												break;	
    											}									
    										}
    									}else{this.usageRestore=-1;}
    								}
    							}
    						}else{
    							for(i=0;i<9;i++){
    								if(i!=8){
    									if(levelDefeated[i]){
    										if(player.power[i].usage<player.power[i].usageMax){
    											this.usageRestore--;
    											player.power[i].usage++;
    											break;	
    										}
    									}
    								}else{this.usageRestore=-1;}					
    							}						
    						}
    					}
    				}
    			}
        }//fine di physics              
      }                         
      			
  //start the engine
  window.onload = start;
            
  //this function is called at the start
	function start() {
    var player = new Player(); //creo il player
    update();
	}
	
  function nuovoLivello(){	//azzera i dati del player e carica un nuovo livello (da stringa e non da file...)
		player = new Player();
		leggiLivelloDaFile();
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
      disegnaSchermoDiGioco(true); //ATTENZIONE: se le viene passato true oltre a disegnare le entita' calcola anche le lore physics
      playerPhysics(player, level); //chiama la funzione physics del player
    }
  }
      
      function disegnaSchermoDiGioco(doEntityPhysics){
          ctx.clearRect(0, 0, canvas.width, canvas.height);	//pulisci tutto il canvas
          drawBackgroundImage();
          drawLvl(level.background);//disegna i blocchi non materiali che colorano lo sfondo (passa false come isDrawingWater - non disegna l'acqua)
          drawLvl(level);//disegna i blocchi fisici del livello (passa false come isDrawingWater - non disegna l'acqua)
          drawHUD(); //if you move drawHUD() under playerPhysics() the HUD will always be drawn on top of everything, but i like it this way. Entities and the player are more important then the hud lol
          drawEntity(doEntityPhysics); //in questa funzione viene chiamata anche il metodo entity[i].physics per le entità che vengono disegnate su schermo (le uniche che carico)
          drawPlayer(); //disegna il player
          drawLvl(level.foreground);//disegna i blocchi non materiali che stanno sopra tutto il resto (effetto grafico) e il waterlevel (passa true a isDrawingWater)
          drawWater();
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
        var xdisegnata=xDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull asse x
        var ydisegnata=yDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull'asse y  
        //ombre del dash
        if (player.speed>player.defaultspeed){
            if (player.xv < -10){
                player.disegnaPlayer(xdisegnata-50, ydisegnata+3, player.width-3, player.height-6,false,player.color1+'AA',player.color2,player.coloreArmatura);
                player.disegnaPlayer(xdisegnata-26, ydisegnata+1, player.width-1, player.height-2,false,player.color1,player.color2,player.coloreArmatura);
            }else if (player.xv > 10){
               player.disegnaPlayer(xdisegnata+50+3, ydisegnata+3, player.width-3, player.height-6,false,player.color1+'AA',player.color2,player.coloreArmatura);
               player.disegnaPlayer(xdisegnata+26+1, ydisegnata+1, player.width-1, player.height-2,false,player.color1,player.color2,player.coloreArmatura);
            }
        }
		    //ora disegna effettivamente il player
        //ctx.fillStyle = player.color1+"80"; ctx.fillRect(xdisegnata, ydisegnata, player.width, player.height); //hitbox */
        player.disegnaPlayer(xdisegnata,ydisegnata,player.width,player.height,true,player.color1,player.color2,player.coloreArmatura);        
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
        }
      }

      function drawHUD(){
        if(debugMode){
          ctx.font = "small-caps bold 12px Lucida Console";
          altezzaTesto=ctx.measureText("O").width+3;
			    ctx.textAlign = "right";
			    disegnaTestoConBordino("DEBUGMODE Level:"+lvlNumber, canvasWidth-3, canvasHeight-3,"#d2d2d2","#000000");
          ctx.textAlign = "left";
          disegnaTestoConBordino("player.activePower:"+player.activePower, 10, 49,"#d2d2d2","#000000");
          disegnaTestoConBordino("player.life:"+player.life+" max:"+player.lifeMax, 10, 50+altezzaTesto,"#d2d2d2","#000000");
          if(player.activePower>0){disegnaTestoConBordino("power.usage:"+player.power[player.activePower-1].usage+" max:"+player.power[player.activePower-1].usageMax, 10, 50+altezzaTesto*2,"#d2d2d2","#000000");}
          disegnaTestoConBordino("last key pressed:"+ultimoTastoLetto, 3, canvasHeight-3-altezzaTesto,"#d2d2d2","#000000");
          disegnaTestoConBordino("player.activeShot:"+player.activeShot, 3, canvasHeight-3-altezzaTesto*2,"#d2d2d2","#000000");
          disegnaTestoConBordino("player.invulnerability:"+player.invulnerability, 3, canvasHeight-3-altezzaTesto*3,"#d2d2d2","#000000");          
          disegnaTestoConBordino("player.x:"+Math.round(player.x)+" player.y:"+Math.round(player.y), 3, canvasHeight-3,"#d2d2d2","#000000");
        }//fine debugMode       
      	var barLenght=16*6+40;
      	var barHeight=30;
		    if(player.activePower!=0){//barra potere - la disegno prima cosi' va sotto
	      	ctx.fillStyle = player.color1;
    			ctx.fillRect(8, 8+barHeight-5, barLenght-4-1, 16-1);
    			ctx.fillStyle = '#3d3b3b';
    			ctx.fillRect(10, 10+barHeight-5, barLenght-4, 16);
    			lineWidth=((barLenght-10)/player.power[player.activePower-1].usageMax)-1;
    			for (i=0; i < player.power[player.activePower-1].usageMax; i++){ //disegno le barre della vita
    				if (i < player.power[player.activePower-1].usage){
    					ctx.fillStyle = player.power[player.activePower-1].color1;
    				}else{
    					ctx.fillStyle = '#909090';
    				}
    				ctx.fillRect(13+(i*(lineWidth+1)), 15+barHeight-5, lineWidth, 8);
    			}
    		}      	
      	ctx.fillStyle = player.color1;
    		ctx.fillRect(8, 8, barLenght-1, barHeight-1);
    		ctx.fillStyle = '#3d3b3b';
    		ctx.fillRect(10, 10, barLenght, barHeight);		
    		ctx.beginPath();//ora inizio a disegnare la x che sara' del colore del player attivo
    		ctx.lineWidth = "7";
    		ctx.strokeStyle = player.color2;
    		ctx.moveTo(15, 15);
    		ctx.lineTo(35, 35);
    		ctx.moveTo(35, 15);
    		ctx.lineTo(15, 35);
    		ctx.stroke(); // Disegna il contorno della X
    		ctx.lineWidth = "5";
    		ctx.strokeStyle = player.color1;
    		ctx.stroke(); // Disegna la parte interna della X
    		if(player.lifeMax>16){
    			if(player.life>16){
    				for (i=16; i < player.lifeMax; i++){ //disegno le barre della vita
    					if (i < player.life){
    						ctx.fillStyle = player.charge2color;
    					}else{
    						ctx.fillStyle = '#909090';
    					}
    					ctx.fillRect((i-16)*6+43, 14, 5, 21);	
    				}
    				for (i=0; i<16; i++){ //disegno le barre della vita
    					if(i+16>player.lifeMax-1){
    						ctx.fillStyle = player.charge0color;
    						ctx.fillRect(i*6+43, 17, 5, 18);							
    					}else{				
    						if(i+16>player.life-1){
    							ctx.fillStyle = player.charge0color;
    							ctx.fillRect(i*6+43, 17, 5, 18);
    						}
    						
    					}
    				}
    			}else{
    				for (i=16; i < player.lifeMax; i++){
    					ctx.fillStyle = '#707070';
    					ctx.fillRect((i-16)*6+43, 14, 5, 21);	
    				}
    				for (i=0; i < 16; i++){ //disegno le barre della vita
    					if (i < player.life){
    						ctx.fillStyle = player.charge0color;
    					}else{
    						ctx.fillStyle = '#909090';
    					}
    					//ctx.fillRect(i*6+43, 15, 5, 20);
    					ctx.fillRect(i*6+43, 17, 5, 18);
    				}				
    			}					
    		}else{
    			for (i=0; i < player.lifeMax; i++){ //disegno le barre della vita
    				if (i < player.life){
    					ctx.fillStyle = player.charge0color;
    				}else{
    					ctx.fillStyle = '#808080';
    				}
    				ctx.fillRect(i*6+43, 15, 5, 20);
    			}
    		}       		
	  }//fine drawHUD    
      
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
            
      
      function playerPhysics(p1, lvl) {//this function handles the platformer physics - in realta' solo del player
      var gravityApplicata = 0; var frizioneApplicata = 0;
        if (p1.y > level.waterLevel){  //determina se sei in acqua o no
            if (!p1.isInWater){
                p1.isInWater = true;
                p1.yv = 0;
            }
            gravityApplicata = level.gravityWater;
            frizioneApplicata = level.frictionWater;
        }else{
            p1.isInWater = false;
            gravityApplicata = level.gravity;
            frizioneApplicata = level.friction;            
        }
                
        p1.yv += gravityApplicata;//get level gravity
        p1.y += p1.yv;//apply gravity
                        
        for(var i = 0; i < lvl.length; i++) {//y collision con level
          if(collisionBetween(p1, lvl[i])) {
            p1.y += -p1.yv;
            p1.yv = 0;            
            if(keys[dashkey] && player.canMove && armaturaAcquired[1]) {//dash
              p1.speed=p1.defaultspeed*2.25;
            }else{
              p1.speed=player.defaultspeed;
            }            
            if(keys[jumpkey] && player.canMove) {//jump
              if(!p1.giasaltato) {
                p1.yv = -p1.jumpheight;
                p1.giasaltato = true;
              } else {
                p1.yv = 0; 
              }
            } else {
              p1.giasaltato = false;
            }
          }	
        }
        
        for(var i = 0; i < entity.length; i++) {//y collision con entity (piattaforma e ostacolo)
          if(entity[i].life>0 && entity[i].type=="piattaforma"){
            if(collisionBetween(p1, entity[i])) {
              if(((player.y+player.height)>entity[i].y)&&((player.y+player.height)<entity[i].y+19)){//collisione con y
                p1.y = entity[i].y-p1.height;
                p1.yv = entity[i].yv*1.1;            
                if(keys[dashkey] && player.canMove && armaturaAcquired[1]) {//dash
                  p1.speed=p1.defaultspeed*2.25;
                }else{
                  p1.speed=player.defaultspeed;
                }            
                if(keys[jumpkey] && player.canMove) {//jump
                  if(!p1.giasaltato) {
                    p1.yv = -p1.jumpheight;
                    p1.giasaltato = true;
                  } else {
                    p1.yv = 0; 
                  }
                } else {
                  p1.giasaltato = false;
                }
                if(entity[i].speed){
                    p1.xv += entity[i].xv;
                    if(entity[i].xv>0){if(p1.xv>entity[i].xv){p1.xv = entity[i].xv/1.85;}
                    }else{if(p1.xv<entity[i].xv){p1.xv = entity[i].xv/1.85;}}
                    p1.x -= p1.xv;                
                  for(var j = 0; j < lvl.length; j++){
                    if(collisionBetween(p1, lvl[j])) {
                      p1.x+=p1.xv*2;
                    }
                  }  
                }
              }else{//collisione con x
                p1.y += p1.slope;
                p1.x -= -p1.xv;
                if(keys[dashkey] && player.canMove && armaturaAcquired[1]) {//wall dash
                  p1.speed=p1.defaultspeed*2.25;
                }else{
                  p1.speed=player.defaultspeed;
                }           
                if(keys[jumpkey] && player.canMove) {//wall jumping
                  if(!p1.giasaltato) { 
                    p1.yv = -p1.jumpheight + 1;
                    if(p1.xv > 0) {
                      p1.xv = -9.9;
                    } else {
                      p1.xv = 9.9;
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
        }                
                       
        if(keys[destrakey] && player.canMove) {//x movement
          p1.xv -= p1.speed;
          player.facingRight = true;
        }
        if(keys[sinistrakey] && player.canMove) {
          p1.xv += p1.speed;
          player.facingRight = false;
        }
        p1.xv *= frizioneApplicata;
        p1.x += -p1.xv;
        
        if(keys[lkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) {//previous available power
            tastoGiaSchiacciato=true;
            for(i=player.activePower-1; ;i--){
                if(i==-1){ 
                  i=8;
                }else if(i==0){
                  player.activePower=0;                 
                  break;                
                }
                if(levelDefeated[i-1]){
                  player.activePower=i;
                  break;
                }
            }
            calcolaPlayerColor();
        }
                
        if(keys[rkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) {//next available power
            tastoGiaSchiacciato=true;
            for(i=player.activePower+1; ; i++){
                if(i==9){ 
                  player.activePower=0;
                  break;
                }else if(levelDefeated[i-1]){
                  player.activePower=i;
                  break;
                }
            }
            calcolaPlayerColor();
        }
                
         if(keys[sparokey] && player.canMove) {//shooting
           if(!player.giasparato){
           	 if(player.activeShot<3){//se non ci sono piu di 3 colpi attivi contemporaneamente        
	             player.giasparato = true;
	             if(player.activePower==0){
	                 var sparo = new newSparo(20,10); entity.push(sparo); 
	                 player.activeShot++;
	             }else{
	               if(player.power[player.activePower-1].usage>0){
	                 switch(player.activePower){ 
	                   /*HomingTorpedo*/   case 1: var sparo = new newHomingMissle(12,12,player.power[0].color1,player.power[0].color2,1.5); entity.push(sparo); player.activeShot=player.activeShot+1.5; player.power[player.activePower-1].usage-=0.5; break;
	                   /*ChameleonSting*/  case 2: var sparo = new newChameleonSting(15,15); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=0.5; break;
	                   /*RollingShield*/   case 3: var sparo = new newRollingShield(40,40); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=1; break;
	                   /*Fire*/            case 4: var sparo = new newFireWave(70,10); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=1; break;
	                   /*Storm*/           case 5: var sparo = new newStormTornado(player.x,(player.y+3+(15/2)),15,15,0,player.facingRight,true); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=1; break;
	                   /*Electric*/        case 6: var sparo = new newElectricSpark(15,15); entity.push(sparo); player.activeShot=player.activeShot+1; player.power[player.activePower-1].usage-=1; break;
	                   /*Boomerang*/       case 7: var sparo = new newBoomerangCutter(15,15,true); entity.push(sparo); player.activeShot=player.activeShot+1; player.power[player.activePower-1].usage-=1; break;
	                   /*ShotgunIce*/      case 8: var sparo = new newShotgunIce(player.x+player.width+6,player.x-6-15,player.y+6,15,15,true,2.5,0,player.facingRight); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=1; break;
	                 }
	               }
	             }
	       	 }
           }else{
             if(player.activePower==0 || armaturaAcquired[2]){
               player.carica++;//disegna i pallini del colore della carica intorno al player
               if (player.carica > 80){ //level 2 charge and 3
                 if (player.carica > 150 && armaturaAcquired[2]){//charge 3 - richiede armaturaAcquired[2]
   	              var xdisegnata=xDisegnata(); var ydisegnata=yDisegnata();
   	              var xrandom=((-player.width/4)+Math.floor(Math.random() * (player.width/2)))*3; var yrandom=((-player.height/4)+Math.floor(Math.random() * (player.height/2)))*2;
   	              ctx.fillStyle = player.charge3color;
   	              ctx.fillRect(xdisegnata+(player.width/2)+xrandom, ydisegnata+(player.height/2)+yrandom, 8, 8);              	
                 }else{//charge 2
   	              var xdisegnata=xDisegnata(); var ydisegnata=yDisegnata();
   	              var xrandom=((-player.width/4)+Math.floor(Math.random() * (player.width/2)))*3; var yrandom=((-player.height/4)+Math.floor(Math.random() * (player.height/2)))*2;
   	              ctx.fillStyle = player.charge0color;
   	              ctx.fillRect(xdisegnata+(player.width/2)+xrandom, ydisegnata+(player.height/2)+yrandom, 8, 8);
                 }
               }else if(player.carica > 25){ //level 1 charge
                 var xdisegnata=xDisegnata(); var ydisegnata=yDisegnata();
                 var xrandom=((-player.width/4)+Math.floor(Math.random() * (player.width/2)))*3; var yrandom=((-player.height/4)+Math.floor(Math.random() * (player.height/2)))*2;
                 ctx.fillStyle = player.charge1color;
                 ctx.fillRect(xdisegnata+(player.width/2)+xrandom, ydisegnata+(player.height/2)+yrandom, 8, 8);
               }   
             }
           }
         }else{
           if (player.giasparato){
 	          if (player.canMove){
 	          	if(player.activeShot<3){//se non ci sono piu di 3 colpi attivi contemporaneamente        
	               if(player.activePower==0){//default power
	     	            if (player.carica > 80){
	                     player.activeShot++;
	     	            	if (player.carica > 150 && armaturaAcquired[2]){//charge 3 shoot
  	     	            		var latoCubottiSparo=15;
    	     				        if(player.facingRight){
    	     				        	var sparo = new newSparoCharge3((player.x+player.width+6),(player.y+3+(latoCubottiSparo/2)),latoCubottiSparo,latoCubottiSparo,0,player.facingRight,true);
    	     				        	var sparoInvisibile = new newSparo(1,55); //gestisce activeShot per lo sparoCharge3
    	     				        	sparoInvisibile.x=(player.x+player.width+6);
    	     				        }else{
    	     				        	var sparo = new newSparoCharge3((player.x-6-latoCubottiSparo),(player.y+3+(latoCubottiSparo/2)),latoCubottiSparo,latoCubottiSparo,0,player.facingRight,true);
    	     				        	var sparoInvisibile = new newSparo(1,55);
    	     				        	sparoInvisibile.x=(player.x-6-latoCubottiSparo);				        	
    	     				        }
	     		                sparo.color= player.charge3color;
	     		                sparoInvisibile.color= "#00000000";//sono 8 zeri invece che 6, gli ultimi due indicano il canale alpha(trasparenza)
	     		                sparoInvisibile.damage=sparo.damage;
	     		                sparoInvisibile.speed=sparo.speed;
    	     			        sparoInvisibile.y=sparo.startingY-20;
    	     			        sparoInvisibile.canPassWall=true;		                
	     		                entity.push(sparo);
	     		                entity.push(sparoInvisibile);
  	     	            		var latoCubottiSparo=15;
    	     				        if(player.facingRight){
    	     				        	var sparo = new newSparoCharge3((player.x+player.width+6),(player.y+3+(latoCubottiSparo/2)),latoCubottiSparo,latoCubottiSparo,0,player.facingRight,false);			        	
    	     				        }else{
    	     				        	var sparo = new newSparoCharge3((player.x-6-latoCubottiSparo),(player.y+3+(latoCubottiSparo/2)),latoCubottiSparo,latoCubottiSparo,0,player.facingRight,false);
    	     				        }
  	     		              	sparo.color= player.charge3color;
	     		                entity.push(sparo);		                	                            		
	     	             }else{//charge 2 shoot
	     	            	var sparo = new newSparo(50,25);
	     	                sparo.y= sparo.y-7;
	     	                sparo.color= player.charge2color;
	     	                sparo.damage=3;
	     	                sparo.perforation=true;
	     	                entity.push(sparo);
	     	             }
	     	            }else if (player.carica > 25){//charge 1 shoot
	                     player.activeShot++;
	     	            	var sparo = new newSparo(35,15);
	     	              	sparo.y= sparo.y-2;
	     	              	sparo.damage=2;
	     	            	sparo.color= player.charge1color;
	     	            	entity.push(sparo);
	     	            }
	     	            player.carica=0;
	     	            player.giasparato=false;
	               }else{
	                   if (player.carica > 150 && armaturaAcquired[2]){
	                       switch(player.activePower){//poteri caricati
	                         /*HomingTorpedo*/case 1: if(player.power[player.activePower-1].usage>2){var sparo = new newHomingMissle(18,18,"#3d85c6","#fa8cff",3); sparo.damage=2; entity.push(sparo); player.activeShot=player.activeShot+3;
                                   var sparo = new newHomingMissle(18,18,"#3d85c6","#fa8cff",0); sparo.y+=-15; sparo.damage=2; entity.push(sparo);
                                   var sparo = new newHomingMissle(18,18,"#3d85c6","#fa8cff",0); sparo.y+=15; sparo.damage=2; entity.push(sparo);
                                   var sparo = new newHomingMissle(18,18,"#3d85c6","#fa8cff",0); sparo.y+=-30; sparo.damage=2; entity.push(sparo);                                                                      
                                   player.power[player.activePower-1].usage-=3;} break;
	                         /*ChameleonSting*/case 2: if(player.power[player.activePower-1].usage>3.5 && player.invulnerability<90000){player.invulnerability=91000; player.canChangeWeap=false; player.power[player.activePower-1].usage-=4;} break; 
	                         /*RollingShield*/case 3: if(player.power[player.activePower-1].usage>1){ player.power[player.activePower-1].usage-=2; player.canChangeWeap=false; var sparo = new newRollingShieldCharge3(100,100);entity.push(sparo); player.activeShot=player.activeShot+3; }break;
	                         /*FireWave*/case 4: if(player.power[player.activePower-1].usage>2){var sparo = new newFireWaveCharge3Main(20,20); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=3;} break;
	                         /*StormTornado*/case 5: if(player.power[player.activePower-1].usage>1){player.power[player.activePower-1].usage-=2;var sparo=new newStormTornadoCharge3(player.x,player.y+6,60,15,player.facingRight,0,true); entity.push(sparo);player.activeShot=player.activeShot+3;} break;
	                         /*ElectricSpark*/case 6: if(player.power[player.activePower-1].usage>1){player.activeShot=player.activeShot+3;
                                  if(player.facingRight){
                                    var sparo = new newElectricSparkCharge3(player.x+player.width+6,player.y+9,16,100,player.facingRight); entity.push(sparo);
                                    var sparo = new newElectricSparkCharge3(player.x+player.width+6,player.y+9,16,100,!player.facingRight); entity.push(sparo);
                                  }else{
                                    var sparo = new newElectricSparkCharge3(player.x-6-16,player.y+9,16,100,player.facingRight); entity.push(sparo);
                                    var sparo = new newElectricSparkCharge3(player.x-6-16,player.y+9,16,100,!player.facingRight); entity.push(sparo);
                                  }player.power[player.activePower-1].usage-=2;} break;
	                         /*BoomerangCut*/case 7: if(player.power[player.activePower-1].usage>1){player.power[player.activePower-1].usage-=2; player.activeShot=player.activeShot+3;
                                  var sparo = new newBoomerangCutterCharge3(30,30,0,true); entity.push(sparo);
                                  var sparo = new newBoomerangCutterCharge3(30,30,1,false); entity.push(sparo);
                                  var sparo = new newBoomerangCutterCharge3(30,30,2,true); entity.push(sparo);
                                  var sparo = new newBoomerangCutterCharge3(30,30,3,false); entity.push(sparo);
                                  } break;
	                         /*ShotgunIce*/case 8: if(player.power[player.activePower-1].usage>1){var sparo = new newShotgunIceCharge3(60,20); entity.push(sparo); player.activeShot=player.activeShot+3; player.power[player.activePower-1].usage-=2;} break;                                                    
	                       }
	                   } 
	     	            player.giasparato=false;
                    player.carica=0;                  
	               } 
	         	}else{player.carica=0;}
 	         }else{player.carica=-9999999999999;}
          }
        }

       p1.slope = 0;	//serve per i bordi tipo - serve anche per le collision
       for(var i = 0; i < lvl.length; i++) {
         if(collisionBetween(p1, lvl[i])) {
           if(p1.slope != -8) {
             p1.y -= 1;
             p1.slope += 1;
           }
         }
       }

       	for(var i = 0; i < lvl.length; i++) {//x collision
          if(collisionBetween(p1, lvl[i])) {
            p1.y += p1.slope;
            p1.x -= -p1.xv;
            if(keys[dashkey] && player.canMove && armaturaAcquired[1]) {//wall dash
              p1.speed=p1.defaultspeed*2.25;
            }else{
              p1.speed=player.defaultspeed;
            }           
            if(keys[jumpkey] && player.canMove) {//wall jumping
              if(!p1.giasaltato) { 
                p1.yv = -p1.jumpheight + 1;
                if(p1.xv > 0) {
                  p1.xv = -9.9;
                } else {
                  p1.xv = 9.9;
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
      
		for(var i = 0; i < entity.length; i++) {//contatto con entita'
			if(entity[i].life > 0 && !(entity[i].type=="sparoDelPlayer")) {
	            if(collisionBetween(player, entity[i])) {
	            	if(entity[i].damage>0){
        				if (player.invulnerability < 1){//entity collison								            		
							      player.color1=player.damagedColor;
				            player.color2=player.damagedColor;
				            player.coloreArmatura=player.damagedColor;
				            if(armaturaAcquired[3]&&(entity[i].damage>1)){
				              player.life=player.life-(entity[i].damage-1);
				            }else{
				              player.life=player.life-entity[i].damage;
				            }
						    player.invulnerability=40;
						    player.canMove=false;
						    break;
					    }
	            	}else{//qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
	            		if((player.life-entity[i].damage) > player.lifeMax){
	            			var vitaRecuperabile=(0-entity[i].damage)-(player.lifeMax-player.life);
	            			player.life=player.lifeMax;
	            			for (j=0; j<4; j++){//qui inizia a riempire le subtank
	            				if(subtank[j].acquired){
	            					if((subtank[j].life+vitaRecuperabile)>subtank[j].lifeMax){
										vitaRecuperabile=vitaRecuperabile-(subtank[j].lifeMax-subtank[j].life);
	            						subtank[j].life=subtank[j].lifeMax;
	            						i++;
	            					}else{
	            						subtank[j].life=subtank[j].life+vitaRecuperabile;
	            						break;
	            					}
	            				}
	            			}
	            		}else{
	            			player.life=player.life-entity[i].damage;
	            		}
	            	}
	           	}
	       	}
	    }
       	if(player.invulnerability > 0){//se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
       		player.invulnerability--;
          if(player.invulnerability==90000){player.invulnerability=5; player.canChangeWeap=true;}//fine sting cham charge3
          if(player.invulnerability > 90000){//potere di sting chameleon charge3
            calcolaPlayerColor();
          }
       		if (player.invulnerability < 30){
              calcolaPlayerColor();
         			player.color1=player.color2;
              player.color2=player.color2;
              player.coloreArmatura=player.color2;
       		}
       		if (player.invulnerability < 20){
       			  player.canMove=true;
       		}       		
       		if (player.invulnerability < 5){
              calcolaPlayerColor();
            	player.coloreArmatura=player.defaultColoreArmatura;                 			
       		}	
       	}
      	
      	if(player.life<1){//gameover
      		disegnaSchermoDiGioco(false);
      		objAlert = new newAlert("Gameover",1); gamestate=5;
      	}
        
        if(keys[startkey]) {//menu di pausa
          if (!tastoGiaSchiacciato && !(player.life<1)){//ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
             if (player.canChangeWeap){ //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
              objMenuDiPausa=new newMenuDiPausa();
              disegnaSchermoDiGioco(false);
              tastoGiaSchiacciato=true;
              gamestate=2;
            }else{objAlert = new newAlert("pause",-1); gamestate=5;}
          }
        }
        
        if(player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])){ //azzera tasto gia schiacciato
          tastoGiaSchiacciato=false;
        }
        
        function calcolaPlayerColor(){//calcola i colori attivi del player
          if (player.invulnerability < 90000){//se non e' stingCham charge3 
            if (player.activePower==0){
                    player.color1=player.defaultColor1;
                    player.color2=player.defaultColor2;                               
            }else{
                    player.color1=player.power[player.activePower-1].color1;
                    player.color2=player.power[player.activePower-1].color2;  
            }
          }else{//se invece stingCham charge3
            var colorNumber=player.invulnerability-90000;
            if (colorNumber>950){       player.color1="#ff1100"; player.color2="#ffa7a1";            
            }else if (colorNumber>900){ player.color1="#ff9500"; player.color2="#ffcc85";
            }else if (colorNumber>850){ player.color1="#ffe400"; player.color2="#fff38d";            
            }else if (colorNumber>800){ player.color1="#aaff00"; player.color2="#d8ff8c";
            }else if (colorNumber>750){ player.color1="#00ffb3"; player.color2="#a8ffe5";
            }else if (colorNumber>700){ player.color1="#00b9ff"; player.color2="#bbecff";            
            }else if (colorNumber>650){ player.color1="#6100ff"; player.color2="#b78aff";            
            }else if (colorNumber>600){ player.color1="#e800ff"; player.color2="#fac6ff";           
            }else if (colorNumber>550){ player.color1="#ff1100"; player.color2="#ffa7a1";
            }else if (colorNumber>500){ player.color1="#ff0084"; player.color2="#ffc7e4";
            }else if (colorNumber>450){ player.color1="#ff9500"; player.color2="#ffcc85";
            }else if (colorNumber>400){ player.color1="#ffe400"; player.color2="#fff38d";            
            }else if (colorNumber>350){ player.color1="#aaff00"; player.color2="#d8ff8c";
            }else if (colorNumber>300){ player.color1="#00ffb3"; player.color2="#a8ffe5";
            }else if (colorNumber>250){ player.color1="#00b9ff"; player.color2="#bbecff";            
            }else if (colorNumber>200){ player.color1="#6100ff"; player.color2="#b78aff";            
            }else if (colorNumber>150){ player.color1="#e800ff"; player.color2="#fac6ff";           
            }else if (colorNumber>100){ player.color1="#ff0084"; player.color2="#ffc7e4";                       
            }else{player.color1=player.power[player.activePower-1].color1; player.color2=player.color2=player.power[player.activePower-1].color2;}
            player.coloreArmatura="#303030";         
          }
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

      function stageSelect(){
          var img = new Image();
          img.src = "data:image/jpeg;base64,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";
          ctx.drawImage(img, 0, 0, canvasWidth,canvasHeight);
            //leggo che tasto viene schiacciato. Con invio o dash si inizia a giocare, con le freccie si cicla tra i livelli
            if ((keys[dashkey]) && !tastoGiaSchiacciato){//avvia il livello selezionato
              gamestate=-1;
              nuovoLivello();
            }
            if ((keys[startkey]) && !tastoGiaSchiacciato){//apre le opzioni di scelta livello
              objMenuOpzioniStageSelect=new newMenuOpzioniStageSelect();
              tastoGiaSchiacciato=true;
              gamestate=4;
            }                                       
            if (keys[sukey] && !tastoGiaSchiacciato){
             if(lvlNumber==4){lvlNumber=8; }else if(lvlNumber==5){lvlNumber=3;}else if(lvlNumber==6){lvlNumber=1;}else if(lvlNumber==7){lvlNumber=4;}else if(lvlNumber==3){lvlNumber=1;}else if(lvlNumber==2){lvlNumber=8;}             
            }
            if (keys[giukey] && !tastoGiaSchiacciato){
             if(lvlNumber==1){lvlNumber=6;}else if(lvlNumber==5){lvlNumber=6;}else if(lvlNumber==3){lvlNumber=5;}else if(lvlNumber==8){lvlNumber=2;}else if(lvlNumber==7){lvlNumber=2;}else if(lvlNumber==4){lvlNumber=7;}                      
            }
            if (keys[sinistrakey] && !tastoGiaSchiacciato){
             if(lvlNumber==2){lvlNumber=6;}else if(lvlNumber==7){lvlNumber=5;}else if(lvlNumber==4){lvlNumber=3;}else if(lvlNumber==8){lvlNumber=1;}else if(lvlNumber==1){lvlNumber=3;}else if(lvlNumber==6){lvlNumber=5;}                 
            }
            if (keys[destrakey] && !tastoGiaSchiacciato){
             if(lvlNumber==1){lvlNumber=8;}else if(lvlNumber==2){lvlNumber=7;}else if(lvlNumber==5){lvlNumber=7;}else if(lvlNumber==6){lvlNumber=2;}else if(lvlNumber==3){lvlNumber=4;}else if(lvlNumber==8){lvlNumber=4;} 
            }            
            if(keys[destrakey] || keys[sinistrakey] || keys[giukey] || keys[sukey] || keys[startkey] || keys[dashkey]){ //serve per evitare che in un attimo ti sposti di un bordello di livelli 
                   tastoGiaSchiacciato=true;
            }else{ tastoGiaSchiacciato=false;}
            
            //ora disegno un quadrato intorno al livello selezionato
            if (levelDefeated[lvlNumber-1]){
                 ctx.fillStyle = "#b7a4a6";    //se il livello selezionato e' stato battuto fa il quadrato rosso
            }else{
                ctx.fillStyle = "#ffc000";    //se il livello selezionato non e' stato battuto fa il quadrato giallo
            }            
            switch (lvlNumber){
              case 1:ctx.fillRect(137, 10, 135, 10);ctx.fillRect(137, 10, 10, 135);ctx.fillRect(137, 135, 135, 10);ctx.fillRect(263, 10, 10, 135);break;                
              case 8:ctx.fillRect(265, 10, 135, 10);ctx.fillRect(265, 10, 10, 135);ctx.fillRect(265, 135, 135, 10);ctx.fillRect(391, 10, 10, 135);break;                
              case 4:ctx.fillRect(395, 140, 135, 10);ctx.fillRect(395, 140, 10, 135);ctx.fillRect(395, 265, 135, 10);ctx.fillRect(521, 140, 10, 135);break;                
              case 7:ctx.fillRect(395, 270, 135, 10);ctx.fillRect(395, 270, 10, 135);ctx.fillRect(395, 395, 135, 10);ctx.fillRect(521, 270, 10, 135);break;                
              case 2:ctx.fillRect(265, 396, 135, 10);ctx.fillRect(265, 396, 10, 135);ctx.fillRect(265, 521, 135, 10);ctx.fillRect(391, 396, 10, 135);break;                
              case 6:ctx.fillRect(137, 396, 135, 10);ctx.fillRect(137, 396, 10, 135);ctx.fillRect(137, 521, 135, 10);ctx.fillRect(263, 396, 10, 135);break;                
              case 5:ctx.fillRect(9, 270, 135, 10);ctx.fillRect(9, 270, 10, 135);ctx.fillRect(9, 395, 135, 10);ctx.fillRect(135, 270, 10, 135);break;                
              case 3:ctx.fillRect(9, 140, 135, 10);ctx.fillRect(9, 140, 10, 135);ctx.fillRect(9, 265, 135, 10);ctx.fillRect(135, 140, 10, 135);break;                                                                                                                
            }
      }

      function disegnaTestoConBordino(stringaDiTesto, xdisegnata, ydisegnata, coloreTesto, coloreBordino){
      	ctx.fillStyle = coloreBordino;
      	ctx.fillText(stringaDiTesto, xdisegnata+1, ydisegnata+1);
      	ctx.fillText(stringaDiTesto, xdisegnata+1, ydisegnata-1);
      	ctx.fillText(stringaDiTesto, xdisegnata-1, ydisegnata+1);
      	ctx.fillText(stringaDiTesto, xdisegnata-1, ydisegnata-1);
      	ctx.fillStyle = coloreTesto;
      	ctx.fillText(stringaDiTesto, xdisegnata, ydisegnata);
      }
      
      function newMenuDiPausa(){
        this.width=0;
        this.height=0;
        this.widthMax=canvasWidth-150;
        this.heightMax=canvasHeight-150;
        this.isOpen=false;
        this.isClosing=false;
        this.canInput=true;
        this.tornaStageSelection=false;
        this.indice=player.activePower;
        this.settore=0;
        this.usingSubtank=4; //4 vuol dire che non sto usando la subtank (da 0 a 3 e' l'indice della subtank usata)
        this.lastSubtankAcquired=4;//se rimane uguale a 4 vuol dire che non e' stata acquisita nessuna subtank
        this.drawMenuDiPausa = function (){
          ctx.textAlign = "left";
          ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
          if (!this.isOpen && !this.isClosing){//animazione di apertura del menu + lettura subtank acquisite
            if (this.width < this.widthMax){this.width+=10;}
            if (this.height < this.heightMax){this.height+=15;}
            if (this.height > this.heightMax-1 && this.width > this.widthMax-1){//quando il menu e' tutto aperto:
            	this.isOpen=true;
            	for(var j=0; j<4; j++){//legge l'indice dell'ultima subtank acquisita
            		if(subtank[j].acquired){this.lastSubtankAcquired=j;}
            	}
            }
          }
          ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
          ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
          ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
          if (this.isOpen){ //qui dentro devo mostrare il testo del menu e gestire cosa succede quando schiaccio i tasti
              ctx.fillStyle = "#d2d2d2"; 
              ctx.fillRect((canvasWidth/2)+this.width/2-250,(canvasHeight/2)-this.height/2, 15, this.height); ctx.fillRect((canvasWidth/2)+this.width/2-250,(canvasHeight/2), 250, 15); //disegna i settori del menu
              for(i=0;i<9;i++){ //disegna le scritte del settore 0 (xbuster e poteri di X)
                var xdisegnata = (canvasWidth/2)-this.width/2+13;
                var ydisegnata = ((canvasHeight/2)-this.height/2)+(44*i)-7;
                if (i-1 < 0){ //scrive xbuster
                	disegnaTestoConBordino("X Buster", xdisegnata, ydisegnata+33,"#d2d2d2","#000000");
                }else{
                  if(levelDefeated[i-1]){//disegna i poteri e le loro barre
                  	disegnaTestoConBordino(player.power[i-1].nome, xdisegnata, ydisegnata+21,player.power[i-1].color1,"#000000");
                    for (j=0; j<player.power[i-1].usageMax; j++){
                      ctx.fillStyle = '#444444'; ctx.fillRect(j*10+xdisegnata+2, ydisegnata+25, 9, 12);
                      if(player.power[i-1].usage < j+1){ctx.fillStyle = '#a7a7a7'; }else{ctx.fillStyle = player.power[i-1].color1;}
                      ctx.fillRect(j*10+xdisegnata+3, ydisegnata+25, 8, 11);
                    }
                  }
                }
              }
              for(i=0;i<5;i++){//disegna le subtank
              	var xdisegnata=(canvasWidth/2)+this.width/2-250+15;
              	var ydisegnata=((canvasHeight/2)-this.height/2)+(40*i)-6;
                if (i < 1){ //scrive Subtanks
                	ctx.textAlign = "center";
                	disegnaTestoConBordino("Subtanks", xdisegnata+(250-15)/2, ydisegnata+30,"#d2d2d2","#000000");
                }else{ //disegna le barre delle subtanks
                	ctx.textAlign = "left";
                	if (subtank[i-1].acquired){
                		disegnaTestoConBordino("S", xdisegnata+15,ydisegnata+28,"#ffc000","#000000");
                    	for (j=0; j<subtank[i-1].lifeMax; j++){
                          ctx.fillStyle = '#444444'; ctx.fillRect(j*9+xdisegnata+39, ydisegnata+12, 8, 17);
                      		if(subtank[i-1].life < j+1){ctx.fillStyle = '#a7a7a7';}else{ctx.fillStyle = '#ffc000';}
                      		ctx.fillRect(j*9+xdisegnata+40, ydisegnata+12, 7, 16);
                      	}	
                    }                	
                }              	
              }
              for(i=0;i<3;i++){//ora disegno la parte sotto le subtanks
              	ctx.textAlign = "left";
              	var xdisegnata=(canvasWidth/2)+this.width/2-250+15+10;
              	var ydisegnata=((canvasHeight/2)+15+((canvasHeight-this.height+30)/3*(i+1)))-1;
  				switch (i){
  					case 0:
  						disegnaTestoConBordino("resume game", xdisegnata+5,ydisegnata+7-((canvasHeight-this.height+30)/3)/2,"#d2d2d2","#000000");
  						break;
  
  					case 1:
  						disegnaTestoConBordino("options", xdisegnata+5,ydisegnata+7-((canvasHeight-this.height+30)/3)/2,"#d2d2d2","#000000");
  						break;
  
  					case 2:
  						disegnaTestoConBordino("return to the", xdisegnata+5,ydisegnata-2-((canvasHeight-this.height+30)/3)/2,"#d2d2d2","#000000");
  						disegnaTestoConBordino("level selection", xdisegnata+5,ydisegnata+15-((canvasHeight-this.height+30)/3)/2,"#d2d2d2","#000000");
  						break;												
  				}
			  }
                            
              if(this.settore == 0){//disegna i quadrati intorno alla scritta scelta - parte poteri
                ctx.fillStyle = "#ffc000";
                var xdisegnata = (canvasWidth/2)-this.width/2+13;
                var ydisegnata = ((canvasHeight/2)-this.height/2)+(44*this.indice)-7;
                if (this.indice==0){
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata+5, (canvasWidth/2)+this.width/2-325, 8);
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata+40, (canvasWidth/2)+this.width/2-325, 8);
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata+5, 8, 40);
                	ctx.fillRect((canvasWidth/2)+this.width/2-258, ydisegnata+5, 8, 40);
                }else{
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata-5, (canvasWidth/2)+this.width/2-325, 8);
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata+42, (canvasWidth/2)+this.width/2-325, 8);
                	ctx.fillRect((canvasWidth/2)-this.width/2, ydisegnata-5, 8, 51);
                	ctx.fillRect((canvasWidth/2)+this.width/2-258, ydisegnata-5, 8, 51);
                }
              }else if(this.settore == 1){//disegna i quadrati intorno alla scritta scelta - parte subtank e sotto subtank
              	if (this.indice < 4){//disegna quadrati del settore subtank
              		ctx.fillStyle = "#ffc000";
              		var xdisegnata=(canvasWidth/2)+this.width/2-250+15;
              		var ydisegnata=((canvasHeight/2)-this.height/2)+(40*(this.indice+1))-6;
                	ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
                	ctx.fillRect(xdisegnata, ydisegnata+32, 235, 9);
                	ctx.fillRect(xdisegnata, ydisegnata, 9, 40);
                	ctx.fillRect(xdisegnata+235-9, ydisegnata, 9, 40);              	
                }else{//disegna quadrati della parte sotto le subtank
                	ctx.fillStyle = "#ffc000";
					var xdisegnata=(canvasWidth/2)+this.width/2-250+15;
              		var ydisegnata=((canvasHeight/2)+15+((canvasHeight-this.height+30)/3*(this.indice-4)))-1;
                	ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
                	ctx.fillRect(xdisegnata, ydisegnata+((canvasHeight-this.height+30)/3-8), 235, 9);
                	ctx.fillRect(xdisegnata, ydisegnata, 9, ((canvasHeight-this.height+30)/3-8));
                	ctx.fillRect(xdisegnata+235-9, ydisegnata, 9, ((canvasHeight-this.height+30)/3-8));              		
                }
              }
              if(this.usingSubtank < 4){//se il menu e' impostato nell'usare una subtank:
              	if(subtank[this.usingSubtank].life > 0){
              		subtank[this.usingSubtank].life-=0.5;
              		if(player.life<player.lifeMax){
              			player.life+=0.5; drawHUD();
              		}
              	}else{//esce dallo stato di depleting della subtank
              		this.usingSubtank=4;
              		this.canInput=true;
              	}
              }              
             if(this.canInput){//cosa succede quando vengono schiacciati i tasti (solo se this e' in lettura di input - this.canInput)
              if((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) {//attiva la voce selezionata
              	if (this.settore==0){ // se e' nella sezione poteri, attiva il potere selezionato e chiude il menu
                  player.activePower=this.indice;
                  if (player.activePower==0){
                          player.color1=player.defaultColor1;
                          player.color2=player.defaultColor2;                               
                  }else{
                          player.color1=player.power[player.activePower-1].color1;
                          player.color2=player.power[player.activePower-1].color2;  
                  }                  
					        this.isClosing=true;
                	this.isOpen=false;
              	}else{ //se e' nell'altro settore fa delle cose in base all'indice
              		if(this.indice<4){//hai scelto una subtank
              			if(player.life<player.lifeMax){
              				this.usingSubtank=this.indice;
              				this.canInput=false;
              			}
              		}else{
              			switch (this.indice){
              				case 4://ritorna al gioco - chiude il menu
								        this.isClosing=true;
                				this.isOpen=false;              				
                				break;
                			case 5://opzioni
            					objMenuOpzioni=new newMenuOpzioni(this.width, this.height, true);
            					tastoGiaSchiacciato=true;
            					gamestate=3;                				
                				break;
                			case 6://torna alla selezione del livello
      								this.tornaStageSelection=true; lvlNumber=1;
      								this.isClosing=true;
      								this.isOpen=false;
                				break;
              			}
              		}
              	}
              }
              if(keys[jumpkey] && !tastoGiaSchiacciato) {//esci dal menu di pausa
                this.isClosing=true;
                this.isOpen=false;
              }              
              if(keys[giukey] && !tastoGiaSchiacciato) {
              	if (this.settore==0){//se sei nella parte a sinistra
                	for (i=1; i < 10; i++){
                  		if(levelDefeated[this.indice+i-1]){
                    		this.indice+=i;
                    		break;
                  		}else if(i == 9){ this.indice=0; break;}
                	}
                  if(this.indice==9){this.indice=0;}
                }else if (this.settore==1){//se sei nella parte a destra
                	if (this.indice<this.lastSubtankAcquired){//se sei nella parte delle subtank-1
                		for(var k=1; k<(4-this.indice); k++){
							if(subtank[this.indice+k].acquired){
								this.indice+=k;
								break;
							}
						}
                	}else if(this.indice==this.lastSubtankAcquired && this.lastSubtankAcquired!=4){//se hai selezionato l'ultima subtank disponibile e schiacci giu'
                		this.indice=4;
                	}else{//se sei nella parte sotto le subtank
                		if (this.indice<6){
                			this.indice++;
                		}
                	}
                }
              }
              if(keys[sukey] && !tastoGiaSchiacciato) {
              	if (this.settore==0){
                	if(this.indice == 0){ this.indice=9; }
                	for (i=1; i < this.indice+1; i++){
                  		if(levelDefeated[this.indice-i-1]){
                    		this.indice-=i;
                    		break;
                  		}else if(i == this.indice){ this.indice=0; break;}
                	}
                }else if (this.settore==1){//se sei nella parte a destra
                	if (this.indice<4){//se sei nella parte delle subtank
						if(this.indice>0){
							for(var k=1; k<this.indice+1;k++){
								if(subtank[this.indice-k].acquired){
									this.indice-=k;
									break;
								}
							}
						}
                	}else{
                		if (this.indice>4){//se sei nel menu tutto ok
                			this.indice--;
                		}else{//schiacci su e ti stai spostando nelle subtank - devo vedere che io ne possegga almeno una
							this.indice=this.lastSubtankAcquired;
                		}
                	}
                }                                
              }
              if(keys[destrakey] && !tastoGiaSchiacciato) {
				for (var j=0; j<4; j++){
					if(subtank[j].acquired){
						this.indice=j;
						break;
					}else{
						this.indice=4;
					}
				}
                this.settore=1;
              }
              if(keys[sinistrakey] && !tastoGiaSchiacciato) {
                this.indice=0;
                this.settore=0;
              }
              if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                tastoGiaSchiacciato=true;
              }else{
                tastoGiaSchiacciato=false;
              }
          }              
         }
          if(this.isClosing){//animazione di chiusura del menu + regolazione delle subtanks
              if (this.width > 0){this.width-=20;}
              if (this.height > 0){this.height-=20;}
              ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
              disegnaSchermoDiGioco(false);
              ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
              ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
              if (this.height-1 < 0 && this.width-1 < 0){//quando il menu e' tutto chiuso:
              	gamestate=-1;
              	if(this.tornaStageSelection){gamestate=1;}
              	var sommaSubtank=0;//aggiusto la vita delle subtank (la metto tutta nelle prime subtank disponibili)
        				for (var j=0; j<4; j++){//azzero tutte le subtank e carico tutta la vita per ridistribuirla nel prossimo for
        					if (subtank[j].acquired){
        						sommaSubtank+=subtank[j].life;
        						subtank[j].life=0;
        					}
        				}
                if(sommaSubtank>0){//ridistribuisco la vita alle subtank dalla prima all'ultima
          				for (var j=0; j<4; j++){
                    if(subtank[j].life<subtank[j].lifeMax && subtank[j].acquired){
  			              if (sommaSubtank>(subtank[j].lifeMax-subtank[j].life)){
                        sommaSubtank-=(subtank[j].lifeMax-subtank[j].life);
                        subtank[j].life=subtank[j].lifeMax;
                      }else{
                        subtank[j].life+=sommaSubtank;
                        sommaSubtank=0;
                      }
            				}
                  }
                }
             }             
          }
        }     
      }//fine menu di pausa       
	
  function newMenuOpzioniStageSelect(){
	      this.isOpen=false;
        this.isClosing=false;
        this.apriLivello=false;
        this.confermaUscita=false;
        this.loadCostumLevel=false;
        this.costumLevelString="";
        this.width=0;
        this.height=0;
        this.widthMax=canvasWidth-440;
        this.heightMax=canvasHeight-400;
        this.indice=0;
        this.indiceUscita=0;
        this.numeroDiVoci=4;
        this.staCambiandoTasto=false;
        this.drawMenu = async function (){
          if (!this.isOpen && !this.isClosing){//animazione di apertura del menu
            if (this.width < this.widthMax){this.width+=10;}
            if (this.height < this.heightMax){this.height+=15;}
            if (this.height > this.heightMax-1 && this.width > this.widthMax-1){//quando il menu e' tutto aperto:
            	this.isOpen=true;
            }
          }
          ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
		      ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
          ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde

          if(this.isOpen){ //quando il menu e' tutto aperto
            if (!this.confermaUscita && !this.loadCostumLevel){//se non e' attivo il conferma uscita e non e' un costum level - caso del menu normale
                ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
                for(var i=0;i<this.numeroDiVoci;i++){//disegno tutte le scritte
                  var ydisegnata=6+((canvasHeight/2)-(this.height/2))+(((this.height)/this.numeroDiVoci)*i)+(this.height/(this.numeroDiVoci*2));
                  ctx.textAlign = "center";
          				switch (i){//scrive le scritte
          					case 0:
          						disegnaTestoConBordino("open the level selected", canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
          						break;
          					case 1:
          						disegnaTestoConBordino("open a costum level", canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
          						break;                      
          					case 2:
          						disegnaTestoConBordino("save game", canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
          						break;
          					case 3:
          						disegnaTestoConBordino("back to the main menu", canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
                      break;									
          				}
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
          			}		
          			{//disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                        ctx.fillStyle = "#ffc000";
                      	var xdisegnata = (canvasWidth/2)-(this.width/2);
                      	var ydisegnata = (((canvasHeight/2)-(this.height/2))+(((this.height)/this.numeroDiVoci)*this.indice));
                      	ctx.fillRect(xdisegnata, ydisegnata, this.width, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata-9+(this.height)/this.numeroDiVoci, this.width, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height)/this.numeroDiVoci-8);
                      	ctx.fillRect(xdisegnata+this.width-9, ydisegnata, 9, (this.height)/this.numeroDiVoci-8);			
          			}
                //ora gestisco gli input
                if(keys[sukey] && !tastoGiaSchiacciato) {
        				  if(this.indice > 0){ this.indice--;
        				  }else{ this.indice=this.numeroDiVoci-1;}
                }
                if(keys[giukey] && !tastoGiaSchiacciato) {
        				    if(this.indice < this.numeroDiVoci-1){ this.indice++;
        				    }else{ this.indice=0;}
                }
                if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                  switch (this.indice){
                    case 0: //apri livello selezionato
                      this.apriLivello=true;
                      this.isClosing=true;
                      this.isOpen=false;
                      break;
                    case 1: //carica livello costum
                      document.getElementById("fileCaricaPartita").value="";
                      document.getElementById("caricaPartitaDiv").style.zIndex = "10";
                      document.getElementById("fileCaricaPartita").disabled=false;                      
                      this.indiceUscita=0;
                      this.loadCostumLevel=true;
                      break;                      
                    case 2: //salva la partita
                      SalvaPartita();
                      break;
                    case 3: //chiedi conferma uscita
                      this.indiceUscita=0;
                      this.confermaUscita=true;
                      break;
                  }
                }                            			
                if(keys[jumpkey] && !tastoGiaSchiacciato) {//chiude il menu
                  this.isOpen=false;
                  this.isClosing=true;
                }
                if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                  tastoGiaSchiacciato=true;
                }else{
                  tastoGiaSchiacciato=false;
                }
            }else if (this.confermaUscita){ //se e' attivo il conferma uscita
                ctx.textAlign = "center"; ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
                disegnaTestoConBordino("do you want to go back", (canvasWidth/2), ((canvasHeight/2)+15-this.heightMax/2),"#d2d2d2","#000000");
                disegnaTestoConBordino("to the main menu?", (canvasWidth/2), ((canvasHeight/2)+35-this.heightMax/2),"#d2d2d2","#000000");
                disegnaTestoConBordino("every progress not", (canvasWidth/2), ((canvasHeight/2)+55-this.heightMax/2),"#d2d2d2","#000000");
                disegnaTestoConBordino("saved will be lost", (canvasWidth/2), ((canvasHeight/2)+75-this.heightMax/2),"#d2d2d2","#000000");
                ctx.font = "small-caps bold 28px Lucida Console"; //tipo di font per le scritte
                for(var j=0;j<2;j++){//disegno tutte le scritte
                  ctx.textAlign = "center";
                  var ydisegnata=57+canvasHeight/2;
          				switch (j){//scrive le scritte
          					case 0:
                      var xdisegnata=(canvasWidth/2)-((this.width/4));
          						disegnaTestoConBordino("no", xdisegnata, ydisegnata,"#d2d2d2","#000000");
          						break;
          					case 1:
                      var xdisegnata=(canvasWidth/2)+((this.width/4));
          						disegnaTestoConBordino("yes", xdisegnata, ydisegnata,"#d2d2d2","#000000");
          						break;								
          				}
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
          			}		
          			{//disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                        ctx.fillStyle = "#ffc000";
                        var ydisegnata = 25+canvasHeight/2;
                        switch (this.indiceUscita){
                          case 0: xdisegnata = (canvasWidth/2)-(this.width/2); break;
                          case 1: xdisegnata = (canvasWidth/2); break;
                        }
                      	ctx.fillRect(xdisegnata, ydisegnata, this.width/2, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata-9+(this.height)/3, this.width/2, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height)/3-8);
                      	ctx.fillRect(xdisegnata+(this.width/2)-9, ydisegnata, 9, (this.height)/3-8);			
          			}
                //ora gestisco gli input
                if(keys[destrakey] && !tastoGiaSchiacciato) {
                    this.indiceUscita=1;
                }
                if(keys[sinistrakey] && !tastoGiaSchiacciato) {
                    this.indiceUscita=0;
                }
                if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                  switch (this.indiceUscita){
                    case 0: //no
                      this.confermaUscita=false;                      
                      break;
                    case 1: //si
                      objMenuPrincipale= new newMenuPrincipale(); 
                      gamestate=0;                       
                      break;
                  }
                }                            			
                if(keys[jumpkey] && !tastoGiaSchiacciato) {//chiude il menu
                  this.confermaUscita=false;
                }
                if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                  tastoGiaSchiacciato=true;
                }else{
                  tastoGiaSchiacciato=false;
                }                
            }else if (this.loadCostumLevel){ //se e' attivo il conferma uscita
                ctx.textAlign = "center"; ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
                disegnaTestoConBordino("load costum level", (canvasWidth/2), ((canvasHeight/2)+25-this.heightMax/2),"#d2d2d2","#000000");
                for(var j=0;j<2;j++){//disegno tutte le scritte
                  ctx.textAlign = "center";
                  var ydisegnata=57+canvasHeight/2;
          				switch (j){//scrive le scritte
          					case 0:
                      var xdisegnata=(canvasWidth/2)-((this.width/4));
          						disegnaTestoConBordino("confirm", xdisegnata, ydisegnata,"#d2d2d2","#000000");
          						break;
          					case 1:
                      var xdisegnata=(canvasWidth/2)+((this.width/4));
          						disegnaTestoConBordino("cancel", xdisegnata, ydisegnata,"#d2d2d2","#000000");
          						break;								
          				}
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
          			}		
          			{//disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                        ctx.fillStyle = "#ffc000";
                        var ydisegnata = 25+canvasHeight/2;
                        switch (this.indiceUscita){
                          case 0: xdisegnata = (canvasWidth/2)-(this.width/2); break;
                          case 1: xdisegnata = (canvasWidth/2); break;
                        }
                      	ctx.fillRect(xdisegnata, ydisegnata, this.width/2, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata-9+(this.height)/3, this.width/2, 9);
                      	ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height)/3-8);
                      	ctx.fillRect(xdisegnata+(this.width/2)-9, ydisegnata, 9, (this.height)/3-8);			
          			}
                //ora gestisco gli input
                if(keys[destrakey] && !tastoGiaSchiacciato) {
                    this.indiceUscita=1;
                }
                if(keys[sinistrakey] && !tastoGiaSchiacciato) {
                    this.indiceUscita=0;
                }
                if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {              
                  switch (this.indiceUscita){
                    case 0: //conferma carica livello costum
                      this.costumLevelString=await controllaFile();
                      if(this.costumLevelString!=""){
                        chiudiInputFile();
                        this.apriLivello=true;
                        this.isClosing=true;
                        this.isOpen=false;
                      }                                            
                      break;                    
                    case 1: //cancella
                      chiudiInputFile();
                      this.loadCostumLevel=false;
                      break;
                  }
                }                            			
                if(keys[jumpkey] && !tastoGiaSchiacciato) {//chiude il menu
                  chiudiInputFile();
                  this.loadCostumLevel=false;
                }
                function chiudiInputFile(){
                  document.getElementById("fileCaricaPartita").value="";
                  document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                  document.getElementById("fileCaricaPartita").disabled=true;
                  document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas                
                }
                if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                  tastoGiaSchiacciato=true;
                }else{
                  tastoGiaSchiacciato=false;
                }                
            }
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
                stringaCaricaPartita = await readFileAsText(uploadedFile);
                return stringaCaricaPartita;                          
            }//fine di controllaFile()            				          	
        }//fine di if(is.Open)          
        if(this.isClosing){//animazione di chiusura del menu
            stageSelect(); //disegna stageSelect() - serve per pulire lo schermo disegnando quello che sara' lo sfondo sotto il menu
            if (this.width > 0){this.width-=20;}
            if (this.height > 0){this.height-=20;}           
            ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
            if (this.height-1 < 0 && this.width-1 < 0){//quando il menu e' tutto chiuso:
            	if(this.apriLivello){
                gamestate=-1;
                if(this.costumLevelString==""){
                  nuovoLivello();
                }else{
              		player = new Player();
              		stringToLevel(this.costumLevelString);
                  player.x = level.xStartingPos;
                  player.y = level.yStartingPos;                
                }
            	}else{
                gamestate=1;
              }
            }
        }//fine di if(is.Closing)
     }
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
            ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
  		      ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde  
            if(this.isOpen){  //quando il menu e' tutto aperto
                  ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
                  var textHeight=ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
                  ctx.textAlign = "center";
            			disegnaTestoConBordino(this.text, canvasWidth/2, canvasHeight/2+textHeight/2,"#d2d2d2","#000000");
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
                  //ora gestisco gli input
                  if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
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

	function newMenuOpzioni(widthPassata, heightPassata, apertoDalMenuDiPausa){
	    this.isOpen=false;
        this.isClosing=false;
        this.width=widthPassata;
        this.height=heightPassata;
        this.widthMax=canvasWidth-150;
        this.heightMax=canvasHeight-150;
        this.indice=0;
        this.contatoreAnimazione=0;
        this.staCambiandoTasto=false;
        this.drawMenuOpzioni = function (){
          if (!this.isOpen && !this.isClosing){//animazione di apertura del menu
            if (this.width < this.widthMax){this.width+=10;}
            if (this.height < this.heightMax){this.height+=15;}
            if (this.height > this.heightMax-1 && this.width > this.widthMax-1){//quando il menu e' tutto aperto:
            	this.isOpen=true;
            }
          }
          ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
		  ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
          ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde

          if(this.isOpen){ //quando il menu e' tutto aperto
          	ctx.font = "small-caps bold 23px Lucida Console"; ctx.textAlign = "center"; disegnaTestoConBordino("OPTIONS",canvasWidth/2, 110,"#d2d2d2","#000000"); //scrive la scritta OPTIONS al centro in alto
          	ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
            for(i=0;i<10;i++){//disegno tutte le scritte
              	var xdisegnata=75;
              	var ydisegnata=(128+(this.heightMax+75-17-128)/10*(i));
				switch (i){//scrive le varie impostazioni dei tasti
					case 0:
						ctx.textAlign = "right"; disegnaTestoConBordino("move up :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(sukey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;
					case 1:
						ctx.textAlign = "right"; disegnaTestoConBordino("move down :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(giukey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;
					case 2:
						ctx.textAlign = "right"; disegnaTestoConBordino("move left :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(sinistrakey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;	
					case 3:
						ctx.textAlign = "right"; disegnaTestoConBordino("move right :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(destrakey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;
					case 4:
						ctx.textAlign = "right"; disegnaTestoConBordino("confirm & dash :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(dashkey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;
					case 5:
						ctx.textAlign = "right"; disegnaTestoConBordino("cancel & jump :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(jumpkey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;
					case 6:
						ctx.textAlign = "right"; disegnaTestoConBordino("shoot :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(sparokey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;						
					case 7:
						ctx.textAlign = "right"; disegnaTestoConBordino("previous power :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(lkey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;																																									
					case 8:
						ctx.textAlign = "right"; disegnaTestoConBordino("next power :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(rkey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;						
					case 9:
						ctx.textAlign = "right"; disegnaTestoConBordino("menu & start :   ", canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						ctx.textAlign = "left"; disegnaTestoConBordino("   "+tasto(startkey.toLowerCase()), canvasWidth/2, ydisegnata+7+((this.heightMax+75-17-128)/10)/2,"#d2d2d2","#000000");
						break;

					function tasto(key){
						if (key==" "){return "space bar"}
						return key
					}											
				}
			}
			
			{//disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
              ctx.fillStyle = "#ffc000";
            	var xdisegnata = 75;
            	var ydisegnata = (128+(this.heightMax+75-17-128)/10*(this.indice));
            	ctx.fillRect(xdisegnata, ydisegnata-2, this.width, 9);
            	ctx.fillRect(xdisegnata, ydisegnata+((this.heightMax+75-17-128)/10)-5, this.width, 9);
            	ctx.fillRect(xdisegnata, ydisegnata, 9, ((this.heightMax+75-17-128)/10)-5);
            	ctx.fillRect(xdisegnata+this.width-9, ydisegnata, 9, ((this.heightMax+75-17-128)/10)-5);			
			}
			
			if(this.staCambiandoTasto){//da qui in giu determino cosa succede in base a che tasto viene schiacciato. le due grosse distinzioni sono se staCambiandoTasto oppure se siamo nel menu e basta 
				if(this.contatoreAnimazione < 40){//fa l'animazione del testo che appare e disappare
					ctx.fillStyle = "#52b58b"; ctx.fillRect(canvasWidth/2,(128+(this.heightMax+75-17-128)/10*(this.indice))+7, this.width/2-9, ((this.heightMax+75-17-128)/10)-12);
					this.contatoreAnimazione++;
				}else{
					this.contatoreAnimazione++;
					if(this.contatoreAnimazione>79){
						this.contatoreAnimazione=0;
					}
				}
				if(ultimoTastoLetto!=""){//se viene schiacciato un tasto qualsiasi
					switch(this.indice){
						case 0: sukey=ultimoTastoLetto; break;
						case 1: giukey=ultimoTastoLetto; break;
						case 2: sinistrakey=ultimoTastoLetto; break;
						case 3: destrakey=ultimoTastoLetto; break;
						case 4: dashkey=ultimoTastoLetto; break;
						case 5: jumpkey=ultimoTastoLetto; break;
						case 6: sparokey=ultimoTastoLetto; break;
						case 7: lkey=ultimoTastoLetto; break;
						case 8: rkey=ultimoTastoLetto; break;
						case 9: startkey=ultimoTastoLetto; break;
					}
					this.staCambiandoTasto=false;	
				}
			}else{
              if(keys[sukey] && !tastoGiaSchiacciato) {
				if(this.indice > 0){ this.indice--;
				}else{ this.indice=9;}
              }
              if(keys[giukey] && !tastoGiaSchiacciato) {
				if(this.indice < 9){ this.indice++;
				}else{ this.indice=0;}
              }
              if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
              	ultimoTastoLetto="";
                this.staCambiandoTasto=true;
              }                            			
              if(keys[jumpkey] && !tastoGiaSchiacciato) {//chiude il menu
                this.isOpen=false;
                this.isClosing=true;
              }
              if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                tastoGiaSchiacciato=true;
              }else{
                tastoGiaSchiacciato=false;
              }				
			}          	
          }//fine di if(is.Open)
          
          if(this.isClosing){//animazione di chiusura del menu
              if (this.width > widthPassata){this.width-=20;}
              if (this.height > heightPassata){this.height-=20;}
              ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
              if (!apertoDalMenuDiPausa){objMenuPrincipale.drawMenuPrincipale(false);}           
              ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
              ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
              if (this.height-1 < heightPassata && this.width-1 < widthPassata){//quando il menu e' tutto chiuso:
              	if(apertoDalMenuDiPausa){
              		gamestate=2;
              	}else{//se viene aperto dal menu principale - devo ancora crearlo pero' lol
              		gamestate=0;
              	}
              }
          }//fine di if(is.Closing)
     }
	}

  function newMenuCaricaPartita(){
	      this.isOpen=false;
        this.isClosing=false;
        this.indexAlterato=false;
        this.fileLetto=false;
        this.width=0;
        this.height=0;
        this.widthMax=canvasWidth-450;
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
          ctx.clearRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30);	//pulisci la parte dove viene mostrato il menu
		      ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
          ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde

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
                  disegnaTestoConBordino("upload save file", canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
                  ctx.font = "small-caps bold 20px Lucida Console";
                  ydisegnata=((canvasHeight/2)+(this.height/2))-30;
                  disegnaTestoConBordino((dashkey+" to confirm"), canvasWidth/2, ydisegnata,"#d2d2d2","#000000");
                  if (jumpkey==" "){disegnaTestoConBordino((jumpkey+"spacebar to cancel"), canvasWidth/2, ydisegnata+20,"#d2d2d2","#000000");
                  }else{ disegnaTestoConBordino((jumpkey+" to cancel"), canvasWidth/2, ydisegnata+20,"#d2d2d2","#000000");}
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
          			}		
                //ora gestisco gli input
                  if((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) { //conferma il caricamento del file
                    this.daPulire=true;
                    document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                    this.fileLetto=await controllaFile();
                    if (this.fileLetto){
                      this.isOpen=false;
                      this.daPulire=false;
                      this.isClosing=true;
                    }                                     
                  }                            			
                  if(keys[jumpkey] && !tastoGiaSchiacciato) {//chiude il menu
                    this.isOpen=false;
                    this.isClosing=true;
                  }
                  if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                    tastoGiaSchiacciato=true;
                  }else{
                    tastoGiaSchiacciato=false;
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
            ctx.fillStyle = "#d2d2d2"; ctx.fillRect((canvasWidth/2)-this.width/2-15,(canvasHeight/2)-this.height/2-15, this.width+30, this.height+30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b"; ctx.fillRect((canvasWidth/2)-this.width/2,(canvasHeight/2)-this.height/2, this.width, this.height); //disegna lo sfondo verde
            if (this.height-1 < 0 && this.width-1 < 0){//quando il menu e' tutto chiuso:
            	nelMenuCaricaPartita=false;
              if (this.fileLetto){
                gamestate=1;
              }else{
                gamestate=0;
                objMenuPrincipale.drawMenuPrincipale(false);
              }
            }
        }//fine di if(is.Closing)
        
        async function controllaFile(){ //controlla che il file sia caricato correttamente
            var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
            var stringaCaricaPartita="";
            if(uploadedFile.size > (512)){//controlla la dimensione del file - non deve essere superiore a 512 Byte
               objAlert = new newAlert("The file size limit is 512Byte (half a kB). Upload a smaller file.",gamestate); gamestate=5;
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
            stringaCaricaPartita = await readFileAsText(uploadedFile);
            return caricaDatiSalvataggio(stringaCaricaPartita);
            
            function caricaDatiSalvataggio(stringaCaricaPartita) { //carica effettivamente la partita dal risultato della lettura del file
                var numeroElemento=0;
                var stringaElemento="";
                for(i=0; i<stringaCaricaPartita.length; i++){
                  if(stringaCaricaPartita[i]=="|"){
                    caricaElemento();
                    numeroElemento++;
                    stringaElemento="";   
                  }else{
                    stringaElemento+=stringaCaricaPartita[i];
                  }
                }
                if ((numeroElemento==20) && (stringaElemento!="")){//carica l'ultimo elemento se esiste (che se no verrebbe skippato, facendo poi ritornare false)
                    caricaElemento();
                    numeroElemento++;                
                }
                if (numeroElemento==21){ //se ha caricato il numero corretto di elementi
                  return true;
                }else{
                  objAlert = new newAlert("The file is not using the correct format",gamestate); gamestate=5; 
                  return false;
                }    
                function caricaElemento(){
                    switch (numeroElemento){
                        case 0: //jumpkey
                          jumpkey=stringaElemento;
                          break;
                        case 1: //destrakey
                          destrakey=stringaElemento;
                          break;
                        case 2: //sinistrakey
                          sinistrakey=stringaElemento;
                          break;
                        case 3: //sukey
                          sukey=stringaElemento;
                          break;
                        case 4: //giukey
                          giukey=stringaElemento;     
                          break;
                        case 5: //dashkey
                          dashkey=stringaElemento;
                          break;
                        case 6: //sparokey
                          sparokey=stringaElemento;
                          break;
                        case 7: //startkey
                          startkey=stringaElemento;
                          break;
                        case 8: //lkey
                          lkey=stringaElemento;
                          break;
                        case 9: //rkey
                          rkey=stringaElemento;
                          break;
                        case 10: //levelDefeated
                          var nuovoElementino="";
                          for (k=0; k<8; k++){
                            for(j=0; j<stringaElemento.length;j++){
                              if(stringaElemento[j]!=","){
                                nuovoElementino+=stringaElemento[j];
                                if (nuovoElementino=="true"){
                                  levelDefeated[k]=true; nuovoElementino=""; k++;
                                }else if (nuovoElementino=="false"){
                                  levelDefeated[k]=false; nuovoElementino=""; k++;
                                }   
                              }else{
                                nuovoElementino="";
                              }                            
                            }
                          }
                          break;
                        case 11: //heartAcquired
                          var nuovoElementino="";
                          for (k=0; k<8; k++){
                            for(j=0; j<stringaElemento.length;j++){
                              if(stringaElemento[j]!=","){
                                nuovoElementino+=stringaElemento[j];
                                if (nuovoElementino=="true"){
                                  heartAcquired[k]=true; nuovoElementino=""; k++;
                                }else if (nuovoElementino=="false"){
                                  heartAcquired[k]=false; nuovoElementino=""; k++;
                                }   
                              }else{
                                nuovoElementino="";
                              }                            
                            }
                          } 
                          break;
                        case 12: //subtank
                          subtank[0].life=parseInt(stringaElemento,10);
                          break;
                        case 13:
                          if(stringaElemento=="true"){subtank[0].acquired=true;
                          }else{subtank[0].acquired=false; subtank[0].life=0;}
                          break;
                        case 14:
                          subtank[1].life=parseInt(stringaElemento,10);
                          break;
                        case 15:
                          if(stringaElemento=="true"){subtank[1].acquired=true;
                          }else{subtank[1].acquired=false; subtank[1].life=0;}    
                          break;
                        case 16:
                          subtank[2].life=parseInt(stringaElemento,10);
                          break;
                        case 17:
                          if(stringaElemento=="true"){subtank[2].acquired=true;
                          }else{subtank[2].acquired=false; subtank[2].life=0;}
                          break;
                        case 18:
                          subtank[3].life=parseInt(stringaElemento,10);
                          break;
                        case 19:
                          if(stringaElemento=="true"){subtank[3].acquired=true;
                          }else{subtank[3].acquired=false; subtank[3].life=0;}
                          break;
                        case 20: //armaturaAcquired
                          var nuovoElementino="";
                          for (k=0; k<4; k++){
                            for(j=0; j<stringaElemento.length;j++){
                              if(stringaElemento[j]!=","){
                                nuovoElementino+=stringaElemento[j];
                                if (nuovoElementino=="true"){
                                  armaturaAcquired[k]=true; nuovoElementino=""; k++;
                                }else if (nuovoElementino=="false"){
                                  armaturaAcquired[k]=false; nuovoElementino=""; k++;
                                }   
                              }else{
                                nuovoElementino="";
                              }                            
                            }
                          }                        
                          break;                                  
                   }
                }    
            } //fine di caricaPartita()                           
        }//fine di controllaFile()                
     }//fine di drawMenu()               
	}//fine di menuCaricaPartita

	function newMenuPrincipale(){
		this.width=canvasWidth;
		this.height=canvasHeight;
		this.indice=0;
		this.isClosing=false;
		this.closingIndex=0;
		this.isGoingToStageSelection=false;
		this.drawMenuPrincipale = function (canInput){
			ctx.clearRect(0,0,canvasWidth,canvasHeight);//pulisce tutto
			ctx.fillStyle = "#020219"; ctx.fillRect(0,0,canvasWidth+1,canvasHeight+1);//sfondo nero
			ctx.textAlign = "right";
      ctx.font = "small-caps bold 15px Lucida Console";
      disegnaTestoConBordino("by lordf", canvasWidth-3, canvasHeight-2,"#d2d2d2bb","#020219");
      ctx.textAlign = "left";
      disegnaTestoConBordino(versioneDiGioco, 3, canvasHeight-2,"#d2d2d2bb","#020219");
			ctx.font = "small-caps bold oblique 250px Lucida Console";
			disegnaTestoConBordino("X",73+canvasWidth/2,243,"#ff9200","#ffd600");
			ctx.font = "small-caps bold oblique 125px Lucida Console";
			disegnaTestoConBordino("simple",17+canvasWidth/20,200,"#0001cb","#02b0ef");
			ctx.font = "small-caps bold oblique 75px Lucida Console";
			disegnaTestoConBordino("js",234+canvasWidth/2,245,"#0001cb","#02b0ef");
			ctx.font = "small-caps bold 30px Lucida Console"; ctx.textAlign = "center";
			if(this.indice==0){disegnaTestoConBordino("new game",canvasWidth/2,350,"#ff9200","#f9c065");}else{disegnaTestoConBordino("new game",canvasWidth/2,350,"#0001cb","#02b0ef");}
			if(this.indice==1){disegnaTestoConBordino("load game",canvasWidth/2,400,"#ff9200","#f9c065");}else{disegnaTestoConBordino("load game",canvasWidth/2,400,"#0001cb","#02b0ef");}
			if(this.indice==2){disegnaTestoConBordino("options",canvasWidth/2,450,"#ff9200","#f9c065");}else{disegnaTestoConBordino("options",canvasWidth/2,450,"#0001cb","#02b0ef");}
			if(canInput && !this.isClosing){//input dei tasti
            	if(keys[sukey] && !tastoGiaSchiacciato) {
					if(this.indice > 0){
						this.indice--;
					}else{
						this.indice=2;
					}
            	}
            	if(keys[giukey] && !tastoGiaSchiacciato) {
					if(this.indice < 2){
						this.indice++;
					}else{
						this.indice=0;
					}
            	}
            	if((keys[startkey]||keys[dashkey]) && !tastoGiaSchiacciato) {
					switch(this.indice){
						case 0://nuovo gioco 
              this.isClosing=true;
							this.isGoingToStageSelection=true;
              //azzero tutto
              levelDefeated = [false, false, false, false, false, false, false, false];
              heartAcquired = [false, false, false, false, false, false, false, false];
              armaturaAcquired = [false, false, false, false];
              subtank = [
            		{lifeMax: 20, life:parseInt(0,10), acquired:false},
            		{lifeMax: 20, life:parseInt(0,10), acquired:false},
            		{lifeMax: 20, life:parseInt(0,10), acquired:false},
            		{lifeMax: 20, life:parseInt(0,10), acquired:false},
              ];              
							break;
						case 1://carica partita
              objMenuCaricaPartita=new newMenuCaricaPartita();
              gamestate=6;
							break;
						case 2://opzioni 
            				objMenuOpzioni=new newMenuOpzioni(0, 0, false);
            				tastoGiaSchiacciato=true;
            				gamestate=3;                				
                		break;													
					}	
            	}                        
            	if(keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]){
                	tastoGiaSchiacciato=true;
            	}else{
                	tastoGiaSchiacciato=false;
            	}				
			}
        	if(this.isClosing){//animazione di chiusura del menu
        		ctx.fillStyle = "#000000";
        		this.closingIndex+=13;
        		ctx.fillRect(0,0,canvasWidth,this.closingIndex);
        		ctx.fillRect(0,canvasHeight-this.closingIndex,canvasWidth,this.closingIndex);
				    ctx.fillRect(0,0,this.closingIndex,canvasHeight);
				    ctx.fillRect(canvasWidth-this.closingIndex,0,canvasWidth-this.closingIndex,canvasHeight);
        		if ( this.closingIndex > ((canvasWidth/2)-1) ){//quando e' tutto chiuso
        			ctx.textAlign = "left";// se no si bugga della roba
              		if(this.isGoingToStageSelection){
              			gamestate=1;
              		}else{
              		   //boh...
              		}
              	}
          	}		
	    }
	}

  function SalvaPartita(){
    stringaSalvataggio=jumpkey+"|"+destrakey+"|"+sinistrakey+"|"+sukey+"|"+giukey+"|"+dashkey+"|"+sparokey+"|"+startkey+"|"+lkey+"|"+rkey+"|"+levelDefeated+"|"+heartAcquired;
    for (i=0; i<4; i++){
        stringaSalvataggio+="|"+subtank[i].life+"|"+subtank[i].acquired;
    }
    stringaSalvataggio+="|"+armaturaAcquired;    
    {//creo il file simpleXjs.dataDiOggi.savegame da scaricare
        const dataDiOggi=creaData(); //prende la data di oggi
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaSalvataggio));
        element.setAttribute('download', "simpleXjs."+dataDiOggi+".savegame");
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
