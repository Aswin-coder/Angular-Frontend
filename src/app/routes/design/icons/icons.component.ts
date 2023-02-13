
import { DesignIconsService } from './icons.service';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared copy/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { SharedService} from '../../../shared copy/shared.service';
import { Tutorial,Tutorialtest } from '../../../models/tutorial.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TutorialService } from '../../../shared copy/tutorial.service';

import { MAT_ICONS } from '@shared';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.component.html',
  providers: [DesignIconsService],
})
export class DesignIconsComponent implements OnInit {
  message:any | undefined
  formValue !: FormGroup;
  formValueedit !: FormGroup;
  formValueimage !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();


  imageFile: File|null=null;
  imagePreview: string[] = [];


  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  current:string | undefined;


  tutorialsrole?: Tutorial[];
  tutorials?: Tutorial[];

  search : String ="";
  tutorialsAdmin?: Tutorial[];
  tutorialsHr?: Tutorial[];
  tutorialsCurrent?: Tutorial[];
  currentIndex = -1;
  title = '';
  icons!: { [key: string]: string[] };

  constructor(private http: HttpClient,private renderer: Renderer2,private iconsSrv: DesignIconsService,private tutorialService: TutorialService,private shared:SharedService, private formbuilder: FormBuilder,private api:ApiService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsrole();
    this.retrieveTutorialsHr();
    this.retrieveTutorialsAdmin();

    this.formValue = this.formbuilder.nonNullable.group({
      eid : [''],
      name : [''],
      email : [''],
      admin : [''],
      password: [''],
      confirmPassword: ['']
    },
    {
      validators: [this.matchValidator('password', 'confirmPassword')],
    })




    this.formValueedit = this.formbuilder.group({
      eid : [''],
      name : [''],
      email : [''],
      admin : [''],
      password : ['']
    })

    this.formValueimage = this.formbuilder.group({
      imgname : ['']
    })
    this.getAllEmployee();
    this.current=this.shared.getMessage()
  }

  previewImage(event: Event) {
    let input = event.target as HTMLInputElement;
    this.imagePreview = [];
    if (input.files) {
      this.imageFile = input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = () => {
        this.imagePreview.push(reader.result as string);
      }
    }
  }






  uploadImage() {
    let formData = new FormData();
    console.log("1111");
    formData.append('file', this.imageFile!);
    console.log("2222");
    this.toastr.info("1112")
    this.api.postimg(formData)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success("Image Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
    },
    err=>{
      this.toastr.error('error');
    })
    /*
    this.http.post('http://localhost:3000/upload', formData,{observe:'response'})
      .subscribe((response:HttpResponse<any>)=>{
        console.log("3333");
        console.log(response);
        console.log("4444");
        if(response.status==200)
        this.toastr.success("Image Added");
        this.toastr.info(response.status+" "+response.statusText)
      }
      );*/
      console.log("5555");
      this.imageFile=null;
      this.imagePreview=[];
  }
  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }


  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveTutorialsrole(): void {
    this.api.getAllrole()
      .subscribe({
        next: (data) => {
          this.tutorialsrole = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  retrieveTutorialsAdmin(): void {
    this.tutorialService.getAlluser()
      .subscribe({
        next: (data) => {
          this.tutorialsAdmin = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }






  retrieveTutorialsHr(): void {
    this.tutorialService.getAllHr()
      .subscribe({
        next: (data) => {
          this.tutorialsHr = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  refreshList(): void {
    this.retrieveTutorials();
    this.retrieveTutorialsAdmin();
    this.retrieveTutorialsHr();
    this.currentIndex = -1;
  }


  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.eid=this.formValue.value.eid;
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.admin=this.formValue.value.admin;
    this.employeeModelObj.password=this.formValue.value.password;


    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success(this.employeeModelObj.name+" Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    },
    err=>{
      this.toastr.error('error');
    })
  }

  postimg(){
    this.employeeModelObj.imgname=this.formValue.value.imgname;


    this.api.postimg(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success(this.employeeModelObj.name+" Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    },
    err=>{
      this.toastr.error('error');
    })
  }




  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;

    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.eid)
    .subscribe(res=>{
      this.toastr.info(row.name+" Deleted from Database");
      this.getAllEmployee()
      this.refreshList()
    })
  }



  adminEmployee(row:any){
    this.employeeModelObj.eid=row.eid;
    this.employeeModelObj.name=row.name;
    this.employeeModelObj.email=row.email;
    this.employeeModelObj.admin='1';

    this.employeeModelObj.password=row.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info("Successfully transferred "+this.employeeModelObj.name+" to Admin");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }

  hrEmployee(row:any){
    this.employeeModelObj.eid=row.eid;
    this.employeeModelObj.name=row.name;
    this.employeeModelObj.email=row.email;
    this.employeeModelObj.admin='0';
    this.employeeModelObj.password=row.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info("Successfully transferred "+this.employeeModelObj.name+" to HR");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }





  onEdit(row : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.eid=row.eid;
    this.formValueedit.controls['eid'].setValue(row.eid);
    this.formValueedit.controls['name'].setValue(row.name);
    this.formValueedit.controls['email'].setValue(row.email);
    this.formValueedit.controls['admin'].setValue(row.admin);
    this.formValueedit.controls['password'].setValue(row.password);

  }
  updateEmployeeDetails(){
    this.employeeModelObj.eid=this.formValueedit.value.eid;
    this.employeeModelObj.name=this.formValueedit.value.name;
    this.employeeModelObj.email=this.formValueedit.value.email;
    this.employeeModelObj.admin=this.formValueedit.value.admin;
    this.employeeModelObj.password=this.formValueedit.value.password;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.eid)
    .subscribe(res=>{
      this.toastr.info(this.employeeModelObj.name+" Details Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValueedit.reset();
      this.refreshList();
      this.getAllEmployee();
    })
  }

  logout(){
    this.toastr.success("Logout success!")

  }

  resetform(){
    this.formValue.reset()

  }


  }


