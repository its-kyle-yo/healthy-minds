import axios, { AxiosInstance } from 'axios';

class API {
  private instance: AxiosInstance = axios.create({
    baseURL: "https://raw.githubusercontent.com/hminnovations/coding-challenge-content/master/",
  });

  private endpoints: APIEndpoints =  {
    description: "healthy-minds-description.json",
    progress: "alice-progress.json"
  }

  get = (): APIGetRequests => {
    return { 
      description: this.getDescription,
      progress: this.getProgress
    };
  }

  getDescription = async (): Promise<APIDescriptionReturn> => {
    const { data } = await this.instance.get(this.endpoints.description);
    return data;
  }

  getProgress = async (): Promise<APIProgressReturn> => {
    const { data } = await this.instance.get(this.endpoints.progress);
    return data;
  }
}

export default new API();