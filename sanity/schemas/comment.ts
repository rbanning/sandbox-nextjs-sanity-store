import { dateFormatting, enUS, parseSanityDate } from "../utils/date-helpers";

const comment = {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Only approved comments appear on the site"
    },
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }]
    },
    {
      name: 'stars',
      title: 'Stars',
      type: 'rating',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "Short summary of your comment",
      validation: (rule: any) => rule.required().max(60)
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text'
    },
  ],
  initialValue: () => ({
    approved: false
  }),
  preview: {
    select: {
      name: 'name',
      product: 'product.name',
      date: '_createdAt'
    },
    prepare({name, product, date}: {name: string, product: string, date: string}) {
      const d = parseSanityDate(date);
      return {
        title: `${name} on ${d.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}`,
        subtitle: product
      }
    }
  }
}

export default comment;

