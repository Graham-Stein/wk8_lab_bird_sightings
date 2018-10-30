const RequestHelper = function (url) {
  this.url = url;
};

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then((response) => response.json());
};

// post
RequestHelper.prototype.post = function (payload) {
  // fetch
    return fetch(this.url, {
      // mthod post
      method: "POST",
      // body json stringify payload
      body: JSON.stringify(payload),
      // headers
      headers: { "Content-Type": "application/json" }
    })
    //   then response - response.json()
    .then((response)=> response.json());
};

RequestHelper.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

module.exports = RequestHelper;
