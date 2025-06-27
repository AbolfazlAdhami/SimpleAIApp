import React from "react";
import MCQChallenge from "../challenge/MCQChallenge.jsx";
import { useHistory } from "../hook/useHistory.js";

export function HistoryPanel() {
  const { error, isLoading, history, fetchHistory } = useHistory();

  if (isLoading) {
    return <div className="loading">Loading history...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchHistory}>Retry</button>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No challenge history</p>
      ) : (
        <div className="history-list">
          {history.map((challenge) => {
            return <MCQChallenge challenge={challenge} key={challenge.id} showExplanation />;
          })}
        </div>
      )}
    </div>
  );
}
