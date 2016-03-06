import Response from "./response";

export default class HttpClient {
  constructor(options) {
    options = options || {};
    this.baseUrl = options.baseUrl || "";
    this.headers = options.headers || {};
    this.interceptors = [];
  }

  request(options) {
    const promise = new Promise((resolve, reject) => {
      const xhr = new window.XMLHttpRequest();

      xhr.onload = (e) => {
        const response = new Response(e);
        if (response.isSuccess) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onerror = (e) => {
        reject(new Response(e));
      };

      xhr.ontimeout = (e) => {
        reject(new Response(e));
      };

      xhr.open(options.method, this.baseUrl + options.url, true);

      for (let header of Object.keys(this.headers)) {
        xhr.setRequestHeader(header, this.headers[header]);
      }

      xhr.send(options.body);
    });

    for (let interceptor of this.interceptors) {
      promise.then(interceptor.response, interceptor.responseError);
    }

    return promise;
  }

  post(url, body) {
    return this.request({
      url: url,
      method: "POST",
      body: body
    });
  }
}
