class Aplication{
    player = null
    opponent = null
    mouse = null

    scenes = {}
    activeScene = null

    constructor(scenes = {}) {

        const mouse = new Mouse(document.body)
        const opponent = new fieldView('batlleField-opponent',false)
        const player = new fieldView('batlleField-player',true)

        Object.assign(this, {opponent,player,mouse})

            for (const [SceneName,SceneClass] of  Object.entries(scenes)){
                this.scenes[SceneName] = new SceneClass(name,this)
            }


            for(const scene of Object.values(this.scenes)){
                scene.init()
            }

            requestAnimationFrame(() => this.tick())
    }

    tick(){
        requestAnimationFrame(() => this.tick())
        if(this.activeScene){
            this.activeScene.update()
        }
        this.mouse.tick()
    }

    start(sceneName,func,player){
        if(this.activeScene && this.activeScene.name === sceneName){
            return false;
        }

        if(!this.scenes.hasOwnProperty(sceneName)){
            return false;
        }


        if(this.activeScene){
            this.activeScene.stop()
        }
        const scene = this.scenes[sceneName]
        this.activeScene = scene
        if(sceneName === 'preparation' || sceneName === 'preparation_2'){
            this.activeScene.creataFunc(func)
        }
        if(sceneName === 'preparation' || sceneName === 'preparation_2' && player === 'player'){
            this.activeScene.activePlayer = this.player
        }else if(sceneName === 'preparation' || sceneName === 'preparation_2' && player === 'opponent'){
            this.activeScene.activePlayer = this.opponent
            this.opponent.showShips = true
        }
        scene.start()
        return true;
    }
}