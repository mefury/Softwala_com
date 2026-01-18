import React, { useState, useEffect, useCallback, useRef } from "react";
import { XMarkIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

interface TetrisGameAppProps {
    onClose: () => void;
}

const COLS = 10;
const ROWS = 20;

const COLORS = [
    'bg-zinc-800/50', // Empty
    'bg-cyan-500',    // I
    'bg-blue-500',    // J
    'bg-orange-500',  // L
    'bg-yellow-500',  // O
    'bg-green-500',   // S
    'bg-purple-500',  // T
    'bg-red-500'      // Z
];

const GHOST_COLORS = [
    'bg-transparent',
    'bg-cyan-500/20',
    'bg-blue-500/20',
    'bg-orange-500/20',
    'bg-yellow-500/20',
    'bg-green-500/20',
    'bg-purple-500/20',
    'bg-red-500/20'
];

const BORDER_COLORS = [
    'border-zinc-800',
    'border-cyan-400/50',
    'border-blue-400/50',
    'border-orange-400/50',
    'border-yellow-400/50',
    'border-green-400/50',
    'border-purple-400/50',
    'border-red-400/50'
];

const SHAPES = [
    [],
    [[1, 1, 1, 1]], // I
    [[2, 0, 0], [2, 2, 2]], // J
    [[0, 0, 3], [3, 3, 3]], // L
    [[4, 4], [4, 4]], // O
    [[0, 5, 5], [5, 5, 0]], // S
    [[0, 6, 0], [6, 6, 6]], // T
    [[7, 7, 0], [0, 7, 7]]  // Z
];

export const TetrisGameApp: React.FC<TetrisGameAppProps> = ({ onClose }) => {
    const [grid, setGrid] = useState<number[][]>(Array(ROWS).fill(0).map(() => Array(COLS).fill(0)));
    const [activePiece, setActivePiece] = useState<{ pos: { x: number, y: number }, shape: number[][] }>({ pos: { x: 3, y: 0 }, shape: SHAPES[1] });
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const checkCollision = useCallback((pos: { x: number, y: number }, shape: number[][], currentGrid: number[][]) => {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] !== 0) {
                    const newX = pos.x + x;
                    const newY = pos.y + y;
                    if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX] !== 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, []);

    const spawnPiece = useCallback(() => {
        const shapeIdx = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
        const newPiece = { pos: { x: 3, y: 0 }, shape: SHAPES[shapeIdx] };

        if (checkCollision(newPiece.pos, newPiece.shape, grid)) {
            setIsGameOver(true);
        } else {
            setActivePiece(newPiece);
        }
    }, [grid, checkCollision]);

    const rotate = useCallback(() => {
        const newShape = activePiece.shape[0].map((_, i) => activePiece.shape.map(row => row[i]).reverse());
        if (!checkCollision(activePiece.pos, newShape, grid)) {
            setActivePiece(prev => ({ ...prev, shape: newShape }));
        }
    }, [activePiece, grid, checkCollision]);

    const move = useCallback((dir: { x: number, y: number }) => {
        const newPos = { x: activePiece.pos.x + dir.x, y: activePiece.pos.y + dir.y };
        if (!checkCollision(newPos, activePiece.shape, grid)) {
            setActivePiece(prev => ({ ...prev, pos: newPos }));
            return true;
        }
        return false;
    }, [activePiece, grid, checkCollision]);

    const lockPiece = useCallback(() => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            activePiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        const gridY = activePiece.pos.y + y;
                        const gridX = activePiece.pos.x + x;
                        if (gridY >= 0) newGrid[gridY][gridX] = value;
                    }
                });
            });

            // Clear lines
            let linesCleared = 0;
            const filteredGrid = newGrid.filter(row => {
                const isFull = row.every(cell => cell !== 0);
                if (isFull) linesCleared++;
                return !isFull;
            });

            while (filteredGrid.length < ROWS) {
                filteredGrid.unshift(Array(COLS).fill(0));
            }

            if (linesCleared > 0) {
                setScore(s => s + (linesCleared * 100 * linesCleared)); // Bonus for multi-line
            }

            return filteredGrid;
        });
        spawnPiece();
    }, [activePiece, spawnPiece]);

    const drop = useCallback(() => {
        if (!move({ x: 0, y: 1 })) {
            lockPiece();
        }
    }, [move, lockPiece]);

    const hardDrop = useCallback(() => {
        let currentPos = { ...activePiece.pos };
        while (!checkCollision({ x: currentPos.x, y: currentPos.y + 1 }, activePiece.shape, grid)) {
            currentPos.y += 1;
        }
        setActivePiece(prev => ({ ...prev, pos: currentPos }));
        // We delay lockPiece slightly to allow render of the drop if needed, 
        // but here we can just call it or set state then call it.
        // For simplicity, let's just lock it.
        const newGrid = grid.map(row => [...row]);
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const gridY = currentPos.y + y;
                    const gridX = currentPos.x + x;
                    if (gridY >= 0) newGrid[gridY][gridX] = value;
                }
            });
        });

        let linesCleared = 0;
        const filteredGrid = newGrid.filter(row => {
            const isFull = row.every(cell => cell !== 0);
            if (isFull) linesCleared++;
            return !isFull;
        });
        while (filteredGrid.length < ROWS) {
            filteredGrid.unshift(Array(COLS).fill(0));
        }
        setScore(s => s + (linesCleared * 100 * linesCleared) + 20); // Bonus for hard drop
        setGrid(filteredGrid);
        spawnPiece();
    }, [activePiece, grid, checkCollision, spawnPiece]);

    const getGhostPos = () => {
        let ghostPos = { ...activePiece.pos };
        while (!checkCollision({ x: ghostPos.x, y: ghostPos.y + 1 }, activePiece.shape, grid)) {
            ghostPos.y += 1;
        }
        return ghostPos;
    };

    useEffect(() => {
        if (!isGameOver) {
            gameLoopRef.current = setInterval(drop, Math.max(100, 800 - Math.floor(score / 500) * 100));
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [drop, isGameOver, score]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isGameOver) return;
            switch (e.key) {
                case "ArrowLeft": move({ x: -1, y: 0 }); break;
                case "ArrowRight": move({ x: 1, y: 0 }); break;
                case "ArrowDown": move({ x: 0, y: 1 }); break;
                case "ArrowUp": rotate(); break;
                case " ":
                    e.preventDefault();
                    hardDrop();
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [move, rotate, hardDrop, isGameOver]);

    // Initial spawn
    useEffect(() => {
        spawnPiece();
    }, []);

    const resetGame = () => {
        setGrid(Array(ROWS).fill(0).map(() => Array(COLS).fill(0)));
        setIsGameOver(false);
        setScore(0);
        spawnPiece();
    };

    const ghostPos = getGhostPos();

    return (
        <div className="absolute inset-0 bg-zinc-950 flex flex-col z-[100] select-none touch-none overflow-hidden">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* AppBar */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 z-30">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-tight italic uppercase">Tetris Pro</h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Score: <span className="text-blue-400">{score}</span></p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Level: <span className="text-purple-400">{Math.floor(score / 1000) + 1}</span></p>
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
                        className="relative bg-zinc-950 border-4 border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 shrink-0"
                        style={{
                            width: 'min(70vw, 280px)',
                            height: 'min(100vw, 560px)',
                            maxHeight: 'min(45vh, 560px)',
                            display: 'grid',
                            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                            gridTemplateRows: `repeat(${ROWS}, 1fr)`
                        }}
                    >
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                                backgroundSize: `${100 / COLS}% ${100 / ROWS}%`
                            }}
                        />

                        {/* Render Grid Blocks */}
                        {grid.map((row, y) => row.map((cell, x) => (
                            cell !== 0 && (
                                <div
                                    key={`${y}-${x}`}
                                    className={`border-[1.5px] ${BORDER_COLORS[cell]} ${COLORS[cell]} rounded-[2px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]`}
                                />
                            ) || <div key={`${y}-${x}`} className="border-[0.5px] border-white/5" />
                        )))}

                        {/* Render Ghost Piece */}
                        {!isGameOver && activePiece.shape.map((row, y) => row.map((cell, x) => (
                            cell !== 0 && (
                                <div
                                    key={`ghost-${y}-${x}`}
                                    className={`border-[1px] ${BORDER_COLORS[cell]} opacity-30 ${GHOST_COLORS[cell]} absolute rounded-[2px]`}
                                    style={{
                                        width: `${100 / COLS}%`,
                                        height: `${100 / ROWS}%`,
                                        left: `${(ghostPos.x + x) * (100 / COLS)}%`,
                                        top: `${(ghostPos.y + y) * (100 / ROWS)}%`
                                    }}
                                />
                            )
                        )))}

                        {/* Render Active Piece */}
                        {!isGameOver && activePiece.shape.map((row, y) => row.map((cell, x) => (
                            cell !== 0 && (
                                <div
                                    key={`active-${y}-${x}`}
                                    className={`border-[1.5px] ${BORDER_COLORS[cell]} ${COLORS[cell]} absolute rounded-[2px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] z-10`}
                                    style={{
                                        width: `${100 / COLS}%`,
                                        height: `${100 / ROWS}%`,
                                        left: `${(activePiece.pos.x + x) * (100 / COLS)}%`,
                                        top: `${(activePiece.pos.y + y) * (100 / ROWS)}%`
                                    }}
                                />
                            )
                        )))}

                        {/* Game Over Overlay */}
                        {isGameOver && (
                            <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in duration-300">
                                <h3 className="text-3xl font-black text-white uppercase italic mb-1 tracking-tighter">FINISH</h3>
                                <p className="text-zinc-500 text-xs mb-8 font-bold tracking-[0.2em]">SCORE: {score}</p>
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-black uppercase text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                >
                                    <ArrowPathIcon className="h-5 w-5" />
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop Controls (Now Below Board) */}
                    <div className="hidden lg:flex flex-col gap-4 w-full max-w-[280px]">
                        <div className="px-5 py-4 bg-zinc-900/40 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <h4 className="text-zinc-400 text-[10px] uppercase font-bold tracking-[0.2em]">Keyboard Master</h4>
                            </div>
                            <div className="grid grid-cols-1 gap-y-3">
                                <div className="flex items-center justify-between group">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Move & Rotate</span>
                                    <div className="flex gap-1">
                                        <span className="px-1.5 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-[10px] text-zinc-300 font-mono">↑↓←→</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Hard Drop</span>
                                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-[10px] text-zinc-300 font-mono tracking-widest">SPACE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Controls - Hidden on Desktop */}
                <div className="lg:hidden grid grid-cols-4 gap-3 w-full max-w-[320px] pb-4 shrink-0">
                    <button
                        onClick={() => move({ x: -1, y: 0 })}
                        className="h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white border border-white/5 active:bg-zinc-800 active:scale-90 transition-all"
                    >
                        <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => move({ x: 0, y: 1 })}
                        className="h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white border border-white/5 active:bg-zinc-800 active:scale-90 transition-all"
                    >
                        <ChevronDownIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => move({ x: 1, y: 0 })}
                        className="h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white border border-white/5 active:bg-zinc-800 active:scale-90 transition-all"
                    >
                        <ChevronRightIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={rotate}
                        className="h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white border border-white/5 active:bg-zinc-800 active:scale-90 transition-all"
                    >
                        <ArrowPathIcon className="h-8 w-8" />
                    </button>
                    <button
                        onClick={hardDrop}
                        className="col-span-4 h-14 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 font-bold uppercase text-xs tracking-widest border border-white/5 active:bg-zinc-700 transition-all"
                    >
                        Hard Drop
                    </button>
                </div>
            </div>
        </div>
    );
};

