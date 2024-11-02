import { Task } from "./task";

export class CheckList{
    id:number;
    name:string;
    isChecked:boolean;
    task? : Task

    constructor(obj:any){
        console.log(obj)
        this.id = obj.id ?? null;
        this.name = obj.name ?? '';
        this.isChecked = obj.isChecked !== null ? obj.isChecked :  false;
        this.task = obj.task ;
    }
  }