import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AlertType} from '../../services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public text: string;
  public type = 'success';
  aSub: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$
      .subscribe((alert: { text: string, type: AlertType }) => {
        this.text = alert.text;
        this.type = alert.type;
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
          console.log(this.text);
        }, this.delay);
      });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
