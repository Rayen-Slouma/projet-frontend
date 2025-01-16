import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  @Input() event: any; // The event object passed from the parent
  @Input() sectionColor: string = '#ffffff'; // Background color
  @Input() textColor: string = '#000000'; // Text color

  constructor() {}

  ngOnInit(): void {}
}
