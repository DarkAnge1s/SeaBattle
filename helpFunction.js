function createElement(elements,clas){
    const element = document.createElement(elements)
    element.classList.add(clas)
    return element
}

function getRandomBetween(min,max){
    return min + (Math.floor(Math.random() * (max - min + 1)))
}
function geatRandomFrom(...args){
    const index = Math.floor(Math.random() * args.length)
    return args[index]
}
function IsUnderPoint(point,element){
    const { left,top,width,height} = element.getBoundingClientRect()
    const { x,y} = point;
    return left <= x && x <= left+width && top <= y && y <= top + height;
}
function addEvent(element,...args){
    element.addEventListener(...args)
    return () => element.removeEventListener(...args)
}
