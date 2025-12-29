import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Film, Vehicle, VehicleResponse } from "./vehicle";
import { map, shareReplay, catchError, Observable, throwError, filter, never, switchMap, forkJoin } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";



@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly url = 'https://swapi.py4e.com/api/vehicles';

    http = inject(HttpClient);

    //load vehicles as obserable
    vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
        map((data) =>
            data.results.map((v) => ({
                ...v,
                cost_in_credits: isNaN(Number(v.cost_in_credits))
                    ? String(Math.random() * 100000)
                    : v.cost_in_credits,
            }) as Vehicle)
        ),
        shareReplay(1),
        catchError(this.handleError)
    );

    //convert vehicle$ to signal
    vehicles = toSignal(this.vehicles$, { initialValue: [] as Vehicle[] });
    selectedVehicle = signal<Vehicle | undefined>(undefined);

    vehicleFilms$ = toObservable(this.selectedVehicle).pipe(
        filter(Boolean),
        switchMap((vehicle) =>
            forkJoin(vehicle.films.map((link =>
                this.http.get<Film>(link)))
            )
        )
    );

    vehicleFilms = toSignal<Film[], Film[]>(this.vehicleFilms$, { initialValue: [] });

    vehicleSelected(vehicleName: string) {
        const foundVehicle = this.vehicles().find((v) => v.name === vehicleName);
        this.selectedVehicle.set(foundVehicle);
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
                }`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }

}