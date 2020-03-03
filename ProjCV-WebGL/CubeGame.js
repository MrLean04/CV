//////////////////////////////////////////////////////////////////////////////
//
//  CubeGame.js 
//
//  Simple mesh data structure
//
//  Adapted from learningwebgl.com
//
// 
//
//////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

var shaderProgram = null; 

// NEW --- Buffers

var cubeVertexPositionBuffer = null;
var ParedeVertexPositionBuffer = null;

var cubeVertexColorBuffer = null;
var ParedeVertexColorBuffer = null;

var cubeVertexIndexBuffer = null;
var ParedeVertexIndexBuffer = null;

// The global transformation parameters

// The translation vector

var tx = 0.0;
var ptx=0.0;

var ty = 0.0;
var pty=0.0;

var tz = 0.0;
var ptz= 0.0;
// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

var pangleXX = 0.0;

var pangleYY = 0.0;

var pangleZZ = 0.0;

// The scaling factors

var sx = 0.25;

var sy = 0.25;

var sz = 0.25;

var psx = 0.25;

var psy = 0.25;

var psz = 0.25;

// NEW - Animation controls

var rotationXX_ON = 0;

var rotationXX_DIR = 1;

var rotationXX_SPEED = 1;
 
var rotationYY_ON = 0;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 1;
 
var rotationZZ_ON = 0;

var rotationZZ_DIR = 1;

var rotationZZ_SPEED = 1;

var protationXX_ON = 1;

var protationXX_DIR = 1;

var protationXX_SPEED = 1;
 
var protationYY_ON = 1;

var protationYY_DIR = 1;

var protationYY_SPEED = 1;
 
var protationZZ_ON = 1;

var protationZZ_DIR = 1;

var protationZZ_SPEED = 1;
 
// To allow choosing the way of drawing the model triangles

var primitiveType = null;
 
// To allow choosing the projection type

var projectionType = 0;


var pos_Viewer = [ 0.0, 0.0, 0.0, 1.0 ];
 
// From learningwebgl.com

// NEW --- Storing the vertices defining the cube faces

vertices = [
    // Front face
    -3.0, -1.5,  2.0,
     3.0, -1.5,  2.0,
     3.0,  1.5,  2.0,
    -3.0,  1.5,  2.0,

    // Back face
    -3.0, -1.5, -2.0,
    -3.0,  1.5, -2.0,
     3.0,  1.5, -2.0,
     3.0, -1.5, -2.0,

];



//Vertex indices defining the triangles

var cubeVertexIndices = [

    0, 1, 2,      0, 2, 3,    // Front face

    4, 5, 6,      4, 6, 7,    // Back face

    3, 2, 6,      3, 6, 5,  // Top face

    0, 1, 7,   	  0, 7, 4, // Bottom face

    1, 7, 6,      1, 6, 2, // Right face

    4, 0, 3,      4, 3, 5  // Left face
];
 
//And their colour

var colors = [

 // FRONT FACE - RED
 	
 0.00,  0.00,  1.00,
 
 0.00,  0.00,  1.00,
 
 0.00,  0.00,  1.00,

 0.00,  0.00,  1.00,
 			 
 // BACK FACE - BLACK
 	
 0.00,  1.00,  1.00,
 
 0.00,  1.00,  1.00,
 		 
 0.00,  1.00,  1.00,
 
 0.00,  1.00,  1.00,

];
var colors1 = [

 // FRONT FACE - RED
 	
 0.0,  0.00,  0.00,
 
 0.00,  0.00,  0.00,
 
 0.00,  0.00,  0.00,

 0.00,  0.00,  0.00,
 			 
 // BACK FACE - BLACK
 	
 0.00,  0.00,  0.00,
 
 0.00,  0.00,  0.00,
 		 
 0.00,  0.00,  0.00,
 
 0.00,  0.00,  0.00,
];
var colors2 = [

 // FRONT FACE - RED
 	
 0.5,  0.5,  0.5,
 
 0.5,  0.5,  0.5,
 
 0.5,  0.5,  0.5,

 0.5,  0.5,  0.5,
 			 
 // BACK FACE - BLACK
 	
 0.5,  0.5,  0.5,
 
 0.5,  0.5,  0.5,
 
 0.5,  0.5,  0.5,

 0.5,  0.5,  0.5,
];

