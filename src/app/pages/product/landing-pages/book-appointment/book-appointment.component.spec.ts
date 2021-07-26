import { ActivatedRoute, Data } from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';

/**
 * Load the implementations that should be tested.
 */
import { BookAppointmentComponent } from './book-appointment.component';

describe('BookAppointment', () => {
  /**
   * Provide our implementations or mocks to the dependency injector
   */
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      /**
       * Provide a better mock.
       */
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      BookAppointmentComponent
    ]
  }));

  // it('should log ngOnInit', inject([BookAppointmentComponent], (LanapProtocol: BookAppointmentComponent) => {
  //   spyOn(console, 'log');
  //   expect(console.log).not.toHaveBeenCalled();

  //   LanapProtocol.ngOnInit();
  //   expect(console.log).toHaveBeenCalled();
  // }));

});
