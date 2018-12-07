import * as React from 'react';
interface ElementCallback {
    element: HTMLDivElement,
    callbacks: Function[]
}
const elementCallbackStack: ElementCallback[] = [];

const _onClickDocument = (e: Event) => {
    elementCallbackStack.map(elementCallback => {
        if (hideDropList.isParent(e.target, elementCallback.element)||e.target === elementCallback.element) {
           return 
        }
        elementCallback.callbacks.map(callback=>callback())
    })
}
window.document.body.addEventListener('click', _onClickDocument)

const hideDropList = {
    init: (element: HTMLDivElement, callback: Function)=>{
        const currentElement =  elementCallbackStack.filter(elementCallback=>elementCallback.element=== element)
        if(currentElement.length>0){
            currentElement[0].callbacks.push(callback)
        }
        else{
            elementCallbackStack.push({element: element, callbacks: [callback]})
        }
    },
    isParent:(child, parent: ElementCallback)=>{
        if (parent && parent.callbacks.length && e.target === elementCallback.element) {
            return true
        }
    }

}