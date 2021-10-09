import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImportDataService } from './import-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  fileToUpload: File | undefined ;
  fileList: NzUploadFile[] = [];
  file: NzUploadFile | undefined;
  spin = false;


  year = new Date().getFullYear();
  month = new Date().getMonth() ;
  day = new Date().getDay();
  realise: string | undefined;

  uploadInfo: any;
  importTime: any;
  listOfColumn = [
    {
      title: 'Name',
      compare: null,
      priority: false
    },
  ];
  constructor(private message: NzMessageService,
    private importDataService: ImportDataService,
    private toastrService: ToastrService
  ) { }
  // createMessage(type: string): void {
  //   this.message.create(type, `This is a message of ${type}`);
  // }
  @Input()
  //token: any;

  handleChange(event: { file: NzUploadFile | undefined; }) {
    console.log(event);
    this.file = event.file;
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    console.log(this.file);
    this.fileList = this.fileList.concat(file);
    return false;

  }

  onSubmit() {
    //const token: string = localStorage.getItem(environment.TOKEN_NAME);
    const xfile = new FormData();
    this.fileList.forEach((file: any) => {
      xfile.append('file', file);
    });
    this.spin = true;
    this.importDataService.uploadFileX(xfile).subscribe(data => {
      console.log(data);
      this.spin = false;
      this.toastrService.success("Import process completed successfully");
      this.getInfoUpload();
    },
      (error) => {
        if (error) {
          this.toastrService.error(error.error.message);
          this.spin = false;
        }
      })
    //console.log(token)
  }

  getInfoUpload() {

      this.uploadInfo = "Imported file: date of the last update ";

      this.importTime = this.day+"-"+ this.month+"-"+this.year ;


  }
  ngOnInit(): void {
    this.spin = false;
  }

}
