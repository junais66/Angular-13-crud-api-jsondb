import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
  public searchTerm : string | null = null;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.getAllContactFromServer();
  }
  public getAllContactFromServer() {
    this.loading = true;
    this.contactService.getAllContact().subscribe((data) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }
  public clickDeleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe((data) => {
        this.getAllContactFromServer();
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }
  public searchContact(){
    let filterContact=[];
    if(this.searchTerm){
      filterContact = this.contacts.filter(p => p.name == this.searchTerm);
      this.contacts = filterContact;
      if(filterContact.length == 0){
        this.errorMessage ="Contact not found!"
      }
    }
    else{
      this.getAllContactFromServer();
      this.errorMessage=null;
    }

  }
}
