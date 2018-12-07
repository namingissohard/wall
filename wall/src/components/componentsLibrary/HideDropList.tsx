import * as React from 'react';
interface ElementCallback{
    element: HTMLDivElement,
    callbacks: Function[]
}
const elementCallbackStack:ElementCallback[] =[];


window.document.body.addEventListener('click',_onClickDocument)