verticesParede63 = [
//front
4.0, -3.0, 2.0,
5.0, -3.0, 2.0,
5.0,  3.0, 2.0,
4.0,  3.0, 2.0,
-4.0,  3.0, 2.0,
-5.0,  3.0, 2.0,
-5.0, -3.0, 2.0,
-4.0, -3.0, 2.0,

4.0, -2.0, 2.0,
4.0,  2.0, 2.0,
-4.0, 2.0, 2.0,
-4.0, -2.0, 2.0,

//back
4.0, -3.0, 0.0,
5.0, -3.0, 0.0,
5.0,  3.0, 0.0,
4.0,  3.0, 0.0,
-4.0,  3.0, 0.0,
-5.0,  3.0, 0.0,
-5.0, -3.0, 0.0,
-4.0, -3.0, 0.0,

4.0, -2.0, 0.0,
4.0,  2.0, 0.0,
-4.0,  2.0, 0.0,
-4.0, -2.0, 0.0,
];

var parede63VertexIndx = [
//Front
0,1,2,     0,2,3,
10,9,3,    10,3,4,
6,7,4,     6,4,5,
7,0,8,     7,8,11,
//Back
12,13,14,  12,14,15,
22,21,15,  22,15,16,
18,19,16,  18,16,17,
19,12,20,  19,20,23, 
//Right
1,13,14,   1,14,2,
//Top
5,2,14,    5,14,17,
//Bottom
6,1,13,    6,13,18,
//Left
18,6,5,    18,5,17,
//Inner
11,8,20,   11,20,23,
20,8,9,    20,9,21,
10,9,21,   10,21,22,
11,23,22,  11,22,10,

];

var colorsp63 = [

	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
			 
	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
		 
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
			 
	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
		 
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
			 
	
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,
		 
1.00,  1.00,  0.00,

1.00,  0.00,  0.00,

];



//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex and the Color Buffers

function initBuffers() {	
	
	// Coordinates Cube
		
	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = vertices.length / 3;	
	
	// Coordinates Parede
	
	ParedeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, ParedeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesParede63), gl.STATIC_DRAW);
	ParedeVertexPositionBuffer.itemSize = 3;
	ParedeVertexPositionBuffer.numItems = verticesParede63.length / 3;	

	// Colors Cube
		
	cubeVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	cubeVertexColorBuffer.itemSize = 3;
	cubeVertexColorBuffer.numItems = vertices.length / 3;
	//Colors Background
	backVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, backVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors1), gl.STATIC_DRAW);
	backVertexColorBuffer.itemSize = 3;
	backVertexColorBuffer.numItems = vertices.length / 3;
	//Colors Background2
	back2VertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, back2VertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors2), gl.STATIC_DRAW);
	back2VertexColorBuffer.itemSize = 3;
	back2VertexColorBuffer.numItems = vertices.length / 3;

	// Colors Parede
	
	ParedeVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, ParedeVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsp63), gl.STATIC_DRAW);
	ParedeVertexColorBuffer.itemSize = 3;
	ParedeVertexColorBuffer.numItems = verticesParede63.length / 3;	

	// Vertex indices Cube
	
    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
    

	// Vertex indices Parede
	
    ParedeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ParedeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(parede63VertexIndx), gl.STATIC_DRAW);
    ParedeVertexIndexBuffer.itemSize = 1;
    ParedeVertexIndexBuffer.numItems = 72;
}


