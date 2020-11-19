import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front';

  // tslint:disable-next-line:variable-name
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this._matIconRegistry.addSvgIcon('icon-back', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/arrow_back-24px.svg'));
    this._matIconRegistry.addSvgIcon('icon-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/delete-24px.svg'));
  }

}
