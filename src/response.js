export default class Response {
  constructor(xhr) {
    this.statusCode = xhr.status;
    this.isSuccess = this.statusCode >= 200 && this.statusCode < 300;
    this.responseText = xhr.responseText;
  }

  json() {
    return JSON.parse(this.responseText);
  }
}
