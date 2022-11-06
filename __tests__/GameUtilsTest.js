const NumberBaseballGameManager = require('../src/NumberBaseballGameManager');

const gameManager = new NumberBaseballGameManager();

describe('게임 기능 테스트', () => {
  test('인자로 전달받은 개수만큼 컴퓨터가 생각중인 숫자를 무작위로 생성한다.', () => {
    const randomNumberCounts = [3, 4];
    const randomNumberArrays = randomNumberCounts.map(
      gameManager.getRandomNumberArray,
    );
    const result = randomNumberArrays.map(arr => arr.length);

    expect(result).toEqual([3, 4]);
  });

  test('스트라이크, 볼의 개수를 구한다.', () => {
    const inputValues = ['123', '456', '312', '132'];
    const computerNumbers = [1, 2, 3];
    const result = inputValues.map(inputValue =>
      gameManager.getBallCounts(computerNumbers, inputValue),
    );

    expect(result).toEqual([
      [3, 0],
      [0, 0],
      [0, 3],
      [1, 2],
    ]);
  });

  test('스트라이크, 볼의 개수를 기반으로 힌트의 유형을 반환한다.', () => {
    const counts = [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 0],
    ];
    const result = counts.map(count => {
      const [strikeCount, ballCount] = count;
      return gameManager.getHintType(strikeCount, ballCount);
    });

    expect(result).toEqual([
      'ONLY_STRIKES',
      'ONLY_BALLS',
      'DEFAULT',
      'NOTHING',
    ]);
  });

  test('스트라이크, 볼의 개수를 기반으로 힌트를 생성한다.', () => {
    const inputValues = ['123', '456', '312', '132', '124'];
    const computerNumbers = [1, 2, 3];
    const hints = inputValues.map(inputValue =>
      gameManager.getHint(computerNumbers, inputValue),
    );

    expect(hints).toEqual([
      '3스트라이크',
      '낫싱',
      '3볼',
      '2볼 1스트라이크',
      '2스트라이크',
    ]);
  });
});
