						import { __ } from '@wordpress/i18n';
						import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
						import { PanelBody,  TextControl, ToggleControl, PanelRow } from '@wordpress/components';

						import { Label, BBlocksAds, HelpPanel, InlineMediaUpload, Device } from '../../../../../bpl-tools/Components';
					
						import { verticalTopIcon, verticalCenterIcon, verticalBottomIcon } from '../../../utils/icons';
						import { AdvertiseCard } from "../../../../../bpl-tools/ProControls";
						

						const Settings = ({ attributes, setAttributes,deviceT }) => {


				



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
								verticalAlign,
								textAlign,
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

							






							return <>
								<InspectorControls>
									<div className='bPlInspectorInfo'>
										<BBlocksAds />
									</div>

									<HelpPanel slug='video-background-block' docsLink='https://bblockswp.com/docs/video-background-block' />


									<PanelBody className='bPlPanelBody' title={__('Video Sources', 'video-background')}>
									<AdvertiseCard planLink="/wp-admin/admin.php?page=video-background-block-dashboard#/pricing" />
									
										
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
									<AdvertiseCard planLink="/wp-admin/admin.php?page=video-background-block-dashboard#/pricing" />

										
									</PanelBody>

									<AdvertiseCard planLink="/wp-admin/admin.php?page=video-background-block-dashboard#/pricing" />
									

								</InspectorControls>


								<BlockControls>
									<AlignmentToolbar value={verticalAlign} onChange={val => setAttributes({ verticalAlign: val })} describedBy={__('Vertical Alignment')} alignmentControls={[
										{ title: __('Content in top', 'video-background'), align: 'flex-start', icon: verticalTopIcon },
										{ title: __('Content in center', 'video-background'), align: 'center', icon: verticalCenterIcon },
										{ title: __('Content in bottom', 'video-background'), align: 'flex-end', icon: verticalBottomIcon }
									]} />

									<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
								</BlockControls>

					
								
							</>;
						};
						export default Settings;
