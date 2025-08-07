import { Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { filter, interval, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate) {
    this.initializeUpdateChecks();
  }

  initializeUpdateChecks(): void {
    if (!this.swUpdate.isEnabled) return;
    interval(60 * 1000).subscribe(() => this.checkForUpdates());

    this.swUpdate.versionUpdates
      .pipe(
        tap(
          (event) => console.log(event),
          filter((event: VersionEvent) => event.type === 'VERSION_READY')
        )
      )
      .subscribe(() => this.promptUserToUpdate());

    this.swUpdate.unrecoverable.subscribe(() => {
      alert('Um erro ocorreu. O aplicativo será recarregado');
      window.location.reload();
    });
  }

  async checkForUpdates(): Promise<Boolean> {
    if (!this.swUpdate.isEnabled) return false;
    try {
      return await this.swUpdate.checkForUpdate();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  promptUserToUpdate(): void {
    if (confirm('Nova versão disponivél. Deseja atualizar agora?')) {
      this.swUpdate
        .activateUpdate()
        .then(() => window.location.reload())
        .catch((error) => console.error('Erro na atualização', error));
    }
  }
}
