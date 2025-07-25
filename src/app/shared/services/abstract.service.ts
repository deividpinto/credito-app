import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface RepositoryInterface<T> {
  getAll(): Observable<T[]>;

  getById(id: number): Observable<T>;

  getOne(): Observable<T>;

  getOneBy(): Observable<T>;

  getAllBy(): Observable<T[]>;

  post(entity: T): Observable<T>;

  postList(entity: T[]): Observable<T>;

  postFormData(entity: FormData): Observable<T>;

  putFormData(entity: FormData, id: number | string): Observable<T>;

  put(entity: T, id: number): Observable<T>;

  patch(entity: T, id: number): Observable<T>;

  delete(id: number): Observable<any>;
}

export abstract class AbstractService<T> implements RepositoryInterface<T> {
  private readonly baseUrl: string;

  protected constructor(baseUrl: string, protected http: HttpClient) {
    this.baseUrl = baseUrl;
  }

  public getAll(relativeUrl?: string): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl(relativeUrl), this.headers()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getById(id?: number | string, relativeUrl?: string): Observable<T> {
    const url = `${this.getUrl(relativeUrl)}/${id}`;
    return this.http.get<T>(url, this.headers()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getAllBy(params?: any, relativeUrl?: string): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl(relativeUrl), {params}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getOne(relativeUrl?: string, returnIsFile: boolean = false): Observable<T> {
    return this.http.get<T>(this.getUrl(relativeUrl), this.headers(returnIsFile)).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getOneBy(params?: any, relativeUrl?: string): Observable<T> {
    return this.http.get<T>(this.getUrl(relativeUrl), {params}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public post(entity: T, relativeUrl?: string, returnIsFile: boolean = false): Observable<T> {
    return this.http
      .post<T>(this.getUrl(relativeUrl), entity, this.headers(returnIsFile))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  public postFormData(entity: FormData, relativeUrl?: string): Observable<T> {
    return this.http.post<T>(this.getUrl(relativeUrl), entity).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public putFormData(entity: FormData, id: number | string, relativeUrl?: string): Observable<T> {
    const url = `${this.getUrl(relativeUrl)}/${id}`;
    return this.http.put<T>(url, entity).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public postList(entity: T[], relativeUrl?: string): Observable<T> {
    return this.http
      .post<T[]>(this.getUrl(relativeUrl), entity, this.headers())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  public put(entity: T, id: number | string, relativeUrl?: string): Observable<T> {
    const url = `${this.getUrl(relativeUrl)}/${id}`;
    return this.http.put<T>(url, entity, this.headers()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public patch(entity: T, id: number | string, relativeUrl?: string): Observable<T> {
    const url = `${this.getUrl(relativeUrl)}/${id}`;
    return this.http.patch<T>(url, entity, this.headers()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public delete(id: any, relativeUrl?: string): Observable<any> {
    const url = `${this.getUrl(relativeUrl)}/${id}`;
    return this.http.delete(url, this.headers()).pipe(
      catchError(this.handleError)
    );
  }

  protected getUrl(relativeUrl?: string): string {
    let absoluteUrl = `${environment.apiUrl}/${this.baseUrl}`;
    if (relativeUrl !== '' && relativeUrl !== null && relativeUrl !== undefined) {
      absoluteUrl += `/${relativeUrl}`;
    }
    return absoluteUrl;
  }

  protected handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

  protected headers(returnIsFile?: boolean): any {
    if (returnIsFile) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'arraybuffer',
      };
    }
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
  }

  protected extractData(res: any) {
    return res;
  }
}
