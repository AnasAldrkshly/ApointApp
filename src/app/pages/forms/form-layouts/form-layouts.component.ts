import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-form-layouts",
  templateUrl: "./form-layouts.component.html",
  styleUrls: ["./form-layouts.component.scss"],
})
export class FormLayoutsComponent implements OnInit {
  recievedData;
  experts: any;
  requests: any;
  request: any;
  va = 0;
  vreq: any;
  isShow = false;
  isPending = false;
  this_expert;
  ex_id;
  ex_name;
  ex_expert;
  ex_country;
  ex_from;
  ex_to;

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.router.getCurrentNavigation().extras);
    this.recievedData = this.router.getCurrentNavigation().extras;
    console.log(this.recievedData);
    this.ex_id = this.recievedData.id;
    this.ex_name = this.recievedData.name;
    this.ex_expert = this.recievedData.expert;
    this.ex_country = this.recievedData.country;
    this.ex_from = this.recievedData.work_from;
    this.ex_to = this.recievedData.work_to;
    console.log(this.ex_id);
    console.log(this.ex_name);
    console.log(this.ex_expert);
    console.log(this.ex_country);
    console.log(this.ex_from);
    console.log(this.ex_to);
  }

  appoitReserve() {
    this.router.navigate(["pages/forms/datepicker"], this.recievedData);
  }

  ngOnInit() {}
}
