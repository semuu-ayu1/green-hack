'use client';
import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, MapPin, Clock, Info } from 'lucide-react';
import styles from './CampusPulse.module.css';

const nostalgiaTips = [
  "GBPIET is a government engineering college located in the scenic hills of Pauri Garhwal, Uttarakhand.",
  "Established in 1989, it offers diverse B.Tech and postgraduate programs.",
  "The campus is fully residential,alongside annual cultural and sports events like Goonj and Josh..",
  "It is recognized for a legacy of alumni securing placements in major firms like TCS, Infosys, and Wipro."
];

export default function CampusPulse() {
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState<{ temp: number, desc: string } | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [randomTip, setRandomTip] = useState(nostalgiaTips[0]);
  
  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    setRandomTip(nostalgiaTips[Math.floor(Math.random() * nostalgiaTips.length)]);

    // Current time in Dwarahat (IST)
    const timer = setInterval(() => setTime(new Date()), 60000);
    
    // Simple weather fetch (Mocked or lightweight fetch)
    const mockTemp = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    setWeather({ temp: mockTemp, desc: 'Mist & Clouds' });
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.pulseCard}>
      <div className={styles.header}>
        <div className={styles.location}>
          <MapPin size={14} />
          <span>Ghurdauri, Pauri Garhwal</span>
        </div>
        <div className={styles.timeSection}>
          <Clock size={14} />
          <span suppressHydrationWarning={true}>{mounted && time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST' : '--:-- --'}</span>
        </div>
      </div>

      <div className={styles.weatherHero}>
        <div className={styles.tempSection}>
          <span className={styles.temp} suppressHydrationWarning={true}>{mounted && weather ? weather.temp : '--'}°C</span>
          <span className={styles.desc} suppressHydrationWarning={true}>{mounted && weather ? weather.desc : 'Loading...'}</span>
        </div>
        <div className={styles.weatherIcon}>
          {mounted && weather?.temp && weather.temp < 15 ? <Cloud size={40} /> : <Sun size={40} className={styles.sunIcon} />}
        </div>
      </div>

      <div className={styles.gallery}>
        <img src="../public/gallery/alumni1.jpeg" alt="Alumni Network" />
        <img src="/alumni2.JPEG" alt="Alumni Network" />
        <img src="/alumni3.JPEG" alt="Alumni Network" />
      </div>

      <div className={styles.nostalgiaBox}>
        <Info size={16} className={styles.infoIcon} />
        <p suppressHydrationWarning={true}>“{mounted ? randomTip : nostalgiaTips[0]}”</p>
      </div>
    </div>
  );
}
