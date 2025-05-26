import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./modules/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Campus Connect';
}
