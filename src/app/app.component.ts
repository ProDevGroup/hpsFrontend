import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  isCollapsedVerticalLeft = false;
  isCollapsedHorizontalTop = false;
  toggleCollapsedVerticalLeft(): void {
    this.isCollapsedVerticalLeft = !this.isCollapsedVerticalLeft;
  }

  toggleCollapsedHorizontalTop(): void {
    this.isCollapsedHorizontalTop = !this.isCollapsedHorizontalTop;
}
}