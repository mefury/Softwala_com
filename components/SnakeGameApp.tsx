import React, { useState, useEffect, useCallback, useRef } from "react";
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface SnakeGameAppProps {
    onClose: () => void;
}

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SPEED = 180;

export const SnakeGameApp: React.FC<SnakeGameAppProps> = ({ onClose }) => {
    const [snake, setSnake] = useState<Point[]>([
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ]);
    const [food, setFood] = useState<Point>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const generateFood = useCallback((currentSnake: Point[]): Point => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            const isOnSnake = currentSnake.some(
                (segment) => segment.x === newFood.x && segment.y === newFood.y
            );
            if (!isOnSnake) break;
        }
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake([
            { x: 10, y: 10 },
            { x: 10, y: 11 },
            { x: 10, y: 12 }
        ]);
        setFood({ x: 5, y: 5 });
        setDirection({ x: 0, y: -1 });
        setIsGameOver(false);
        setScore(0);
    };

    const moveSnake = useCallback(() => {
        if (isGameOver) return;

        setSnake((prevSnake) => {
            const head = prevSnake[0];
            const newHead = {
                x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
                y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
            };

            // Check collision with self
            if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                setIsGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check if food eaten
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((s) => s + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, isGameOver, generateFood]);

    useEffect(() => {
        const speed = Math.max(60, INITIAL_SPEED - Math.floor(score / 50) * 10);
        gameLoopRef.current = setInterval(moveSnake, speed);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [moveSnake, score]);



    // Handle Keyboard for Desktop Testing
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
                case "ArrowDown": if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
                case "ArrowLeft": if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
                case "ArrowRight": if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    return (
        <div className="absolute inset-0 z-[100] bg-zinc-950 flex flex-col select-none touch-none overflow-hidden">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* AppBar */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 z-30">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-tight italic uppercase">Neon Snake</h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Score: <span className="text-green-400">{score}</span></p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Game Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 lg:p-4 gap-4 lg:gap-6 overflow-hidden relative">
                <div className="flex-1 flex flex-col items-center justify-center w-full overflow-hidden py-2 lg:py-4 gap-4 lg:gap-6">
                    <div
                        className="relative bg-zinc-950 border-4 border-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 shrink-0"
                        style={{
                            width: 'min(80vw, 360px)',
                            height: 'min(80vw, 360px)',
                            display: 'grid',
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                        }}
                    >
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                                backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
                            }}
                        />

                        {/* Snake */}
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className={`relative rounded-sm shadow-sm transition-all duration-200 transition-colors
                                ${i === 0 ? 'bg-green-400 z-10 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : ''}`}
                                style={{
                                    gridColumn: segment.x + 1,
                                    gridRow: segment.y + 1,
                                    backgroundColor: i > 0 ? `rgba(22, 163, 74, ${Math.max(0.3, 1 - i / snake.length)})` : undefined
                                }}
                            >
                                {/* Snake Eyes */}
                                {i === 0 && (
                                    <div className={`absolute inset-0 flex items-center justify-around p-[2px]
                                    ${direction.x !== 0 ? 'flex-col' : 'flex-row'}`}>
                                        <div className="w-1 h-1 bg-black rounded-full" />
                                        <div className="w-1 h-1 bg-black rounded-full" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Food */}
                        <div
                            className="bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)] z-0"
                            style={{
                                gridColumn: food.x + 1,
                                gridRow: food.y + 1,
                                transform: 'scale(0.8)'
                            }}
                        />

                        {/* Game Over Overlay */}
                        {isGameOver && (
                            <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in-95 duration-300">
                                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">Crashed</h3>
                                <p className="text-zinc-500 text-xs mb-10 font-bold tracking-[0.2em]">SCORE: {score}</p>
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black uppercase text-sm active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    <ArrowPathIcon className="h-5 w-5" />
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop Controls (Now Below Board) */}
                    <div className="hidden lg:flex flex-col gap-4 w-full max-w-[360px]">
                        <div className="px-6 py-4 bg-zinc-900/40 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                <h4 className="text-zinc-400 text-[10px] uppercase font-bold tracking-[0.2em]">Keyboard Master</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                                <div className="flex items-center justify-between group">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Move</span>
                                    <div className="flex gap-1">
                                        <span className="px-1.5 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-[10px] text-zinc-300 font-mono">↑↓←→</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Close</span>
                                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-[10px] text-zinc-300 font-mono">ESC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Controls - Hidden on Desktop */}
                <div className="lg:hidden mt-4 lg:mt-8 grid grid-cols-3 gap-3 pb-4 shrink-0">
                    <div />
                    <button
                        onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
                        className="h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center active:bg-zinc-800 active:scale-90 transition-all text-white border border-white/5"
                    >
                        <ChevronUpIcon className="h-8 w-8" />
                    </button>
                    <div />
                    <button
                        onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
                        className="h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center active:bg-zinc-800 active:scale-90 transition-all text-white border border-white/5"
                    >
                        <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
                        className="h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center active:bg-zinc-800 active:scale-90 transition-all text-white border border-white/5"
                    >
                        <ChevronDownIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
                        className="h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center active:bg-zinc-800 active:scale-90 transition-all text-white border border-white/5"
                    >
                        <ChevronRightIcon className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
};

