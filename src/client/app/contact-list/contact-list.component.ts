import { Component, OnInit } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('contacts')
      // .map((res: Response) => res.json())
      .subscribe(data => this.contacts = data);
  }

}
