import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "data-filter",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  private _timeHorizon: number = 0;
  launchYears: Array<number> = [];
  currentFilters: {
    year: number;
    launchSuccess: boolean;
    landSuccess: boolean;
  } = { year: null, landSuccess: null, launchSuccess: null };

  @Input()
  set timeHorizon(thValue: number) {
    this._timeHorizon = thValue;
    this.launchYears = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - thValue; i <= currentYear; i++) {
      this.launchYears.push(i);
    }
    this.cd.detectChanges();
  }
  get timeHorizon() {
    return this._timeHorizon;
  }

  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  addFilter(filter: {
    year?: number;
    launchSuccess?: boolean;
    landSuccess?: boolean;
  }) {
    if (!filter) {
      return;
    }

    if (filter.year != null) {
      this.setFilterAttribute("year", filter.year);
    }
    if (filter.launchSuccess != null) {
      this.setFilterAttribute("launchSuccess", filter.launchSuccess);
    }
    if (filter.landSuccess != null) {
      this.setFilterAttribute("landSuccess", filter.landSuccess);
    }

    this.filterChange.emit(this.currentFilters);
  }

  private setFilterAttribute(attribute: string, value: number | boolean) {
    if (!attribute || value == null) {
      return;
    }
    if (
      this.currentFilters &&
      this.currentFilters[attribute] == value
    ) {
      this.currentFilters[attribute] = null;
    } else {
      this.currentFilters[attribute] = value;
    }
  }
}
