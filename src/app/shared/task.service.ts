import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = 'http://127.0.0.1:8000/api';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  addTask(Task: Task): Observable<any> {
    return this.http.post<Task>(BASE_URL+'/store', Task, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('Add Task'))
      );
  }
  
  getTaskList(): Observable<any[]> {
  
    return this.http.get<Task[]>(BASE_URL + '/tasks')
      .pipe(
        tap(Tasks => console.log('Tasks fetched!')),
        catchError(this.handleError<Task[]>('Get Tasks', []))
      );
  }
  updateTask(id, Task: Task): Observable<any> {
    return this.http.put(BASE_URL+'/update/' + id, Task, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Task updated: ${id}`)),
        catchError(this.handleError<Task[]>('Update Task'))
      );
  }
  deleteTask(id): Observable<Task[]> {
    return this.http.delete<Task[]>(BASE_URL+'/delete/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Task deleted: ${id}`)),
        catchError(this.handleError<Task[]>('Delete Task'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}