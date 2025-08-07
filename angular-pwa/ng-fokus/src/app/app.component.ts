import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { TimerControlComponent } from './shared/components/timer-control/timer-control.component';
import { TaskManagerComponent } from './shared/components/task-manager/task-manager.component';
import { UpdateService } from './shared/services/update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    TimerControlComponent,
    TaskManagerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #pdateService = inject(UpdateService);

  async ngOnInit() {
    const hasUpdate = await this.#pdateService.checkForUpdates();

    if (hasUpdate) {
      console.log('Atualização encontrada');
    }
  }
}
