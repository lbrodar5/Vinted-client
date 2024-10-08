import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptorProvider } from './authInterceptor.provider';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'https://vinted-server.onrender.com', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), 
    importProvidersFrom(HttpClientModule),
    AuthInterceptorProvider,
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
