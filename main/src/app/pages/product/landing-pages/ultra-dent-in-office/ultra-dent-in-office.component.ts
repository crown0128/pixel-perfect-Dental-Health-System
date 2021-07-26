import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bookingModalComponent } from '../booking-modal/booking-modal.component';
import { MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { applyFormComponent } from '../apply-form/apply-form.component';

import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-ultra-dent-in-office',
  templateUrl: './ultra-dent-in-office.component.html',
  styleUrls: ['./ultra-dent-in-office.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave',
        animate(300, style({ opacity: 0 })))
    ])
  ]
})
export class UltraDentInOfficeComponent implements OnInit {
  title = 'ULTRADENT in-office - Professional Tooth Whitening'

  @Input()
  patient;


  @Input()
  campaign;


  @Input()
  merchant;


  @Input()
  userData;


  @Input()
  minAmount;

  @Input()
  code;

  @Output()
  apply: EventEmitter<any> = new EventEmitter()

  public player;

  standAlone = true;

  constructor(
    public dialog: MatDialog,
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID
    ) private platformId) {

  }

  public ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Professional Tooth Whitening TAKE-HOME KIT' }
    );

    if (!this.merchant) {

      this.merchant = {
        TradingAs: "Merchant"
      };

      this.minAmount = 5

    }

  }

  getPracticeName(): string {
    return this.merchant['TradingAs'];
  }

  applyEvent() {
    // emit apply event
    this.apply.emit(true);
  }

  // show calculator, then booking
  launchApplyModal() {
    if (this.merchant && this.userData['Amount'] && this.campaign && this.campaign['ID']) {
      let dialogRef = this.dialog.open(applyFormComponent, {
        data: {
          patient: this.patient,
          showConcern: true,
          amount: this.userData['Amount'],
          productGroup: this.userData['ProductGroup'],
          campaignID: this.campaign['ID'],
          merchantID: this.campaign['Merchant_key'],
          productName: this.code

        },
        width: '800px',
        panelClass: 'rm-top-p'

      });

      // dialogRef.componentInstance.proceed.subscribe(data => {
      // this.applyEvent();
      // dialogRef.close();
      // });

      dialogRef.componentInstance.closeModal.subscribe(data => {

        dialogRef.close();
      });
    }
  }

  // show booking modal and then proceed to finance
  launchBookingModal() {
    let dialogRef = this.dialog.open(bookingModalComponent, {
      data: {
        campaignID: this.campaign['ID'],
        patient: this.patient,
        bookingURL: this.merchant['ThirdPartyBooking_URL']
      },
      width: '700px',
      panelClass: ''

    });

    dialogRef.componentInstance.proceed.subscribe(data => {
      // this.applyEvent();
      dialogRef.close();
    });

    dialogRef.componentInstance.closeModal.subscribe(data => {
      // this.applyEvent();
      dialogRef.close();
    });
  }
}
