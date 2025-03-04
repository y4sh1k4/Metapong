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
    const fetchAllTournaments = async () => {
      try {
        const currentTournamentResponse = await axios.get(
          "https://metapong-contract-7tit.onrender.com/api/tournament/current"
        );
    
        const currentTournamentId = currentTournamentResponse.data.data.tournamentId;
    
        // Fetch all tournaments from 1 to currentTournamentId
        const tournamentPromises = [];
        for (let id = 1; id <= currentTournamentId; id++) {
          tournamentPromises.push(
            axios.get<{ success: boolean; data: TournamentData }>(
              `https://metapong-contract-7tit.onrender.com/api/leaderboard/${id}`
            )
          );
        }
    
        // Wait for all requests to resolve
        const responses = await Promise.all(tournamentPromises);
    
        // Process fetched tournament data
        const allTournaments = responses.map((response) => {
          const tournamentData = response.data.data;
          return {
            ...tournamentData,
            month: getMonthName(tournamentData.startTime),
            leaderboard: tournamentData.leaderboard.filter(
              (p) => p.player !== "0x0000000000000000000000000000000000000000"
            ),
          };
        });
    
        // Sort tournaments by start time (newest first)
        allTournaments.sort((a, b) => b.startTime - a.startTime);
    
        // Set state with all tournaments
        setTournaments(allTournaments);
        setSelectedMonth(allTournaments[0]?.month || ""); // Default to latest tournament
        setPlayers(allTournaments[0]?.leaderboard || []);
      } catch (err) {
        setError("Failed to fetch tournaments");
      } finally {
        setLoading(false);
      }
    };
    

    fetchAllTournaments();
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
