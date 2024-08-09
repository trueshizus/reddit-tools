import axios, { AxiosInstance } from "axios";

interface Credentials {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

class RedditApiClient {
  private axiosInstance: AxiosInstance;
  private credentials: Credentials;
  private accessToken: string | null = null;
  private userAgent: string = "RedditApiClient/0.1";

  constructor(credentials: Credentials) {
    this.credentials = credentials;
    this.axiosInstance = axios.create({
      baseURL: "https://oauth.reddit.com",
    });
  }

  private async obtainAccessToken() {
    try {
      const response = await axios.post(
        "https://www.reddit.com/api/v1/access_token",
        new URLSearchParams({
          grant_type: "password",
          username: this.credentials.username,
          password: this.credentials.password,
        }),
        {
          auth: {
            username: this.credentials.clientId,
            password: this.credentials.clientSecret,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error("Error obtaining access token:", error);
      throw error;
    }
  }

  private async ensureAccessToken() {
    if (!this.accessToken) {
      await this.obtainAccessToken();
    }
  }

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "User-Agent": this.userAgent,
    };
  }

  async me() {
    await this.ensureAccessToken();
    try {
      const response = await this.axiosInstance.get("/api/v1/me", {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  subreddit(subredditName: string) {
    return {
      listing: (listingType: string) =>
        this.getSubredditListing(subredditName, listingType),
    };
  }

  private async getSubredditListing(
    subredditName: string,
    listingType: string
  ) {
    await this.ensureAccessToken();
    try {
      const response = await this.axiosInstance.get(
        `/r/${subredditName}/${listingType}`,
        {
          headers: this.getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching ${listingType} listing for subreddit ${subredditName}:`,
        error
      );
      throw error;
    }
  }

  async approve(thingName: string) {
    await this.ensureAccessToken();
    try {
      const response = await this.axiosInstance.post(
        "/api/approve",
        new URLSearchParams({ id: thingName }),
        {
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error approving ${thingName}:`, error);
      throw error;
    }
  }

  async remove(thingName: string) {
    await this.ensureAccessToken();
    try {
      const response = await this.axiosInstance.post(
        "/api/remove",
        new URLSearchParams({ id: thingName }),
        {
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error removing ${thingName}:`, error);
      throw error;
    }
  }
}

const credentials: Credentials = {
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
};

const api_client = new RedditApiClient(credentials);

export default api_client;
