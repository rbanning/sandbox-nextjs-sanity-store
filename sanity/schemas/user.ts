import { PasswordInput } from "../components/password/password-input";
import { dateFormatting, enUS, parseSanityDate } from "../utils/date-helpers";
import { validators } from "./_validations";

const user = {
  name: 'user',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: any) => rule.required().max(100),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule: any) => rule.required().custom(validators.email),
    },
    {
      name: 'mobile',
      title: 'Mobile Phone',
      type: 'string',
      validation: (rule: any) => rule.custom(validators.phone), //optional
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Only approved users appear on the site",
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (rule: any) => rule.required().custom(validators.password),
      description: "Between 8 and 32 characters, with upper and lowercase, a digit, and a special character",
      readOnly: ({currentUser, document}: any) => {
        const readonly = 
          !currentUser.roles.some((r:any) => r.name === 'administrator')
          && !!document._createdAt;
        return readonly;
      },
      components: {
        input: PasswordInput
      }
    },
    {
      name: 'hash',
      title: 'Hash',
      type: 'slug',
      options: {
        source: '_id',
        slugify: buildHash
      }
    }
  ],
  initialValue: () => ({
    approved: false
  }),
  preview: {
    select: {
      name: 'name',
      email: 'email',
      date: '_createdAt'
    },
    prepare({name, email, date}: {name: string, email: string, date: string}) {
      const d = !date ? null : parseSanityDate(date);
      return {
        title: `${name || 'User'} [${email || 'no email'}]`,
        subtitle: !d ? 'unknown date' : d.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)
      }
    }
  }
}

export default user;

function buildHash(input: any, schemaType: any, context: any) {
  console.log("SLUGGING", {input, schemaType, context});
  return `hash of ${input || 'n/a'}`;
}
