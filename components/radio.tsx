"use client";

import { useState, useEffect, useRef } from "react";
import YouTube, { type YouTubeEvent, type YouTubePlayer } from "react-youtube";

import { useInterval } from "../lib/hooks";
import { gifs } from "../lib/data";

type Props = {
  stations: Array<{ name: string; key: string }>;
};

export default function Radio({ stations }: Props) {
  const [gif, setGif] = useState(gifs[0]);

  const nextBackground = () => {
    const index = gifs.indexOf(gif)!;
    setGif(gifs[index + 1]);
  };

  useInterval(nextBackground, 60000);

  const [station, setStation] = useState(stations[0]);

  const nextStation = () => {
    const index = stations.indexOf(station);
    if (index + 1 >= stations.length) {
      setStation(stations[0]);
    } else {
      setStation(stations[index + 1]);
    }
  };

  const prevStation = () => {
    const index = stations.indexOf(station);
    if (index - 1 < 0) {
      setStation(stations.at(-1)!);
    } else {
      setStation(stations[index - 1]);
    }
  };

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  const player = useRef<YouTubePlayer>(null);

  const onReady = ({ target }: YouTubeEvent) => {
    player.current = target;

    if (!playing) {
      player.current.pauseVideo();
    }

    if (muted) {
      player.current.mute();
    } else {
      player.current.unMute();
    }

    player.current.setVolume(volume);
  };

  const pause = () => player.current && player.current.pauseVideo();
  const play = () => player.current && player.current.playVideo();

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);

  const mute = () => setMuted(!muted);

  useEffect(() => {
    if (player.current) {
      if (muted) {
        player.current.mute();
      } else {
        player.current.unMute();
      }
    }
  }, [muted, player]);

  const decreaseVolume = () =>
    setVolume((volume) => (volume >= 5 ? volume - 5 : volume));

  const increaseVolume = () =>
    setVolume((volume) => (volume <= 95 ? volume + 5 : volume));

  useEffect(() => {
    if (player.current) {
      player.current.setVolume(volume);
    }
  }, [volume, player]);

  useEffect(() => {
    const space = (event: KeyboardEvent) => {
      if (event.key == " ") {
        if (playing) {
          pause();
        } else {
          play();
        }
      }
    };
    window.addEventListener("keypress", space);
    return () => window.removeEventListener("keypress", space);
  }, [playing]);

  return (
    <div id="app" unselectable="on">
      <YouTube
        videoId={station.key}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={nextStation}
        onError={nextStation}
        opts={{
          host: "https://www.youtube-nocookie.com",
          vq: "tiny",
          width: 10,
          height: 10,
          playerVars: { autoplay: 1 },
        }}
        style={{ display: "none" }}
      />
      <img id="bg" src={`gifs/${gif}`} alt="background" draggable="false" />
      <div id="container">
        <a
          id="heading"
          href="https://github.com/satoqz/lofi-radio"
          target="_blank"
          className="margin"
        >
          Lofi Radio
        </a>
        <a
          className="text margin"
          href={`https://youtube.com/watch?v=${station.key}`}
          target="_blank"
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -10 30 30"
          >
            <path
              d="M2 20h20V6h-7V4h-2v2h-2V4H9v2H2v14zM9 4V2H7v2h2zm6 0h2V2h-2v2zm5 4v10H4V8h16z"
              fill="currentColor"
            />
          </svg>
          {station.name}
        </a>
        <div className="flex-row">
          <div className="clickable margin" onClick={prevStation}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 4h2v16H6V4zm12 0h-2v2h-2v3h-2v2h-2v2h2v3h2v2h2v2h2V4z"
                fill="currentColor"
              />
            </svg>
          </div>
          {playing ? (
            <div className="clickable margin" onClick={pause}>
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="currentColor" />
              </svg>
            </div>
          ) : (
            <div className="clickable margin" onClick={play}>
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          <div className="clickable margin" onClick={nextStation}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6V4zm12 0h-2v16h2V4z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="flex-row">
          <p className="clickable text margin" onClick={decreaseVolume}>
            -
          </p>
          <p className="clickable text margin" onClick={mute}>
            {muted ? "Muted" : `${volume}%`}
          </p>
          <p className="clickable text margin" onClick={increaseVolume}>
            +
          </p>
        </div>
      </div>
    </div>
  );
}
