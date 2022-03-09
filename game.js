function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class GameObject {
  debug = true;
  id = null;
  pos = {
    x: 0,
    y: 0
  };
  fill = "#49AAFF"
  dragFill = "#F83FFF"
  height = 50;
  width = 50;
  draggable = true;
  dragging = false;
  #i_pos = null;

  constructor(x, y, h, w) {
    this.pos = {
      x,
      y
    };
    this.height = h || this.height;
    this.width = w || this.width;
    this.id = uuidv4();
  }
  mouseDown() {
    if (this.draggable && !this.dragging) {
      this.#i_pos = ({
        ...this.pos
      });
      this.dragging = true;
    }
  }

  mouseUp(gObjs) {
    if (this.draggable && this.dragging) {
      this.dragging = false;

      //if initial position was set
      if (this.#i_pos) {
        //check if valid position with all game objects
        if (!this.validPosition(gObjs))
          this.pos = {
            ...this.#i_pos
          };

        //reset initial position
        this.#i_pos = null;
      }
    }
  }

  validPosition(gObjs) {
    let collisionDetected = false;

    gObjs.forEach((go, i) => {
       if (go.id === this.id) return;
       collisionDetected = collisionDetected || go.boxCollisionCheck(this.pos.x, this.pos.y, this.width, this.height);
    });

    return !collisionDetected;

  }

  mouseMove(dx, dy) {

    const p = {x: this.pos.x + dx, y: this.pos.y + dy};

    //check for x overflow
    if(p.x < 0 || p.x + this.width > canvas.width) return;
    //check for y overflow
    if(p.y < 0 || p.y + this.height > canvas.height) return;

    this.pos.x += dx;
    this.pos.y += dy;
  }

  pointCollisionCheck(x, y) {
    return x > this.pos.x &&
      x < this.pos.x + this.width &&
      y > this.pos.y &&
      y < this.pos.y + this.height
  }

  boxCollisionCheck(x, y, w, h) {
    const r1 = {
      pos: this.pos,
      w: this.width,
      h: this.height
    };
    const r2 = {
      pos: {
        x,
        y
      },
      w,
      h
    };
    return r1.pos.x < r2.pos.x + r2.w &&
      r1.pos.x + r1.w > r2.pos.x &&
      r1.pos.y < r2.pos.y + r2.h &&
      r1.pos.y + r1.h > r2.pos.y;
  }

  draw(ctx, dt) {
    // this.pos.x = Math.abs((this.pos.x + dt / getRandomInt(5, 10))) % canvas.width;
    // this.pos.y = Math.abs((this.pos.y + dt / getRandomInt(1, 20))) % canvas.height;
    ctx.beginPath();
    if (this.draggable)
      ctx.fillStyle = this.dragging ? this.dragFill : this.fill;
    else
      ctx.fillStyle = "#777777";

    if (this.debug) {
      ctx.fillText(this.id, this.pos.x, this.pos.y);
    }
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fill();
  }
}

let state = {
  lastDraw: null,
  dragging: null,
  gameObjects: [],
};

let canvas = null;
let ctx = null;

function setCanvasDimensions(canvas) {
  let height = document.documentElement.clientHeight;
  let width = height * (9 / 16);
  // check width > available width
  if (width > document.documentElement.clientWidth) {
    width = document.documentElement.clientWidth;
    height = width * (16 / 9);
  }
  canvas.height = height - 30;
  canvas.width = width - 30;
}
// drag start mouse position
let prevX, prevY;

function handleDragAndDrop(canvas) {


  // canvas offset (which should be 0,0)
  const rect = canvas.getBoundingClientRect();
  const offsetX = rect.left;
  const offsetY = rect.top;

  function mouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    // set the drag start mouse position
    prevX = event.clientX - offsetX;
    prevY = event.clientY - offsetY;

    // map of images under mouse position
    state.dragging = state.gameObjects.reduce(
      (acc, go, i) => {
        return {
          ...acc,
          ...(go.pointCollisionCheck(prevX, prevY) && go.draggable && {
            [i]: go
          }),
        }
      }, {}
    );

    Object.keys(state.dragging).forEach((i) => {
      state.gameObjects[i].mouseDown();
    });

  }
  canvas.onmousedown = mouseDown;
  canvas.touchstart = mouseDown;

  function mouseMove(event) {
    if (!state.dragging) return;

    event.preventDefault();
    event.stopPropagation();

    // current mouse position
    const mouseX = event.clientX - offsetX;
    const mouseY = event.clientY - offsetY;

    // change in position since drag start
    const dX = mouseX - prevX;
    const dY = mouseY - prevY;

    if (dX || dY) {
      // calculate new image positions
      Object.keys(state.dragging).forEach((i) => {
        state.gameObjects[i].mouseMove(dX, dY);
      });

      // set new previous position
      prevX = mouseX;
      prevY = mouseY;
    }
  }
  canvas.onmousemove = mouseMove;

  function mouseUpOut(event) {
    if (!state.dragging) return;

    //Execute mouseup on dragged objects
    Object.keys(state.dragging).forEach((i) => {
      state.gameObjects[i].mouseUp(state.gameObjects);
    });

    event.preventDefault();
    event.stopPropagation();

    state.dragging = null;
  }
  canvas.onmouseup = mouseUpOut;
  canvas.onmouseout = mouseUpOut;
}


function draw(ts) {
  const dTime = ts - (state.lastDraw || ts);
  state.lastDraw = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  state.gameObjects.forEach((go, i) => {
    go.draw(ctx, dTime);
  });

  handleDragAndDrop(canvas);
  requestAnimationFrame(draw);
}

function setup() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  //setup dynamic canvas size
  setCanvasDimensions(canvas);
  window.addEventListener('resize', () => setCanvasDimensions(canvas))

  let totalAttempts = 0;
  while (state.gameObjects.length < 1000 && totalAttempts < 10000) {

    const w = 100; // getRandomInt(50, 100);
    const x = getRandomInt(w, canvas.width) - w;
    const y = getRandomInt(w, canvas.height) - w;
    
    if(state.gameObjects.every((sgo) => !sgo.boxCollisionCheck(x, y, w, w))){
      const go = new GameObject(x, y, w, w);
      go.draggable = true; //getRandomInt(1, 3) == 1;
      state.gameObjects.push(go);
    }
    totalAttempts++;
  }

  console.log('attempts to create', totalAttempts, state.gameObjects.length);
  requestAnimationFrame(draw);
}

window.onload = setup;