var oigeVastus;
var vastused = new Array();
var arv = 1;
var kontrollitudKokku = 0;
var oigestiKokku = 0;
var heliFailid = new Array();
var mataYtleja;

window.onload = function() {
	loosiYlesanded();
}

function loosiYlesanded() {
	for(var i=1; i < arv + 1; i ++){
	
	var uusYlesanne = document.createElement('p');
	uusYlesanne.id = 'ylesanne' + i;
	document.getElementById('ylesanded').appendChild(uusYlesanne);
	var vastuseKoht = '<input type="text" id="vastus' + i + '">';
	var tulemuseKoht = '<span id="tulemus' + i + '"></span>';
	
	var ylesandeTyyp = Math.round(3 * Math.random());
	if(ylesandeTyyp == 0){
		var arvX = Math.round(100 * Math.random());
		var arvY = Math.round((100 - arvX) * Math.random());
		oigeVastus = arvX + arvY;	
		var kysimus = arvX + ' + ' + arvY; 
	}
	if(ylesandeTyyp == 1){
		var arvX = Math.round(100 * Math.random());
		var arvY = Math.round(arvX * Math.random());
		oigeVastus = arvX - arvY;
		var kysimus = arvX + ' - ' + arvY; 
	}
	if(ylesandeTyyp == 2){
		var arvX = Math.round(10 * Math.random());
		var arvY = Math.round(10 * Math.random());
		oigeVastus = arvX * arvY;
		var kysimus = arvX + ' * ' + arvY; 
	}
	if(ylesandeTyyp == 3){
		var arvX = Math.round(10 * Math.random());
		var arvY = 1 + Math.round(9 * Math.random());
		oigeVastus = arvX;
		arvX = arvX * arvY;
		var kysimus = arvX + ' : ' + arvY; 
	}
	vastused[i - 1] = oigeVastus;
	uusYlesanne.innerHTML = kysimus + ' = ' + vastuseKoht + tulemuseKoht;
	heliFailid.push('arvuta');
	numberSonadeks(arvX);
	if(ylesandeTyyp == 0){heliFailid.push('pluss');}
	if(ylesandeTyyp == 1){heliFailid.push('miinus');}
	if(ylesandeTyyp == 2){heliFailid.push('korda');}
	if(ylesandeTyyp == 3){heliFailid.push('jagada');}
	numberSonadeks(arvY);
	ytleMata();
	
	}
	console.log(vastused);
	document.getElementById('kontrolli').addEventListener('click', kontrolliVastused);
	document.getElementById('kontrolli').setAttribute('value', 'Kontrolli vastuseid!');
}

	function numberSonadeks(arv){
	var sajalised = Math.floor(arv/100);
	if(sajalised == 1){
		heliFailid.push('100');
	}
	if(sajalised > 1){
		helifailid.push(sajalised);
		helifailid.push('100');
	}
	arv = arv - sajalised * 100;
	var kymnelised = Math.floor(arv / 10);
	var yhelised = arv - kymnelised * 10;
	if(arv <= 10){
		heliFailid.push(arv);
	}
	if(arv >= 11 && arv <= 19){
		heliFailid.push(yhelised);
		heliFailid.push('teist');
	}
	if(arv >= 20){
		heliFailid.push(kymnelised);
		heliFailid.push('kymmend');
		if(yhelised > 0){
			heliFailid.push(yhelised);
		}
	}
	console.log(heliFailid);
}

function ytleMata(){
	if(heliFailid.length > 0){
		mataYtleja = new Audio('mata_100/' + heliFailid[0] + '.mp3');
		heliFailid.shift();
		mataYtleja.addEventListener('ended', ytleMata);
		mataYtleja.play();
	} else {
		mataYtleja.removeEventListener('ended', ytleMata);
	}
}

function kontrolliVastused(){
	document.getElementById('kontrolli').removeEventListener('click', kontrolliVastused);
	console.log(vastused.length);
	for(var i = 0; i < vastused.length; i ++){
		var minuVastus = parseInt(document.getElementById('vastus' + (i +1)).value);
		kontrollitudKokku ++;
		if(minuVastus == vastused[i]){
			document.getElementById('tulemus' + (i +1)).innerHTML = 'Õige vastus!';
			oigestiKokku ++;
			heliFailid.push('oigevastus');
			ytleMata();
		} else {
			document.getElementById('tulemus' + (i +1)).innerHTML = 'Vale vastus! Õige on: ' + vastused[i];
			heliFailid.push('valevastus');
			ytleMata();
		}
	}
	document.getElementById('kontrolli').addEventListener('click', uuedYlesanded);
	document.getElementById('kontrolli').setAttribute('value', 'Loosi uued ülesanded!');
	document.getElementById('kontrollitudInfo').innerHTML = kontrollitudKokku;
	document.getElementById('oigestiInfo').innerHTML = oigestiKokku;
	document.getElementById('indikaator').setAttribute('max', kontrollitudKokku);
	document.getElementById('indikaator').setAttribute('value', oigestiKokku);
}

function uuedYlesanded(){
	console.log('Hõissa!');
	document.getElementById('kontrolli').removeEventListener('click', uuedYlesanded);
	vastused.splice(0, vastused.length);
	var vanadYlesanded = document.getElementById('ylesanded').getElementsByTagName('p');
	console.log(vanadYlesanded);
	var eemaldada = vanadYlesanded.length;
	for(var i = 0; i < eemaldada; i ++){
		document.getElementById('ylesanded').removeChild(vanadYlesanded[0]);
	}
	loosiYlesanded();
}