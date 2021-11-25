'use strict';

import { PanelCookie } from "./modules/PanelCookie.js";

const panel = new PanelCookie();

const closeLink = document.querySelector('.cookies a');

closeLink.addEventListener('click', (e) => {
    e.preventDefault();
    panel.setCookie();
});