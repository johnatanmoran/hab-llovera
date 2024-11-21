// Configuración inicial del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
const spriteWidth = 60;
const spriteHeight = 60;
let pandaIndex = 0;
let points = 0;
let maxScore = 0;
let isJumping = false;
let pandaX = 10;
let pandaY = canvas.height - spriteHeight - 10;
let velocityY = 1;
const jumpPower = 15;
const gravity = 0.5;
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Configuración de obstáculos
const obstacles = [];
const obstacleWidth = 15;
let obstacleSpeed = 4;
const obstacleSpacing = 1800; // Mayor separación

// Cargar los sprites del panda
const pandaSprites = [];
for (let i = 1; i <= 11; i++) {
	const img = new Image();
	img.src = `media/killerpanda/sprites/panda_${i}.png`;
	pandaSprites.push(img);
}

// Cargo los sprites del bambu
const obstacleImg = new Image();
obstacleImg.src = `media/killerpanda/sprites/bambu_01.png`;

// Cargo los sprites de las plantas
const plantaImg = new Image();
plantaImg.src = `media/killerpanda/sprites/planta_01.png`;

// Configuración de plantas
const plantas = [];
const plantasSpacing = 600; // Mayor separación

//console.log(pandaSprites);

// Variables para controlar el estado del juego
let gamePaused = true;
let gameOver = false;

// Dibujar el panda
function drawPanda() {
	//ctx.fillStyle = "lightblue"; // Fondo visible para testeo
	//ctx.fillRect(pandaX, pandaY, spriteWidth, spriteHeight);
	ctx.drawImage(
		pandaSprites[pandaIndex],
		pandaX,
		pandaY,
		spriteWidth,
		spriteHeight
	);
}

// Generar nuevos obstáculos
function createObstacle() {
	if (gamePaused || gameOver) return;

	// Probabilidad de generar un obstáculo
	const shouldCreate = Math.random() > 0.2; // 80% de probabilidad
	if (shouldCreate) {
		const x = canvas.width;
		const minHeight = 20; // Altura mínima del obstáculo
		const maxHeight = canvas.height / 3; // Altura máxima
		const height =
			Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

		obstacles.push({ x, height });
	}
}

// Generar nuevas plantas
function createPlanta() {
	if (gamePaused || gameOver) return;

	// Probabilidad de generar una planta
	const shouldCreatePlanta = Math.random() > 0.1; // 90% de probabilidad
	if (shouldCreatePlanta) {
		const x = canvas.width;
		const alpha = Math.random() * Math.PI * 2;
		plantas.push({ x, alpha });
	}
}

// Dibujar obstáculos
function drawObstacles() {
	obstacles.forEach((obstacle) => {
		ctx.drawImage(
			obstacleImg,
			obstacle.x,
			canvas.height - obstacle.height - 10,
			obstacleWidth,
			obstacle.height
		);
		//ctx.fillStyle = "darkgreen"; // Color fijo
		//ctx.fillRect(
		//	obstacle.x,
		//	canvas.height - obstacle.height - 10,
		//	obstacleWidth,
		//	obstacle.height
		//);
	});
}

// Dibujar plantas
function drawPlantas() {
	plantas.forEach((planta) => {
		ctx.drawImage(
			plantaImg,
			planta.x,
			canvas.height - planta.height - 10,
			40,
			40
		);
	});
}

// Actualizar obstáculos
function updateObstacles() {
	obstacles.forEach((obstacle, index) => {
		obstacle.x -= obstacleSpeed;

		// Colisión
		if (
			pandaX + spriteWidth > obstacle.x &&
			pandaX < obstacle.x + obstacleWidth &&
			pandaY + spriteHeight > canvas.height - obstacle.height - 10
		) {
			points = Math.max(0, points - 3); // Puntuación nunca negativa
			pandaIndex--;
			obstacles.splice(index, 1);

			if (points === 0) {
				gameOver = true;
				handleGameOver();
			}
		}

		// Obstáculo superado
		if (obstacle.x + obstacleWidth < 0) {
			obstacles.splice(index, 1);
			points++;
			if (points > maxScore) maxScore = points; // Puntuación máxima
			if (points % 3 === 0) {
				obstacleSpeed += 0.5; // Incremento gradual de velocidad
				pandaIndex++; // Cambia al siguiente sprite
				console.log(`Nivel: ${pandaIndex}`);
				if (pandaIndex > 10) {
					pandaIndex = 0;
					obstacleSpeed++;
					pandaX += 10;
				}
			}
		}
	});
}

