export default class Headers {
  constructor(headers) {
    this.headers = headers;
  }

  has(name) {
    name = name.toLowerCase();

    return Object.keys(this.headers).some((key) => {
      return key.toLowerCase() === name;
    });
  }

  forEach(callback) {
    for (let header of Object.keys(this.headers)) {
      callback(this.headers[header], header);
    }
  }
}
