import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit
{
  // another way to write this is: Array<string>
  names: string[];

  constructor() {
    this.names = ['Jess', 'Jim', 'Felip', 'James'];
  }

  ngOnInit(): void {
  }
}
