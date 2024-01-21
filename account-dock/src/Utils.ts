export default class Utils {
  static getRandomInt(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }
}
