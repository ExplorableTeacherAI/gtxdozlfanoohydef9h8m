import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import the Circle Basics lesson
import { circleBasicsLessonBlocks } from "./sections/circleBasicsLesson";

/**
 * ------------------------------------------------------------------
 * CIRCLE BASICS & PROPERTIES LESSON
 * ------------------------------------------------------------------
 * GCE O-Level Elementary Mathematics
 *
 * Learning Objectives:
 * 1. Identify and name all parts of a circle (centre, radius, diameter,
 *    circumference, chord, arc, sector, segment)
 * 2. Understand the relationship between radius and diameter (d = 2r)
 *
 * Target Audience: Secondary school students with varying abilities
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...circleBasicsLessonBlocks,
];
