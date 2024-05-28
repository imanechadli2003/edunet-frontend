import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Branch} from "../shared/data/branch";
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  apiUrl = `${API_BASE_URL}/branches`;

  apiAdminUrl = `${API_BASE_URL}/admin/branches`;

  http = inject(HttpClient)

  constructor() {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}`);
  }

  createBranch(branch: Branch): Observable<Branch> {
    console.log(branch);
    return this.http.post<Branch>(`${this.apiAdminUrl}`, branch)
  }

  save(id: number, data: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiAdminUrl}/${id}`, data)
  }
}
