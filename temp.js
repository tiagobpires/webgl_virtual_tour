var teximg = [];
var texSrc = ["gato.jpg", "cachorro.png"];
var loadTexs = 0;
var gl;
var prog;
var progTexture;
var progSolidColor;
var angle = 0;

var initialCamPosition = [0, 5, 14]

var camPosition = initialCamPosition.slice()
var cam = createCamera(camPosition, 
					   [0, 0, 0], 
					   [camPosition[0], camPosition[1] + 1, camPosition[2]]
					   );
var progs;

document.addEventListener("keydown", function(event) {
	cam = handleKeyPress(event, camPosition, initialCamPosition);
});

function init()
{
    for(i = 0; i < texSrc.length; i++)
    {
        teximg[i] = new Image();
        teximg[i].src = texSrc[i];
        teximg[i].onload = function()
        {
            loadTexs++;
    	    loadTextures();
        }
    }
}

function loadTextures()
{
    if(loadTexs == texSrc.length)
    {
       initGL();
       configScene();
       draw();
    }
}   


var objects = [
	{ // Cubo central
		coordinates: [
			// Quad 1 (atras)
			-0.5,  0.5, 0.0, 
			-0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0, 
		     0.5,  0.5, 0.0, 
			-0.5,  0.5, 0.0,
		
			// Quad 2 (lado esquerdo)
			-0.5, -0.5, 0.0, 
			-0.5,  0.5, 0.0, 
			-0.5,  0.5, 1.0, 
			-0.5, -0.5, 1.0, 
			-0.5, -0.5, 0.0, 
		
			// Quad 3 (embaixo)
			-0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0, 
			 0.5, -0.5, 1.0, 
			-0.5, -0.5, 1.0,
			-0.5, -0.5, 0.0,
		
			// Quad 4 (lado direito)
			0.5, -0.5, 0.0, 
			0.5,  0.5, 0.0, 
			0.5, -0.5, 1.0, 
			0.5,  0.5, 0.0, 
			0.5,  0.5, 1.0, 
		
			// Quad 5 (frente)
			-0.5,  0.5, 1.0,
			-0.5, -0.5, 1.0,
			 0.5, -0.5, 1.0, 
			 0.5,  0.5, 1.0, 
			-0.5,  0.5, 1.0,

			// Quad 6 (em cima)
			-0.5,  0.5, 0.0,
			-0.5, 0.5, 1.0, 
			 0.5, 0.5, 1.0, 
			 0.5,  0.5, 0.0, 
			-0.5,  0.5, 0.0,
		],
		useTexture: false,
		useSolidColor: true,
		color: [1.0, 1.0, 0.0, 1.0],
		transformation: "Z",
	},  
	// { // Cubo a esquerda
	// 	coordinates:  [
	// 		// Quad 1 (frente)
	// 		-2.5,  0.5,  0.5,  0.0, 0.0,
	// 		-2.5, -0.5,  0.5,  0.0, 1.0,
	// 		-1.5, -0.5,  0.5,  1.0, 1.0,
	// 		-1.5,  0.5,  0.5,  1.0, 0.0,
	// 		-2.5,  0.5,  0.5,  0.0, 0.0,
		  
	// 		// Quad 2 (atrás)
	// 		-1.5,  0.5, -0.5,  0.0, 0.0,
	// 		-1.5, -0.5, -0.5,  0.0, 1.0,
	// 		-2.5, -0.5, -0.5,  1.0, 1.0,
	// 		-2.5,  0.5, -0.5,  1.0, 0.0,
	// 		-1.5,  0.5, -0.5,  0.0, 0.0,
		  
	// 		// Quad 3 (esquerda)
	// 		-2.5,  0.5, -0.5,  0.0, 0.0,
	// 		-2.5, -0.5, -0.5,  0.0, 1.0,
	// 		-2.5, -0.5,  0.5,  1.0, 1.0,
	// 		-2.5,  0.5,  0.5,  1.0, 0.0,
	// 		-2.5,  0.5, -0.5,  0.0, 0.0,
		  
	// 		// Quad 4 (direita)
	// 		-1.5,  0.5,  0.5,  0.0, 0.0,
	// 		-1.5, -0.5,  0.5,  0.0, 1.0,
	// 		-1.5, -0.5, -0.5,  1.0, 1.0,
	// 		-1.5,  0.5, -0.5,  1.0, 0.0,
	// 		-1.5,  0.5,  0.5,  0.0, 0.0,
		  
	// 		// Quad 5 (cima)
	// 		-2.5,  0.5, -0.5,  0.0, 0.0,
	// 		-2.5,  0.5,  0.5,  0.0, 1.0,
	// 		-1.5,  0.5,  0.5,  1.0, 1.0,
	// 		-1.5,  0.5, -0.5,  1.0, 0.0,
	// 		-2.5,  0.5, -0.5,  0.0, 0.0,
		  
	// 		// Quad 6 (baixo)
	// 		-2.5, -0.5,  0.5,  0.0, 0.0,
	// 		-2.5, -0.5, -0.5,  0.0, 1.0,
	// 		-1.5, -0.5, -0.5,  1.0, 1.0,
	// 		-1.5, -0.5,  0.5,  1.0, 0.0,
	// 		-2.5, -0.5,  0.5,  0.0, 0.0,
	// 	], 
	// 	useTexture: true,
	// 	useSolidColor: false,
	// 	textureIndices: [ // By triangle
	// 		1, 1, 1, 1, 1, 1, 1, 1, 1, 1
	// 	],
	// 	transformation: "X",
	// }, 
	// { // Cubo a direita
	// 	coordinates:  [
	// 		// Quad 1 (atras)
	// 		1.5,  0.5, 0.0, 0.0, 0.0,
	// 		1.5, -0.5, 0.0, 0.0, 1.0,
	// 		2.5, -0.5, 0.0, 1.0, 1.0,
	// 		2.5,  0.5, 0.0, 1.0, 0.0,
	// 		1.5,  0.5, 0.0, 0.0, 0.0,
		  
	// 		// Quad 2 (lado esquerdo)
	// 		1.5, -0.5, 0.0, 1.0, 1.0,
	// 		1.5,  0.5, 0.0, 1.0, 0.0,
	// 		1.5,  0.5, 1.0, 0.0, 0.0,
	// 		1.5, -0.5, 1.0, 0.0, 1.0,
	// 		1.5, -0.5, 0.0, 1.0, 1.0,
		  
	// 		// Quad 3 (embaixo)
	// 		1.5, -0.5, 0.0, 0.0, 0.0,
	// 		2.5, -0.5, 0.0, 1.0, 0.0,
	// 		2.5, -0.5, 1.0, 1.0, 1.0,
	// 		1.5, -0.5, 1.0, 0.0, 1.0,
	// 		1.5, -0.5, 0.0, 0.0, 0.0,
		  
	// 		// Quad 4 (lado direito)
	// 		2.5, -0.5, 0.0, 1.0, 1.0,
	// 		2.5,  0.5, 0.0, 1.0, 0.0,
	// 		2.5, -0.5, 1.0, 0.0, 1.0,
	// 		2.5,  0.5, 0.0, 1.0, 0.0,
	// 		2.5,  0.5, 1.0, 0.0, 0.0,
		  
	// 		// Quad 5 (frente)
	// 		1.5,  0.5, 1.0, 0.0, 0.0,
	// 		1.5, -0.5, 1.0, 0.0, 1.0,
	// 		2.5, -0.5, 1.0, 1.0, 1.0,
	// 		2.5,  0.5, 1.0, 1.0, 0.0,
	// 		1.5,  0.5, 1.0, 0.0, 0.0,
		  
	// 		// Quad 6 (em cima)
	// 		1.5,  0.5, 0.0, 0.0, 0.0,
	// 		1.5,  0.5, 1.0, 0.0, 1.0,
	// 		2.5,  0.5, 1.0, 1.0, 1.0,
	// 		2.5,  0.5, 0.0, 1.0, 0.0,
	// 		1.5,  0.5, 0.0, 0.0, 0.0,
	// 	], 
	// 	useTexture: true,
	// 	useSolidColor: false,
	// 	textureIndices: [ // By triangle
	// 		0, 1, 0, 1, 0, 1, 0, 1, 0, 1
	// 	],
	// 	transformation: "X",
	// }
]

