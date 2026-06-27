import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data when the page loads
  useEffect(() => {
    fetch('http://localhost:3000/api/contests')
      .then((res) => res.json())
      .then((data) => {
        // The API returns an object with a key called 'allContests'
        if (data.allContests) {
            // Filter out old contests so we only show future ones!
            const upcoming = data.allContests.filter(c => (c.startTime * 1000) > Date.now());
            // Sort them so the soonest one is first
            upcoming.sort((a, b) => a.startTime - b.startTime);
            setContests(upcoming);
        } else {
            setContests([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>LeetCode Stakes 🏆</h1>
        <p>Register, compete, and win the prize pool.</p>
      </header>

      <main className="contests-grid">
        {loading ? (
          <div className="loader">Loading Contests...</div>
        ) : contests.length > 0 ? (
          contests.map((contest, index) => (
            // 2. Loop over the array to create a Card for each contest
            <div key={index} className="contest-card">
              <div className="card-content">
                <h2>{contest.title || "Upcoming Contest"}</h2>
                <p className="time">
                  Starts: {contest.startTime ? new Date(contest.startTime * 1000).toLocaleString() : 'TBD'}
                </p>
              </div>
              <button className="stake-btn">Stake ₹20</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No upcoming contests found!</p>
        )}
      </main>
    </div>
  );
}

export default App;
