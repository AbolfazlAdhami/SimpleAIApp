import React from "react";
import MCQChallenge from "./MCQChallenge";
import { useChallenge } from "../../hook/useChallenge";

function ChallengeGenerator() {
  const { quota, challenge, error, generateChallenge, getNextResetTime, isLoading, setDifficulty, difficulty } = useChallenge();
  return (
    <div className="challenge-container">
      <h2>Coding Challenge Generator</h2>

      <div className="quota-display">
        <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
        {quota?.quota_remaining === 0 && <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>}
      </div>
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Select Difficulty</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={generateChallenge} disabled={isLoading || quota?.quota_remaining === 0} className="generate-button">
        {isLoading ? "Generating..." : "Generate Challenge"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {challenge && <MCQChallenge />}
    </div>
  );
}

export default ChallengeGenerator;
