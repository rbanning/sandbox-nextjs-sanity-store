
function email(value: string) {
  const regex = new RegExp("^[^@]+@[^@]+\.[^@]+$", 'g');
  if (value.match(regex)) { return true; }
  //else
  return "Invalid email address";
}

function phone(value: string) {
  const regex = new RegExp("^[0-9]{3}[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$", 'g');
  if (value.match(regex)) { return true; }
  //else
  return "Invalid phone number";
}

function password(value: string) {
  const checks = [
    {fn: (v: string) => v.length >= 8 && v.length <=32, msg: 'Must be at least 8 characters long and not more than 32 characters'},
    {fn: (v: string) => v.match(/[a-z]+/g), msg: 'Must have at least one lowercase letter'},
    {fn: (v: string) => v.match(/[A-Z]+/g), msg: 'Must have at least one uppercase letter'}, 
    {fn: (v: string) => v.match(/[0-9]+/g), msg: 'Must have at least one digit'},
    {fn: (v: string) => v.match(/[~!@#$%^&*()_+`\-\[\],.;:'"]+/g), msg: 'Must have at least one special character'}
  ]
  for(let i=0; i<checks.length; i++) {
    if (!checks[i].fn(value)) {
      return checks[i].msg;
    }
  }
  //else ok
  return true;
}

export const validators = {
  email,
  phone,
  password,
}