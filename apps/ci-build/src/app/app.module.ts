import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ViewportSizeModule, VIEWPORT_CONFIG_TOKEN, IViewportConfig } from './viewport-size';

const socketConfig: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

const viewportConfigProvider = {
  provide: VIEWPORT_CONFIG_TOKEN,
  useFactory: (): IViewportConfig => ({ medium: 900, large: 1400 }),
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(socketConfig), ComponentsModule, FontAwesomeModule, ViewportSizeModule],
  providers: [viewportConfigProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
