import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Branch} from "../shared/data/branch";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  apiUrl = 'http://localhost:10000/api/branches';

  apiAdminUrl = 'http://localhost:10000/api/admin/branches';

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
