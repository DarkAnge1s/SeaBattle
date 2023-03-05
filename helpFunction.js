function createElement(element,text,clas){
    const elements = document.createElement(element)
    elements.innerText = text
    elements.classList.add(clas)
    return elements
}
