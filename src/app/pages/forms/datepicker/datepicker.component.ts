import { Component } from "@angular/core";
import { NbDateService } from "@nebular/theme";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { DatePipe } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-datepicker",
  templateUrl: "datepicker.component.html",
  styleUrls: ["datepicker.component.scss"],
})
export class DatepickerComponent {
  min: Date;
  max: Date;
  timeSlice;
  slices;
  durationMdl = 0;
  timeState = true;
  curDate;
  rserveData = {};
  sliceFrom;
  sliceTo;
  indexOfelement;
  targetSlice;
  username;
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
  date_set;
  timeZone;
  timeZones;
  DefaultTZ;

  constructor(
    protected dateService: NbDateService<Date>,
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    public _DomSanitizationService: DomSanitizer,
    private toastrService: NbToastrService
  ) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
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
    // this.getTagById(this.artid);
  }

  ngOnInit() {
    this.http.get("https://phplaravel-456869-1430622.cloudwaysapps.com/getTimezoneAll").subscribe(
      (response) => {
        this.timeZones = response;
        console.log(this.timeZones);
        /* this.DefaultTZ =
        "Defalt Timezone is: {" +
        this.timeZones[230] +
        "}  You can change it below"; //"Asia/Damascus";
      this.timeZone = this.DefaultTZ;*/
      },
      (error) => {
        console.log(error);
      }
    );
    this.http.get("https://phplaravel-456869-1430622.cloudwaysapps.com/getDefaultTZbyIP").subscribe(
      (response) => {
        console.log(response);
        this.DefaultTZ = response;
        this.DefaultTZ = this.DefaultTZ["TZ"];
        this.timeZone = this.timeZones.indexOf(this.DefaultTZ);

        this.DefaultTZ =
          "Defalt Timezone is: {" +
          this.DefaultTZ +
          "}  You can change it below"; //"Asia/Kuwait";
        console.log(this.DefaultTZ);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getsliceV($event) {
    console.log($event);
    // console.log(this.timeSlice);
    this.sliceFrom = this.slices[$event].from;
    this.sliceTo = this.slices[$event].to;
    console.log(this.sliceFrom);
    console.log(this.sliceTo);
  }

  echoDur($event) {
    console.log(111);
    console.log(this.curDate);
    console.log($event);
    console.log(this.durationMdl);
    console.log(this.indexOfelement);
    // console.log(this.sliceFrom);
    //   console.log(this.sliceTo);
    this.timeState = true;

    this.date_set = this.datePipe.transform(this.curDate, "yyyy-MM-dd");
    console.log(this.datePipe.transform(this.curDate, "yyyy-MM-dd"));
    console.log(this.date_set);
    this.http
      .get(
        "https://phplaravel-456869-1430622.cloudwaysapps.com/getSlices/" +
          this.ex_id +
          "/" +
          this.durationMdl +
          "/" +
          this.date_set +
          "/" +
          this.timeZone
      )
      .subscribe(
        (response) => {
          this.slices = response;
          console.log(this.slices);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  // https://phplaravel-456869-1430622.cloudwaysapps.com/getTimezoneAll

  reservationSubmit() {
    this.rserveData = {
      ex_id: this.ex_id,
      username: this.username,
      date: this.curDate,
      duration: this.durationMdl,
      start_time: this.sliceFrom,
      end_time: this.sliceTo,
      TZIndex: this.timeZone,
    };
    console.log(this.rserveData);
    this.http
      .post("https://phplaravel-456869-1430622.cloudwaysapps.com/reservations", this.rserveData)
      .subscribe(
        (response) => {
          this.showToast(
            "success",
            "Appointment Reserve",
            "Appointment reserved successfully"
          );
          console.log(response);
          this.router.navigate(["pages/forms/inputs"]);
        },
        (error) => {
          console.log(error);
          this.showToast(
            "danger",
            "Appointment Reserve",
            "Cant reserve appointment"
          );
        }
      );
  }

  setTimeZones($event) {
    console.log($event);
    this.DefaultTZ =
      "You choose: {" + this.timeZones[$event] + "}  As your current Timezone"; //"Asia/Damascus";
  }

  onDateSelect($event) {
    console.log(23232323);
  }

  /*----------------------------------------------------*/

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "success";

  t_title = "HI there!";
  t_content = `I'm cool toaster!`;

  types: NbComponentStatus[] = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ];

  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];

  quotes = [
    { title: null, body: "We rock at Angular" },
    { title: null, body: "Titles are not always needed" },
    { title: null, body: "Toastr rock!" },
  ];

  makeToast() {
    this.showToast(this.status, this.t_title, this.t_content);
  }

  openRandomToast() {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];

    this.showToast(type, quote.title, quote.body);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
