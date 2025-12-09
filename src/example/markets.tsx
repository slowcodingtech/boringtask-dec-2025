import { useEffect, useState } from "react";

export const Markets = () => {
  const [markets, setMarkets] = useState<{ name: string }[]>();

  useEffect(() => {
    fetch("/api/v1/markets")
      .then((response) => response.json())
      .then((data) => setMarkets(data));
  }, []);

  return (
    <div>
      {markets?.map((market) => (
        <div key={market.name}>{market.name}</div>
      ))}
    </div>
  );
};
