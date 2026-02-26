import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    private baseUrl = `http://localhost:8080/employee`;
    constructor(private http: HttpClient) { }
    getAll(): Observable<Employee[]> {
        console.log()
        return this.http.get<Employee[]>(this.baseUrl);
    }

    create(employee: Employee): Observable<number> {
        return this.http.post<number>(this.baseUrl, employee);
    }

    update(id: number, employee: Employee): Observable<number> {
        return this.http.put<number>(`${this.baseUrl}/${id}`, employee);
    }

    delete(id: number): Observable<number> {
        return this.http.delete<number>(`${this.baseUrl}/${id}`);
    }
}