

export class ClientCommunicator {
  private SERVER_URL: string;

  public constructor(SERVER_URL: string) {
    this.SERVER_URL = SERVER_URL;
  }

  
  private getUrl(endpoint: string): string {
    return this.SERVER_URL + endpoint;
  }

  private getParams(
    method: string,
    headers?: Headers,
    body?: BodyInit
  ): RequestInit {
    const params: RequestInit = { method: method };

    if (headers) {
      params.headers = headers;
    }

    if (body) {
      params.body = body;
    }

    return params;
  }
}