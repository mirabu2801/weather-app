import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocationStoreService {

  static LOCALSTORAGE_KEY = 'location';


  saveLocation(location: string): void {
    localStorage.setItem(LocationStoreService.LOCALSTORAGE_KEY, location);
  }

  getLocation(): string | null {
    return localStorage.getItem(LocationStoreService.LOCALSTORAGE_KEY);
  }
}
