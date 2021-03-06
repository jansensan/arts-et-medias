const sortAlphabetically = require('../../utils/sort-alphabetically');

const DescriptionField = require('../../fields/rich-text-description.json');
const HeroImageField = require('../../fields/hero-image.json');
const NameField = require('../../fields/name.json');
const RelatedOrganizations = require('../../fields/related-organizations.json');
const RelatedPeople = require('../../fields/related-people.json');
const ShortDescriptionField = require('../../fields/short-description.json');
const WebsiteField = require('../../fields/website.json');
const YearPublishedField = require('../../fields/year-published.json');


const type = 'project';


module.exports = {
  extend: 'apostrophe-pieces',
  name: type,
  label: 'Project',
  pluralLabel: 'Projects',
  addFields: [
    // basics
    {
      label: 'Creator',
      idsField: 'creatorIds',
      help: 'Person or collective who created the project.',
      name: '_author',
      type: 'joinByArray',
      withType: [
        'person',
        'organization',
      ],
      filters: {
        projection: {
          _url: 1,
          title: 1,
        },
      },
      required: true,
    },

    // reverse relations
    {
      name: '_articlesMentioned',
      reverseOf: '_relatedProjects',
      type: 'joinByArrayReverse',
      withType: 'article',
      filters: {
        projection: {
          '_url': 1,
          'title': 1,
        },
      },
    },
    {
      name: '_booksMentioned',
      reverseOf: '_relatedProjects',
      type: 'joinByArrayReverse',
      withType: 'book',
      filters: {
        projection: {
          '_url': 1,
          'title': 1,
        },
      },
    },
    {
      name: '_eventsMentioned',
      reverseOf: '_relatedProjects',
      type: 'joinByArrayReverse',
      withType: 'event',
      filters: {
        projection: {
          '_url': 1,
          'title': 1,
        },
      },
    },
    {
      name: '_programsMentioned',
      reverseOf: '_relatedProjects',
      type: 'joinByArrayReverse',
      withType: 'education',
      filters: {
        projection: {
          '_url': 1,
          'title': 1,
        },
      },
    },

    ...DescriptionField,
    ...HeroImageField,
    ...NameField,
    ...RelatedOrganizations,
    ...RelatedPeople,
    ...ShortDescriptionField,
    ...WebsiteField,
    ...YearPublishedField,
  ],
  arrangeFields: [
    {
      label: 'Basics',
      name: 'basics',
      fields: [
        'title',
        'yearPublished',
        '_author',
        'website',
        'description',
      ],
    },
    {
      label: 'Hero Image',
      name: 'heroImage',
      fields: [
        'heroImage',
      ],
    },
    {
      label: 'Metadata',
      name: 'meta',
      fields: [
        'shortDescription',
        'tags',
      ],
    },
    {
      label: 'Related Content',
      name: 'relatedContent',
      fields: [
        '_relatedPeople',
        '_relatedOrganizations',
      ],
    },
    {
      label: 'CMS Properties',
      name: 'aposProps',
      fields: [
        'slug',
        'published',
        'trash',
      ],
    },
  ],

  construct: (self, options) => {
    const { apos } = self;

    self.on('apostrophe-pages:beforeSend', 'fetchAEMProjects', async function(req) {
      // sorted by title
      const projectsByTitle = await apos.docs.getManager(type)
        .find(req, { type })
        .toArray();
      projectsByTitle.sort(sortAlphabetically);
      req.data.projectsByTitle = projectsByTitle;

      // sorted recent to old
      req.data.projectsByMostRecent = await apos.docs.getManager(type)
        .find(req, { type })
        .sort({ createdAt: -1 })
        .toArray();
    });
  },
};
