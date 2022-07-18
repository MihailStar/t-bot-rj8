import { getRandomInt } from '../../utility/get-random-int';

const FROM = 0;
const TO = 9;

class Game {
  static readonly NAME = `«Угадай число от ${FROM} до ${TO}»`;

  readonly secret: number;
  readonly answer: number;
  readonly isWinner: boolean;

  constructor(answer: number) {
    this.secret = getRandomInt(FROM, TO);
    this.answer = answer;
    this.isWinner = this.secret === this.answer;
  }
}

export { Game };