function configSceneAUX()
{    
	var coordTriangles = new Float32Array([
		// Quad 1
		-0.5,  0.5, 0.0, 0.0, 0.0,
		-0.5, -0.5, 0.0, 0.0, 1.0,
			0.5, -0.5, 0.0, 1.0, 1.0,
			0.5,  0.5, 0.0, 1.0, 0.0,
		-0.5,  0.5, 0.0, 0.0, 0.0,
	
		// Quad 2
		-0.5, -0.5, 0.0, 1.0, 1.0,
		-0.5,  0.5, 0.0, 1.0, 0.0,
		-0.5,  0.5, 1.0, 0.0, 0.0,
		-0.5, -0.5, 1.0, 0.0, 1.0,
		-0.5, -0.5, 0.0, 1.0, 1.0,
	
		// Quad 3
			0.5, -0.5, 1.0, 1.0, 1.0,
			0.5, -0.5, 0.0, 1.0, 0.0,
		-0.5, -0.5, 0.0, 0.0, 0.0,
		-0.5, -0.5, 1.0, 0.0, 1.0,
			0.5, -0.5, 1.0, 1.0, 1.0,
	
		// Quad 4
			0.5,  0.5, 0.0, 0.0, 1.0,
			0.5, -0.5, 0.0, 0.0, 0.0,
			0.5, -0.5, 1.0, 1.0, 0.0,
			0.5,  0.5, 1.0, 1.0, 1.0,
			0.5,  0.5, 0.0, 0.0, 1.0,
	
		// Quad 5
			0.5, -0.5, 0.0, 0.0, 1.0,
			0.5,  0.5, 0.0, 0.0, 0.0,
			0.5,  0.5, 1.0, 1.0, 0.0,
			0.5, -0.5, 1.0, 1.0, 1.0,
			0.5, -0.5, 0.0, 0.0, 1.0,
	
		// Quad 6
		-0.5,  0.5, 1.0, 0.0, 1.0,
		-0.5, -0.5, 1.0, 0.0, 0.0,
			0.5, -0.5, 1.0, 1.0, 0.0,
			0.5,  0.5, 1.0, 1.0, 1.0,
		-0.5,  0.5, 1.0, 0.0, 1.0,
	]);
										
	//Cria buffer na GPU e copia coordenadas para ele
	var bufPtr = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufPtr);
	gl.bufferData(gl.ARRAY_BUFFER, coordTriangles, gl.STATIC_DRAW);
	
	//Pega ponteiro para o atributo "position" do vertex shader
	var positionPtr = gl.getAttribLocation(prog, "position");
	gl.enableVertexAttribArray(positionPtr);
	//Especifica a cÃ³pia dos valores do buffer para o atributo
	gl.vertexAttribPointer(positionPtr, 
							3,        //quantidade de dados em cada processamento
							gl.FLOAT, //tipo de cada dado (tamanho)
							false,    //nÃ£o normalizar
							5*4,      //tamanho do bloco de dados a processar em cada passo
										//0 indica que o tamanho do bloco Ã© igual a tamanho
										//lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
							0         //salto inicial (em bytes)
							);
	
	var texcoordPtr = gl.getAttribLocation(prog, "texCoord");
	gl.enableVertexAttribArray(texcoordPtr);
	//Especifica a cÃ³pia dos valores do buffer para o atributo
	gl.vertexAttribPointer(texcoordPtr, 
							2,        //quantidade de dados em cada processamento
							gl.FLOAT, //tipo de cada dado (tamanho)
							false,    //nÃ£o normalizar
							5*4,      //tamanho do bloco de dados a processar em cada passo
										//0 indica que o tamanho do bloco Ã© igual a tamanho
										//lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
							3*4       //salto inicial (em bytes)
							);
							
	//submeter textura para gpu
	var tex0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, tex0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);        
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximg[0]);
	
	var tex1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, tex1);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);        
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximg[1]);
        
}  

