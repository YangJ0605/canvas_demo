var yy = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetVw(yy)
listenToUser(yy)
/******/
var eraserUsing = false
eraser.onclick = function () {
    eraserUsing = true
    eraser.classList.add('x')
    pen.classList.remove('x')
}
pen.onclick = function () {
    eraserUsing = false
    pen.classList.add('x')
    eraser.classList.remove('x')
}
rm.onclick = function () {
    context.clearRect(0, 0, yy.width, yy.height)
    console.log(yy.width + '=====' + yy.height)
}
save.onclick = function () {
    var url = yy.toDataURL('image/pag')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '521'
    a.click()
}
black.onclick = function () {
    context.strokeStyle = "black"
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = "red"
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = "green"
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = "blue"
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}
one.onclick=function(){
    context.lineWidth=1
    one.classList.add('active')
    two.classList.remove('active')
    three.classList.remove('active')
    four.classList.remove('active')
}
two.onclick=function(){
    context.lineWidth=2
    two.classList.add('active')
    one.classList.remove('active')
    three.classList.remove('active')
    four.classList.remove('active')
}
three.onclick=function(){
    context.lineWidth=3
    three.classList.add('active')
    two.classList.remove('active')
    one.classList.remove('active')
    four.classList.remove('active')
}
four.onclick=function(){
    context.lineWidth=4
    four.classList.add('active')
    two.classList.remove('active')
    three.classList.remove('active')
    one.classList.remove('active')
}
/*****/
function autoSetVw(yy) {
    vwPort()
    window.onresize = function () {
        vwPort()
    }

    function vwPort() {
        var pageWidth = document.documentElement.clientWidth
        var pageHight = document.documentElement.clientHeight
        yy.width = pageWidth
        yy.height = pageHight
        // console.log('x')
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    // context.strokeStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    // context.strokeStyle = 'black'
    // context.lineWidth = 2
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if (document.body.ontouchstart !== undefined) {
        yy.ontouchstart = function (zz) {
            var x = zz.touches[0].clientX
            var y = zz.touches[0].clientY
            // console.log('ss')
            using = true
            if (eraserUsing) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint['x'] = x
                lastPoint['y'] = y
            }
        }
        yy.ontouchmove = function (aa) {
            aa.preventDefault()
            var x = aa.touches[0].clientX
            var y = aa.touches[0].clientY
            if (!using) return
            if (eraserUsing) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
            }
            // drawCircle(x,y,1)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
        yy.ontouchend = function () {
            using = false
        }
    } else {
        yy.onmousedown = function (zz) {
            var x = zz.clientX
            var y = zz.clientY
            using = true
            if (eraserUsing) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint['x'] = x
                lastPoint['y'] = y
            }

            console.log('down')
            // drawCircle(x,y,1)
        }
        yy.onmousemove = function (aa) {
            var x = aa.clientX
            var y = aa.clientY
            if (!using) return
            if (eraserUsing) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
            }
            // drawCircle(x,y,1)
            // console.log("zz")
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            // console.log("55")
        }
        yy.onmouseup = function () {
            using = false
        }
    }

}