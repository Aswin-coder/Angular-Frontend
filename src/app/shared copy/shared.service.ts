import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:string | undefined
  constructor() { }
  setMessage(data: string | undefined){
    this.message=data
  }

  getMessage(){
    return this.message
  }
}
