var teximg = [];
var texSrc = [
	"barbie.jpeg", 
	"elemental.png", 
	"indiana_jones.jpg", 
	"little_mermaid.jpg", 
	"mission_impossible.jpg", 
	"spider_man.jpg", 
	"the_flash.jpg",
	"normal_map.png",
	"sala_barbie_logo.png",
	"MargotRobbie_barbie.png",
];
var loadTexs = 0;
var gl;
var prog;
var progTexture;
var progSolidColor;
var angle = 0;

// var initialCamPosition = [0, 15, 26];
// let targetPosition = [0, 1, -2];
var initialCamPosition = [0, 2, 30];
let targetPosition = [0, 0, 0];

var camPosition = initialCamPosition.slice();
var cam = createCamera(camPosition, 
					   targetPosition, 
					   [camPosition[0], camPosition[1] + 1, camPosition[2]]
					   );

var lightPosition = [0.0, 2.0, -2.0];
					   
document.addEventListener("keydown", function(event) {
	cam = handleKeyPress(event);
});

function init()
{
    for(i = 0; i < texSrc.length; i++)
    {	
        teximg[i] = new Image();
        teximg[i].src = "images/" + texSrc[i];
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
       progs = initGL();
       configScene();
       draw();
    }
}   

var objects = [
	// { // Cubo Entrada Cinema
	// 	coordinates:  [
	// 		// Quad 1 (atras)
	// 		1.5,  0.5, -32.0,
	// 		1.5, -0.5, -32.0,
	// 		2.5, -0.5, -32.0,
	// 		2.5,  0.5, -32.0,
	// 		1.5,  0.5, -32.0,
		  
	// 		// Quad 2 (lado esquerdo)
	// 		1.5, -0.5, -32.0,
	// 		1.5,  0.5, -32.0,
	// 		1.5,  0.5, -31.0,
	// 		1.5, -0.5, -31.0,
	// 		1.5, -0.5, -32.0,
		  
	// 		// Quad 3 (embaixo)
	// 		1.5, -0.5, -32.0,
	// 		2.5, -0.5, -32.0,
	// 		2.5, -0.5, -31.0,
	// 		1.5, -0.5, -31.0,
	// 		1.5, -0.5, -32.0,
		  
	// 		// Quad 4 (lado direito)
	// 		2.5, -0.5, -32.0,
	// 		2.5,  0.5, -32.0,
	// 		2.5, -0.5, -31.0,
	// 		2.5,  0.5, -32.0,
	// 		2.5,  0.5, -31.0,
		  
	// 		// Quad 5 (frente)
	// 		1.5,  0.5, -32.0,
	// 		1.5, -0.5, -32.0,
	// 		2.5, -0.5, -32.0,
	// 		2.5,  0.5, -32.0,
	// 		1.5,  0.5, -32.0,
		  
	// 		// Quad 6 (em cima)
	// 		1.5,  0.5, -31.0,
	// 		1.5,  0.5, -32.0,
	// 		2.5,  0.5, -32.0,
	// 		2.5,  0.5, -31.0,
	// 		1.5,  0.5, -31.0,
	// 	], 
	// 	normals: [
	// 		// atras
	// 		0.0,  0.0, -1.0,  
	// 		0.0,  0.0, -1.0,  
	// 		0.0,  0.0, -1.0,  
	// 		0.0,  0.0, -1.0,  
	// 		0.0,  0.0, -1.0,  

	// 		// lado esquerdo
	// 		-1.0,  0.0,  0.0,  
	// 		-1.0,  0.0,  0.0,  
	// 		-1.0,  0.0,  0.0,  
	// 		-1.0,  0.0,  0.0,  
	// 		-1.0,  0.0,  0.0,  

	// 		// embaixo
	// 		0.0, -1.0,  0.0,  
	// 		0.0, -1.0,  0.0,  
	// 		0.0, -1.0,  0.0,  
	// 		0.0, -1.0,  0.0,  
	// 		0.0, -1.0,  0.0,  

	// 		// lado direito
	// 		1.0,  0.0,  0.0,  
	// 		1.0,  0.0,  0.0, 
	// 		1.0,  0.0,  0.0, 
	// 		1.0,  0.0,  0.0, 
	// 		1.0,  0.0,  0.0, 

 	// 		// frente
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 

	// 		// em cima 
	// 		0.0,  1.0,  0.0, 
	// 		0.0,  1.0,  0.0, 
	// 		0.0,  1.0,  0.0, 
	// 		0.0,  1.0,  0.0, 
	// 		0.0,  1.0,  0.0, 
	// 	],
	// 	useTexture: false,
	// 	useSolidColor: true,
	// 	color: [0.945, 0.553, 0.737],
	// 	transformation: "all",
	// 	centerCoordinates: [2, 0, -31.5]
	// },
	{ // Cubo Cor Solida
		coordinates:  [
			// Quad 1 (atras)
			1.5,  0.5, -11.5,
			1.5, -0.5, -11.5,
			2.5, -0.5, -11.5,
			2.5,  0.5, -11.5,
			1.5,  0.5, -11.5,
		  
			// Quad 2 (lado esquerdo)
			1.5, -0.5, -11.5,
			1.5,  0.5, -11.5,
			1.5,  0.5, -10.5,
			1.5, -0.5, -10.5,
			1.5, -0.5, -11.5,
		  
			// Quad 3 (embaixo)
			1.5, -0.5, -11.5,
			2.5, -0.5, -11.5,
			2.5, -0.5, -10.5,
			1.5, -0.5, -10.5,
			1.5, -0.5, -11.5,
		  
			// Quad 4 (lado direito)
			2.5, -0.5, -11.5,
			2.5,  0.5, -11.5,
			2.5, -0.5, -10.5,
			2.5,  0.5, -11.5,
			2.5,  0.5, -10.5,
		  
			// Quad 5 (frente)
			1.5,  0.5, -10.5,
			1.5, -0.5, -10.5,
			2.5, -0.5, -10.5,
			2.5,  0.5, -10.5,
			1.5,  0.5, -10.5,
		  
			// Quad 6 (em cima)
			1.5,  0.5, -10.5,
			1.5,  0.5, -11.5,
			2.5,  0.5, -11.5,
			2.5,  0.5, -10.5,
			1.5,  0.5, -10.5,
		], 
		normals: [
			// atras
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  

			// lado esquerdo
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  

			// embaixo
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  

			// lado direito
			1.0,  0.0,  0.0,  
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 

 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 

			// em cima 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [0.945, 0.553, 0.737],
		transformation: "all",
		centerCoordinates: [2, 0, -11]
	},
	{ // Cubo Textura
		coordinates:  [
			// Quad 1 (atras)
			-2.5,  0.5, -11.5, 0.0, 0.0,
			-2.5, -0.5, -11.5, 0.0, 1.0,
			-1.5, -0.5, -11.5, 1.0, 1.0,
			-1.5,  0.5, -11.5, 1.0, 0.0,
			-2.5,  0.5, -11.5, 0.0, 0.0,
		  
			// Quad 2 (lado esquerdo)
			-2.5, -0.5, -11.5, 0.0, 1.0,
			-2.5,  0.5, -11.5, 0.0, 0.0,
			-2.5,  0.5, -10.5, 1.0, 0.0,
			-2.5, -0.5, -10.5, 1.0, 1.0,
			-2.5, -0.5, -11.5, 0.0, 1.0,
		  
			// Quad 3 (embaixo)
			-2.5, -0.5, -11.5, 0.0, 0.0,
			-1.5, -0.5, -11.5, 1.0, 0.0,
			-1.5, -0.5, -10.5, 1.0, 1.0,
			-2.5, -0.5, -10.5, 0.0, 1.0,
			-2.5, -0.5, -11.5, 0.0, 0.0,
		  
			// Quad 4 (lado direito)
			-1.5, -0.5, -10.5, 0.0, 1.0,
			-1.5,  0.5, -10.5, 0.0, 0.0,
			-1.5,  0.5, -11.5, 1.0, 0.0,
			-1.5, -0.5, -11.5, 1.0, 1.0,
			-1.5, -0.5, -10.5, 0.0, 1.0,
		  
			// Quad 5 (frente)
			-2.5,  0.5, -10.5, 0.0, 0.0,
			-2.5, -0.5, -10.5, 0.0, 1.0,
			-1.5, -0.5, -10.5, 1.0, 1.0,
			-1.5,  0.5, -10.5, 1.0, 0.0,
			-2.5,  0.5, -10.5, 0.0, 0.0,
		  
			// Quad 6 (em cima)
			-2.5,  0.5, -10.5, 0.0, 0.0, 
			-2.5,  0.5, -11.5, 0.0, 1.0,
			-1.5,  0.5, -11.5, 1.0, 1.0,
			-1.5,  0.5, -10.5, 1.0, 0.0,
			-2.5,  0.5, -10.5, 0.0, 0.0,
		], 
		normals: [
			// atras
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  
			0.0,  0.0, -1.0,  

			// lado esquerdo
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  
			-1.0,  0.0,  0.0,  

			// embaixo
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  
			0.0, -1.0,  0.0,  

			// lado direito
			1.0,  0.0,  0.0,  
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 

 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 

			// em cima 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
			0.0,  1.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,  
		],
		transformation: "Y",
		centerCoordinates: [-2, 0, -11]
	},
	{ // Poster Barbie Entrada Cinema
		coordinates: [
			1.5,  2.3, -10.0, 0.0, 0.0,
			1.5,  0.7, -10.0, 0.0, 1.0,
			2.5,  0.7, -10.0, 1.0, 1.0,
			2.5,  2.3, -10.0, 1.0, 0.0,
			1.5,  2.3, -10.0, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			0, 0, 
		],
 	},  
	// { // Parede Entrada Cinema Esquerda
	// 	coordinates: [
	// 		-5.1,  4.0, 0.0, 
	// 		-5.1,  0.0, 0.0, 
	// 		-1.0,  0.0, 0.0, 
	// 		-1.0,  4.0, 0.0, 
	// 		-5.1,  4.0, 0.0, 
	// 	], 
	// 	normals: [ 
 	// 		// frente
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 	],
	// 	useTexture: false,
	// 	useSolidColor: true,
	// 	color: [0.945, 0.553, 0.737],
	//  useNormalMap: true,
	// },    
	// { // Parede Entrada Cinema Direita
	// 	coordinates: [
	// 		1.0,  4.0, 0.0, 
	// 		1.0,  0.0, 0.0, 
	// 		5.1,  0.0, 0.0, 
	// 		5.1,  4.0, 0.0, 
	// 		1.0,  4.0, 0.0, 
	// 	], 
	// 	normals: [ 
 	// 		// frente
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 	],
	// 	useTexture: false,
	// 	useSolidColor: true,
	// 	color: [0.945, 0.553, 0.737],
    //  useNormalMap: true,
	// },  
	// { // Parede Entrada Cinema Cima
	// 	coordinates: [
	// 		-1.0,  4.0, 0.0, 
	// 		-1.0,  2.5, 0.0, 
	// 		 1.0,  2.5, 0.0, 
	// 		 1.0,  4.0, 0.0, 
	// 		-1.0,  4.0, 0.0, 
	// 	], 
	// 	normals: [ 
 	// 		// frente
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 		0.0,  0.0,  1.0, 
	// 	],
	// 	useTexture: false,
	// 	useSolidColor: true,
	// 	color: [0.945, 0.553, 0.737],
	// 	useNormalMap: true,
	// },     
	{ // Teto
		coordinates: [
			 5.1,  4.0, -13.1, 
			-5.1,  4.0, -13.1, 
			-5.1,  4.0,   0.0,  
			 5.1,  4.0,   0.0,  
			 5.1,  4.0, -13.1, 
		], 
		normals: [ 
			0.0,  -1.0,  0.0, 
			0.0,  -1.0,  0.0, 
			0.0,  -1.0,  0.0, 
			0.0,  -1.0,  0.0, 
			0.0,  -1.0,  0.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [1, 0.9804, 0.9804],
	},  
	{ // Parede Direita
		coordinates: [
			5.1,  4.0, -13.1, 
			5.1,  0.0, -13.1, 
			5.1,  0.0,   0.0,  
			5.1,  4.0,   0.0,  
			5.1,  4.0, -13.1, 
		], 
		normals: [ 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [1, 0.9804, 0.9804],
		useNormalMap: true,
	},  
	{ // Parede Esquerda 
		coordinates: [
			-5.1,  4.0, -13.1,
			-5.1,  0.0, -13.1,
			-5.1,  0.0,   0.0,
			-5.1,  4.0,   0.0,
			-5.1,  4.0, -13.1,
		], 
		normals: [ 
 			// frente
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [1, 0.9804, 0.9804],
		useNormalMap: true,
	},  
	{ // Parede Entrada Sala Esquerda
		coordinates: [
			-5.1,  4.0, -13.1, 
			-5.1,  0.0, -13.1, 
			-1.0,  0.0, -13.1, 
			-1.0,  4.0, -13.1, 
			-5.1,  4.0, -13.1, 
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [0.945, 0.553, 0.737],
		useNormalMap: true,
	},    
	{ // Parede Entrada Sala Direita
		coordinates: [
			1.0,  4.0, -13.1, 
			1.0,  0.0, -13.1, 
			5.1,  0.0, -13.1, 
			5.1,  4.0, -13.1, 
			1.0,  4.0, -13.1, 
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [0.945, 0.553, 0.737],
		useNormalMap: true,
	},  
	{ // Parede Entrada Sala Cima
		coordinates: [
			-1.0,  4.0, -13.1, 
			-1.0,  2.5, -13.1, 
			 1.0,  2.5, -13.1, 
			 1.0,  4.0, -13.1, 
			-1.0,  4.0, -13.1, 
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: false,
		useSolidColor: true,
		color: [0.945, 0.553, 0.737],
		useNormalMap: true,
	},    
	{ // Parede Entrada Sala Cima - nome
		coordinates: [
			-2.0,  3.5, -13.0, 0.0, 0.0, 
			-2.0,  2.8, -13.0, 0.0, 1.0,
			 2.0,  2.8, -13.0, 1.0, 1.0,
			 2.0,  3.5, -13.0, 1.0, 0.0,
			-2.0,  3.5, -13.0, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			8, 8, 
		],
	},      
	{ // Poster Esquerda 1
		coordinates: [
			-5.0,  2.3, -1.0, 0.0, 0.0,
			-5.0,  0.7, -1.0, 0.0, 1.0,
			-5.0,  0.7, -2.0, 1.0, 1.0,
			-5.0,  2.3, -2.0, 1.0, 0.0,
			-5.0,  2.3, -1.0, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			1, 1, 
		]
	},  
	{ // Poster Esquerda 2
		coordinates: [
			-5.0,  2.3, -3.5, 0.0, 0.0,
			-5.0,  0.7, -3.5, 0.0, 1.0,
			-5.0,  0.7, -4.5, 1.0, 1.0,
			-5.0,  2.3, -4.5, 1.0, 0.0,
			-5.0,  2.3, -3.5, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			2, 2, 
		],
	},  
	{ // Poster Esquerda 3
		coordinates: [
			-5.0,  2.3, -6.0, 0.0, 0.0,
			-5.0,  0.7, -6.0, 0.0, 1.0,
			-5.0,  0.7, -7.0, 1.0, 1.0,
			-5.0,  2.3, -7.0, 1.0, 0.0,
			-5.0,  2.3, -6.0, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
			1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			3, 3, 
		],
	},  
	{ // Poster Direita 1
		coordinates: [
			5.0,  2.3, -1.0, 1.0, 0.0,
			5.0,  0.7, -1.0, 1.0, 1.0,
			5.0,  0.7, -2.0, 0.0, 1.0,
			5.0,  2.3, -2.0, 0.0, 0.0,
			5.0,  2.3, -1.0, 1.0, 0.0,
		], 
		normals: [ 
 			// frente
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			4, 4,
		],
	},  
	{ // Poster Direita 2
		coordinates: [
			5.0,  2.3, -3.5, 1.0, 0.0,
			5.0,  0.7, -3.5, 1.0, 1.0,
			5.0,  0.7, -4.5, 0.0, 1.0,
			5.0,  2.3, -4.5, 0.0, 0.0,
			5.0,  2.3, -3.5, 1.0, 0.0,
		], 
		normals: [ 
 			// frente
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			5, 5,
		],
	},  
	{ // Poster Direita 3
		coordinates: [
			5.0,  2.3, -6, 1.0, 0.0,
			5.0,  0.7, -6, 1.0, 1.0,
			5.0,  0.7, -7.5, 0.0, 1.0,
			5.0,  2.3, -7.5, 0.0, 0.0,
			5.0,  2.3, -6, 1.0, 0.0,
		], 
		normals: [ 
 			// frente
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
			-1.0,  0.0,  0.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			6, 6,
		],
	},      
	{ // Poster Dentro cinema
		coordinates: [
			-1.0,  3.3, -35.0, 0.0, 0.0,
			-1.0,  0.2, -35.0, 0.0, 1.0,
			 1.0,  0.2, -35.0, 1.0, 1.0,
			 1.0,  3.3, -35.0, 1.0, 0.0,
			-1.0,  3.3, -35.0, 0.0, 0.0,
		], 
		normals: [ 
 			// frente
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
			0.0,  0.0,  1.0, 
		],
		useTexture: true,
		useSolidColor: false,
		textureIndices: [ // By triangle
			0, 0, 
		],
	},     
]


function configScene() {
	createObjectBuffers(objects);
	createTextures(teximg);

	let u_lightDirectionPtr = gl.getUniformLocation(prog, "u_lightDirection");
	gl.uniform3fv(u_lightDirectionPtr, /*[10, 15, 0]*/[0.2, 1, 20.7]);
        
	let u_lightColorPtr = gl.getUniformLocation(prog, "u_lightColor");
	gl.uniform3fv(u_lightColorPtr, [1, 1, 1]);

	var u_lightPosPtr = gl.getUniformLocation(prog, "u_lightPos");	
	gl.uniform3fv(u_lightPosPtr, [0, -1, 6]);
	
	var u_camPosPtr = gl.getUniformLocation(prog, "u_camPos");
	gl.uniform3fv(u_camPosPtr, camPosition);
}

function draw()
{
	var mproj = createPerspective(20, gl.canvas.width/gl.canvas.height, 1, 50);
	
	let matrotZ = math.matrix(
		[[Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0, 0.0], 
		[Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0, 0.0],
		[0.0,    0.0,   1.0, 0.0],
		[0.0,    0.0,   0.0, 1.0]]
	);
		
	let matrotY = math.matrix(
		[[Math.cos(angle*Math.PI/180.0), 0.0, -Math.sin(angle*Math.PI/180.0), 0.0], 
		[0.0, 1.0, 0.0, 0.0],
		[Math.sin(angle*Math.PI/180.0),  0.0, Math.cos(angle*Math.PI/180.0), 0.0],
		[0.0,    0.0,   0.0, 1.0]]
		);
		
	let matrotX = math.matrix(
		[[1.0, 0.0, 0.0, 0.0],
		[0.0, Math.cos(angle*Math.PI/180.0), -Math.sin(angle*Math.PI/180.0), 0.0], 
		[0.0, Math.sin(angle*Math.PI/180.0),  Math.cos(angle*Math.PI/180.0), 0.0],
		[0.0,    0.0,   0.0 ,1.0]]
	);  

	let lightPos = lightPosition.concat([1.0]);
	lightPos = math.multiply(matrotX, math.transpose(lightPos));
	lightPos = math.resize(lightPos,[3]);
	var lightPosPtr = gl.getUniformLocation(prog, "u_lightPos");
	gl.uniform3fv(lightPosPtr, math.flatten(math.transpose(lightPos))._data);    
	
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );


	for (let i = 0; i < objects.length; i++) {
		let obj = objects[i];

		// Normais
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufNormalPtr);
		setAttribute(prog, "a_normal", 3, 0, 0);		

		// Coordenadas
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufCoordinatePtr);
		stride = obj.useTexture ? 5 : 3;
		setAttribute(prog, "a_position", 3, stride * 4, 0);		

		let transforma = math.identity(4);
		let transformaProj;

		if (obj.transformation) {

			let objCenter = obj.centerCoordinates;
			let matTranslateBack = math.matrix([
				[1.0, 0.0, 0.0, -objCenter[0]],
				[0.0, 1.0, 0.0, -objCenter[1]],
				[0.0, 0.0, 1.0, -objCenter[2]],
				[0.0, 0.0, 0.0, 1.0]
			]);
			  
			let matTranslateForward = math.matrix([
				[1.0, 0.0, 0.0, objCenter[0]],
				[0.0, 1.0, 0.0, objCenter[1]],
				[0.0, 0.0, 1.0, objCenter[2]],
				[0.0, 0.0, 0.0, 1.0]
			]);

			switch (obj.transformation) {
				case "X":
					transforma = matrotX
					break;
				case "Y":
					transforma = math.multiply(matTranslateForward, matrotY);
					transforma = math.multiply(transforma, matTranslateBack);
					break;
				case "Z":
					transforma = matrotZ;
					break;
				case "all":
					transforma = math.multiply(matTranslateForward, matrotZ);
					transforma = math.multiply(transforma, matrotY);
					transforma = math.multiply(transforma, matrotX);
					transforma = math.multiply(transforma, matTranslateBack);
					break;

			}
			transformaProj = math.multiply(cam, transforma);
			transformaProj = math.multiply(mproj, transformaProj);
		} else {
			transformaProj = math.multiply(mproj, cam);
		}

		transformaProj = math.flatten(math.transpose(transformaProj))._data;           
        let u_transfProjPtr = gl.getUniformLocation(prog, "u_transfProj");
        gl.uniformMatrix4fv(u_transfProjPtr, false, transformaProj);
		
		transforma = math.flatten(math.transpose(transforma))._data;
		let u_transfPtr = gl.getUniformLocation(prog, "u_transf");
		gl.uniformMatrix4fv(u_transfPtr, false, transforma);
		
		if (obj.useNormalMap) {
			var u_texNormalPtr = gl.getUniformLocation(prog, "u_useNormalMap");
			gl.uniform1i(u_texNormalPtr, 1);

			var u_texNormalPtr = gl.getUniformLocation(prog, "u_normalMap");
			gl.uniform1i(u_texNormalPtr, 7);
		} else {
			var u_texNormalPtr = gl.getUniformLocation(prog, "u_useNormalMap");
			gl.uniform1i(u_texNormalPtr, 0);
		}

		// Desenha triângulos - executa shaders
		if (obj.useTexture) {

			let u_useTexturePtr = gl.getUniformLocation(prog, "u_useTexture");
			gl.uniform1i(u_useTexturePtr, 1);

			setAttribute(prog, "a_texCoord", 2, 5*4, 3*4);

			let u_texPtr = gl.getUniformLocation(prog, "u_tex");
			let numberOfTriangles = (obj.coordinates.length / 5)  * 2;
			let currentTextureIndice = 0;

			for (let j = 0; j < numberOfTriangles; j += 5) {
				// Cada bloco possui 2 triângulos
				gl.uniform1i(u_texPtr, obj.textureIndices[currentTextureIndice]);
				gl.drawArrays(gl.TRIANGLES, j, 3);
				currentTextureIndice++;

				gl.uniform1i(u_texPtr, obj.textureIndices[currentTextureIndice]);
				gl.drawArrays(gl.TRIANGLES, j+2, 3);
				currentTextureIndice++;
			}

		} else if (obj.useSolidColor) {
			let u_useTexturePtr = gl.getUniformLocation(prog, "u_useTexture");
			gl.uniform1i(u_useTexturePtr, 0);

			let u_solidColorPtr = gl.getUniformLocation(prog, "u_color");
			gl.uniform3fv(u_solidColorPtr, obj.color);

			let numberOfTriangles = (obj.coordinates.length / 5)  * 2;
			for (let j = 0; j < numberOfTriangles; j += 5) {
				// Cada bloco possui 2 triângulos
				gl.drawArrays(gl.TRIANGLES, j, 3);
				gl.drawArrays(gl.TRIANGLES, j+2, 3);
			}
		}
	}	
	
	angle++;
	
	requestAnimationFrame(draw);
}

