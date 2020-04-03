document.addEventListener('click', onclick);


class Engine
{
  constructor()
  {
    this.deltaTime = 0.2;
    this.time = 0;
    this.rectanglesText = [];
    this.circles = [];
    this.lines = [];
    this.reclanglesAreVisible = true;
    this.nbCircle = 3;
    this.radiusCircle = 5;
    this.selectedRectangle = null;
    this.descriptorRectangle = new RectangleText(700,700,{x:canvas.width-900,y:50},"test descriptor");
  }

  init()
  {
    var rectangle = new RectangleText(150,170,{x:150,y:150},"test1");
    this.rectanglesText.push(rectangle);

    var rectangle1 = new RectangleText(150,170,{x:500,y:500},"test2");
    this.rectanglesText.push(rectangle1);

    for (var i = 0; i < this.nbCircle; i++) {
      var circle = new Circle(this.radiusCircle,{x:Math.random()*canvas.width,y:Math.random()*canvas.height});
      this.circles.push(circle);
    }
  }

  loop()
  {
    this.time+=this.deltaTime;
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  draw()
  {

    ctx.clearRect(0,0,canvas.width,canvas.height); // effacer le canvas

    /*Rectangles*/
    if(this.rectanglesText.length != 0)
    {
      this.rectanglesText.forEach(rectangle =>
      {
        rectangle.draw();
      });
    }

    this.descriptorRectangle.draw();

    /*Cercles*/
    if(this.circles.length != 0)
    {
      this.circles.forEach(circle =>
      {
        circle.draw();
      });
    }

    /*Lignes*/
    if(this.lines.length != 0)
    {
      this.lines.forEach(line =>
      {
        line.draw();
      });
    }
  }

  update()
  {
    /*Rectangles*/
    if(this.rectanglesText.length != 0)
    {
      this.rectanglesText.forEach(rectangle =>
      {
        rectangle.rectangleIsVisible = this.reclanglesAreVisible;
        rectangle.update();
      });
    }
    this.descriptorRectangle.rectangleIsVisible = this.reclanglesAreVisible;

    /*Cercles*/
    if(this.circles.length != 0)
    {
      this.circles.forEach(circle =>
      {
        circle.update(this.deltaTime);
      });
    }

    /*Lignes*/
    if(this.lines.length != 0)
    {
      this.lines.forEach(line =>
      {
        line.update(this.deltaTime);
      });
    }
  }

  start() {
    this.init();
    this.loop();
  }

  circlesOnRectangle()
  {
    if(this.selectedRectangle != null)
    {
      this.circles[0].pointCalling = this.selectedRectangle.position;

      var pointCalling1 = {
        x : this.selectedRectangle.position.x + this.selectedRectangle.width,
        y:this.selectedRectangle.position.y
      };
      var pointCalling2 = {
        x : this.selectedRectangle.position.x,
        y : this.selectedRectangle.position.y + this.selectedRectangle.height
      };
      var pointCalling3 = {
        x : this.selectedRectangle.position.x + this.selectedRectangle.width,
        y : this.selectedRectangle.position.y + this.selectedRectangle.height
      };

      this.circles[1].pointCalling = pointCalling1;
      this.circles[2].pointCalling = pointCalling2;
      this.circles[3].pointCalling = pointCalling3;

      // this.lines.push(new Line(this.selectedRectangle.position,pointCalling1,null));
      // this.lines.push(new Line(pointCalling1,pointCalling3,null));
      // this.lines.push(new Line(this.selectedRectangle.position,pointCalling2,null));
      // this.lines.push(new Line(pointCalling2,pointCalling3,null));

      this.lines.push(new Line(this.selectedRectangle.position,{x:this.selectedRectangle.position.x,y:this.selectedRectangle.position.y},pointCalling1));
      this.lines.push(new Line(pointCalling3,{x:pointCalling3.x,y:pointCalling3.y},pointCalling1));
      this.lines.push(new Line(this.selectedRectangle.position,{x:this.selectedRectangle.position.x,y:this.selectedRectangle.position.y},pointCalling2));
      this.lines.push(new Line(pointCalling3,{x:pointCalling3.x,y:pointCalling3.y},pointCalling2));
    }
  }


  circlesOnRectangleDescriptor()
  {
    if(this.descriptorRectangle != null)
    {
      this.circles[4].pointCalling = this.descriptorRectangle.position;

      var pointCalling5 = {
        x : this.descriptorRectangle.position.x + this.descriptorRectangle.width,
        y:this.descriptorRectangle.position.y
      };
      var pointCalling6 = {
        x : this.descriptorRectangle.position.x,
        y : this.descriptorRectangle.position.y + this.descriptorRectangle.height
      };
      var pointCalling7 = {
        x : this.descriptorRectangle.position.x + this.descriptorRectangle.width,
        y : this.descriptorRectangle.position.y + this.descriptorRectangle.height
      };

      this.circles[5].pointCalling = pointCalling5;
      this.circles[6].pointCalling = pointCalling6;
      this.circles[7].pointCalling = pointCalling7;

      this.lines.push(new Line(this.descriptorRectangle.position,{x:this.descriptorRectangle.position.x,y:this.descriptorRectangle.position.y},pointCalling5));
      this.lines.push(new Line(pointCalling7,{x:pointCalling7.x,y:pointCalling7.y},pointCalling5));
      this.lines.push(new Line(this.descriptorRectangle.position,{x:this.descriptorRectangle.position.x,y:this.descriptorRectangle.position.y},pointCalling6));
      this.lines.push(new Line(pointCalling7,{x:pointCalling7.x,y:pointCalling7.y},pointCalling6));
    }
  }
  selectRectangle(x,y)
  {
    this.rectanglesText.forEach(rectangle =>
    {
      if(x > rectangle.position.x && x < rectangle.position.x + rectangle.width
        && y > rectangle.position.y && y < rectangle.position.y + rectangle.height)
      {
        this.selectedRectangle = rectangle;
      }
    });
  }
}

class RectangleText
{
  constructor(height, width, position,text)
  {
    this.height = height;
    this.width = width;
    this.position = position;
    this.rectangleIsVisible = true;
    this.text = text;
  }

