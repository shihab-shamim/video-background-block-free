import img from "../../../assets/feature.png";

const slug = "video-background-block";

export const dashboardInfo = (info) => {
  const { version, licenseActiveNonce, adminUrl, deleteDataOnUninstall, uninstallNonce } = info;



  return {
    name: `Video Background Block`,
    displayName: `Video Background Block - Use video backgrounds in sections`,
    description:
      "Add YouTube, Vimeo, or self-hosted video as section backgrounds.",
    slug,
    version,

    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `${img}`,
      // proThumbnail: `https://i.ibb.co.com/tNS3b8z/Chat-GPT-Image-Feb-20-2026-02-11-20-PM.png`,
      // video: 'https://www.youtube.com/watch?v=milYZrqLJsE',
      isYoutube: false,
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 20161,
      plan_id: 33454,
      public_key: "pk_c450cd26984f6b711540a633d4fa1",
    },
    licenseActiveNonce,
    adminUrl,
    deleteDataOnUninstall,
    uninstallNonce,
    startCreate: {
      title: "Video Background Block",
      content: "<!-- wp:vbb/video-bg /-->",
    },
  };
};

export const welcomeInfo = (adminUrl = "") => ({
  // Hero card keyword chips
  keywords: ["YouTube", "Vimeo", "Self-hosted"],
  keywordsLabel: "Supports",

  // Getting Started tabbed steps
  gettingStarted: {
    tabs: [
      {
        key: "gutenberg",
        label: "Gutenberg",
        steps: [
          {
            num: 1,
            title: "Add the Block",
            body: "Open the block editor. Click <strong>+</strong> or type <strong>/Video Background</strong>.",
            link: { url: `${adminUrl}post-new.php`, label: "Open Editor" },
          },
          {
            num: 2,
            title: "Set Your Video",
            body: "Add a <strong>YouTube</strong>, <strong>Vimeo</strong>, or self-hosted video as the background.",
          },
          {
            num: 3,
            title: "Add Overlays",
            body: "Configure overlay color/gradient, patterns, blend modes, and vignette.",
          },
          {
            num: 4,
            title: "Style & Publish",
            body: "Adjust min height, padding, video fit, and playback options, then publish.",
          },
        ],
      },
      {
        key: "shortcode",
        label: "Shortcode",
        steps: [
          {
            num: 1,
            title: "Create a Video Background",
            body: "Go to <strong>Video Background</strong> in your admin menu and click <strong>Add New</strong>.",
            link: { url: `${adminUrl}post-new.php?post_type=vbb`, label: "Add New" },
          },
          {
            num: 2,
            title: "Build & Publish",
            body: "Configure the video and overlay, then <strong>Publish</strong> the post.",
          },
          {
            num: 3,
            title: "Copy the Shortcode",
            body: "Go to <strong>Video Background -> ShortCodes</strong> to find and copy the shortcode (e.g. <code>[vbb id=\"123\"]</code>).",
            link: { url: `${adminUrl}edit.php?post_type=vbb`, label: "All ShortCodes" },
          },
          {
            num: 4,
            title: "Paste & Display",
            body: "Paste the shortcode into any post, page, widget, or page builder layout.",
          },
        ],
      },
      {
        key: "elementor",
        label: "Elementor",
        steps: [
          {
            num: 1,
            title: "Create a Video Background",
            body: "Go to <strong>Video Background -> Add New</strong> to build and publish, then copy its shortcode.",
            link: { url: `${adminUrl}post-new.php?post_type=vbb`, label: "Add New" },
          },
          {
            num: 2,
            title: "Edit with Elementor",
            body: "Open any post or page in the <strong>Elementor</strong> editor.",
          },
          {
            num: 3,
            title: "Add Shortcode Widget",
            body: "Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.",
          },
          {
            num: 4,
            title: "Paste Shortcode",
            body: "Paste your shortcode (e.g., <code>[vbb id=\"123\"]</code>) into the widget input field and save your changes.",
          },
        ],
      },
      {
        key: "php",
        label: "PHP",
        steps: [
          {
            num: 1,
            title: "Get the ID",
            body: "Go to <strong>Video Background -> ShortCodes</strong> and note the <strong>ID</strong> you want to embed.",
            link: { url: `${adminUrl}edit.php?post_type=vbb`, label: "All ShortCodes" },
          },
          {
            num: 2,
            title: "Copy PHP Function",
            body: "Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[vbb id=\"YOUR_ID\"]'); ?&gt;</code></pre>",
          },
          {
            num: 3,
            title: "Insert in Template",
            body: "Open your theme or template files (e.g., <code>single.php</code>, <code>page.php</code>) in an editor.",
          },
          {
            num: 4,
            title: "Replace ID & Save",
            body: "Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID.",
          },
        ],
      },
    ],
  },

  // Changelogs — each list item starts with <strong>Type:</strong> for badges
  changelogs: [
    {
      version: "2.0.1",
      type: "update",
      list: ["<strong>Update:</strong> Added a modern and intuitive dashboard layout."],
    },
    {
      version: "2.0.0",
      type: "update",
      list: [
        "<strong>New:</strong> Universal Shortcodes — compatible with all page builders.",
        "<strong>New:</strong> Added advanced features to the Video Background block.",
        "<strong>Update:</strong> Added a modern dashboard to this plugin.",
      ],
    },
  ],
  changelogsLimit: 6,
  changelogsReadMoreLabel: "View More Changelogs",

  proFeatures: [
    "Everything in Free, plus advanced Pro features",
    "Universal Shortcodes: Compatible with all page builders",
    "Self-hosted video background (MP4/WebM/OGG)",
    "YouTube video as background",
    "Vimeo video as background",
    "Responsive video sources (desktop/tablet/mobile)",
    "Poster image support (desktop/tablet/mobile)",
    "Poster options: show/hide, blur with blur amount, dominant color (auto/manual)",
    "YouTube background support with no-cookie domain option",
    "Vimeo background support",
    "Overlay controls: color or gradient, opacity, blend mode",
    "Overlay patterns: dots, grid, diagonal with opacity",
    "Animated overlay with subtle motion",
    "Noise texture overlay",
    "Cinematic vignette overlay",
    "Min height and padding controls (desktop/tablet/mobile)",
    "Video fit options: cover, contain, fill",
    "Segment loop control (start/end)",
    "Playback speed control",
  ],
});

