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
const OuterSectorPropsKeys: (keyof OuterSectorProps)[] = [
  'cx',
  'cy',
  'innerR',
  'outerR',
  'start',
  'end',
];
type OuterSectorProps = {
  cx: number;
  cy: number;
  outerR: number;
  innerR: number;
  start: number;
  end: number;
};
const OuterSector = (
  props: React.SVGProps<SVGCircleElement> & OuterSectorProps
) => {
  const { cx, cy, outerR, innerR, start, end } = props;
  const pathProps = (Object.keys(props).filter(
    key => !OuterSectorPropsKeys.includes(key as any)
  ) as (keyof React.SVGProps<SVGCircleElement>)[]).reduce((obj, key) => {
    return {
      ...obj,
      [key]: props[key],
    };
  }, {});
  const x1 = Math.cos(start) * outerR + cx;
  const x2 = Math.cos(end) * outerR + cx;
  const x3 = Math.cos(end) * innerR + cx;
  const x4 = Math.cos(start) * innerR + cx;
  const y1 = Math.sin(start) * outerR + cy;
  const y2 = Math.sin(end) * outerR + cy;
  const y3 = Math.sin(end) * innerR + cy;
  const y4 = Math.sin(start) * innerR + cy;
  return (
    <path
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...pathProps}
      d={`M ${x4},${y4} L ${x1} ${y1} A ${outerR} ${outerR} ${start} 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} ${end} 0 0 ${x4} ${y4} z`}
    />
  );
};
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
  const y1 = Math.sin(start) * r + cy;
  const y2 = Math.sin(end) * r + cy;
  return (
    <path
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...pathProps}
      d={`M ${cx},${cy} L ${x1} ${y1} A ${r} ${r} ${start} 0 1 ${x2} ${y2} z`}
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
  const centerX = width / 2;
  const centerY = height / 2;
  const outerBullR = (boardR * softDartBoardSize.outerBull) / 2 / boardR;
  const innerBullR = (boardR * softDartBoardSize.innerBull) / 2 / boardR;
  const lineArray = new Array(20).fill(0).map((_, i) => i);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={centerX}
        cy={centerY}
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
            <OuterSector
              key={n}
              fill={n % 2 === 0 ? 'red' : 'blue'}
              stroke="black"
              cx={centerX}
              cy={centerY}
              outerR={outerR}
              innerR={doubleInnerR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <OuterSector
              key={n}
              fill={n % 2 === 0 ? 'black' : 'white'}
              stroke="black"
              cx={centerX}
              cy={centerY}
              outerR={doubleInnerR}
              innerR={tripleOuterR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <OuterSector
              key={n}
              fill={n % 2 === 0 ? 'red' : 'blue'}
              stroke="black"
              cx={centerX}
              cy={centerY}
              outerR={tripleOuterR}
              innerR={tripleInnerR}
              start={theta}
              end={theta + (Math.PI / lineArray.length) * 2}
            />
            <OuterSector
              key={n}
              fill={n % 2 === 0 ? 'black' : 'white'}
              stroke="black"
              cx={centerX}
              cy={centerY}
              outerR={tripleInnerR}
              innerR={outerBullR}
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
