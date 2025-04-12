import { Renderer } from "./renderer";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const renderer = new Renderer(ctx);

renderer.run();
