function createPerspective(fovy, aspect, near, far)
{
    fovy = fovy*Math.PI/180.0;

    var fy = 1/math.tan(fovy/2.0);
    var fx = fy/aspect;
    var B = -2*far*near/(far-near);
    var A = -(far+near)/(far-near);

	var proj = math.matrix(
							[[ fx, 0.0,  0.0, 0.0],
							 [0.0,  fy,  0.0, 0.0],
							 [0.0, 0.0,    A,   B],
							 [0.0, 0.0, -1.0, 0.0]]
							);
							
	return proj;
}

function createCamera(pos, target, up)
{  
    var zc = math.subtract(pos, target);
    zc = math.divide(zc, math.norm(zc));
    
    var yt = math.subtract(up, pos);
    yt = math.divide(yt, math.norm(yt));
    
    var xc = math.cross(yt, zc);
    xc = math.divide(xc, math.norm(xc));
    
    var yc = math.cross(zc, xc);
    yc = math.divide(yc,math.norm(yc));
    
    var mt = math.inv(math.transpose(math.matrix([xc,yc,zc])));
    
    mt = math.resize(mt, [4,4], 0);
    mt._data[3][3] = 1;
    
    var mov = math.matrix([[1, 0, 0, -pos[0]], 
                            [0, 1, 0, -pos[1]],
                            [0, 0, 1, -pos[2]],
                            [0, 0, 0, 1]]);
    
    var cam = math.multiply(mt, mov);
    
    return cam;
}             

function moveCameraLeft() {
	let angle = 2.5;
	let radians = (angle * Math.PI) / 180;

	// Calcular as novas coordenadas para onde a câmera está olhando
	let dx = targetPosition[0] - camPosition[0];
	let dz = targetPosition[2] - camPosition[2];

	let newX = dx * Math.cos(radians) + dz * Math.sin(radians);
	let newZ = dz * Math.cos(radians) - dx * Math.sin(radians);

	targetPosition = [
		camPosition[0] + newX, 
		targetPosition[1], 
		camPosition[2] + newZ
	];

	return createCamera(
		camPosition,
		targetPosition,
		[camPosition[0], camPosition[1] + 1, camPosition[2]]
	);
}

function moveCameraRight() {
	let angle = 2.5;
	let radians = (angle * Math.PI) / 180;

	// Calcular as novas coordenadas para onde a câmera está olhando
	let dx = targetPosition[0] - camPosition[0];
	let dz = targetPosition[2] - camPosition[2];

	let newX = dx * math.cos(radians) - dz * math.sin(radians);
	let newZ = dx * math.sin(radians) + dz * math.cos(radians);

	targetPosition = [
		camPosition[0] + newX, 
		targetPosition[1], 
		camPosition[2] + newZ
	];

	return createCamera(
		camPosition,
		targetPosition,
		[camPosition[0], camPosition[1] + 1, camPosition[2]]
	);
}

function handleKeyPress(event)
{
	var stepSize = 0.1; 
	var key = event.key;

	console.log(targetPosition);

	if (key == "ArrowLeft")
		return moveCameraLeft();
	else if (key == "ArrowRight")
		return moveCameraRight();
	else if (key == "ArrowUp") {
		camPosition[2] -= stepSize;
		targetPosition[2] -= stepSize;
	}else if (key == "ArrowDown") {
		camPosition[2] += stepSize;
		targetPosition[2] += stepSize;
	}
	var u_camPosPtr = gl.getUniformLocation(prog, "u_camPos");
	gl.uniform3fv(u_camPosPtr, camPosition);

	// targetPosition = [
	// 	camPosition[0] - initialCamPosition[0], 
	// 	camPosition[1] - initialCamPosition[1], 
	// 	camPosition[2] - initialCamPosition[2]
	// ];

	return createCamera(
		camPosition, 
		targetPosition,
		[camPosition[0], camPosition[1] + 1, camPosition[2]]
	);
}

function createObjectBuffers(objects) {
	for (let i = 0; i < objects.length; i++) {
		let obj = objects[i];
		let coordTriangles = new Float32Array(obj.coordinates);
		
		// Buffer das coordenas
		let bufCoordinatePtr = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufCoordinatePtr);
		gl.bufferData(gl.ARRAY_BUFFER, coordTriangles, gl.STATIC_DRAW);

		obj.bufCoordinatePtr = bufCoordinatePtr;

		// Buffer das normais
		let normals = new Float32Array(obj.normals);
		let bufNormalPtr = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufNormalPtr);
		gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

		obj.bufNormalPtr = bufNormalPtr;
	}
}

function createTextures(teximg) {
	for (let i = 0; i < teximg.length; i++) {
		let tex = gl.createTexture();
	
		gl.activeTexture(gl.TEXTURE0 + i);
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);        
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximg[i]);
	}
}

function setAttribute(
	prog,    // Programa
	name,    // Nome do atributo
	size,    // Quantidade de dados em cada processamento
	stride,  // Tamanho do bloco de dados a processar em cada passo
	offset   // Salto inicial
) {
	let positionPtr = gl.getAttribLocation(prog, name);
	gl.enableVertexAttribArray(positionPtr);
	gl.vertexAttribPointer(positionPtr, 
		size,
		gl.FLOAT, // Tipo de cada dado (tamanho)
		false,    // Não normalizar
		stride,
		offset
	);
}