'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import '../../pages/connect.css';

export default function Home() {
  const [hostData, setHostData] = useState('');
  
  let IBBY_URL = '100.65.4.82:5000'
  let DEREK_URL = '100.67.79.102:5000'

  let BASE_URL = IBBY_URL

  const handleHostClick = async () => {
    try {
      const response = await fetch('http://' + BASE_URL + '/make_room', { // Replace with your API endpoint
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }
      const data = await response.json();
      let datas = data['room']
      setHostData('Your room has been created! You can connect to it via the room key "' + datas + '".'); // Format JSON data
    } catch (error) {
      console.error('Error fetching data:', error);
      setHostData('Failed to load data');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animated-background">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to (Placeholder)</h1>
      <div className="space-x-4">
        <Link href="/connect">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Connect
          </button>
        </Link>
        <button 
          onClick={handleHostClick} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Host
        </button>
      </div>
      {hostData && <textarea readOnly value={hostData} className="mt-4 p-2 w-1/2 h-32 text-sm border border-gray-300 rounded text-black" />}
    </div>
  );
}
