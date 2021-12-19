import { format } from "path/posix";
import {
  lineify,
  oneFromEach,
  readInput,
  sections,
  StringifiedSet,
  zip,
} from "~utils";

interface Position3D {
  x: number;
  y: number;
  z: number;
}

const rotateX = ({ x, y, z }: Position3D, theta: number = Math.PI / 2) => {
  const matrix = [
    [1, 0, 0],
    [0, Math.cos(theta), -Math.sin(theta)].map((x) =>
      parseFloat(x.toFixed(10))
    ),
    [0, Math.sin(theta), Math.cos(theta)].map((x) => parseFloat(x.toFixed(10))),
  ];

  return {
    x: matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
    y: matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
    z: matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z,
  };
};

const rotateY = ({ x, y, z }: Position3D, theta: number = Math.PI / 2) => {
  const matrix = [
    [Math.cos(theta), 0, Math.sin(theta)].map((x) => parseFloat(x.toFixed(10))),
    [0, 1, 0],
    [-Math.sin(theta), 0, Math.cos(theta)].map((x) =>
      parseFloat(x.toFixed(10))
    ),
  ];

  return {
    x: matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
    y: matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
    z: matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z,
  };
};

const rotateZ = ({ x, y, z }: Position3D, theta: number = Math.PI / 2) => {
  const matrix = [
    [Math.cos(theta), -Math.sin(theta), 0].map((x) =>
      parseFloat(x.toFixed(10))
    ),
    [Math.sin(theta), Math.cos(theta), 0].map((x) => parseFloat(x.toFixed(10))),
    [0, 0, 1],
  ];

  return {
    x: matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
    y: matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
    z: matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z,
  };
};

const allRotations = (pArr: Position3D[]) => {
  return [
    pArr.slice(),
    pArr.map((p) => rotateX(p)),
    pArr.map((p) => rotateY(p)),
    pArr.map((p) => rotateZ(p)),

    pArr.map((p) => rotateX(rotateX(p))),
    pArr.map((p) => rotateY(rotateX(p))),
    pArr.map((p) => rotateZ(rotateX(p))),
    pArr.map((p) => rotateX(rotateY(p))),

    pArr.map((p) => rotateY(rotateY(p))),
    pArr.map((p) => rotateY(rotateZ(p))),
    pArr.map((p) => rotateZ(rotateZ(p))), // 11

    pArr.map((p) => rotateX(p), Math.PI + Math.PI / 2),
    pArr.map((p) => rotateY(rotateX(p), Math.PI)), // XXY
    pArr.map((p) => rotateZ(rotateX(p), Math.PI)), // XXZ
    pArr.map((p) => rotateX(rotateY(rotateX(p)))), // 15 - XYX

    pArr.map((p) => rotateY(rotateX(p)), Math.PI), // 16 - XYY
    pArr.map((p) => rotateZ(rotateX(p)), Math.PI), // 17 - XZZ
    pArr.map((p) => rotateX(rotateY(p)), Math.PI), // 18 - YXX

    pArr.map((p) => rotateY(p), Math.PI + Math.PI / 2),
    pArr.map((p) => rotateZ(p), Math.PI + Math.PI / 2),

    pArr.map((p) => rotateY(rotateX(p), Math.PI + Math.PI / 2)),
    pArr.map((p) => rotateX(rotateY(rotateX(p), Math.PI / 2))),
    pArr.map((p) => rotateX(rotateY(rotateX(p))), Math.PI / 2),
    pArr.map((p) => rotateY(rotateX(p)), Math.PI + Math.PI / 2), // 24 - XYYY
  ];
};

export const getOffsetFromBToA = (from: Position3D, to: Position3D) => {
  return { x: from.x - to.x, y: from.y - to.y, z: from.z - to.z };
};

export const add = (p1: Position3D, p2: Position3D) => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
    z: p1.z + p2.z,
  };
};

export const isEqual = (p1: Position3D, p2: Position3D) => {
  return p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const reports = sections(input).map((s) =>
    lineify(s)
      .slice(1)
      .map((l) => l.split(",").map((x) => parseInt(x)))
      .map((coords) => ({ x: coords[0], y: coords[1], z: coords[2] }))
  );

  for (let i = 0; i < reports.length; i++) {
    for (let j = i + 1; j < reports.length; j++) {
      const scannerA = reports[i];
      const scannerB = reports[j];

      for (const rotation of allRotations(scannerB)) {
        for (const [a, b] of oneFromEach(scannerA, rotation)) {
          const set = new StringifiedSet<Position3D>();
          scannerA.forEach((p) => set.add(p));

          const offset = getOffsetFromBToA(a, b);
          const offsetPoints = rotation.map((p) => add(p, offset));

          const count = offsetPoints.filter((p) => set.has(p)).length;
          if (count >= 12) {
            reports[j] = offsetPoints;
            console.log(offset);
          }
        }
      }

      // only consider one pair for now
      // break;
    }
    // break;
  }

  const beacons = new StringifiedSet<Position3D>();
  reports.forEach((scans) => {
    scans.forEach((scan) => {
      beacons.add(scan);
    });
  });

  console.log(beacons);
  console.log(beacons.size);

  // const scanner0 = reports[0];
  // const scanner1 = reports[1];

  // console.log(scanner0, scanner1);
  // const offset = getOffsetFromBToA(scanner0[0], scanner1[0]);

  // console.log({ offset });
  // console.log();
  // console.log(add(scanner1[0], offset));
  // console.log(scanner0[0]);

  return -1;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
