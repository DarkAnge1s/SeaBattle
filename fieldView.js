class fieldView extends Field{
    root = null
    table = null 
    dock = null
    polygon = null
    cells = []

    showShips = true
    constructor(clas_root,showShips = true){
        super()
        const root = createElement('div',clas_root)
        const table = createElement('table','batlleField-table')
        const dock = createElement('div','batlleField-dock')
        const polygon = createElement('div','batlleField-polygon')
        root.append(table,dock,polygon)
        Object.assign(this, { root, table,dock,polygon,showShips})

        for(let y = 0;y < 10;y++){
            const tr = createElement('tr','field')
            const row = []
            tr.dataset.y = y
            for(let x = 0;x < 10;x++){
                const td = createElement('td','batlleField-item')
                Object.assign(td.dataset ,{ x , y})

                tr.append(td)
                row.push(td)
            }
            this.cells.push(row)
            table.append(tr)
        }

        for(let x = 0;x < 10;x++){
            const cell = this.cells[0][x]
            const marker = createElement('div','marker')
            marker.classList.add('marker-coluwn')

            marker.textContent = 'АБВГДЕЁЖЗИ'[x]
            cell.append(marker)
        }
        for(let y = 0;y < 10;y++){
            const cell = this.cells[y][0]
            const marker = createElement('div','marker')
            marker.classList.add('marker-row')

            marker.textContent = y + 1
            cell.append(marker)
        }
    }
    addShip(ship,x,y){
        if(!super.addShip(ship,x,y)){
            return false;
        }
        if(this.showShips){
        this.dock.append(ship.div)
        if(ship.placed){
            const cell = this.cells[y][x]
            const cellRect = cell.getBoundingClientRect()
            const rootRect = this.root.getBoundingClientRect()

            ship.div.style.left =  `${cellRect.left - rootRect.left}px`
            ship.div.style.top = `${cellRect.top - rootRect.top}px`
        }else{
            ship.setDirection('row')
            ship.div.style.top =  `${ship.startY}px`
            ship.div.style.left = `${ship.startX}px`
        }
    }
        return true;
    }

    removeShip(ship){
        if(!super.removeShip(ship)){
            return false;
        }
        if(Array.prototype.includes.call(this.dock.children,ship.div)){
            ship.div.remove()
        }
        return true
    }
    isUnder(point){
        return IsUnderPoint(point,this.root)
    }
    addShot(shot){
        if(!super.addShot(shot)){
            return false
        }
        this.polygon.append(shot.div)
        const cell = this.cells[shot.y][shot.x]
        const cellRect = cell.getBoundingClientRect()
        const rootRect = this.root.getBoundingClientRect()

        shot.div.style.left = `${cellRect.left - rootRect.left}px`  
        shot.div.style.top = `${cellRect.top - rootRect.top}px` 
        return true
    }
    removeShot(shot){
        if(!super.removeShot(shot)){
            return false
        }
        if(Array.prototype.includes.call(this.polygon.children,shot.div)){
            shot.div.remove()
        }
        return true 
    }
    removeVisualShips(){
        for(const ship of this.ships){
            ship.div.remove()
        }
    }
}