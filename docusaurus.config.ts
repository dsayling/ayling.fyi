import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Drew Ayling",
  tagline: "DevOps Connoisseur | Python Enthusiast | System Architect",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  // url: 'https://dsayling.github.io',
  // url: 'https://ayling.fyi',  // Cert is still pending
  url: "http://ayling.fyi",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "dsayling", // Usually your GitHub org/user name.
  projectName: "ayling.fyi", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        pages: {
          path: "src/pages",
          include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          // mdxPageComponent: '@theme/MDXPage',
          // remarkPlugins: [require('./my-remark-plugin')],
          rehypePlugins: [],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {name: 'keywords', content: 'python, tutorials, devops, testing, bdd, blog'},
    ],
    image: "img/social-card.png",
    navbar: {
      title: "Drew Ayling",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorials",
        },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/resume", label: "Resume", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Socials",
          items: [
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/drew-ayling/",
            },
            {
              label: "Medium",
              href: "https://dsayling.medium.com",
            },
            {
              label: "Goodreads",
              href: "https://www.goodreads.com/review/list/84078066-drew-ayling?ref=nav_mybooks",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/dsayling",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Drew Ayling. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["Bash", "Gherkin"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
