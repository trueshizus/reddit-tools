interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

class RedditApiClient {
  private accessToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  private async refreshAccessToken() {
    const url = "https://www.reddit.com/api/v1/access_token";
    const clientId = process.env.REDDIT_CLIENT_ID!;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET!;
    const username = process.env.REDDIT_USERNAME!;
    const password = process.env.REDDIT_PASSWORD!;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const data: TokenResponse = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + data.expires_in * 1000;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      throw new Error("Failed to refresh access token");
    }
  }

  private async ensureAccessToken() {
    if (
      !this.accessToken ||
      (this.tokenExpiresAt && Date.now() >= this.tokenExpiresAt)
    ) {
      await this.refreshAccessToken();
    }
  }

  public async makeAuthenticatedRequest(
    endpoint: string,
    method: "GET" | "POST" = "GET",
    data?: any
  ) {
    await this.ensureAccessToken();

    try {
      const response = await fetch(`https://oauth.reddit.com${endpoint}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "User-Agent": "BotonAr/1.0.0",
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error("Failed to make authenticated request");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to make authenticated request", error);
      throw new Error("Failed to make authenticated request");
    }
  }

  public async me() {
    return this.makeAuthenticatedRequest("/api/v1/me");
  }

  public async remove(postId: string) {
    return this.makeAuthenticatedRequest(`/api/remove`, "POST", { id: postId });
  }

  public async approve(postId: string) {
    return this.makeAuthenticatedRequest(`/api/approve`, "POST", {
      id: postId,
    });
  }

  public async getComments(postId: string) {
    return this.makeAuthenticatedRequest(`/comments/${postId}`);
  }

  public subreddit(subredditName: string) {
    return {
      listing: (type: "new" | "hot" | "best") =>
        this.makeAuthenticatedRequest(`/r/${subredditName}/${type}`),
      about: () => this.makeAuthenticatedRequest(`/r/${subredditName}/about`),
      modqueue: () =>
        this.makeAuthenticatedRequest(`/r/${subredditName}/about/modqueue`),
    };
  }
}

const redditApiClient = new RedditApiClient();

export default redditApiClient;
