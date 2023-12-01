class Mouse{
    element = null

    x = null
    y = null

    under = false
    pUnder = false

    px = null
    py = null

    left = false
    pLeft = false

    delta = null
    pDelta = null

    constructor(element){

        this.element = element;

        const update = (e) => {
            this.x = e.clientX
            this.y = e.clientY
            this.under = true
            this.delta = 0
        }

        element.addEventListener('mousemove',(event) => {
            this.tick()
            update(event)
        })
        element.addEventListener('mouseenter',(event) => {
            this.tick()
            update(event)
        })
        element.addEventListener('mouseleave',(event) => {
            this.tick()
            update(event)
            this.under = false
        })
        element.addEventListener('mousedown',(event) => {
            this.tick()
            update(event)
            if(event.button === 0){
                this.left = true
            }
        })
        element.addEventListener('mouseup',(event) => {
            this.tick()
            update(event)
            if(event.button === 0){
                this.left = false
            }
        })
        element.addEventListener('wheel',(event) => {
            this.tick()
            update(event)
            this.delta = event.deltaY > 0 ? 1 : -1
        })
    }

    tick(){
        this.px = this.x
        this.py = this.y
        this.pUnder = this.under
        this.pDelta = this.delta
        this.pLeft = this.left
        this.delta = 0
    }
}
