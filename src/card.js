import { RockGesture, PaperGesture } from "./gestures.js"
import { config, landmarkColors } from "./config.js"

// saber qual o sinal
        //console.log(result.name)
        const mysing = result.name
        const cardsingrock = RockGesture.name


        if (mysing === 'rock') {
          if (cardsingrock === 'rock' && card1.classList.contains('is-active')) {
            console.log('parabens')
            card1.innerHTML += '<span class="test">PARABENS</span>'
            //  card1.innerHTML += '<a href="#card2">PROXIMO</a>'
            //buttons.removeAttribute('disable')

            return
          } else {
            console.log('nop')
            return
          }
        }
        else {
          console.log('triste')

        }




        /// DE HJ
        // saber qual o sinal
        //console.log(result.name)
     //   const mysing = result.name
      //  const cardsingrock = RockGesture.name
        const cardsingpapel = PaperGesture.name
        const card = document.querySelector('.card')
        const card2 = document.querySelector('.card2')
        const card3 = document.querySelector('.card3')
        const card4 = document.querySelector('.card4')

        // para sinal de pedra
       if (mysing === 'rock') {
          if (cardsingrock === 'rock') {
            console.log('parabens')
            card.innerHTML = ''
            card.innerHTML += '<div class="card2 active">Muito bem! Quantidade de sinais feitos: 1/4</div><p>Faça o sinal de papel</p>'
           // habilitaBotao()
            
          } else {
            card.innerHTML += '<p>Analisando sinal...</p>'
            return
          }
        }

        if (mysing === 'paper') {
          if (cardsingrock === 'paper') {
            console.log('parabens')
            card.innerHTML = ''
            card.innerHTML += '<div class="card2 active">Muito bem! Quantidade de sinais feitos: 2/4</div><p>Faça o sinal de V</p>'
           // habilitaBotao()
            return
          } else {
            card.innerHTML += '<p>Analisando sinal...</p>'
            return
          }
        }



        // if do laço 
        if (est.gestures.length > 0) {

          // find gesture with highest match score
          let result = est.gestures.reduce((p, c) => {
            return (p.score > c.score) ? p : c
          })
        }  