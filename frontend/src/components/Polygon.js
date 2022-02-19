// Copyright (c) Facebook, Inc. and its affiliates.
import React, { Component } from 'react';

class Polygon extends Component {
    colors = [
        '#00ffff', '#a52a2a', '#00008b', '#008b8b', '#bdb76b', '#8b008b',
        '#ff8c00', '#8b0000', '#e9967a', '#9400d3', '#ff00ff', '#4b0082', '#add8e6',
        '#ffb6c1', '#800000', '#000080', '#ffa500', '#800080', '#ff0000',
    ];
    getColor(synset) {
        const char = synset.charCodeAt(0);
        const synsetInt = char % this.colors.length;
        return this.colors[synsetInt];
    }

    fitToContainer(canvas) {
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
    }

    getCoords = (coords, width, height) => {
        // segm represents a multipolygon
        const segm = coords.coordinates;
        for (const poly_idx in segm) {
            // segm[poly_idx] represents a polygon with hole. Since we don't have
            // holes segm[poly_idx][0] will be the polygon.
            for (const point_idx in segm[poly_idx][0]) {
                segm[poly_idx][0][point_idx][0] = segm[poly_idx][0][point_idx][0] * width;
                segm[poly_idx][0][point_idx][1] = segm[poly_idx][0][point_idx][1] * height;
            }
        }
        return segm;
    }

    getStrokeStyle = (box) => {
        if (box.not_exhaustive) {
            return '#ffffff';
        } else {
            return '#000000';
        }
    }

    componentDidMount = () => {
        this.renderCanvas()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.showBoxes === this.props.showBoxes && prevProps.imageUrl === this.props.imageUrl) {
            return;
        }
        this.renderCanvas();
    }

    renderCanvas = () => {

        const canvas = this.refs.canvas;
        this.fitToContainer(canvas);

        const ctx = canvas.getContext("2d");
        const isDialog = this.props.isDialog;
        const img = new Image();
        img.src = this.props.imageUrl;

        img.onload = () => {
            const newData = this.drawImageScaled(img, ctx);
            ctx.globalAlpha = 1.0;
            const { newWidth, newHeight } = newData;
            for (const idx in this.props.boxes) {
                const box = JSON.parse(JSON.stringify(this.props.boxes[idx]));
                const segm = this.getCoords(
                    box["coords"], newWidth, newHeight
                )
                debugger;
                for (const poly_idx in segm) {
                    if (poly_idx % 2 !== 0) {
                        continue;
                    }
                    ctx.beginPath();
                    for (const point_idx in segm[poly_idx]) {
                        const x = segm[poly_idx][0][point_idx][0];
                        const y = segm[poly_idx][0][point_idx][1];
                        if (point_idx == 0) {
                            ctx.moveTo(x, y);
                            continue;
                        }
                        ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = this.getColor(box.synset);
                    ctx.globalAlpha = 0.5
                    ctx.fill();
                    ctx.strokeStyle = this.getStrokeStyle(box);
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                    // do twice so that the lines are on top of the filled colors.
                    // makes for bold looking black boundaries.
                    ctx.strokeStyle = this.getStrokeStyle(box);
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }
            }
        }
    }

    drawImageScaled = (img, ctx) => {
        const canvas = ctx.canvas;
        const hRatio = canvas.width / img.width;

        const newCHeight = hRatio * img.height;
        canvas.style.height = newCHeight;
        canvas.height = newCHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height
        );

        const newWidth = canvas.width;
        const newHeight = canvas.height;

        return { newWidth, newHeight };
    }

    render() {
        return (
            <p
                style={{
                    marginTop: "0px",
                    marginBottom: "-4px"
                }}
            >
                <canvas ref="canvas" />
            </p>
        )
    }
}

export default Polygon;
