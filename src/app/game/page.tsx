"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const BreakoutGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter(); // Initialize useRouter
  let animationFrameId: number; // To track the requestAnimationFrame ID
  let isGameRunning = true; // Flag to stop the game loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 900;

    // Game variables
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 50;
    let dx = 2;
    let dy = -2;
    const ballRadius = 10;

    const paddleHeight = 10;
    const paddleWidth = 100;
    let paddleX = (canvas.width - paddleWidth) / 2;

    let rightPressed = false;
    let leftPressed = false;

    const rowCount = 3;
    const columnCount = 5;
    const blockPadding = 4;
    const blockHeight = 140;
    const totalPadding = (columnCount - 1) * blockPadding;
    const blockWidth = (canvas.width - totalPadding) / columnCount;
    const blockOffsetTop = 0;

    // Blocks array
    const blocks: {
      x: number;
      y: number;
      visible: boolean;
      image: HTMLImageElement;
    }[][] = [];
    for (let c = 0; c < columnCount; c++) {
      blocks[c] = [];
      for (let r = 0; r < rowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, visible: true, image: new Image() };
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assets: any = {}; // Will hold loaded assets

    const loadAssets = async () => {
      const response = await fetch("/assets.json"); // Load the JSON file
      const data = await response.json();

      // Load images
      assets.pagebg = new Image();
      assets.pagebg.src = data.pagebg;

      assets.gamebg = new Image();
      assets.gamebg.src = data.gamebg;

      assets.ball = new Image();
      assets.ball.src = data.ball;

      assets.paddle = new Image();
      assets.paddle.src = data.paddle;

      assets.blocks = data.blocks.map((src: string) => {
        const img = new Image();
        img.src = src;
        return img;
      });

      // Assign random block images
      for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          blocks[c][r].image =
            assets.blocks[Math.floor(Math.random() * assets.blocks.length)];
        }
      }
    };

    const resetBlocks = () => {
      for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          blocks[c][r].visible = true;
        }
      }
    };

    const resetGame = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height - 50;

      dx = (Math.random() > 0.5 ? 1 : -1) * 4;
      dy = -4;

      paddleX = (canvas.width - paddleWidth) / 2;
      resetBlocks();
    };

    const checkWinCondition = () => {
      const allBlocksBroken = blocks.every((column) =>
        column.every((block) => !block.visible)
      );
      if (allBlocksBroken) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isGameRunning = false; // Stop the game loop
        router.push("/congratz"); // Redirect to /congratz
      }
    };

    const drawBackground = () => {
      ctx.drawImage(assets.gamebg, 0, 0, canvas.width, canvas.height);
    };

    const drawBall = () => {
      ctx.drawImage(
        assets.ball,
        ballX - ballRadius,
        ballY - ballRadius,
        ballRadius * 2,
        ballRadius * 2
      );
    };

    const drawPaddle = () => {
      ctx.drawImage(
        assets.paddle,
        paddleX,
        canvas.height - paddleHeight - 20,
        paddleWidth,
        20
      );
    };

    const drawBlocks = () => {
      for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          const block = blocks[c][r];
          if (block.visible) {
            const blockX = c * (blockWidth + blockPadding);
            const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
            block.x = blockX;
            block.y = blockY;
            ctx.drawImage(block.image, blockX, blockY, blockWidth, blockHeight);
          }
        }
      }
    };

    const collisionDetection = () => {
      for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          const block = blocks[c][r];
          if (block.visible) {
            if (
              ballX > block.x &&
              ballX < block.x + blockWidth &&
              ballY > block.y &&
              ballY < block.y + blockHeight
            ) {
              dy = -dy;
              block.visible = false;
              checkWinCondition(); // Check if all blocks are broken
            }
          }
        }
      }
    };

    const movePaddle = () => {
      if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
          paddleX = canvas.width - paddleWidth;
        }
      }
      if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
          paddleX = 0;
        }
      }
    };

    const draw = () => {
      if (!isGameRunning) return; // Stop the game loop if the flag is false
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawBlocks();
      drawBall();
      movePaddle();
      drawPaddle();
      collisionDetection();

      if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
      }
      if (ballY + dy < ballRadius) {
        dy = -dy;
      } else if (ballY + dy > canvas.height - ballRadius - 20) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          alert("GAME OVER");
          resetGame();
        }
      }

      ballX += dx;
      ballY += dy;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      animationFrameId = requestAnimationFrame(draw); // Store the animation ID
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      }
    };

    loadAssets().then(() => {
      isGameRunning = true;
      draw();
    });

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      isGameRunning = false; // Stop the game loop
      cancelAnimationFrame(animationFrameId); // Cancel the animation frame
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [router]);

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: `url('/assets/pagebg.png')`,
        backgroundSize: "cover",
      }}
    >
      <canvas ref={canvasRef} className="border border-gray-700 shadow-lg" />
    </div>
  );
};

export default BreakoutGame;
