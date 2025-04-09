import i18next from "i18next";
import HttpService from "./htttp.service";

export const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = async (config) => {
    const token = localStorage.getItem("token");
    const currentLanguage = i18next.language || "en"; // Default to English
  
    // Set Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  
    // Check if `lang` is already in the URL
    const url = new URL(config.url, window.location.origin); // Create URL object
    if (!url.searchParams.has("lang")) {
      url.searchParams.append("lang", currentLanguage);
      config.url = url.pathname + url.search; // Update request URL
    }
  
    return config;
  };
  

  const onRequestFail = (error) => Promise.reject(error);
  HttpService.addRequestInterceptor(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response) => response;

  const onResponseFail = (error) => {
    const status = error.status || error.response?.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }

    return Promise.reject(error);
  };

  HttpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
};
