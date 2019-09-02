type SectorProps = {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
};
const SectorPropsKeys: (keyof SectorProps)[] = [
  'cx',
  'cy',
  'r',
  'start',
  'end',
];
const Sector = (props: React.SVGProps<SVGCircleElement> & SectorProps) => {
  const { cx, cy, r, start, end } = props;
  const pathProps = (Object.keys(props).filter(
    key => !SectorPropsKeys.includes(key as any)
  ) as (keyof React.SVGProps<SVGCircleElement>)[]).reduce((obj, key) => {
    return {
      ...obj,
      [key]: props[key],
    };
  }, {});
  const x1 = Math.cos(start) * r + cx;
  const x2 = Math.cos(end) * r + cx;
  const dx = x2 - x1;
  const y1 = Math.sin(start) * r + cy;
  const y2 = Math.sin(end) * r + cy;
  const dy = y2 - y1;
  return (
    <path
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...pathProps}
      d={`M ${cx},${cy} L ${x1} ${y1} a ${r} ${r} ${start} 0 1 ${dx} ${dy} z`}
    />
  );
};
type DartBoardSize = {
  r: number;
  innerBull: number;
  outerBull: number;
  innerSingle: number;
  triple: number;
  outerSingle: number;
  double: number;
};
export const softDartBoardSize: DartBoardSize = {
  r: 393 / 2,
  innerBull: 17 / 2,
  outerBull: 44 / 2,
  innerSingle: 84,
  triple: 20,
  outerSingle: 52,
  double: 20,
};

const DartBoard = () => {
  const outlineStroke = 3;
  const innerStroke = 2;
  const width = 200;
  const boardR = (width - outlineStroke) / 2;
  const height = width;
  const outerBullR = (boardR * softDartBoardSize.outerBull) / 2 / boardR;
  const innerBullR = (boardR * softDartBoardSize.innerBull) / 2 / boardR;
  const lineArray = new Array(20).fill(0).map((_, i) => i);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={width / 2}
        cy={height / 2}
        r={boardR}
        stroke="#000"
        strokeWidth={outlineStroke}
        fill="none"
      />

      {lineArray.map(n => {
        const outerR = boardR;
        const doubleInnerR =
          boardR - (width * softDartBoardSize.double) / softDartBoardSize.r / 2;
        const tripleInnerR =
          outerBullR +
          (width * softDartBoardSize.innerSingle) / softDartBoardSize.r / 2;
        const tripleOuterR =
          tripleInnerR +
          (width * softDartBoardSize.triple) / softDartBoardSize.r / 2;
        const innerR = outerBullR;
        const theta = ((n + 1 / 2) / lineArray.length) * 2 * Math.PI;
        const cos = Math.cos(theta);
        const x1 = cos * outerR + width / 2;
        const x2 = cos * innerR + width / 2;
        const sin = Math.sin(theta);
        const y1 = sin * outerR + height / 2;
        const y2 = sin * innerR + height / 2;
        if (n === 0) {
          // eslint-disable-next-line no-console
          console.log(x1, y1, x2, y2);
        }
        return (
          <>
            <Sector
              key={n}
              fill={n % 2 === 0 ? 'red' : 'blue'}
              stroke="black"
              cx={width / 2}
              cy={height / 2}
              r={outerR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <Sector
              key={n}
              fill={n % 2 === 0 ? 'black' : 'white'}
              stroke="black"
              cx={width / 2}
              cy={height / 2}
              r={doubleInnerR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <Sector
              key={n}
              fill={n % 2 === 0 ? 'red' : 'blue'}
              stroke="black"
              cx={width / 2}
              cy={height / 2}
              r={tripleOuterR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <Sector
              key={n}
              fill={n % 2 === 0 ? 'black' : 'white'}
              stroke="black"
              cx={width / 2}
              cy={height / 2}
              r={tripleInnerR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
          </>
        );
      })}
      <circle
        cx={width / 2}
        cy={height / 2}
        r={outerBullR}
        stroke="#000"
        strokeWidth={innerStroke}
        fill="red"
      />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={innerBullR}
        stroke="#000"
        strokeWidth={innerStroke}
        fill="black"
      />
    </svg>
  );
};
const CountUp = () => <DartBoard />;
export default CountUp;
