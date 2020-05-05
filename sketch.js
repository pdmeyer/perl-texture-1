let ix;
let ix2;
let ppx = 10000 * Math.random(); 
let ppy = ppx;
let ppi = 0.01;
let flf = 0.9;
let flfi = 0.05;
let scl = 1;
let noiz;
let noizs = []; 
let cnt = 0;
let perlId;
let perl;
let perls = [[10,0.6,0.03,1.4], [10,0.6,0.0014,1.4], [10,0.8,0.0014,1.4], [10,0.7,0.0014,1.4], [10,0.63,0.0014,1.4], [10,0.66,0.0014,1.7],[10,0.66,0.0014,1.9],[10,0.66,0.0014,3],[10,0.66,0.0014,3.2],[25,0.66,0.0014,1.2],[25,0.64,0.0014,1.2],[25,0.63,0.0014,1.2],[25,0.63,0.0014,1.36]];

function setup() {
	if(oscOn) setupOsc(sendPort, rcvPort);
	createCanvas(windowWidth, windowHeight);
	frameRate(24);
	pixelDensity(1);
	// noLoop();
	perl = Number(getParameterByName('perl'));
	if(!perl) { perlId = 2 } else if (perl > perls.length - 1) {perlId = perls.length - 1} else { perlId = perl };
	// perlConfig(10,0.9,0.03,1.4);
	// perlConfig(10,0.9,0.0014,1.4);
	// perlConfig(10,0.7,0.0014,1.4);
	// perlConfig(10,0.63,0.0014,1.4);
	// perlConfig(10,0.66,0.0014,1.7);
	// perlConfig(10,0.66,0.0014,1.9);
	// perlConfig(10,0.66,0.0014,3);
	// perlConfig(10,0.66,0.0014,3.2);
	// perlConfig(25,0.66,0.0014,1.2); //soft and delicate
	// perlConfig(25,0.64,0.0014,1.2); //this range...
	// perlConfig(25,0.63,0.0014,1.2); //...is pretty 
	// perlConfig(25,0.63,0.0014,1.36);
	perlConfig(perls[[perlId]][0],perls[perlId][1],perls[perlId][2],perls[perlId][3]); //this oen is webby and weird


	noizs.length = width * height;
	updateNoiz();
	ix=0;
	ix2=0;
	
}



function draw() {
	background(255);
	loadPixels();
	writePixels();
	updatePixels();
	

	// for (i=0; i <noizs.length / 6; i+=4) {

	// }
	// console.log(ix+" "+pixels.length+" "+noizs.length);
	// if(flf < 0 || flf > 4) flfi *= -1; 
	// flf -= flfi
	//console.log(flf);
	//console.log("pix: "+getArry(pixels,5000,16));
}

function writePixels() {
	let sclscl = sin_(frameCount,70,0,1)*0.5;
	for (i=0; i < noizs.length; i+=1) {
		noiz = noizs[i] * scl + (scl * sclscl * noise(i));
		j = i * 4;
		pixels[j] = map(noiz,0,1,217,110);
		pixels[j+1] = map(noiz,0,1,207,101);
		pixels[j+2] = map(noiz,0,1,186,82);
		pixels[j+3] = 255;
		//ix2+=6;
	}	
}

function mousePressed() {
	updateNoiz();
	//redraw();
}


function mouseDragged() {
	// let address = oscAddress+":"+sendPort;
	// sendOsc(address, [mouseX,mouseY]);
}

function nD(oct_,flf_,ppi_,scl_=1) {
	perlConfig(oct_,flf_,ppi_,scl_);
	updateNoiz();
	redraw();
}

function perlConfig(oct_,flf_,ppi_,scl_=1,ofs_=0){
	scl = scl_
	ppi = ppi_;
	noiseDetail(oct_,flf_);
}

function updateNoiz(){
	for(let x = 0; x < width; x++) {
		ppy = 0;
		for (let y = 0; y < height; y++) {
			ix = (x + width * y);
			noiz = noise(ppx,ppy);
			noizs.splice(ix, 1, noiz);
			//noiz = noiz * scl;
			ppy += ppi
			cnt++
		}
		ppx += ppi
		//console.log("x: "+x+" y: "+y+" ix: "+ix);
	}
	console.log(cnt+" "+noizs.length+" "+cnt/noizs.length);
}

function getArry(arry,strt,cnt) {
	let items = [];
	for (ix = strt; ix < strt+cnt; ix++) {
		items.push(arry[ix])
	}
	return(items);
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}