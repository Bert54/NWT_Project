import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'front';

  // tslint:disable-next-line:variable-name
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this._matIconRegistry.addSvgIcon('icon-back', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/arrow_back-24px.svg'));
    this._matIconRegistry.addSvgIcon('icon-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/delete-24px.svg'));
    this._matIconRegistry.addSvgIcon('icon-add', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/add-24px.svg'));
    this._matIconRegistry.addSvgIcon('icon-search', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/search-24px.svg'));
    this._matIconRegistry.addSvgIcon('icon-game',
      this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/videogame_asset-24px.svg'));
  }

}
