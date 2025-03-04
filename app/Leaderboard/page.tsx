"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParticlesBackground from '../_Components/Particles';

interface Player {
  player: string;
  score: number;
}

interface TournamentData {
  startTime: number;
  endTime: number;
  leaderboard: Player[];
  isCurrentTournament: boolean;
}

const medals = ['🥇', '🥈', '🥉'];

const getMonthName = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('default', { month: 'long' });
};

const Page = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tournaments, setTournaments] = useState<TournamentData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    const fetchAllLeaderboards = async () => {
      try {
        const response = await axios.get<TournamentData>(
          'https://metapong-contract-7tit.onrender.com/api/leaderboard/1'
        );

        const tournamentData = response.data.data;
        const month = getMonthName(tournamentData.startTime);
        setTournaments([tournamentData]); // Assuming only one tournament for now
        setSelectedMonth(month);

        // Set initial players based on current month
        setPlayers(
          tournamentData.leaderboard.filter(
            p => p.player !== "0x0000000000000000000000000000000000000000"
          )
        );
      } catch (err) {
        setError('Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeaderboards();
  }, []);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    const filteredTournament = tournaments.find(
      (tournament) => getMonthName(tournament.startTime) === selectedMonth
    );

    if (filteredTournament) {
      setPlayers(
        filteredTournament.leaderboard.filter(
          player => player.player !== "0x0000000000000000000000000000000000000000"
        )
      );
    } else {
      setPlayers([]);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 text-white">
        <h1 className="text-center mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#19bdbd]">
          Leader<span className='text-white'>board</span>
        </h1>

        {/* Month Filter Dropdown */}
        <div className="mb-6">
          <label className="text-lg mr-2">Select Month:</label>
          <select 
            value={selectedMonth} 
            onChange={handleMonthChange} 
            className="p-3 rounded-lg border border-[#19bdbd] text-white bg-transparent 
                      backdrop-blur-md bg-opacity-30 transition-all duration-300
                      hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-[#19bdbd]"
          >
            {tournaments.map((tournament, index) => (
              <option 
                key={index} 
                value={getMonthName(tournament.startTime)}
                className="bg-black bg-opacity-80 text-white"
              >
                {getMonthName(tournament.startTime)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : (
          <div className="w-full max-w-3xl bg-opacity-95 rounded-2xl shadow-2xl p-6">
            <table className="w-full table-fixed text-white">
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
