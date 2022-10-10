var canvas = document.getElementById("myCanvas"),
  ctx = canvas.getContext("2d"),
  r = document.querySelector("input[type=range]").value || 20,
  avgReactionElement = document.getElementById("avg"),
  reactionElement = document.getElementById("reaction"),
  reaction_start = 0,
  reaction_end = 0,
  current_reaction = 0,
  totalTime = 0,
  count = 0;

canvas.width = window.innerWidth - 32;
canvas.height = window.innerHeight - 32 - 96;

function changeRadius() {
  r = document.querySelector("input[type=range]").value;
  document.getElementById("rangeNumber").innerText = r;
  getArc();
}

getArc();

canvas.onclick = function (e) {
  var rect = this.getBoundingClientRect(), // get abs. position of canvas
    x = e.clientX - rect.left, // adjust mouse-position
    y = e.clientY - rect.top;

  if (ctx.isPointInPath(x, y)) {
    if (count === 0) {
      ctx.fillStyle = "red";
      count++;
      getArc();
      return;
    }
    reaction_end = Date.now();
    count++;
    current_reaction = reaction_end - reaction_start;
    reactionElement.innerText = current_reaction;
    totalTime = totalTime + current_reaction;
    avgReactionElement.innerText = Math.floor(totalTime / count - 1);
    getArc();
  }
};

function getArc() {
  let x, y;

  do {
    x = Math.floor(Math.random() * canvas.width);
    y = Math.floor(Math.random() * canvas.height);
  } while (x < r * 2 || x > canvas.width - r || y < r * 2 || y > canvas.height - r);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (count !== 0) {
    reaction_start = Date.now();
  }

  ctx.beginPath();
  ctx.fillStyle = count === 0 ? "red" : "green";
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
