import HttpService from "./htttp.service";

class RecommendationService {
  // authEndpoint = process.env.API_URL;

  getRecommendation = async(page = 1,size = 10) => {
    const endpoint = "recommendations"
    return await HttpService.get(endpoint);
  }

  getRecommendationBy = async(id) => {
    const endpoint = `recommendations/${id}`
    return await HttpService.get(endpoint);
  }
  // authEndpoint = process.env.API_URL;

  createRecommendation = async(data) => {
    console.log("Inside create recc")
    const endpoint = "recommendations"
    return await HttpService.post(endpoint,data);
  }

}

export default new RecommendationService();
