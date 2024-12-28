import React, { useState } from 'react';

function App() {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({ name: '', grade: '', reason: '' });
  const [scholarshipHistory, setScholarshipHistory] = useState([]);

  // Submit application
  const handleSubmitApplication = () => {
    if (!newApplication.name || !newApplication.grade || !newApplication.reason) {
      alert('Please fill in all fields');
      return;
    }
    const application = { ...newApplication, id: applications.length + 1, status: 'Pending' };
    setApplications([...applications, application]);
    setNewApplication({ name: '', grade: '', reason: '' });
  };

  // Allocate scholarships (dummy logic for demonstration)
  const handleAllocateScholarships = () => {
    const updatedApplications = applications.map((app) => {
      const isEligible = parseFloat(app.grade) > 3.5;
      if (isEligible) {
        setScholarshipHistory([
          ...scholarshipHistory,
          { ...app, status: 'Approved', date: new Date().toLocaleDateString() },
        ]);
      }
      return { ...app, status: isEligible ? 'Approved' : 'Rejected' };
    });
    setApplications(updatedApplications);
  };

  return (
    <div className="App">
      <h1>Scholarship Allocation System</h1>

      <div className="application-form">
        <h2>Submit Application</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={newApplication.name}
          onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Grade (e.g., 4.0)"
          value={newApplication.grade}
          onChange={(e) => setNewApplication({ ...newApplication, grade: e.target.value })}
        />
        <textarea
          placeholder="Reason for Scholarship"
          value={newApplication.reason}
          onChange={(e) => setNewApplication({ ...newApplication, reason: e.target.value })}
        />
        <button onClick={handleSubmitApplication}>Submit Application</button>
      </div>

      <h2>Applications</h2>
      <ul className="application-list">
        {applications.map((app) => (
          <li key={app.id}>
            <p>Name: {app.name}</p>
            <p>Grade: {app.grade}</p>
            <p>Reason: {app.reason}</p>
            <p>Status: {app.status}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleAllocateScholarships}>Allocate Scholarships</button>

      <h2>Scholarship History</h2>
      <ul className="scholarship-history">
        {scholarshipHistory.map((entry, index) => (
          <li key={index}>
            <p>Name: {entry.name}</p>
            <p>Grade: {entry.grade}</p>
            <p>Date: {entry.date}</p>
            <p>Status: {entry.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;