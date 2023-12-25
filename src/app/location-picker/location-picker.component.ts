import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject, Subscription, tap} from "rxjs";
import {LocationService} from "../services/location.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-location-picker',
    standalone: true,
    imports: [
        MatSelectModule,
        NgForOf,
        AsyncPipe,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './location-picker.component.html',
    styleUrl: './location-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LocationPickerComponent implements OnDestroy {

    locationControl = new FormControl<string>('');

    subscription = new Subscription();

    userLocations: string[] = [];

    constructor(private locationService: LocationService) {
        this.locationControl.valueChanges.subscribe(this.emitLocation.bind(this));
        this.subscription.add(
            this.locationService.getLocation().pipe(
                tap(location => {
                    if (location && !this.userLocations.includes(location)) {
                        this.userLocations = [
                            location,
                            ...this.userLocations,
                        ];
                        this.emitCurrentLocationsList();

                    }
                })
            ).subscribe(
                location => {
                    if (location && !this.locationControl.value) {
                        this.locationControl.setValue(location);
                    }
                }
            )
        )
        this.subscription.add(this.locationService.listLocations().subscribe(locationsList => {
            this.locations$.next(
                [...locationsList, ...this.userLocations]
            );
        }))
    }

    emitLocation(location: string | null): void {
        this.locationService.updateLocation(location);
    }

    locations$ = new BehaviorSubject<string[] | null>(null);

    get nothingSelected(): boolean {
        return !this.locationControl.value;
    }

    emitCurrentLocationsList(): void {
        this.locations$.next(
            [
                ...(this.locations$.value ?? []),
                ...this.userLocations,
            ]
        )
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
