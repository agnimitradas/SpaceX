import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { ShipsService } from "./ships-info.service";

@Component({
  selector: "ships-info",
  templateUrl: "./ships-info.component.html",
  styleUrls: ["./ships-info.component.scss"],
  providers: [ShipsService],
})
export class ShipsComponent implements OnInit {
  shipsList: Array<any> = [];

  constructor(private shipsSvc: ShipsService) {}

  ngOnInit(): void {
    this.getShipsList();
  }

  getShipsList(params?: any) {
    this.shipsSvc
      .getShipsList(params)
      .pipe(take(1))
      .subscribe((data: Array<any>) => {
        this.shipsList = data;
      });
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

    this.getShipsList(params);
  }
}
