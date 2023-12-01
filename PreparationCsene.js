const shipDatas = [
    {size: 4,direction: 'row',startX: 520,startY: 40},
    {size: 3,direction: 'row',startX: 520,startY: 200},
    {size: 3,direction: 'row',startX: 680,startY: 200},
    {size: 2,direction: 'row',startX: 520,startY: 280},
    {size: 2,direction: 'row',startX: 640,startY: 280},
    {size: 2,direction: 'row',startX: 760,startY: 280},
    {size: 1,direction: 'row',startX: 520,startY: 120},
    {size: 1,direction: 'row',startX: 600,startY: 120},
    {size: 1,direction: 'row',startX: 680,startY: 120},
    {size: 1,direction: 'row',startX: 760,startY: 120}
]



class PreparationCsene extends Csene {
    functionEnd = null
    draggedship = null
    draggesOffsetX = 0
    draggesOffsetY = 0
    activePlayer = null

    listRemoveEventerLiseners = []
    button = []
    init(){
        const { mouse, opponent } = this.app;
    }
    start(){   
        const { mouse, opponent } = this.app;
        opponent.clear()
        this.activePlayer.removeALLShots()
        this.activePlayer.removeALLShips()     
        this.activePlayer.ships.forEach((ship) => (ship.killed = false))

        const b = createElement('div','text_playerss')
        b.textContent = 'Расстановка короблей игрока'
        this.button.push(b)
        if(this.activePlayer === opponent){
            this.activePlayer.root.classList.remove('batlleField-opponent')
            this.activePlayer.root.classList.add('batlleField-player')
            b.textContent = 'Расстановка короблей игрока 2'
        }
        body.append(b)
        body.append(this.activePlayer.root)
        for(const {size,direction,startX,startY} of shipDatas){
            const ship = new Ship(size,direction,startX,startY)
            this.activePlayer.addShip(ship)
        }
        const button_Random_ships = createElement('button','button_Random_ships')
        this.button.push(button_Random_ships)
        button_Random_ships.textContent = 'раставить корабли случайно'
        body.append(button_Random_ships)
        this.listRemoveEventerLiseners.push(addEvent(button_Random_ships,'click',() => this.randomize()))
       
        const button_Manually_ships = createElement('button','button_Manually_ships')
        button_Manually_ships.textContent = 'раставить корабли вручную'
        body.append(button_Manually_ships)
        this.button.push(button_Manually_ships)
        this.listRemoveEventerLiseners.push(addEvent(button_Manually_ships,'click',() => this.manually()))
        
        const button_Complete_ships = createElement('button','button_Complete_ships')
            button_Complete_ships.textContent = 'Продолжить'
            body.append(button_Complete_ships)
            button_Complete_ships.disabled = true
            this.button.push(button_Complete_ships)
            this.listRemoveEventerLiseners.push(addEvent(button_Complete_ships,'click',() => this.functionEnd()))
    }
    update(){
        const { mouse  } = this.app;
        
        if(!this.draggedship && mouse.left && !mouse.pleft){
            const ship = this.activePlayer.ships.find(ship => ship.isUnder(mouse))
            if(ship){ 
                const shipRect = ship.div.getBoundingClientRect()
                
                this.draggedship = ship;
                this.draggesOffsetX = mouse.x - shipRect.left
                this.draggesOffsetY = mouse.y - shipRect.top

                ship.x = null
                ship.y = null
            }
        }
        if(mouse.left && this.draggedship){
            const { left,top} = this.activePlayer.root.getBoundingClientRect() 
            
            const x = mouse.x - left - this.draggesOffsetX
            const y = mouse.y - top - this.draggesOffsetY

            
            this.draggedship.div.style.left = `${x}px`
            this.draggedship.div.style.top = `${y}px`
        }
        if(!mouse.left && this.draggedship){
            const ship = this.draggedship;
            this.draggedship = null;

            const {left,top } = ship.div.getBoundingClientRect()
            const {width,height} = this.activePlayer.cells[0][0].getBoundingClientRect()
            const point = {
                x:left + width / 2,
                y:top +  height/ 2
            }

            const cell = this.activePlayer.cells.flat().find((cell) => IsUnderPoint(point,cell))
            if(cell){
                const x = parseInt(cell.dataset.x)
                const y = parseInt(cell.dataset.y)
                this.activePlayer.removeShip(ship)
                const playem = this.activePlayer.matrix
                this.activePlayer.addShip(ship,x,y)
            }else{
                this.activePlayer.removeShip(ship)
                this.activePlayer.addShip(ship)
            }
        }
        if(mouse.delta && this.draggedship){
            this.draggedship.toggleGirection()
        }
        const m = this.activePlayer.matrix
        if(this.activePlayer.complete){
            document.getElementsByClassName('button_Complete_ships')[0].disabled   = false
        }else{
            document.getElementsByClassName('button_Complete_ships')[0].disabled  = true
        }
    }
    
    stop(){
        for(const eventerListenr of  this.listRemoveEventerLiseners){
            eventerListenr()
        }
        this.listRemoveEventerLiseners = []
        for(const but of this.button){
            
            but.remove();
        }
    }
    randomize(){

        this.activePlayer.randomize()
        for(let i = 0;i < 10;i++){
            const ship = this.activePlayer.ships[i]

            ship.startX = shipDatas[i].startX
            ship.startY = shipDatas[i].startY
        }
    }
    manually(){
        this.activePlayer.removeALLShips()
        for(const {size,direction,startX,startY} of shipDatas){
            const ship = new Ship(size,direction,startX,startY)
            this.activePlayer.addShip(ship)
        }
    }
    startComputer(){
        this.app.start('computer')
    }
    preparation_opponet(){
        body.innerHTML = ''
        this.app.start('preparation_2','func','opponent')
    }
    friend_game(){
        this.app.start('friend')
    }
    creataFunc(func){
        if(func === null){
            this.functionEnd = this.startComputer
        }else if(func === 'preparation_2'){
        this.functionEnd = this.preparation_opponet
        }else{
            this.functionEnd = this.friend_game
        }
    }
}
