import React, { Component } from 'react';

class BoundingBox extends Component {
    colors = ['#e6194B', '#3cb44b', '#ffe119',
              '#f032e6', '#9A6324', '#800000', '#42d4f4',
              '#911eb4'];

    getColor(word) {
        const char = word.charCodeAt(0);
        const wordInt = char % this.colors.length;
        return this.colors[wordInt];
    }

    fitToContainer(canvas) {
        // Make it visually fill the positioned parent
        canvas.style.width ='100%';
        // ...then set the internal size to match
        canvas.width  = canvas.offsetWidth;
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.fitToContainer(canvas);

        const ctx = canvas.getContext("2d");
        const isDialog = this.props.isDialog;
        const img = new Image();
        img.src = this.props.imageUrl;

        img.onload = () => {
            const newData = this.drawImageScaled(img, ctx);
            ctx.globalAlpha = 1.0;

            if (!this.props.showBoxes) {
                return;
            }
            const { centerShiftX, centerShiftY, newWidth, newHeight } = newData;
            ctx.font = "12px Lato";

            if (isDialog) {
                ctx.font = "16px Lato";
            }

            ctx.fontWeight = "bold";
            for(const idx in this.props.boxes) {
                const box = JSON.parse(JSON.stringify(this.props.boxes[idx]));
                box.coords[0] *= newWidth;
                box.coords[1] *= newHeight;
                box.coords[2] *= newWidth;
                box.coords[3] *= newHeight;
                box.coords[0] += centerShiftX;
                box.coords[1] += centerShiftY;
                ctx.fillStyle = this.getColor(box.word);
                ctx.strokeStyle = ctx.fillStyle;

                ctx.rotate(box.rotation * Math.pi / 180);
                ctx.lineWidth = 2;
                ctx.strokeRect(...box.coords);

                ctx.fillText(box.word, box.coords[0], box.coords[1]);
            }
        }
    }

    drawImageScaled(img, ctx) {
        const canvas = ctx.canvas;
        const hRatio = canvas.width  / img.width;

        const newCHeight = hRatio * img.height;
        canvas.style.height = newCHeight;
        canvas.height = newCHeight;

        const vRatio =  canvas.height / img.height;
        const ratio  = Math.min(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width*ratio) / 2;
        const centerShiftY = (canvas.height - img.height*ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShiftX, centerShiftY, img.width*ratio,
                      img.height*ratio);

        if (this.props.showBoxes) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(centerShiftX, centerShiftY, img.width*ratio,
                        img.height*ratio);
        }

        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        return { centerShiftX, centerShiftY, newWidth, newHeight};
    }

    render() {
        return(
            <p>
              <canvas ref="canvas" />
            </p>
        )
    }
}

export default BoundingBox;