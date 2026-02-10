"use client";
import { useEffect, useState } from "react";
import Player from "lottie-react";


export default function LottieLoader() {
  const [json, setJson] = useState<any | null>(null);
  useEffect(() => {
    fetch("https://assets9.lottiefiles.com/packages/lf20_x62chJ.json")
      .then((r) => r.json())
      .then(setJson)
      .catch(() => setJson(null));
  }, []);
  if (!json) return null;
  return <Player autoplay loop animationData={json} style={{ width: 80, height: 80 }} />;
}