import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})

export class UserItemComponent implements OnInit
{
  // allows us to pass in a value from the parent template
  @Input() name: string;

  constructor() {
    this.name = 'Default Name';
  }

  ngOnInit(): void {
  }
}
