import {Injectable} from "@angular/core";
import {assign, createActor, createMachine, fromPromise} from 'xstate';
import {ForecastStateMachineContext} from "./forecast-state-machine.context";
import {ForecastApiService} from "../forecast-api.service";
import {connectable, firstValueFrom, from, map, ReplaySubject} from "rxjs";
import {LocationService} from "../../services/location.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MachineContext} from "xstate/dist/declarations/src/types";

@Injectable()
export class ForecastStateMachineService {


    private forecastMachine = createMachine(
        {
            context: {},
            id: "forecast",
            initial: "loading",
            states: {
                reload: {
                    always: "loading"
                },
                loading: {
                    on: {
                        LOCATION_PICKED: {
                            target: "reload",
                        }
                    },
                    invoke: {
                        src: "loadWeatherData",
                        id: "getData",
                        onDone: [
                            {
                                target: "success",
                                guard: args => {
                                    return Boolean(args.event.output);
                                },
                                actions: assign({
                                    data: ({event}) => {
                                        return event.output;
                                    }
                                }),
                            },
                            {
                                target: 'noLocation'
                            }
                        ],
                        onError: [
                            {
                                target: "failure",
                                actions: assign({
                                    error: ({event}) => {
                                        if (event.error instanceof HttpErrorResponse) {
                                            return event.error.message;
                                        }
                                        return '';
                                    }
                                }),
                            },
                        ],
                    },
                },
                success: {
                    on: {
                        LOCATION_PICKED: {
                            target: "loading",
                        }
                    }
                },
                noLocation: {
                    on: {
                        LOCATION_PICKED: {
                            target: "loading",
                        }
                    }
                },
                failure: {
                    on: {
                        RETRY: {
                            target: "loading",
                        },
                        LOCATION_PICKED: {
                            target: "loading",
                        },
                    },
                },
            },
            types: {
                events: {} as {
                    type: "RETRY" | "LOCATION_PICKED"
                },
                context: {} as ForecastStateMachineContext,
            },
        },
        {
            actors: {
                loadWeatherData: fromPromise(() => {
                    const location = this.locationService.selectedLocation$.value;
                    if (location) {
                        return firstValueFrom(this.weatherService.getWeatherData(location)).then(
                          response => {
                            return {
                              ...response,
                              location,
                            }
                          }
                        );
                    } else {
                        return Promise.resolve(null);
                    }

                }),
            },
        },
    );

    private forecastActor = createActor(this.forecastMachine)
    private stateConnectable = connectable(from(this.forecastActor), {
        connector: () => new ReplaySubject(1)
    })

    public state$ = this.stateConnectable.pipe(map(state => {
        return {
            state: state.value as string,
            context: state.context as ForecastStateMachineContext,
        };
    }))

    constructor(
        private weatherService: ForecastApiService,
        private locationService: LocationService,
    ) {
        this.stateConnectable.connect()
        this.forecastActor.start();
        this.locationService.selectedLocation$.subscribe(() => {
            this.forecastActor.send({type: 'LOCATION_PICKED'});
        })
    }

    retry(): void {
        this.forecastActor.send({type: 'RETRY'});
    }


}
