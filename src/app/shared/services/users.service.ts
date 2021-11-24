
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import {map} from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { }
    
    getUserByEmail(email: string): Observable<User>{
        return this.http.get(`http://localhost:3000/users?email=${email}`)
        .pipe(map((res: any) => res)).pipe(map((user: User[])=> user[0]));
    }
}

