import "./style.scss";
const getDevice = () => {
  const width = window.innerWidth || document.documentElement.clientWidth;
  if (width <= 767) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

const prefersReducedMotion = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const getYouTubeId = (url) => {
  if (!url) return "";
  if (url.includes("youtu.be/"))
    return url.split("youtu.be/")[1].split(/[?&]/)[0];
  if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
  if (url.includes("/embed/")) return url.split("/embed/")[1].split(/[?&]/)[0];
  return "";
};

const getVimeoId = (url) => {
  if (!url) return "";
  const parts = url.split("/");
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/^\d+$/.test(parts[i])) return parts[i];
  }
  return "";
};

const getYouTubeEmbed = (url, noCookie) => {
  const id = getYouTubeId(url);
  if (!id) return "";
  const base = noCookie
    ? "https://www.youtube-nocookie.com/embed/"
    : "https://www.youtube.com/embed/";
  const params = `autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&playlist=${id}`;
  return `${base}${id}?${params}`;
};

const getVimeoEmbed = (url) => {
  const id = getVimeoId(url);
  if (!id) return "";
  return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&dnt=1`;
};

const applyDominantColor = (block, posterUrl) => {
  const auto = block.dataset.posterAuto === "1";
  const color = block.dataset.posterColor || "";
  if (!auto || !posterUrl) {
    if (color) block.style.setProperty("--vbb-poster-color", color);
    return;
  }
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 16;
    canvas.height = 16;
    ctx.drawImage(img, 0, 0, 16, 16);
    const { data } = ctx.getImageData(0, 0, 16, 16);
    let r = 0,
      g = 0,
      b = 0,
      count = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    block.style.setProperty("--vbb-poster-color", `rgb(${r}, ${g}, ${b})`);
  };
  img.src = posterUrl;
};

const applyResponsiveSources = (block) => {
  if (prefersReducedMotion()) {
    block.classList.add("vbbReducedMotion");
    return;
  }
  const device = getDevice();
  const posterUrl =
    block.dataset[
      `poster${device.charAt(0).toUpperCase() + device.slice(1)}`
    ] ||
    block.dataset.posterDesktop ||
    "";
  const posterLayer = block.querySelector(".vbbPosterLayer");

  if (posterLayer && posterUrl) {
    posterLayer.style.backgroundImage = `url(${posterUrl})`;
  }
  applyDominantColor(block, posterUrl);

  const video = block.querySelector("video.vbbVideoPlayer");
  if (video) {
    const rawPlaybackRate = parseFloat(block.dataset.playbackRate || "1");
    const playbackRate =
      Number.isFinite(rawPlaybackRate) && rawPlaybackRate > 0
        ? rawPlaybackRate
        : 1;
    const muted = block.dataset.muted === "1";
    const volume = parseFloat(block.dataset.volume || "1");
    const audioOnClick = block.dataset.audioOnClick === "1";
    const applyPlaybackRate = () => {
      video.playbackRate = playbackRate;
    };

    applyPlaybackRate();
    video.muted = audioOnClick ? true : muted;
    video.volume = Math.max(0, Math.min(1, volume));

    const sources = video.querySelectorAll("source[data-src-desktop]");
    const deviceKey = `src${device.charAt(0).toUpperCase() + device.slice(1)}`;
    const lastDevice = video.dataset.vbbDevice || "";
    let didSourceChange = lastDevice !== device;

    sources.forEach((source) => {
      const nextSrc =
        source.dataset[deviceKey] || source.dataset.srcDesktop || "";
      const currentSrc = source.getAttribute("src") || "";
      if (nextSrc && nextSrc !== currentSrc) {
        source.src = nextSrc;
        didSourceChange = true;
      }
    });

    const poster = posterUrl || block.dataset.posterDesktop || "";
    if (poster) video.setAttribute("poster", poster);

    if (!video.dataset.vbbInitDone || didSourceChange) {
      video.load();
      video.addEventListener("loadedmetadata", applyPlaybackRate, {
        once: true,
      });
      video.addEventListener("canplay", applyPlaybackRate, { once: true });
      video.dataset.vbbInitDone = "1";
      video.dataset.vbbDevice = device;
    }

    const start = parseFloat(block.dataset.startTime || "0");
    const end = parseFloat(block.dataset.endTime || "0");
    if (start > 0 && !video.dataset.startBound) {
      const onLoaded = () => {
        video.currentTime = start;
      };
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
      video.dataset.startBound = "1";
    }
    if ((start > 0 || end > 0) && !video.dataset.segmentBound) {
      const onTimeUpdate = () => {
        if (!end || !Number.isFinite(end)) return;
        if (video.currentTime >= end) {
          video.currentTime = start || 0;
          video.play();
        }
      };
      video.addEventListener("timeupdate", onTimeUpdate);
      video.dataset.segmentBound = "1";
    }

    if (audioOnClick && !block.dataset.audioClickBound) {
      const onClick = () => {
        video.muted = false;
        video.volume = Math.max(0, Math.min(1, volume));
        video.play();
        block.removeEventListener("click", onClick);
        block.dataset.audioClickBound = "1";
      };
      block.addEventListener("click", onClick);
    }
  }

  const iframe = block.querySelector("iframe.vbbVideoEmbed");
  if (iframe) {
    const type = block.dataset.embedType;
    const noCookie = block.dataset.ytNoCookie === "1";
    const url =
      block.dataset[
        `${type}Url${device.charAt(0).toUpperCase() + device.slice(1)}`
      ] ||
      block.dataset[`${type}UrlDesktop`] ||
      "";
    const embed =
      type === "youtube" ? getYouTubeEmbed(url, noCookie) : getVimeoEmbed(url);
    if (embed) iframe.src = embed;
  }
};

let observer;
const initVideoBackgrounds = () => {
  const blocks = document.querySelectorAll(".wp-block-vbb-video-bg");
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const block = entry.target;
        if (entry.isIntersecting) {
          applyResponsiveSources(block);

          const video = block.querySelector("video.vbbVideoPlayer");

          if (video && !prefersReducedMotion()) {
            const isMuted =
              block.dataset.audioOnClick === "1" ||
              block.dataset.muted === "1";

            video.muted = isMuted;
            video.defaultMuted = isMuted;

            if (isMuted) {
              video.setAttribute("muted", "");
            }
            video.setAttribute("autoplay", "");
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            video.setAttribute("loop", "");

            const playPromise = video.play();

            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {});
            }
          }
        } else {
          const video = block.querySelector("video.vbbVideoPlayer");
          if (video) video.pause();
        }
      });
    },
    { threshold: 0.2 },
  );

  blocks.forEach((block) => observer.observe(block));
};

const debounce = (fn, delay) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth)
  );
};

window.addEventListener("load", initVideoBackgrounds);
window.addEventListener(
  "resize",
  debounce(() => {
    const blocks = document.querySelectorAll(".wp-block-vbb-video-bg");
    blocks.forEach((block) => {
      if (isElementInViewport(block)) applyResponsiveSources(block);
    });
  }, 200),
);