//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType ) {

    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Passing the buffers
    	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
	
	function drawModelP( pangleXX, pangleYY, pangleZZ, 
			psx, psy, psz,
			ptx, pty, ptz,
			mvMatrix,
			primitiveType ) {

// Pay attention to transformation order !!

mvMatrix = mult( mvMatrix, translationMatrix( ptx, pty, ptz ) );
				 
mvMatrix = mult( mvMatrix, rotationZZMatrix( pangleZZ ) );

mvMatrix = mult( mvMatrix, rotationYYMatrix( pangleYY ) );

mvMatrix = mult( mvMatrix, rotationXXMatrix( pangleXX ) );

mvMatrix = mult( mvMatrix, scalingMatrix( psx, psy, psz ) );
				 
// Passing the Model View Matrix to apply the current transformation

var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

// Passing the buffers

gl.bindBuffer(gl.ARRAY_BUFFER, ParedeVertexPositionBuffer);

gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, ParedeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, ParedeVertexColorBuffer);

gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, ParedeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ParedeVertexIndexBuffer);

// Drawing the triangles --- NEW --- DRAWING ELEMENTS 

gl.drawElements(gl.TRIANGLES, ParedeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);	

}
function drawModelB( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType ) {

    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Passing the buffers
    	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, backVertexColorBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, backVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
function drawModelB2( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType ) {

    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Passing the buffers
    	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, back2VertexColorBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, back2VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene

function drawScene() {
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing with the background color
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// NEW --- Computing the Projection Matrix

		// A standard view volume.
		
		// Viewer is at (0,0,0)
		
		// Ensure that the model is "inside" the view volume
		
		pMatrix = perspective( 45, 1, 0.05, 15 );
		
		// Global transformation !!
		
		

		// NEW --- The viewer is on (0,0,0)
		
		pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[2] = 0.0;
		
		pos_Viewer[3] = 1.0;  
		
		// TO BE DONE !
		
		// Allow the user to control the size of the view volume
	
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// NEW --- Instantianting the same model more than once !!
	
	// And with diferent transformation parameters !!
	
	// Call the drawModel function !!
	
	// Instance 1 --- RIGHT TOP
	
	drawModel( -angleXX, -angleYY, -angleZZ, 
	           sx*0.01, sy*0.01, sz*0.01,
	           tx, ty -0.05 , tz-0.2,
	           mvMatrix,
	           primitiveType );
	drawModelB( 0, 0, 0, 
	           sx * 10, sy * 10, sz *10,
	           tx, ty - 3 , tz,
	           mvMatrix,
	           primitiveType );
	drawModelB2( 0, 0, 0, 
	           sx * 10, sy * 10, sz *10,
	           tx-6, ty , tz,
	           mvMatrix,
	           primitiveType );
	drawModelB2( 0, 0, 0, 
	           sx * 10, sy * 10, sz *10,
	           tx+6, ty+2 , tz,
	           mvMatrix,
	           primitiveType );
	
var x=0.9;
	for (var i=0;i<1000;i++){
		
	drawModelP( -pangleXX, -pangleYY, -pangleZZ, 
				psx * 0.01, psy *0.01 , psz *0.01,
				ptx , pty - 0.05, ptz - x,
				mvMatrix,
				primitiveType );
		
		x+=0.4;
	}

	


	           
}

//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters

var lastTime = 0;
var tol = 0;
var flag = 0;
var score = 0;
function animate() {
	
	
	//console.log(pangleZZ);
	//console.log(angleZZ);
	//console.log(ptz);
	//console.log(tz);
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		if((ptz-(-2.0*0.01-(2.0+0.9)*0.01))%0.4 <= 0.005){
				/*console.log("ei");
				console.log(Math.abs(pangleZZ%360));
				console.log(Math.abs(angleZZ%360));*/

				if((Math.abs(angleZZ%360) <= Math.abs(pangleZZ%360)+5 && Math.abs(angleZZ%360) >= Math.abs(pangleZZ%360)-5)){ //|| (Math.abs(angleZZ%360)-180 >= Math.abs((pangleZZ%360)+5-180) && Math.abs(angleZZ%360) <= Math.abs((pangleZZ%360)-5-180))){
					
				}
				else{
					tol++;
					if(tol == 3){
						flag = 1
					}
					
				}
		}
		
		if( rotationXX_ON ) {

			angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
			rotationXX_ON=0;
	    }

		if( rotationYY_ON ) {

			angleYY += rotationYY_DIR * rotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationZZ_ON ) {

			angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
			rotationZZ_ON=0;
		}
		
		
		if(flag == 0){
			ptz+=0.003;
			pangleZZ+=0.2;
		}
		else {score = (ptz-(-2.0*0.01-(2.0+0.9)*0.01))/0.4;
				score-=2;
				score = Math.trunc(score);
				console.log(score);
				//console.log(ptz);
				
			}
		var aux = 0;
		aux = (ptz-(-2.0*0.01-(2.0+0.9)*0.01))/0.4;
		aux-=2;
		score = Math.trunc(aux);
		document.getElementById('score').innerHTML = 'score:' + score; 
	}
	
	lastTime = timeNow;
}
//----------------------------------------------------------------------------
//Handling keyboard events

//Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {
	
	if (currentlyPressedKeys[65]) {
		rotationZZ_ON=1;
		rotationZZ_DIR= -1;
		rotationZZ_SPEED =1.0;
		angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
	}
	if (currentlyPressedKeys[68]) {
		rotationZZ_ON=1;
		rotationZZ_DIR= 1;
		rotationZZ_SPEED =1.0;
		angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
	}
	if (currentlyPressedKeys[87]) {
		
		rotationXX_ON=1;
		rotationXX_DIR= -1;
		rotationXX_SPEED =1.0;
		angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
	}
	
	if (currentlyPressedKeys[83]) {
		
		rotationXX_ON=1;
		rotationXX_DIR= 1;
		rotationXX_SPEED =1.0;
		angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
	}

}

