// lib/weather.ts
export async function getWeather() {
    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=-31.95&longitude=115.86&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Australia/Perth";

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch weather");
    }

    const data = await res.json();
    console.log("WEATHER API RESULT:", data);

    const current = {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
    };
    const today = {
        max: data.daily.temperature_2m_max[0],
        min: data.daily.temperature_2m_min[0],
        weathercode: data.daily.weathercode[0],
    };
    const forecast = [];
    const times = data.daily.time ?? [];
    const maxs = data.daily.temperature_2m_max ?? [];
    const mins = data.daily.temperature_2m_min ?? [];
    const codes = data.daily.weathercode ?? [];
    // API 实际的可用天数
    const availableDays = Math.min(times.length, maxs.length, mins.length, codes.length);

    // 我们想要的天数（7 天，从明天开始）
    const daysToTake = Math.min(7, Math.max(0, availableDays - 1)); // 减去今天那一条
    for (let i = 1; i <= daysToTake; i++) {
        forecast.push({
            date: times[i],                 // 一定存在
            max: maxs[i],
            min: mins[i],
            weathercode: codes[i],
        });
    }

    return {
        current,
        today,
        daily: forecast,
    };
}
