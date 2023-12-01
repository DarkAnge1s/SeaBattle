const root = document.getElementById('root')
const body = document.getElementById('body')
    const button_to_play_with_the_bot = document.getElementById('button_to_play_with_the_bot')
    const button_to_play_with_a_friend = document.getElementById('button_to_play_with_a_friend')
    function foo(){
        body.innerHTML = ''
        const app = new Aplication({
            preparation:PreparationCsene,
            computer:computerCsene
        })
        app.start("preparation", null,'player')
    }
    function foo_two(){
        body.innerHTML = ''
        const app = new Aplication({
            preparation:PreparationCsene,
            preparation_2:PreparationCsene,
            friend:FriendCsene,
        })
        app.start("preparation",'preparation_2','player')
    }
    button_to_play_with_the_bot.addEventListener('click',foo)
    button_to_play_with_a_friend.addEventListener('click',foo_two)            