'use strict';

export class Cookies {

    constructor() {
        this.checkCookieEnabled();
    }

    checkCookieEnabled() {
        // console.log(navigator.cookieEnabled);
        if(!navigator.cookieEnabled) {
            alert('Masz wyłączoną obsługę ciasteczek');
            return;
        };
    }

    setCookie(options) {
        
        const option = {
            name: options.name || 'test',
            value: options.value || 'wartosc testowa',
            days: options.days,
            path: options.path,
            domain: options.domain,
            secure: options.secure,
        }
        
        const cookieName = encodeURIComponent(option.name);
        const cookieVal = encodeURIComponent(option.value);
        const cookieSettingsTab = [];
        
        cookieSettingsTab.push(`${cookieName} = ${cookieVal}`);

        if(typeof option.days === 'number') {
            const date = new Date();
            date.setTime(date.getTime() + (option.days * 24 * 60 * 60 * 1000));

            cookieSettingsTab.push(`expires = ${date.toGMTString()}`);
        }

        if(option.path) {
            cookieSettingsTab.push(`path = ${option.path}`)
        }

        if(option.domain) {
            cookieSettingsTab.push(`domain = ${option.domain}`)
        }

        if(option.secure) {
            cookieSettingsTab.push(option.secure)
        }

        console.log(cookieSettingsTab);

        document.cookie = cookieSettingsTab.join(';');
    }

    getCookie(name) {
        if(document.cookie != '') {
            // Accept = yes; Test = wart2;
            const cookies = document.cookie.split(/; */);
            
            for(let i = 0; i < cookies.length; i++) {
                const cookieName = cookies[i].split('=')[0];
                const cookieVal = cookies[i].split('=')[1];

                if(cookieName === decodeURIComponent(name)) {
                    return cookieVal;
                }
            }
        }
    }

    removeCookie(name) {
        const date = new Date();
        date.setTime(date.getMonth() - 1);
        document.cookie = `${name} = ; expires = ${date.toGMTString()}`;
    }
}

new Cookies;