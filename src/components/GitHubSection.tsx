import { useState, useEffect } from "react";
import { Github, GitBranch, Star, Eye, Calendar, Award, GitPullRequest, Flame, Play, Square } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface SnakeNode {
  x: number;
  y: number;
}

export function GitHubSection() {
  // Contribution Graph Setup: 7 rows (days), 35 columns (weeks)
  const rows = 7;
  const cols = 35;
  const [grid, setGrid] = useState<number[][]>([]);
  const [snake, setSnake] = useState<SnakeNode[]>([
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 }
  ]);
  const [snakeDirection, setSnakeDirection] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [food, setFood] = useState<SnakeNode>({ x: 15, y: 4 });
  const [isSnakeActive, setIsSnakeActive] = useState(true);
  const [snakeSpeed, setSnakeSpeed] = useState(150);

  // Initialize Contribution Grid
  useEffect(() => {
    const newGrid: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const rowArr: number[] = [];
      for (let c = 0; c < cols; c++) {
        // Random background levels: 0 (none), 1 (light), 2 (medium), 3 (dark), 4 (intense)
        // High density of contributions to look active and impressive
        const rand = Math.random();
        if (rand < 0.2) rowArr.push(0);
        else if (rand < 0.5) rowArr.push(1);
        else if (rand < 0.8) rowArr.push(2);
        else if (rand < 0.95) rowArr.push(3);
        else rowArr.push(4);
      }
      newGrid.push(rowArr);
    }
    setGrid(newGrid);
  }, []);

  // Contribution Snake Loop
  useEffect(() => {
    if (!isSnakeActive || grid.length === 0) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        
        // Find direction towards food
        let dx = 0;
        let dy = 0;
        if (head.x < food.x) dx = 1;
        else if (head.x > food.x) dx = -1;
        else if (head.y < food.y) dy = 1;
        else if (head.y > food.y) dy = -1;

        // Prevent 180-degree immediate turns
        if (prevSnake.length > 1) {
          const neck = prevSnake[1];
          if (head.x + dx === neck.x && head.y + dy === neck.y) {
            // Alternative move
            if (dx !== 0) {
              dy = head.y < rows - 1 ? 1 : -1;
              dx = 0;
            } else {
              dx = head.x < cols - 1 ? 1 : -1;
              dy = 0;
            }
          }
        }

        // Calculate new head
        let newX = (head.x + dx + cols) % cols;
        let newY = (head.y + dy + rows) % rows;

        const newHead = { x: newX, y: newY };
        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newX === food.x && newY === food.y) {
          // Snake eats food, increase grid cell contribution!
          setGrid((prevGrid) => {
            const nextGrid = prevGrid.map(row => [...row]);
            if (nextGrid[food.y] && nextGrid[food.y][food.x] !== undefined) {
              nextGrid[food.y][food.x] = Math.min(nextGrid[food.y][food.x] + 1, 4);
            }
            return nextGrid;
          });

          // Generate new food
          let fx = Math.floor(Math.random() * cols);
          let fy = Math.floor(Math.random() * rows);
          setFood({ x: fx, y: fy });
        } else {
          // Pop tail
          newSnake.pop();
        }

        return newSnake;
      });
    }, snakeSpeed);

    return () => clearInterval(interval);
  }, [isSnakeActive, food, grid, snakeSpeed]);

  const recentRepos = [
    {
      name: "hadith-books-web",
      description: "Comprehensive multi-collection Hadith archiving index. Built using HTML, CSS, JavaScript, and PHP with SQL databases.",
      stars: 12,
      forks: 3,
      lang: "PHP"
    },
    {
      name: "raahride-android",
      description: "Real-time Uber-like ride-sharing utility client built natively in Android Studio using Kotlin and Firebase Realtime databases.",
      stars: 24,
      forks: 7,
      lang: "Kotlin"
    },
    {
      name: "pushups-tracker-fit",
      description: "Lightweight Kotlin app using device proximity sensors to automate hands-free repetition counts.",
      stars: 8,
      forks: 1,
      lang: "Kotlin"
    },
    {
      name: "browser-games-arcade",
      description: "Fun, highly interactive sports and arcade suite containing custom simulations of Cricket, Chess, Snake, and Badminton.",
      stars: 15,
      forks: 2,
      lang: "JavaScript"
    }
  ];

  return (
    <div className="space-y-8" id="github-section-container">
      {/* Profile Info Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GitHub Mini-Profile Card */}
        <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-lg flex-shrink-0">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white font-extrabold text-2xl font-mono">
                SS
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-1.5">
                Shahid Saleem
              </h4>
              <p className="text-xs text-sky-400 font-mono">@shahidsaleemitoo</p>
              <p className="text-xs text-slate-400 mt-1">
                BCA Student | Android & Web Developer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 text-center border-y border-white/5 py-4">
            <div>
              <span className="block text-lg font-bold text-white font-mono">42</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Repos</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-white font-mono">1.2K</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Commits</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-white font-mono">148</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Followers</span>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition cursor-pointer"
          >
            <Github className="w-4 h-4" />
            Follow on GitHub
          </a>
        </div>

        {/* GitHub Statistics Tiles */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/20 border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Yearly Contributions</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">1,424</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">In current cycle</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/20 border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Current Streak</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">42 Days</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Longest: 124 Days</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/20 border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <GitPullRequest className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Pull Requests</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">148</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">100% Merged status</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/20 border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Global Rank</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">Top 8%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Open Source Contributor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Snake Animation & Grid Board */}
      <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 relative overflow-hidden">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              Contribution Board (Live Simulation)
            </h4>
            <p className="text-xs text-slate-400">
              Watch Shahid's custom GitHub contribution snake slither and write code in real time!
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSnakeActive(!isSnakeActive)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-sky-500/30 hover:text-sky-400 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {isSnakeActive ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  Pause Snake
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current animate-pulse" />
                  Run Snake
                </>
              )}
            </button>
            <div className="flex gap-1 items-center">
              <span className="text-[10px] text-slate-500 font-semibold mr-1">Speed:</span>
              <button onClick={() => setSnakeSpeed(250)} className={`px-2 py-0.5 text-[9px] rounded font-mono ${snakeSpeed === 250 ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" : "bg-slate-900 text-slate-400"}`}>Slow</button>
              <button onClick={() => setSnakeSpeed(150)} className={`px-2 py-0.5 text-[9px] rounded font-mono ${snakeSpeed === 150 ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" : "bg-slate-900 text-slate-400"}`}>Mid</button>
              <button onClick={() => setSnakeSpeed(80)} className={`px-2 py-0.5 text-[9px] rounded font-mono ${snakeSpeed === 80 ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" : "bg-slate-900 text-slate-400"}`}>Fast</button>
            </div>
          </div>
        </div>

        {/* The Grid Canvas */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[640px] flex flex-col gap-1.5">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1.5 justify-between">
                {row.map((val, cIdx) => {
                  // Check if snake segment resides at rIdx, cIdx
                  const snakeSegmentIdx = snake.findIndex(s => s.x === cIdx && s.y === rIdx);
                  const isSnakeHead = snakeSegmentIdx === 0;
                  const isSnakeBody = snakeSegmentIdx > 0;
                  const isFood = food.x === cIdx && food.y === rIdx;

                  let cellColor = "bg-slate-900 border border-white/[0.02]"; // Level 0
                  if (val === 1) cellColor = "bg-emerald-950/40 border border-emerald-950/50"; // Level 1
                  if (val === 2) cellColor = "bg-emerald-900/60 border border-emerald-900/75"; // Level 2
                  if (val === 3) cellColor = "bg-emerald-700/80 border border-emerald-700/90"; // Level 3
                  if (val === 4) cellColor = "bg-emerald-500 border border-emerald-400"; // Level 4

                  // Snake Overrides
                  if (isSnakeHead) {
                    cellColor = "bg-sky-400 scale-110 shadow-[0_0_10px_rgba(56,189,248,0.8)] z-10 rounded-sm";
                  } else if (isSnakeBody) {
                    cellColor = "bg-indigo-500 scale-105 shadow-[0_0_6px_rgba(99,102,241,0.5)] z-10 rounded-sm";
                  } else if (isFood) {
                    cellColor = "bg-amber-400 animate-pulse scale-110 shadow-[0_0_12px_rgba(251,191,36,0.9)] z-10 rounded-sm";
                  }

                  return (
                    <div
                      key={cIdx}
                      className={`h-4 flex-1 rounded-sm transition-all duration-300 ${cellColor}`}
                      title={`${isSnakeHead ? "Snake Head" : isSnakeBody ? "Snake Body" : isFood ? "Fruit block" : `Level ${val} contribution`}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-medium">
          <div className="flex gap-3 items-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-sky-400 inline-block"></span> Head</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-indigo-500 inline-block"></span> Body</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400 inline-block"></span> Food block</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <span className="w-2.5 h-2.5 bg-slate-900 rounded-sm inline-block border border-white/[0.02]"></span>
            <span className="w-2.5 h-2.5 bg-emerald-950/40 rounded-sm inline-block border border-emerald-950/50"></span>
            <span className="w-2.5 h-2.5 bg-emerald-900/60 rounded-sm inline-block border border-emerald-900/75"></span>
            <span className="w-2.5 h-2.5 bg-emerald-700/80 rounded-sm inline-block border border-emerald-700/90"></span>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm inline-block border border-emerald-400"></span>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Popular Language Chart & Repositories list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Languages */}
        <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Language Stack
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Kotlin (Android Native)</span>
                  <span className="font-mono text-white">45%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>JavaScript & HTML/CSS</span>
                  <span className="font-mono text-white">35%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>PHP & Databases</span>
                  <span className="font-mono text-white">12%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: "12%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>C & C++ (Algos)</span>
                  <span className="font-mono text-white">8%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 border-t border-white/5 pt-4 mt-6">
            Metrics aggregated across 42 active project trees.
          </div>
        </div>

        {/* Recent Repositories */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-950/40 border border-white/5">
          <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-400" />
            Recent Open-Source Repositories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentRepos.map((repo, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950 border border-white/5 hover:border-sky-500/20 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                    {repo.name}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed min-h-[36px]">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-white/5 mt-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
                    {repo.lang}
                  </span>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
