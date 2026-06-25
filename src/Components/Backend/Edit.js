	import { useEffect, useRef } from 'react';
	import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
	import { withSelect } from "@wordpress/data";
	import { tabController } from '../../../../bpl-tools/utils/functions';

	import Settings from './Settings/Settings';
	import Style from '../Common/Style';
import ClipBoard from './ClipBoard';

	const Edit = props => {
		const { attributes, setAttributes, clientId, isSelected ,CPTType,currentPostId,device} = props;
		const {
			sourceType,
			ytNoCookie,
			videoSources,
			posterSources,
			youtubeUrl,
			youtubeUrlTablet,
			youtubeUrlMobile,
			vimeoUrl,
			vimeoUrlTablet,
			vimeoUrlMobile,
			video,
			poster,
			muted,
			volume,
			audioOnClick,
			overlayNoise,
			overlayOpacity,
			overlayBlendMode,
			overlayPattern,
			overlayPatternOpacity,
			overlayAnimate,
			overlayVignette,
			bgOverlay,
			startTime,
			endTime,
			playbackRate
		} = attributes;
		
	
  

		const getDevice = () => {
			if (typeof window === 'undefined') return 'desktop';
			const width = window.innerWidth || document.documentElement.clientWidth;
			if (width <= 767) return 'mobile';
			if (width <= 1024) return 'tablet';
			return 'desktop';
		};

		const pickResponsiveUrl = (desktop, tablet, mobile) => {
			const device = getDevice();
			if (device === 'mobile' && mobile) return mobile;
			if (device === 'tablet' && tablet) return tablet;
			return desktop || '';
		};
		const shortcode = `[vbb id=${currentPostId}]`;

		const desktopVideo = videoSources?.desktop?.mp4?.url || video?.url || '';
		const desktopWebm = videoSources?.desktop?.webm?.url || '';
		const desktopOgg = videoSources?.desktop?.ogg?.url || '';
		const desktopPoster = posterSources?.desktop?.url || poster?.url || '';
		const activeYouTubeUrl = pickResponsiveUrl(youtubeUrl, youtubeUrlTablet, youtubeUrlMobile);
		const activeVimeoUrl = pickResponsiveUrl(vimeoUrl, vimeoUrlTablet, vimeoUrlMobile);

		const patternCss = overlayPattern === 'dots'
			? 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)'
			: overlayPattern === 'grid'
				? 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)'
				: overlayPattern === 'diagonal'
					? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 8px)'
					: 'none';

		const overlayStyle = {
			'--vbb-overlay-opacity': overlayOpacity ?? 1,
			'--vbb-overlay-blend': overlayBlendMode || 'normal',
			'--vbb-overlay-pattern': patternCss,
			'--vbb-overlay-pattern-opacity': overlayPatternOpacity ?? 0.2,
			'--vbb-overlay-vignette': overlayVignette ? 1 : 0,
			'--vbb-overlay-float': overlayAnimate ? 'vbbOverlayFloat 16s linear infinite' : 'none',
			'--vbb-overlay-pulse': overlayAnimate ? 'vbbOverlayPulse 12s ease-in-out infinite' : 'none'
		};

		const getYouTubeId = url => {
			if (!url) return '';
			if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split(/[?&]/)[0];
			if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
			if (url.includes('/embed/')) return url.split('/embed/')[1].split(/[?&]/)[0];
			return '';
		};

		const getVimeoId = url => {
			if (!url) return '';
			const parts = url.split('/');
			for (let i = parts.length - 1; i >= 0; i--) {
				if (/^\d+$/.test(parts[i])) return parts[i];
			}
			return '';
		};

		const getYouTubeEmbed = url => {
			const id = getYouTubeId(url);
			if (!id) return '';
			const base = ytNoCookie ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/';
			const params = `autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&playlist=${id}`;
			return `${base}${id}?${params}`;
		};

		const getVimeoEmbed = url => {
			const id = getVimeoId(url);
			if (!id) return '';
			return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&dnt=1`;
		};

		useEffect(() => tabController(), [isSelected]);

		const vbbVideoPlayer = useRef(null);
		const migratedRef = useRef(false);

		useEffect(() => {
			if (migratedRef.current) return;
			const next = {};
			const legacyVideo = typeof video === 'string'
				? { id: null, url: video, alt: '', title: '' }
				: (video || null);
			const legacyPoster = typeof poster === 'string'
				? { id: null, url: poster, alt: '', title: '' }
				: (poster || null);

			if (!videoSources?.desktop?.mp4?.url && legacyVideo?.url) {
				next.videoSources = {
					...videoSources,
					desktop: {
						...videoSources?.desktop,
						mp4: { id: legacyVideo?.id ?? null, url: legacyVideo?.url || '', alt: legacyVideo?.alt || '', title: legacyVideo?.title || '' }
					}
				};
				if (legacyVideo && typeof video !== 'object') {
					next.video = legacyVideo;
				}
			}
			if (!posterSources?.desktop?.url && legacyPoster?.url) {
				next.posterSources = {
					...posterSources,
					desktop: { id: legacyPoster?.id ?? null, url: legacyPoster?.url || '', alt: legacyPoster?.alt || '', title: legacyPoster?.title || '' }
				};
				if (legacyPoster && typeof poster !== 'object') {
					next.poster = legacyPoster;
				}
			}
			if (!bgOverlay || typeof bgOverlay === 'string') {
				next.bgOverlay = typeof bgOverlay === 'string' ? { color: bgOverlay } : { color: '#000000b3' };
			}
			if (Object.keys(next).length) {
				migratedRef.current = true;
				setAttributes(next);
			} else {
				migratedRef.current = true;
			}
		}, [videoSources, posterSources, video, poster, bgOverlay, setAttributes]);

		useEffect(() => {
			if (sourceType === 'self' && vbbVideoPlayer.current) {
				vbbVideoPlayer.current.load();
			}
		}, [desktopVideo, desktopWebm, desktopOgg, sourceType]);

		useEffect(() => {
			const videoEl = vbbVideoPlayer.current;
			if (!videoEl || sourceType !== 'self') return undefined;

			const start = Number(startTime || 0);
			const end = Number(endTime || 0);
			const rate = Number(playbackRate || 1);

			videoEl.playbackRate = rate;
			videoEl.muted = audioOnClick ? true : !!muted;
			videoEl.volume = Math.max(0, Math.min(1, Number(volume ?? 1)));

			const onLoaded = () => {
				if (start > 0) videoEl.currentTime = start;
			};

			const onTimeUpdate = () => {
				if (!end || !Number.isFinite(end)) return;
				if (videoEl.currentTime >= end) {
					videoEl.currentTime = start || 0;
					videoEl.play().catch(() => {});
				}
			};

			videoEl.addEventListener('loadedmetadata', onLoaded);
			if (start > 0 || end > 0) {
				videoEl.addEventListener('timeupdate', onTimeUpdate);
			}

			return () => {
				videoEl.removeEventListener('loadedmetadata', onLoaded);
				videoEl.removeEventListener('timeupdate', onTimeUpdate);
			};
		}, [sourceType, startTime, endTime, playbackRate, muted, volume, audioOnClick]);

		return <>
			<Settings attributes={attributes} setAttributes={setAttributes}  deviceT={device}  />
			{CPTType ==="vbb" && <ClipBoard shortcode={shortcode} />}

			<div {...useBlockProps({ id: `block-${clientId}`, className: overlayNoise ? 'vbbOverlayNoise' : '' })}>
				<Style attributes={attributes} id={`block-${clientId}`} />

				<div className='vbbPosterLayer' style={{ backgroundImage: desktopPoster ? `url(${desktopPoster})` : undefined }}></div>

				{sourceType === 'self' && <>
					{/* eslint-disable-next-line react/no-unknown-property */}
					<video
						autoPlay
						muted={audioOnClick ? true : !!muted}
						loop
						playsInline
						className='vbbVideoPlayer'
						ref={vbbVideoPlayer}
						poster={desktopPoster}
						data-audio-on-click={audioOnClick ? '1' : '0'}
						data-volume={volume ?? 1}
					>
						{desktopWebm ? <source src={desktopWebm} type='video/webm' /> : null}
						{desktopOgg ? <source src={desktopOgg} type='video/ogg' /> : null}
						{desktopVideo ? <source src={desktopVideo} type='video/mp4' /> : null}
						Your browser does not support HTML5 video.
					</video>
				</>}

				{sourceType === 'youtube' && (
					<iframe
						className='vbbVideoEmbed'
						src={getYouTubeEmbed(activeYouTubeUrl)}
						title='YouTube background video'
						frameBorder='0'
						allow='autoplay; fullscreen; picture-in-picture'
						allowFullScreen
					/>
				)}

				{sourceType === 'vimeo' && (
					<iframe
						className='vbbVideoEmbed'
						src={getVimeoEmbed(activeVimeoUrl)}
						title='Vimeo background video'
						frameBorder='0'
						allow='autoplay; fullscreen; picture-in-picture'
						allowFullScreen
					/>
				)}

				<div className='vbbVideoOverlay' style={overlayStyle}></div>

				<div className='vbbVideoContent'>
					<InnerBlocks template={[
						['core/heading', {
							content: 'Video Background by bPlugins',
							style: {
								typography: { fontSize: '40px' },
								color: { text: '#fff' }
							}
						}],

						['core/paragraph', {
							content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim. Magni quis et voluptas voluptatum facere saepe cum reiciendis assumenda eveniet rem. Animi illo, doloribus suscipit, minus quos architecto eius repudiandae dignissimos voluptatibus facilis a quia odit voluptatem perspiciatis sit.',
							style: {
								typography: { fontSize: '20px' },
								color: { text: '#fff' }
							}
						}],

						['core/buttons', { contentJustification: 'center', layout: { justifyContent: 'center' } }, [
							['core/button', {
								text: 'Click Me',
								style: {
									typography: { fontSize: '22px' },
									color: { text: '#fff', gradient: 'linear-gradient(135deg, #0040E3, #18D4FD)' }
								}
							}]
						]]
					]} />
				</div>
			</div>
		</>;
	};
	// export default Edit; 
	export default withSelect((select) => {
	const { getDeviceType } = select('core/editor');
	const editor = select("core/editor");

	//   const deviceDetect = editor.getDeviceType?.()?.toLowerCase() || "desktop";
	const CPTType = editor.getCurrentPostType?.();
	const currentPostId = editor.getCurrentPostId?.();



	return {
		// deviceDetect,
		device: getDeviceType()?.toLowerCase(),
		CPTType,
		currentPostId,
	};
	})(Edit);
