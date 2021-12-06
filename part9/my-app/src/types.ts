// export interface ContentProps {
//   name: string;
//   exerciseCount: number;
// }
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseWithDescription extends CoursePartBase {
  description?: string;
}
interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface newInterface extends CoursePartBase {
  type: "new";
  description: string;
}
interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  name: string;
  description: string;
  requirements: Array<string>;
}
export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | newInterface
  | CourseSpecialPart;