

export const pick = (obj: any, ...propertiesToInclude: string[]) => {
  const ret: any = {};
  if (propertiesToInclude) {
    propertiesToInclude.forEach(prop => {
      if (prop in obj) {
        ret[prop] = obj[prop];
      }
    });
  }
  return ret;
}

export const omit = (obj: any, ...propertiesToExclude: string[]) => {
  if (!propertiesToExclude) {
    return {...obj};
  }

  const ret: any = {};
  Object.keys(obj).forEach(prop => {
    if (!propertiesToExclude.includes(prop)) {
      ret[prop] = obj[prop];
    }
  });
  return ret;
}