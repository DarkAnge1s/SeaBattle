class computerCsene extends Csene{
    playerTurn = true
    pShot = null
    direction = null
    listRemoveEventerLiseners = []
    mas = ['top','bottom','left','right']    
    b = 1
    dataSet = false
    start(){

        body.append(this.app.opponent.root)
        const {opponent} = this.app
        opponent.clear()
        opponent.randomize()
        this.listRemoveEventerLiseners = []
        const button_again = createElement('button','button_end')
        this.listRemoveEventerLiseners.push(addEvent(button_again,'click', () => {
            body.innerHTML = ''
            this.app.activeScene = null
            this.app.start('preparation',null,'player')
        }))
        button_again.textContent = 'сыграть ёще раз'
        const button_exit = createElement('button','button_exit')
        this.listRemoveEventerLiseners.push(addEvent(button_exit,'click', () => {
            body.innerHTML = ''
            this.app.activeScene = null
            body.append(root)
        }))
        button_exit.textContent = 'выход в главное меню'
        const text_field_player = createElement('div','text_field_player')
        text_field_player.textContent = 'Ваше поле'
        const text_field_opponent = createElement('div','text_field_opponent')
        text_field_opponent.textContent = 'Вражеское поле'
        const button_gameUp = createElement('button','button_end')
        button_gameUp.textContent = 'сдаться'
        const title = createElement('div','title_loser')
        this.listRemoveEventerLiseners.push(addEvent(button_gameUp,'click', () => {
            document.getElementsByClassName('title_loser')[0].textContent = 'Вы сдались:('
            this.dataSet = true
        }))
        body.append(button_gameUp,button_again,button_exit,title,text_field_player,text_field_opponent)
        button_again.classList.add('hidden')
        button_gameUp.classList.remove('hidden')
        button_exit.classList.add('hidden')
        }
    update(){
        const {mouse,opponent,player} = this.app
        const isEnd = opponent.loser || player.loser
        if(isEnd || this.dataSet) {
            if(opponent.loser){
                document.getElementsByClassName('title_loser')[0].textContent = 'Вы победили:)'
            }else{
                document.getElementsByClassName('title_loser')[0].textContent = 'Вы проиграли):'
            }
            document.getElementsByClassName('button_end')[1].classList.remove('hidden')
            document.getElementsByClassName('button_exit')[0].classList.remove('hidden')
            document.getElementsByClassName('title_loser')[0].textContent = 'Вы проиграли:('
            this.dataSet = false
            return;
        }
        
        const cells = opponent.cells.flat() 
        cells.forEach(cell => cell.classList.remove('batlleField-item_active'))
        if(IsUnderPoint(mouse,opponent.table)){
            const cell = cells.find(cell => IsUnderPoint(mouse,cell))
            if(cell){
                cell.classList.add('batlleField-item_active')
                if(this.playerTurn && mouse.left && !mouse.pLeft){
                    const x = parseInt(cell.dataset.x)
                    const y = parseInt(cell.dataset.y)
                    const shot = new ShotView(x,y)
                    const result = opponent.addShot(shot)

                    if(result){
                        this.playerTurn = shot.variant === 'miss' ? false : true
                    }
                }
            }
        }
        if(!this.playerTurn){
            if(this.pShot === null){
            const x = getRandomBetween(0,9)
            const y = getRandomBetween(0,9)

            const shot = new ShotView(x,y)
            const result = player.addShot(shot)
            if(result){
                this.pShot = shot.variant === 'miss' || shot.variant === 'killed' ? null : shot
                this.playerTurn = shot.variant === 'miss' ? true : false
            }}else{
            if(JSON.stringify(this.mas) === JSON.stringify([])){
                this.mas  = ['top','bottom','left','right']
            }
            let shot = null
            const shotR = this.pShot
            let i = getRandomBetween(0,this.mas.length - 1)
            if(this.direction === null){
                this.direction = this.mas[i]
            }
            const x = shotR.x
            const y = shotR.y
            console.log(this.mas[i],i,this.mas.length,this.mas)
            switch(this.direction){
                case 'bottom':  
                if(player.inField(x,y + this.b)){
                    shot =  new ShotView(x,y + this.b)
                }else {
                    this.mas.splice(i,1)
                    this.b = 1
                    this.direction = null
                }
                break
                case 'top': 
                if(player.inField(x,y - this.b)){
                    shot =  new ShotView(x,y - this.b)
                }else {
                    this.mas.splice(i,1)
                    this.b = 1
                    this.direction = null
                }
                break
                case 'left':  
                if(player.inField(x - this.b,y)){
                    shot =  new ShotView(x - this.b,y)
                }else {
                    this.mas.splice(i,1)
                this.b = 1
                this.direction = null
                }
                break
                case 'right': 
                if(player.inField(x + this.b,y)){
                    shot =  new ShotView(x + this.b,y)
                }else {
                    this.mas.splice(i,1)
                    this.b = 1
                    this.direction = null
                }
                break
            }
            const result = player.addShot(shot)
            if(shot.variant === 'miss'){
                this.mas.splice(i,1)
                this.direction = null
                this.b = 1
            }else if(shot.variant === 'wounded'){
                console.log(this.mas,this.direction,this.b)
                this.b += 1
            }else if(shot.variant === 'killed'){
                console.log(this.mas,this.direction,this.b)
                this.pShot = null
                this.direction = null
                this.b = 1
                this.mas  = ['top','bottom','left','right']
            }
                if(result){
                    this.playerTurn = shot.variant === 'miss' ? true : false
                }
                const m = player.matrix
                console.log(m,this.pShot)
            }
        }
    
    }
    stop(){
        for(const eventerListenr of  this.listRemoveEventerLiseners){
            eventerListenr()
        }
        this.listRemoveEventerLiseners = []
    }
}

