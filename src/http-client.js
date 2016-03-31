import Response from "./response";
import Headers from "./headers";

export default class HttpClient {
  constructor(options) {
    options = options || {};
    this.baseUrl = options.baseUrl || "";
    this.headers = new Headers(options.headers || {});
    this.interceptors = [];
  }

  request(options) {
    const promise = new Promise((resolve, reject) => {
      const xhr = new window.XMLHttpRequest();

      xhr.onload = function() {
        const response = new Response(this);

        if (response.isSuccess) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onerror = function() {
        reject(new Response(this));
      };

      xhr.ontimeout = function() {
        reject(new Response(this));
      };

      xhr.open(options.method, this.baseUrl + options.url, true);

      this.headers.forEach((value, name) => {
        xhr.setRequestHeader(name, value);
      });

      if (!this.headers.has("Content-Type")) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.send(options.body ? JSON.stringify(options.body) : null);
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
