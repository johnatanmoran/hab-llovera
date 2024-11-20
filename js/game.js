// Configuración inicial del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
const spriteWidth = 90;
const spriteHeight = 60;
let pandaIndex = 0;
let points = 0;
let maxScore = 0;
let isJumping = false;
let pandaX = 50;
let pandaY = canvas.height - spriteHeight - 10;
let velocityY = 0;
const jumpPower = 10;
const gravity = 0.5;
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Configuración de obstáculos
const obstacles = [];
const obstacleWidth = 10;
let obstacleSpeed = 6;
const obstacleSpacing = 2400; // Mayor separación

// Cargar los sprites del panda
const pandaSprites = [];
for (let i = 1; i <= 9; i++) {
	const img = new Image();
	img.src = `media/killerpanda/sprites/panda_${i}.png`;
	pandaSprites.push(img);
}
console.log(pandaSprites);

// Variables para controlar el estado del juego
let gamePaused = true;
let gameOver = false;

// Dibujar el panda
function drawPanda() {
	ctx.fillStyle = "lightblue"; // Fondo visible para testeo
	ctx.fillRect(pandaX, pandaY, spriteWidth, spriteHeight);
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
	const shouldCreate = Math.random() > 0.4; // 60% de probabilidad
	if (shouldCreate) {
		const x = canvas.width;
		const minHeight = 20; // Altura mínima del obstáculo
		const maxHeight = canvas.height / 3; // Altura máxima
		const height =
			Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

		obstacles.push({ x, height });
	}
}

// Dibujar obstáculos
function drawObstacles() {
	obstacles.forEach((obstacle) => {
		ctx.fillStyle = "black"; // Color fijo
		ctx.fillRect(
			obstacle.x,
			canvas.height - obstacle.height - 10,
			obstacleWidth,
			obstacle.height
		);
	});
}

// Actualizar obstáculos
function updateObstacles() {
	obstacles.forEach((obstacle, index) => {
		obstacle.x -= obstacleSpeed;

		// Colisión
		if (
			pandaX + spriteWidth / 2 > obstacle.x &&
			pandaX < obstacle.x + obstacleWidth &&
			pandaY + spriteHeight > canvas.height - obstacle.height - 10
		) {
			points = Math.max(0, points - 10); // Puntuación nunca negativa
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
			if (points % 5 === 0) {
				obstacleSpeed += 0.125; // Incremento gradual de velocidad
			}
			if (points % 10 === 0) {
				pandaIndex++; // Cambia al siguiente sprite
				console.log(`Nivel: ${pandaIndex}`);
			}
		}
	});
}

// Mostrar mensajes en el canvas
function displayMessage(message, subMessage = "") {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	ctx.fillText(message, canvas.width / 2, canvas.height / 2);
	if (subMessage) {
		ctx.fillText(subMessage, canvas.width / 2, canvas.height / 2 + 30);
	}
}

// Manejo del salto
function jump() {
	if (!gamePaused && !gameOver) {
		if (!isJumping) {
			isJumping = true;
			velocityY = -jumpPower;
		} else if (velocityY < 0) {
			velocityY -= jumpPower / 2; // Salto acumulativo
		} else {
			velocityY -= jumpPower / 4; // Salto lento
		}
		console.log(`Salto de ${velocityY}`);
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
		if (pandaY >= canvas.height - spriteHeight - 10) {
			pandaY = canvas.height - spriteHeight - 10;
			isJumping = false;
		}
	}

	drawPanda();
	updateObstacles();
	drawObstacles();

	// Mostrar la puntuación
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.fillText(`Puntos: ${points}`, 10, 20);
	console.log(`Puntos: ${points}`);
}

// Manejo del final del juego
function handleGameOver() {
	highScores.push(points);
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
			highScores.map((score, i) => `${i + 1}. ${score} puntos`).join("\n")
		);
	}, 2000);
}

// Iniciar el juego
function startGame() {
	points = 0; // Puntuación inicial
	pandaIndex = 0;
	obstacles.length = 0;
	obstacleSpeed = 3;
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
