let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d'); 
ctx.fillStyle = 'green'; 
ctx.fillRect(10, 10, 100, 100);


function draw() {
  let drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  canvasCtx.beginPath();

  let sliceWidth = WIDTH * 1.0 / bufferLength;
  for(var i = 0; i < bufferLength; i++) { 
  
    var v = dataArray[i] / 128.0;
    var y = v * HEIGHT/2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  var x = 0;
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();

}

draw();