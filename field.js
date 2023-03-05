class Field{
    x = null 
    y = null 
    ship = null
    div = null
    constructor(x,y){
        this.x = x
        this.y = y
    }
    createDiv(root,x,y){
        const div = createElement('div','','field')
        div.setAttribute('data-x',x)
        div.setAttribute('data-y',y)
        this.div = div
    }
}