import { Address } from "./address";
import { Task } from "./task";

export class User {
    id: number;
    name: string;
    email: string;
    PasswordHash: string;
    phone: string;
    address?:Address | null;
    tasks? : Task[] 

    constructor(obj:any){

        this.id = obj.id ?? null;
        this.name = obj.name ?? '';
        this.email = obj.email ?? '';
        this.PasswordHash = obj.PasswordHash ?? '';
        this.phone = obj.phone ?? '07756825';
        this.address = obj.address !== null ? new Address(obj.address ) : null;
        this.tasks = obj.tasks ;
    }
  }