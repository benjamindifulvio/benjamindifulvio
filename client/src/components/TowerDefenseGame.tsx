import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Entity extends Point {
  size: number;
  color: string;
  angle?: number;
}

interface Enemy extends Entity {
  speed: number;
  hp: number;
  type: "triangle" | "square" | "pentagon";
}

interface Bullet extends Entity {
  vx: number;
  vy: number;
}

export function TowerDefenseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });

  // Game state refs (to avoid re-renders during loop)
  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const towerRef = useRef<Point>({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const lastShotRef = useRef<number>(0);

  const initGame = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Set dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    towerRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    enemiesRef.current = [];
    bulletsRef.current = [];
    setScore(0);
    setGameOver(false);
  };

  const spawnEnemy = (canvas: HTMLCanvasElement) => {
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x = 0, y = 0;
    
    switch(side) {
      case 0: x = Math.random() * canvas.width; y = -30; break;
      case 1: x = canvas.width + 30; y = Math.random() * canvas.height; break;
      case 2: x = Math.random() * canvas.width; y = canvas.height + 30; break;
      case 3: x = -30; y = Math.random() * canvas.height; break;
    }

    const types: Enemy["type"][] = ["triangle", "square", "pentagon"];
    const type = types[Math.floor(Math.random() * types.length)];
    let color = "#ef4444"; // red
    let speed = 1.5;
    let hp = 1;

    if (type === "square") { color = "#3b82f6"; speed = 1; hp = 2; } // blue, slower, tanky
    if (type === "pentagon") { color = "#a855f7"; speed = 2; hp = 1; } // purple, fast

    enemiesRef.current.push({
      x, y,
      size: 20,
      color,
      speed,
      hp,
      type
    });
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (let i = 1; i <= sides; i += 1) {
      ctx.lineTo(x + radius * Math.cos(i * 2 * Math.PI / sides), y + radius * Math.sin(i * 2 * Math.PI / sides));
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const update = () => {
    if (!canvasRef.current || !isPlaying || gameOver) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = "rgba(0,0,0,0.2)"; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Tower
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#22c55e";
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(towerRef.current.x, towerRef.current.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw Turret
    const angle = Math.atan2(mousePos.y - towerRef.current.y, mousePos.x - towerRef.current.x);
    ctx.save();
    ctx.translate(towerRef.current.x, towerRef.current.y);
    ctx.rotate(angle);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, -5, 35, 10);
    ctx.restore();

    // Shooting
    const now = Date.now();
    if (now - lastShotRef.current > 150) { // Fire rate
      bulletsRef.current.push({
        x: towerRef.current.x + Math.cos(angle) * 35,
        y: towerRef.current.y + Math.sin(angle) * 35,
        size: 4,
        color: "#fff",
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8
      });
      lastShotRef.current = now;
    }

    // Spawn Enemies
    if (now - lastSpawnRef.current > 1000 - Math.min(score * 10, 800)) { // Increase difficulty
      spawnEnemy(canvas);
      lastSpawnRef.current = now;
    }

    // Update Bullets
    bulletsRef.current.forEach((b, i) => {
      b.x += b.vx;
      b.y += b.vy;
      
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();

      // Remove if off screen
      if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
        bulletsRef.current.splice(i, 1);
      }
    });

    // Update Enemies
    enemiesRef.current.forEach((e, i) => {
      const dx = towerRef.current.x - e.x;
      const dy = towerRef.current.y - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Move towards tower
      e.x += (dx / dist) * e.speed;
      e.y += (dy / dist) * e.speed;

      // Draw Enemy
      let sides = 3;
      if (e.type === "square") sides = 4;
      if (e.type === "pentagon") sides = 5;
      
      // Rotate effect
      e.angle = (e.angle || 0) + 0.05;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      drawPolygon(ctx, 0, 0, e.size, sides, e.color);
      ctx.restore();

      // Collision with Tower (Game Over)
      if (dist < 25 + e.size) {
        setGameOver(true);
        setIsPlaying(false);
      }

      // Collision with Bullets
      bulletsRef.current.forEach((b, bIndex) => {
        const bdx = b.x - e.x;
        const bdy = b.y - e.y;
        const bDist = Math.sqrt(bdx * bdx + bdy * bdy);
        
        if (bDist < e.size + b.size) {
          e.hp--;
          bulletsRef.current.splice(bIndex, 1);
          if (e.hp <= 0) {
            enemiesRef.current.splice(i, 1);
            setScore(prev => prev + 10);
            
            // Particle effect could go here
          }
        }
      });
    });

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      frameRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, gameOver, mousePos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
      <canvas 
        ref={canvasRef}
        className="w-full h-full cursor-crosshair block"
      />
      
      {/* HUD */}
      <div className="absolute top-4 left-4 text-white font-mono text-xl font-bold">
        SCORE: {score}
      </div>

      {/* Start Screen */}
      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <h3 className="text-4xl font-display font-bold text-white mb-4">Tower Defense</h3>
          <p className="text-gray-300 mb-8 max-w-md text-center">
            Protect the core! Aim with your mouse. Geometric enemies approach from all sides.
          </p>
          <button 
            onClick={() => { initGame(); setIsPlaying(true); }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            <Play className="w-5 h-5" /> Start Game
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <h3 className="text-5xl font-display font-bold text-red-500 mb-2">GAME OVER</h3>
          <p className="text-2xl text-white mb-8 font-mono">Final Score: {score}</p>
          <button 
            onClick={() => { initGame(); setIsPlaying(true); }}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
        </div>
      )}
    </div>
  );
}
