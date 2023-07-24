

export class CommentService {

  async submit(data: any) {
    const validation = this.validate(data);
    if (!validation.ok) {
      throw new Error(validation.errors.join('. '));
    }

    const ret = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 
        'content-type': 'application/json'
      }
    });
    if (!ret.ok) {
      throw new Error(`${ret.status} - ${ret.statusText}`);
    }

    return await ret.json();
  }

  validate(data: any) {
    const errors: string[] = [];
    if (!data) { errors.push('Missing data - No data to validate'); }
    else {
      if (!data.productId) { errors.push('Missing product id'); }
      if (!data.name) { errors.push('Missing name'); }
      if (!data.email) { errors.push('Missing email'); }
      if (!data.title) { errors.push('Missing title'); }
      if (!data.stars) { errors.push('Missing rating'); }
      if (!data.comment) { errors.push('Missing comment'); }
    }

    return {
      ok: errors.length === 0,
      errors
    };
  }
}