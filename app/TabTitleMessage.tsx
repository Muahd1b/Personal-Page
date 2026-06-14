"use client";

import { useEffect } from "react";

type TabTitleMessageProps = {
  hiddenTitles: string[];
};

const TITLE_CHANGE_DELAY = 2400;

export default function TabTitleMessage({ hiddenTitles }: TabTitleMessageProps) {
  useEffect(() => {
    if (hiddenTitles.length === 0) return;

    let previousTitle = document.title;
    let titleIndex = 0;
    let interval: number | undefined;

    const clearTitleInterval = () => {
      if (!interval) return;
      window.clearInterval(interval);
      interval = undefined;
    };

    const showNextHiddenTitle = () => {
      document.title = hiddenTitles[titleIndex % hiddenTitles.length];
      titleIndex += 1;
    };

    const handleVisibilityChange = () => {
      clearTitleInterval();

      if (document.hidden) {
        previousTitle = document.title;
        showNextHiddenTitle();
        interval = window.setInterval(showNextHiddenTitle, TITLE_CHANGE_DELAY);
        return;
      }

      document.title = previousTitle;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.hidden) {
      handleVisibilityChange();
    }

    return () => {
      clearTitleInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = previousTitle;
    };
  }, [hiddenTitles]);

  return null;
}
