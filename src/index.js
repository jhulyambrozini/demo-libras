import { RockGesture, PaperGesture } from "./gestures.js"
import { config } from "./config.js"

// detector das mãos
async function createDetector() {
  return window.handPoseDetection.createDetector(
    window.handPoseDetection.SupportedModels.MediaPipeHands,
    {
      runtime: "mediapipe",
      modelType: "full",
      maxHands: 2,
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
    }
  )
}

async function callDetector() {

  const detector = await createDetector()
  console.log("detctando sinal")
  const card = document.querySelector('.card')
  card.innerHTML = '<p>tente fazer o sinal</p>'

  return detector
}

const video = document.querySelector("#pose-video")

// configure gesture estimator
// add "✌🏻" and "👍" as sample gestures
const knownGestures = [
  fp.Gestures.VictoryGesture,
  fp.Gestures.ThumbsUpGesture,
  RockGesture,
  PaperGesture
]

const GE = new fp.GestureEstimator(knownGestures)
// load handpose model

// main loop
async function estimateHands() {

  // pegando dados da mão no video
  const hands = await callDetector().then(resp => resp.estimateHands(video, {
    flipHorizontal: true
  }))

  // loop pra pegar nome do sinal feito
  for (const hand of hands) {

    const keypoints3D = hand.keypoints3D.map(keypoint => [keypoint.x, keypoint.y, keypoint.z])
    const est = GE.estimate(keypoints3D, 9)

    if (!est.gestures.length) continue
    // find gesture with highest match score
    let result = est.gestures.reduce((prev, cont) => {
      return (prev.score > cont.score) ? prev : cont
    })
    let nomeDoSinal = result.name

    let card = document.querySelector('.card')
    card.innerText = nomeDoSinal
    return nomeDoSinal
  }
 
  // ...and so on
  setTimeout(() => { estimateHands() }, 1000 / config.video.fps)
}



async function initCamera(width, height, fps) {

  // configs da camera
  const constraints = {
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height,
      frameRate: { max: fps }
    }
  }

  const video = document.querySelector("#pose-video")
  video.width = width
  video.height = height

  // get video stream - pegando dados da camera
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  video.srcObject = stream

  return new Promise(resolve => {
    video.onloadedmetadata = () => { resolve(video) }
  })
}

/*
function habilitaBotao() {
  const cards = document.querySelectorAll('[data-card-button]')
  //console.log(cards)
  for (let i = 0; i < cards.length; i++) {
    cards[i].removeAttribute('disabled')
    proximoCard()
  }
}

function proximoCard() {
  const buttons = document.querySelectorAll('[data-card-button]')


  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (botao) {
      const abaAlvo = botao.target.dataset.tabButton
      const aba = document.querySelector(`[data-card-id=${abaAlvo}]`)
      aba.classList.add('is-active')
    })


  }
}
*/
window.addEventListener("DOMContentLoaded", () => {

  initCamera(
    config.video.width, config.video.height, config.video.fps
  ).then(video => {
    video.play()
    video.addEventListener("loadeddata", event => {
      console.log("Camera is ready")
      
      estimateHands()
    })
  })

  const canvas = document.querySelector("#pose-canvas")
  canvas.width = config.video.width
  canvas.height = config.video.height
  console.log("Canvas initialized")

});

