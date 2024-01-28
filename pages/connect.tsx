import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import './connect.css';

let IBBY_URL = '100.65.4.82:5000';
let DEREK_URL = '100.67.79.102:5000';
let BASE_URL = IBBY_URL;

const Connect = () => {
    const [code, setCode] = useState('');
    const [songs, setSongs] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        let countdown;
        if (isConnected && timer !== null) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            clearInterval(countdown);
            fetchSongList();
            setTimer(null); // Reset timer
        }

        return () => clearInterval(countdown);
    }, [timer, isConnected]);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleConnect = async () => {
        await fetchSongList();
    };

    const fetchSongList = async () => {
        console.log(`Connecting to server with code: ${code}`);
        try {
            const response = await fetch('http://' + BASE_URL + '/song_list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'key': code }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.error === "0") {
                console.log('No action needed: ', data);
                return;
            }

            console.log('Connection successful:', data);
            setSongs(data.songs);
            setIsConnected(true);
            setTimer(30); // Start timer at 2:30 minutes after connecting
            setHasVoted(false); // Reset voting
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleVote = async (uri) => {
        try {
            const voteResponse = await fetch('http://' + BASE_URL + '/vote', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'uri': uri, 'key': code }),
            });

            if (!voteResponse.ok) {
                throw new Error(`Error: ${voteResponse.status}`);
            }

            console.log(`Voted for song with URI: ${uri}`);
            setHasVoted(true);
        } catch (error) {
            console.error('Error sending vote:', error);
        }
    };

    const formatTime = () => {
        if (timer === null) {
            return ''; // Don't display timer until connected
        }
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen animated-background">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <input 
                    type="text" 
                    value={code} 
                    onChange={handleCodeChange} 
                    className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 py-2 px-4"
                    placeholder="Enter code"
                />
                <button 
                    onClick={handleConnect} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Connect
                </button>
                {isConnected && <p>Time until next song list: {formatTime()}</p>}
                {isConnected && (
                    <div className="mt-4">
                        {songs.map((song, index) => (
                            <div key={index} className="mb-2">
                                <p>{song.song} - {song.author}</p>
                                <button 
                                    onClick={() => handleVote(song.uri)} 
                                    disabled={hasVoted}
                                    className={`${hasVoted ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                                    Vote
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connect;