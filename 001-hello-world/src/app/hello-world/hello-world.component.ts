import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  // templateUrl: './hello-world.component.html',
  template: `
    <p>Hello World Works!</p>
  `,
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
