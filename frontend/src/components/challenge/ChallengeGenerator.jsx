import React, { useState } from "react";
import MCQChallenge from "./MCQChallenge";

function ChallengeGenerator() {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [quota, setQuota] = useState(null);

  return <div className="">ChallengeGenerator</div>;
}

export default ChallengeGenerator;
