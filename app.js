import apostrophe from 'apostrophe';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

apostrophe({
  root: import.meta,
  shortName: 'meadow-cms',
  port: process.env.PORT || 3001,
  // MongoDB Atlas configuration
  mongodb: {
    uri: process.env.APOS_MONGODB_URI
  },
  modules: {
    // Content Types
    'blog-post': {},
    'initiative': {},
    
    // Essential ApostropheCMS modules
    '@apostrophecms/login': {},
    '@apostrophecms/page': {},
    '@apostrophecms/home-page': {},
    '@apostrophecms/settings': {},
    '@apostrophecms/notification': {},
    '@apostrophecms/i18n': {},
    '@apostrophecms/error': {},
    '@apostrophecms/asset': {},
    '@apostrophecms/attachment': {},
    '@apostrophecms/image': {},
    '@apostrophecms/area': {},
    '@apostrophecms/widget-type': {},
    
    // Session configuration for authentication
    '@apostrophecms/express': {
      options: {
        port: process.env.PORT || 3001,
        session: {
          secret: process.env.SESSION_SECRET || 'your-secret-key-here-change-in-production'
        },
        // CORS configuration for website integration
        cors: {
          origin: [
            process.env.WEBSITE_URL || 'http://localhost:3000',
            'https://your-website-domain.com'
          ],
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization']
        }
      }
    },
    
    // User management and roles
    '@apostrophecms/user': {
      options: {
        groups: [
          {
            name: 'admin',
            label: 'Administrator',
            permissions: ['admin']
          },
          {
            name: 'editor',
            label: 'Editor',
            permissions: ['edit', 'publish', 'unpublish']
          },
          {
            name: 'author',
            label: 'Author',
            permissions: ['edit-own', 'submit-for-review']
          },
          {
            name: 'reviewer',
            label: 'Reviewer',
            permissions: ['edit', 'review', 'publish', 'unpublish']
          }
        ]
      }
    },
    
    // Widget configurations
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    
    // Asset configuration
    '@apostrophecms/asset': {},
    
    // Vite for asset bundling
    '@apostrophecms/vite': {},
    
    // Default page type
    'default-page': {}
  }
});