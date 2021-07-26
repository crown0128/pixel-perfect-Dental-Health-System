import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import AOS from 'aos';
@Component({
  selector: "app-clear-path",
  styleUrls: ["./clear-path.component.css"],
  templateUrl: "./clear-path.component.html",
})
export class ClearPathComponent implements OnInit {
  @Input()
  patient;

  @Input()
  campaign;

  @Input()
  merchant;

  @Input()
  userData;
  @Input()
  code;

  @Input()
  minAmount;

  @Input()
  amount;

  @Output()
  apply: EventEmitter<any> = new EventEmitter();

  public player;

  standAlone = true;
  price=22
  practiceName="Smile Right "
  practiceAddress="practice@smileright.com.au"
  practiceNumber="1300 793 983"

  constructor(@Inject(PLATFORM_ID) private platformId) {}

  public readStories() {
    if (isPlatformBrowser(this.platformId)) {
      window.open(
        "http://www.ivoclarvivadentusa.com/smiletothemax/success-stories/"
      );
    }
  }

  public ngOnInit() {
    if (!this.merchant) {
      this.merchant = {
        TradingAs: "Merchant",
      };
    }
    AOS.init();
  }

  getPracticeName(): string {
    return this.merchant["TradingAs"];
  }

  applyEvent() {
    this.apply.emit(true);
  }
}
