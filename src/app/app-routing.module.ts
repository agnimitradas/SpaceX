import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShipsComponent } from "./ships-info/ships-info.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "ships",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "ships",
    pathMatch: "full",
  },
  {
    path: "ships",
    component: ShipsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
