import { Component } from '@angular/core';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";
import { TableComponent } from "../../components/Table/Table.component";
import { SearchAndFilterComponent } from "../../components/SearchAndFilter/SearchAndFilter.component";
import { PageTitleAndButtonsComponent } from "../../components/pageTitleAndButtons/pageTitleAndButtons.component";
import { BreadcrumbNavigationComponent } from "../../components/breadcrumbNavigation/breadcrumbNavigation.component";

@Component({
  selector: 'app-main-view-page',
  standalone: true,
  imports: [
    NavBarHomeComponent,
    TableComponent,
    SearchAndFilterComponent,
    PageTitleAndButtonsComponent,
    BreadcrumbNavigationComponent
  ],
  templateUrl: './mainView-page.component.html',
})
export class MainViewPageComponent { }
