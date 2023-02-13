

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared copy/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { SharedService} from '../../../shared copy/shared.service';
import { Tutorial,Tutorialtest } from '../../../models/tutorial.model';
import { TutorialService } from '../../../shared copy/tutorial.service';
import { MatIcon } from '@angular/material/icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
})
export class MediaGalleryComponent {
  message:any | undefined
  formValuerole !: FormGroup;
  formValueedit !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  current:string | undefined;
yesicon=faCheck
noicon=faTimes

  radd:string="No"
  redit:string="No"
  rdelete:string="No"
  tutorials?: Tutorial[];

  search : String ="";
  tutorialsrole?: Tutorial[];
  tutorialsHr?: Tutorial[];
  tutorialsCurrent?: Tutorial[];
  currentIndex = -1;
  title = '';
  icons!: { [key: string]: string[] };
  constructor(private tutorialService: TutorialService,private shared:SharedService, private formbuilder: FormBuilder,private api:ApiService,private toastr: ToastrService) {

  }ngOnInit(): void {
    this.retrieveTutorials();

    this.retrieveTutorialsHr();
    this.retrieveTutorialsrole();

    this.formValuerole = this.formbuilder.nonNullable.group({
      rid : [''],
      rname : [''],
      redit : [''],
      radd : [''],
      rdelete: ['']
    })




    this.formValueedit = this.formbuilder.group({
      eid : [''],
      name : [''],
      email : [''],
      admin : [''],
      password : ['']
    })
    this.getAllEmployee();
    this.current=this.shared.getMessage()
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
    this.retrieveTutorialsrole();
    this.retrieveTutorialsHr();
    this.currentIndex = -1;
  }

  formreset(): void {
    this.formValuerole.reset();
    this.toastr.info("Form reset successfully!")
  }


  clickAddEmployee(){
    this.formValuerole.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.eid=this.formValuerole.value.eid;
    this.employeeModelObj.name=this.formValuerole.value.name;
    this.employeeModelObj.email=this.formValuerole.value.email;
    this.employeeModelObj.admin=this.formValuerole.value.admin;
    this.employeeModelObj.password=this.formValuerole.value.password;


    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success(this.employeeModelObj.name+" Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValuerole.reset();
      this.refreshList();
      this.getAllEmployee();
    },
    err=>{
      this.toastr.error('error');
    })
  }

  postrole(){
    if(this.formValuerole.value.redit==true)
    this.redit="Yes"
    if(this.formValuerole.value.radd==true)
    this.radd="Yes"
    if(this.formValuerole.value.rdelete==true)
    this.rdelete="Yes"
    this.employeeModelObj.rid=this.formValuerole.value.rid;
    this.employeeModelObj.rname=this.formValuerole.value.rname;
    this.employeeModelObj.redit=this.redit;
    this.employeeModelObj.radd=this.radd;
    this.employeeModelObj.rdelete=this.rdelete;


    this.api.postrole(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success(this.employeeModelObj.name+" Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValuerole.reset();
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
      this.formValuerole.reset();
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
      this.formValuerole.reset();
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


  }


