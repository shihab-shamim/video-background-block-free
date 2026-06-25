						import { __ } from '@wordpress/i18n';
						import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
						import { PanelBody, __experimentalUnitControl as UnitControl, SelectControl, TextControl, ToggleControl, RangeControl, ColorPalette, PanelRow } from '@wordpress/components';

						import { Label, Background, BBlocksAds, HelpPanel, InlineMediaUpload, Device, BButtonGroup } from '../../../../../bpl-tools/Components';
						import { SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
						import { pxUnit, perUnit, emUnit } from '../../../../../bpl-tools/utils/options';

						import { verticalTopIcon, verticalCenterIcon, verticalBottomIcon } from '../../../utils/icons';
						// import { AboutProModal } from "../../../../../bpl-tools/ProControls";
						import { AboutProModal, BControlPro } from "../../../../../bpl-tools/ProControls";
						import { useState } from 'react';


						const Settings = ({ attributes, setAttributes,isPremium,deviceT }) => {
							const [isProModalOpen,setIsProModalOpen]=useState(false)
							const premiumProps = { isPremium, setIsProModalOpen };

					// const props={
					//   premiumProps
					// }

					//   Component={UnitControl}
					// {...premiumProps}

					// console.log({...premiumProps});



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
								posterOptions,
								overlayOpacity,
								overlayBlendMode,
								overlayPattern,
								overlayPatternOpacity,
								overlayAnimate,
								overlayNoise,
								overlayVignette,
								videoFit,
								startTime,
								endTime,
								playbackRate,
								verticalAlign,
								textAlign,
								bgOverlay,
								minHeight,
								minHeightTablet,
								minHeightMobile,
								padding,
								paddingTablet,
								paddingMobile
							} = attributes;

							const getMedia = media => ({
								id: media?.id ?? null,
								url: media?.url ?? '',
								alt: media?.alt ?? '',
								title: media?.title ?? ''
							});

							const getVideoUrl = (device, format) => {
								const fromSources = videoSources?.[device]?.[format]?.url;
								if (fromSources) return fromSources;
								if (device === 'desktop' && format === 'mp4') return video?.url || '';
								return '';
							};

							const getPosterUrl = device => {
								const fromSources = posterSources?.[device]?.url;
								if (fromSources) return fromSources;
								if (device === 'desktop') return poster?.url || '';
								return '';
							};

							const updateVideoSource = (device, format, url) => {
								const next = {
									...videoSources,
									[device]: {
										...videoSources?.[device],
										[format]: getMedia({ url })
									}
								};
								if (device === 'desktop' && format === 'mp4') {
									setAttributes({ video: getMedia({ url }), videoSources: next });
								} else {
									setAttributes({ videoSources: next });
								}
							};

							const updatePosterSource = (device, url) => {
								const next = {
									...posterSources,
									[device]: getMedia({ url })
								};
								if (device === 'desktop') {
									setAttributes({ poster: getMedia({ url }), posterSources: next });
								} else {
									setAttributes({ posterSources: next });
								}
							};

							const updatePosterOptions = (key, value) => {
								setAttributes({
									posterOptions: {
										...posterOptions,
										[key]: value
									}
								});
							};

							const sourceOptions = [
			{ label: __('Hosted', 'video-background'), value: 'self', pro: false },
			{ label: __('YouTube', 'video-background'), value: 'youtube', pro: true },
			{ label: __('Vimeo', 'video-background'), value: 'vimeo', pro: true }
		];

		const renderLabel = (option) => (
			<span className="vbb-source-label">
				{option.label}
				{option.pro && !vbbpipecheck && (
					<span className="vbb-pro-badge">PRO</span>
				)}
			</span>
		);


							return <>
								<InspectorControls>
									<div className='bPlInspectorInfo'>
										<BBlocksAds />
									</div>

									<HelpPanel slug='video-background-block' docsLink='https://bblockswp.com/docs/video-background-block' />


									<PanelBody className='bPlPanelBody' title={__('Video Sources', 'video-background')}>
										<Label className="mb10">{__('Source Type', 'video-background')}</Label>
										<BButtonGroup
											label=""
											value={sourceType}
											options={sourceOptions.map(opt => ({
												value: opt.value,
												label: renderLabel(opt),
												disabled: opt.pro && !vbbpipecheck // optional
											}))}
											onChange={(val) => {
												if (!vbbpipecheck && (val === 'youtube' || val === 'vimeo')) {
													// 👉 Upsell modal / notice
													setIsProModalOpen(true)
													return;
												}
												setAttributes({ sourceType: val });
											}}
										/>
										
										<PanelRow><Label>Responsive Video URLs</Label><Device/></PanelRow>

										{sourceType === 'self' && <>
										{deviceT === "desktop" && <>
										{/* <Label className='mt20'>{__('Desktop Video', 'video-background')}</Label> */}
															<div className="vbb-field">
											<label className="vbb-label">
												{__('MP4 URL', 'video-background')}
												<span className="vbb-required">*</span>
											</label>

											<InlineMediaUpload
												value={getVideoUrl('desktop', 'mp4')}
												types={['video']}
												onChange={val => updateVideoSource('desktop', 'mp4', val)}
												placeholder={__('MP4 URL', 'video-background')}
											/>
										</div>
											<small style={{color:"orange"}}><strong>Desktop MP4 is required; Tablet, Mobile, and other video URLs are optional.</strong></small>
											<Label>{__('WebM URL (optional)', 'video-background')}</Label>
											<InlineMediaUpload value={getVideoUrl('desktop', 'webm')} types={['video']} onChange={val => updateVideoSource('desktop', 'webm', val)} placeholder={__('WebM URL', 'video-background')} />
											<Label>{__('OGG URL (optional)', 'video-background')}</Label>
											<InlineMediaUpload value={getVideoUrl('desktop', 'ogg')} types={['video']} onChange={val => updateVideoSource('desktop', 'ogg', val)} placeholder={__('OGG URL', 'video-background')} />
	</>}
											
										{
											deviceT ==="tablet" &&<>
												{/* <Label className='mt20'>{__('Tablet Video', 'video-background')}</Label> */}
											<BControlPro
										Component={InlineMediaUpload}
										label={__('MP4 URL', 'video-background')}
										{...premiumProps} value={getVideoUrl('tablet', 'mp4')} types={['video']} onChange={val => updateVideoSource('tablet', 'mp4', val)} placeholder={__('MP4 URL', 'video-background')} />
											<BControlPro
										Component={InlineMediaUpload}
										label={__('WebM URL', 'video-background')}
										{...premiumProps} value={getVideoUrl('tablet', 'webm')} types={['video']} onChange={val => updateVideoSource('tablet', 'webm', val)} placeholder={__('WebM URL', 'video-background')} />
											<BControlPro
										Component={InlineMediaUpload}
										label={__('OGG URL', 'video-background')}
										{...premiumProps} value={getVideoUrl('tablet', 'ogg')} types={['video']} onChange={val => updateVideoSource('tablet', 'ogg', val)} placeholder={__('OGG URL', 'video-background')} />

											</>
										}
											{
												deviceT ==="mobile" && <>
												{/* <Label className='mt20'>{__('Mobile Video', 'video-background')}</Label> */}
											<BControlPro
										Component={InlineMediaUpload}
										label={__('MP4 URL', 'video-background')}
										{...premiumProps} value={getVideoUrl('mobile', 'mp4')} types={['video']} onChange={val => updateVideoSource('mobile', 'mp4', val)} placeholder={__('MP4 URL', 'video-background')} />
											<BControlPro
										label={__('WebM URL', 'video-background')}

										Component={InlineMediaUpload}
										{...premiumProps} value={getVideoUrl('mobile', 'webm')} types={['video']} onChange={val => updateVideoSource('mobile', 'webm', val)} placeholder={__('WebM URL', 'video-background')} />
											<BControlPro
										Component={InlineMediaUpload}
										label={__('OGG URL', 'video-background')}
										{...premiumProps} value={getVideoUrl('mobile', 'ogg')} types={['video']} onChange={val => updateVideoSource('mobile', 'ogg', val)} placeholder={__('OGG URL', 'video-background')} />
										
												
												</>
											}

										</>}

										{sourceType === 'youtube' && <>
										{deviceT === "desktop" &&	<TextControl placeholder='url...' label={__('YouTube URL (Desktop)', 'video-background')} value={youtubeUrl} onChange={val => setAttributes({ youtubeUrl: val })} /> }
										{deviceT === "tablet" &&<TextControl placeholder='url...' label={__('YouTube URL (Tablet)', 'video-background')} value={youtubeUrlTablet} onChange={val => setAttributes({ youtubeUrlTablet: val })} /> }
										{deviceT === "mobile" &&<TextControl placeholder='url...' label={__('YouTube URL (Mobile)', 'video-background')} value={youtubeUrlMobile} onChange={val => setAttributes({ youtubeUrlMobile: val })} /> }

										
											
											<ToggleControl label={__('Use no-cookie domain', 'video-background')} checked={!!ytNoCookie} onChange={val => setAttributes({ ytNoCookie: val })} />
										</>}

										{sourceType === 'vimeo' && <>
											{deviceT === "desktop" &&<TextControl placeholder='url...' label={__('Vimeo URL (Desktop)', 'video-background')} value={vimeoUrl} onChange={val => setAttributes({ vimeoUrl: val })} />}
											{deviceT === "tablet" &&	<TextControl placeholder='url...' label={__('Vimeo URL (Tablet)', 'video-background')} value={vimeoUrlTablet} onChange={val => setAttributes({ vimeoUrlTablet: val })} />}
											{deviceT === "mobile" &&<TextControl placeholder='url...' label={__('Vimeo URL (Mobile)', 'video-background')} value={vimeoUrlMobile} onChange={val => setAttributes({ vimeoUrlMobile: val })} />}

										
											
										</>}
									</PanelBody> 


									<PanelBody className='bPlPanelBody' title={__('Poster', 'video-background')} initialOpen={false}>
										
										<InlineMediaUpload  className='mb5' label={__('Desktop Poster', 'video-background')} value={getPosterUrl('desktop')} types={['image']} onChange={val => updatePosterSource('desktop', val)} placeholder={__('Enter image URL', 'video-background')} />

										
										<BControlPro Component={InlineMediaUpload} {...premiumProps} className='mt20' label={__('Tablet Poster', 'video-background')} value={getPosterUrl('tablet')} types={['image']} onChange={val => updatePosterSource('tablet', val)} placeholder={__('Enter image URL', 'video-background')} />

										
										<BControlPro Component={InlineMediaUpload} {...premiumProps} className='mt20' label={__('Mobile Poster', 'video-background')} value={getPosterUrl('mobile')} types={['image']} onChange={val => updatePosterSource('mobile', val)} placeholder={__('Enter image URL', 'video-background')} />
										
										<Label className='mt20 mb10'><small style={{color:"orange"}} ><strong>These options will work even if no poster is set.</strong></small>
										</Label>
										<BControlPro Component={ToggleControl} {...premiumProps} className='' label={__('Show poster layer', 'video-background')} checked={posterOptions?.show !== false} onChange={val => updatePosterOptions('show', val)} />
										<BControlPro Component={ToggleControl} {...premiumProps} className='mt10' label={__('Blur poster', 'video-background')} checked={!!posterOptions?.blur} onChange={val => updatePosterOptions('blur', val)} />
										<RangeControl label={__('Blur amount', 'video-background')} value={posterOptions?.blurAmount ?? 12} onChange={val => updatePosterOptions('blurAmount', val)} min={0} max={30} />
										<BControlPro className='mt20' Component={ToggleControl} {...premiumProps} label={__('Auto dominant color', 'video-background')} checked={posterOptions?.dominantAuto !== false} onChange={val => updatePosterOptions('dominantAuto', val)} />
										<Label>{__('Dominant color', 'video-background')}</Label>
										<BControlPro  Component={ColorPalette} {...premiumProps}  value={posterOptions?.dominantColor || '#000000'} onChange={val => updatePosterOptions('dominantColor', val)} />
									</PanelBody>

									{sourceType === 'vimeo' || sourceType === 'self' &&  <PanelBody className='bPlPanelBody' title={__('Playback', 'video-background')} initialOpen={false}>
										<BControlPro Component={SelectControl} {...premiumProps}

											label={__('Video Fit', 'video-background')}
											value={videoFit}
											options={[
												{ label: __('Cover', 'video-background'), value: 'cover' },
												{ label: __('Fill', 'video-background'), value: 'fill' }
											]}
											onChange={val => setAttributes({ videoFit: val })}
										/>

										{/* <Label className='mt20'>{__('Focus Point', 'video-background')}</Label>
										<RangeControl
											label={__('Horizontal (%)', 'video-background')}
											value={focusPoint?.x ?? 50}
											onChange={val => updateFocusPoint('x', val)}
											min={0}
											max={100}
										/>
										<RangeControl
											label={__('Vertical (%)', 'video-background')}
											value={focusPoint?.y ?? 50}
											onChange={val => updateFocusPoint('y', val)}
											min={0}
											max={100}
										/> */}

										{/* <Label className='mt20'>{__('Segment Loop', 'video-background')}</Label> */}
										<BControlPro Component={RangeControl} {...premiumProps}
										className='mt20'
											label={__('Start (sec)', 'video-background')}
											value={startTime ?? 0}
											onChange={val => setAttributes({ startTime: val })}
											min={0}
											max={600}
											step={0.1}
										/>
										<BControlPro Component={RangeControl} {...premiumProps}
											label={__('End (sec)', 'video-background')}
											value={endTime ?? 0}
											onChange={val => setAttributes({ endTime: val })}
											min={0}
											max={600}
											step={0.1}
										/>

										<BControlPro Component={RangeControl} {...premiumProps}
											label={__('Playback Speed', 'video-background')}
											value={playbackRate ?? 1}
											onChange={val => setAttributes({ playbackRate: val })}
											min={0.25}
											max={2}
											step={0.05}
										/>
									</PanelBody>}
									<PanelBody className='bPlPanelBody' title={__('Layout', 'video-background')} initialOpen={false}>
										<Background className='mt20' label={__('Background Overlay', 'video-background')} value={bgOverlay} onChange={val => setAttributes({ bgOverlay: val })} isImage={false} />

										<RangeControl
										className='mt20'
											label={__('Overlay Opacity', 'video-background')}
											value={overlayOpacity ?? 1}
											onChange={val => setAttributes({ overlayOpacity: val })}
											min={0}
											max={1}
											step={0.05}
										/>

										<BControlPro Component={SelectControl} {...premiumProps}
										
										className='mt20'
											label={__('Blend Mode', 'video-background')}
											value={overlayBlendMode || 'normal'}
											options={[
												{ label: __('Normal', 'video-background'), value: 'normal' },
												{ label: __('Multiply', 'video-background'), value: 'multiply' },
												{ label: __('Screen', 'video-background'), value: 'screen' },
												{ label: __('Overlay', 'video-background'), value: 'overlay' },
												{ label: __('Soft Light', 'video-background'), value: 'soft-light' }
											]}
											onChange={val => setAttributes({ overlayBlendMode: val })}
										/>

										<BControlPro Component={SelectControl} {...premiumProps}
										className='mt20'
											label={__('Pattern Overlay', 'video-background')}
											value={overlayPattern || 'none'}
											options={[
												{ label: __('None', 'video-background'), value: 'none' },
												{ label: __('Dots', 'video-background'), value: 'dots' },
												{ label: __('Grid', 'video-background'), value: 'grid' },
												{ label: __('Diagonal', 'video-background'), value: 'diagonal' }
											]}
											onChange={val => setAttributes({ overlayPattern: val })}
										/>

										<BControlPro Component={RangeControl} {...premiumProps}
										className='mt20'
											label={__('Pattern Opacity', 'video-background')}
											value={overlayPatternOpacity ?? 0.2}
											onChange={val => setAttributes({ overlayPatternOpacity: val })}
											min={0}
											max={1}
											step={0.05}
										/>

										<BControlPro Component={ToggleControl} {...premiumProps}
										className='mt10'
											label={__('Animated Overlay', 'video-background')}
											checked={!!overlayAnimate}
											onChange={val => setAttributes({ overlayAnimate: val })}
										/>
										<BControlPro Component={ToggleControl} {...premiumProps}
										className='mt10'
											label={__('Noise Texture', 'video-background')}
											checked={!!overlayNoise}
											onChange={val => setAttributes({ overlayNoise: val })}
										/>
										<BControlPro Component={ToggleControl} {...premiumProps}
										className='mt10'
											label={__('Cinematic Vignette', 'video-background')}
											checked={!!overlayVignette}
											onChange={val => setAttributes({ overlayVignette: val })}
										/>


										{deviceT ==="desktop" && <>
										{/* <Label className='mt20'>{__('Desktop', 'video-background')}</Label> */}
										<PanelRow> <Label>{__('Min Height:', 'video-background')} </Label> <Device/></PanelRow>
										<UnitControl  labelPosition='left' value={minHeight} onChange={val => setAttributes({ minHeight: val })} units={[pxUnit(), perUnit(), emUnit()]} />
										<PanelRow> <Label>{__('Padding:', 'video-background')} </Label> <Device/></PanelRow>
										<SpaceControl label='' className='mt20' value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '20px', horizontal: '30px' }} />

										</>}
										{deviceT ==="tablet" && <>
										{/* <Label className='mt20'>{__('Tablet', 'video-background')}</Label> */}
										<PanelRow> <Label>{__('Min Height:', 'video-background')} </Label> <Device/></PanelRow>
										<UnitControl  labelPosition='left' value={minHeightTablet} onChange={val => setAttributes({ minHeightTablet: val })} units={[pxUnit(), perUnit(), emUnit()]} />
										<PanelRow> <Label>{__('Padding:', 'video-background')} </Label> <Device/></PanelRow>
										<SpaceControl className='mt20' label="" value={paddingTablet} onChange={val => setAttributes({ paddingTablet: val })} defaults={{ vertical: '', horizontal: '' }} />


										</>}

										{deviceT ==="mobile" && <>
										{/* <Label className='mt20'>{__('Mobile', 'video-background')}</Label> */}
										<PanelRow> <Label>{__('Min Height:', 'video-background')} </Label> <Device/></PanelRow>
										<UnitControl  labelPosition='left' value={minHeightMobile} onChange={val => setAttributes({ minHeightMobile: val })} units={[pxUnit(), perUnit(), emUnit()]} />

											<PanelRow> <Label>{__('Padding:', 'video-background')} </Label> <Device/></PanelRow>
										<SpaceControl className='mt20' label="" value={paddingMobile} onChange={val => setAttributes({ paddingMobile: val })} defaults={{ vertical: '', horizontal: '' }} />
									

										</>}
								
								
										
										
										
									</PanelBody>

								</InspectorControls>


								<BlockControls>
									<AlignmentToolbar value={verticalAlign} onChange={val => setAttributes({ verticalAlign: val })} describedBy={__('Vertical Alignment')} alignmentControls={[
										{ title: __('Content in top', 'video-background'), align: 'flex-start', icon: verticalTopIcon },
										{ title: __('Content in center', 'video-background'), align: 'center', icon: verticalCenterIcon },
										{ title: __('Content in bottom', 'video-background'), align: 'flex-end', icon: verticalBottomIcon }
									]} />

									<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
								</BlockControls>

							<AboutProModal
							isProModalOpen={isProModalOpen}
							setIsProModalOpen={setIsProModalOpen}
							link="admin.php?page=video-background-block-dashboard#/pricing"
						>
							<li>
								<strong>{__("Pro:", "video-background")} </strong>
								{__("Everything in Free, plus powerful controls for professional video sections.", "video-background")}
							</li>

							<li>
								<strong>{__("Multiple Source Types:", "video-background")} </strong>
								{__("Use self-hosted, YouTube, and Vimeo videos with responsive device-wise URLs.", "video-background")}
							</li>
							<li>
								<strong>{__("Responsive Video Sources:", "video-background")} </strong>
								{__("Set separate Desktop, Tablet, and Mobile videos (MP4, WebM, OGG) for better performance.", "video-background")}
							</li>
							<li>
								<strong>{__("Advanced Playback:", "video-background")} </strong>
								{__("Control start/end time, playback speed, and video behavior for precise presentation.", "video-background")}
							</li>
							<li>
								<strong>{__("Poster Enhancements:", "video-background")} </strong>
								{__("Enable poster blur, auto dominant color, and per-device poster images for polished loading states.", "video-background")}
							</li>
							<li>
								<strong>{__("Overlay Effects:", "video-background")} </strong>
								{__("Use blend mode, pattern, noise, vignette, and opacity controls to improve readability.", "video-background")}
							</li>
						</AboutProModal>
								
							</>;
						};
						export default Settings;
