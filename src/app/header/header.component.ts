import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {LocationPickerComponent} from "../location-picker/location-picker.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatToolbarModule,
        MatSelectModule,
        LocationPickerComponent
    ]
})
export class HeaderComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

  isUSA(): boolean {
    return document.location.pathname.startsWith('/en');
  }
}
