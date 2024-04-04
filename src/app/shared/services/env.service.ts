import { Inject, Injectable } from '@angular/core';
import { Observable, of, publishReplay, refCount } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProxyEnvConfiguration } from '../helpers/proxy-envs/proxy-env-config-token';
import { IProxyConfig } from '../helpers/proxy-envs/proxy-env-config.interface';
import { get, isEmpty, isObject } from 'lodash';

export interface SettingsObject {
  [key: string]: string;
}
@Injectable({
  providedIn: 'root',
})
export class EnvService {
  envs;
  private envObservable: Observable<any> | null;
  constructor(
    private httpClient: HttpClient,
    @Inject(ProxyEnvConfiguration) private proxyConfig: IProxyConfig
  ) {}

  clearCache() {
    this.envObservable = null;
  }

  getEnvs() {
    if (!isEmpty(this.envs) && isObject(this.envs)) {
      return of(this.envs);
    }

    let proxyEnvs;
    try {
      proxyEnvs = this.getProxyEnvs();
    } catch (e) {}

    if (!isEmpty(proxyEnvs) && isObject(proxyEnvs)) {
      this.envs = proxyEnvs;
      return of(proxyEnvs);
    }

    if (!this.envObservable) {
      this.envObservable = this.httpClient
        .get('/env')
        .pipe(publishReplay(1), refCount());
      this.envObservable.subscribe(() => {});
    }

    return this.envObservable;
  }

  getProxyEnvs() {
    if (!this.proxyConfig) {
      return get(window, 'PROXY_ENV');
    }

    const proxyEnvs = get(window, 'PROXY_ENV');
    if (!proxyEnvs) {
      return;
    }

    return proxyEnvs;
  }
}
