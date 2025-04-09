import axios from "axios";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };


  callApi = async (method, endpoint, data = null, headers = {}) => {
    try {
      const response = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        data,
        headers: {
          "Content-Type": "application/json",
          ...headers, // Allow custom headers to be passed in
        },
        withCredentials: true, // Include cookies if needed
      });

      console.log("API Response:", response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error("API Error:", error);

      // Handle known server-side error response
      if (error.response) {
        console.error("Server Error:", error.response.data);
        throw error.response.data; // Rethrow specific error details
      }

      // Handle other unexpected errors
      throw error; // Rethrow for the caller to handle
    }
  };


  get = async (url) => await this.request(this.getOptionsConfig("get", url));

  post = async (url, data) => await this.request(this.getOptionsConfig("post", url, data));

  put = async (url, data) => await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) => await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url) => await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json" },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => {
          console.log("Successful request", res)
          resolve(res.data)
        })
        .catch((ex) => {
          console.log("Error in request", ex)
          reject(ex.response.data)
        });
    });
  }
}

export default new HttpService();
