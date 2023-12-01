
class Ship{
    size = null
    killed = false
    direction = null
    
    x = null;
    y = null;

    div = null 
    startX = null
    startY = null
    constructor(size,direction,startX,startY){
        this.size = size
        this.startX = startX
        this.startY = startY
        this.createShip()
        this.setDirection(direction)
    }
    createShip(){
        const div = createElement('div','ship')
        this.div = div
    }

    get placed(){
        return this.x != null && this.y!= null
    }

    setDirection(newDirection){
        if(this.direction === newDirection){
            return false
        }
        this.div.classList.remove(`ship-${this.direction}-${this.size}`)
        this.direction = newDirection;
        this.div.classList.add(`ship-${this.direction}-${this.size}`)
        return true
    }
    isUnder(point){
        return IsUnderPoint(point,this.div)
    }
    toggleGirection(){
        const newDirection = this.direction === 'row' ? 'coluwn' : 'row'
        this.setDirection(newDirection)
    }
}