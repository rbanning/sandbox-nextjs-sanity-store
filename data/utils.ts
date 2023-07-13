

export const normalize = (value: string | null) => (value ?? '').toLocaleLowerCase().replace(/\s/g, '_'); //lowercase and replace whitespace with underscore
