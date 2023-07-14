const skuCharacters = 'abcdefghijklmnopqurstuvwxyz';

const product = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'sku',
      title: 'Sku',
      type: 'string'
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.name}--${doc.sku}`,
      }
    },
    {
      name: 'brief',
      title: 'Brief',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date'
    },
    {
      name: 'available',
      title: 'Available?',
      type: 'boolean'
    },
    {
      name: 'featured',
      title: 'Featured?',
      type: 'boolean'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: "block" }]
    },
  ],
  initialValue: () => ({
    available: true,
    featured: false,
    sku: [4,2].map(size => {      
      const letters = [];
      while (letters.length < size) {
        letters.push(skuCharacters[Math.floor(Math.random() * skuCharacters.length)]);
      }
      return letters.join('');
    }).join('-'),
    releaseDate: (new Date()).toISOString().split('T')[0]
  })
}

export default product;
