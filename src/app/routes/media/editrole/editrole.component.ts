

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared copy/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { SharedService} from '../../../shared copy/shared.service';
import { Tutorial,Tutorialtest } from '../../../models/tutorial.model';
import { TutorialService } from '../../../shared copy/tutorial.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.scss'],

})
export class EditroleComponent implements OnInit {
  message:any | undefined
  formValue !: FormGroup;
  formValueedit !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  current:string | undefined;

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
  constructor(private tutorialService: TutorialService,private shared:SharedService, private formbuilder: FormBuilder,private api:ApiService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.retrieveTutorials();

    this.retrieveTutorialsHr();
    this.retrieveTutorialsrole();

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
      rid : [''],
      rname : [''],
      redit : [''],
      radd : [''],
      rdelete : ['']
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

  deleterole(row : any){
    this.api.deleterole(row.rid)
    .subscribe(res=>{
      this.toastr.info(row.rid+" Deleted from Database");
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





  onEditrole(row : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.rid=row.rid;
    this.formValueedit.controls['rid'].setValue(row.rid);
    this.formValueedit.controls['rname'].setValue(row.rname);
    if(row.redit=="Yes")
    this.formValueedit.controls['redit'].setValue(true);
    else
    this.formValueedit.controls['redit'].setValue(false);
    if(row.radd=="Yes")
    this.formValueedit.controls['radd'].setValue(true);
    else
    this.formValueedit.controls['radd'].setValue(false);
    if(row.rdelete=="Yes")
    this.formValueedit.controls['rdelete'].setValue(true);
    else
    this.formValueedit.controls['rdelete'].setValue(false);

  }
  updaterole(){
    if(this.formValueedit.value.redit==true)
    this.redit="Yes"
    if(this.formValueedit.value.radd==true)
    this.radd="Yes"
    if(this.formValueedit.value.rdelete==true)
    this.rdelete="Yes"
    this.employeeModelObj.rid=this.formValueedit.value.rid;
    this.employeeModelObj.rname=this.formValueedit.value.rname;
    this.employeeModelObj.redit=this.redit;
    this.employeeModelObj.radd=this.radd;
    this.employeeModelObj.rdelete=this.rdelete;
    this.api.updaterole(this.employeeModelObj,this.formValueedit.value.rid)
    .subscribe(res=>{
      this.toastr.info(this.employeeModelObj.rname+" Details Updated Successfully");
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



