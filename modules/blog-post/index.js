export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Blog Post',
    pluralLabel: 'Blog Posts',
    slugPrefix: 'blog',
    // Enable editorial workflow
    publishable: true,
    // Make content publicly accessible via API
    publicApiProjection: {
      title: 1,
      slug: 1,
      excerpt: 1,
      content: 1,
      author: 1,
      category: 1,
      status: 1,
      publishedAt: 1,
      featuredImage: 1
    },
    // Set default permissions
    permissions: {
      create: ['author', 'editor', 'admin'],
      edit: ['author', 'editor', 'admin'],
      publish: ['editor', 'admin'],
      unpublish: ['editor', 'admin'],
      delete: ['admin']
    }
  },
  fields: {
    add: {
      title: {
        type: 'string',
        required: true
      },
      slug: {
        type: 'slug',
        following: 'title'
      },
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'strike',
                'link',
                'bulletList',
                'orderedList'
              ]
            },
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      },
      author: {
        type: 'string',
        required: true
      },
      category: {
        type: 'select',
        choices: [
          { label: 'Health & Wellness', value: 'health-wellness' },
          { label: 'Physiotherapy', value: 'physiotherapy' },
          { label: 'Community', value: 'community' },
          { label: 'Education', value: 'education' },
          { label: 'Research', value: 'research' },
          { label: 'Patient Stories', value: 'patient-stories' }
        ],
        required: true
      },
      featuredImage: {
        type: 'attachment',
        options: {
          fileGroup: 'images'
        }
      },
      excerpt: {
        type: 'string',
        textarea: true,
        maxLength: 300
      },
      status: {
        type: 'select',
        choices: [
          { label: 'Draft', value: 'draft' },
          { label: 'Submitted for Review', value: 'submitted' },
          { label: 'Under Review', value: 'reviewing' },
          { label: 'Approved', value: 'approved' },
          { label: 'Published', value: 'published' },
          { label: 'Rejected', value: 'rejected' }
        ],
        defaultValue: 'draft',
        required: true
      },
      publishedAt: {
        type: 'date',
        required: false
      },
      _reviewer: {
        type: 'relationship',
        withType: '@apostrophecms/user',
        required: false,
        if: {
          status: 'reviewing'
        }
      },
      reviewNotes: {
        type: 'string',
        textarea: true,
        required: false,
        if: {
          status: 'reviewing'
        }
      },
      rejectionReason: {
        type: 'string',
        textarea: true,
        required: false,
        if: {
          status: 'rejected'
        }
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'slug', 'content', 'author', 'category']
      },
      media: {
        label: 'Media & Presentation',
        fields: ['featuredImage', 'excerpt']
      },
      publishing: {
        label: 'Publishing',
        fields: ['status', 'publishedAt']
      },
      review: {
        label: 'Review Process',
        fields: ['_reviewer', 'reviewNotes', 'rejectionReason']
      }
    }
  },
  
  // Add custom methods for role-based actions
  methods(self, options) {
    return {
      // Check if user can edit this post
      canEdit(user, post) {
        if (!user) return false;
        if (user.groups.includes('admin')) return true;
        if (user.groups.includes('editor')) return true;
        if (user.groups.includes('author') && post.author === user.title) return true;
        return false;
      },
      
      // Check if user can publish this post
      canPublish(user) {
        if (!user) return false;
        return user.groups.includes('admin') || user.groups.includes('editor');
      },
      
      // Submit post for review
      async submitForReview(postId, userId) {
        const post = await self.findOne({ _id: postId });
        if (post) {
          post.status = 'submitted';
          await self.updateOne({ _id: postId }, { status: 'submitted' });
        }
      }
    };
  }
};
