      var versioneDiGioco = "v0.20221228"; //finally found a way to use modules with the file:/// protocol (standard dynamic import doesn't work with that protocol because of vulnerabilities). Made the code modular
      debugMode = false; //you can enable debugMode with the console (press f12 in the browser)

      //crea il canvas
      const levelEditor = false;
      var canvasWidth = 720;
      var canvasHeight = 540;
      if (document.getElementsByTagName('canvas').length == 0) { //crea il canvas con le variabili che ho creato
      	document.body.innerHTML += "".concat("<div class='caricaPartitaDiv' id='caricaPartitaDiv'><input type='file' id='fileCaricaPartita' disabled></div><div class='canvasDiv' id='canvasDivId' tabIndex='1'><canvas id='canvas' width=", canvasWidth, " height=", canvasHeight, "></canvas></div>");
      }
      var ctx = document.getElementById('canvas').getContext('2d');

      var stringaSalvataggio = "";

      //variabili dei tasti - prima o poi faro' un'opzione nel menu per poterli cambiare ingame
      var keys = []; //vettore associativo dei tasti (tiene dentro dei bool)
      var tastoGiaSchiacciato = false; //mi serve per alcune funzioni tipo selectScreen()
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

      levelDefeated = [false, false, false, false, false, true, false, true]; //vettore che tiene quanti livelli sono stati superati
      heartAcquired = [false, false, false, false, false, false, false, false]; //vettore che tiene quanti cuori sono stati trovati
      armaturaAcquired = [false, false, false, false]; //vettore che tiene quante armatura e' stata trovata - 0:testa, 1:gambe, 2:buster, 3:corpo
      subtank = [ //vettore di subtanks - e' scollegata dal player almeno non si resetta al cambio del livello
      	{
      		lifeMax: 20,
      		life: parseInt(0, 10),
      		acquired: false
      	},
      	{
      		lifeMax: 20,
      		life: parseInt(0, 10),
      		acquired: false
      	},
      	{
      		lifeMax: 20,
      		life: parseInt(0, 10),
      		acquired: false
      	},
      	{
      		lifeMax: 20,
      		life: parseInt(0, 10),
      		acquired: false
      	},
      ];

      var currentPlayer = 0; //variabile che indica il personaggio scelto
      var maxCurrentPlayer = 2; //numero di personaggi
      function getCurrentPlayerName(currentPlayer) {
      	switch (currentPlayer) {
      		case 1:
      			return "riccardo belmonte";
      		default:
      			return "ics";
      	}
      }

      //gamestate - se == -1: stato in gioco
      var gamestate = 0;
      //stato 0: nel menu principale - var nelMenuPrincipale=true; 
      //stato 1: selezione del livello - var stageSelection=false; 
      //stato 2: menu di pausa - var menuDiPausa=false; 
      //stato 3: menu opzioni - var nelMenuOpzioni=false; 
      //stato 4: opzioni nelle stage selection - var nelleOpzioniStageSelect=false; 
      //stato 5: c'e' un alert aperto - var alertAperto=false; 
      //stato 6: nel menu carica partita - var nelMenuCaricaPartita=false; 

      //caricare il livello
      var level = []; //create the level array
      var entity = []; //create the entity array. Ogni entità deve avere: x, y, width, height e il metodo physics che determinerà come si comporta l'entità
      var lvlNumber = 1;
      var blockDimension = 32; //dimensioni standard dei blocchi
      var objMenuPrincipale = new newMenuPrincipale(); //inizializza il menu principale

      //start the engine
      window.onload = start;

      //this function is called at the start
      function start() {
      	var player = nuovoPlayer(currentPlayer);
      	update();
      }

      function nuovoLivello() { //azzera i dati del player e carica un nuovo livello (da stringa e non da file...)
      	player = nuovoPlayer(currentPlayer);
      	leggiLivelloDaFile();
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
      		disegnaSchermoDiGioco(true); //ATTENZIONE: se le viene passato true oltre a disegnare le entita' calcola anche le loro physics
      		player.physics(player, level); //chiama la funzione physics del player
      	}
      }