import { ContextInfo } from './context-info';
import { DevContext as DevContext } from './dev-context';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { Observable, combineLatest, from, timer } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

declare const window: any;

@Injectable({
    providedIn: 'root',
})
export class Context {
    // todo: probably should set the replay-buffer to 1 for all the following, but must test!

    // private cbIdSubject = new ReplaySubject<number>(1);
    private tidSubject = new ReplaySubject<number>(1);
    private afTokenSubject = new ReplaySubject<string>(1);
    public _properties: any = {};
    public _moduleId: string = "";
    public _userId: string = "";

    tabId$ = this.tidSubject.asObservable();
    antiForgeryToken$ = this.afTokenSubject.asObservable();

    all$ = combineLatest(
        this.tabId$,                // wait for tabId
        this.antiForgeryToken$)     // wait for security token
        .pipe(map(res => <ContextInfo>{  // then merge streams
            tabId: res[0],
            antiForgeryToken: res[1]
        }));

    constructor(
        @Optional() private devSettings: DevContext  
    ) {
        const MODULE = 'Angular6Demo';
        // Dev settings with minimal ignore settings.
        this.devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);

        
        if (window && window[MODULE]) {
            this._properties = window[MODULE];
            console.log('​-----------------------------------------------------------------------');
            console.log('​DnnContextService -> constructor -> this._properties', this._properties);
            console.log('​-----------------------------------------------------------------------');
        } else {
            console.log('----------------------');
            console.log('ERROR: Missing window[MODULE] for DNN');
            console.log('----------------------');
        }        
    }

    autoConfigure() {
        this._moduleId = this._properties.ModuleId;
        this._userId = this._properties.UserId;
        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
 
            // Run timer till sf is ready, but max for a second.
            const t = timer(0, 100)
                .pipe(take(10))
                .subscribe(x => {

                    // This must be accessed after a delay, as the SF is not ready yet.
                    const sf = window.$.ServicesFramework();
                    console.log('TCL: ----------------------------');
                    console.log('TCL: autoConfigure -> sf', sf);
                    console.log('TCL: ----------------------------');

                    // Check if sf is initialized.
                    if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                        t.unsubscribe();
                        this.tidSubject.next(sf.getTabId());
                        this.afTokenSubject.next(sf.getAntiForgeryValue());
                    } else {
                        // Must reset, as they are incorrectly initialized when accessed early.
                        if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                            window.dnn.vars = null;
                        }
                    }
                });
            return;
        }

        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error(`
                DNN Services Framework is missing, and it\'s not allowed according to devSettings.
                Either set devSettings to ignore this, or ensure it\'s there`);
        }

        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    }
}