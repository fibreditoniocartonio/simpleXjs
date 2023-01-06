      debugMode = false; //you can enable debugMode with the console (press f12 in the browser)
      showMouseBox = false; //you can enable showMouseBox with the console (press f12 in the browser)

      //elenco entita' - da aggiornare tutte le volte
      const listaEntityStringa = "01234567⁰¹²³⁴⁵⁶⁷àÀèÈPSBA→←↓↑⊘⟑Z⧌KЌ";

      //crea il canvas
      const levelEditor = true;
      var realCanvasWidth = 960; //level editor in 16:9
      var canvasWidthDefault = 720; //per mostrare il level, 4:3
      var canvasHeightDefault = 540;
      var canvasWidth = canvasWidthDefault;
      var canvasHeight = canvasHeightDefault;
      if (document.getElementsByTagName('canvas').length == 0) { //crea il canvas con le variabili che ho creato
      	document.body.innerHTML += "".concat("<div class='caricaPartitaDiv' id='caricaPartitaDiv'><input type='file' id='fileCaricaPartita' disabled></div><div class='canvasDiv' id='canvasDivId' tabIndex='1'><canvas id='canvas' width=", realCanvasWidth, " height=", canvasHeight, "></canvas></div>");
      }
      var ctx = document.getElementById('canvas').getContext('2d');

      //variabili dei tasti - prima o poi faro' un'opzione nel menu per poterli cambiare ingame
      var keys = []; //vettore associativo dei tasti (tiene dentro dei bool)
      var mouseX = 0;
      var mouseY = 0; //coordinate mouse
      var lvlCanvasMouseX = 0;
      var lvlCanvasMouseY = 0; //coordinate mouse rispetto a level (nel mini canvas)
      var mouseClick = false; //il mouse ha schiacciato
      var tastoGiaSchiacciato = false;
      var jumpkey = "z"; //salta - default z
      var destrakey = "ArrowRight"; //muovi sinistra - default freccia destra
      var sinistrakey = "ArrowLeft"; //muovi destra - default freccia sinistra
      var sukey = "ArrowUp"; //default freccia su
      var giukey = "ArrowDown"; //default freccia giu
      var dashkey = "x"; //dash - default x
      var sparokey = "a"; //shoot - default a
      var startkey = "Enter"; //start - default INVIO/ENTER
      var lkey = "d"; //power- - default e
      var rkey = "c"; //power+ - default c

      var ultimoTastoLetto = "";
      document.addEventListener("keydown", function (e) { //events - leggi tasti schiacciati
      	keys[e.key] = true;
      	ultimoTastoLetto = e.key;
      });
      document.addEventListener("keyup", function (e) { //events - leggi tasti rilasciati
      	keys[e.key] = false;
      });

      document.addEventListener('mouseup', function (e) { //legge se smetto di cliccare
      	mouseClick = false;
      });
      document.addEventListener('mousedown', function (e) { //legge se clicco
      	mouseClick = true;
      });

      canvas.addEventListener("mousemove", function (e) { //legge la posizione del mouse - questo e' solo un evento di canvas e non di document perche' la posizione mi serve solo sul canvas (ottimizzo)
      	var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
      	mouseX = Math.round(((e.clientX - cRect.left) / (cRect.right - cRect.left)) * realCanvasWidth); //coordinate acquisite riproporzionate perche' il canvas ha grandezza variabile, ma coordinate fisse
      	mouseY = Math.round(((e.clientY - cRect.top) / window.innerHeight) * canvasHeightDefault); //coordinate acquisite riproporzionate perche' il canvas ha grandezza variabile, ma coordinate fisse  
      });

      //prototipo del player
      function Player() { //in realta' fa da telecamera nel leveleditor
      	this.x = 0;
      	this.y = 0;
      	this.width = 24;
      	this.height = 24;
      	this.color = "#0400f8";
      	this.showPlayerCamera = false; //mostra l'iconcina della telecamera che serve per spostarsi nel livello e simula la visione del player
      	this.snapMode = false;
      	this.showCoordinates = true;
      	this.showGrid = true;
      	this.showLevelBar = true;
      	this.permanentLevelBar = false;
      }
      player = new Player();

      //caricare il livello
      var blockDimension = 32; //dimensioni standard blocco
      var level = []; //create the level array      					
      stringaLivelloDefault = ";ttttttttttttttttttttttl.....................l.....................l.....................l.....................l.....................l.....................l.....................l.....................l.....................l.....................l.....................l.....................l..X..................l.....................l.....................z0.62;0.85;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;#155261;;;;;"; //spazio alla fine necessario
      stringaLivello = stringaLivelloDefault;
      var entity = []; //create the entity array. Ogni entità deve avere: x, y, width, height e il metodo physics che determinerà come si comporta l'entità
      
      //inizializzo le entity che carico dal modulo stringToLevel e la stringa in cima a questo file
      stringToLevel("lllllllllllllllllllll"+listaEntityStringa+"z");
      var listaTipoEntity = creaListaTipoEntity(listaEntity);
      var listaEntity = creaListaEntity(listaEntityStringa,listaTipoEntity);      

      //gamestate - se == -1: stato nel level editor
      var gamestate = 0;
      //stato 0: nel menu principale 
      //stato 1: selezione del livello 
      //stato 2: menu di pausa 
      //stato 3: menu opzioni 
      //stato 4: opzioni nelle stage selection 
      //stato 5: c'e' un alert aperto 
      //stato 6: nel menu carica livello
      var objMenuPrincipale = new newMenuPrincipale(); //inizializza il menu principale

      //start the engine
      window.onload = start;

      //this function is called at the start
      function start() {
        var player = new Player(); //creo il player
      	update();
      }

      function nuovoLivello() { //azzera i dati del player e carica un nuovo livello (da stringa e non da file...)
      	player = new Player();
      	sideMenu = new newSideMenu();
      	stringToLevel(stringaLivello);
      	player.x = level.xStartingPos;
      	player.y = level.yStartingPos;
      }

      function update() { //this function is called every frame
      	requestAnimationFrame(update); //credo che sia la roba che crea il ciclo del gioco
      	if (gamestate == 1) {
      		stageSelect();
      	} else if (gamestate == 2) {
      		objMenuDiPausa.drawMenuDiPausa();
      	} else if (gamestate == 3) {
      		objMenuOpzioni.drawMenuOpzioni();
      	} else if (gamestate == 0) {
      		objMenuPrincipale.drawMenuPrincipale(true);
      	} else if (gamestate == 4) {
      		objMenuOpzioniStageSelect.drawMenu();
      	} else if (gamestate == 6) {
      		objMenuCaricaPartita.drawMenu();
      	} else if (gamestate == 5) {
      		objAlert.drawMenu();
      	} else {
      		disegnaSchermoDiGioco(false); //ATTENZIONE: se le viene passato true oltre a disegnare le entita' calcola anche le lore physics
      		playerCameraPhysics(player, level); //chiama la funzione physics del player
      		mouseCoordinatesConverter();
      	}
      }

function creaListaEntity(listaEntityStringa,listaTipoEntity) {
	let listaEntityDivisaPerTipo=[]; //array di array che restituisco alla fine della funzione
	for (j = 0; j < listaTipoEntity.length; j++) {
      		var entityDelloStessoTipo = [];
      		for (i = 0; i < entity.length; i++) {
      			if (entity[i].type == listaTipoEntity[j]) {
      				entityDelloStessoTipo.push(entity[i]);
      			}
      		}
      		listaEntityDivisaPerTipo.push(entityDelloStessoTipo);
      	}
	return listaEntityDivisaPerTipo;
}

function creaListaTipoEntity(listaEntityStringa) {
      	let listaTipi = []; //starting, vengono aggiunti in automatico
	for (i = 0; i < entity.length; i++) {
		var nuovoTipo=true;
		for(j = 0; j < listaTipi.length; j++) {
			if(listaTipi[j]==entity[i].type){nuovoTipo=false; break;}
		}
		if(nuovoTipo){listaTipi.push(entity[i].type);}
	}
      	return listaTipi;
}

