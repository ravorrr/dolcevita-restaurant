'use strict';

import { Cookies } from "./Cookies.js";

export class PanelCookie extends Cookies {
    
    constructor() {
        
        super();

        this.infoCookie = "Informujemy, że korzystamy z informacji zapisanych w plikach cookies na urządzeniach końcowych użytkowników. Pliki te można kontrolować za pomocą ustawień przeglądarki internetowej. Dalsze korzystanie z naszego serwisu oznacza, iż akceptujesz pliki cookies.";

        this.textClose = "<a href=\"#\" title=\"Akceptuj i zamknij\">Zamknij<a/>";

        this.textColor = "#fff";

        this.panel = document.querySelector('.cookies');

        if(!this.getCookie('Accept')) {
            this.showPanel();
        }

        this.setPanelProperties();
    }

    showPanel() {
        this.panel.style.display = 'block';
    }

    hidePanel() {
        this.panel.style.display = 'none';
    }

    setPanelProperties() {
        const text = document.querySelector('.cookies__text');
        text.innerHTML = this.infoCookie;
        text.style.color = this.textColor;
        
        const close = document.querySelector('.cookies__close');
        close.innerHTML = this.textClose;
    }

    setCookie() {
        super.setCookie({
            name: 'Accept',
            value: 'yes',
            days: 90
        });
        this.hidePanel();
    }
}