  draw()
  {
    if(this.rectangleIsVisible)
    {
      /*Rectangle*/
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y,this.width,this.height);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }

    /*Text*/
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.position.x+(this.width/2), this.position.y+(this.height/2));
  }

  update()
  {

  }
}

class Circle
{
  constructor(radius,position)
  {
    this.position = position;
    this.radius = radius;
    this.velocity =
    {
      x:Math.random()*20,
      y:Math.random()*20
    }
    this.pointCalling = null;
  }
  draw()
  {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  update(deltaTime)
  {
    /*Si le cercle est appeler par un rectangle*/
    if(this.pointCalling != null)
    {
      this.velocity.x = this.pointCalling.x - this.position.x;
      this.velocity.y = this.pointCalling.y - this.position.y;
    }

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    /*Collision avec les côtés de la canvas*/
    if(this.position.x + this.radius > canvas.width || this.position.x + this.radius< 0)
    {
      this.velocity.x = this.velocity.x * -1;
    }

    if(this.position.y + this.radius < 0 || this.position.y + this.radius > canvas.height)
    {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}

class Line
{
  constructor(position,toPosition,positionTracing)
  {
    this.position = position;
    this.toPosition = toPosition;
    this.positionTracing = positionTracing;
  }

  draw()
  {
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y);
    ctx.lineTo(this.toPosition.x, this.toPosition.y);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  update(deltaTime)
  {
    if(this.positionTracing != null)
    {
      this.toPosition.x += (this.positionTracing.x - this.toPosition.x)*(deltaTime*0.1);
      this.toPosition.y += (this.positionTracing.y - this.toPosition.y)*(deltaTime*0.1);
    }
  }
}

var engine = new Engine();
engine.deltaTime = 0.2;
engine.nbCircle = 10;
engine.reclanglesAreVisible = false;
engine.start();

function onclick()
{
  console.log(window.event.screenX+" "+window.event.screenY);
  engine.selectRectangle(window.event.clientX,window.event.clientY);
  engine.lines = []; //On reset les lignes
  if(engine.selectedRectangle != null)
  {
    engine.circlesOnRectangle();
    engine.circlesOnRectangleDescriptor();
  }
}
