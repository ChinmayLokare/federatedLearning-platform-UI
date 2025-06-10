import React from 'react'
import '../styles/Dashboard.css'
import ModelCard from '../components/ModelCard';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { currentUser } = useAuth();

    const placeholderModels = [
        { id: 1, name: 'Model A', type: 'Image Classification', version: 'Version 1', status: 'Training' },
        { id: 2, name: 'Model B', type: 'NLP', version: 'Version 2', status: 'Available' },
        { id: 3, name: 'Model C', type: 'Object Detection', version: 'Version 3', status: 'Available' },
        // Add more if you like
    ];

    // At the top of DashboardPage.js or within the component
    const placeholderSessions = [
        { id: 's1', name: 'Session 1', rounds: 5, participants: 10, progress: 60 },
        { id: 's2', name: 'Session 2', rounds: 12, participants: 8, progress: 80 },
        { id: 's3', name: 'Session 3', rounds: 8, participants: 6, progress: 40 },
    ];

    return (
        <div className="dashboard-container">
            <div className="welcome-message">
                <h1>
                    Welcome back, {currentUser?.username}!
                </h1>
                <h2 className="tagline">Ready to innovate?</h2>
            </div>

            <section className="dashboard-section">
                <h3 className="section-title">Available AI Models</h3>
                <div className="model-card-grid"> {/* Container for the grid */}
                    {placeholderModels.map(model => (
                        <ModelCard key={model.id} model={model} />
                    ))}
                </div>
            </section>

            <div className="dashboard-grid">


                <section className="dashboard-section">
                    <h3 className="section-title">Active Federated Training Sessions</h3>
                    <div className="table-container"> {/* Optional: for overflow scrolling */}
                        <table className="sessions-table">
                            <thead>
                                <tr>
                                    <th>Session</th>
                                    <th>Rounds</th>
                                    <th>Participants</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placeholderSessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{session.name}</td>
                                        <td>{session.rounds}</td>
                                        <td>{session.participants}</td>
                                        <td>
                                            <div className="progress-cell">
                                                <span>{session.progress}%</span>
                                                <div className="progress-bar-container">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: `${session.progress}%` }} // Inline style for width
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="dashboard-section">
                    <h3 className="section-title">Training Accuracy</h3>
                    <div className="chart-placeholder-container"> {/* Container for the placeholder */}
                        <p>Chart will be displayed here.</p>
                        {/* Later, you would replace this <p> with a Chart component */}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DashboardPage