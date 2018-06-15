import * as React from 'react';
import styles from './styles';

const { Component } = React;
const { Wrapper } = styles;

let start = null;
let codingIconY = 200;
let codingIconSize = 65;
let eyeballRadius = 0;
let fillColor = '#000000';

export interface LogoProps {
    width?: number;
    height?: number;
    fill?: string;
}

export default class Logo extends Component<LogoProps, {}> {

    private width: number;
    private height: number;
    private logoCanvas: React.RefObject<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;
    private fillColor: string;

    constructor(props) {
        super(props);
        const { width, height, fill } = props;
        this.width = width || 200;
        this.height = height || 200;
        this.logoCanvas = React.createRef<HTMLCanvasElement>();
        fillColor = fill || '#000000';
    }
    
    componentDidMount() {
        const canvas =  this.logoCanvas.current;
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = fillColor;
        this.ctx.fillStyle = fillColor;
        this.ctx.scale(this.width / 200, this.height / 200);
        this.animation();
    }

    animation() {
        requestAnimationFrame(animationStep.bind(this));
    }

    render() {
        return (
            <Wrapper>
                <canvas ref={this.logoCanvas} width={this.width} height={this.height}></canvas>
            </Wrapper>
        );
    }

}


function animationStep(timestamp) {
    if(!start) {
        start = timestamp;
    }
    const ctx: CanvasRenderingContext2D = this.ctx;
    ctx.clearRect(0, 0, 300, 300);
    drawHands(ctx);
    animateCodingIcon(ctx);
    requestAnimationFrame(animationStep.bind(this));
}

function animateCodingIcon(ctx: CanvasRenderingContext2D) {
    if(codingIconY <= 101) {
        if(codingIconSize > 0) {
            drawCodingIcon(ctx, 101);
            codingIconSize--;
        } else {
            animateEyeBall(ctx);
        }
    } else {
        drawCodingIcon(ctx, codingIconY = codingIconY - 1.5);
    }
}

function animateEyeBall(ctx: CanvasRenderingContext2D) {
    if(eyeballRadius >= 13) {
        drawEyeWithTriangle(ctx);
    } else {
        drawEyeBall(ctx, eyeballRadius++);
    }
}

function drawCodingIcon(ctx: CanvasRenderingContext2D, y) {
    ctx.font = `${codingIconSize}px Arial`;
    ctx.textAlign="center";
    ctx.fillText('</>', 100, y - (65 - codingIconSize - 13) / 2);
}

function drawEyeBall(ctx: CanvasRenderingContext2D, radius = 0) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(100.155, 78.27, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawEyeWithTriangle(ctx: CanvasRenderingContext2D) {
    // Draw rounded corner triangle.
    const radius = 60;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius;
    ctx.beginPath();
    ctx.moveTo(38.57 + radius / 2, 121 - radius / 2);
    ctx.lineTo(162.62 - radius / 2, 121 - radius / 2);
    ctx.lineTo(100.17, 0 + radius / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Draw eye
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(56.5, 78.27);
    ctx.arcTo(100.09, 25.46, 143.81, 78.27, 57);
    ctx.arcTo(100.09, 129.3, 56.5, 78.27, 57);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Draw eyeball
    drawEyeBall(ctx, 13);
    ctx.restore();
}

function drawHands(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(19.92, 200);
    ctx.lineTo(60.16, 200);
    ctx.lineTo(60.16, 150.39);
    ctx.lineTo(39.84, 140.23);
    ctx.lineTo(39.84, 169.92);
    ctx.lineTo(19.92, 150.39);
    ctx.lineTo(19.92, 110.16);
    ctx.lineTo(0, 100);
    ctx.lineTo(0, 160.55);
    ctx.closePath();
    ctx.moveTo(180.08, 200);
    ctx.lineTo(139.84, 200);
    ctx.lineTo(139.84, 150.2);
    ctx.lineTo(160.16, 140.23);
    ctx.lineTo(160.16, 169.92);
    ctx.lineTo(180.08, 150.2);
    ctx.lineTo(180.08, 110.16);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 160.55);
    ctx.lineTo(180.08, 200);
    ctx.closePath();
    ctx.fill();
}