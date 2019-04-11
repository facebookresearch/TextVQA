// Copyright (c) Facebook, Inc. and its affiliates.
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

    setRotatedCoords = (coords, width, height,
        centerShiftX, centerShiftY, rotation) => {
        const x = coords[0];
        const y = coords[1];
        let newX = x * width + centerShiftX, newY = y * height + centerShiftY;
        let newWidth = coords[2] * width, newHeight = coords[3] * height;
        if (rotation === 270) {
            newX = (1 - y) * width + centerShiftX;
            newY = x * height + centerShiftY;
        } else if (rotation === 180) {
            newX = (1 - x) * width + centerShiftX;
            newY = (1 - y) * height + centerShiftY;
        } else if (rotation === 90) {
            newX = y * width + centerShiftX;
            newY = (1 - x) * height + centerShiftY;
        }

        coords[0] = newX;
        coords[1] = newY;
        coords[2] = newWidth;
        coords[3] = newHeight;
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.fitToContainer(canvas);

        const ctx = canvas.getContext("2d");
        const isDialog = this.props.isDialog;
        const img = new Image();
        img.src = this.props.imageUrl;

        let rotation = parseInt(this.props.rotation, 10);
        if (this.props.rotation.length === 0) {
            rotation = 0;
        }

        img.onload = () => {
            const newData = this.drawImageScaled(img, ctx);
            ctx.globalAlpha = 1.0;

            if (!this.props.showBoxes) {
                return;
            }
            const { centerShiftX, centerShiftY, newWidth, newHeight } = newData;
            ctx.font = "12px Roboto bold";

            if (isDialog) {
                ctx.font = "48px Roboto bold";
            }

            ctx.fontWeight = "800";
            for(const idx in this.props.boxes) {
                const box = JSON.parse(JSON.stringify(this.props.boxes[idx]));
                ctx.beginPath();
                ctx.fillStyle = this.getColor(box.word);
                ctx.strokeStyle = ctx.fillStyle;
                ctx.lineWidth = 2;
                this.setRotatedCoords(
                    box.coords,
                    newWidth,
                    newHeight,
                    centerShiftX,
                    centerShiftY,
                    rotation
                )

                const boxRotation = parseInt(box.rotation, 10);

                ctx.rotate(boxRotation * Math.pi / 180);
                ctx.strokeRect(...box.coords);
                ctx.rotate(boxRotation * Math.pi / 180);

                ctx.lineWidth = 0.5;
                ctx.strokeRect(box.coords[0], box.coords[1] - 48, ctx.measureText(box.word).width + 15, 48);


                if (isDialog) {
                    ctx.fillStyle = this.getColor(box.word);
                    ctx.globalAlpha = 0.5;
                    ctx.rect(box.coords[0], box.coords[1] - 48, ctx.measureText(box.word).width + 15, 48);
                    ctx.fill();
                    ctx.fillStyle = "#000";
                    ctx.globalAlpha = 1.0;
                    ctx.fillText(box.word, box.coords[0] + 6, box.coords[1] - 2);
                } else {
                    ctx.fillText(box.word, box.coords[0], box.coords[1]);
                }
                ctx.closePath();
            }
        }
    }

    drawImageScaled = (img, ctx) => {
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