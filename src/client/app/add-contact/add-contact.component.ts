import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: Boolean = false;
  newContact: Contact;
  constructor(public api: ApiService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    // copy of the form values using Object.assign()
    const formValues = Object.assign({}, form.value);
    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
      photoUrl: formValues.photo
    };
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // // using the headers construct a requestOptions Object and pass the headers
    // const requestOptions = new RequestOptions({headers: headers});

    // this.http.post('/api/contacts', contact, requestOptions)
    // .map((res: Response) => {
    //   res.json();
    // }).subscribe((data) => {
    //   // reset the form
    //   form.reset();
    //   this.loading = false;
    //   this.newContact = data as any;
    // });

    this.api.post('contacts', contact)
    .subscribe((data) => {
      // reset the form
      form.reset();
      this.loading = false;
      this.newContact = data as any;
    });
  }
}