// Actualizar plantas
function updatePlantas() {
	plantas.forEach((planta, index) => {
		planta.x -= plantasSpeed;

		// planta pasa
		if (planta.x + 40 < 0) {
			plantas.splice(index, 1);
		}
	});
}

// Mostrar mensajes en el canvas
function displayMessage(message, subMessage = "") {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.font = "12px Arial";
	ctx.textAlign = "center";
	ctx.fillText(message, canvas.width / 2, canvas.height / 2);
	if (subMessage) {
		ctx.fillText(subMessage, canvas.width / 2, canvas.height / 2 + 30);
	}
}

// Manejo del salto
function jumpOld() {
	if (!gamePaused && !gameOver) {
		if (!isJumping) {
			isJumping = true;
			velocityY = -jumpPower;
		} else {
			velocityY -= jumpPower / 2; // Salto lento
		}
	}
}

function jump() {
	if (!isJumping) {
		isJumping = true;
		velocityY = -jumpPower;
	}
}

// Actualizar el juego
function updateGame() {
	if (gamePaused || gameOver) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Manejar la gravedad y el salto
	if (isJumping) {
		pandaY += velocityY;
		velocityY += gravity;
		if (pandaY > canvas.height - spriteHeight - 10) {
			pandaY = canvas.height - spriteHeight - 10;
			isJumping = false;
			console.log("Salto finalizado");
		} else if (pandaY === canvas.height - spriteHeight) {
			console.log(`Techo a ${pandaY}`);
		} else {
			console.log(`Va por ${pandaY}`);
		}
	}

	drawPanda();
	updateObstacles();
	drawObstacles();
	updatePlantas();
	drawPlantas();

	// Mostrar la puntuación
	ctx.fillStyle = "black";
	ctx.font = "10px Arial";
	ctx.textAlign = "left";
	ctx.fillText(`Puntos: ${points}`, 30, 30);
	//console.log(`Puntos: ${points}`);

	// Mostrar la puntuación maxima
	ctx.fillStyle = "black";
	ctx.font = "10px Arial";
	ctx.textAlign = "right";
	ctx.fillText(`Puntuación máxima: ${maxScore}`, canvas.width - 40, 30);
	//console.log(`Puntuación máxima: ${maxScore}`);
}

// Manejo del final del juego
function handleGameOver() {
	highScores.push(maxScore);
	highScores.sort((a, b) => b - a);
	highScores = highScores.slice(0, 5);
	localStorage.setItem("highScores", JSON.stringify(highScores));

	gamePaused = true;

	displayMessage(
		`¡Juego terminado!, Puntuación más alta: ${maxScore} puntos`
	);
	setTimeout(() => {
		displayMessage(
			"Puntuaciones más altas:",
			highScores
				.map((score, i) => `${i + 1}º. ${score} puntos\n`)
				.join("\n")
		);
	}, 5000);
}

// Iniciar el juego
function startGame() {
	points = 0; // Puntuación inicial
	pandaIndex = 0;
	obstacles.length = 0;
	obstacleSpeed = 4;
	gamePaused = false;
	gameOver = false;
	gameLoop();
}

// Dibujar botón de inicio
function drawStartButton() {
	ctx.fillStyle = "green";
	ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 30, 200, 60);
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Iniciar", canvas.width / 2, canvas.height / 2 + 10);
}

// Manejo de eventos para el botón
canvas.addEventListener("click", () => {
	if (gamePaused) {
		startGame();
	}
});
canvas.addEventListener("touchstart", (e) => {
	e.preventDefault();
	if (gamePaused) {
		startGame();
	} else {
		jump();
	}
});

// Eventos de teclado
document.addEventListener("keydown", (e) => {
	if (e.code === "Space") {
		jump();
	}
	if (e.code === "Enter" && gamePaused) {
		startGame();
	} else if (e.code === "space" && !gamePaused) {
		gamePaused = true;
		console.log("Pausado");
	}
});

// Mostrar instrucciones iniciales
drawStartButton();

// Bucle del juego
function gameLoop() {
	if (!gamePaused && !gameOver) {
		updateGame();
		requestAnimationFrame(gameLoop);
	}
}

// Iniciar generación de obstáculos
setInterval(() => {
	if (!gamePaused && !gameOver) {
		createObstacle();
	}
}, obstacleSpacing);

setInterval(() => {
	if (!gamePaused && !gameOver) {
		createPlanta();
	}
}, plantSpacing);
