import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-form-inputs",
  templateUrl: "./form-inputs.component.html",
  styleUrls: ["./form-inputs.component.scss"],
})
export class FormInputsComponent implements OnInit {
  experts: any;
  requests: any;
  request: any;
  va = 0;
  vreq: any;
  isShow = false;
  isPending = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getExperts();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  showExpert(exp) {
    this.router.navigate(["pages/forms/layouts"], exp);
  }

  getExperts() {
    this.http.get("https://phplaravel-458904-1437173.cloudwaysapps.com/experts").subscribe(
      (response) => {
        this.experts = response;
        this.experts = this.experts.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
