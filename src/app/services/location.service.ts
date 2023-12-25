import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocationStoreService} from "./location-store.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private locationStoreService: LocationStoreService) {
  }

  selectedLocation$ = new BehaviorSubject<string | null>(null);

  getLocation(): Observable<string | null> {
    return new Observable<string | null>(observer => {
      const location = this.locationStoreService.getLocation();
      if (location) {
        observer.next(location);
      }
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

  updateLocation(location: string | null): void {
    if (location) {
      this.locationStoreService.saveLocation(location);
    }

    this.selectedLocation$.next(location);
  }
}
