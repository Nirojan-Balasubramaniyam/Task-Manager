import { User } from "./user";

export class Task{
    id:number;
    title:string;
    description:string;
    dueDate:string;
    priority:string;
    assignee?: User;
   

    constructor(obj:any){
        this.id = obj.id ?? null;
        this.title = obj.title ?? '';
        this.description = obj.description !== null ? obj.description :  'qaewtgqewtewt';
        this.dueDate = obj.dueDate  ?? '';
        this.priority = obj.priority ?? '';
        this.assignee = new User(obj.assignee );
    }
  }
  