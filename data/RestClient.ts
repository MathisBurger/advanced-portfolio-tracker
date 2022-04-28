
export abstract class RestClient {


    private readonly additionalHeaders: Headers;
    private readonly fetchMode: RequestMode;
    private readonly credentials: RequestCredentials;
    private readonly referrer: string;
    private readonly referrerPolicy: ReferrerPolicy;


    constructor(
        headers: Headers = new Headers({'Content-Type': 'application/json'}),
        mode: RequestMode = 'cors',
        credentials: RequestCredentials = 'omit',
        referrer: string = '',
        referrerPolicy: ReferrerPolicy = 'strict-origin-when-cross-origin'
    ) {
        this.additionalHeaders = headers;
        this.fetchMode = mode;
        this.credentials = credentials;
        this.referrer = referrer;
        this.referrerPolicy = referrerPolicy;
    }
    /**
     * The general shaped request function for doing a
     * REST http request.
     *
     * @param method The request method
     * @param path The path to the endpoint
     * @param body The request body if its given
     * @param contentType The content type of the request
     * @param emptyResponse If the returned response is empty
     * @return Promise<T> The generic promise response
     * @throws Error If the status code is not 200
     */
    private async fetchEndpoint<T>(
        method: string,
        path: string,
        body?: any,
        contentType: string | undefined = 'application/json',
        emptyResponse: boolean = false
    ): Promise<T> {
        const fetchResult = await fetch(path, {
            body: body,
            method: method,
            mode: this.fetchMode,
            headers: this.additionalHeaders,
            credentials: this.credentials,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy
        });
        if (fetchResult.status === 401) {
            if (window.location.pathname === "/login") return {} as any;
            window.location.replace("/login");
        }
        if (fetchResult.status !== 200 && fetchResult.status !== 204) {
            // Parse to generic error response
            throw new Error('Something went wrong');
        }
        if (fetchResult.status === 204) {
            return {} as any;
        }
        if (!emptyResponse) {
            return (await fetchResult.json()) as T;
        }
        return {} as any;
    }

    /**
     * The general GET request.
     *
     * @param path The path to the endpoint
     * @return Promise<T> The response as generic promise
     */
    protected async get<T>(path: string): Promise<T> {
        return await this.fetchEndpoint<T>("GET", path);
    }

    /**
     * The general POST request.
     *
     * @param path The path to the resp endpoint
     * @param body The http body of the request
     * @param emptyResponse If the response has no json body
     * @return Promise<T> The response as generic promise
     */
    protected async post<T>(path: string, body: any, emptyResponse: boolean = false): Promise<T> {
        return await this.fetchEndpoint<T>("POST", path, body, 'application/json', emptyResponse);
    }

    /**
     * The general DELETE request.
     *
     * @param path The path to the REST endopint.
     * @param body The body of the delete request
     */
    protected async delete<T>(path: string, body?: any): Promise<T> {
        return await this.fetchEndpoint<T>("DELETE", path, body);
    }
}
