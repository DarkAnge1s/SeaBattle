class FriendCsene extends Csene{
    playerTurn = true
    listRemoveEventerLiseners = []
    dataSet = false
    start(){

        body.append(this.app.opponent.root)
        const {opponent , player} = this.app
        opponent.root.classList.remove('batlleField-player')
        opponent.root.classList.add('batlleField-opponent')
        this.listRemoveEventerLiseners = []
        opponent.removeVisualShips()
        player.removeVisualShips()
        body.append(player.root)
        const button_again = createElement('button','button_end')
        this.listRemoveEventerLiseners.push(addEvent(button_again,'click', () => {
            body.innerHTML = ''
            this.app.activeScene = null
            this.app.start('preparation','preparation_2','player')
        }))
        button_again.textContent = 'сыграть ёще раз'
        const button_exit = createElement('button','button_exit')
        this.listRemoveEventerLiseners.push(addEvent(button_exit,'click', () => {
            this.app.activeScene = null
            body.innerHTML = ''
            body.append(root)
        }))
        button_exit.textContent = 'выход в главное меню'
        
        const text_field_player = createElement('div','text_field_player')
        text_field_player.textContent = 'Поле игрока 1'
        const text_field_opponent = createElement('div','text_field_opponent')
        text_field_opponent.textContent = 'Поле игрока 2'

        const button_gameUp = createElement('button','button_end')
        button_gameUp.textContent = 'сдаться'
        const title = createElement('div','title_loser')
        this.listRemoveEventerLiseners.push(addEvent(button_gameUp,'click', () => {
            if(this.playerTurn === true){
            document.getElementsByClassName('title_loser')[0].textContent = 'Игрок 1 сдался'
            }else {
                document.getElementsByClassName('title_loser')[0].textContent = 'Игрок 2 сдался'
            }
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
        if(isEnd || this.dataSet){
            if(opponent.loser){
                document.getElementsByClassName('title_loser')[0].textContent = 'Победил игрок 1'
            }else if(player.loser){
                document.getElementsByClassName('title_loser')[0].textContent = 'Победил игрок 2'
            }
            document.getElementsByClassName('button_end')[0].classList.add('hidden')
            document.getElementsByClassName('button_end')[1].classList.remove('hidden')
            document.getElementsByClassName('button_exit')[0].classList.remove('hidden')
            return;
        }
        let activePlayer = null
        if(this.playerTurn){
            activePlayer = opponent
            document.getElementsByClassName('title_loser')[0].textContent = 'Ход игрока 1'
        }else if(!this.playerTurn){
            activePlayer = player
            document.getElementsByClassName('title_loser')[0].textContent = 'Ход игрока 2'
        }
        const cells = activePlayer.cells.flat() 
        cells.forEach(cell => cell.classList.remove('batlleField-item_active'))
        if(IsUnderPoint(mouse,activePlayer.table)){
            const cell = cells.find(cell => IsUnderPoint(mouse,cell))
            if(cell){
                cell.classList.add('batlleField-item_active')
                if(mouse.left && !mouse.pLeft){
                    const x = parseInt(cell.dataset.x)
                    const y = parseInt(cell.dataset.y)
                    const shot = new ShotView(x,y)
                    const result = activePlayer.addShot(shot)

                    if(result){
                        if(activePlayer === opponent){
                        this.playerTurn = shot.variant === 'miss' ? false : true
                        }else {
                            this.playerTurn = shot.variant === 'miss' ? true : false
                        }
                    }
                }
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
