# httpi
Example:

```javascript
const http = new HttpClient({
  baseUrl: "http://localhost",
  headers: {
    "Authorization": "Bearer 1234"
  }
});

http.interceptors.push({
  response: (res) => {
    return res;
  },
  responseError: (res) => {
    return res;
  }
});

http.post("/hello").then(() => {
  done();
});
```
