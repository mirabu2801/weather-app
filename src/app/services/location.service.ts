import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    selectedLocation$ = new BehaviorSubject<string | null>(null);
    getLocation(): Observable<string | null> {
        return new Observable<string | null>(observer => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                        if (position) {
                            observer.next(`${position.coords.latitude},${position.coords.longitude}`);
                        } else {
                            observer.next(null);
                        }
                    },
                    () => observer.next(null));
            } else {
                observer.next(null);
            }
        })
    }

    listLocations(): Observable<string[]> {
        return of(['Istanbul', 'New York', 'Paris', 'Moscow']);
    }

    emitLocation(location: string | null): void {
        this.selectedLocation$.next(location);
    }
}
