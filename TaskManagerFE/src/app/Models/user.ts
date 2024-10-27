import { Address } from "./address";
import { Task } from "./task";

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address?:Address | null;
    tasks? : Task[] 

    constructor(obj:any){

        this.id = obj.id ?? null;
        this.name = obj.name ?? '';
        this.email = obj.email ?? '';
        this.password = obj.password ?? '';
        this.phone = obj.phone ?? '07756825';
        this.address = obj.address !== null ? new Address(obj.address ) : null;
        this.tasks = obj.tasks ;
    }
  }