function configScene() {
	createObjectBuffers(objects)
	createTextures(teximg);
}


function draw()
{
	var mproj = createPerspective(20, gl.canvas.width/gl.canvas.height, 1, 50);
	
	var matrotZ = math.matrix(
		[[Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0, 0.0], 
		[Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0, 0.0],
		[0.0,    0.0,   1.0, 0.0],
		[0.0,    0.0,   0.0, 1.0]]
	);
		
	var matrotY = math.matrix(
		[[Math.cos(angle*Math.PI/180.0), 0.0, -Math.sin(angle*Math.PI/180.0), 0.0], 
		[0.0, 1.0, 0.0, 0.0],
		[Math.sin(angle*Math.PI/180.0),  0.0, Math.cos(angle*Math.PI/180.0), 0.0],
		[0.0,    0.0,   0.0, 1.0]]
		);
		
	var matrotX = math.matrix(
		[[1.0, 0.0, 0.0, 0.0],
		[0.0, Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0], 
		[0.0, Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0],
		[0.0,    0.0,   0.0 ,1.0]]
	);  
	
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	

	let coordTriangles = new Float32Array(
		[
			// Quad 1 (atras)
			-0.5,  0.5, 0.0, 
			-0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0, 
		     0.5,  0.5, 0.0, 
			-0.5,  0.5, 0.0,
		
			// Quad 2 (lado esquerdo)
			-0.5, -0.5, 0.0, 
			-0.5,  0.5, 0.0, 
			-0.5,  0.5, 1.0, 
			-0.5, -0.5, 1.0, 
			-0.5, -0.5, 0.0, 
		
			// Quad 3 (embaixo)
			-0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0, 
			 0.5, -0.5, 1.0, 
			-0.5, -0.5, 1.0,
			-0.5, -0.5, 0.0,
		
			// Quad 4 (lado direito)
			0.5, -0.5, 0.0, 
			0.5,  0.5, 0.0, 
			0.5, -0.5, 1.0, 
			0.5,  0.5, 0.0, 
			0.5,  0.5, 1.0, 
		
			// Quad 5 (frente)
			-0.5,  0.5, 1.0,
			-0.5, -0.5, 1.0,
			 0.5, -0.5, 1.0, 
			 0.5,  0.5, 1.0, 
			-0.5,  0.5, 1.0,

			// Quad 6 (em cima)
			-0.5,  0.5, 0.0,
			-0.5, 0.5, 1.0, 
			 0.5, 0.5, 1.0, 
			 0.5,  0.5, 0.0, 
			-0.5,  0.5, 0.0,
		]
	)

	var bufPtr = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufPtr);
	gl.bufferData(gl.ARRAY_BUFFER, coordTriangles, gl.STATIC_DRAW);

	var positionPtr = gl.getAttribLocation(prog, "position");
	gl.enableVertexAttribArray(positionPtr);
	//Especifica a cÃ³pia dos valores do buffer para o atributo
	gl.vertexAttribPointer(positionPtr, 
							2,        //quantidade de dados em cada processamento
							gl.FLOAT, //tipo de cada dado (tamanho)
							false,    //nÃ£o normalizar
							0,        //tamanho do bloco de dados a processar em cada passo
										//0 indica que o tamanho do bloco Ã© igual a tamanho
										//lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
							0         //salto inicial (em bytes)
							);

	gl.drawArrays(gl.TRIANGLES, 0, 3);

	// for (let i = 0; i < objects.length; i++) {
	// 	let obj = objects[i];

	// 	// if (obj.useTexture) {
	// 	// 	gl.useProgram(progTexture);
	// 	// 	prog = progTexture;

	// 	// } else {
	// 	// 	gl.useProgram(progSolidColor);
	// 	// 	prog = progSolidColor;
	// 	// }

	// 	gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufPtr);
		
	// 	// stride = obj.useTexture ? 5 : 3;
	// 	// setAttribute(prog, "position", 3, stride * 4, 0);	

	// 	console.log(prog);

	// 	var positionPtr = gl.getAttribLocation(prog, "position");
    //     gl.enableVertexAttribArray(positionPtr);
    //     //Especifica a cÃ³pia dos valores do buffer para o atributo
    //     gl.vertexAttribPointer(positionPtr, 
	// 		3,        //quantidade de dados em cada processamento
	// 		gl.FLOAT, //tipo de cada dado (tamanho)
	// 		false,    //nÃ£o normalizar
	// 		0,        //tamanho do bloco de dados a processar em cada passo
	// 					//0 indica que o tamanho do bloco Ã© igual a tamanho
	// 					//lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
	// 		0         //salto inicial (em bytes)
	// 	);	

	// 	let transforma;

	// 	if (obj.transformation) {
	// 		switch (obj.transformation) {
	// 			case "X":
	// 				transforma = math.multiply(cam, matrotX);
	// 				break;
	// 			case "Y":
	// 				transforma = math.multiply(cam, matrotY);
	// 				break;
	// 			case "Z":
	// 				transforma = math.multiply(cam, matrotZ);
	// 				break;

	// 		}
	// 		transforma = math.multiply(mproj, transforma);
	// 	} else {
	// 		transforma = math.multiply(mproj, cam);
	// 	}
		
	// 	transforma = math.flatten(math.transpose(transforma))._data;

	// 	let transfPtr = gl.getUniformLocation(prog, "transf");
	// 	gl.uniformMatrix4fv(transfPtr, false, transforma);
		
	// 	// Desenha triângulos - executa shaders
	// 	if (obj.useTexture) {

	// 		// let u_useTexturePtr = gl.getUniformLocation(prog, "u_useTexture");
	// 		// gl.uniform1i(u_useTexturePtr, 1);

	// 		setAttribute(prog, "texCoord", 2, 5*4, 3*4);

	// 		let texPtr = gl.getUniformLocation(prog, "tex");
	// 		let numberOfTriangles = (obj.coordinates.length / 5)  * 2;
	// 		let currentTextureIndice = 0;

	// 		for (let j = 0; j < numberOfTriangles; j += 5) {
	// 			// Cada bloco possui 2 triângulos
	// 			gl.uniform1i(texPtr, obj.textureIndices[currentTextureIndice]);
	// 			gl.drawArrays(gl.TRIANGLES, j, 3);
	// 			currentTextureIndice++;

	// 			gl.uniform1i(texPtr, obj.textureIndices[currentTextureIndice]);
	// 			gl.drawArrays(gl.TRIANGLES, j+2, 3);
	// 			currentTextureIndice++;
	// 		}
	// 	} else if (obj.useSolidColor) {
	// 		// gl.useProgram(progs[1]);
	// 		// console.log(progs)

	// 		// let u_useTexturePtr = gl.getUniformLocation(prog, "u_useTexture");
	// 		// gl.uniform1i(u_useTexturePtr, 0);
	// 		// let u_useSolidColorPtr = gl.getUniformLocation(prog, "u_useSolidColor");
	// 		// gl.uniform1i(u_useSolidColorPtr, 1);

	// 		console.log("passou");

	// 		// let u_solidColorPtr = gl.getUniformLocation(prog, "v_color");
	// 		// gl.uniform4fv(u_solidColorPtr, obj.color);
	// 	}
	// }	
	
	angle++;
	
	// requestAnimationFrame(draw);
}


