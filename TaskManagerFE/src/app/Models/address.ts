import { User } from "./user";

export class Address{
    id:number;
    line1:string;
    line2:string;
    city:string;
    user: User;
   

    constructor(obj:any){
        console.log(obj)
        this.id = obj.id ?? null;
        this.line1 = obj.line1 ?? '';
        this.line2 = obj.line2 !== null ? obj.line2 :  'qaewtgqewtewt';
        this.city = obj.city  ?? '';
        this.user = new User(obj.user );
    }
  }