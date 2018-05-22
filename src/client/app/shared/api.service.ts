import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: Http) { }
  get(url: string) {
    return this.request(url, RequestMethod.Get);
  }
  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }
  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }
  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });
    if (body) {
      requestOptions.body = body;
    }
    const request = new Request(requestOptions);

    // we can reutrn the observable which will be the result of calling the request on http class
    // use the map operator in order to extract the response body
    return this.http.request(request)
    .map((res: Response) => res.json())
    .catch((err: any) => {
      // this.onRequestError(err);
      const statusCode = err.status;
      const Body = err.json();
      const error = {
        statusCode: statusCode,
        error: Body.error
      };
      console.log(error);
        return Observable.throw(error);
    });
  }
}
