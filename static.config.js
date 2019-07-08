import React from 'react';
import dotenv from 'dotenv';
dotenv.config();

const siteRoot = 'https://syllable-skipper.netlify.com/';
const stagingSiteRoot = 'http://localhost:3000';
const staticSiteData = {
  title: 'Skipper',
  siteRoot: siteRoot,
  description: 'Skipper is a dead simple password manager',
  imageUrl: `${siteRoot}/skipper_logo.png`,
  type: 'website',
};

// static.config.js
export default {
  getSiteData: () => ({
    title: 'Skipper',
    siteRoot: siteRoot,
    description: 'Skipper is a dead simple password manager',
    imageUrl: `${siteRoot}/skipper_logo.png`,
    type: 'website',
  }),
  plugins: [
    'react-static-plugin-sass',
    'react-static-plugin-reach-router',
  ],
  siteRoot: siteRoot,
  stagingSiteRoot: stagingSiteRoot,
  getRoutes: async ({ dev }) => [
    {
      path: '/',
      template: 'src/Components/Home',
    },
    {
      path: '/login',
      template: 'src/Components/Login'
    },
    {
      path: '/dashboard',
      template: 'src/Components/Dashboard'
    },
    {
      path: '/credential',
      template: 'src/Components/Credential'
    },
    {
      path: '/signup_confirmation',
      template: 'src/Components/SignupConfirmation'
    },
    {
      path: '/signup',
      template: 'src/Components/Signup'
    },
    {
      path: '/about',
      template: 'src/Components/About',
      noindex: true,
    },
    {
      path: '404',
      template: 'src/Components/404',
    },
  ],
  Document: ({
    Html,
    Head,
    Body,
    children,
    state: { siteData, renderMeta },
  }) => {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preload" as="font" href="/fonts/Matter-Regular.woff2" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" as="font" href="/fonts/Matter-Regular.woff" type="font/woff" crossOrigin="anonymous" />
          <link rel="preload" as="font" href="/fonts/Matter-SemiBold.woff2" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" as="font" href="/fonts/Matter-SemiBold.woff" type="font/woff" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous" />

          <title>{staticSiteData.title}</title>
          <meta name="title" content={staticSiteData.title} />
          <meta name="description" content={staticSiteData.description} />

          <meta property="og:title" content={staticSiteData.title} />
          <meta property="og:description" content={staticSiteData.description} />
          <meta property="og:image" content={staticSiteData.imageUrl} />
          <meta property="og:type" content={staticSiteData.type} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={staticSiteData.title} />
          <meta property="twitter:description" content={staticSiteData.description} />
          <meta property="twitter:image" content={staticSiteData.imageUrl} />
        </Head>
        <Body>{children}</Body>
      </Html>
    );
  },
}