// Timer

function tick() {
	
	requestAnimFrame(tick);
	
	handleKeys();
	
	// NEW --- Processing keyboard events 
	
	drawScene();
	
	
	
	animate();
}




//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){
		
}

//----------------------------------------------------------------------------

function setEventListeners( canvas ){
	
	
	var projection = document.getElementById("projection-selection");
	
    function handleKeyDown(event) {
		
        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {
		
        currentlyPressedKeys[event.keyCode] = false;
    }

	document.onkeydown = handleKeyDown;
    
    document.onkeyup = handleKeyUp;
	
     


	// Button events
	
	document.getElementById("a").onclick=function(){
		rotationZZ_ON=1;
		rotationZZ_DIR= -1;
		rotationZZ_SPEED =1;
		angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;

	}
	
	document.getElementById("d").onclick=function(){
		rotationZZ_ON=1;
		rotationZZ_DIR= 1;
		rotationZZ_SPEED =1;
		angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;

	}
	
	document.getElementById("w").onclick=function(){
		rotationXX_ON=1;
		rotationXX_DIR= -1;
		rotationXX_SPEED +=0.25;
		angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;

	}
	
	document.getElementById("s").onclick=function(){
		rotationXX_ON=1;
		rotationXX_DIR= 1;
		rotationXX_SPEED +=0.25;
		angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;

	}
	/*document.getElementById("startGame").onclick = function(){


		angleXX = 0.0;

		angleYY = 0.0;

		angleZZ = 0.0;
		
		sx = 0.25;

		sy = 0.25;

		sz = 0.25;
		
		rotationXX_ON = 0;
		
		rotationXX_DIR = 1;
		
		rotationXX_SPEED = 1;

		rotationYY_ON = 0;
		
		rotationYY_DIR = 1;
		
		rotationYY_SPEED = 1;

		rotationZZ_ON = 0;
		
		rotationZZ_DIR = 1;
		
		rotationZZ_SPEED = 1;
		
	}*/

}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		// DEFAULT: The viewport occupies the whole canvas 
		
		// DEFAULT: The viewport background color is WHITE
		
		// NEW - Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
		
		// DEFAULT: The Depth-Buffer is DISABLED
		
		// Enable it !
		
		gl.enable( gl.DEPTH_TEST );
		
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );
	
	setEventListeners( canvas );
	
	initBuffers();
	
	tick();		// A timer controls the rendering / animation    

	outputInfos();
}


