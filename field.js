class Field{
   ships = []
   shots = []

    _private_matrix = null
    _private_changed = true
    get loser(){
        for(const ship of this.ships){
            if(!ship.killed){
                return false;
            }
        }
        return true;
    }
    get matrix(){
        if(!this._private_changed){
            return this._private_matrix
        }
        const matrix = []

    for(let y = 0; y < 10;y++){
        const row = []
        
        for(let x = 0; x < 10;x++){
            const item = {
                x,
                y,
                ship:null,
                free:true,

                shooted:false,
                wounded:false
            }
            row.push(item)
        }
        matrix.push(row)
    }
    for(const ship of this.ships){
        if(!ship.placed){
            continue;
        }
            const dx = ship.direction === 'row'
            const dy = ship.direction === 'coluwn'

            for(let i = 0;i < ship.size;i++){
                const{x,y} = ship
                const cx = x + dx * i
                const cy = y + dy * i
                const item = matrix[cy][cx]
                item.ship = ship 
            }

            for(let y = ship.y - 1 ; y < ship.y + ship.size * dy + dx + 1 ; y++){
                for(let x = ship.x - 1 ; x < ship.x + ship.size * dx + dy + 1 ; x++){
                    if(this.inField(x,y)){
                        const item = matrix[y][x]
                        item.free = false
                    }
                }
        }
    }
        for(const {x,y} of this.shots){
            const item = matrix[y][x]
            item.shooted = true

            if(item.ship){
                item.wounded = true
            }
        }
        this._private_matrix = matrix
        this._private_changed = false
        return this._private_matrix
    }

   addShot(shot){
    for(const {x,y} of this.shots){
        if(shot.x === x && shot.y === y){
            return false
        }
    }
    this.shots.push(shot)
    this._private_changed = true
    const matrix = this.matrix
    const {x,y} = shot

    if(matrix[y][x].ship){
        shot.setVariant('wounded')

        const {ship} = matrix[y][x]
        const dx = ship.direction === 'row'
        const dy = ship.direction === 'coluwn'
        let killed = true

            for(let i = 0;i < ship.size;i++){
                const cx = ship.x + dx * i
                const cy = ship.y + dy * i
                const item = matrix[cy][cx]
                
                if(!item.wounded){
                    killed = false
                    break;
                }
            }
            if(killed){
                ship.killed = true
                for(let i = 0;i < ship.size;i++){
                const cx = ship.x + dx * i
                const cy = ship.y + dy * i
                    const shot = this.shots.find(shot => shot.x === cx && shot.y === cy)
                    shot.setVariant('killed')
                    for(let y = ship.y - 1 ; y < ship.y + ship.size * dy + dx + 1 ; y++){
                        for(let x = ship.x - 1 ; x < ship.x + ship.size * dx + dy + 1 ; x++){
                            if(this.inField(x,y)){
                                const shot = new ShotView(x,y)  
                                this.addShot(shot)                              
                            }
                        }
                }
            }
                
    }
   }
   this._private_changed = true
   return true
}
   removeShot(shot){
    if(!this.shots.includes(shot)){
        return false
    }
    const index = this.shots.indexOf(shot)
    this.shots.splice(index, 1)
    this._private_changed = true
    return true
   }
   removeALLShots(){
        const shots = this.shots.slice()
        for(const shot of shots){
            this.removeShot(shot)
        }
        this._private_changed = true
        return shots.length
   }
   
   inField(x,y){
    if(parseInt(x) != x || isNaN(x)|| x === Infinity || x === -Infinity){
        return false
    }
    if(parseInt(y) != y  || isNaN(y)|| y === Infinity || y === -Infinity){
        return false
    }
    return x < 10 && x>=0 &&   y >= 0  && y < 10
   }
   addShip(ship,x,y){
        if(this.ships.includes(ship)){
            return false
        }
        this.ships.push(ship)
        if(this.inField(x,y)){
            const dx = ship.direction === 'row'
            const dy = ship.direction === 'coluwn'
            let placed = true

            for(let i = 0;i < ship.size;i++){
                const cx = x + dx * i
                const cy = y + dy * i
                if(!this.inField(cx,cy)){
                    placed = false
                    break
                }
                const item = this._private_matrix[cy][cx]
                if(!item.free){
                    placed = false
                    break
                }
            }
            if(placed){
                Object.assign(ship,{x,y})
            }
        }
        this._private_changed = true
        return true
}
   removeShip(ship){
        if(!this.ships.includes(ship)){
            return false
        }
        const index = this.ships.indexOf(ship)
        this.ships.splice(index, 1)
        ship.x = null
        ship.y = null
        this._private_changed = true
        return true
   }
   removeALLShips(){
        const ships = this.ships.slice()
        for(const ship of ships){
            this.removeShip(ship)
        }
        this._private_changed = true
        return ships.length
    }
    randomize(shipClass = Ship){
        this.removeALLShips()

        for(let size = 4;size>=1;size--){
            for(let n = 0;n< 5 - size;n++){
                const direction = geatRandomFrom('row','coluwn')
                const ship = new shipClass(size,direction)

                while(!ship.placed){
                    const x = getRandomBetween(0,9)
                    const y = getRandomBetween(0,9)

                    this.removeShip(ship)
                    this.matrix
                    this.addShip(ship,x,y)
                    this.matrix
                }
            }
        }
    }
    get complete(){
        if(this.ships.length !== 10){
            return false;
        }
        for(const ship of this.ships){
            if(!ship.placed){
                return false;
            }
        }
        return true;
    }
    clear(){
        this.removeALLShips()
        this.removeALLShots()
    }
}
