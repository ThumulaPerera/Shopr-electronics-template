export const required = value => value ? undefined : 'Required'
export const integer = value => Number.isInteger(parseFloat(value)) ? undefined : 'Must be an integer'
export const positive = value => parseFloat(value) > 0 ? undefined : 'Must be a positive value'