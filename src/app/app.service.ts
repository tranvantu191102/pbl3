import { AngularFireList,AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  status!:  AngularFireList<any>;
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.status = this.db.list('test');
  }

  getStatus(): Observable<any> {
    return this.status.snapshotChanges().pipe(
      map((changes:any) => {
        return  changes.map((c:any) => {
          const key = c.payload.key;
          const value = c.payload.val();
          return {key,value}
        }
      )
      }
      )
    );
  }

  updateStatus(key: string, value:any):  Promise<void>{
    console.log("AAA", key, value)
    const updateObject:any = {};
  updateObject[key] = value;

  const path = 'test';

  return this.db.object(path).update(updateObject);
  }
}
