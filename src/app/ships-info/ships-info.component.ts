import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ShipsService } from "./ships-info.service";

@Component({
  selector: "ships-info",
  templateUrl: "./ships-info.component.html",
  styleUrls: ["./ships-info.component.scss"],
  providers: [ShipsService],
})
export class ShipsComponent implements OnInit {
  shipsList: Array<any> = [];
  loading: boolean = true;
  shipsDetailsChange: Subject<any> = new Subject<any>();
  private unsub: Subject<any> = new Subject<any>();

  constructor(private shipsSvc: ShipsService) {}

  ngOnInit(): void {
    this.getShipsList();
    this.shipsDetailsChange.next({});
  }

  getShipsList(params?: any) {
    this.loading = true;
    /* Switch map will cancel the pending requests. I.E. if user keep on clicking filters, We should only consider the latest one. 
    Everything else has to be cancelled */
    this.shipsDetailsChange
      .pipe(
        takeUntil(this.unsub),
        switchMap((params) => this.shipsSvc.getShipsList(params))
      )
      .subscribe(
        (data: Array<any>) => {
          this.shipsList = data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  filterChange(filter: {
    year?: number;
    launchSuccess?: boolean;
    landSuccess?: boolean;
  }) {
    let params: any = {};
    if (filter.year != null) params.launch_year = filter.year;
    if (filter.launchSuccess != null) params.launch_success = filter.year;
    if (filter.launchSuccess != null) params.land_success = filter.year;

    this.shipsDetailsChange.next(params);
  }
}
