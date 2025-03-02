"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParticlesBackground from '../_Components/Particles';

interface Player {
  player: string;
  score: number;
}

const medals = ['🥇', '🥈', '🥉'];

const Page = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<Player[]>(
          'https://metapong-contract-7tit.onrender.com/api/leaderboard'
        );
        const filteredPlayers = response.data.filter(player => player.player );
        setPlayers(filteredPlayers);
      } catch (err) {
        setError('Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 text-white">
        {/* Fully Responsive Leaderboard Heading */}
        <h1 className="text-center mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#19bdbd]">
            Leader<span className='text-white'>board</span>
        </h1>
        
        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : (
          <div className="w-full max-w-3xl  bg-opacity-95 rounded-2xl shadow-2xl p-6">
            <table className="w-full table-fixed text-white ">
              <thead>
                <tr className="border-b-2 border-[#19bdbd] text-lg">
                  <th className="w-1/6 p-2 text-left">Rank</th>
                  <th className="w-4/6 p-2 text-left">Player</th>
                  <th className="w-1/6 p-2 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.length > 0 ? (
                  players.map((player, index) => (
                    <tr 
                      key={player.player} 
                      className={`border-b border-gray-700 ${index < 3 ? 'text-[#ffd700] font-bold hover:bg-gray-800' : 'hover:bg-gray-800'}`}
                    >
                      <td className="w-1/6 p-4">{index < 3 ? medals[index] : index + 1}</td>
                      <td className="w-4/6 p-4 break-all">{player.player.slice(0, 15)}...{player.player.slice(-4)}</td>
                      <td className="w-1/6 p-4">{player.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4">No players found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
