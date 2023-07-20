//NOTE: the following can be used as a parameter for the Date.prototype.toLocaleDateString() method
//      example new Date().toLocaleDateString(enUS, dateFormatting.MMMddYYYY)


export const enUS = 'en-US';

export const dateFormatting: Record<string, Intl.DateTimeFormatOptions> = {

  MMMddYYYY: {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  },
  
}


//expect date to be in YYYY-MM-DD format
export const parseSanityDate = (d: string) => {
  if (d.includes('T')) { d = d.split('T')[0]; }
  const pattern = /\d{4}\-\d{2}\-\d{2}/;
  if (!d || !d.match(pattern)) {
    throw new Error('Could not parse date.  Invalid or missing date string');
  }

  const [year, month, day] = d.split('-').map(x => parseInt(x));
  return new Date(year, month-1, day);  //remember - date month is zero indexed
}