import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    
    shoot(x, y, speed){
        this.bullets.push(new Bullet(x, y, speed));
    }

    draw(ctx){
        this.bullets.forEach((bullet) => bullet.draw(ctx));
    }
}