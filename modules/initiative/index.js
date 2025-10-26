export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Initiative',
    pluralLabel: 'Initiatives',
    slugPrefix: 'initiative',
    // Make content publicly accessible via API - only expose simple fields
    publicApiProjection: {
      title: 1,
      slug: 1,
      status: 1,
      startDate: 1,
      endDate: 1,
      location: 1,
      targetAudience: 1
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
      description: {
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
      image: {
        type: 'attachment',
        options: {
          fileGroup: 'images'
        }
      },
      startDate: {
        type: 'date',
        required: true
      },
      endDate: {
        type: 'date',
        required: false
      },
      status: {
        type: 'select',
        choices: [
          { label: 'Planning', value: 'planning' },
          { label: 'Active', value: 'active' },
          { label: 'Completed', value: 'completed' },
          { label: 'On Hold', value: 'on-hold' }
        ],
        defaultValue: 'planning',
        required: true
      },
      impactMetrics: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'bold',
                'italic',
                'bulletList',
                'orderedList'
              ]
            }
          }
        }
      },
      location: {
        type: 'string'
      },
      targetAudience: {
        type: 'string'
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'slug', 'description', 'location', 'targetAudience']
      },
      media: {
        label: 'Media',
        fields: ['image']
      },
      timeline: {
        label: 'Timeline',
        fields: ['startDate', 'endDate', 'status']
      },
      impact: {
        label: 'Impact & Results',
        fields: ['impactMetrics']
      }
    }
  }
};
