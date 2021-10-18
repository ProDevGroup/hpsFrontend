import { KeyValue } from "@angular/common";

export class Planning {
    id: any;
    values: number[];
    defaultValues: KeyValue<string, number>[] ;
    location: any;
    months: string[];
    projectName: any;
    
    constructor(data?:any) {
        this.id = data.id || undefined;
        this.values = data.values || [];
        this.defaultValues = data.defaultValues || [];
        this.location = data.location || "No location";
        this.months = data.months || [];
        this.projectName = data.projectName || "";
    } 
}
