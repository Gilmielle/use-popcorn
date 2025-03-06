import {API_KEY} from '#shared/lib/constants/index.ts'

type requestMethodsTypes = "GET" | "POST";

interface fetchWithGetParams {
  url: string,
  differentBaseUrl?: string,
  type?: string,
  headers?: Record<string, string>,
  contentType?: string
}

interface fetchWithPostParams extends fetchWithGetParams {
  body?: object | null | undefined,
}

interface getFormServerParams extends fetchWithGetParams, fetchWithPostParams {
  method?: requestMethodsTypes,
}


export class ApiClient {

  static instance: ApiClient;
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    if (!ApiClient.instance) {
      ApiClient.instance = this;
    }
    this.baseUrl = this.getBaseUrl(baseUrl);
    return ApiClient.instance;
  }

  getBaseUrl(url: string) {
    if (!url.endsWith("/")) {
      return url + "/";
    }
    return url
  }

  getEndpointUrl(url: string, differentBaseUrl?: string) {
    if (differentBaseUrl) {
      return this.getBaseUrl(differentBaseUrl) + (url.startsWith("/") ? url.substring(1) : url);
    }
    return this.baseUrl + (url.startsWith("/") ? url.substring(1) : url);
  }

  async get(
    {
      url = "",
      type = "json",
      headers,
      contentType,
      differentBaseUrl = "",
    }: fetchWithGetParams,
    signal?: AbortSignal,
  ) {
    return await this.getFormServer(
      {
        url: this.getEndpointUrl(url, differentBaseUrl),
        method: "GET",
        type,
        headers,
        contentType,
      },
      signal,
    )
  }

  async post(
    {
      url = "",
      body = null,
      type = "json",
      headers,
      contentType,
      differentBaseUrl = "",
    }: fetchWithPostParams,
    signal?: AbortSignal,
  ) {

    return await this.getFormServer(
      {
        url: this.getEndpointUrl(url, differentBaseUrl),
        method: "POST",
        body,
        type,
        headers,
        contentType,
      },
      signal,
    )
  }

  async getFormServer(
    {
      url = this.baseUrl,
      method = "GET",
      body = null,
      headers = new Headers(),
      type = "json",
      contentType = "application/json",
    }: getFormServerParams,
    signal?: AbortSignal
  ) {
    const requestUrl: URL = new URL(url);
    const requestHeaders = this.getHeaders(headers, contentType);

    const requestInit = {
      method,
      body: method === "GET" ? null : JSON.stringify(body ?? {}),
      headers: requestHeaders,
      signal
    } as RequestInit;

    return await fetch(requestUrl.toString(), requestInit)
      .then(async (resp: Response) => {
        return await this.getResponse(resp, type)
      })
  }

  getHeaders(headers: HeadersInit | undefined, contentType: string | undefined) {
    const result = new Headers({
      ...headers,
      'X-API-KEY': API_KEY,
    });
    if (contentType !== "auto" && !!contentType) {
      result.set("Content-Type", contentType)
    }
    return result;
  };

  async getResponse(resp: Response, type = "json") {
    const {ok, status} = resp;
    return await ((ok) ? (type === "json") ? resp.json() : resp.text() : Promise.reject(status));
  };

}
