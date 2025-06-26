import  { useCallback, useEffect, useState } from "react";
import { useApi } from "../utils/api.js";

export function useChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [quota, setQuota] = useState(null);
  const { makeRequest } = useApi();

  const fetchQuota = useCallback(async () => {
    try {
      const data = await makeRequest("quota");
      setQuota(data);
    } catch (err) {
      console.log(err);
    }
  }, [makeRequest]);
    useEffect(() => {
      fetchQuota();
    }, [fetchQuota]);

  const generateChallenge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      });
      setChallenge(data);
      fetchQuota();
    } catch (err) {
      setError(err.message || "Failed to generate challenge.");
    } finally {
      setIsLoading(false);
    }
  };

  const getNextResetTime = () => {
    if (!quota?.last_reset_data) return null;
    const resetDate = new Date(quota.last_reset_data);
    resetDate.setHours(resetDate.getHours() + 24);
    return resetDate;
  };

  return { quota, getNextResetTime, generateChallenge, setDifficulty, challenge, error, isLoading, difficulty };
}
