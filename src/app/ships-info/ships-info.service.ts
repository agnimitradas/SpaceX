import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ShipsService {
  constructor(private http: HttpClient) {}

  getShipsList(params: any) {
    let queryParams = Object.assign({}, params || {}, { limit: 100 });
    const url = "https://api.spacexdata.com/v3/launches";
    return this.http.get(url, { params: queryParams });
  }
}
