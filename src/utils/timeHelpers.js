// src/utils/timeHelpers.js

export const getCurrentBela = (belaList) => {
  if (!belaList || belaList.length === 0) return { name: "शुभ:बेला", color: "bg-green-600" };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const activeBela = belaList.find(bela => {
    const [startH, startM] = bela.start.split(':').map(Number);
    const [endH, endM] = bela.end.split(':').map(Number);
    
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    
    // Check if current time is within this range
    return currentMinutes >= startTotal && currentMinutes < endTotal;
  });

  if (!activeBela) return { name: "साधारण:बेला", color: "bg-gray-500" };

  // Map types to colors matching Virtual Patro
  let color = "bg-green-600"; // Default Good
  if (activeBela.type === "bad") color = "bg-[#ee4343]"; // Red
  if (activeBela.type === "neutral") color = "bg-blue-500"; // Blue
  
  return { name: activeBela.name, color };
};