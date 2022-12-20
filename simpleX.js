      var versioneDiGioco = "v0.20221220"; //iniziato a lavorare su riccardo belmonte
      debugMode = false; //you can enable debugMode with the console (press f12 in the browser)

      //crea il canvas
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

      var currentPlayer=0; //variabile che indica il personaggio scelto
      var maxCurrentPlayer=2; //numero di personaggi
      function getCurrentPlayerName(currentPlayer){
	switch (currentPlayer){
		case 1: return "riccardo belmonte";
		default: return "ics";
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
      var objMenuPrincipale = new newMenuPrincipale(); //inizializza il menu principale

      //caricare il livello
      var level = []; //create the level array
      var lvlNumber = 1;

      //prendo lvlNumber e carico il livello scelto - sadly non ancora da file perchè siamo a corto di budget
      function leggiLivelloDaFile() { //funz che carica il livello scelto - i livello sono salvati come stringhe + backgroundImage in base64 alla fine
         switch (lvlNumber) {
            /*
            i livelli sono disposti cosi in realta':1 8
            			  		  3     4    
            			  		  5     7
            					    6 2     (mi serve per assegnare correttamente i poteri)*/

            case 1:
               stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...a................qqqqqqqqqqqqq...................................................iiiiiiiiiii.................................l...a..⁶.........⁷..qqqqqqqqqqqqqqqq.................................................iiiiiiiiiiiP................................l.X.a...............qqqqqqqqqqqqqqqqq....àààà.ÀÀÀÀ.ÈÈÈÈ.èèèè.........................iiiiiiiiiii.................................l...a.aaa.......aaa.qqqqqqqqqqqqqqqqq....aaaaaaaaaaaaaaaaaaa........................iiiiiiiiiiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiiiigggiiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiiiighgiiiii................................l...a......aaa......qqqqqqqqqqqqqqqqq...............................................iiiigghggiiii................................l...a..⁴.........⁵..qqqqqqqqqqqqqqqqqaaa....4...5...6...7...........................iiiighhhgiiii................................l...a...............qqqqqqqqqqqqqqqqq...............................................iiigghghggiii................................l...a.aaa.......aaa.qqqqqqqqqqqqqqqqq...............................................iiighhghhgiii................................l...a................qqqqqqqrqqqqqqqq...............................................iigghhghhggii................................l...a.................qqqqqrrqqqqqq......aaaaaaaaaaaaaaaaaaa...aaaa...aaa...........iighhhghhhgii................................l...a......aaa.........qqqqrrqqqq...................................................igghhhhhhhggi................................l...a..².........³......qqrrr.......................................................ighhhhghhhhgi................................l...a.....................rrr....kkjkk.....kkjkk.....kkjkk.....kkjkk................ighhhhhhhhhgi................................l...a.aaa.......aaa.......rrr...kkkkkkk...kkkkkkk...kkkkkkk...kkkkkkk.....aaa.......igggggggggggi................................l...a.....................rrr....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii................................l...a.....................rr.....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii..................A.............l...a......aaa............rr.....ooooo.....ooooo.....ooooo.....ooooo................iiiiiiiiiiiii................................l...a..⁰.........¹........rr.....oo1oo.....oo0oo.....oo2oo.....oo3oo....aaa.........i.....i.....i................................l...a....................rrr.....ooooo.....ooooo.....ooooo.....ooooo................i.....i.....i................................l...a.aaa.......aaa......rrr.....ooooo.....ooooo.....ooooo.....ooooo................i.....i.....i.............................aaal........................rrr.....ooooo.....ooooo.....ooooo.....ooooo...................i.....i...................................l........................rrr...akkkkkkkaaakkkkkkkaaakkkkkkkaaakkkkkkka.................i.....i...............................B...l........................rrr..aaakkjkkaaaaakkjkkaaaaakkjkkaaaaakkjkkaaa................i.....i...................................z0.62;0.85;#155261;#155261;#155261;#155261;#155261;#155261;#030101;#ffd300;#610015;#a70002;#1552db;#155261;#155261;#6fcbfc82;#155261;#2c7f00;#612f00;");
               break;

            case 8:
               stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl..........................................................l..........................................................l..eeeeeee.................................................l..........................................................l............ggggggg.......................................l..........................................................l.....................fffffff..............................l..........................................................l..........................................................l..............................ggggggg.....................l..........................................................l........................................eeeeeee...........l..........................................................l..................................................aaa.....l..........a...............................................l..........a.......h...h..ccccc.ddd.ccc.d.d.c.ddd.c.c.....fl..........a...bbb.h.h.h..c.....d.d.c.c.d.d....d..c.c......l..........a...b.b.h.h.h..c..cc.dd..ccc.d.d.c..d...c.......l..........aaa.bbb..h.h...c...c.d.d.c.c..d..c..d...c.......l.........................cccc.............................l.........................................................gl..........................................................l..........................................................l...........................cccccccccccccccccccccccccccc...l....X.....................................................l....................bb....................................l................bb........................................l............gg............................................l........ff................................................l....ee....................................................z0.25;0.85;#2F4858;#716F71;#81B2C5;#6D98BA;#EACDC2;#ebdb9d;#d6ba54;#490047;;;;;;;;;;data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7AARRHVja3kAAQAEAAAAWgAA/+EAGEV4aWYAAElJKgAIAAAAAAAAAAAAAAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyRDg3NUE1MDZCODExRUFBNTA4RDczQURFRkZCM0VDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyRDg3NUE0MDZCODExRUFBNTA4RDczQURFRkZCM0VDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJGQkVENjIwNkM5QjRFQzI5QzhGNEU0NDkyNjMyOEVGOCIgc3RSZWY6ZG9jdW1lbnRJRD0iRkJFRDYyMDZDOUI0RUMyOUM4RjRFNDQ5MjYzMjhFRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/2wBDAAEBAQEBAQEBAQEBAQEBAQICAQEBAQMCAgICAwMEBAMDAwMEBAYFBAQFBAMDBQcFBQYGBgYGBAUHBwcGBwYGBgb/2wBDAQEBAQEBAQMCAgMGBAMEBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgb/wAARCAIcAtADAREAAhEBAxEB/8QAHwABAAEFAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAYRAAAQMDAwIDBQUEBgQHCgkNAQIDEQAEBQYSIQcxE0FRCCJhcYEJFBUykSNCofAWFzOxwdEkUtLTGCUmYnLh8RknNTZDkpOis8I0R1NVY2Z0goOjskRFRlZnc8PUpbTi/8QAHQEBAAIDAQEBAQAAAAAAAAAAAAECAwUGBAcICf/EAFERAAEDAgUBBQMIBgcECQUAAwEAAhEDBAUGEiExQQcTIlFhcYGRFDJCobHB0fAVI1KS0uEWFzNicoKTNEOi8QgkRFNUY3OD4iU1RbLCo4TT/9oADAMBAAIRAxEAPwD+ApE8n9K7BedVg8xH5fr3oi3Flg8rkMdmMvaWblxjsA2yvMXaVpCWEvOBtsr5B95ZCeOeaodzESi1P8mrCSitLEcjzPIqUVFESiJREoiURKIlESiJREoiURKIlESiJREoiURSBJiY9KIhBBjzoirSjvI/jRFGw/CiKopG3ykDuKIrZ7/9dEUURKIlESiJREoiURKIlESiJREoiURKIlETtRFJmZPc0RRREoiURKIlESiJRFdICgIiB2oiK5SR2J8poiroisGZM+dEQkmJ8u1EUURSTJmI+FEUAxyKIknn4nmiJRFMcTPn2oiiiJRFJAEQZmiKKIlESiJREoiURKIp2ngngHzoir8P4/woikJ2wRzzRFQokweYPrRFTREoiURKIlESiJREoiURKIlESiJRFcQRG0+ZoiuAQfd4PrMfrUEAiFIML7F6J+2v1X6EdEOunQvSFto57SvXTE4a1zdzmdBYu/u7b8OyQvW1NXFxbLdTKwoEIWnggGUiDqbzCbe8vqNw/Vrpa9MOcB4xDtQBh2w2njpsSvTRun0KD6beHRPntPX38L47JBJImCfM1tvpT5+z7l5eioUePnwKlFZoiURKIlESiJREoiURKIlESiJREoiURKIlESiKpJgyaIqe5+JoivIkgCPOhRb7H6YzuUwWoNT2Fmh/CaXXaJzt4bptJYVdLUhgeGpW9e5SFD3AqI5isZeA6EXPqJHBPG7ueYq4KKng88JqUUEDyM/SiKKIlESiJREoiURKIlESiJREoiURKIlESiKTM8iPhFEUURKIlESiJREoiURXESIHYHzNEXQnH4P+iqswdRtjUqc+m2RpH8LdKzYlkqN395/s4DgDfh/n53dqxBx70hFz4P5TEeVZUVCgod/pzRFTREoiURKIlESiJREoikd+RI86IooiURKIlESiJRFM8ER596IpB4/KDHnRFUlW4wQPhRFXwfjBoimiK2sHvJg+U0RUcR35ntRFFESiJREoiURKIlESiJREoiURKIpB48+DxRFcCvOQYTzxRFVwoAx+tEUExHYDzmiKJJSTB78RRFa447z50RKIlESiJREoiURVHbAjv50RU0RKIlESiJREoiURKIlESiJRFeSZEmCR6URQEwZERVS1pMoo2c8k8/CrIqD5x2oiiiJREoiqKSADxzRFTREoiURKIlESiJREoiURVBJMTwDRFUUeh/WiKggjuKIooiURKIlESiJREoiURSDBkURXAR5Ru9PKiJIgmQYPujtRFaoiURKIlESiJREoiURKIlESiJREoiURKIlESiK4I2wex7keVEUo45kz5AHtUEAqRE7r7e6S6B9kDM+yv1z1f1N6ta9037Qmn85phvplonD9Om77H3Vq/dXKb9RuzdoKYZRbrnwydx2gASqtRWr4gzE6bW0g6gQ4vfPiaR80BsHUCefTeV6GsouoEl0P6D8/y9hXxGvgCQJn3vPnzrbN1/S5Xm544UKMDcAPn8KsioJkTA78URUURKIlESiJREoiURKIlESiJREoiURTuPAnt6URATPfv69qIqlH6en/AFURNpkSQZ8poigwCQIj0JoipPHx+VESiJREoiURKIlESiJREoiURKIlESiJREoiURKIpBiflxRFUVniCRxzRFSST3oiiiJREoikRInt50RR8qIgEkD1NEUkCO8maIooiURKIlESiJRFVAAlU89ooiuyIB7A9pqCQEUHukyIjkmpRCDyQTMdqIrRmTPfzoiiiJREoiURKIlESiJREmJ+IoiSeB6dqIlESiJREoiURKIpg+h/SiKKIlESiJREoiURKIlESiJREBIMiiKtJEGYk+ZFEVaU7Z5n6UjdFVRFbX9OO0d6IqBPPaPjREIiiKKIlESiJREoiURKIlESiJREoiURSnvwQI9aIpmCexnvFEUSSIngURRREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIpHPEgT60RD9OPSiIkAnk8DvRFBiTHbyoiURKIlESiKtIBH5oM8CKIs/HXjuNyNhkW2rW4csL1p5ti9tw6ytSFBQS42eFpJHKTwRIqj262wiyc7l3dQZvK5t+1xtg9lsi9cuWOHsE2to0pxZUUMspG1tsEkBI4SOKim0tCLVkx9TxWRFYMyZ7zzREoiURKIlESiJREoiURKIqj+VP1oipoiURKIlESiK4lIiSOZ45oirP+FEQCBEk/M0RUFA8uOPWiKgCZ5EepoienPaiIBJAkCaIooikTzBjj1oiAx2ketEUURKIlEUggQRM/HtRFWFnzHHwoimVRxBntxRFQrk/GOfnRFAJHaiKKIlESiJREoiURKIlEVSRzMgAetEUd+5/U0RRREgnsJoiURTA/1vL0oiAAiSY59KIhA8jP0oiiiJREoiURKIlESiJREoiURKIlESiJREoiURKIlEVW0lMxzNEVNESiJREoiURKIlESiJRFIjzMURR/M0RKIlESiJREoiURSDBB9KIrniDng0RSTxz7s/WiKgdu8czyO1EVKu55n40RRREoiURKIlESiJREoiURTPHMn0FEUURSDHkD86IooiURVJTPMxzxxRFdTwe4Md4HNIkINl9c+zp7GPWD2m9FdcdddOLbAO4XoN01utS6qXldYY3Hurtbe4t2lIbaubppSlTdpI2BZMQlJgkau+xayw6vSZWdpNV2lmxMuAJI2BjjlemhaXFy12gTp3PsXyhe2j1hd3VlcoSm4s7hbL6W3UrAWhRSoBQJBEjuDB7+lbJpkT0/PHovNssJfzHHlVkVEmI8qIh795+M0RRREoiURKIlESiJRE4jtzPeiKRHnP0oirEcEEhI9aIrZ5JPrREoiURKIlESiJREoiURKIpBjyB486IooiURXUCAZHJ9fSiK12oiURVe7ESqiKmiKRHnPbyoikhMcHnzmiIAOJIg+lEVNESiKQCeBRFBEcGiJREoikCZ+AoiiiJREoiURKIlESiJRFUCQPUehoigmTMR8KIooiURKIlESiJREoiURKIpIEAyCT5URRRFO0+hoibT6ecURCCO4oiiJ+lESOJ8qIlESiJRFI+vbyFEQiDwDHlIoiBJPYH9KIoIjiiJREoiURKIlESiJRE/kURKIpIiORz6URRREoilJIIjzoiuCUg+fMzRFu8TqDL4NjMW+LvHLRrP4pVjmG0ISfHtVKStSDuBgShBkQfd71UtaSpBIWnMklUfQVZQra+fpRFboimOJ+NEUURTHoR27miJBiY49aIkECY4NEUURKIlESiJREAngURTBM9hHrREiPT9aIooiURKIlESiJREoiURVBIiTMn8ooiggjv+k0RTtI78elEVaYHnIjvHaiK1RFUEqPMURQASYA5oiRxPlNEUURKIlESiJREoiURKIlEUjj1+EURRREoiURKIlESiJREoiURKIlESiIBPAoimD6HvRECSZgdu9EUURKIlESiKQDB8hE80RSkgGTPHaKIoUZJPr60RRREoiURKIlESiJRFIBPYedEQgjuKIqwQe/5u0xRFSkwqVTx50RU/z2oiURKIlESiJREoiURP8O9EVQBV6c/GiKmiJ6/CiKraeDxz60RVAKSRz3PIFEVfaB+lEUKMDz5HFEVoknvRE2nj4niiKqDChxA+NEVM9/j8KIgMCIB+Yoigmf8ACiJREoiURKIpJnyA+VEUURKInY/KiKojzkkHuY86IoAJ7URCkjkj+NEQJJjjvRFHaiJREoiURKIq+dvMggcCIoiooimSRBM/OiKQZgQJng9qIqaIqpkACOPpRFTEf9tESiJREoiURKIlESiJRFIEmOPrRFJECJEzyKIqeKIp2/FPb1oiRwTI48qIo8poiURKIpkxHkKIgEmKIoPBI9KIrwA2wOSRxz2oitkCTHrxRFJEEmUgjyFEVHeiK6kEd+xHaiKqAOw4oiggCT2n4xRFSQSPzTJ4FEVuiJREoirHKSTHHHNEVFESiJREoiURKIlESiJREoiqJJAB/WiKntREk8/E80RKIlESiJRFM8Qe3lREjiZHymiKKIq0p7zxI4FEUQok8cjvRFUNsSCRHfmiKCABPIntz5URQRztBEHtRFEyIPkOKIhJPeiKJI7GKIpMnk+XE0RRRFUlJV/nRFJG2RB5HFEVO3iQQaIo8poiURKIlESiJREoiURKIlEUgkdqIooiURKIlESiJREoiURVJ7cglPwoipoiURKIlEU8x8JoiiiJREoiURKIlESiJREoikcEH0NEVS4nzk+tEVFESiJREoiURKIlESiJRFUkkAwYoiJHIJkA+c0RSrsO0eoPFEVFEV1B4PaBRFSkyqT5+tQ4gNkouk1NpbLaUvbTHZgWSbi8xFpespscm1dJDFy0HG9ym1EJVtIlBhSTwQDVKdQVBKkggrnQoQEyQSB2rIoVKyZI8h5URUURKIqiSfl5cURU0RKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIgJBkURTPczyaIqtyjykQB6URU+8eOT8KIkH0P6URIkSOTPYURVBB7kxRFIQPWaIrgiPX4zRFQod+T2+lEVO4AAAdvM0RQoknkg/KiKmSOxiiKZJ7kn60RRREoiURKIlESiJRFIEmJiiKKIlESiJREoiURKIlESiJRFXuIAA7x3miKiiJMfWiJREoikgjvRFFESiJREoiURKIlESiJREBgzRFJ79iJ9aIooiURKIlESiJREoiURKIpAEGTB8qIpPdXc/GiKCBAgyT3oiiiK8FDgTJ9aIqQhQPkY9acopV27D1MVAAARUKMntAjipRU0RKIlEUkkiCZoiiiJREoiURKIlESiJREoievEyKIpIgxM/GiKKIlESiJREoiURKIlEUgE8CiKpKZ+I8wfWiKpKUySJ4PnRFVtHPHfvRECQO0/KaIhIA57URQOYEESeAKoXtRXgw8ezThHlDZqzdR6Iq0Wtw4tKQ0tIUoDctBAE+poS6dlBICqTaXClhvwincSNykkJET3P071IDz0Uamq14DxmWXue48I/z51BJA4UyFZW2pCtq0KQSPdC0kGoBJ6KVTsAHMn5VZFQQR5GPKaIooiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoikgAAzJPlRFFESiJREoikevHHrRFFESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiKQQJkTI4oijz59e9EVSu/Hby4oipoiURVBUCIHfuaIq949DRFbUZJNEUURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiKQCe1EVaRtPJAMcc0RXKIoJgTUEgIqkIccUlLaFKJHZIk1XVJgIs5vGXLkFe1oE9lzNSGvd1VDUaFsGsO0mPFecWr0QBt/Wrim0eqxGuQdlnN2Vs0AEMtyP3lJk/rQaQeFjNVxWTt+J+c1Y1N9lXW6U2jmST8DzTU4prdKsu+IEhDKZUo8O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VQQCQBH0qwpuhFNBT80Sp0BEqdDUSryYhEqESiJREifpREjmfOiJBPYTRFMK9D+lW0uKKQhR8o+dWDNkVXh/H+FXAAEInhjzNV0CUU7E/E1cCEVUAdgBRFNESiJREoiURKIlESiJREoiURKIlESiLT1z62CURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlW0uRKaHIlXDAiVdEoiURKIlEUgH0P0FFUuAUkQQJHPmaKrn+SrCBHr8aKhcSoO6eJj1irBpKhVRzM/wq/dhFVTQ1FEAdgBVgAEU1KJRFO0xMGiprapCCRPbnsRRV1mVUEc89vhRNblISnuOamCAqkkqqAOQBI9BQAkqEBkVk0BFTvkGAe3eKaGoqhMcmD8qnQ1EE8yIg1ZFNESiJQCUSpIIRKhEgnsJq2lxCKYPof0oGEoqggnvxV+7CKfDHmasAAinYn4mhAKKdifT+NA0BFVUolESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlEWnrn1sEoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESrBpIRKkMPVEq+hsIlQGAFEq6JREoif4USQFUEEx2g+dFQvCqCDJkwP76KO8KnYkTECfI0VS4lQBHJTzPlVtDlVVbTJIV/Cr6BCJtBieT61YNARVVKJREoqlwCq2q9KKpf5KoI9T5UUa3Kdg8+/rSCVUklTCRAgT8auGOIUKQRJAER8KkM80U1cNARKlFEfm+PpREAAEc/U0RTREoiURKkAlFUEqIkDip0ORNivl9asGeaKQgzzEedWDQCir2J57/CrIgSkTwOe9EUwB2AH0oimiJREoiURKIlESiJREopLSAlFCURKIlESiJREoilIk/DzoiiiKdvYyD9akAlFO2OeDHeDRwLRupDS47K0XWxwXWx6jxBWI1aQ5KtoeOine2YhxsT5+IP86g16UfOCdzVPRdtobp5rTqbk7rD6B09f6pyllYKurqwximy43bhSUFZ3LAjetI791CtvgmDYpmS5NGwpmrUaJIaRMAgTuRtJA968WIXtlhNAVLp4Y0mJM87mNvYV6gPZQ9pAgAdHtXk+kW4H/tq6f+rLP/8A4F/xZ/EtT/S3LUf7S3/i/BSfZO9pEGP6ndXD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");
               break;

            case 4:
               stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l..j...j.kkk.jjj.k...jj...kkk...j.....kkk...j.......................................................................................................................................................................l..j...j.k.k.j.j.k...j.j..k.k..jj.....k.k..jj.......................................................................................................................................................................l..j.j.j.k.k.jjj.k...j.j..k.k.j.j.iii.k.k.j.j.......................................................................................................................................................................l..j.j.j.k.k.jj..k...j.j..k.k...j.....k.k...j.......................................................................................................................................................................l...j.j..kkk.j.j.kkk.jj...kkk...j.....kkk...j.......................................................................................................................................................................l...................................................................................................................................................................................................................l...................................................................................................................................................................................................................l.........................................................................................................................................................................................................f.........l.........................................................................................................................................................................................................hi........l.........................................................................................................................................................................................................hii.......l................................................................................................................................................................................................gg.......h.........l...............................................................................................................................................................................................ggg.......h.........l......................d.........................................................dddddddd...dddd................e............ddd....dddd.......................................................gggg.......h.........l.............................................................................................................................................................................................ggggg.......h...g.g.g.l.............................................ffff.......ffff................................................................................g..g..........gg..g.............................gggggg.......h...ggggg.l...............d....deddd............ffff.....ff.........ff..................ddd..............e......dd.....e..e..e.....d...........de.....gg..gg........ggg..gg...........dddd............ggggggg.......h...ggggg.l.X.........................ffff.......ff......ff.........ff...............................................................................ggg..ggg......gggg..ggg....ffff............ffff.gggggggg.......h...gg.gg.l............................ff........ff......ff.........ff..............................................................................gggg..gggg....ggggg..gggg....ff..............ff.ggggggggg......ggg..gg.gg.lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..ccccccccccccccc...ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..ccccccccccccccccccccccccccccccccccccccccccccccccccccclbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc..cbbbbbbbbbbbbbc...cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc..cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbSSbbbbbbbbbbbbbbbSSSbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbSSbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbz0.62;0.85;#00000000;#5d4900;#21ad10;#c34e29;#d6ba54;#005f00;#86310e;#bcbcbc;#fcfcfc;#a60000;#402fd6;;;;;;; data:image/png;base64,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");
               break;

            case 7:
               stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttl...................................................l..................................................l..................................................l......................................P...........l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................w...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..................................................l..............................P...................l..X.................................P.............l..................................................z0.62;0.85;");
               break;

            case 6:
	       stringToLevel("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttlbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpppppppppppppppppppppppppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqrrrrqqqqqqqnfqqqqqqqrrrrqqbbbpppppppppppppppppppppppppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqrrrrqqqqqqqnfqqqqqqqrrrrqqbbbpppppppppppppppppppppppppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqcqcqqnfqqcqcqqqrrqqqbbbpppppppppppppppmmmmppppppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqoqoqqnfqqoqoqqqrrqqqbbbppppppppppppmmmmmmmmmmpppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqnqnqqnfqqnqnqqqrrqqqbbbpppppppppppmmmmmmmmmmmmppppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqnnnnqnfqnnnnqqqrrqqqbbbppppppppppmmmnnmmmmmmmmmpppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqnnnnfnnnqqqqqrrqqqbbbpppppppppmmmnnnmmmnnnmmmpppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqnnfnqqqqqqqrrqqqbbbpppppppppmmmnmmmmmnnnmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqffqqqqqqqqrrqqqbbbpppppppppmmmmmmmmmnnnmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqeeqqqqqqqqrrqqqbbbpppppppppmmmmmmmmmmmmmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppmmmmmmmmmmmmmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppmmnnmmmmmmmmmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppmmnnnmmmmmmnmmmmppppplbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppmmmnnnmmmmnnnmmmpppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbppppppppppmmmnnmmmmnnnmmppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppppmmmmmmmmmnmmmppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqbbbpppppppppppppmmmmmmmmmmpppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqqqpppppppppppppppmmmmmmmpppppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqqqpppppppppppppppppppppppppppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqqqpppppppppppppppppppppppppppppppl..................................abbqqqrrqqqqqqqqqeqqqqqqqqrrqqqqqpppppppppppppppppppppppppppppppl..................................abbqqrrrrqqqqqqqqeqqqqqqqrrrrqqqqpppppppppppppppppppppppppppppppl..................................abbqqrrrrqqqqqqqqeqqqqqqqrrrrqqqqppppppppppppppppppppppppppppppplddddddddddddddddddddddddddddddddddabbbbbbbbqqqqqqqrrqqqqqqqbbbbbbbccpppppppppppppppppppppppppppppplddddddddddddddddddddddddddddddddddabbbbbbbbqqqqqqqrrqqqqqqqbbbbbbbbbccppppppppppppppppppppppppppppl..................................aaaqqqqqqqqqqqqqrrqqqqqqqqqqqqqbbbbbccppppppppppppppppppppppppppl..................................aaaqqqqqqqqqqqrqrrqrqqqqqqqqqqqbbbpbbbccppppppppppppppppppppppppl..................................aaaqqqqqqqqqqqrrrrrrqqqqqqqqqqqbbbpppbbbccppppppppppppppppppppppl..................................aaaqqqqqqqqqqqqrrrrqqqqqqqqqqqqbbbpppppbbbccppppppppppppppppppppl..................................aaaqqqqqqqqqqqqqrrqqqqqqqqqqqqqbbbpppppppbbbccppppppppppppppppppl..................................aaaqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppbbbccppppppppppppppppl..................................aaaqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppbbbccppppppppppppppl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppbbbccppppppppppXpl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppbbbccppppppppppl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppppbbbccppppppppl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppppppbbbccppppppl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppppppppbbbccppppl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppppppppppbbbccccl...................................qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqbbbpppppppppppppppppppppppppbbbbbz0.62;0.85;#2d2d2c;#2d2d2c;#fa1e4c;#df520a00;#7466ba;#d0b98a;#155261;#155261;#155261;#155261;#155261;#eed3a5;#d0b98a;#b0aac1;#121b4d;#7466ba;#7a296f; data:image/png;base64,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");
               break;

            case 5:
               stringToLevel("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttl...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l..................................................................................................................................................................................................mmmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l...................................................................................................................................................................................................mmmmmcccccccccccccccccccddccccccccccccccccccccc.............................................................................................................................................................l...................................................................................................................................................................................................mmmmmcccccccccccccqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................mmmmcccccccccccccqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................mmmmmqccccqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqccccqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqPqqqqqqqqqqqqqqqqddddddddddddddddddddddd.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddddddddddddddddddddddd.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l....................................................................................................................................................................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..........................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................bccccccccccccccccccccccccccccccc..........................................................pqmmmqqqqqqqqqqqqqqqqqqddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................ccccccccccccccccccccccccccccccccbbbb............................................bbbbbbbbbbbbbbddddd..............ddccccccccccccccccccccc.............................................................................................................................................................l..........................................................................................................cccccccccccccccccccccccccccccccccccb............................................ccccccccccccccccccc..............ddccccccccccccccccccccc.............................................................................................................................................................l..............................................bbbbbbbbbbbbbbbbbbbbbbbb....................................cccccccccccccccccccccccccccccccccccc................................bbbbbbbbbbbbccccccccccccccccccc..............ddddddddddddddddddddddd.............................................................................................................................................................l..............................................cccccccccccccccccccccccc....................................cccccccccccccccccccccccccccccccccccc................................ccccccccccccccccccccccccccccccc..............ddddddddddddddddddddddd.............................................................................................................................................................l.X................................bbbbbbbbbbbbccccccccccccccccccccccccbbbb................................cccccccccccccccccccccccccccccccccccc....................bbbbbbbbbbbbcccccccccccccccccccccccccccccccdd............ddccccccccccccccccccccc.............................................................................................................................................................l..................................cccccccccccccccccccccccccccccccccccccccc................................cccccccccccccccccccccccccccccccccccc....................ccccccccccccccccccccccccccccccccccccccccccccc............ddccccccccccccccccccccc.............................................................................................................................................................lbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccbbbb....................bbbbbbbbccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc....................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccccccccc.............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............ccccccccccccccccccccd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd..............cccccccccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd...................cccccccccccccdd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd..................cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd.................cccccccccccccdd............................................................................................................................................................lcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd................cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccd...............cccccccccccccdd............................................................................................................................................................lccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..................................................................................ccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..................................................................................ccccccccccc...............cccccccccccccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccc...................cccccccccdddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccc.......................qqqccddcccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l..........................................................................................................................................................................................................cccccccccccd......................qqqccddcccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l..........................................................................................................................................................................................................ccccccccccccd.....................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccd....................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccd...................qqqccdd............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccccd..................qqqcc..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccd.................qqqcc..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qqrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccc.................qrrrr..............................................................................................................................................................l..........................................................................................................................................................................................................cccccccccccccccccdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd..............................................................................................................l..........................................................................................................................................................................................................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..............................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................l...............................................................................................................................................................................................................................................................................................................................................................................................................z0.62;0.85;#00000000;#dee9ff;#ccce7c;#8fdada;;;;;;;;#aa9f11;;;#81790c;#413003;#123551; data:image/png;base64,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");
               break; //questo diventera' il case 8

            case 3:
               stringToLevel("tttttttttttttttttttttttttttttttttttl..................................l.aaa.bbb.ccc.dd..eee.fff.gggg.h.h.l.a.a.b.b.c...d.d.e...f...g....h.h.l.aaa.bb..c.P.d.d.eee.fff.g.gg.hhh.l.a.a.b.b.c...d.d.e...f...g..g.h.h.l.a.a.bbb.ccc.dd..eee.f...ggg..h.h.l..................................l..................................l...aaaaaaaaaaaaaaaaaaaaaaaaaaaa...l..................................l..................................l.i.jjjjj.k.k......................l.....j...k.k......................l.i...j...kk.......................l.i.j.j...k.k......................l.i.jjj...k.k......................l..................................l..................................l..................................l...m...m.n...n.ooo.ppp.qqqq.rrr...l...mm.mm.nn..n.o.o.p.p.q..q.r.r...l...m.m.m.n.n.n.o.o.ppp.q..q.rrr...l.X.m...m.n..nn.o.o.p...q.qq.rr....l...m...m.n...n.ooo.p...qqqq.r.r...l..................................z0.62;0.85;#000000;#dee9ff;#ccce7c;#8fdada;#d7dc8f;;;;;;;#aa9f11;;;#81790c;#413003;#123551; data:image/png;base64,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");
               break;

            case 2:
               stringToLevel("tttttttttttttttttttttttttttttttttttl...a.....a...a.....a...a.....a...al.P.a.....a.P.a.....a.P.a.....a.P.al...a.....a...a.....a...a.....a...alaaaa.....aaaaa.....aaaaa.....aaaaal.......aaaaa.........aaaaa.......al.......a...a.........a...a.......al.......a.P.a.........a.P.a.......al.......a...a.........a...a.......al.......aaaaa.........aaaaa.......al.............aaaaaaa.............alaaaa..aaaaa..a.....a..aaaaa..aaaaal...a..a...a..a.....a..a...a..a...al.P.a..a.P.a..a..X..a..a.P.a..a.P.al...a..a...a..a..a..a..a...a..a...alaaaa..aaaaa..a..a..a..aaaaa..aaaaal.............aaaaaaa.............al.......aaaaa.........aaaaa.......al.......a...a.........a...a.......al.......a.P.a.........a.P.a.......al.......a...a.........a...a.......al.......aaaaa.........aaaaa.......alaaaa.....aaaaa.....aaaaa.....aaaaal...a.....a...a.....a...a.....a...al.P.a.....a.P.a.....a.P.a.....a.P.al...a.....a...a.....a...a.....a...az0.62;0.85;");
               break;

            default:
               objAlert = new newAlert("Errore nel caricamento del livello - carico il level 1", gamestate);
               gamestate = 5;
               lvlNumber = 1;
               leggiLivelloDaFile();
         }
         return
      }

      function stringToLevel(lvlString) {
         level = []; //azzera level
         entity = []; //azzera entity
         var foreground = []; //crea un vettore tipo level per i blocchi di foreground
         var background = []; //crea un vettore tipo level per i blocchi di background
         var widthTot = 0;
         var heightTot = 1;
         for (i = 0; i < lvlString.length; i++) { //ciclo la stringa livello per trasformarlo da stringa a livello vero
            switch (lvlString[i]) {
               case 'X': //posizione iniziale del player
                  var currentIndex = i;
                  level['xStartingPos'] = (i % widthTot) * 20;
                  level['yStartingPos'] = (heightTot - 2) * 20;
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  i = currentIndex;
                  break;
               case 't': // t è il top floor/ceiling
                  widthTot++;
                  break;

               case 'l': // l è il left floor
                  heightTot++;
                  break;

               case 'w': // w funziona come left floor ma indica anche il water level
                  heightTot++;
                  level['waterLevel'] = ((heightTot - 1) * 20) + 7; //setta il waterlevel
                  break;

               case '.': // . è vuoto/aria
                  break;

                  //ora le entita' (lettere maiuscole) 
               case 'P': // P indica un pipistrello
                  var pipistrello = new newPipistrello();
                  pipistrello.x = (i % widthTot) * 20;
                  pipistrello.y = (heightTot - 1) * 20 + 10;
                  entity.push(pipistrello);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'B': // B indica un bunny (coniglio)
                  var entita = new newBunny();
                  entita.x = (i % widthTot) * 20;
                  entita.y = (heightTot - 1) * 20 - 2;
                  entity.push(entita);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'A': // A indica un ape (bomb bee)
                  var entita = new newBombBee();
                  entita.x = (i % widthTot) * 20;
                  entita.y = (heightTot - 1) * 20 - 2;
                  entity.push(entita);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'S': //S sono le spike (le spine che instaKillano)
                  var spike = new newSpike();
                  spike.x = (i % widthTot) * 20;
                  spike.y = (heightTot - 1) * 20;
                  entity.push(spike);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case '0':
               case '1':
               case '2':
               case '3': //sono i pezzi di armatura
                  var armatura = new newPickUp_Armor(parseInt(lvlString[i], 10));
                  armatura.x = (i % widthTot) * 20;
                  armatura.y = (heightTot - 1) * 20;
                  entity.push(armatura);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case '4':
               case '5':
               case '6':
               case '7': //sono le subtank
                  var subtankLetta = new newPickUp_Subtank(parseInt(lvlString[i], 10) - 4);
                  subtankLetta.x = (i % widthTot) * 20;
                  subtankLetta.y = (heightTot - 1) * 20;
                  entity.push(subtankLetta);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case '⁰':
               case '¹':
               case '²':
               case '³':
               case '⁴':
               case '⁵':
               case '⁶':
               case '⁷': //sono i cuori che aumentano la vita
                  //caratteri per copiare/incollare:  ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
                  var cuore = new newPickUp_Cuore(lvlString[i]);
                  cuore.x = (i % widthTot) * 20;
                  cuore.y = (heightTot - 1) * 20 - 1;
                  entity.push(cuore);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'à': //small life recovery
                  var lifeRec = new newPickUp_LifeEnergy(2);
                  lifeRec.width = 10;
                  lifeRec.height = 10;
                  lifeRec.x = (i % widthTot) * 20 + (10 - lifeRec.width / 2);
                  lifeRec.y = (heightTot - 1) * 20 + 1;
                  entity.push(lifeRec);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'À': //big life recovery
                  var lifeRec = new newPickUp_LifeEnergy(8);
                  lifeRec.width = 18;
                  lifeRec.height = 18;
                  lifeRec.x = (i % widthTot) * 20 + (10 - lifeRec.width / 2);
                  lifeRec.y = (heightTot - 1) * 20 + 1;
                  entity.push(lifeRec);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

               case 'è': //small weapon recovery
                  var weaponRec = new newPickUp_WeaponEnergy(2);
                  weaponRec.width = 10;
                  weaponRec.height = 10;
                  weaponRec.x = (i % widthTot) * 20 + (10 - weaponRec.width / 2);
                  weaponRec.y = (heightTot - 1) * 20 + 1;
                  entity.push(weaponRec);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;
               case 'È': //big weapon recovery
                  var weaponRec = new newPickUp_WeaponEnergy(8);
                  weaponRec.width = 18;
                  weaponRec.height = 18;
                  weaponRec.x = (i % widthTot) * 20 + (10 - weaponRec.width / 2);
                  weaponRec.y = (heightTot - 1) * 20 + 1;
                  entity.push(weaponRec);
                  checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
                  break;

                  //i blocchi
               case 'a':
               case 'b':
               case 'c':
               case 'd':
               case 'e':
               case 'f':
               case 'g':
               case 'h':
               case 'i':
               case 'j':
               case 'k':
                  // le lettere dalla a alla k indicano un blocco da 20px*20px di colori diversi
                  leggiBlocco(level, lvlString[i]);
                  break;

               case 'm':
               case 'n':
               case 'o': //foreground
                  leggiBlocco(foreground, lvlString[i]);
                  break;

               case 'p':
               case 'q':
               case 'r': //background 
                  leggiBlocco(background, lvlString[i]);
                  break;

               case 'z': // 'z' indica la fine del livello. Da qui in poi non sto leggendo piu blocchi e entita' ma le caratteristiche del livello come gravita', posizione iniziale del player e colore dei blocchi del livello
                  widthTot++;
                  heightTot++;
                  level['gravity'] = readNumber();
                  level['friction'] = readNumber();
                  level['gravityWater'] = level.gravity * 4 / 7;
                  level['frictionWater'] = level.friction * 9 / 10;
                  blocksColors(level, 11); //this will push color[] to level, it will contain the blocks colors
                  blocksColors(foreground, 3);
                  blocksColors(background, 3);
                  level['foreground'] = foreground;
                  level['background'] = background;
                  level['backGroundImg'] = readBackground();
                  break;
            } //fine dello switch case															
         } //fine del for

         //imposto la grandezza del livello e lo confronto con la grandezza del canvas
         level['maxWidth'] = widthTot * 20;
         level['maxHeight'] = heightTot * 20;
         if (level.maxWidth < canvas.width) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
            canvasWidth = level.maxWidth;
         } else {
            canvasWidth = canvas.width;
         }
         if (level.maxHeight < canvas.height) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
            canvasHeight = level.maxHeight;
         } else {
            canvasHeight = canvas.height;
         }
         //imposto i colori dei blocchi in base a quello che ho letto
         for (i = 0; i < level.length; i++) {
            switch (level[i].lettera) {
               case 'a':
                  level[i].color = level.color[0];
                  break;
               case 'b':
                  level[i].color = level.color[1];
                  break;
               case 'c':
                  level[i].color = level.color[2];
                  break;
               case 'd':
                  level[i].color = level.color[3];
                  break;
               case 'e':
                  level[i].color = level.color[4];
                  break;
               case 'f':
                  level[i].color = level.color[5];
                  break;
               case 'g':
                  level[i].color = level.color[6];
                  break;
               case 'h':
                  level[i].color = level.color[7];
                  break;
               case 'i':
                  level[i].color = level.color[8];
                  break;
               case 'j':
                  level[i].color = level.color[9];
                  break;
               case 'k':
                  level[i].color = level.color[10];
                  break;
            }
         }
         for (i = 0; i < level.foreground.length; i++) {
            switch (level.foreground[i].lettera) {
               case 'm':
                  level.foreground[i].color = level.foreground.color[0];
                  break;
               case 'n':
                  level.foreground[i].color = level.foreground.color[1];
                  break;
               case 'o':
                  level.foreground[i].color = level.foreground.color[2];
                  break;
            }
         }
         for (i = 0; i < level.background.length; i++) {
            switch (level.background[i].lettera) {
               case 'p':
                  level.background[i].color = level.background.color[0];
                  break;
               case 'q':
                  level.background[i].color = level.background.color[1];
                  break;
               case 'r':
                  level.background[i].color = level.background.color[2];
                  break;
            }
         }
         //ora inizializzo i bordi - ho schiacciato il codice perche' occupava righe inutili. e' molto simile al prototipo di blocco    
         var ground = {
            x: 0,
            width: level.maxWidth,
            height: (20) + 1,
            color: level.color[0]
         };
         ground['y'] = level.maxHeight - ground.height;
         var ceiling = {
            x: 0,
            y: 0,
            width: level.maxWidth,
            height: (20) + 1,
            color: level.color[0]
         };
         var leftWall = {
            x: 0,
            y: 0,
            width: (20) + 1,
            height: level.maxHeight,
            color: level.color[0]
         };
         var rightWall = {
            y: 0,
            width: (20) + 1,
            height: level.maxHeight,
            color: level.color[0]
         };
         rightWall['x'] = level.maxWidth - rightWall.width;
         level.push(ground, ceiling, leftWall, rightWall); //this pushes all of the static objects into the level				   

         // ora definisco le funzioni interne di stringToLevel()
         function readNumber() { //compone i vari caratteri di una stringa in numero. Esempio traduce "10.91;" in numeroLetto=10.91
            var numeroLetto = 0;
            var isDecimale = false;
            var esponente = 0;
            for (i++; i < lvlString.length; i++) {
               if (lvlString[i] != ";") {
                  if (lvlString[i] == '.' || lvlString[i] == ',') { //determina se il numero che sto leggendo avra' delle cifre decimali
                     isDecimale = true;
                  } else {
                     if (!isDecimale) {
                        numeroLetto = (numeroLetto * 10) + Number(lvlString[i]);
                     } else {
                        esponente--;
                        numeroLetto = numeroLetto + (Number(lvlString[i]) * Math.pow(10, esponente))
                     }
                  }
               } else {
                  break;
               }
            }
            return numeroLetto;
         }

         function readBackground() {
            var immagineLetta = "";
            if (i < lvlString.length) {
               for (i++; i < lvlString.length; i++) {
                  immagineLetta += lvlString[i]
               }
            }
            if (immagineLetta != "" && immagineLetta != " ") {
               var img = new Image();
               img.src = immagineLetta;
               return img;
            } else {
               return "";
            }
         }

         function readColor() {
            var coloreLetto = "";
            if (i < lvlString.length) {
               for (i++; i < lvlString.length; i++) {
                  if (lvlString[i] != ";") {
                     coloreLetto += lvlString[i]
                  } else {
                     break;
                  }
               }
            }
            if (coloreLetto == "") {
               return "#155261";
            } else {
               return coloreLetto;
            }
         }

         function blocksColors(vettore, numeroDiLetture) {
            var color = [];
            for (n = 0; n < numeroDiLetture; n++) {
               color[n] = readColor();
            }
            vettore['color'] = color;
         }

         function leggiBlocco(vettore, lettera) {
            var blocco = new Blocco(i, widthTot, heightTot);
            for (n = 1;; n++) { //controllo che se le lettere dopo sono uguali a questo blocco. Se lo sono non sto a creare tanti blocchetti ma ne faccio solo uno piu' largo per ottimizzare
               if (lvlString[i + n] == lettera) {
                  blocco.width = blocco.width + (20);
               } else {
                  i = i + n - 1;
                  break; //del for
               }
            }
            blocco.width = blocco.width + 1;
            blocco['lettera'] = lettera;
            vettore.push(blocco);
         }

         function Blocco(i, widthTot, heightTot) { //prototipo di blocco
            this.x = (i % widthTot) * 20;
            this.y = (heightTot - 1) * 20;
            this.width = 20;
            this.height = 20 + 1;
            this.color = '#155261';
         }

         function checkBackAndForGround(background, foreground, bloccoPrima) {
            if (bloccoPrima == 'p' || bloccoPrima == 'q' || bloccoPrima == 'r') {
               leggiBlocco(background, bloccoPrima);
            } else if (bloccoPrima == 'm' || bloccoPrima == 'n' || bloccoPrima == 'o') {
               leggiBlocco(foreground, bloccoPrima);
            }
         }
      } //fine di stringToLevel()

      var entity = []; //create the entity array. Ogni entità deve avere: x, y, width, height e il metodo physics che determinerà come si comporta l'entità

      //adesso inizio i prototipi delle entita'

      function newSparo(larghezza, altezza) { //lo sparo creato dal player
         this.life = 1;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 6;
         } else {
            this.x = player.x - 6 - larghezza;
         }
         this.xv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 9;
         this.color = player.charge0color;
         this.speed = 3.9;
         this.perforation = false;
         this.canPassWall = false;
         this.hasPhysics = true;
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.facingRight) {
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            if (this.type != "enemyShot") {
               for (i = 0; i < entity.length; i++) {
                  if (!(i == indiceDiQuestaEntity)) {
                     if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                        if (entity[i].getHit) {
                           entity[i].getHit("sparo", this.damage);
                        }
                        if (!(entity[i].life < 1 && this.perforation)) {
                           this.life = -1;
                        }
                     }
                  }
               }
            }

            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 1;
               this.active = false;
            }
         }
      }

      function newSparoCharge3(xPassata, yPassata, larghezza, altezza, indicePassato, faceRight, goUp) { //lo sparo creato dal player - carica 3
         this.index = indicePassato;
         this.numeroFigli = 5;
         this.life = 1;
         this.type = "sparoDelPlayer";
         this.damage = 4;
         this.facingRight = faceRight;
         this.x = xPassata;
         this.startingX = this.x;
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = yPassata;
         this.startingY = yPassata;
         this.minY = this.startingY - (this.height);
         this.maxY = this.startingY + (this.height);
         this.startingDirection = goUp;
         this.goingUp = goUp;
         this.color = player.charge0color;
         this.speed = 2.5;
         this.ySpeed = 2.5; //velocita con cui va su e giu
         this.perforation = true;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento x dello sparo
            if (this.facingRight) {
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            //movimento y dello sparo
            if (this.goingUp) {
               this.yv -= this.ySpeed;
               if (this.y < this.minY) {
                  this.goingUp = false;
               }
            } else {
               this.yv += this.ySpeed;
               if (this.y > this.maxY) {
                  this.goingUp = true;
               }
            }
            this.yv *= level.friction;
            this.y += this.yv;
            //creazione degli spari figli
            if (this.index < this.numeroFigli - 1) {
               if (creaFiglio(this.startingX, this.facingRight, this.x, this.width, this.startingY, this.height, this.index, this.color, this.startingDirection)) {
                  this.index = this.numeroFigli;
               }
            }
            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "ostacolo" || entity[i].type == "piattaforma" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("sparoCh3", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            //non c'e' nessun activeShot-- perche' il counter lo altera lo sparoInvisibile

            function creaFiglio(startingX, facingRight, x, width, startingY, height, index, color, startingDirection) {
               var xMax = startingX;
               if (facingRight) {
                  if (((x) - (width)) > xMax) {
                     var sparoFiglio = new newSparoCharge3((x - width), startingY, width, height, index + 1, facingRight, startingDirection);
                     sparoFiglio.color = color;
                     entity.push(sparoFiglio);
                     return true;
                  }
               } else {
                  if (x + (width) < (xMax)) {
                     var sparoFiglio = new newSparoCharge3((x + (width)), startingY, width, height, index + 1, facingRight, startingDirection);
                     sparoFiglio.color = color;
                     entity.push(sparoFiglio);
                     return true;
                  }
               }
               return false;
            } //fine di crea figlio
         } //fine di this.physics      
      }

      function newHomingMissle(larghezza, altezza, color1Pass, color2Pass, pesoShot) { //lo sparo creato dal player
         this.life = 1;
         this.active = true;
         this.activeShotCounter = pesoShot;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         if (player.facingRight) {
            this.x = player.x + player.width + 6;
            this.xv = 3;
         } else {
            this.x = player.x - 6 - larghezza;
            this.xv = -3;
         }
         this.speed = 1.3;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 9;
         this.targetIndex = -1;
         this.color1 = color1Pass;
         this.color2 = color2Pass;
         this.perforation = false;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = this.color1;
            ctx.beginPath();
            ctx.lineWidth = 1;
            var larghezzaMissile = this.width / 2;
            var velMin = 3;
            if (this.xv < velMin && this.xv > -velMin && this.yv > velMin) { //dritto verso l'alto
               baseMissileVerticale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + this.width / 2 + larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + 2, 2, larghezzaMissile - 1);
               ctx.fillRect(xdisegnata + this.width / 2 - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + 2, 2, larghezzaMissile - 1);
            } else if (this.xv < velMin && this.xv > -velMin && this.yv < velMin) { //dritto verso il basso
               baseMissileVerticale((xdisegnata), (ydisegnata + this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + this.width / 2 + larghezzaMissile / 2 - 1, ydisegnata - 1, 2, larghezzaMissile - 1);
               ctx.fillRect(xdisegnata + this.width / 2 - larghezzaMissile / 2 - 1, ydisegnata - 1, 2, larghezzaMissile - 1);
            } else if (this.yv < velMin && this.yv > -velMin && this.xv > velMin) { //dritto a destra
               baseMissileLaterale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile), this.color2);
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata - 1, ydisegnata + this.height / 2 - larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
               ctx.fillRect(xdisegnata - 1, ydisegnata + this.height / 2 + larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
            } else if (this.yv < velMin && this.yv > -velMin && this.xv < velMin) { //dritto a sinistra
               baseMissileLaterale((xdisegnata + this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + this.width - larghezzaMissile + 2, ydisegnata + this.height / 2 - larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
               ctx.fillRect(xdisegnata + this.width - larghezzaMissile + 2, ydisegnata + this.height / 2 + larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
            } else if (this.xv > velMin && this.yv > velMin) { //verso l'alto e destra
               baseMissileDiagonale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
               ctx.beginPath();
               ctx.lineWidth = 2;
               ctx.strokeStyle = this.color2;
               ctx.moveTo(xdisegnata - 1, ydisegnata + this.height - larghezzaMissile + 1);
               ctx.lineTo(xdisegnata + larghezzaMissile - 1, ydisegnata + this.height - larghezzaMissile - larghezzaMissile / 2 - 2);
               ctx.moveTo(xdisegnata + larghezzaMissile - 1, ydisegnata + this.height + 1);
               ctx.lineTo(xdisegnata + larghezzaMissile * 2 - 1, ydisegnata + this.height - larghezzaMissile / 2 - 2);
               ctx.stroke();
            } else if (this.xv < velMin && this.yv > velMin) { //verso l'alto e sinistra
               baseMissileDiagonale((xdisegnata + this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
               ctx.beginPath();
               ctx.lineWidth = 2;
               ctx.strokeStyle = this.color2;
               ctx.moveTo(xdisegnata + this.width - larghezzaMissile + 1, ydisegnata + this.height + 1);
               ctx.lineTo(xdisegnata + this.width - larghezzaMissile - larghezzaMissile / 2 - 1, ydisegnata + this.height - larghezzaMissile / 2 - 1);
               ctx.moveTo(xdisegnata + this.width + 1, ydisegnata + this.height - larghezzaMissile + 1);
               ctx.lineTo(xdisegnata + this.width - larghezzaMissile / 2 - 1, ydisegnata + this.height - larghezzaMissile - larghezzaMissile / 2 - 1);
               ctx.stroke();
            } else if (this.xv < velMin && this.yv < velMin) { //verso il basso e sinistra
               baseMissileDiagonale((xdisegnata + this.width), (ydisegnata + this.height), (-this.width), (-this.height), (-larghezzaMissile), (-larghezzaMissile));
               ctx.beginPath();
               ctx.lineWidth = 2;
               ctx.strokeStyle = this.color2;
               ctx.moveTo(xdisegnata + this.width - larghezzaMissile + 1, ydisegnata - 1);
               ctx.lineTo(xdisegnata + this.width - larghezzaMissile - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile - 2);
               ctx.moveTo(xdisegnata + this.width + 1, ydisegnata + larghezzaMissile - 1);
               ctx.lineTo(xdisegnata + this.width - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + larghezzaMissile / 2 + 1);
               ctx.stroke();
            } else if (this.xv > velMin && this.yv < velMin) { //verso il basso e destra
               baseMissileDiagonale((xdisegnata), (ydisegnata + this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
               ctx.beginPath();
               ctx.lineWidth = 2;
               ctx.strokeStyle = this.color2;
               ctx.moveTo(xdisegnata - 1, ydisegnata + this.height - larghezzaMissile - 1);
               ctx.lineTo(xdisegnata + larghezzaMissile / 2 + 1, ydisegnata + this.height - larghezzaMissile + larghezzaMissile / 2 + 1);
               ctx.moveTo(xdisegnata + larghezzaMissile - 1, ydisegnata - 1);
               ctx.lineTo(xdisegnata + larghezzaMissile + larghezzaMissile / 2 + 1, ydisegnata + larghezzaMissile / 2 + 1);
               ctx.stroke();
            }

            function baseMissileVerticale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
               ctx.moveTo(xdisegnata + width / 2, ydisegnata);
               ctx.lineTo(xdisegnata + width / 2 + larghezzaMissile / 2, ydisegnata + altezzaMissile);
               ctx.lineTo(xdisegnata + width / 2 + larghezzaMissile / 2, ydisegnata + height);
               ctx.lineTo(xdisegnata + width / 2 - larghezzaMissile / 2, ydisegnata + height);
               ctx.lineTo(xdisegnata + width / 2 - larghezzaMissile / 2, ydisegnata + altezzaMissile);
               ctx.lineTo(xdisegnata + width / 2, ydisegnata);
               ctx.fill();
            }

            function baseMissileLaterale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
               ctx.moveTo(xdisegnata + width, ydisegnata + height / 2);
               ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata + height / 2 + altezzaMissile / 2);
               ctx.lineTo(xdisegnata, ydisegnata + height / 2 + altezzaMissile / 2);
               ctx.lineTo(xdisegnata, ydisegnata + height / 2 - altezzaMissile / 2);
               ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata + height / 2 - altezzaMissile / 2);
               ctx.lineTo(xdisegnata + width, ydisegnata + height / 2);
               ctx.fill();
            }

            function baseMissileDiagonale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
               ctx.moveTo(xdisegnata + width, ydisegnata);
               ctx.lineTo(xdisegnata + width, ydisegnata + altezzaMissile);
               ctx.lineTo(xdisegnata + larghezzaMissile, ydisegnata + height);
               ctx.lineTo(xdisegnata, ydisegnata + height - altezzaMissile);
               ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata);
               ctx.lineTo(xdisegnata + width, ydisegnata);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.targetIndex == -1) {
               this.targetIndex = findTarget(this.x + this.width / 2, this.y + this.height / 2);
               if (this.xv < 0) {
                  this.xv -= this.speed
               } else {
                  this.xv += this.speed
               }
            } else {
               if (entity[this.targetIndex].life > 0) { //insegue il target
                  if (this.x < entity[this.targetIndex].x + (entity[this.targetIndex].width / 2)) {
                     this.xv += this.speed;
                  } else {
                     this.xv -= this.speed;
                  }
                  if (this.y < entity[this.targetIndex].y + (entity[this.targetIndex].height / 2)) {
                     this.yv -= this.speed / (1.5);
                  } else {
                     this.yv += this.speed / (1.5);
                  }
               } else {
                  this.targetIndex = -1;
               }
            }
            this.xv *= level.friction;
            this.x += this.xv;
            this.yv *= level.friction;
            this.y += -this.yv;
            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("missle", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - this.activeShotCounter;
               this.active = false;
            }

            function findTarget(x, y) {
               var closestEntityX = 999999999999;
               var closestEntityY = 999999999999;
               var closestEntityIndex = -1;
               for (i = 0; i < entity.length; i++) {
                  if (entity[i].life > 0) {
                     if (entity[i].type == "mostro" || entity[i].type == "monster") {
                        if (((entity[i].x < x && entity[i].x > x - canvasWidth / 1.25) || (entity[i].x > x && entity[i].x < x + canvasWidth / 1.25)) && ((entity[i].y < y && entity[i].y > y - canvasHeight / 1.25) || (entity[i].y > y && entity[i].y < y + canvasHeight / 1.25))) { //se e' circa nello schermo
                           var entX = entity[i].x + entity[i].width / 2;
                           var entY = entity[i].y + entity[i].height / 2;
                           prevDistanceX = x - closestEntityX;
                           if (prevDistanceX < 0) {
                              prevDistanceX = -1 * prevDistanceX;
                           }
                           prevDistanceY = y - closestEntityY;
                           if (prevDistanceY < 0) {
                              prevDistanceY = -1 * prevDistanceY;
                           }
                           distanceX = x - entX;
                           if (distanceX < 0) {
                              distanceX = -1 * distanceX;
                           }
                           distanceY = y - entY;
                           if (distanceY < 0) {
                              distanceY = -1 * distanceY;
                           }
                           if ((distanceX + distanceY) < (prevDistanceX + prevDistanceY)) {
                              closestEntityX = entX;
                              closestEntityY = entY;
                              closestEntityIndex = i;
                           }
                        }
                     }
                  }
               }
               return closestEntityIndex;
            } //fine findTarget
         } //fine homingMissle physics
      } //fine newHomingMissle      

      function newChameleonSting(larghezza, altezza) { //lo sparo creato dal player - cham sting main
         this.life = 1;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 17;
         } else {
            this.x = player.x - 17 - larghezza;
         }
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 7;
         this.figliY = player.y + 14;
         this.color = "#b0f000";
         this.timer = 0;
         this.growthSpeed = 0.1;
         this.hasPhysics = true;
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.timer++;
            this.width += this.growthSpeed;
            this.x -= this.growthSpeed / 2;
            this.height += this.growthSpeed;
            this.y -= this.growthSpeed / 2;
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("chameleonCh1", this.damage);
                     }
                     if (!(entity[i].life < 1)) {
                        this.life = -1;
                     }
                  }
               }
            }
            if (this.timer > 10 && this.life > 0) { //crea figli
               var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY, 30, 6, 4, 0, this.facingRight, this.color);
               entity.push(sparoFiglio);
               var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY - 5, 30, 6, 4, 1, this.facingRight, this.color);
               entity.push(sparoFiglio);
               var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY - 1, 30, 6, 4, -1, this.facingRight, this.color);
               entity.push(sparoFiglio);
               this.life = -1;
            }
         } //fine physics
      } //fine cham sting main
      function newChameleonSting_Figli(xPass, yPass, larghezza, altezza, xSpeedPass, ySpeedPass, facingRightPass, colorPass) { //figli di cham sting
         this.life = 1;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = facingRightPass;
         this.x = xPass;
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = yPass;
         this.color = colorPass;
         this.xSpeed = xSpeedPass;
         this.ySpeed = ySpeedPass;
         this.perforation = false;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            var larghezzaLinea = 6;
            ctx.lineWidth = larghezzaLinea;
            if (this.ySpeed == 0) { //dritto
               ctx.moveTo(xdisegnata, ydisegnata + this.height / 2 - larghezzaLinea / 2);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - larghezzaLinea / 2);
            } else if ((this.ySpeed > 0.1 && this.facingRight) || (this.ySpeed < -0.1 && !this.facingRight)) {
               ctx.moveTo(xdisegnata, ydisegnata + this.height);
               ctx.lineTo(xdisegnata + this.width, ydisegnata);
            } else if ((this.ySpeed < -0.1 && this.facingRight) || (this.ySpeed > 0.1 && !this.facingRight)) {
               ctx.moveTo(xdisegnata, ydisegnata);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
            }
            ctx.stroke();
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.facingRight) {
               this.xv -= this.xSpeed;
            } else {
               this.xv += this.xSpeed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            this.yv -= this.ySpeed;
            this.yv *= level.friction;
            this.y += this.yv;
            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("chameleonCh1", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            //disattiva counter dei colpi          
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 1;
               this.active = false;
            }
         }
      }

      function newRollingShield(larghezza, altezza) { //lo sparo creato dal player
         this.life = 1;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 6;
            this.xv = -10;
         } else {
            this.x = player.x - 6 - larghezza;
            this.xv = 10;
         }
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y;
         this.color = "#2860b8";
         this.speed = 2;
         this.rotation = 0;
         this.isInWater = false;
         this.canBounce = true;
         this.perforation = false;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (this.rotation < 5) {
               var lungLato = this.width / 2;
               ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
               ctx.fill();
            } else {
               ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height / 8);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
               ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height - this.height / 8);
               ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height - this.height / 8);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
               ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height / 8);
               ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.rotation++;
            if (this.rotation > 10) {
               this.rotation = 0;
            } //animazione rotazione
            //movimento dello sparo
            if (this.facingRight) {
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               if (!this.isInWater) {
                  this.isInWater = true;
                  this.yv = 0;
               }
               gravityApplicata = level.gravityWater;
               frizioneApplicata = level.frictionWater;
            } else {
               this.isInWater = false;
               gravityApplicata = level.gravity;
               frizioneApplicata = level.friction;
            }
            this.yv += gravityApplicata; //get level gravity
            if (this.yv > 19) {
               this.yv = 19;
            } //limita la gravita'
            this.y += this.yv; //apply gravity

            for (i = 0; i < level.length; i++) { // collision with level
               if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
                  this.y = level[i].y - this.height - 1;
                  this.yv = this.yv / 2;
               }
               if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
                  if (this.canBounce) {
                     this.canBounce = false;
                     if (this.facingRight) {
                        this.x = level[i].x - this.width - 1;
                     } else {
                        this.x = level[i].x + level[i].width + 1;
                     }
                     this.xv = 0;
                     this.facingRight = !this.facingRight;
                  } else {
                     this.life = -1;
                  }
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("shieldCh1", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         } //fine physics
      } //fine rolling shield

      function newRollingShieldCharge3(larghezza, altezza) { //lo sparo creato dal player
         this.life = 2;
         this.duration = 700;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.width = larghezza;
         this.height = altezza;
         this.x = player.x + player.width / 2 - this.width / 2;
         this.y = player.y + player.height / 2 - this.height / 2;
         this.color = "#2860b899";
         this.rotation = 0;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (this.rotation < 5) {
               var lungLato = this.width / 2;
               ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
               ctx.fill();
            } else {
               ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
               ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height / 8);
               ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
               ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height - this.height / 8);
               ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
               ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height - this.height / 8);
               ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
               ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height / 8);
               ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.rotation++;
            if (this.rotation > 10) {
               this.rotation = 0;
            } //animazione rotazione
            //movimento dello sparo
            this.x = player.x + player.width / 2 - this.width / 2;
            this.y = player.y + player.height / 2 - this.height / 2;

            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (!(entity[i].life < this.life)) {
                        this.life = -1;
                     }
                     if (entity[i].getHit) {
                        entity[i].getHit("shieldCh3", this.damage);
                     }
                  }
               }
            }
            //duration
            this.duration--;
            if (this.duration < 0) {
               this.life = -1;
            }
            //disattivazione sparo          
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
               player.canChangeWeap = true;
            }
         } //fine physics
      } //fine rolling shield charge3

      function newFireWave(larghezza, altezza) { //lo sparo creato dal player
         this.timer = 0;
         this.life = 1;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         if (player.facingRight) {
            this.x = player.x + player.width + 14;
         } else {
            this.x = player.x - 8 - larghezza;
         }
         this.y = player.y + 9;
         this.width = larghezza;
         this.height = altezza;
         this.color1 = player.power[3].color1;
         this.color2 = player.power[3].color2;
         this.inWater = false;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var numeroFiamme = Math.round((this.width / 10));
            var fiammeWidth = (this.width / numeroFiamme) - 1;
            for (i = 0; i < numeroFiamme; i++) {
               ctx.fillStyle = this.color1;
               ctx.fillRect(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.height);
               disegnaFiammella(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.color1);
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.height - 4);
               disegnaFiammella(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.color2);
            }

            function disegnaFiammella(x, y, fiammeWidth, color) {
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.lineWidth = 1;
               var lato = fiammeWidth / 6;
               ctx.moveTo(x, y + 1);
               ctx.lineTo(x + lato, y - lato * 2);
               ctx.lineTo(x + lato * 2, y + 1);
               ctx.lineTo(x + lato * 4, y - lato * 4);
               ctx.lineTo(x + lato * 6, y + 1);
               ctx.lineTo(x, y + 1);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento(insieme al player)
            if (player.facingRight) {
               this.x = player.x + player.width + 14;
            } else {
               this.x = player.x - 8 - larghezza;
            }
            this.y = player.y + 9;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               this.inWater = true;
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("fireCh1", this.damage);
                     }
                  }
               }
            }
            if (keys[sparokey] && !this.inWater && player.power[3].usage > 0 && player.activePower == 4 && (player.carica < 150 || !armaturaAcquired[2])) {
               if (this.timer == 40) {
                  player.power[3].usage--;
                  this.timer = 0;
               } else {
                  this.timer++;
               }
            } else {
               this.life = -1;
               player.activeShot = player.activeShot - 3;
            }
         }
      }

      function newFireWaveCharge3Main(larghezza, altezza) { //lo sparo creato dal player
         this.life = 1;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 6;
            this.xv = -1;
         } else {
            this.x = player.x - 6 - larghezza;
            this.xv = 1;
         }
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y;
         this.color1 = player.power[3].color1;
         this.color2 = player.power[3].color2;
         this.speed = 1;
         this.perforation = true;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var numeroFiamme = 1;
            var fiammeWidth = (this.width / numeroFiamme) - 1;
            for (i = 0; i < numeroFiamme; i++) {
               ctx.fillStyle = this.color1;
               ctx.fillRect(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.height);
               disegnaFiammella(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.color1);
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.height - 4);
               disegnaFiammella(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.color2);
            }

            function disegnaFiammella(x, y, fiammeWidth, color) {
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.lineWidth = 1;
               var lato = fiammeWidth / 6;
               ctx.moveTo(x, y + 1);
               ctx.lineTo(x + lato, y - lato * 2);
               ctx.lineTo(x + lato * 2, y + 1);
               ctx.lineTo(x + lato * 4, y - lato * 4);
               ctx.lineTo(x + lato * 6, y + 1);
               ctx.lineTo(x, y + 1);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.facingRight) {
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               this.life = -1;
            }
            this.yv += level.gravity;
            if (this.yv > 19) {
               this.yv = 19;
            } //limita la gravita'
            this.y += this.yv; //apply gravity

            for (i = 0; i < level.length; i++) { //y collision with level
               if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
                  this.y = level[i].y - this.height - 0.2;
                  var sparofiglio = new newFireWaveCharge3Figli(this.x, this.y, this.width, this.height, 4, this.facingRight);
                  sparofiglio.active = true;
                  entity.push(sparofiglio);
                  this.life = -1;
                  this.active = false;
               }
               if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("fireCh3", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         } //fine physics
      } //fine firewave charge3 main
      function newFireWaveCharge3Figli(xPass, yPass, larghezza, altezza, indicePass, facingPass) {
         this.life = 1;
         this.indice = indicePass;
         this.active = false;
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.facingRight = facingPass;
         this.appoggiatoInBasso = false;
         this.x = xPass;
         this.y = yPass;
         this.startingY = this.y;
         this.width = larghezza;
         this.height = altezza;
         this.startingHeight = this.height;
         this.color1 = player.power[3].color1;
         this.color2 = player.power[3].color2;
         this.speed = 1;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var numeroFiamme = Math.floor(this.height / this.startingHeight);
            var fiammeWidth = this.width - 1;
            for (i = 1; i < numeroFiamme + 1; i++) {
               ctx.fillStyle = this.color1;
               ctx.fillRect(xdisegnata + 1, ydisegnata + this.height - (this.startingHeight * i), fiammeWidth - 1, this.startingHeight);
               disegnaFiammella(xdisegnata + 1, ydisegnata + this.height - (this.startingHeight * i), fiammeWidth - 1, this.color1);
               ctx.fillStyle = this.color2;
               ctx.fillRect(xdisegnata + 3, ydisegnata + 2 + this.height - (this.startingHeight * i), fiammeWidth - 5, this.startingHeight - 4);
               disegnaFiammella(xdisegnata + 3, ydisegnata + 2 + this.height - (this.startingHeight * i), fiammeWidth - 5, this.color2);
            }

            function disegnaFiammella(x, y, fiammeWidth, color) {
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.lineWidth = 1;
               var lato = fiammeWidth / 6;
               ctx.moveTo(x, y + 1);
               ctx.lineTo(x + lato, y - lato * 2);
               ctx.lineTo(x + lato * 2, y + 1);
               ctx.lineTo(x + lato * 4, y - lato * 4);
               ctx.lineTo(x + lato * 6, y + 1);
               ctx.lineTo(x, y + 1);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.height += this.startingHeight / 4;
            this.y -= this.startingHeight / 4;
            this.appoggiatoInBasso = false;
            for (i = 0; i < level.length; i++) { //y collision with level
               this.height += 1;
               if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
                  this.height -= 1;
                  this.appoggiatoInBasso = true;
                  if (this.height == this.startingHeight * 4) {
                     if (this.facingRight) {
                        var sparofiglio = new newFireWaveCharge3Figli(this.x + this.width + 1, this.startingY, this.width, this.startingHeight, -1, this.facingRight);
                        sparofiglio.active = this.active;
                        entity.push(sparofiglio);
                     } else {
                        var sparofiglio = new newFireWaveCharge3Figli(this.x - this.width - 1, this.startingY, this.width, this.startingHeight, -1, this.facingRight);
                        sparofiglio.active = this.active;
                        entity.push(sparofiglio);
                     }
                     this.life = -1;
                     this.active = false;
                     if (this.indice > 1) {
                        var sparofiglio = new newFireWaveCharge3Figli(this.x, this.startingY, this.width, this.startingHeight, this.indice - 1, this.facingRight);
                        entity.push(sparofiglio);
                        this.indice = -1;
                     }
                  }
                  this.height += 1;
               }
               this.height -= 1;
               if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
                  this.life = -1;
               }
            }
            if (!this.appoggiatoInBasso) {
               this.life = -1;
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("fireCh3", this.damage);
                     }
                  }
               }
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         } //fine physics
      } //fine firewave ch3 figlio  

      function newStormTornado(xPassata, yPassata, larghezza, altezza, indicePassato, faceRight, goUp) { //lo sparo creato dal player - carica 3
         this.index = indicePassato;
         this.active = true;
         this.main = false;
         this.contaLife = 0;
         this.facingRight = faceRight;
         if (indicePassato == 0) {
            if (goUp) { //individua il main
               this.main = true;
            }
            if (this.facingRight) {
               this.x = xPassata + player.width + 6;
            } else {
               this.x = xPassata - 6 - larghezza;
            }
         } else {
            this.x = xPassata;
         }
         this.startingX = this.x;
         this.numeroFigli = 40;
         this.life = 1;
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = yPassata;
         this.startingY = yPassata;
         this.minY = this.startingY - (this.height / 4);
         this.maxY = this.startingY + (this.height / 4);
         this.minX = this.startingX - (this.width);
         this.maxX = this.startingX + (this.width);
         this.startingDirection = goUp;
         this.goingUp = goUp;
         this.moveNext = faceRight;
         this.color = "#f5aad5";
         this.speed = 0.5;
         this.xSpeed = 1;
         this.ySpeed = 0.5; //velocita con cui va su e giu
         this.perforation = true;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.speed += 0.0012;
            //movimento x dello sparo
            if (this.facingRight) {
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            //movimento y dello sparo
            if (this.goingUp) {
               this.yv -= this.ySpeed;
               if (this.facingRight) {
                  this.xv -= this.xSpeed / 2;
               } else {
                  this.xv += this.xSpeed / 2;
               }
               if (this.y < this.minY) {
                  this.goingUp = false;
               }
            } else {
               this.yv += this.ySpeed;
               if (this.facingRight) {
                  this.xv += this.xSpeed;
               } else {
                  this.xv -= this.xSpeed;
               }
               if (this.y > this.maxY) {
                  this.goingUp = true;
               }
            }
            this.yv *= level.friction;
            this.y += this.yv;
            this.xv *= level.friction;
            this.x += -this.xv;
            //creazione degli spari figli
            if (this.index < this.numeroFigli - 1) {
               if (creaFiglio(this.startingX, this.facingRight, this.x, this.width, this.startingY, this.height, this.index, this.color, this.startingDirection, this.speed)) {
                  this.index = this.numeroFigli;
               }
            }
            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "ostacolo" || entity[i].type == "piattaforma" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("stormCh1", this.damage);
                     }
                     this.damage = 0;
                  }
               }
            }
            if (this.contaLife > 420) {
               this.life = -1;
            }
            this.contaLife++;

            if (this.main) {
               //disattiva colpi su schermo
               if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
                  player.activeShot = player.activeShot - 3;
                  this.active = false;
               }
            }

            function creaFiglio(startingX, facingRight, x, width, startingY, height, index, color, startingDirection, velocita) {
               var xMax = startingX;
               if (facingRight) {
                  if (((x) - (width)) > xMax) {
                     var sparoFiglio = new newStormTornado((x - width), startingY, width, height, index + 1, facingRight, startingDirection);
                     sparoFiglio.color = color;
                     sparoFiglio.speed = velocita;
                     entity.push(sparoFiglio);
                     return true;
                  }
               } else {
                  if (x + (width) < (xMax)) {
                     var sparoFiglio = new newStormTornado((x + (width)), startingY, width, height, index + 1, facingRight, startingDirection);
                     sparoFiglio.color = color;
                     sparoFiglio.speed = velocita;
                     entity.push(sparoFiglio);
                     return true;
                  }
               }
               return false;
            } //fine di crea figlio
         } //fine di this.physics      
      }

      function newStormTornadoCharge3(xPass, yPass, larghezza, altezza, facingRight, durata, main) { //lo sparo creato dal player
         this.life = 1;
         this.duration = durata;
         this.active = main;
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.facingRight = facingRight;
         if (this.active) {
            if (this.facingRight) {
               this.x = player.x + player.width + 6;
            } else {
               this.x = player.x - 6 - larghezza;
               this.facingRight = true;
            }
            this.startingX = this.x;
         } else {
            this.startingX = xPass;
            this.x = xPass;
         }
         this.xv = 0;
         this.xMassima = this.startingX + 1;
         this.xMinima = this.startingX - 1;
         this.width = larghezza;
         this.height = altezza;
         this.y = yPass;
         this.color = player.power[4].color2 + "99";
         this.speed = 0.1;
         this.maxFigli = Math.ceil(canvasWidth / (this.height + 1));
         this.figli = 0;
         this.hasPhysics = true;
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.facingRight) {
               this.xv += this.speed;
               if (this.x > this.xMassima) {
                  this.facingRight = !this.facingRight
               }
            } else {
               this.xv -= this.speed;
               if (this.x < this.xMinima) {
                  this.facingRight = !this.facingRight
               }
            }
            this.xv *= level.friction;
            this.x += this.xv;
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("stormCh3", this.damage);
                     }
                  }
               }
            }
            if (this.active) {
               this.figli++;
               if (this.figli < this.maxFigli) {
                  var goRight = false;
                  if (this.figli % 2 == 0) {
                     goRight = true;
                  }
                  var sparoFiglio = new newStormTornadoCharge3(this.startingX, (this.y - this.figli * (this.height + 1)), this.width, this.height, goRight, 0, false);
                  entity.push(sparoFiglio);
                  var sparoFiglio = new newStormTornadoCharge3(this.startingX, (this.y + this.figli * (this.height + 1)), this.width, this.height, goRight, 0, false);
                  entity.push(sparoFiglio);
               }
            }
            this.duration++;
            if (this.duration > 80) {
               this.life = -1;
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         }
      }

      function newElectricSpark(larghezza, altezza) { //lo sparo creato dal player - electric spark charge 0
         this.life = 1;
         this.active = true;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 6;
         } else {
            this.x = player.x - 6 - larghezza;
         }
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 9;
         this.color = player.charge0color;
         this.speedX = 2;
         this.speedY = 0;
         this.perforation = false;
         this.canPassWall = false;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = "#f83cf8";
            ctx.beginPath();
            ctx.lineWidth = 1;
            var lungLato = this.width / 4;
            ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
            ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
            ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
            ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
            ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
            ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
            ctx.fill();
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.facingRight) { //movimento dello sparo
               this.xv -= this.speedX;
            } else {
               this.xv += this.speedX;
            }
            this.yv += this.speedY;
            this.xv *= level.friction;
            this.yv *= level.friction;
            this.x += -this.xv;
            this.y += -this.yv;

            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                     if (this.speedX != 0) { //ora genera figli (quindi solo con collisioni con level)
                        var sparoFiglioUp = new newElectricSpark(this.width, this.height);
                        sparoFiglioUp.x = this.x + this.xv / 2;
                        sparoFiglioUp.y = this.y;
                        sparoFiglioUp.canPassWall = true;
                        sparoFiglioUp.active = false;
                        sparoFiglioUp.speedX = 0;
                        sparoFiglioUp.speedY = -this.speedX;
                        entity.push(sparoFiglioUp);
                        var sparoFiglioDown = new newElectricSpark(this.width, this.height);
                        sparoFiglioDown.x = this.x + this.xv / 2;
                        sparoFiglioDown.y = this.y;
                        sparoFiglioDown.canPassWall = true;
                        sparoFiglioDown.active = false;
                        sparoFiglioDown.speedX = 0;
                        sparoFiglioDown.speedY = this.speedX;
                        entity.push(sparoFiglioDown);
                     }
                  }
               }
            } else {
               if (this.x > level.maxWidth + 100 || this.x < -100) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("electricCh1", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
               }
            }
            //disattiva colpi su schermo
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               this.active = false;
               player.activeShot = player.activeShot - 1;
            }
         }
      }

      function newElectricSparkCharge3(xPass, yPass, larghezza, altezza, facingRight) { //lo sparo creato dal player - electric spark charge 3
         this.life = 1;
         this.active = facingRight;
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.facingRight = facingRight;
         this.x = xPass;
         this.y = yPass;
         this.xv = 0;
         this.width = larghezza;
         this.height = this.width;
         this.heightMax = altezza;
         this.color = player.charge0color;
         this.speedX = 2;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.color1 = "#f83cf8";
         this.color2 = "#cb18ff99";
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = this.color2;
            ctx.fillRect(xdisegnata + this.width / 4, ydisegnata + this.width / 2, this.width / 2, this.height - this.width / 2);
            drawPalla(xdisegnata, ydisegnata, this.width, this.width, this.color1);
            drawPalla(xdisegnata, ydisegnata + this.height - this.width / 2, this.width, this.width, this.color1);

            function drawPalla(xdisegnata, ydisegnata, pallawidth, pallaheight, color) {
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.lineWidth = 1;
               var lungLato = pallawidth / 4;
               ctx.moveTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + pallawidth / 2 + lungLato / 2, ydisegnata);
               ctx.lineTo(xdisegnata + pallawidth, ydisegnata + pallaheight / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + pallawidth, ydisegnata + pallaheight / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata + pallawidth / 2 + lungLato / 2, ydisegnata + pallaheight);
               ctx.lineTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata + pallaheight);
               ctx.lineTo(xdisegnata, ydisegnata + pallaheight / 2 + lungLato / 2);
               ctx.lineTo(xdisegnata, ydisegnata + pallaheight / 2 - lungLato / 2);
               ctx.lineTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata);
               ctx.fill();
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.height < this.heightMax) {
               this.height += (this.heightMax / 10);
               this.y -= (this.heightMax / 20);
            } else {
               if (this.facingRight) { //movimento dello sparo
                  this.xv -= this.speedX;
               } else {
                  this.xv += this.speedX;
               }
               this.xv *= level.friction;
               this.x += -this.xv;
            }
            //disattivazione dello sparo fuori dal livello
            if (this.x > level.maxWidth + 50 || this.x < -50) {
               this.life = -1;
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("electricCh3", this.damage);
                     }
                  }
               }
            }
            //disattiva colpi su schermo
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               this.active = false;
               player.activeShot = player.activeShot - 3;
            }
         }
      }

      function newBoomerangCutter(larghezza, altezza) { //lo sparo creato dal player
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.life = 1;
         this.active = true;
         if (player.yv > 0) {
            this.goUp = false;
         } else {
            this.goUp = true;
         }
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 6;
         } else {
            this.x = player.x - 6 - larghezza;
         }
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 9;
         this.color = player.charge0color;
         this.speedX = 2.6;
         this.speedY = 0;
         this.speedX2 = 0;
         this.speed = 0;
         this.entityPickedIndex = -1;
         this.hitSomething = false;
         this.perforation = true;
         this.canPassWall = true;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.strokeStyle = player.power[6].color1;
            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.moveTo(xdisegnata, ydisegnata);
            ctx.lineTo(xdisegnata + this.width - (ctx.lineWidth / 2), ydisegnata);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height - (ctx.lineWidth / 2));
            ctx.stroke();
            ctx.lineWidth = 4;
            ctx.strokeStyle = player.power[6].color2;
            ctx.stroke();
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.speedX > 0) {
               if (this.facingRight) {
                  this.xv -= this.speedX;
               } else {
                  this.xv += this.speedX;
               }
               if (this.goUp) {
                  this.yv += this.speedY;
               } else {
                  this.yv -= this.speedY;
               }
               this.speedX -= 0.2;
               this.speedY += 0.2;
            } else if (this.speedY > 0) {
               if (this.facingRight) {
                  this.xv += this.speedX2;
               } else {
                  this.xv -= this.speedX2;
               }
               if (this.goUp) {
                  this.yv += this.speedY;
               } else {
                  this.yv -= this.speedY;
               }
               this.speedY -= 0.2;
               this.speedX2 += 0.2;
            } else if (this.speedX2 > 0) {
               if (this.facingRight) {
                  this.xv += this.speedX2;
               } else {
                  this.xv -= this.speedX2;
               }
               if (this.goUp) {
                  this.yv -= this.speed;
               } else {
                  this.yv += this.speed;
               }
               this.speedX2 -= 0.2;
               this.speed += 0.2;
            } else { //da qui in poi insegue il player
               if (this.x > player.x + (player.width / 2)) {
                  this.xv += this.speed / 2;
               } else {
                  this.xv -= this.speed / 2;
               }
               if (this.y > player.y + (player.height / 2)) {
                  this.yv += this.speed / 2;
               } else {
                  this.yv -= this.speed / 2;
               }
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            this.yv *= level.friction;
            this.y += -this.yv;

            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.life = -1;
                  }
               }
            } else {
               if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
                  this.life = -1;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) { //danno ai mostri
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("boomerangCh1", this.damage);
                     }
                     this.hitSomething = true;
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.life = -1;
                     }
                  }
                  if (this.entityPickedIndex == -1) { //raccoglie gli oggetti
                     if (entity[i].life > 0 && entity[i].type == "pickup") {
                        if (collisionBetween(this, entity[i])) {
                           this.entityPickedIndex = i;
                           this.hitSomething = true;
                        }
                     }
                  }
               }
            }
            if (this.entityPickedIndex != -1) {
               entity[this.entityPickedIndex].x = this.x;
               entity[this.entityPickedIndex].y = this.y;
            }
            if (collisionBetween(this, player) && this.speedX < 0.3) {
               if (!this.hitSomething) {
                  if (player.power[6].usage < player.power[6].usageMax) {
                     player.power[6].usage++;
                  }
               }
               this.life = -1;
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 1;
               this.active = false;
            }
         }
      }

      function newBoomerangCutterCharge3(larghezza, altezza, indicePassato, facingRightPassato) { //lo sparo creato dal player
         this.type = "sparoDelPlayer";
         this.damage = 2;
         this.indice = indicePassato;
         this.life = 1;
         if (this.indice == 0) {
            this.active = true;
         }
         if (this.indice > 1) {
            this.goUp = false;
         } else {
            this.goUp = true;
         }
         this.facingRight = facingRightPassato;
         if (player.facingRight) {
            this.x = player.x + player.width + 6;
         } else {
            this.x = player.x - 6 - larghezza;
         }
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = player.y + 9;
         this.speedX = 2.4;
         this.speedY = 0;
         this.speedX2 = 0;
         this.speedX3 = 0;
         this.speed = 0;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.strokeStyle = player.power[6].color1;
            ctx.beginPath();
            ctx.lineWidth = 12;
            ctx.moveTo(xdisegnata, ydisegnata);
            ctx.lineTo(xdisegnata + this.width - (ctx.lineWidth / 2), ydisegnata);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height - (ctx.lineWidth / 2));
            ctx.stroke();
            ctx.lineWidth = 6;
            ctx.strokeStyle = player.power[6].color2;
            ctx.stroke();
            ctx.lineWidth = 12;
            ctx.strokeStyle = "#71ff0060";
            ctx.stroke();
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            //movimento dello sparo
            if (this.speedX > 0) {
               if (this.facingRight) {
                  this.xv -= this.speedX;
               } else {
                  this.xv += this.speedX;
               }
               if (this.goUp) {
                  this.yv += this.speedY;
               } else {
                  this.yv -= this.speedY;
               }
               this.speedX -= 0.2;
               this.speedY += 0.2;
            } else if (this.speedY > 0) {
               if (this.facingRight) {
                  this.xv += this.speedX2;
               } else {
                  this.xv -= this.speedX2;
               }
               if (this.goUp) {
                  this.yv += this.speedY;
               } else {
                  this.yv -= this.speedY;
               }
               this.speedY -= 0.2;
               this.speedX2 += 0.2;
            } else if (this.speedX2 > 0) {
               if (this.facingRight) {
                  this.xv += this.speedX2;
               } else {
                  this.xv -= this.speedX2;
               }
               if (this.goUp) {
                  this.yv -= this.speedX3;
               } else {
                  this.yv += this.speedX3;
               }
               this.speedX2 -= 0.2;
               this.speedX3 += 0.2;
            } else if (this.speedX3 > 0) {
               if (this.facingRight) {
                  this.xv -= this.speedX3 / 1.3;
               } else {
                  this.xv += this.speedX3 / 1.3;
               }
               if (this.goUp) {
                  this.yv -= this.speed;
               } else {
                  this.yv += this.speed;
               }
               this.speedX3 -= 0.2;
               this.speed += 0.2;
            } else { //da qui in poi esce dallo schermo
               switch (this.indice) {
                  case 0:
                     this.xv += this.speed / 1.8;
                     this.yv -= this.speed / 2;
                     break;
                  case 1:
                     this.xv -= this.speed / 1.8;
                     this.yv -= this.speed / 2;
                     break;
                  case 2:
                     this.xv += this.speed / 1.8;
                     this.yv += this.speed / 2;
                     break;
                  case 3:
                     this.xv -= this.speed / 1.8;
                     this.yv += this.speed / 2;
                     break;
               }
            }
            this.xv *= level.friction;
            this.x += -this.xv;
            this.yv *= level.friction;
            this.y += -this.yv;

            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("boomerangCh3", this.damage);
                     }
                  }
               }
            }

            //disattivazione quando esce dallo schermo
            if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
               this.life = -1;
            }
            if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         }
      }

      function newShotgunIce(xPassataR, xPassataL, yPassata, larghezza, altezza, isPadrePassato, xSpeedPassato, ySpeedPassato, facingRightPassato) { //lo sparo creato dal player - shotgun ice charge 0
         this.life = 1;
         this.active = isPadrePassato;
         this.type = "sparoDelPlayer";
         this.damage = 1;
         this.facingRight = facingRightPassato;
         if (this.facingRight) {
            this.x = xPassataR;
         } else {
            this.x = xPassataL;
         }
         this.xv = 0;
         this.yv = 0;
         this.width = larghezza;
         this.height = altezza;
         this.y = yPassata;
         this.speed = xSpeedPassato;
         this.yspeed = ySpeedPassato;
         this.isFather = isPadrePassato;
         this.isDying = false;
         this.perforation = false;
         this.canPassWall = false;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.strokeStyle = player.power[7].color1;
            ctx.beginPath();
            ctx.lineWidth = (this.width / 8);
            ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width, ydisegnata);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata, ydisegnata);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
            ctx.stroke();
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.facingRight) { //movimento dello sparo
               this.xv -= this.speed;
            } else {
               this.xv += this.speed;
            }
            this.yv += this.yspeed;
            this.xv *= level.friction;
            this.yv *= level.friction;
            this.x += -this.xv;
            this.y += -this.yv;

            //collisione dello sparo con level
            if (!this.canPassWall) {
               for (i = 0; i < level.length; i++) {
                  if (collisionBetween(this, level[i])) {
                     this.isDying = true;
                     if (this.facingRight) {
                        this.x = level[i].x - this.width - 1;
                     } else {
                        this.x = level[i].x + level[i].width + 1;
                     }
                  }
               }
            } else {
               if (this.x > level.maxWidth + 100 || this.x < -100) {
                  this.life = -1;
                  this.isFather = false;
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("iceCh1", this.damage);
                     }
                     if (!(entity[i].life < 1 && this.perforation)) {
                        this.isDying = true;
                     }
                  }
               }
            }
            //genera figlio alla morte se isPadre, altrimenti muore e basta
            if (this.isDying) {
               //this.x += this.xv;         
               if (this.isFather) {
                  var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 0, !this.facingRight);
                  entity.push(sparoFiglio);
                  var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 1, !this.facingRight);
                  entity.push(sparoFiglio);
                  var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 2, !this.facingRight);
                  entity.push(sparoFiglio);
                  var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, -1, !this.facingRight);
                  entity.push(sparoFiglio);
                  var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, -2, !this.facingRight);
                  entity.push(sparoFiglio);
               }
               this.life = -1;
            }

            if (this.isFather) {
               //disattiva colpi su schermo
               if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
                  this.active = false;
                  player.activeShot = player.activeShot - 3;
               }
            }
         }
      }

      function newShotgunIceCharge3(larghezza, altezza) { // ShotgunIce Charge 3
         this.life = 1;
         this.active = true;
         this.type = "piattaforma";
         this.damage = 0;
         this.damageToEnemy = 2;
         this.facingRight = player.facingRight;
         if (this.facingRight) {
            this.x = player.x + player.width + 3 + larghezza / 2;
         } else {
            this.x = player.x - 3 - larghezza;
         }
         this.xv = 0;
         this.yv = 0;
         this.width = 0;
         this.height = altezza;
         this.widthMax = larghezza;
         this.y = player.y + 9;
         this.color = player.power[7].color1 + "EE";
         this.speed = 0.05;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.fillStyle = this.color;
            var larghezzaRuota = this.width / 4;
            var altezzaRuota = this.height / 7;
            ctx.fillRect(xdisegnata - 2, ydisegnata, this.width + 4, this.height - altezzaRuota);
            if (this.width == this.widthMax) {
               ctx.fillRect(xdisegnata + this.width / 2 - larghezzaRuota / 2, ydisegnata, larghezzaRuota, this.height + 1);
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.width < this.widthMax) { //crescita da fermo
               this.width += (this.widthMax / 10);
               this.x -= (this.width / 20);
            } else { //movimento dello sparo         
               if (this.facingRight) {
                  this.xv -= this.speed;
               } else {
                  this.xv += this.speed;
               }
               this.xv *= level.friction;
               this.x += -this.xv;
               if (this.speed < 3) {
                  this.speed += 0.01;
               } //accelera
               if (this.y > level.waterLevel) { //determina se sei in acqua o no
                  if (!this.isInWater) {
                     this.isInWater = true;
                     this.yv = 0;
                  }
                  gravityApplicata = level.gravityWater;
                  frizioneApplicata = level.frictionWater;
               } else {
                  this.isInWater = false;
                  gravityApplicata = level.gravity;
                  frizioneApplicata = level.friction;
               }
               this.yv += gravityApplicata; //get level gravity
               if (this.yv > this.width) {
                  this.yv = this.width;
               } //limita la gravita'
               this.y += this.yv; //apply gravity            
            }
            for (i = 0; i < level.length; i++) { // collision with level
               if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + this.yv + 1) && (collisionBetween(this, level[i]))) { //collison verso il basso
                  this.y = level[i].y - this.height - 1;
                  this.yv = this.yv / 2;
               }
               if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
                  this.life = -1;
               }
            }
            if (collisionBetween(this, player) && (((this.x + this.width) > player.x) || (this.x < (player.x + player.width)))) { //collisione laterale player
               player.x -= this.xv;
               for (var j = 0; j < level.length; j++) {
                  if (collisionBetween(player, level[j])) {
                     player.x += this.xv * 2;
                  }
               }
            }
            //collisione dello sparo con altre entita'
            for (i = 0; i < entity.length; i++) {
               if (!(i == indiceDiQuestaEntity)) {
                  if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
                     if (entity[i].getHit) {
                        entity[i].getHit("iceCh3", this.damage);
                     }
                  }
               }
            }
            if (player.activePower != 8) {
               this.life -= 0.5;
            } //distruzione se il player cambia weapon
            if (this.active && (this.life < 0.1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) { //disattivazione sparo
               player.activeShot = player.activeShot - 3;
               this.active = false;
            }
         }
      }

      function rectTest(x, y, width, height) {
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
      }

      function newPipistrello() { //mostro pipistrello
         this.life = 1;
         this.type = "monster";
         this.damage = 1;
         this.x = 0;
         this.y = 0;
         this.xv = 0;
         this.yv = 0;
         this.timer = 0;
         this.alSoffitto = false;
         this.slope = 0;
         this.width = 34;
         this.height = 16;
         this.color1 = '#8500b5';
         this.color2 = '#d7b600';
         this.speed = 0.5;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.alSoffitto) {
               this.height = -1 * this.height;
               ydisegnata = ydisegnata - this.height;
               xdisegnata += this.width / 8;
               this.width = this.width * 3 / 4;
            }
            var unitX = this.width / 10;
            var unitY = this.height / 10;
            ctx.fillStyle = this.color2;
            halfBatDraw(xdisegnata, this.width, ydisegnata, this.height, unitX, unitY);
            halfBatDraw(xdisegnata, this.width, ydisegnata, this.height, -unitX, unitY);
            ctx.fillStyle = this.color1;
            halfBatDraw(xdisegnata + 1.5, this.width - 3, ydisegnata + 1.5, this.height - 3, unitX, unitY);
            halfBatDraw(xdisegnata + 1.5, this.width - 3, ydisegnata + 1.5, this.height - 3, -unitX, unitY);
            if (this.alSoffitto) {
               this.height = -1 * this.height;
               this.width = this.width * 4 / 3;
            }

            function halfBatDraw(xdisegnata, width, ydisegnata, height, unitX, unitY) {
               ctx.beginPath();
               ctx.lineWidth = "1";
               ctx.moveTo(xdisegnata + width / 2, ydisegnata + unitY * 2);
               ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata);
               ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata + unitY * 3);
               ctx.lineTo(xdisegnata + width / 2 + unitX * 2.5, ydisegnata);
               ctx.lineTo(xdisegnata + width / 2 + unitX * 5, ydisegnata + height - unitY);
               ctx.lineTo(xdisegnata + width / 2 + unitX * 2.5, ydisegnata + height - unitY * 2.5);
               ctx.lineTo(xdisegnata + width / 2 + unitX * 1.25, ydisegnata + height - unitY / 2);
               ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata + height - unitY * 2.4);
               ctx.lineTo(xdisegnata + width / 2, ydisegnata + height);
               ctx.lineTo(xdisegnata + width / 2, ydisegnata + unitY * 2);
               ctx.fill();
            }
         }
         this.getHit = function (nome, danno) {
            this.life -= danno;
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.timer < 1) { //movimento verso il player
               this.alSoffitto = false;
               if (this.x < player.x - 1) {
                  this.xv -= this.speed;
               } else if (this.x > player.x + player.width - 1) {
                  this.xv += this.speed;
               }
               if (this.y < player.y + 1) {
                  this.yv -= this.speed;
               } else {
                  this.yv += this.speed;
               }
               this.xv *= level.friction;
               this.yv *= level.friction;
               this.x += -this.xv;
               this.y += -this.yv;
            } else { //movimento verso l'alto
               if (!this.alSoffitto) {
                  this.yv = this.speed * 8;
                  this.y += -this.yv;
               }
            }

            this.slope = 0; //serve per i bordi tipo
            for (var i = 0; i < level.length; i++) {
               if (collisionBetween(this, level[i])) {
                  if (this.slope != -8) {
                     this.y -= 1;
                     this.slope += 1;
                  }
               }
            }

            for (var i = 0; i < level.length; i++) { //level collision
               if (collisionBetween(this, level[i])) {
                  var latoSopra = new rectTest(this.x, this.y, this.width, 2);
                  if (this.timer > 0 && collisionBetween(latoSopra, level[i])) {
                     this.alSoffitto = true;
                  }
                  this.y += this.slope;
                  this.x += this.xv * 2;
                  this.xv = 0;
                  if (this.alSoffitto) {
                     this.y += this.yv;
                     this.yv = 0;
                  } else {
                     this.y += this.yv * 2;
                     this.yv = 0;
                  }
               }
            }
            if (this.alSoffitto) {
               this.timer--;
            }

            //other entity mostro collision - e' un po buggata
            for (var i = 0; i < entity.length; i++) {
               if (entity[i].life > 0 && entity[i].type == "mostro" && !(i == indiceDiQuestaEntity)) {
                  if (collisionBetween(this, entity[i])) {
                     this.x += this.xv * 1.95;
                     this.xv = 0;
                     this.y += this.yv * 1.95;
                     this.yv = 0;
                  }
               }
            }
            //collision col player
            if (collisionBetween(this, player)) {
               this.xv = 0;
               this.yv = 0;
               this.timer = 50;
            }
         }
      }

      function newBunny() { //mostro coniglio
         this.life = 2;
         this.type = "monster";
         this.damage = 4;
         this.invulnerability = 0;
         this.facingRight = false;
         this.gotHit = false;
         this.x = 0;
         this.y = 0;
         this.xv = 0;
         this.yv = 0;
         this.timer = 0;
         this.slope = 0;
         this.isOnGround = false;
         this.width = 28;
         this.height = 28;
         this.color = '#a57aff';
         this.color2 = '#ffc925';
         this.color3 = '#dddddd';
         this.color4 = '#69ff00';
         this.speed = 12;
         this.jumpHeight = 10;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            color1 = this.color;
            color2 = this.color2;
            if (this.gotHit) {
               this.gotHit = false;
               color1 = this.color3;
               color2 = this.color3;
            }
            head = this.width / 10 * 4;
            ctx.fillStyle = color1;
            ctx.fillRect(xdisegnata, ydisegnata + head, this.width, this.height - head);
            if (this.facingRight) {
               drawHead(xdisegnata + this.width - head, ydisegnata + 1, head, color2);
            } else {
               drawHead(xdisegnata, ydisegnata + 1, head, color2);
            }

            function drawHead(x, y, head, eyeColor) {
               ctx.fillRect(x, y, head, head);
               ctx.fillRect(x + head - head / 5 * 2, y - head / 3 * 2, head / 5 * 2, head / 3 * 2);
               ctx.fillRect(x, y - head / 3 * 2, head / 5 * 2, head / 3 * 2);
               ctx.fillStyle = eyeColor;
               ctx.fillRect(x + head - head / 5 * 2, y + head / 5, head / 5, head / 5);
               ctx.fillRect(x + head / 5, y + head / 5, head / 5, head / 5);
            }
         }
         this.getHit = function (nome, danno) {
            if (this.invulnerability < 1) {
               this.gotHit = true;
               this.life -= danno;
               this.invulnerability = 3;
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            this.timer++;
            if (this.invulnerability > 0) {
               this.invulnerability--;
            }

            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               if (!this.isInWater) {
                  this.isInWater = true;
                  this.yv = 0;
               }
               gravityApplicata = level.gravityWater;
               frizioneApplicata = level.frictionWater;
            } else {
               this.isInWater = false;
               gravityApplicata = level.gravity;
               frizioneApplicata = level.friction;
            }
            this.yv += gravityApplicata; //get level gravity
            if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
               this.yv = this.height;
            }
            if (!this.isOnGround) {
               this.y += this.yv;
            } //apply gravity
            this.xv = this.xv * frizioneApplicata; //riduce gradualmente xv
            this.x += this.xv; //apply movimento x

            for (var i = 0; i < level.length; i++) { //collision with level
               var latoSotto = new rectTest(this.x + this.width / 2 - 2, this.y + this.height - 3, 4, 2);
               if (collisionBetween(latoSotto, level[i])) { //collisione y col pavimento
                  this.y = level[i].y - this.height;
                  this.yv = 0;
                  this.isOnGround = true;
               } else if (collisionBetween(this, level[i])) { //tutte altre collisioni con level
                  this.x += -this.xv;
                  //this.xv=0;
               }
            }

            if (this.timer > 250 && this.isOnGround && Math.floor(Math.random() * 100) < 50) { //sparo
               this.timer = 1;
               var sparo = new newSparo(20, 10);
               if (this.facingRight) {
                  sparo.x = this.x + this.width - sparo.width;
               } else {
                  sparo.x = this.x;
               }
               sparo.y = this.y - this.width / 6;
               sparo.facingRight = this.facingRight;
               sparo.type = "enemyShot";
               sparo.color = this.color4;
               sparo.damage = 2;
               sparo.speed = sparo.speed / 2;
               entity.push(sparo);
            }

            if (this.timer % 100 == 0 && this.isOnGround) { //salto
               var siGira = 25;
               if ((this.facingRight && this.x > player.x) || (!this.facingRight && this.x < player.x)) {
                  siGira = 85;
               }
               if (Math.floor(Math.random() * 100) < siGira) {
                  this.facingRight = !this.facingRight
               }
               this.yv = -this.jumpHeight;
               this.isOnGround = false;
               this.xv = -this.speed;
               if (this.facingRight) {
                  this.xv = -this.xv;
               }
            }
         }
      } //fine newBunny()  

      function newBombBee() { //mostro ape
         this.life = 2;
         this.type = "monster";
         this.name = "bomb wasp";
         this.damage = 2;
         this.invulnerability = 0;
         this.facingRight = false;
         this.maxTimer = 100;
         this.timer = this.maxTimer / 2;
         this.bombTimer = 0;
         this.gotHit = false;
         this.x = 0;
         this.y = 0;
         this.xv = 0;
         this.yv = 0;
         this.isOnGround = false;
         this.width = 17;
         this.height = 36;
         this.color = '#ffdd22';
         this.color2 = '#ccaa00';
         this.color3 = '#dddddd'; //damage color
         this.color4 = '#00ddff';
         this.speed = 0.5;
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            color1 = this.color;
            color2 = this.color2;
            color3 = this.color4;
            if (this.gotHit) {
               this.gotHit = false;
               color1 = this.color3;
               color2 = this.color3;
               color3 = this.color3;
            }
            unit = this.height / 4;
            ctx.fillStyle = color3 + "55";
            ctx.strokeStyle = color3;
            ctx.lineWidth = "1";
            ctx.beginPath();
            ctx.moveTo(xdisegnata - unit / 2, ydisegnata - unit / 2);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2 - unit - unit / 2);
            ctx.lineTo(xdisegnata - unit / 2 + this.width + unit * 2, ydisegnata - unit / 2);
            ctx.lineTo(xdisegnata - unit / 2 + this.width + unit * 2, ydisegnata - unit / 2 + this.height - unit);
            ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2 - unit / 2);
            ctx.lineTo(xdisegnata - unit / 2, ydisegnata - unit / 2 + this.height - unit);
            ctx.lineTo(xdisegnata - unit / 2, ydisegnata - unit / 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = color1;
            ctx.fillRect(xdisegnata + unit / 2, ydisegnata, unit * 2, unit * 2 + 1);
            ctx.fillRect(xdisegnata + unit / 2, ydisegnata + unit * 3 - 1, unit * 2, unit - 1);
            ctx.fillStyle = color2;
            if (this.facingRight) {
               ctx.fillRect(xdisegnata + unit / 2, ydisegnata + unit * 2, unit + unit / 2, unit);
               ctx.fillRect(xdisegnata + unit * 2, ydisegnata + unit / 2, unit, unit);
            } else {
               ctx.fillRect(xdisegnata, ydisegnata + unit / 2, unit, unit);
               ctx.fillRect(xdisegnata + unit, ydisegnata + unit * 2, unit + unit / 2, unit);
            }
         }
         this.getHit = function (nome, danno) {
            if (this.invulnerability < 1) {
               this.gotHit = true;
               this.life -= danno;
               this.invulnerability = 3;
            }
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.invulnerability > 0) {
               this.invulnerability--;
            }
            if (this.bombTimer > 0) {
               this.bombTimer--;
            }
            this.timer++;
            var centro = this.x + this.width / 2;
            if (this.timer > this.maxTimer) {
               this.timer = 1;
               if (centro < player.x + player.width / 2) {
                  this.facingRight = true;
               } else if (centro > player.x + player.width / 2) {
                  this.facingRight = false;
               }
            }

            if (this.facingRight) { //movimento
               this.xv += this.speed;
            } else {
               this.xv -= this.speed;
            }
            this.xv = this.xv * level.friction;
            this.x += this.xv;

            if (centro < player.x + player.width * 2 && centro > player.x - player.width) {
               if (this.bombTimer < 1) {
                  bomba = new newBombBee_Bomb(centro, this.y + this.height);
                  entity.push(bomba);
                  this.bombTimer = 50;
               }
            }
         }
      } //fine newBombBee()                  
      function newBombBee_Bomb(x, y) { //bomba del mostro ape
         this.life = 1;
         this.type = "enemyShot";
         this.name = "bomb bee bomb";
         this.damage = 0;
         this.timer = 0;
         this.x = x;
         this.y = y;
         this.yv = 0;
         this.isOnGround = false;
         this.width = 10;
         this.height = 10;
         this.color = '#999999';
         this.color2 = '#880000';
         this.color3 = '#ff0000';
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            color1 = this.color;
            color2 = this.color2;
            if (this.timer > 40) {
               color2 = this.color3;
            }
            redPoint = this.width / 10 * 6;
            ctx.fillStyle = color1;
            ctx.fillRect(xdisegnata, ydisegnata + redPoint / 2, this.width, this.height - redPoint / 2);
            ctx.fillStyle = color2;
            ctx.fillRect(xdisegnata + this.width / 2 - redPoint / 2, ydisegnata, redPoint, redPoint);
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               if (!this.isInWater) {
                  this.isInWater = true;
                  this.yv = 0;
               }
               gravityApplicata = level.gravityWater;
               frizioneApplicata = level.frictionWater;
            } else {
               this.isInWater = false;
               gravityApplicata = level.gravity;
               frizioneApplicata = level.friction;
            }
            this.yv += gravityApplicata; //get level gravity
            if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
               this.yv = this.height;
            }
            if (!this.isOnGround) {
               this.y += this.yv; //apply gravity
            } else { //timer e esplosione
               this.timer++;
               if (this.timer > 60) {
                  esplosion = new esplosione(this.x + this.width / 2, this.y + this.height / 2, 1, 1, this.width * 3, this.height * 3, 1);
                  entity.push(esplosion);
                  this.life = -1;
               }
            }
            for (var i = 0; i < level.length; i++) { //collision with level
               var latoSotto = new rectTest(this.x + this.width / 2 - 2, this.y + this.height - 3, 4, 2);
               if (collisionBetween(latoSotto, level[i])) { //collisione y col pavimento
                  this.y = level[i].y - this.height;
                  this.yv = 0;
                  this.isOnGround = true;
               }
            }
         }
      } //fine newBombBee_Bomb()

      function esplosione(x, y, widthIni, heightIni, widthMax, heightMax, danno) {
         this.life = 1;
         this.timer = 5;
         this.type = "enemyShot";
         this.name = "explosion";
         this.damage = danno;
         this.x = x - widthIni / 2;
         this.y = y - heightIni / 2;
         this.width = widthIni;
         this.widthMax = widthMax;
         this.heightMax = heightMax;
         this.height = heightIni;
         this.color = '#dd0000';
         this.color2 = '#eecc00';
         this.hasPhysics = true;
         this.canSelfDraw = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            color1 = this.color;
            color2 = this.color2;
            ctx.fillStyle = color1;
            ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
            innerX = this.width / 2;
            innerY = this.height / 2;
            ctx.fillStyle = color2;
            ctx.fillRect(xdisegnata + this.width / 2 - innerX / 2, ydisegnata + this.height / 2 - innerY / 2, innerX, innerY);
         }
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (this.width < this.widthMax) {
               this.x = this.x - this.width / 4;
               this.width += this.width / 2;
            }
            if (this.height < this.heightMax) {
               this.y = this.y - this.width / 4;
               this.height += this.width / 2;
            }
            if (this.width > this.widthMax - 1 && this.height > this.heightMax - 1) {
               this.timer--;
            }
            if (this.timer < 0) {
               this.life = -1;
            }
         }
      } //fine esplosione()       

      function newSpike() { //le spine per terra
         this.life = 9999999999;
         this.type = "obstacle";
         this.damage = 9999999999;
         this.x = 0;
         this.y = 0;
         this.width = 20;
         this.height = 20;
         this.canSelfDraw = true;
         this.hasPhysics = false;
         this.colore1 = '#bcbcbc';
	 this.colore2 = "#777777";
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.fillStyle = this.colore1;
            ctx.moveTo(xdisegnata, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
            ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata - 2);
            ctx.lineTo(xdisegnata, ydisegnata + this.height);
            ctx.fill();
            ctx.strokeStyle = this.colore2;
            ctx.stroke();
         }
      }

      function newPickUp_Armor(indicePassato) { //le spine per terra
         this.life = 9999999999;
         this.type = "pickup";
         this.indice = indicePassato; //indicePassato=0 -> helmet, indicePassato=1 -> legs, indicePassato=2 -> buster, indicePassato=3 -> corpo
         this.damage = 0;
         this.x = 0;
         this.y = 0;
         this.width = 20;
         this.height = 20;
         this.canSelfDraw = true;
         this.hasPhysics = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
            ctx.fillStyle = player.defaultColor1;
            ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
            ctx.fillStyle = player.defaultColoreArmatura;
            ctx.fillRect(xdisegnata + 1, ydisegnata + 1, this.width - 2, this.height - 2);
            ctx.textAlign = "center";
            ctx.font = "small-caps bold 18px Lucida Console";
            var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
            switch (this.indice) {
               case 0:
                  disegnaTestoConBordino("H", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), player.defaultColor1, player.defaultColoreArmatura);
                  break;
               case 1:
                  disegnaTestoConBordino("L", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), player.defaultColor1, player.defaultColoreArmatura);
                  break;
               case 2:
                  disegnaTestoConBordino("B", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), player.defaultColor1, player.defaultColoreArmatura);
                  break;
               case 3:
                  disegnaTestoConBordino("C", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), player.defaultColor1, player.defaultColoreArmatura);
                  break;
            }
            ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
         } //fine di selfDraw
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (armaturaAcquired[this.indice]) { //se il player l'ha gia' trovata disattiva l'entita'
               this.life = -1;
            } else { //da qui inizia this.physics vero e proprio
               if (collisionBetween(this, player)) { //quando il player lo raccoglie
                  this.life = -1;
                  switch (this.indice) {
                     case 0:
                        objAlert = new newAlert("You have found the helmet upgrade! You can break some blocks with a headbutt.", gamestate);
                        gamestate = 5;
                        break;
                     case 1:
                        objAlert = new newAlert("You have found the boots upgrade! Press " + dashkey + " to dash.", gamestate);
                        gamestate = 5;
                        break;
                     case 2:
                        objAlert = new newAlert("You have found the buster upgrade! You can charge a more powerfull shot.", gamestate);
                        gamestate = 5;
                        break;
                     case 3:
                        objAlert = new newAlert("You have found the chest upgrade! You receive less damage.", gamestate);
                        gamestate = 5;
                        break;
                  }
                  armaturaAcquired[this.indice] = true;
               }
            }
         } //fine di physics              
      }

      function newPickUp_Subtank(indicePassato) { //le spine per terra
         this.life = 9999999999;
         this.type = "pickup";
         this.indice = indicePassato;
         this.damage = 0;
         this.x = 0;
         this.y = 0;
         this.width = 20;
         this.height = 20;
         this.canSelfDraw = true;
         this.hasPhysics = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
            ctx.fillStyle = player.defaultColor1;
            ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
            ctx.textAlign = "center";
            ctx.font = "small-caps bold 18px Lucida Console";
            var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo			
            disegnaTestoConBordino("S", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), player.charge0color, player.defaultColor1);
            ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
         } //fine di selfDraw
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (subtank[this.indice].acquired) { //se il player l'ha gia' trovata disattiva l'entita'
               this.life = -1;
            } else { //da qui inizia this.physics vero e proprio
               if (collisionBetween(this, player)) { //quando il player lo raccoglie
                  this.life = -1;
                  objAlert = new newAlert("You have found a Subtank! Store the energy you don't need to use it later.", gamestate);
                  gamestate = 5;
                  subtank[this.indice].acquired = true;
               }
            }
         } //fine di physics              
      }

      function newPickUp_Cuore(indicePassatoNonParsato) { //le spine per terra
         this.life = 9999999999;
         this.type = "pickup";
         this.indice = parsaApici(indicePassatoNonParsato);
         this.damage = 0;
         this.x = 0;
         this.y = 0;
         this.width = 20;
         this.height = 20;
         this.canSelfDraw = true;
         this.hasPhysics = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.fillStyle = "#ff2f97"; //rosa
            ctx.strokeStyle = "#999999"; //grigio
            ctx.moveTo(xdisegnata, ydisegnata);
            ctx.lineTo(xdisegnata + (this.width / 2) - (this.width / 10), ydisegnata);
            ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata + (this.height / 5));
            ctx.lineTo(xdisegnata + (this.width / 2) + (this.width / 10), ydisegnata);
            ctx.lineTo(xdisegnata + (this.width), ydisegnata);
            ctx.lineTo(xdisegnata + (this.width), ydisegnata + (this.height / 2));
            ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata + this.height);
            ctx.lineTo(xdisegnata, ydisegnata + (this.height / 2));
            ctx.lineTo(xdisegnata, ydisegnata);
            ctx.fill();
            ctx.stroke();
         } //fine di selfDraw
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            if (heartAcquired[this.indice]) { //se il player l'ha gia' trovata disattiva l'entita'
               this.life = -1;
            } else { //da qui inizia this.physics vero e proprio
               if (collisionBetween(this, player)) { //quando il player lo raccoglie
                  this.life = -1;
                  objAlert = new newAlert("You have found a Heart! Max life augmented.", gamestate);
                  gamestate = 5;
                  heartAcquired[this.indice] = true;
                  player.lifeMax += 2;
                  player.life += 2;
               }
            }
         } //fine di physics
         function parsaApici(stringaDiApici) { //parsa ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ in numeri
            switch (stringaDiApici) {
               case "⁰":
                  return 0;
                  break;
               case "¹":
                  return 1;
                  break;
               case "²":
                  return 2;
                  break;
               case "³":
                  return 3;
                  break;
               case "⁴":
                  return 4;
                  break;
               case "⁵":
                  return 5;
                  break;
               case "⁶":
                  return 6;
                  break;
               case "⁷":
                  return 7;
                  break;
               case "⁸":
                  return 8;
                  break;
               case "⁹":
                  return 9;
                  break;
            }
         }
      }

      function newPickUp_LifeEnergy(vitaRecuperata) {
         this.life = 9999999999;
         this.type = "pickup";
         this.damage = -vitaRecuperata;
         this.x = 0;
         this.y = 0;
         this.yv = 0;
         this.width = 20;
         this.height = 20;
         this.isInWater = false;
         this.canSelfDraw = true;
         this.hasPhysics = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
            ctx.fillStyle = "#868686";
            ctx.fillRect(xdisegnata - 3, ydisegnata + 3, this.width + 6, this.height - 6);
            ctx.fillStyle = "#d70000";
            ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
            ctx.fillStyle = "#ffe100";
            ctx.fillRect(xdisegnata + 2, ydisegnata + 2, this.width - 4, this.height - 4);
         } //fine di selfDraw
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               if (!this.isInWater) {
                  this.isInWater = true;
                  this.yv = 0;
               }
               gravityApplicata = level.gravityWater;
               frizioneApplicata = level.frictionWater;
            } else {
               this.isInWater = false;
               gravityApplicata = level.gravity;
               frizioneApplicata = level.friction;
            }
            this.yv += gravityApplicata; //get level gravity
            if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
               this.yv = this.height;
            }
            this.y += this.yv; //apply gravity

            for (var i = 0; i < level.length; i++) { //y collision with level
               if (collisionBetween(this, level[i])) {
                  this.y = level[i].y - this.height;
               }
            }
            for (var i = 0; i < entity.length; i++) { //y collision with entities that are solid (ostacolo e piattaforma)
               if (entity[i].life > 0 && (entity[i].type == "ostacolo" || entity[i].type == "piattaforma")) {
                  if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19) && (collisionBetween(this, entity[i]))) {
                     this.y = entity[i].y - this.height;
                  }
               }
            }

            if (collisionBetween(this, player)) { //quando il player lo raccoglie
               this.life = -1;
            }
         } //fine di physics              
      }

      function newPickUp_WeaponEnergy(usageRecuparato) {
         this.life = 9999999999;
         this.type = "pickup";
         this.damage = 0;
         this.usageRestore = usageRecuparato;
         this.x = 0;
         this.y = 0;
         this.yv = 0;
         this.width = 20;
         this.height = 20;
         this.isInWater = false;
         this.canSelfDraw = true;
         this.hasPhysics = true;
         this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
            ctx.fillStyle = "#003ef0";
            ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
            ctx.fillStyle = "#3AB7D4";
            ctx.fillRect(xdisegnata + 2, ydisegnata + 2, this.width - 4, this.height - 4);
            ctx.fillStyle = "#ff7c00";
            ctx.fillRect(xdisegnata, ydisegnata - 1.5 + this.height / 2, this.width, 3);
         } //fine di selfDraw
         this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
            var gravityApplicata = 0;
            var frizioneApplicata = 0;
            if (this.y > level.waterLevel) { //determina se sei in acqua o no
               if (!this.isInWater) {
                  this.isInWater = true;
                  this.yv = 0;
               }
               gravityApplicata = level.gravityWater;
               frizioneApplicata = level.frictionWater;
            } else {
               this.isInWater = false;
               gravityApplicata = level.gravity;
               frizioneApplicata = level.friction;
            }
            this.yv += gravityApplicata; //get level gravity
            if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
               this.yv = this.height;
            }
            this.y += this.yv; //apply gravity

            for (var i = 0; i < level.length; i++) { //y collision with level
               if (collisionBetween(this, level[i])) {
                  this.y = level[i].y - this.height;
               }
            }
            for (var i = 0; i < entity.length; i++) { //y collision with entities that are solid (ostacolo e piattaforma)
               if (entity[i].life > 0 && (entity[i].type == "ostacolo" || entity[i].type == "piattaforma")) {
                  if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19) && (collisionBetween(this, entity[i]))) {
                     this.y = entity[i].y - this.height;
                  }
               }
            }

            if (collisionBetween(this, player)) { //quando il player lo raccoglie
               this.life = -1;
               if (levelDefeated != "false,false,false,false,false,false,false,false") {
                  for (; this.usageRestore > 0;) {
                     if (player.activePower != 0) {
                        if (player.power[player.activePower - 1].usage < player.power[player.activePower - 1].usageMax) {
                           this.usageRestore--;
                           player.power[player.activePower - 1].usage++;
                        } else {
                           for (i = 0; i < 9; i++) {
                              if (i != 8) {
                                 if (levelDefeated[i]) {
                                    if (player.power[i].usage < player.power[i].usageMax) {
                                       this.usageRestore--;
                                       player.power[i].usage++;
                                       break;
                                    }
                                 }
                              } else {
                                 this.usageRestore = -1;
                              }
                           }
                        }
                     } else {
                        for (i = 0; i < 9; i++) {
                           if (i != 8) {
                              if (levelDefeated[i]) {
                                 if (player.power[i].usage < player.power[i].usageMax) {
                                    this.usageRestore--;
                                    player.power[i].usage++;
                                    break;
                                 }
                              }
                           } else {
                              this.usageRestore = -1;
                           }
                        }
                     }
                  }
               }
            }
         } //fine di physics              
      }

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
            disegnaSchermoDiGioco(true); //ATTENZIONE: se le viene passato true oltre a disegnare le entita' calcola anche le lore physics
            player.physics(player, level); //chiama la funzione physics del player
         }
      }

      function disegnaSchermoDiGioco(doEntityPhysics) {
         ctx.clearRect(0, 0, canvas.width, canvas.height); //pulisci tutto il canvas
         drawBackgroundImage();
         drawLvl(level.background); //disegna i blocchi non materiali che colorano lo sfondo (passa false come isDrawingWater - non disegna l'acqua)
         drawLvl(level); //disegna i blocchi fisici del livello (passa false come isDrawingWater - non disegna l'acqua)
         drawHUD(); //if you move drawHUD() under playerPhysics() the HUD will always be drawn on top of everything, but i like it this way. Entities and the player are more important then the hud lol
         drawEntity(doEntityPhysics); //in questa funzione viene chiamata anche il metodo entity[i].physics per le entità che vengono disegnate su schermo (le uniche che carico)
         drawPlayer(); //disegna il player
         drawLvl(level.foreground); //disegna i blocchi non materiali che stanno sopra tutto il resto (effetto grafico) e il waterlevel (passa true a isDrawingWater)
         drawWater();
      }

      function xDisegnata() {
         if (player.x + (player.width / 2) < canvasWidth / 2) { //se la x del player è minore di mezzo canvas la tiene com'è
            xdisegnata = player.x;
         } else {
            if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
               xdisegnata = canvasWidth - level.maxWidth + player.x;
            } else {
               xdisegnata = canvasWidth / 2 - (player.width / 2);
            }
         }
         return xdisegnata;
      }

      function yDisegnata() {
         if (player.y < canvasHeight / 2) { //se la y del player è minore di mezzo canvas la tiene com è
            ydisegnata = player.y;
         } else {
            if (player.y > level.maxHeight - canvasHeight / 2) { //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
               ydisegnata = canvasHeight - level.maxHeight + player.y;
            } else {
               ydisegnata = canvasHeight / 2;
            }
         }
         return ydisegnata;
      }

      function drawPlayer() {
         var xdisegnata = xDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull asse x
         var ydisegnata = yDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull'asse y
	 switch (currentPlayer){
	  case 1: /*riccardo*/ player.disegnaPlayer(xdisegnata, ydisegnata, player.stance, player.sprite, player.facingRight); break;
	  default: //X
         	if (player.speed > player.defaultspeed) {
            		if (player.xv < -10) {
               		player.disegnaPlayer(xdisegnata - 50, ydisegnata + 3, player.width - 3, player.height - 6, false, player.color1 + 'AA', player.color2, player.coloreArmatura);
               		player.disegnaPlayer(xdisegnata - 26, ydisegnata + 1, player.width - 1, player.height - 2, false, player.color1, player.color2, player.coloreArmatura);
            		} else if (player.xv > 10) {
               		player.disegnaPlayer(xdisegnata + 50 + 3, ydisegnata + 3, player.width - 3, player.height - 6, false, player.color1 + 'AA', player.color2, player.coloreArmatura);
               		player.disegnaPlayer(xdisegnata + 26 + 1, ydisegnata + 1, player.width - 1, player.height - 2, false, player.color1, player.color2, player.coloreArmatura);
            		}
         	}
         	player.disegnaPlayer(xdisegnata, ydisegnata, player.width, player.height, true, player.color1, player.color2, player.coloreArmatura);
		break;
	 }
      }

      function drawBackgroundImage() { //disegna immagine di sfondo
         if (level.backGroundImg != "" && level.backGroundImg != null) { //se esiste disegna lo sfondo
            ctx.drawImage(level.backGroundImg, 0, 0, canvasWidth, canvasHeight);
         }
      }

      function drawWater() { //disegna l'acqua
         if (level.waterLevel) { //disegnala solo se esiste
            ctx.fillStyle = "#0400f850";
            var ydisegnata = 0
            if (player.y < canvasHeight / 2) {
               ydisegnata = level.waterLevel;
            } else {
               if (player.y > level.maxHeight - canvasHeight / 2) {
                  if (level.waterLevel < level.maxHeight - canvasHeight) {
                     ydisegnata = 0;
                  } else {
                     ydisegnata = level.waterLevel - level.maxHeight + canvasHeight;
                  }
               } else {
                  if (level.waterLevel < player.y - canvasHeight / 2) {
                     ydisegnata = 0;
                  } else {
                     ydisegnata = level.waterLevel - player.y + canvasHeight / 2;
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
            var xdisegnata = 0
            if (player.x + (player.width / 2) < canvasWidth / 2) {
               xdisegnata = lvl[i].x;
            } else {
               if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
                  xdisegnata = lvl[i].x - level.maxWidth + canvasWidth;
               } else {
                  xdisegnata = lvl[i].x - player.x - (player.width / 2) + canvasWidth / 2;
               }
            }
            var ydisegnata = 0
            if (player.y < canvasHeight / 2) {
               ydisegnata = lvl[i].y;
            } else {
               if (player.y > level.maxHeight - canvasHeight / 2) {
                  ydisegnata = lvl[i].y - level.maxHeight + canvasHeight;
               } else {
                  ydisegnata = lvl[i].y - player.y + canvasHeight / 2;
               }
            }
            //ora disegno il livello[i]                    
            if (xdisegnata + lvl[i].width > -1 && xdisegnata < canvasWidth + 1) {
               ctx.fillRect(xdisegnata, ydisegnata, lvl[i].width, lvl[i].height);
            }
         }
      }

      function drawHUD() {
         if (debugMode) {
            ctx.font = "small-caps bold 12px Lucida Console";
            altezzaTesto = ctx.measureText("O").width + 3;
            ctx.textAlign = "right";
            disegnaTestoConBordino("DEBUGMODE Level:" + lvlNumber, canvasWidth - 3, canvasHeight - 3, "#d2d2d2", "#000000");
            ctx.textAlign = "left";
            disegnaTestoConBordino("player.activePower:" + player.activePower, 10, 49, "#d2d2d2", "#000000");
            disegnaTestoConBordino("player.life:" + player.life + " max:" + player.lifeMax, 10, 50 + altezzaTesto, "#d2d2d2", "#000000");
            if (player.activePower > 0) {
               disegnaTestoConBordino("power.usage:" + player.power[player.activePower - 1].usage + " max:" + player.power[player.activePower - 1].usageMax, 10, 50 + altezzaTesto * 2, "#d2d2d2", "#000000");
            }
            disegnaTestoConBordino("last key pressed:" + ultimoTastoLetto, 3, canvasHeight - 3 - altezzaTesto, "#d2d2d2", "#000000");
            disegnaTestoConBordino("player.activeShot:" + player.activeShot, 3, canvasHeight - 3 - altezzaTesto * 2, "#d2d2d2", "#000000");
            disegnaTestoConBordino("player.invulnerability:" + player.invulnerability, 3, canvasHeight - 3 - altezzaTesto * 3, "#d2d2d2", "#000000");
            disegnaTestoConBordino("player.x:" + Math.round(player.x) + " player.y:" + Math.round(player.y), 3, canvasHeight - 3, "#d2d2d2", "#000000");
         } //fine debugMode       
         var barLenght = 16 * 6 + 40;
         var barHeight = 30;
         if (player.activePower != 0) { //barra potere - la disegno prima cosi' va sotto
            ctx.fillStyle = player.color1;
            ctx.fillRect(8, 8 + barHeight - 5, barLenght - 4 - 1, 16 - 1);
            ctx.fillStyle = '#3d3b3b';
            ctx.fillRect(10, 10 + barHeight - 5, barLenght - 4, 16);
            lineWidth = ((barLenght - 10) / player.power[player.activePower - 1].usageMax) - 1;
            for (i = 0; i < player.power[player.activePower - 1].usageMax; i++) { //disegno le barre della vita
               if (i < player.power[player.activePower - 1].usage) {
                  ctx.fillStyle = player.power[player.activePower - 1].color1;
               } else {
                  ctx.fillStyle = '#909090';
               }
               ctx.fillRect(13 + (i * (lineWidth + 1)), 15 + barHeight - 5, lineWidth, 8);
            }
         }
         ctx.fillStyle = player.color1;
         ctx.fillRect(8, 8, barLenght - 1, barHeight - 1);
         ctx.fillStyle = '#3d3b3b';
         ctx.fillRect(10, 10, barLenght, barHeight);
         ctx.beginPath(); //ora inizio a disegnare la x che sara' del colore del player attivo
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
         if (player.lifeMax > 16) {
            if (player.life > 16) {
               for (i = 16; i < player.lifeMax; i++) { //disegno le barre della vita
                  if (i < player.life) {
                     ctx.fillStyle = player.charge2color;
                  } else {
                     ctx.fillStyle = '#909090';
                  }
                  ctx.fillRect((i - 16) * 6 + 43, 14, 5, 21);
               }
               for (i = 0; i < 16; i++) { //disegno le barre della vita
                  if (i + 16 > player.lifeMax - 1) {
                     ctx.fillStyle = player.charge0color;
                     ctx.fillRect(i * 6 + 43, 17, 5, 18);
                  } else {
                     if (i + 16 > player.life - 1) {
                        ctx.fillStyle = player.charge0color;
                        ctx.fillRect(i * 6 + 43, 17, 5, 18);
                     }

                  }
               }
            } else {
               for (i = 16; i < player.lifeMax; i++) {
                  ctx.fillStyle = '#707070';
                  ctx.fillRect((i - 16) * 6 + 43, 14, 5, 21);
               }
               for (i = 0; i < 16; i++) { //disegno le barre della vita
                  if (i < player.life) {
                     ctx.fillStyle = player.charge0color;
                  } else {
                     ctx.fillStyle = '#909090';
                  }
                  //ctx.fillRect(i*6+43, 15, 5, 20);
                  ctx.fillRect(i * 6 + 43, 17, 5, 18);
               }
            }
         } else {
            for (i = 0; i < player.lifeMax; i++) { //disegno le barre della vita
               if (i < player.life) {
                  ctx.fillStyle = player.charge0color;
               } else {
                  ctx.fillStyle = '#808080';
               }
               ctx.fillRect(i * 6 + 43, 15, 5, 20);
            }
         }
      } //fine drawHUD    

      function drawEntity(doEntityPhysics) { //disegna le entità a schermo e chiama la entity[i].physics
         for (var i = 0; i < entity.length; i++) {
            if (entity[i].life > 0) { //calcola la entita solo se la sua vita è maggiore di zero
               //variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
               var xdisegnata = 0;
               if (player.x + (player.width / 2) < canvasWidth / 2) {
                  xdisegnata = entity[i].x;
               } else {
                  if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
                     xdisegnata = entity[i].x - level.maxWidth + canvasWidth;
                  } else {
                     xdisegnata = entity[i].x - player.x - (player.width / 2) + canvasWidth / 2;
                  }
               }
               var ydisegnata = 0;
               if (player.y < canvasHeight / 2) {
                  ydisegnata = entity[i].y;
               } else {
                  if (player.y > level.maxHeight - canvasHeight / 2) {
                     ydisegnata = entity[i].y - level.maxHeight + canvasHeight;
                  } else {
                     ydisegnata = entity[i].y - player.y + canvasHeight / 2;
                  }
               }
               //ora disegno l'entita e chiamo physics se e' dentro il canvas disegnato+unQuartoDiCanvas (questa roba non si applica se è uno sparo del player - se no si bugga tutto)                    
               if ((xdisegnata + entity[i].width > (-canvasWidth / 8) && xdisegnata < (canvasWidth + (canvasWidth / 8))) && (ydisegnata > (-canvasHeight / 8) && ydisegnata < (canvasHeight + (canvasHeight / 8))) || entity[i].type == "sparoDelPlayer") { //questo if fa i controlli spiegati sopra 
                  if (entity[i].canSelfDraw == true) {
                     entity[i].selfDraw(xdisegnata, ydisegnata, i);
                  } else {
                     ctx.fillStyle = entity[i].color;
                     ctx.fillRect(xdisegnata, ydisegnata, entity[i].width, entity[i].height);
                  }
                  if (doEntityPhysics && entity[i].hasPhysics) {
                     entity[i].physics(xdisegnata, ydisegnata, i);
                  }
               }
            }
         }
      }


//crea Player (funzione molto sporca)
function nuovoPlayer(currentPlayer){
if(currentPlayer==0){
  var player = new Player(); return player;
      //prototipo del player X
      function Player() {
      	 this.name="ics";
         this.lifeMax = 16;
         for (i = 0; i < 8; i++) {
            if (heartAcquired[i]) {
               this.lifeMax += 2;
            }
         } //aumenta la vita massima di 2 per ogni cuore trovato
         this.life = this.lifeMax;
         this.x = 0;
         this.y = 0;
         this.yv = 0;
         this.xv = 0;
         this.slope = 0;
         this.width = 24;
         this.height = 38;
         this.color1 = '#003ef0';
         this.color2 = '#3AB7D4';
         this.coloreArmatura = '#e1e1e1';
         this.defaultColor1 = '#003ef0';
         this.defaultColor2 = '#3AB7D4';
         this.defaultColoreArmatura = '#e1e1e1';
         this.damagedColor = '#990003';
         this.charge0color = '#ffc000';
         this.charge1color = '#49ff37';
         this.charge2color = '#14dfff';
         this.charge3color = '#ff3788';
         this.speed = 0.9;
         this.defaultspeed = 0.9;
         this.jumpheight = 11.5;
         this.giasaltato = false;
         this.giasparato = false;
         this.facingRight = true;
         this.isInWater = false;
         this.invulnerability = 0;
         this.canMove = true;
         this.canChangeWeap = true;
         this.carica = 0;
         this.activePower = 0;
         this.activeShot = 0;
         this.power = [ //vettore dei poteri
            {
               usageMax: 28,
               usage: 28,
               color1: '#687968',
               color2: '#d9b289',
               nome: 'Homing Torpedo'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#1a914f',
               color2: '#60d1aa',
               nome: 'Chameleon Sting'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#e13e60',
               color2: '#a1c1aa',
               nome: 'Rolling Shield'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#f14f02',
               color2: '#f8e179',
               nome: 'Fire Wave'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#e40097',
               color2: '#e191c1',
               nome: 'Storm Tornado'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#f8b202',
               color2: '#a1a1a1',
               nome: 'Electric Spark'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#606081',
               color2: '#81aa89',
               nome: 'Boomerang Cutter'
            },
            {
               usageMax: 28,
               usage: 28,
               color1: '#35e1f8',
               color2: '#f8e14f',
               nome: 'Shotgun Ice'
            },
         ];
         this.disegnaPlayer = function (xdisegnata, ydisegnata, larghezza, altezza, dettagli, colore1, colore2, coloreArmatura) {
            var coloreTemp = colore2;
            ctx.fillStyle = colore1;
            //testa
            ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 12, 12);
            //gambe
            ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 18, 6, 18);
            ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 18, 6, 18);
            //braccia
            if (player.facingRight) {
               ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11, 6, 15);
               ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 15, 6);
            } else {
               ctx.fillRect(xdisegnata + 2 - 15, ydisegnata + 11, 15, 6);
               ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 6, 15);
            }
            if (dettagli) {
               if (armaturaAcquired == "true,true,true,true") {
                  colore2 = colore1;
               }
               //testa
               if (armaturaAcquired[0]) {
                  ctx.fillStyle = coloreArmatura;
                  ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 12, 3);
                  ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 2, 9);
                  ctx.fillRect(xdisegnata + (larghezza / 2) + 6 - 2, ydisegnata - 2, 2, 9);
               }
               //gambe
               ctx.fillStyle = colore2;
               ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 18, 6, 12);
               ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 18, 6, 12);
               if (armaturaAcquired[1]) {
                  ctx.fillStyle = coloreArmatura;
                  ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 6, 6, 6);
                  ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 6, 6, 6);
                  if (armaturaAcquired == "true,true,true,true") {
                     ctx.fillStyle = coloreTemp;
                     ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 8, 6, 2);
                     ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 8, 6, 2);
                  }
               }
               //braccia
               ctx.fillStyle = colore2;
               if (player.facingRight) {
                  ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11, 6, 10);
                  ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 10, 6);
                  if (armaturaAcquired[2]) {
                     ctx.fillStyle = coloreArmatura;
                     ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11 + 10, 6, 5);
                     ctx.fillRect(xdisegnata + (larghezza) - 2 + 15 - 5, ydisegnata + 11, 5, 6);
                     if (armaturaAcquired == "true,true,true,true") {
                        ctx.fillStyle = coloreTemp;
                        ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11 + 10 - 2, 6, 2);
                        ctx.fillRect(xdisegnata + (larghezza) - 2 + 15 - 5 - 2, ydisegnata + 11, 2, 6);
                     }
                  }
               } else {
                  ctx.fillRect(xdisegnata + 2 - 10, ydisegnata + 11, 10, 6);
                  ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 6, 10);
                  if (armaturaAcquired[2]) {
                     ctx.fillStyle = coloreArmatura;
                     ctx.fillRect(xdisegnata + 2 - 15, ydisegnata + 11, 5, 6);
                     ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11 + 10, 6, 5);
                     if (armaturaAcquired == "true,true,true,true") {
                        ctx.fillStyle = coloreTemp;
                        ctx.fillRect(xdisegnata + 2 - 15 + 5, ydisegnata + 11, 2, 6);
                        ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11 + 10 - 2, 6, 2);
                     }
                  }
               }
               //corpo
               if (armaturaAcquired[3]) {
                  ctx.fillStyle = coloreArmatura;
               } else {
                  ctx.fillStyle = colore1;
               }
            }
            //corpo
            ctx.beginPath();
            ctx.lineWidth = "0";
            ctx.moveTo(xdisegnata - 3, ydisegnata + 10);
            ctx.lineTo(xdisegnata + larghezza + 3, ydisegnata + 10);
            ctx.lineTo(xdisegnata + (larghezza / 2), ydisegnata + (altezza) - 5);
            ctx.lineTo(xdisegnata - 3, ydisegnata + 10);
            ctx.fill();
      }

      this.physics = function (player, lvl) { //this function handles the platformer physics - in realta' solo del player
         var gravityApplicata = 0;
         var frizioneApplicata = 0;
         if (player.y > level.waterLevel) { //determina se sei in acqua o no
            if (!player.isInWater) {
               player.isInWater = true;
               player.yv = 0;
            }
            gravityApplicata = level.gravityWater;
            frizioneApplicata = level.frictionWater;
         } else {
            player.isInWater = false;
            gravityApplicata = level.gravity;
            frizioneApplicata = level.friction;
         }

         player.yv += gravityApplicata; //get level gravity
         player.y += player.yv; //apply gravity

         for (var i = 0; i < lvl.length; i++) { //y collision con level
            if (collisionBetween(player, lvl[i])) {
               player.y += -player.yv;
               player.yv = 0;
               if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                  player.speed = player.defaultspeed * 2.25;
               } else {
                  player.speed = player.defaultspeed;
               }
               if (keys[jumpkey] && player.canMove) { //jump
                  if (!player.giasaltato) {
                     player.yv = -player.jumpheight;
                     player.giasaltato = true;
                  } else {
                     player.yv = 0;
                  }
               } else {
                  player.giasaltato = false;
               }
            }
         }

         for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
            if (entity[i].life > 0 && entity[i].type == "piattaforma") {
               if (collisionBetween(player, entity[i])) {
                  if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
                     player.y = entity[i].y - player.height;
                     player.yv = entity[i].yv * 1.1;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                     if (keys[jumpkey] && player.canMove) { //jump
                        if (!player.giasaltato) {
                           player.yv = -player.jumpheight;
                           player.giasaltato = true;
                        } else {
                           player.yv = 0;
                        }
                     } else {
                        player.giasaltato = false;
                     }
                     if (entity[i].speed) {
                        player.xv += entity[i].xv;
                        if (entity[i].xv > 0) {
                           if (player.xv > entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        } else {
                           if (player.xv < entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        }
                        player.x -= player.xv;
                        for (var j = 0; j < lvl.length; j++) {
                           if (collisionBetween(player, lvl[j])) {
                              player.x += player.xv * 2;
                           }
                        }
                     }
                  } else { //collisione con x
                     player.y += player.slope;
                     player.x -= -player.xv;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                     if (keys[jumpkey] && player.canMove) { //wall jumping
                        if (!player.giasaltato) {
                           player.yv = -player.jumpheight + 1;
                           if (player.xv > 0) {
                              player.xv = -9.9;
                           } else {
                              player.xv = 9.9;
                           }
                           player.giasaltato = true;
                        } else {
                           player.xv = 0;
                        }
                     } else {
                        player.xv = 0;
                        player.giasaltato = false;
                     }
                  }
               }
            }
         }

         if (keys[destrakey] && player.canMove) { //x movement
            player.xv -= player.speed;
            player.facingRight = true;
         }
         if (keys[sinistrakey] && player.canMove) {
            player.xv += player.speed;
            player.facingRight = false;
         }
         player.xv *= frizioneApplicata;
         player.x += -player.xv;

         if (keys[lkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //previous available power
            tastoGiaSchiacciato = true;
            for (i = player.activePower - 1;; i--) {
               if (i == -1) {
                  i = 8;
               } else if (i == 0) {
                  player.activePower = 0;
                  break;
               }
               if (levelDefeated[i - 1]) {
                  player.activePower = i;
                  break;
               }
            }
            calcolaPlayerColor();
         }

         if (keys[rkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //next available power
            tastoGiaSchiacciato = true;
            for (i = player.activePower + 1;; i++) {
               if (i == 9) {
                  player.activePower = 0;
                  break;
               } else if (levelDefeated[i - 1]) {
                  player.activePower = i;
                  break;
               }
            }
            calcolaPlayerColor();
         }

         if (keys[sparokey] && player.canMove) { //shooting
            if (!player.giasparato) {
               if (player.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
                  player.giasparato = true;
                  if (player.activePower == 0) {
                     var sparo = new newSparo(20, 10);
                     entity.push(sparo);
                     player.activeShot++;
                  } else {
                     if (player.power[player.activePower - 1].usage > 0) {
                        switch (player.activePower) {
                           /*HomingTorpedo*/
                           case 1:
                              var sparo = new newHomingMissle(12, 12, player.power[0].color1, player.power[0].color2, 1.5);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 1.5;
                              player.power[player.activePower - 1].usage -= 0.5;
                              break;
                              /*ChameleonSting*/
                           case 2:
                              var sparo = new newChameleonSting(15, 15);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 3;
                              player.power[player.activePower - 1].usage -= 0.5;
                              break;
                              /*RollingShield*/
                           case 3:
                              var sparo = new newRollingShield(40, 40);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 3;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                              /*Fire*/
                           case 4:
                              var sparo = new newFireWave(70, 10);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 3;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                              /*Storm*/
                           case 5:
                              var sparo = new newStormTornado(player.x, (player.y + 3 + (15 / 2)), 15, 15, 0, player.facingRight, true);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 3;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                              /*Electric*/
                           case 6:
                              var sparo = new newElectricSpark(15, 15);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 1;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                              /*Boomerang*/
                           case 7:
                              var sparo = new newBoomerangCutter(15, 15, true);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 1;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                              /*ShotgunIce*/
                           case 8:
                              var sparo = new newShotgunIce(player.x + player.width + 6, player.x - 6 - 15, player.y + 6, 15, 15, true, 2.5, 0, player.facingRight);
                              entity.push(sparo);
                              player.activeShot = player.activeShot + 3;
                              player.power[player.activePower - 1].usage -= 1;
                              break;
                        }
                     }
                  }
               }
            } else {
               if (player.activePower == 0 || armaturaAcquired[2]) {
                  player.carica++; //disegna i pallini del colore della carica intorno al player
                  if (player.carica > 80) { //level 2 charge and 3
                     if (player.carica > 150 && armaturaAcquired[2]) { //charge 3 - richiede armaturaAcquired[2]
                        var xdisegnata = xDisegnata();
                        var ydisegnata = yDisegnata();
                        var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
                        var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
                        ctx.fillStyle = player.charge3color;
                        ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
                     } else { //charge 2
                        var xdisegnata = xDisegnata();
                        var ydisegnata = yDisegnata();
                        var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
                        var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
                        ctx.fillStyle = player.charge0color;
                        ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
                     }
                  } else if (player.carica > 25) { //level 1 charge
                     var xdisegnata = xDisegnata();
                     var ydisegnata = yDisegnata();
                     var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
                     var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
                     ctx.fillStyle = player.charge1color;
                     ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
                  }
               }
            }
         } else {
            if (player.giasparato) {
               if (player.canMove) {
                  if (player.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
                     if (player.activePower == 0) { //default power
                        if (player.carica > 80) {
                           player.activeShot++;
                           if (player.carica > 150 && armaturaAcquired[2]) { //charge 3 shoot
                              var latoCubottiSparo = 15;
                              if (player.facingRight) {
                                 var sparo = new newSparoCharge3((player.x + player.width + 6), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, true);
                                 var sparoInvisibile = new newSparo(1, 55); //gestisce activeShot per lo sparoCharge3
                                 sparoInvisibile.x = (player.x + player.width + 6);
                              } else {
                                 var sparo = new newSparoCharge3((player.x - 6 - latoCubottiSparo), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, true);
                                 var sparoInvisibile = new newSparo(1, 55);
                                 sparoInvisibile.x = (player.x - 6 - latoCubottiSparo);
                              }
                              sparo.color = player.charge3color;
                              sparoInvisibile.color = "#00000000"; //sono 8 zeri invece che 6, gli ultimi due indicano il canale alpha(trasparenza)
                              sparoInvisibile.damage = sparo.damage;
                              sparoInvisibile.speed = sparo.speed;
                              sparoInvisibile.y = sparo.startingY - 20;
                              sparoInvisibile.canPassWall = true;
                              entity.push(sparo);
                              entity.push(sparoInvisibile);
                              var latoCubottiSparo = 15;
                              if (player.facingRight) {
                                 var sparo = new newSparoCharge3((player.x + player.width + 6), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, false);
                              } else {
                                 var sparo = new newSparoCharge3((player.x - 6 - latoCubottiSparo), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, false);
                              }
                              sparo.color = player.charge3color;
                              entity.push(sparo);
                           } else { //charge 2 shoot
                              var sparo = new newSparo(50, 25);
                              sparo.y = sparo.y - 7;
                              sparo.color = player.charge2color;
                              sparo.damage = 3;
                              sparo.perforation = true;
                              entity.push(sparo);
                           }
                        } else if (player.carica > 25) { //charge 1 shoot
                           player.activeShot++;
                           var sparo = new newSparo(35, 15);
                           sparo.y = sparo.y - 2;
                           sparo.damage = 2;
                           sparo.color = player.charge1color;
                           entity.push(sparo);
                        }
                        player.carica = 0;
                        player.giasparato = false;
                     } else {
                        if (player.carica > 150 && armaturaAcquired[2]) {
                           switch (player.activePower) { //poteri caricati
                              /*HomingTorpedo*/
                              case 1:
                                 if (player.power[player.activePower - 1].usage > 2) {
                                    var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 3);
                                    sparo.damage = 2;
                                    entity.push(sparo);
                                    player.activeShot = player.activeShot + 3;
                                    var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
                                    sparo.y += -15;
                                    sparo.damage = 2;
                                    entity.push(sparo);
                                    var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
                                    sparo.y += 15;
                                    sparo.damage = 2;
                                    entity.push(sparo);
                                    var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
                                    sparo.y += -30;
                                    sparo.damage = 2;
                                    entity.push(sparo);
                                    player.power[player.activePower - 1].usage -= 3;
                                 }
                                 break;
                                 /*ChameleonSting*/
                              case 2:
                                 if (player.power[player.activePower - 1].usage > 3.5 && player.invulnerability < 90000) {
                                    player.invulnerability = 91000;
                                    player.canChangeWeap = false;
                                    player.power[player.activePower - 1].usage -= 4;
                                 }
                                 break;
                                 /*RollingShield*/
                              case 3:
                                 if (player.power[player.activePower - 1].usage > 1) {
                                    player.power[player.activePower - 1].usage -= 2;
                                    player.canChangeWeap = false;
                                    var sparo = new newRollingShieldCharge3(100, 100);
                                    entity.push(sparo);
                                    player.activeShot = player.activeShot + 3;
                                 }
                                 break;
                                 /*FireWave*/
                              case 4:
                                 if (player.power[player.activePower - 1].usage > 2) {
                                    var sparo = new newFireWaveCharge3Main(20, 20);
                                    entity.push(sparo);
                                    player.activeShot = player.activeShot + 3;
                                    player.power[player.activePower - 1].usage -= 3;
                                 }
                                 break;
                                 /*StormTornado*/
                              case 5:
                                 if (player.power[player.activePower - 1].usage > 1) {
                                    player.power[player.activePower - 1].usage -= 2;
                                    var sparo = new newStormTornadoCharge3(player.x, player.y + 6, 60, 15, player.facingRight, 0, true);
                                    entity.push(sparo);
                                    player.activeShot = player.activeShot + 3;
                                 }
                                 break;
                                 /*ElectricSpark*/
                              case 6:
                                 if (player.power[player.activePower - 1].usage > 1) {
                                    player.activeShot = player.activeShot + 3;
                                    if (player.facingRight) {
                                       var sparo = new newElectricSparkCharge3(player.x + player.width + 6, player.y + 9, 16, 100, player.facingRight);
                                       entity.push(sparo);
                                       var sparo = new newElectricSparkCharge3(player.x + player.width + 6, player.y + 9, 16, 100, !player.facingRight);
                                       entity.push(sparo);
                                    } else {
                                       var sparo = new newElectricSparkCharge3(player.x - 6 - 16, player.y + 9, 16, 100, player.facingRight);
                                       entity.push(sparo);
                                       var sparo = new newElectricSparkCharge3(player.x - 6 - 16, player.y + 9, 16, 100, !player.facingRight);
                                       entity.push(sparo);
                                    }
                                    player.power[player.activePower - 1].usage -= 2;
                                 }
                                 break;
                                 /*BoomerangCut*/
                              case 7:
                                 if (player.power[player.activePower - 1].usage > 1) {
                                    player.power[player.activePower - 1].usage -= 2;
                                    player.activeShot = player.activeShot + 3;
                                    var sparo = new newBoomerangCutterCharge3(30, 30, 0, true);
                                    entity.push(sparo);
                                    var sparo = new newBoomerangCutterCharge3(30, 30, 1, false);
                                    entity.push(sparo);
                                    var sparo = new newBoomerangCutterCharge3(30, 30, 2, true);
                                    entity.push(sparo);
                                    var sparo = new newBoomerangCutterCharge3(30, 30, 3, false);
                                    entity.push(sparo);
                                 }
                                 break;
                                 /*ShotgunIce*/
                              case 8:
                                 if (player.power[player.activePower - 1].usage > 1) {
                                    var sparo = new newShotgunIceCharge3(60, 20);
                                    entity.push(sparo);
                                    player.activeShot = player.activeShot + 3;
                                    player.power[player.activePower - 1].usage -= 2;
                                 }
                                 break;
                           }
                        }
                        player.giasparato = false;
                        player.carica = 0;
                     }
                  } else {
                     player.carica = 0;
                  }
               } else {
                  player.carica = -9999999999999;
               }
            }
         }

         player.slope = 0; //serve per i bordi tipo - serve anche per le collision
         for (var i = 0; i < lvl.length; i++) {
            if (collisionBetween(player, lvl[i])) {
               if (player.slope != -8) {
                  player.y -= 1;
                  player.slope += 1;
               }
            }
         }

         for (var i = 0; i < lvl.length; i++) { //x collision
            if (collisionBetween(player, lvl[i])) {
               player.y += player.slope;
               player.x -= -player.xv;
               if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
                  player.speed = player.defaultspeed * 2.25;
               } else {
                  player.speed = player.defaultspeed;
               }
               if (keys[jumpkey] && player.canMove) { //wall jumping
                  if (!player.giasaltato) {
                     player.yv = -player.jumpheight + 1;
                     if (player.xv > 0) {
                        player.xv = -9.9;
                     } else {
                        player.xv = 9.9;
                     }
                     player.giasaltato = true;
                  } else {
                     player.xv = 0;
                  }
               } else {
                  player.xv = 0;
                  player.giasaltato = false;
               }
            }
         }

         for (var i = 0; i < entity.length; i++) { //contatto con entita'
            if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
               if (collisionBetween(player, entity[i])) {
                  if (entity[i].damage > 0) {
                     if (player.invulnerability < 1) { //entity collison								            		
                        player.color1 = player.damagedColor;
                        player.color2 = player.damagedColor;
                        player.coloreArmatura = player.damagedColor;
                        if (armaturaAcquired[3] && (entity[i].damage > 1)) {
                           player.life = player.life - (entity[i].damage - 1);
                        } else {
                           player.life = player.life - entity[i].damage;
                        }
                        player.invulnerability = 40;
                        player.canMove = false;
                        break;
                     }
                  } else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
                     if ((player.life - entity[i].damage) > player.lifeMax) {
                        var vitaRecuperabile = (0 - entity[i].damage) - (player.lifeMax - player.life);
                        player.life = player.lifeMax;
                        for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
                           if (subtank[j].acquired) {
                              if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
                                 vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
                                 subtank[j].life = subtank[j].lifeMax;
                                 i++;
                              } else {
                                 subtank[j].life = subtank[j].life + vitaRecuperabile;
                                 break;
                              }
                           }
                        }
                     } else {
                        player.life = player.life - entity[i].damage;
                     }
                  }
               }
            }
         }
         if (player.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
            player.invulnerability--;
            if (player.invulnerability == 90000) {
               player.invulnerability = 5;
               player.canChangeWeap = true;
            } //fine sting cham charge3
            if (player.invulnerability > 90000) { //potere di sting chameleon charge3
               calcolaPlayerColor();
            }
            if (player.invulnerability < 30) {
               calcolaPlayerColor();
               player.color1 = player.color2;
               player.color2 = player.color2;
               player.coloreArmatura = player.color2;
            }
            if (player.invulnerability < 20) {
               player.canMove = true;
            }
            if (player.invulnerability < 5) {
               calcolaPlayerColor();
               player.coloreArmatura = player.defaultColoreArmatura;
            }
         }

         if (player.life < 1) { //gameover
            disegnaSchermoDiGioco(false);
            objAlert = new newAlert("Gameover", 1);
            gamestate = 5;
         }

         if (keys[startkey]) { //menu di pausa
            if (!tastoGiaSchiacciato && !(player.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
               if (player.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
                  objMenuDiPausa = new newMenuDiPausa();
                  disegnaSchermoDiGioco(false);
                  tastoGiaSchiacciato = true;
                  gamestate = 2;
               } else {
                  objAlert = new newAlert("pause", -1);
                  gamestate = 5;
               }
            }
         }

         if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
            tastoGiaSchiacciato = false;
         }

         function calcolaPlayerColor() { //calcola i colori attivi del player
            if (player.invulnerability < 90000) { //se non e' stingCham charge3 
               if (player.activePower == 0) {
                  player.color1 = player.defaultColor1;
                  player.color2 = player.defaultColor2;
               } else {
                  player.color1 = player.power[player.activePower - 1].color1;
                  player.color2 = player.power[player.activePower - 1].color2;
               }
            } else { //se invece stingCham charge3
               var colorNumber = player.invulnerability - 90000;
               if (colorNumber > 950) {
                  player.color1 = "#ff1100";
                  player.color2 = "#ffa7a1";
               } else if (colorNumber > 900) {
                  player.color1 = "#ff9500";
                  player.color2 = "#ffcc85";
               } else if (colorNumber > 850) {
                  player.color1 = "#ffe400";
                  player.color2 = "#fff38d";
               } else if (colorNumber > 800) {
                  player.color1 = "#aaff00";
                  player.color2 = "#d8ff8c";
               } else if (colorNumber > 750) {
                  player.color1 = "#00ffb3";
                  player.color2 = "#a8ffe5";
               } else if (colorNumber > 700) {
                  player.color1 = "#00b9ff";
                  player.color2 = "#bbecff";
               } else if (colorNumber > 650) {
                  player.color1 = "#6100ff";
                  player.color2 = "#b78aff";
               } else if (colorNumber > 600) {
                  player.color1 = "#e800ff";
                  player.color2 = "#fac6ff";
               } else if (colorNumber > 550) {
                  player.color1 = "#ff1100";
                  player.color2 = "#ffa7a1";
               } else if (colorNumber > 500) {
                  player.color1 = "#ff0084";
                  player.color2 = "#ffc7e4";
               } else if (colorNumber > 450) {
                  player.color1 = "#ff9500";
                  player.color2 = "#ffcc85";
               } else if (colorNumber > 400) {
                  player.color1 = "#ffe400";
                  player.color2 = "#fff38d";
               } else if (colorNumber > 350) {
                  player.color1 = "#aaff00";
                  player.color2 = "#d8ff8c";
               } else if (colorNumber > 300) {
                  player.color1 = "#00ffb3";
                  player.color2 = "#a8ffe5";
               } else if (colorNumber > 250) {
                  player.color1 = "#00b9ff";
                  player.color2 = "#bbecff";
               } else if (colorNumber > 200) {
                  player.color1 = "#6100ff";
                  player.color2 = "#b78aff";
               } else if (colorNumber > 150) {
                  player.color1 = "#e800ff";
                  player.color2 = "#fac6ff";
               } else if (colorNumber > 100) {
                  player.color1 = "#ff0084";
                  player.color2 = "#ffc7e4";
               } else {
                  player.color1 = player.power[player.activePower - 1].color1;
                  player.color2 = player.color2 = player.power[player.activePower - 1].color2;
               }
               player.coloreArmatura = "#303030";
            }
         }
      } //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
    } //fine di PlayerX

}else if(currentPlayer==1){
  var player = new Player(); return player;
      
      //prototipo di Riccardo
      function Player() {
      	 this.name="riccardo belmonte";
         this.lifeMax = 8;
         for (i = 0; i < 8; i++) {
            if (heartAcquired[i]) {
               this.lifeMax++;
            }
         } //aumenta la vita massima di 2 per ogni cuore trovato
         this.life = this.lifeMax;
	 this.sprite = new Image();
         this.sprite.src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAABMtJREFUaIHtWrFu20AMpYx8gjzHv5ChYwYZcPcu+pPmI5w/0dDsMSANGVMgv5DM0j9cB4cKRZM83p2MLnlAkEYWyXc8Ho+kW8EV0TQh0L+Hoaquae8bBE0TQnh9DuM4hvD6HJomBL4h3wC48byUGsn4/v7hAAAAXXeXSa+Mx5r4b7ZTIxk/p3JrRH/JiaKccnhc8zRvYoYBzpHctjVMu7xI7ropS24NHk0TQn88QddN0B9PC33Xtu2BmoIoyf54gml3B21bA4B+/PjC9g+HWTYXOTy4bG4qLLHtxcUGWNHRddNMwCuHi/fCE50WD0lP7sbl2k7BIgVZTqzf36LK8KhzDENVeSIm5nwPDys/e1JhqQ9SMW8A5koOfIY5UALKSqmmP56Scm5/PIHEA6HxQMdL8l7nSTypLssHudig4f54ukgX6FQk4Y3kHNBNtO4MyoXLdt2kysacJwUgXz/aXdMHZhWEsBxCHVe/vy0WKW1qTIcGjGyuT5LVbGonSzv9iLUrHwrXBgCc86eWSpAgXXiJ83mkoi7Up0Vg29ZqlKOO3OjF+4P2ODl6ODYA5wVJzuK5E/M5J4Dv0Etu/3CA/vEJUL9FAm1zB1pRz+XbtlbtUB0pDZm0fsS0uwPPJsSawPkEaOSROL/EOAGefrpugun2HvrHJ9clHIt6+ty62Pk6qPPRgVyHFoAA+vo98DSBYiPGa93zv2WCZ/LrtOV4glIqDZq+ttsvPegw7WTznE/XweX5+oehqtCWBm8TuIiWpgkBjXPiVhoZxzFYTvM0Pv3jE0y391B/vMD+96+FY1E3Og2bqmGoKjyF1Y+fFXKh0YrFgbQRnNe8/k8O3OZ2u3XdHylN4OIPJI+kASB68aGMdeF6Lr7w9885Yj4XTsEXoem1uHg4lMoDXKYYHkjqBkjGMSXU729zhMWM0sYthXzsFMX0SPxp/o9x4PJ8HSWdPA0grmejkQf4qkr2DwfzIkWlvJGyamuKcRxD/fHieleVF5zPm6gUeQBwywPYkwSrCbwBgDm3oZP5kf+KhhCu0Qlz+5Q8hWZfkwfwNVGl8p5JgtaDXDRiVkeaMtfxNmIx4ImadndmMxjDGl8IlchrcHXC/GhLZLCWxss7tX2XdEpDtJRNuMb0MgeWL9QN4DnLG81rTAz5BJI6kjtV6jJLTx/KezeQNnJdN82NF9WhBe7ciGENPIG+W9aiaB7sjyfYt3nVg3SRLe1ecpAqL8TZAfEZEL3/8HfKJg5DVS0v88PMyZrSzuNo7H7xRyIsjYKld1JKN01Wkrfsax1vzIn8ewSebr2gzqejBwAwT8F8Atq2NiPJighagpU4n9qxZjoxSE60KjjpC5wUcOcDwKL6weeS3g3ffbp4nouliCh1Pi/htHJNs0+BX5bkfmmCtiV5LYfzHkK7/+jzcRxnPfMlLDmPLnqtslKDFvk0GKyJZWyaG4Nl2wI2qvyZBjwhOMOaN0CKLj6m1SKQt+858DhK4xi7k0oR04EZhP7w/0PE7wQc7UT7AFwgdbJW9pWWfhYHy34prBMk2dZ00N+4CfTz/niaJ7OoZ7EB3k5Xm3mURluJ/VzdqfeFpoenSJq+tWoOAKDSSPFn2nteeQ2l9lP1586yND3Sc/pMew8/+wfcFEzWV3ZGTAAAAABJRU5ErkJggg==";
	 this.spriteTimer=0;
         this.x = 0;
         this.y = 0;
         this.yv = 0;
         this.xv = 0;
         this.slope = 0;
         this.width = 30;
	 this.standingHeight = 57;
	 this.crouchedHeight = 20;
	 this.height = this.standingHeight;
	 this.subWeaponHeart = 0;
         this.color1 = '#003ef0';
         this.color2 = '#3AB7D4';
         this.coloreArmatura = '#e1e1e1';
         this.defaultColor1 = '#003ef0';
         this.defaultColor2 = '#3AB7D4';
         this.defaultColoreArmatura = '#e1e1e1';
         this.damagedColor = '#990003';
         this.charge0color = '#ffc000';
         this.charge1color = '#49ff37';
         this.charge2color = '#14dfff';
         this.charge3color = '#ff3788';
         this.speed = 0.7;
	 this.stance=0;
         this.defaultspeed = 0.7;
         this.jumpheight = 11.5;
         this.giasaltato = false;
         this.giasparato = false;
         this.facingRight = true;
         this.isInWater = false;
         this.invulnerability = 0;
         this.canMove = true;
         this.canChangeWeap = true;
         this.carica = 0;
         this.activePower = 0;
         this.activeShot = 0;
         this.power = [ //vettore dei poteri
            {
               usageMax: 0,
               usage: 0,
               color1: '#687968',
               color2: '#d9b289',
               nome: 'Dagger'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#1a914f',
               color2: '#60d1aa',
               nome: 'Axe'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#e13e60',
               color2: '#a1c1aa',
               nome: 'Cross'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#f14f02',
               color2: '#f8e179',
               nome: 'Holy Water'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#e40097',
               color2: '#e191c1',
               nome: 'Salt & Garlic'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#f8b202',
               color2: '#a1a1a1',
               nome: 'Bible'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#606081',
               color2: '#81aa89',
               nome: 'Diamond'
            },
            {
               usageMax: 0,
               usage: 0,
               color1: '#35e1f8',
               color2: '#f8e14f',
               nome: 'Thunder'
            },
         ];
         this.disegnaPlayer = function (xdisegnata, ydisegnata, stance, sprite, facingRight) {
	 	if(facingRight){
			ctx.drawImage(sprite, 16*stance, 0, 16, 32, xdisegnata, ydisegnata-6, 32, 64);
		}else{
			ctx.drawImage(sprite, 16*stance, 0, 16, 32, xdisegnata, ydisegnata-6, 32, 64);
		}
      	 }

      	 this.physics = function (player, lvl) { //this function handles the platformer physics - in realta' solo del player
         var gravityApplicata = 0;
         var frizioneApplicata = 0;
         if (player.y > level.waterLevel) { //determina se sei in acqua o no
            if (!player.isInWater) {
               player.isInWater = true;
               player.yv = 0;
            }
            gravityApplicata = level.gravityWater;
            frizioneApplicata = level.frictionWater;
         } else {
            player.isInWater = false;
            gravityApplicata = level.gravity;
            frizioneApplicata = level.friction;
         }

         player.yv += gravityApplicata; //get level gravity
         player.y += player.yv; //apply gravity

         for (var i = 0; i < lvl.length; i++) { //y collision con level
            if (collisionBetween(player, lvl[i])) {
               player.y += -player.yv;
               player.yv = 0;
               if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                  player.speed = player.defaultspeed * 2.25;
               } else {
                  player.speed = player.defaultspeed;
               }
               if (keys[jumpkey] && player.canMove) { //jump
                  if (!player.giasaltato) {
                     player.yv = -player.jumpheight;
                     player.giasaltato = true;
                  } else {
                     player.yv = 0;
                  }
               } else {
                  player.giasaltato = false;
               }
            }
         }

         for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
            if (entity[i].life > 0 && entity[i].type == "piattaforma") {
               if (collisionBetween(player, entity[i])) {
                  if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
                     player.y = entity[i].y - player.height;
                     player.yv = entity[i].yv * 1.1;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                     if (keys[jumpkey] && player.canMove) { //jump
                        if (!player.giasaltato) {
                           player.yv = -player.jumpheight;
                           player.giasaltato = true;
                        } else {
                           player.yv = 0;
                        }
                     } else {
                        player.giasaltato = false;
                     }
                     if (entity[i].speed) {
                        player.xv += entity[i].xv;
                        if (entity[i].xv > 0) {
                           if (player.xv > entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        } else {
                           if (player.xv < entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        }
                        player.x -= player.xv;
                        for (var j = 0; j < lvl.length; j++) {
                           if (collisionBetween(player, lvl[j])) {
                              player.x += player.xv * 2;
                           }
                        }
                     }
                  } else { //collisione con x
                     player.y += player.slope;
                     player.x -= -player.xv;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                  }
               }
            }
         }

         if (keys[destrakey] && player.canMove) { //x movement
            player.xv -= player.speed;
            player.facingRight = true;
         }
         if (keys[sinistrakey] && player.canMove) {
            player.xv += player.speed;
            player.facingRight = false;
         }
         player.xv *= frizioneApplicata;
         player.x += -player.xv;
 	
	 player.slope = 0; //serve per i bordi tipo - serve anche per le collision
         for (var i = 0; i < lvl.length; i++) {
            if (collisionBetween(player, lvl[i])) {
               if (player.slope != -8) {
                  player.y -= 1;
                  player.slope += 1;
               }
            }
         }

         for (var i = 0; i < lvl.length; i++) { //x collision
            if (collisionBetween(player, lvl[i])) {
               player.y += player.slope;
               player.x -= -player.xv;
               if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
                  player.speed = player.defaultspeed * 2.25;
               } else {
                  player.speed = player.defaultspeed;
               }
            }
         }

         for (var i = 0; i < entity.length; i++) { //contatto con entita'
            if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
               if (collisionBetween(player, entity[i])) {
                  if (entity[i].damage > 0) {
                     if (player.invulnerability < 1) { //entity collison								            		
                        player.color1 = player.damagedColor;
                        player.color2 = player.damagedColor;
                        player.coloreArmatura = player.damagedColor;
                        if (armaturaAcquired[3] && (entity[i].damage > 1)) {
                           player.life = player.life - (entity[i].damage - 1);
                        } else {
                           player.life = player.life - entity[i].damage;
                        }
                        player.invulnerability = 40;
                        player.canMove = false;
                        break;
                     }
                  } else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
                     if ((player.life - entity[i].damage) > player.lifeMax) {
                        var vitaRecuperabile = (0 - entity[i].damage) - (player.lifeMax - player.life);
                        player.life = player.lifeMax;
                        for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
                           if (subtank[j].acquired) {
                              if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
                                 vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
                                 subtank[j].life = subtank[j].lifeMax;
                                 i++;
                              } else {
                                 subtank[j].life = subtank[j].life + vitaRecuperabile;
                                 break;
                              }
                           }
                        }
                     } else {
                        player.life = player.life - entity[i].damage;
                     }
                  }
               }
            }
         }
         if (player.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
            player.invulnerability--;
            if (player.invulnerability == 90000) {
               player.invulnerability = 5;
               player.canChangeWeap = true;
            } //fine sting cham charge3
            if (player.invulnerability > 90000) { //potere di sting chameleon charge3
               calcolaPlayerColor();
            }
            if (player.invulnerability < 30) {
               calcolaPlayerColor();
               player.color1 = player.color2;
               player.color2 = player.color2;
               player.coloreArmatura = player.color2;
            }
            if (player.invulnerability < 20) {
               player.canMove = true;
            }
            if (player.invulnerability < 5) {
               calcolaPlayerColor();
               player.coloreArmatura = player.defaultColoreArmatura;
            }
         }

         if (player.life < 1) { //gameover
            disegnaSchermoDiGioco(false);
            objAlert = new newAlert("Gameover", 1);
            gamestate = 5;
         }

         if (keys[startkey]) { //menu di pausa
            if (!tastoGiaSchiacciato && !(player.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
               if (player.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
                  objMenuDiPausa = new newMenuDiPausa();
                  disegnaSchermoDiGioco(false);
                  tastoGiaSchiacciato = true;
                  gamestate = 2;
               } else {
                  objAlert = new newAlert("pause", -1);
                  gamestate = 5;
               }
            }
         }

         if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
            tastoGiaSchiacciato = false;
         }

	 player.calculateStance(player);
      	}//fine di Riccardo.physics()
	
	this.calculateStance = function (player){ //calcola a che animazione della spritesheet e' il player
		var previousStance=player.stance;
		var maxTimer=9;
		if(player.yv < 0.3){ //se il player e' a terra o in ascesa
			if(player.xv > 0.3 || player.xv < -0.3){ //se il player si sta muovendo
				if(player.speed>player.defaultspeed+0.1){ //running
					switch (player.spriteTimer){
						case 0: player.stance=1; break;
						case 1*maxTimer: player.stance=3; break;
						case 2*maxTimer: player.stance=1; break;
						case 3*maxTimer: player.stance=4; break;
						case 4*maxTimer: player.stance=1; player.spriteTimer=0; break;
					}
				}else{//walking
					switch (player.spriteTimer){
						case 0: player.stance=1; break;
						case 1*maxTimer: player.stance=2; break;
						case 2*maxTimer: player.stance=1; break;
						case 3*maxTimer: player.stance=0; break;
						case 4*maxTimer: player.stance=1; player.spriteTimer=0; break;
					}
				}
			}else{
				if(player.crouching){
					player.stance=5;
				}else{	player.stance=0;}
				player.spriteTimer=0;
			}
		}else{ //se invece il player e' in aria (discesa)
			player.stance=0; player.spriteTimer=0;
		}
		if(previousStance==player.stance){player.spriteTimer++;}
	}	
      }//fine di new Riccardo()

}}//fine di creaPlayer

      function collisionBetween(p1, lvl) { //this function detects the collision between the two given objects - la uso anche con le entità lol
         if (lvl.x < p1.x + p1.width &&
            lvl.x + lvl.width > p1.x &&
            lvl.y < p1.y + p1.height &&
            lvl.y + lvl.height > p1.y) {
            return true;
         } else {
            return false;
         }
      }

      function stageSelect() {
         var img = new Image();
         img.src = "data:image/jpeg;base64,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";
	 ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
	 //scrivo il nome del player corrente
         ctx.textAlign = "right";
         ctx.font = "small-caps bold 20px Lucida Console";
         disegnaTestoConBordino("playing as", canvasWidth - 3, canvasHeight - 18, "#d2d2d2bb", "#020219");
         disegnaTestoConBordino(getCurrentPlayerName(currentPlayer), canvasWidth - 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
         ctx.textAlign = "left";
         //leggo che tasto viene schiacciato. Con invio o dash si inizia a giocare, con le freccie si cicla tra i livelli
         if ((keys[dashkey]) && !tastoGiaSchiacciato) { //avvia il livello selezionato
            gamestate = -1;
            nuovoLivello();
         }
         if (keys[startkey] && !tastoGiaSchiacciato) { //apre le opzioni di scelta livello
            objMenuOpzioniStageSelect = new newMenuOpzioniStageSelect();
            tastoGiaSchiacciato = true;
            gamestate = 4;
         }
	 if (keys[rkey] && !tastoGiaSchiacciato) { //cicla personaggio scelto
            if (currentPlayer < maxCurrentPlayer-1){ currentPlayer++;}else{currentPlayer=0;}
         }
	 if (keys[lkey] && !tastoGiaSchiacciato) { //cicla personaggio scelto
            if (currentPlayer > 0){ currentPlayer--;}else{currentPlayer=maxCurrentPlayer-1;}
         }
         if (keys[sukey] && !tastoGiaSchiacciato) {
            if (lvlNumber == 4) {
               lvlNumber = 8;
            } else if (lvlNumber == 5) {
               lvlNumber = 3;
            } else if (lvlNumber == 6) {
               lvlNumber = 1;
            } else if (lvlNumber == 7) {
               lvlNumber = 4;
            } else if (lvlNumber == 3) {
               lvlNumber = 1;
            } else if (lvlNumber == 2) {
               lvlNumber = 8;
            }
         }
         if (keys[giukey] && !tastoGiaSchiacciato) {
            if (lvlNumber == 1) {
               lvlNumber = 6;         var gravityApplicata = 0;
         var frizioneApplicata = 0;
         if (player.y > level.waterLevel) { //determina se sei in acqua o no
            if (!player.isInWater) {
               player.isInWater = true;
               player.yv = 0;
            }
            gravityApplicata = level.gravityWater;
            frizioneApplicata = level.frictionWater;
         } else {
            player.isInWater = false;
            gravityApplicata = level.gravity;
            frizioneApplicata = level.friction;
         }

         player.yv += gravityApplicata; //get level gravity
         player.y += player.yv; //apply gravity

         for (var i = 0; i < lvl.length; i++) { //y collision con level
            if (collisionBetween(player, lvl[i])) {
               player.y += -player.yv;
               player.yv = 0;
               if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                  player.speed = player.defaultspeed * 2.25;
               } else {
                  player.speed = player.defaultspeed;
               }
               if (keys[jumpkey] && player.canMove) { //jump
                  if (!player.giasaltato) {
                     player.yv = -player.jumpheight;
                     player.giasaltato = true;
                  } else {
                     player.yv = 0;
                  }
               } else {
                  player.giasaltato = false;
               }
            }
         }

         for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
            if (entity[i].life > 0 && entity[i].type == "piattaforma") {
               if (collisionBetween(player, entity[i])) {
                  if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
                     player.y = entity[i].y - player.height;
                     player.yv = entity[i].yv * 1.1;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                     if (keys[jumpkey] && player.canMove) { //jump
                        if (!player.giasaltato) {
                           player.yv = -player.jumpheight;
                           player.giasaltato = true;
                        } else {
                           player.yv = 0;
                        }
                     } else {
                        player.giasaltato = false;
                     }
                     if (entity[i].speed) {
                        player.xv += entity[i].xv;
                        if (entity[i].xv > 0) {
                           if (player.xv > entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        } else {
                           if (player.xv < entity[i].xv) {
                              player.xv = entity[i].xv / 1.85;
                           }
                        }
                        player.x -= player.xv;
                        for (var j = 0; j < lvl.length; j++) {
                           if (collisionBetween(player, lvl[j])) {
                              player.x += player.xv * 2;
                           }
                        }
                     }
                  } else { //collisione con x
                     player.y += player.slope;
                     player.x -= -player.xv;
                     if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
                        player.speed = player.defaultspeed * 2.25;
                     } else {
                        player.speed = player.defaultspeed;
                     }
                     if (keys[jumpkey] && player.canMove) { //wall jumping
                        if (!player.giasaltato) {
                           player.yv = -player.jumpheight + 1;
                           if (player.xv > 0) {
                              player.xv = -9.9;
                           } else {
                              player.xv = 9.9;
                           }
                           player.giasaltato = true;
                        } else {
                           player.xv = 0;
                        }
                     } else {
                        player.xv = 0;
                        player.giasaltato = false;
                     }
                  }
               }
            }
         }

         if (keys[destrakey] && player.canMove) { //x movement
            player.xv -= player.speed;
            player.facingRight = true;
         }
         if (keys[sinistrakey] && player.canMove) {
            player.xv += player.speed;
            player.facingRight = false;
         }
         player.xv *= frizioneApplicata;
         player.x += -player.xv;

            } else if (lvlNumber == 5) {
               lvlNumber = 6;
            } else if (lvlNumber == 3) {
               lvlNumber = 5;
            } else if (lvlNumber == 8) {
               lvlNumber = 2;
            } else if (lvlNumber == 7) {
               lvlNumber = 2;
            } else if (lvlNumber == 4) {
               lvlNumber = 7;
            }
         }
         if (keys[sinistrakey] && !tastoGiaSchiacciato) {
            if (lvlNumber == 2) {
               lvlNumber = 6;
            } else if (lvlNumber == 7) {
               lvlNumber = 5;
            } else if (lvlNumber == 4) {
               lvlNumber = 3;
            } else if (lvlNumber == 8) {
               lvlNumber = 1;
            } else if (lvlNumber == 1) {
               lvlNumber = 3;
            } else if (lvlNumber == 6) {
               lvlNumber = 5;
            }
         }
         if (keys[destrakey] && !tastoGiaSchiacciato) {
            if (lvlNumber == 1) {
               lvlNumber = 8;
            } else if (lvlNumber == 2) {
               lvlNumber = 7;
            } else if (lvlNumber == 5) {
               lvlNumber = 7;
            } else if (lvlNumber == 6) {
               lvlNumber = 2;
            } else if (lvlNumber == 3) {
               lvlNumber = 4;
            } else if (lvlNumber == 8) {
               lvlNumber = 4;
            }
         }
         if (keys[destrakey] || keys[sinistrakey] || keys[giukey] || keys[sukey] || keys[startkey] || keys[dashkey] || keys[lkey] || keys[rkey]) { //serve per evitare che in un attimo ti sposti di un bordello di livelli 
            tastoGiaSchiacciato = true;
         } else {
            tastoGiaSchiacciato = false;
         }

         //ora disegno un quadrato intorno al livello selezionato
         if (levelDefeated[lvlNumber - 1]) {
            ctx.fillStyle = "#b7a4a6"; //se il livello selezionato e' stato battuto fa il quadrato rosso
         } else {
            ctx.fillStyle = "#ffc000"; //se il livello selezionato non e' stato battuto fa il quadrato giallo
         }
         switch (lvlNumber) {
            case 1:
               ctx.fillRect(137, 10, 135, 10);
               ctx.fillRect(137, 10, 10, 135);
               ctx.fillRect(137, 135, 135, 10);
               ctx.fillRect(263, 10, 10, 135);
               break;
            case 8:
               ctx.fillRect(265, 10, 135, 10);
               ctx.fillRect(265, 10, 10, 135);
               ctx.fillRect(265, 135, 135, 10);
               ctx.fillRect(391, 10, 10, 135);
               break;
            case 4:
               ctx.fillRect(395, 140, 135, 10);
               ctx.fillRect(395, 140, 10, 135);
               ctx.fillRect(395, 265, 135, 10);
               ctx.fillRect(521, 140, 10, 135);
               break;
            case 7:
               ctx.fillRect(395, 270, 135, 10);
               ctx.fillRect(395, 270, 10, 135);
               ctx.fillRect(395, 395, 135, 10);
               ctx.fillRect(521, 270, 10, 135);
               break;
            case 2:
               ctx.fillRect(265, 396, 135, 10);
               ctx.fillRect(265, 396, 10, 135);
               ctx.fillRect(265, 521, 135, 10);
               ctx.fillRect(391, 396, 10, 135);
               break;
            case 6:
               ctx.fillRect(137, 396, 135, 10);
               ctx.fillRect(137, 396, 10, 135);
               ctx.fillRect(137, 521, 135, 10);
               ctx.fillRect(263, 396, 10, 135);
               break;
            case 5:
               ctx.fillRect(9, 270, 135, 10);
               ctx.fillRect(9, 270, 10, 135);
               ctx.fillRect(9, 395, 135, 10);
               ctx.fillRect(135, 270, 10, 135);
               break;
            case 3:
               ctx.fillRect(9, 140, 135, 10);
               ctx.fillRect(9, 140, 10, 135);
               ctx.fillRect(9, 265, 135, 10);
               ctx.fillRect(135, 140, 10, 135);
               break;
         }
      }

      function disegnaTestoConBordino(stringaDiTesto, xdisegnata, ydisegnata, coloreTesto, coloreBordino) {
         ctx.fillStyle = coloreBordino;
         ctx.fillText(stringaDiTesto, xdisegnata + 1, ydisegnata + 1);
         ctx.fillText(stringaDiTesto, xdisegnata + 1, ydisegnata - 1);
         ctx.fillText(stringaDiTesto, xdisegnata - 1, ydisegnata + 1);
         ctx.fillText(stringaDiTesto, xdisegnata - 1, ydisegnata - 1);
         ctx.fillStyle = coloreTesto;
         ctx.fillText(stringaDiTesto, xdisegnata, ydisegnata);
      }

      function newMenuDiPausa() {
         this.width = 0;
         this.height = 0;
         this.widthMax = canvasWidth - 150;
         this.heightMax = canvasHeight - 150;
         this.isOpen = false;
         this.isClosing = false;
         this.canInput = true;
         this.tornaStageSelection = false;
         this.indice = player.activePower;
         this.settore = 0;
         this.usingSubtank = 4; //4 vuol dire che non sto usando la subtank (da 0 a 3 e' l'indice della subtank usata)
         this.lastSubtankAcquired = 4; //se rimane uguale a 4 vuol dire che non e' stata acquisita nessuna subtank
         this.drawMenuDiPausa = function () {
            ctx.textAlign = "left";
            ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
            if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu + lettura subtank acquisite
               if (this.width < this.widthMax) {
                  this.width += 10;
               }
               if (this.height < this.heightMax) {
                  this.height += 15;
               }
               if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
                  this.isOpen = true;
                  for (var j = 0; j < 4; j++) { //legge l'indice dell'ultima subtank acquisita
                     if (subtank[j].acquired) {
                        this.lastSubtankAcquired = j;
                     }
                  }
               }
            }
            ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
            ctx.fillStyle = "#d2d2d2";
            ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b";
            ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
            if (this.isOpen) { //qui dentro devo mostrare il testo del menu e gestire cosa succede quando schiaccio i tasti
               ctx.fillStyle = "#d2d2d2";
               ctx.fillRect((canvasWidth / 2) + this.width / 2 - 250, (canvasHeight / 2) - this.height / 2, 15, this.height);
               ctx.fillRect((canvasWidth / 2) + this.width / 2 - 250, (canvasHeight / 2), 250, 15); //disegna i settori del menu
               for (i = 0; i < 9; i++) { //disegna le scritte del settore 0 (xbuster e poteri di X)
                  var xdisegnata = (canvasWidth / 2) - this.width / 2 + 13;
                  var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (44 * i) - 7;
                  if (i - 1 < 0) { //scrive xbuster
                     disegnaTestoConBordino("X Buster", xdisegnata, ydisegnata + 33, "#d2d2d2", "#000000");
                  } else {
                     if (levelDefeated[i - 1]) { //disegna i poteri e le loro barre
                        disegnaTestoConBordino(player.power[i - 1].nome, xdisegnata, ydisegnata + 21, player.power[i - 1].color1, "#000000");
                        for (j = 0; j < player.power[i - 1].usageMax; j++) {
                           ctx.fillStyle = '#444444';
                           ctx.fillRect(j * 10 + xdisegnata + 2, ydisegnata + 25, 9, 12);
                           if (player.power[i - 1].usage < j + 1) {
                              ctx.fillStyle = '#a7a7a7';
                           } else {
                              ctx.fillStyle = player.power[i - 1].color1;
                           }
                           ctx.fillRect(j * 10 + xdisegnata + 3, ydisegnata + 25, 8, 11);
                        }
                     }
                  }
               }
               for (i = 0; i < 5; i++) { //disegna le subtank
                  var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
                  var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (40 * i) - 6;
                  if (i < 1) { //scrive Subtanks
                     ctx.textAlign = "center";
                     disegnaTestoConBordino("Subtanks", xdisegnata + (250 - 15) / 2, ydisegnata + 30, "#d2d2d2", "#000000");
                  } else { //disegna le barre delle subtanks
                     ctx.textAlign = "left";
                     if (subtank[i - 1].acquired) {
                        disegnaTestoConBordino("S", xdisegnata + 15, ydisegnata + 28, "#ffc000", "#000000");
                        for (j = 0; j < subtank[i - 1].lifeMax; j++) {
                           ctx.fillStyle = '#444444';
                           ctx.fillRect(j * 9 + xdisegnata + 39, ydisegnata + 12, 8, 17);
                           if (subtank[i - 1].life < j + 1) {
                              ctx.fillStyle = '#a7a7a7';
                           } else {
                              ctx.fillStyle = '#ffc000';
                           }
                           ctx.fillRect(j * 9 + xdisegnata + 40, ydisegnata + 12, 7, 16);
                        }
                     }
                  }
               }
               for (i = 0; i < 3; i++) { //ora disegno la parte sotto le subtanks
                  ctx.textAlign = "left";
                  var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15 + 10;
                  var ydisegnata = ((canvasHeight / 2) + 15 + ((canvasHeight - this.height + 30) / 3 * (i + 1))) - 1;
                  switch (i) {
                     case 0:
                        disegnaTestoConBordino("resume game", xdisegnata + 5, ydisegnata + 7 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
                        break;

                     case 1:
                        disegnaTestoConBordino("options", xdisegnata + 5, ydisegnata + 7 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
                        break;

                     case 2:
                        disegnaTestoConBordino("return to the", xdisegnata + 5, ydisegnata - 2 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
                        disegnaTestoConBordino("level selection", xdisegnata + 5, ydisegnata + 15 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
                        break;
                  }
               }

               if (this.settore == 0) { //disegna i quadrati intorno alla scritta scelta - parte poteri
                  ctx.fillStyle = "#ffc000";
                  var xdisegnata = (canvasWidth / 2) - this.width / 2 + 13;
                  var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (44 * this.indice) - 7;
                  if (this.indice == 0) {
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 5, (canvasWidth / 2) + this.width / 2 - 325, 8);
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 40, (canvasWidth / 2) + this.width / 2 - 325, 8);
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 5, 8, 40);
                     ctx.fillRect((canvasWidth / 2) + this.width / 2 - 258, ydisegnata + 5, 8, 40);
                  } else {
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata - 5, (canvasWidth / 2) + this.width / 2 - 325, 8);
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 42, (canvasWidth / 2) + this.width / 2 - 325, 8);
                     ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata - 5, 8, 51);
                     ctx.fillRect((canvasWidth / 2) + this.width / 2 - 258, ydisegnata - 5, 8, 51);
                  }
               } else if (this.settore == 1) { //disegna i quadrati intorno alla scritta scelta - parte subtank e sotto subtank
                  if (this.indice < 4) { //disegna quadrati del settore subtank
                     ctx.fillStyle = "#ffc000";
                     var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
                     var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (40 * (this.indice + 1)) - 6;
                     ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
                     ctx.fillRect(xdisegnata, ydisegnata + 32, 235, 9);
                     ctx.fillRect(xdisegnata, ydisegnata, 9, 40);
                     ctx.fillRect(xdisegnata + 235 - 9, ydisegnata, 9, 40);
                  } else { //disegna quadrati della parte sotto le subtank
                     ctx.fillStyle = "#ffc000";
                     var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
                     var ydisegnata = ((canvasHeight / 2) + 15 + ((canvasHeight - this.height + 30) / 3 * (this.indice - 4))) - 1;
                     ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
                     ctx.fillRect(xdisegnata, ydisegnata + ((canvasHeight - this.height + 30) / 3 - 8), 235, 9);
                     ctx.fillRect(xdisegnata, ydisegnata, 9, ((canvasHeight - this.height + 30) / 3 - 8));
                     ctx.fillRect(xdisegnata + 235 - 9, ydisegnata, 9, ((canvasHeight - this.height + 30) / 3 - 8));
                  }
               }
               if (this.usingSubtank < 4) { //se il menu e' impostato nell'usare una subtank:
                  if (subtank[this.usingSubtank].life > 0) {
                     subtank[this.usingSubtank].life -= 0.5;
                     if (player.life < player.lifeMax) {
                        player.life += 0.5;
                        drawHUD();
                     }
                  } else { //esce dallo stato di depleting della subtank
                     this.usingSubtank = 4;
                     this.canInput = true;
                  }
               }
               if (this.canInput) { //cosa succede quando vengono schiacciati i tasti (solo se this e' in lettura di input - this.canInput)
                  if ((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) { //attiva la voce selezionata
                     if (this.settore == 0) { // se e' nella sezione poteri, attiva il potere selezionato e chiude il menu
                        player.activePower = this.indice;
                        if (player.activePower == 0) {
                           player.color1 = player.defaultColor1;
                           player.color2 = player.defaultColor2;
                        } else {
                           player.color1 = player.power[player.activePower - 1].color1;
                           player.color2 = player.power[player.activePower - 1].color2;
                        }
                        this.isClosing = true;
                        this.isOpen = false;
                     } else { //se e' nell'altro settore fa delle cose in base all'indice
                        if (this.indice < 4) { //hai scelto una subtank
                           if (player.life < player.lifeMax) {
                              this.usingSubtank = this.indice;
                              this.canInput = false;
                           }
                        } else {
                           switch (this.indice) {
                              case 4: //ritorna al gioco - chiude il menu
                                 this.isClosing = true;
                                 this.isOpen = false;
                                 break;
                              case 5: //opzioni
                                 objMenuOpzioni = new newMenuOpzioni(this.width, this.height, true);
                                 tastoGiaSchiacciato = true;
                                 gamestate = 3;
                                 break;
                              case 6: //torna alla selezione del livello
                                 this.tornaStageSelection = true;
                                 lvlNumber = 1;
                                 this.isClosing = true;
                                 this.isOpen = false;
                                 break;
                           }
                        }
                     }
                  }
                  if (keys[jumpkey] && !tastoGiaSchiacciato) { //esci dal menu di pausa
                     this.isClosing = true;
                     this.isOpen = false;
                  }
                  if (keys[giukey] && !tastoGiaSchiacciato) {
                     if (this.settore == 0) { //se sei nella parte a sinistra
                        for (i = 1; i < 10; i++) {
                           if (levelDefeated[this.indice + i - 1]) {
                              this.indice += i;
                              break;
                           } else if (i == 9) {
                              this.indice = 0;
                              break;
                           }
                        }
                        if (this.indice == 9) {
                           this.indice = 0;
                        }
                     } else if (this.settore == 1) { //se sei nella parte a destra
                        if (this.indice < this.lastSubtankAcquired) { //se sei nella parte delle subtank-1
                           for (var k = 1; k < (4 - this.indice); k++) {
                              if (subtank[this.indice + k].acquired) {
                                 this.indice += k;
                                 break;
                              }
                           }
                        } else if (this.indice == this.lastSubtankAcquired && this.lastSubtankAcquired != 4) { //se hai selezionato l'ultima subtank disponibile e schiacci giu'
                           this.indice = 4;
                        } else { //se sei nella parte sotto le subtank
                           if (this.indice < 6) {
                              this.indice++;
                           }
                        }
                     }
                  }
                  if (keys[sukey] && !tastoGiaSchiacciato) {
                     if (this.settore == 0) {
                        if (this.indice == 0) {
                           this.indice = 9;
                        }
                        for (i = 1; i < this.indice + 1; i++) {
                           if (levelDefeated[this.indice - i - 1]) {
                              this.indice -= i;
                              break;
                           } else if (i == this.indice) {
                              this.indice = 0;
                              break;
                           }
                        }
                     } else if (this.settore == 1) { //se sei nella parte a destra
                        if (this.indice < 4) { //se sei nella parte delle subtank
                           if (this.indice > 0) {
                              for (var k = 1; k < this.indice + 1; k++) {
                                 if (subtank[this.indice - k].acquired) {
                                    this.indice -= k;
                                    break;
                                 }
                              }
                           }
                        } else {
                           if (this.indice > 4) { //se sei nel menu tutto ok
                              this.indice--;
                           } else { //schiacci su e ti stai spostando nelle subtank - devo vedere che io ne possegga almeno una
                              this.indice = this.lastSubtankAcquired;
                           }
                        }
                     }
                  }
                  if (keys[destrakey] && !tastoGiaSchiacciato) {
                     for (var j = 0; j < 4; j++) {
                        if (subtank[j].acquired) {
                           this.indice = j;
                           break;
                        } else {
                           this.indice = 4;
                        }
                     }
                     this.settore = 1;
                  }
                  if (keys[sinistrakey] && !tastoGiaSchiacciato) {
                     this.indice = 0;
                     this.settore = 0;
                  }
                  if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                     tastoGiaSchiacciato = true;
                  } else {
                     tastoGiaSchiacciato = false;
                  }
               }
            }
            if (this.isClosing) { //animazione di chiusura del menu + regolazione delle subtanks
               if (this.width > 0) {
                  this.width -= 20;
               }
               if (this.height > 0) {
                  this.height -= 20;
               }
               ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
               disegnaSchermoDiGioco(false);
               ctx.fillStyle = "#d2d2d2";
               ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
               ctx.fillStyle = "#52b58b";
               ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
               if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
                  gamestate = -1;
                  if (this.tornaStageSelection) {
                     gamestate = 1;
                  }
                  var sommaSubtank = 0; //aggiusto la vita delle subtank (la metto tutta nelle prime subtank disponibili)
                  for (var j = 0; j < 4; j++) { //azzero tutte le subtank e carico tutta la vita per ridistribuirla nel prossimo for
                     if (subtank[j].acquired) {
                        sommaSubtank += subtank[j].life;
                        subtank[j].life = 0;
                     }
                  }
                  if (sommaSubtank > 0) { //ridistribuisco la vita alle subtank dalla prima all'ultima
                     for (var j = 0; j < 4; j++) {
                        if (subtank[j].life < subtank[j].lifeMax && subtank[j].acquired) {
                           if (sommaSubtank > (subtank[j].lifeMax - subtank[j].life)) {
                              sommaSubtank -= (subtank[j].lifeMax - subtank[j].life);
                              subtank[j].life = subtank[j].lifeMax;
                           } else {
                              subtank[j].life += sommaSubtank;
                              sommaSubtank = 0;
                           }
                        }
                     }
                  }
               }
            }
         }
      } //fine menu di pausa       

      function newMenuOpzioniStageSelect() {
         this.isOpen = false;
         this.isClosing = false;
         this.apriLivello = false;
         this.confermaUscita = false;
         this.loadCostumLevel = false;
         this.costumLevelString = "";
         this.width = 0;
         this.height = 0;
         this.widthMax = canvasWidth - 440;
         this.heightMax = canvasHeight - 400;
         this.indice = 0;
         this.indiceUscita = 0;
         this.numeroDiVoci = 4;
         this.staCambiandoTasto = false;
         this.drawMenu = async function () {
            if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
               if (this.width < this.widthMax) {
                  this.width += 10;
               }
               if (this.height < this.heightMax) {
                  this.height += 15;
               }
               if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
                  this.isOpen = true;
               }
            }
            ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
            ctx.fillStyle = "#d2d2d2";
            ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b";
            ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

            if (this.isOpen) { //quando il menu e' tutto aperto
               if (!this.confermaUscita && !this.loadCostumLevel) { //se non e' attivo il conferma uscita e non e' un costum level - caso del menu normale
                  ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
                  for (var i = 0; i < this.numeroDiVoci; i++) { //disegno tutte le scritte
                     var ydisegnata = 6 + ((canvasHeight / 2) - (this.height / 2)) + (((this.height) / this.numeroDiVoci) * i) + (this.height / (this.numeroDiVoci * 2));
                     ctx.textAlign = "center";
                     switch (i) { //scrive le scritte
                        case 0:
                           disegnaTestoConBordino("open the level selected", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                           break;
                        case 1:
                           disegnaTestoConBordino("open a costum level", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                           break;
                        case 2:
                           disegnaTestoConBordino("save game", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                           break;
                        case 3:
                           disegnaTestoConBordino("back to the main menu", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                           break;
                     }
                     ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
                  } { //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                     ctx.fillStyle = "#ffc000";
                     var xdisegnata = (canvasWidth / 2) - (this.width / 2);
                     var ydisegnata = (((canvasHeight / 2) - (this.height / 2)) + (((this.height) / this.numeroDiVoci) * this.indice));
                     ctx.fillRect(xdisegnata, ydisegnata, this.width, 9);
                     ctx.fillRect(xdisegnata, ydisegnata - 9 + (this.height) / this.numeroDiVoci, this.width, 9);
                     ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height) / this.numeroDiVoci - 8);
                     ctx.fillRect(xdisegnata + this.width - 9, ydisegnata, 9, (this.height) / this.numeroDiVoci - 8);
                  }
                  //ora gestisco gli input
                  if (keys[sukey] && !tastoGiaSchiacciato) {
                     if (this.indice > 0) {
                        this.indice--;
                     } else {
                        this.indice = this.numeroDiVoci - 1;
                     }
                  }
                  if (keys[giukey] && !tastoGiaSchiacciato) {
                     if (this.indice < this.numeroDiVoci - 1) {
                        this.indice++;
                     } else {
                        this.indice = 0;
                     }
                  }
                  if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                     switch (this.indice) {
                        case 0: //apri livello selezionato
                           this.apriLivello = true;
                           this.isClosing = true;
                           this.isOpen = false;
                           break;
                        case 1: //carica livello costum
                           document.getElementById("fileCaricaPartita").value = "";
                           document.getElementById("caricaPartitaDiv").style.zIndex = "10";
                           document.getElementById("fileCaricaPartita").disabled = false;
                           this.indiceUscita = 0;
                           this.loadCostumLevel = true;
                           break;
                        case 2: //salva la partita
                           SalvaPartita();
                           break;
                        case 3: //chiedi conferma uscita
                           this.indiceUscita = 0;
                           this.confermaUscita = true;
                           break;
                     }
                  }
                  if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
                     this.isOpen = false;
                     this.isClosing = true;
                  }
                  if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                     tastoGiaSchiacciato = true;
                  } else {
                     tastoGiaSchiacciato = false;
                  }
               } else if (this.confermaUscita) { //se e' attivo il conferma uscita
                  ctx.textAlign = "center";
                  ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
                  disegnaTestoConBordino("do you want to go back", (canvasWidth / 2), ((canvasHeight / 2) + 15 - this.heightMax / 2), "#d2d2d2", "#000000");
                  disegnaTestoConBordino("to the main menu?", (canvasWidth / 2), ((canvasHeight / 2) + 35 - this.heightMax / 2), "#d2d2d2", "#000000");
                  disegnaTestoConBordino("every progress not", (canvasWidth / 2), ((canvasHeight / 2) + 55 - this.heightMax / 2), "#d2d2d2", "#000000");
                  disegnaTestoConBordino("saved will be lost", (canvasWidth / 2), ((canvasHeight / 2) + 75 - this.heightMax / 2), "#d2d2d2", "#000000");
                  ctx.font = "small-caps bold 28px Lucida Console"; //tipo di font per le scritte
                  for (var j = 0; j < 2; j++) { //disegno tutte le scritte
                     ctx.textAlign = "center";
                     var ydisegnata = 57 + canvasHeight / 2;
                     switch (j) { //scrive le scritte
                        case 0:
                           var xdisegnata = (canvasWidth / 2) - ((this.width / 4));
                           disegnaTestoConBordino("no", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
                           break;
                        case 1:
                           var xdisegnata = (canvasWidth / 2) + ((this.width / 4));
                           disegnaTestoConBordino("yes", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
                           break;
                     }
                     ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
                  } { //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                     ctx.fillStyle = "#ffc000";
                     var ydisegnata = 25 + canvasHeight / 2;
                     switch (this.indiceUscita) {
                        case 0:
                           xdisegnata = (canvasWidth / 2) - (this.width / 2);
                           break;
                        case 1:
                           xdisegnata = (canvasWidth / 2);
                           break;
                     }
                     ctx.fillRect(xdisegnata, ydisegnata, this.width / 2, 9);
                     ctx.fillRect(xdisegnata, ydisegnata - 9 + (this.height) / 3, this.width / 2, 9);
                     ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height) / 3 - 8);
                     ctx.fillRect(xdisegnata + (this.width / 2) - 9, ydisegnata, 9, (this.height) / 3 - 8);
                  }
                  //ora gestisco gli input
                  if (keys[destrakey] && !tastoGiaSchiacciato) {
                     this.indiceUscita = 1;
                  }
                  if (keys[sinistrakey] && !tastoGiaSchiacciato) {
                     this.indiceUscita = 0;
                  }
                  if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                     switch (this.indiceUscita) {
                        case 0: //no
                           this.confermaUscita = false;
                           break;
                        case 1: //si
                           objMenuPrincipale = new newMenuPrincipale();
                           gamestate = 0;
                           break;
                     }
                  }
                  if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
                     this.confermaUscita = false;
                  }
                  if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                     tastoGiaSchiacciato = true;
                  } else {
                     tastoGiaSchiacciato = false;
                  }
               } else if (this.loadCostumLevel) { //se e' attivo il conferma uscita
                  ctx.textAlign = "center";
                  ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
                  disegnaTestoConBordino("load costum level", (canvasWidth / 2), ((canvasHeight / 2) + 25 - this.heightMax / 2), "#d2d2d2", "#000000");
                  for (var j = 0; j < 2; j++) { //disegno tutte le scritte
                     ctx.textAlign = "center";
                     var ydisegnata = 57 + canvasHeight / 2;
                     switch (j) { //scrive le scritte
                        case 0:
                           var xdisegnata = (canvasWidth / 2) - ((this.width / 4));
                           disegnaTestoConBordino("confirm", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
                           break;
                        case 1:
                           var xdisegnata = (canvasWidth / 2) + ((this.width / 4));
                           disegnaTestoConBordino("cancel", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
                           break;
                     }
                     ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
                  } { //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                     ctx.fillStyle = "#ffc000";
                     var ydisegnata = 25 + canvasHeight / 2;
                     switch (this.indiceUscita) {
                        case 0:
                           xdisegnata = (canvasWidth / 2) - (this.width / 2);
                           break;
                        case 1:
                           xdisegnata = (canvasWidth / 2);
                           break;
                     }
                     ctx.fillRect(xdisegnata, ydisegnata, this.width / 2, 9);
                     ctx.fillRect(xdisegnata, ydisegnata - 9 + (this.height) / 3, this.width / 2, 9);
                     ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height) / 3 - 8);
                     ctx.fillRect(xdisegnata + (this.width / 2) - 9, ydisegnata, 9, (this.height) / 3 - 8);
                  }
                  //ora gestisco gli input
                  if (keys[destrakey] && !tastoGiaSchiacciato) {
                     this.indiceUscita = 1;
                  }
                  if (keys[sinistrakey] && !tastoGiaSchiacciato) {
                     this.indiceUscita = 0;
                  }
                  if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                     switch (this.indiceUscita) {
                        case 0: //conferma carica livello costum
                           this.costumLevelString = await controllaFile();
                           if (this.costumLevelString != "") {
                              chiudiInputFile();
                              this.apriLivello = true;
                              this.isClosing = true;
                              this.isOpen = false;
                           }
                           break;
                        case 1: //cancella
                           chiudiInputFile();
                           this.loadCostumLevel = false;
                           break;
                     }
                  }
                  if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
                     chiudiInputFile();
                     this.loadCostumLevel = false;
                  }

                  function chiudiInputFile() {
                     document.getElementById("fileCaricaPartita").value = "";
                     document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                     document.getElementById("fileCaricaPartita").disabled = true;
                     document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas                
                  }
                  if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                     tastoGiaSchiacciato = true;
                  } else {
                     tastoGiaSchiacciato = false;
                  }
               }
               async function controllaFile() { //controlla che il file sia caricato correttamente
                  var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
                  var stringaCaricaPartita = "";
                  if (uploadedFile.size > (5 * 1024 * 1024)) { //controlla la dimensione del file - non deve essere superiore a 1MB
                     objAlert = new newAlert("The file size limit is 5MB. Upload a smaller file.", gamestate);
                     gamestate = 5;
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
               } //fine di controllaFile()            				          	
            } //fine di if(is.Open)          
            if (this.isClosing) { //animazione di chiusura del menu
               stageSelect(); //disegna stageSelect() - serve per pulire lo schermo disegnando quello che sara' lo sfondo sotto il menu
               if (this.width > 0) {
                  this.width -= 20;
               }
               if (this.height > 0) {
                  this.height -= 20;
               }
               ctx.fillStyle = "#d2d2d2";
               ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
               ctx.fillStyle = "#52b58b";
               ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
               if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
                  if (this.apriLivello) {
                     gamestate = -1;
                     if (this.costumLevelString == "") {
                        nuovoLivello();
                     } else {
                        player = nuovoPlayer(currentPlayer);
                        stringToLevel(this.costumLevelString);
                        player.x = level.xStartingPos;
                        player.y = level.yStartingPos;
                     }
                  } else {
                     gamestate = 1;
                  }
               }
            } //fine di if(is.Closing)
         }
      }

      function newAlert(stringaDiTesto, gameStatePrecedente) {
         this.isOpen = false;
         this.text = stringaDiTesto;
         this.width = 0;
         this.height = 0;
         this.prevGameState = gameStatePrecedente;
         ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
         this.widthMax = ctx.measureText(stringaDiTesto + "aa").width;
         this.heightMax = ctx.measureText("O").width * 2;
         this.drawMenu = function () {
            if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
               if (this.width < this.widthMax) {
                  this.width += (this.widthMax / 20);
               } //always 20 frames to open, no matter how long the text is
               if (this.height < this.heightMax) {
                  this.height += 15;
               }
               if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
                  this.isOpen = true;
               }
            }
            ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
            ctx.fillStyle = "#d2d2d2";
            ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b";
            ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde  
            if (this.isOpen) { //quando il menu e' tutto aperto
               ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
               var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
               ctx.textAlign = "center";
               disegnaTestoConBordino(this.text, canvasWidth / 2, canvasHeight / 2 + textHeight / 2, "#d2d2d2", "#000000");
               ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
               //ora gestisco gli input
               if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                  if (!tastoGiaSchiacciato) {
                     tastoGiaSchiacciato = true;
                     gamestate = this.prevGameState;
                  }
               } else {
                  tastoGiaSchiacciato = false;
               }
            } //fine di if(is.Open)           
         }
      }

      function newMenuOpzioni(widthPassata, heightPassata, apertoDalMenuDiPausa) {
         this.isOpen = false;
         this.isClosing = false;
         this.width = widthPassata;
         this.height = heightPassata;
         this.widthMax = canvasWidth - 150;
         this.heightMax = canvasHeight - 150;
         this.indice = 0;
         this.contatoreAnimazione = 0;
         this.staCambiandoTasto = false;
         this.drawMenuOpzioni = function () {
            if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
               if (this.width < this.widthMax) {
                  this.width += 10;
               }
               if (this.height < this.heightMax) {
                  this.height += 15;
               }
               if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
                  this.isOpen = true;
               }
            }
            ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
            ctx.fillStyle = "#d2d2d2";
            ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b";
            ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

            if (this.isOpen) { //quando il menu e' tutto aperto
               ctx.font = "small-caps bold 23px Lucida Console";
               ctx.textAlign = "center";
               disegnaTestoConBordino("OPTIONS", canvasWidth / 2, 110, "#d2d2d2", "#000000"); //scrive la scritta OPTIONS al centro in alto
               ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
               for (i = 0; i < 10; i++) { //disegno tutte le scritte
                  var xdisegnata = 75;
                  var ydisegnata = (128 + (this.heightMax + 75 - 17 - 128) / 10 * (i));
                  switch (i) { //scrive le varie impostazioni dei tasti
                     case 0:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("move up :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(sukey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 1:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("move down :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(giukey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 2:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("move left :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(sinistrakey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 3:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("move right :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(destrakey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 4:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("confirm & dash :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(dashkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 5:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("cancel & jump :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(jumpkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 6:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("shoot :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(sparokey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 7:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("previous power :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(lkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 8:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("next power :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(rkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;
                     case 9:
                        ctx.textAlign = "right";
                        disegnaTestoConBordino("menu & start :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        ctx.textAlign = "left";
                        disegnaTestoConBordino("   " + tasto(startkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / 10) / 2, "#d2d2d2", "#000000");
                        break;

                        function tasto(key) {
                           if (key == " ") {
                              return "space bar"
                           }
                           return key
                        }
                  }
               }

               { //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
                  ctx.fillStyle = "#ffc000";
                  var xdisegnata = 75;
                  var ydisegnata = (128 + (this.heightMax + 75 - 17 - 128) / 10 * (this.indice));
                  ctx.fillRect(xdisegnata, ydisegnata - 2, this.width, 9);
                  ctx.fillRect(xdisegnata, ydisegnata + ((this.heightMax + 75 - 17 - 128) / 10) - 5, this.width, 9);
                  ctx.fillRect(xdisegnata, ydisegnata, 9, ((this.heightMax + 75 - 17 - 128) / 10) - 5);
                  ctx.fillRect(xdisegnata + this.width - 9, ydisegnata, 9, ((this.heightMax + 75 - 17 - 128) / 10) - 5);
               }

               if (this.staCambiandoTasto) { //da qui in giu determino cosa succede in base a che tasto viene schiacciato. le due grosse distinzioni sono se staCambiandoTasto oppure se siamo nel menu e basta 
                  if (this.contatoreAnimazione < 40) { //fa l'animazione del testo che appare e disappare
                     ctx.fillStyle = "#52b58b";
                     ctx.fillRect(canvasWidth / 2, (128 + (this.heightMax + 75 - 17 - 128) / 10 * (this.indice)) + 7, this.width / 2 - 9, ((this.heightMax + 75 - 17 - 128) / 10) - 12);
                     this.contatoreAnimazione++;
                  } else {
                     this.contatoreAnimazione++;
                     if (this.contatoreAnimazione > 79) {
                        this.contatoreAnimazione = 0;
                     }
                  }
                  if (ultimoTastoLetto != "") { //se viene schiacciato un tasto qualsiasi
                     switch (this.indice) {
                        case 0:
                           sukey = ultimoTastoLetto;
                           break;
                        case 1:
                           giukey = ultimoTastoLetto;
                           break;
                        case 2:
                           sinistrakey = ultimoTastoLetto;
                           break;
                        case 3:
                           destrakey = ultimoTastoLetto;
                           break;
                        case 4:
                           dashkey = ultimoTastoLetto;
                           break;
                        case 5:
                           jumpkey = ultimoTastoLetto;
                           break;
                        case 6:
                           sparokey = ultimoTastoLetto;
                           break;
                        case 7:
                           lkey = ultimoTastoLetto;
                           break;
                        case 8:
                           rkey = ultimoTastoLetto;
                           break;
                        case 9:
                           startkey = ultimoTastoLetto;
                           break;
                     }
                     this.staCambiandoTasto = false;
                  }
               } else {
                  if (keys[sukey] && !tastoGiaSchiacciato) {
                     if (this.indice > 0) {
                        this.indice--;
                     } else {
                        this.indice = 9;
                     }
                  }
                  if (keys[giukey] && !tastoGiaSchiacciato) {
                     if (this.indice < 9) {
                        this.indice++;
                     } else {
                        this.indice = 0;
                     }
                  }
                  if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
                     ultimoTastoLetto = "";
                     this.staCambiandoTasto = true;
                  }
                  if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
                     this.isOpen = false;
                     this.isClosing = true;
                  }
                  if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                     tastoGiaSchiacciato = true;
                  } else {
                     tastoGiaSchiacciato = false;
                  }
               }
            } //fine di if(is.Open)

            if (this.isClosing) { //animazione di chiusura del menu
               if (this.width > widthPassata) {
                  this.width -= 20;
               }
               if (this.height > heightPassata) {
                  this.height -= 20;
               }
               ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
               if (!apertoDalMenuDiPausa) {
                  objMenuPrincipale.drawMenuPrincipale(false);
               }
               ctx.fillStyle = "#d2d2d2";
               ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
               ctx.fillStyle = "#52b58b";
               ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
               if (this.height - 1 < heightPassata && this.width - 1 < widthPassata) { //quando il menu e' tutto chiuso:
                  if (apertoDalMenuDiPausa) {
                     gamestate = 2;
                  } else { //se viene aperto dal menu principale - devo ancora crearlo pero' lol
                     gamestate = 0;
                  }
               }
            } //fine di if(is.Closing)
         }
      }

      function newMenuCaricaPartita() {
         this.isOpen = false;
         this.isClosing = false;
         this.indexAlterato = false;
         this.fileLetto = false;
         this.width = 0;
         this.height = 0;
         this.widthMax = canvasWidth - 450;
         this.heightMax = canvasHeight - 425;
         this.indice = 0;
         this.daPulire = false;
         this.numeroDiVoci = 1;
         this.drawMenu = async function () { //asincrono perche' se viene caricata la partita bisogna aspettare che legga il file
            if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
               if (this.width < this.widthMax) {
                  this.width += 10;
               }
               if (this.height < this.heightMax) {
                  this.height += 15;
               }
               if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
                  this.isOpen = true;
               }
            }
            if (this.daPulire) {
               objMenuPrincipale.drawMenuPrincipale(false);
               document.getElementById("caricaPartitaDiv").style.zIndex = "10";
               this.daPulire = false;
            }
            ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
            ctx.fillStyle = "#d2d2d2";
            ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
            ctx.fillStyle = "#52b58b";
            ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

            if (this.isOpen) { //quando il menu e' tutto aperto
               if (!this.indexAlterato) {
                  document.getElementById("caricaPartitaDiv").style.zIndex = "10";
                  document.getElementById("fileCaricaPartita").disabled = false;
                  this.indexAlterato = true;
               }
               ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
               { //disegno la scritta - {} per diminuire lo scope di ydisegnata
                  var ydisegnata = ((canvasHeight / 2) - (this.height / 2)) + 30;
                  ctx.textAlign = "center";
                  disegnaTestoConBordino("upload save file", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                  ctx.font = "small-caps bold 20px Lucida Console";
                  ydisegnata = ((canvasHeight / 2) + (this.height / 2)) - 30;
                  disegnaTestoConBordino((dashkey + " to confirm"), canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
                  if (jumpkey == " ") {
                     disegnaTestoConBordino((jumpkey + "spacebar to cancel"), canvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
                  } else {
                     disegnaTestoConBordino((jumpkey + " to cancel"), canvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
                  }
                  ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
               }
               //ora gestisco gli input
               if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) { //conferma il caricamento del file
                  this.daPulire = true;
                  document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                  this.fileLetto = await controllaFile();
                  if (this.fileLetto) {
                     this.isOpen = false;
                     this.daPulire = false;
                     this.isClosing = true;
                  }
               }
               if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
                  this.isOpen = false;
                  this.isClosing = true;
               }
               if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                  tastoGiaSchiacciato = true;
               } else {
                  tastoGiaSchiacciato = false;
               }
            } //fine di if(is.Open)

            if (this.isClosing) { //animazione di chiusura del menu
               if (this.indexAlterato) { //disattiva il tasto "sfoglia file" e riporta il focus sul canvas
                  document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
                  document.getElementById("fileCaricaPartita").disabled = true; //questo comando disattiva il focus sul canvas, devo riattivare il focus se no non legge piu i tasti
                  document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
                  this.indexAlterato = false;
               }
               objMenuPrincipale.drawMenuPrincipale(false); //pulisce lo schermo disegnando lo sfondo (menu principale)
               if (this.width > 0) {
                  this.width -= 20;
               }
               if (this.height > 0) {
                  this.height -= 20;
               }
               ctx.fillStyle = "#d2d2d2";
               ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
               ctx.fillStyle = "#52b58b";
               ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
               if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
                  nelMenuCaricaPartita = false;
                  if (this.fileLetto) {
                     gamestate = 1;
                  } else {
                     gamestate = 0;
                     objMenuPrincipale.drawMenuPrincipale(false);
                  }
               }
            } //fine di if(is.Closing)

            async function controllaFile() { //controlla che il file sia caricato correttamente
               var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
               var stringaCaricaPartita = "";
               if (uploadedFile.size > (512)) { //controlla la dimensione del file - non deve essere superiore a 512 Byte
                  objAlert = new newAlert("The file size limit is 512Byte (half a kB). Upload a smaller file.", gamestate);
                  gamestate = 5;
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
                  var numeroElemento = 0;
                  var stringaElemento = "";
                  for (i = 0; i < stringaCaricaPartita.length; i++) {
                     if (stringaCaricaPartita[i] == "|") {
                        caricaElemento();
                        numeroElemento++;
                        stringaElemento = "";
                     } else {
                        stringaElemento += stringaCaricaPartita[i];
                     }
                  }
                  if ((numeroElemento == 20) && (stringaElemento != "")) { //carica l'ultimo elemento se esiste (che se no verrebbe skippato, facendo poi ritornare false)
                     caricaElemento();
                     numeroElemento++;
                  }
                  if (numeroElemento == 21) { //se ha caricato il numero corretto di elementi
                     return true;
                  } else {
                     objAlert = new newAlert("The file is not using the correct format", gamestate);
                     gamestate = 5;
                     return false;
                  }

                  function caricaElemento() {
                     switch (numeroElemento) {
                        case 0: //jumpkey
                           jumpkey = stringaElemento;
                           break;
                        case 1: //destrakey
                           destrakey = stringaElemento;
                           break;
                        case 2: //sinistrakey
                           sinistrakey = stringaElemento;
                           break;
                        case 3: //sukey
                           sukey = stringaElemento;
                           break;
                        case 4: //giukey
                           giukey = stringaElemento;
                           break;
                        case 5: //dashkey
                           dashkey = stringaElemento;
                           break;
                        case 6: //sparokey
                           sparokey = stringaElemento;
                           break;
                        case 7: //startkey
                           startkey = stringaElemento;
                           break;
                        case 8: //lkey
                           lkey = stringaElemento;
                           break;
                        case 9: //rkey
                           rkey = stringaElemento;
                           break;
                        case 10: //levelDefeated
                           var nuovoElementino = "";
                           for (k = 0; k < 8; k++) {
                              for (j = 0; j < stringaElemento.length; j++) {
                                 if (stringaElemento[j] != ",") {
                                    nuovoElementino += stringaElemento[j];
                                    if (nuovoElementino == "true") {
                                       levelDefeated[k] = true;
                                       nuovoElementino = "";
                                       k++;
                                    } else if (nuovoElementino == "false") {
                                       levelDefeated[k] = false;
                                       nuovoElementino = "";
                                       k++;
                                    }
                                 } else {
                                    nuovoElementino = "";
                                 }
                              }
                           }
                           break;
                        case 11: //heartAcquired
                           var nuovoElementino = "";
                           for (k = 0; k < 8; k++) {
                              for (j = 0; j < stringaElemento.length; j++) {
                                 if (stringaElemento[j] != ",") {
                                    nuovoElementino += stringaElemento[j];
                                    if (nuovoElementino == "true") {
                                       heartAcquired[k] = true;
                                       nuovoElementino = "";
                                       k++;
                                    } else if (nuovoElementino == "false") {
                                       heartAcquired[k] = false;
                                       nuovoElementino = "";
                                       k++;
                                    }
                                 } else {
                                    nuovoElementino = "";
                                 }
                              }
                           }
                           break;
                        case 12: //subtank
                           subtank[0].life = parseInt(stringaElemento, 10);
                           break;
                        case 13:
                           if (stringaElemento == "true") {
                              subtank[0].acquired = true;
                           } else {
                              subtank[0].acquired = false;
                              subtank[0].life = 0;
                           }
                           break;
                        case 14:
                           subtank[1].life = parseInt(stringaElemento, 10);
                           break;
                        case 15:
                           if (stringaElemento == "true") {
                              subtank[1].acquired = true;
                           } else {
                              subtank[1].acquired = false;
                              subtank[1].life = 0;
                           }
                           break;
                        case 16:
                           subtank[2].life = parseInt(stringaElemento, 10);
                           break;
                        case 17:
                           if (stringaElemento == "true") {
                              subtank[2].acquired = true;
                           } else {
                              subtank[2].acquired = false;
                              subtank[2].life = 0;
                           }
                           break;
                        case 18:
                           subtank[3].life = parseInt(stringaElemento, 10);
                           break;
                        case 19:
                           if (stringaElemento == "true") {
                              subtank[3].acquired = true;
                           } else {
                              subtank[3].acquired = false;
                              subtank[3].life = 0;
                           }
                           break;
                        case 20: //armaturaAcquired
                           var nuovoElementino = "";
                           for (k = 0; k < 4; k++) {
                              for (j = 0; j < stringaElemento.length; j++) {
                                 if (stringaElemento[j] != ",") {
                                    nuovoElementino += stringaElemento[j];
                                    if (nuovoElementino == "true") {
                                       armaturaAcquired[k] = true;
                                       nuovoElementino = "";
                                       k++;
                                    } else if (nuovoElementino == "false") {
                                       armaturaAcquired[k] = false;
                                       nuovoElementino = "";
                                       k++;
                                    }
                                 } else {
                                    nuovoElementino = "";
                                 }
                              }
                           }
                           break;
                     }
                  }
               } //fine di caricaPartita()                           
            } //fine di controllaFile()                
         } //fine di drawMenu()               
      } //fine di menuCaricaPartita

      function newMenuPrincipale() {
         this.width = canvasWidth;
         this.height = canvasHeight;
         this.indice = 0;
         this.isClosing = false;
         this.closingIndex = 0;
         this.isGoingToStageSelection = false;
         this.drawMenuPrincipale = function (canInput) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); //pulisce tutto
            ctx.fillStyle = "#020219";
            ctx.fillRect(0, 0, canvasWidth + 1, canvasHeight + 1); //sfondo nero
            ctx.textAlign = "right";
            ctx.font = "small-caps bold 15px Lucida Console";
            disegnaTestoConBordino("by lordf", canvasWidth - 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
            ctx.textAlign = "left";
            disegnaTestoConBordino(versioneDiGioco, 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
            ctx.font = "small-caps bold oblique 250px Lucida Console";
            disegnaTestoConBordino("X", 73 + canvasWidth / 2, 243, "#ff9200", "#ffd600");
            ctx.font = "small-caps bold oblique 125px Lucida Console";
            disegnaTestoConBordino("simple", 17 + canvasWidth / 20, 200, "#0001cb", "#02b0ef");
            ctx.font = "small-caps bold oblique 75px Lucida Console";
            disegnaTestoConBordino("js", 234 + canvasWidth / 2, 245, "#0001cb", "#02b0ef");
            ctx.font = "small-caps bold 30px Lucida Console";
            ctx.textAlign = "center";
            if (this.indice == 0) {
               disegnaTestoConBordino("new game", canvasWidth / 2, 350, "#ff9200", "#f9c065");
            } else {
               disegnaTestoConBordino("new game", canvasWidth / 2, 350, "#0001cb", "#02b0ef");
            }
            if (this.indice == 1) {
               disegnaTestoConBordino("load game", canvasWidth / 2, 400, "#ff9200", "#f9c065");
            } else {
               disegnaTestoConBordino("load game", canvasWidth / 2, 400, "#0001cb", "#02b0ef");
            }
            if (this.indice == 2) {
               disegnaTestoConBordino("options", canvasWidth / 2, 450, "#ff9200", "#f9c065");
            } else {
               disegnaTestoConBordino("options", canvasWidth / 2, 450, "#0001cb", "#02b0ef");
            }
            if (canInput && !this.isClosing) { //input dei tasti
               if (keys[sukey] && !tastoGiaSchiacciato) {
                  if (this.indice > 0) {
                     this.indice--;
                  } else {
                     this.indice = 2;
                  }
               }
               if (keys[giukey] && !tastoGiaSchiacciato) {
                  if (this.indice < 2) {
                     this.indice++;
                  } else {
                     this.indice = 0;
                  }
               }
               if ((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) {
                  switch (this.indice) {
                     case 0: //nuovo gioco 
                        this.isClosing = true;
                        this.isGoingToStageSelection = true;
                        //azzero tutto
                        levelDefeated = [false, false, false, false, false, false, false, false];
                        heartAcquired = [false, false, false, false, false, false, false, false];
                        armaturaAcquired = [false, false, false, false];
                        subtank = [{
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
                        break;
                     case 1: //carica partita
                        objMenuCaricaPartita = new newMenuCaricaPartita();
                        gamestate = 6;
                        break;
                     case 2: //opzioni 
                        objMenuOpzioni = new newMenuOpzioni(0, 0, false);
                        tastoGiaSchiacciato = true;
                        gamestate = 3;
                        break;
                  }
               }
               if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
                  tastoGiaSchiacciato = true;
               } else {
                  tastoGiaSchiacciato = false;
               }
            }
            if (this.isClosing) { //animazione di chiusura del menu
               ctx.fillStyle = "#000000";
               this.closingIndex += 13;
               ctx.fillRect(0, 0, canvasWidth, this.closingIndex);
               ctx.fillRect(0, canvasHeight - this.closingIndex, canvasWidth, this.closingIndex);
               ctx.fillRect(0, 0, this.closingIndex, canvasHeight);
               ctx.fillRect(canvasWidth - this.closingIndex, 0, canvasWidth - this.closingIndex, canvasHeight);
               if (this.closingIndex > ((canvasWidth / 2) - 1)) { //quando e' tutto chiuso
                  ctx.textAlign = "left"; // se no si bugga della roba
                  if (this.isGoingToStageSelection) {
                     gamestate = 1;
                  } else {
                     //boh...
                  }
               }
            }
         }
      }

      function SalvaPartita() {
         stringaSalvataggio = jumpkey + "|" + destrakey + "|" + sinistrakey + "|" + sukey + "|" + giukey + "|" + dashkey + "|" + sparokey + "|" + startkey + "|" + lkey + "|" + rkey + "|" + levelDefeated + "|" + heartAcquired;
         for (i = 0; i < 4; i++) {
            stringaSalvataggio += "|" + subtank[i].life + "|" + subtank[i].acquired;
         }
         stringaSalvataggio += "|" + armaturaAcquired; { //creo il file simpleXjs.dataDiOggi.savegame da scaricare
            const dataDiOggi = creaData(); //prende la data di oggi
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaSalvataggio));
            element.setAttribute('download', "simpleXjs." + dataDiOggi + ".savegame");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            document.getElementById('canvasDivId').focus();
            return;

            function creaData() {
               var temp = new Date();
               var dateStr = padStr(temp.getFullYear()) + "." +
                  padStr(1 + temp.getMonth()) + "." +
                  padStr(temp.getDate()) + "-" +
                  padStr(temp.getHours()) + "." +
                  padStr(temp.getMinutes());
               return dateStr;

               function padStr(i) { //sistema tipo 01 e 11 per avere tutto su due cifre
                  return (i < 10) ? "0" + i : "" + i;
               }
            }
         }
      }