function drawaux()
{
	var mproj = createPerspective(20, gl.canvas.width/gl.canvas.height, 1, 50);
	
	var matrotZ = math.matrix(
					[[Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0, 0.0], 
					[Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0, 0.0],
					[0.0,    0.0,   1.0, 0.0],
					[0.0,    0.0,   0.0, 1.0]]
					);
					
	var matrotY = math.matrix(
					[[Math.cos(angle*Math.PI/180.0), 0.0, -Math.sin(angle*Math.PI/180.0), 0.0], 
					[0.0, 1.0, 0.0, 0.0],
					[Math.sin(angle*Math.PI/180.0),  0.0, Math.cos(angle*Math.PI/180.0), 0.0],
					[0.0,    0.0,   0.0, 1.0]]
					);
					
	var matrotX = math.matrix(
					[[1.0, 0.0, 0.0, 0.0],
					[0.0, Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0], 
					[0.0, Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0],
					[0.0,    0.0,   0.0 ,1.0]]
					);                               
	
	var useTransformation = false;

	// var transforma = math.multiply(matrotY, matrotX);
	// transforma = math.multiply(matrotZ, transforma);
	// transforma = math.multiply(cam, transforma);
	// transforma = math.multiply(mproj, transforma);
	
	if (useTransformation) {
		var transforma = math.multiply(cam, matrotY)
		transforma = math.multiply(mproj, transforma);
	} else {
		var transforma = math.multiply(mproj, cam);
	}
	
	transforma = math.flatten(math.transpose(transforma))._data;

	transfPtr = gl.getUniformLocation(prog, "transf");
	gl.uniformMatrix4fv(transfPtr, false, transforma);
	
	
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	//desenha triÃ¢ngulos - executa shaders
	var texPtr = gl.getUniformLocation(prog, "tex");
	gl.uniform1i(texPtr, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	gl.drawArrays(gl.TRIANGLES, 2, 3);
	
	gl.uniform1i(texPtr, 1);
	gl.drawArrays(gl.TRIANGLES, 5, 3);
	gl.drawArrays(gl.TRIANGLES, 7, 3);
	
	gl.uniform1i(texPtr, 0);
	gl.drawArrays(gl.TRIANGLES, 10, 3);
	gl.uniform1i(texPtr, 1);
	gl.drawArrays(gl.TRIANGLES, 12, 3);

	// ------
	gl.uniform1i(texPtr, 1);
	gl.drawArrays(gl.TRIANGLES, 15, 3);
	gl.drawArrays(gl.TRIANGLES, 17, 3);

	gl.uniform1i(texPtr, 1);
	gl.drawArrays(gl.TRIANGLES, 20, 3);
	gl.drawArrays(gl.TRIANGLES, 22, 3);
	
	
	angle++;
	
	requestAnimationFrame(draw);
}