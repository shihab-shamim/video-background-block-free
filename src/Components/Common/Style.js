import { getBackgroundCSS, getSpaceCSS } from '../../../../bpl-tools/utils/getCSS';

const Style = ({ attributes, id }) => {
	const {
		verticalAlign,
		textAlign,
		bgOverlay,
		minHeight,
		minHeightTablet,
		minHeightMobile,
		padding,
		paddingTablet,
		paddingMobile,
		videoFit,
		focusPoint,
		posterSources,
		poster,
		posterOptions
	} = attributes;
	const {
		overlayOpacity,
		overlayBlendMode,
		overlayPattern,
		overlayPatternOpacity,
		overlayAnimate,
		overlayNoise,
		overlayVignette
	} = attributes;

	const mainSl = `#${id}`;
	const posterDesktop = posterSources?.desktop?.url || poster?.url || '';
	const posterTablet = posterSources?.tablet?.url || '';
	const posterMobile = posterSources?.mobile?.url || '';

	const hasSpaceValue = space => {
		if (!space) return false;
		const { vertical, horizontal, top, right, bottom, left } = space;
		return !!(vertical || horizontal || top || right || bottom || left);
	};

	const resolveSpace = (space, fallback) => (hasSpaceValue(space) ? space : fallback);
	const resolvedTabletPadding = resolveSpace(paddingTablet, padding);
	const resolvedMobilePadding = resolveSpace(paddingMobile, padding);
	const resolvedMinHeightTablet = minHeightTablet || minHeight;
	const resolvedMinHeightMobile = minHeightMobile || minHeight;

	const posterBlur = posterOptions?.blur ? `${posterOptions?.blurAmount ?? 12}px` : '0px';
	const posterDisplay = posterOptions?.show === false ? 'none' : 'block';
	const posterColor = posterOptions?.dominantColor || '#000000';
	const focusX = focusPoint?.x ?? 50;
	const focusY = focusPoint?.y ?? 50;
	const pattern = overlayPattern || 'none';
	const patternCss = pattern === 'dots'
		? 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)'
		: pattern === 'grid'
			? 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)'
			: pattern === 'diagonal'
				? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 8px)'
				: 'none';


	return <style dangerouslySetInnerHTML={{
		__html: `
		${mainSl}{
			min-height: ${minHeight};
			--vbb-video-fit: ${videoFit || 'cover'};
			--vbb-overlay-opacity: ${overlayOpacity ?? 1};
			--vbb-overlay-blend: ${overlayBlendMode || 'normal'};
			--vbb-overlay-pattern: ${patternCss};
			--vbb-overlay-pattern-opacity: ${overlayPatternOpacity ?? 0.2};
			--vbb-overlay-noise: ${overlayNoise ? 1 : 0};
			--vbb-overlay-vignette: ${overlayVignette ? 1 : 0};
			--vbb-overlay-float: ${overlayAnimate ? 'vbbOverlayFloat 16s linear infinite' : 'none'};
			--vbb-overlay-pulse: ${overlayAnimate ? 'vbbOverlayPulse 12s ease-in-out infinite' : 'none'};
		}
		${mainSl} .vbbPosterLayer{
			display: ${posterDisplay};
			background-image: url(${posterDesktop});
			background-color: var(--vbb-poster-color, ${posterColor});
			background-position: ${focusX}% ${focusY}%;
			filter: blur(${posterBlur});
		}
		${mainSl} .vbbVideoPlayer{
			object-fit: ${videoFit || 'cover'};
			object-position: ${focusX}% ${focusY}%;
		}
		${mainSl} .vbbVideoContent{
			justify-content: ${verticalAlign};
			text-align: ${textAlign};
			min-height: ${minHeight};
			padding: ${getSpaceCSS(padding)};
		}
		${mainSl} .vbbVideoOverlay{
			${getBackgroundCSS(bgOverlay)}
		}
		@media (max-width: 1024px){
			${mainSl}{
				min-height: ${resolvedMinHeightTablet};
			}
			${mainSl} .vbbVideoContent{
				min-height: ${resolvedMinHeightTablet};
				padding: ${getSpaceCSS(resolvedTabletPadding)};
			}
			${mainSl} .vbbPosterLayer{
				background-image: url(${posterTablet || posterDesktop});
			}
		}
		@media (max-width: 767px){
			${mainSl}{
				min-height: ${resolvedMinHeightMobile};
			}
			${mainSl} .vbbVideoContent{
				min-height: ${resolvedMinHeightMobile};
				padding: ${getSpaceCSS(resolvedMobilePadding)};
			}
			${mainSl} .vbbPosterLayer{
				background-image: url(${posterMobile || posterTablet || posterDesktop});
			}
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;