export const demoInfo = {
  // allInOneLabel: 'View Product Page',
  // allInOneLink: `https://bplugins.com/products/${slug}/`,
  demos: [
    {
      icon: "",
      title: "Default",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background/",
    },
    {
      icon: "",
      title: "Pattern Overly",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background-pattern-overly/",
    },
    {
      icon: "",
      title: "Blend Mode",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background-blend-mode/",
    },
    {
      icon: "",
      title: "Animated Overly",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background-animated-overly/",
    },

    {
      icon: "",
      title: "Cinematic Vignette",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background-cinematic-vignette/",
    },
    {
      icon: "",
      title: "PlayBack Speed(2x) And Poster Loader",
      description: "",
      category: "",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-background-playback/",
    },

    // setup and guide line ar jonno
    // {
    // 	icon: '',
    // 	title: 'Setup Guides',
    // 	children: [
    // 		{
    // 			title: 'Quick Start',
    // 			type: 'iframe',
    // 			url: `https://bplugins.com/docs/${slug}/`
    // 		},
    // 		{
    // 			title: 'Documentation',
    // 			type: 'iframe',
    // 			url: `https://bplugins.com/docs/${slug}/`
    // 		}
    // 	]
    // },
    // {
    // 	icon: '',
    // 	title: 'Live Preview',
    // 	type: 'iframe',
    // 	url: `https://bplugins.com/products/${slug}/`
    // }
  ],
};
// product_id: 20161,
// 			plan_id: 33454,

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
  pluginId: 20161,
  planId: 33454,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3,
  },
  features: [
    "Everything in Free, plus advanced Pro features",
    "Universal Shortcodes: Compatible with all page builders",
    "Self-hosted video background (MP4/WebM/OGG)",
    "YouTube video as background",
    "Vimeo video as background",
    "Responsive video sources (desktop/tablet/mobile)",
    "Poster image support (desktop/tablet/mobile)",
    "Poster options: show/hide, blur with blur amount, dominant color (auto/manual)",
    "YouTube background support with no-cookie domain option",
    "Vimeo background support",
    "Overlay controls: color or gradient, opacity, blend mode",
    "Overlay patterns: dots, grid, diagonal with opacity",
    "Animated overlay with subtle motion",
    "Noise texture overlay",
    "Cinematic vignette overlay",
    "Min height and padding controls (desktop/tablet/mobile)",
    "Video fit options: cover, contain, fill",
    "Segment loop control (start/end)",
    "Playback speed control",
  ],
};
